#!/usr/bin/env node
/**
 * 图片处理脚本 - 检查并缩放不符合要求的图片
 * 
 * 使用方式：
 *   node scripts/resize-images.js          # 检查所有图片
 *   node scripts/resize-images.js --resize # 自动缩放不符合要求的图片
 * 
 * 图片要求：
 * - 格式：PNG 或 JPG/JPEG
 * - 头像：200x200 像素，PNG 格式
 * - 二维码/支付码：宽度 ≤ 400px，PNG 格式
 * - 站点图标：64x64 像素，PNG 格式，支持透明背景
 * - 文章封面：宽度 ≤ 1200px，高度 ≤ 630px，PNG 格式，16:9 比例
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const POSTS_DIR = path.join(__dirname, '..', 'posts');

// 检查是否有 ImageMagick 或 sharp
let useImageMagick = false;
try {
  execSync('which convert', { stdio: 'ignore' });
  useImageMagick = true;
} catch {
  // 尝试使用 sharp
  try {
    await import('sharp');
  } catch {
    console.error('❌ 需要安装 ImageMagick 或 sharp 才能进行图片缩放');
    console.error('   安装 ImageMagick: sudo apt install imagemagick');
    console.error('   或安装 sharp: npm install sharp');
    process.exit(1);
  }
}

/**
 * 图片规格要求
 */
const IMAGE_SPECS = {
  avatar: {
    pattern: /^avatar\.(png|jpg|jpeg)$/i,
    format: 'png',
    maxDimensions: { width: 200, height: 200 },
    description: '开发者头像',
  },
  siteIcon: {
    pattern: /^top\.(png|jpg|jpeg)$/i,
    format: 'png',
    maxDimensions: { width: 64, height: 64 },
    description: '站点图标（顶栏/底栏）',
  },
  qrCode: {
    pattern: /(wechat|alipay|qrcode|qr).*\.(png|jpg|jpeg)$/i,
    format: 'png',
    maxDimensions: { width: 400, height: 400 },
    description: '二维码/支付码',
  },
  cover: {
    pattern: /\.png$/i,
    format: 'png',
    maxDimensions: { width: 1200, height: 630 },
    description: '文章封面',
  },
};

/**
 * 获取图片尺寸（使用 identify 命令）
 */
async function getImageDimensions(filePath) {
  if (useImageMagick) {
    try {
      const output = execSync(`identify -format "%w %h" "${filePath}"`, { encoding: 'utf-8' });
      const [width, height] = output.trim().split(' ').map(Number);
      return { width, height };
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * 检查图片格式
 */
function checkFormat(filePath) {
  try {
    const output = execSync(`file "${filePath}"`, { encoding: 'utf-8' });
    if (output.includes('JPEG')) return 'jpeg';
    if (output.includes('PNG')) return 'png';
    if (output.includes('GIF')) return 'gif';
    if (output.includes('WebP')) return 'webp';
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * 缩放图片
 */
function resizeImage(inputPath, outputPath, maxWidth, maxHeight, format = 'png') {
  if (useImageMagick) {
    const ext = format === 'jpeg' ? 'jpg' : format;
    execSync(
      `convert "${inputPath}" -resize ${maxWidth}x${maxHeight} -quality 85 "${outputPath}"`,
      { stdio: 'pipe' }
    );
    return true;
  }
  return false;
}

/**
 * 检查并处理 public/images 目录
 */
async function processImagesDirectory(resize = false) {
  console.log('\n📁 检查 public/images/ 目录...\n');
  
  try {
    const files = await fs.readdir(IMAGES_DIR);
    const imageFiles = files.filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f));
    
    if (imageFiles.length === 0) {
      console.log('   未找到图片文件');
      return;
    }
    
    for (const file of imageFiles) {
      const filePath = path.join(IMAGES_DIR, file);
      const stat = await fs.stat(filePath);
      const fileSize = (stat.size / 1024).toFixed(1); // KB
      
      // 检查格式
      const actualFormat = checkFormat(filePath);
      const ext = path.extname(file).toLowerCase();
      const extWithoutDot = ext.slice(1);
      
      // 查找匹配的规格
      let spec = null;
      for (const [, s] of Object.entries(IMAGE_SPECS)) {
        if (s.pattern.test(file)) {
          spec = s;
          break;
        }
      }
      
      if (!spec) {
        console.log(`   📷 ${file}`);
        console.log(`      格式: ${actualFormat} (扩展名: ${extWithoutDot}) | 大小: ${fileSize}KB`);
        
        // 检查格式是否匹配扩展名
        if (extWithoutDot === 'png' && actualFormat === 'jpeg') {
          console.log(`      ⚠️  警告：文件扩展名为 .png 但实际是 JPEG 格式`);
          if (resize) {
            const newPath = filePath.replace(/\.png$/i, '.jpg');
            await fs.rename(filePath, newPath);
            console.log(`      ✅ 已重命名为: ${path.basename(newPath)}`);
          }
        }
        continue;
      }
      
      // 获取尺寸
      const dimensions = await getImageDimensions(filePath);
      
      console.log(`   📷 ${file} (${spec.description})`);
      console.log(`      格式: ${actualFormat} (要求: ${spec.format}) | 大小: ${fileSize}KB`);
      if (dimensions) {
        console.log(`      尺寸: ${dimensions.width}x${dimensions.height} (最大: ${spec.maxDimensions.width}x${spec.maxDimensions.height})`);
        
        const needsResize = dimensions.width > spec.maxDimensions.width || 
                           dimensions.height > spec.maxDimensions.height;
        const needsFormat = actualFormat !== spec.format;
        
        if (needsResize || needsFormat) {
          if (resize) {
            const newExt = spec.format === 'jpeg' ? 'jpg' : spec.format;
            const newPath = filePath.replace(/\.\w+$/, `.${newExt}`);
            
            if (needsFormat) {
              // 需要转换格式
              resizeImage(filePath, newPath, spec.maxDimensions.width, spec.maxDimensions.height, spec.format);
              await fs.unlink(filePath); // 删除原文件
              console.log(`      ✅ 已转换格式并缩放: ${path.basename(newPath)}`);
            } else if (needsResize) {
              // 只需缩放
              const tempPath = filePath + '.resized' + ext;
              resizeImage(filePath, tempPath, spec.maxDimensions.width, spec.maxDimensions.height, spec.format);
              await fs.rename(tempPath, filePath);
              console.log(`      ✅ 已等比例缩放`);
            }
          } else {
            const issues = [];
            if (needsFormat) issues.push(`格式应为 ${spec.format}`);
            if (needsResize) issues.push(`尺寸超过 ${spec.maxDimensions.width}x${spec.maxDimensions.height}`);
            console.log(`      ❌ ${issues.join('；')}，运行 --resize 自动修复`);
          }
        } else {
          console.log(`      ✅ 符合要求`);
        }
      } else {
        console.log(`      ⚠️  无法获取图片尺寸`);
      }
    }
  } catch (error) {
    console.log(`   ⚠️  public/images/ 目录不存在或为空`);
  }
}

/**
 * 检查文章封面图片
 */
async function processPostCovers(resize = false) {
  console.log('\n📁 检查文章封面图片...\n');
  
  try {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    const categoryDirs = entries.filter(e => e.isDirectory());
    
    for (const dir of categoryDirs) {
      const categoryDir = path.join(POSTS_DIR, dir.name);
      const files = await fs.readdir(categoryDir);
      const pngFiles = files.filter(f => f.endsWith('.png'));
      
      if (pngFiles.length === 0) continue;
      
      for (const file of pngFiles) {
        const filePath = path.join(categoryDir, file);
        const stat = await fs.stat(filePath);
        const fileSize = (stat.size / 1024).toFixed(1);
        
        const dimensions = await getImageDimensions(filePath);
        const spec = IMAGE_SPECS.cover;
        
        console.log(`   📷 posts/${dir.name}/${file} (文章封面)`);
        if (dimensions) {
          console.log(`      尺寸: ${dimensions.width}x${dimensions.height} (建议: ≤${spec.maxDimensions.width}x${spec.maxDimensions.height})`);
          console.log(`      大小: ${fileSize}KB`);
          
          const needsResize = dimensions.width > spec.maxDimensions.width || 
                             dimensions.height > spec.maxDimensions.height;
          
          if (needsResize) {
            if (resize) {
              const tempPath = filePath + '.resized';
              resizeImage(filePath, tempPath, spec.maxDimensions.width, spec.maxDimensions.height, 'png');
              await fs.rename(tempPath, filePath);
              console.log(`      ✅ 已等比例缩放`);
            } else {
              console.log(`      ❌ 尺寸过大，运行 --resize 自动修复`);
            }
          } else {
            console.log(`      ✅ 符合要求`);
          }
        }
      }
    }
  } catch (error) {
    console.log(`   ⚠️  无法读取 posts 目录`);
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const resize = args.includes('--resize');
  
  console.log('🖼️  图片规格检查工具');
  console.log('═══════════════════════════════════════');
  console.log('');
  console.log('📋 图片要求：');
  console.log('');
  console.log('  👤 开发者头像 (avatar.png)');
  console.log('     格式: PNG | 尺寸: 200x200px');
  console.log('');
  console.log('  🌐 站点图标 (top.png)');
  console.log('     格式: PNG (支持透明) | 尺寸: 64x64px');
  console.log('');
  console.log('  💳 二维码/支付码 (wechat-pay.png, alipay.jpg)');
  console.log('     格式: PNG | 宽度: ≤400px');
  console.log('');
  console.log('  📰 文章封面 (*.png，与文章同名)');
  console.log('     格式: PNG | 尺寸: ≤1200x630px (16:9 比例)');
  console.log('');
  console.log('═══════════════════════════════════════');
  
  await processImagesDirectory(resize);
  await processPostCovers(resize);
  
  console.log('\n✅ 检查完成！');
}

main().catch(error => {
  console.error('❌ 执行失败:', error.message);
  process.exit(1);
});
