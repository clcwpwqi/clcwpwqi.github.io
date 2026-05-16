#!/usr/bin/env node
/**
 * 配置文件合并脚本
 * 读取 /configs 目录下的所有 JSON 配置文件，合并为 src/data/config.json
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIGS_DIR = path.join(__dirname, '..', 'configs');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'config.json');

/**
 * 读取并合并所有配置文件
 */
async function buildConfigs() {
  console.log('⚙️  开始读取配置文件...\n');
  
  const config = {};
  
  try {
    // 读取所有 JSON 文件（排除 .md 文件）
    const files = await fs.readdir(CONFIGS_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json') && !file.endsWith('.json.md'));
    
    console.log(`📁 找到 ${jsonFiles.length} 个配置文件`);
    
    for (const file of jsonFiles) {
      const name = path.basename(file, '.json');
      const filepath = path.join(CONFIGS_DIR, file);
      
      try {
        const content = await fs.readFile(filepath, 'utf-8');
        // 解析 JSON，跳过注释字段（以 _ 开头的键）
        const data = JSON.parse(content);
        
        // 移除注释字段
        const cleanedData = removeComments(data);
        
        config[name] = cleanedData;
        console.log(`✅ 已加载: ${file}`);
      } catch (error) {
        console.error(`❌ 加载 ${file} 失败:`, error.message);
      }
    }
    
    // 写入合并后的配置文件
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(config, null, 2), 'utf-8');
    
    console.log(`\n✅ 配置合并完成！`);
    console.log(`📁 输出: src/data/config.json`);
    
    return config;
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

/**
 * 递归移除注释字段（以 _ 开头的键）
 */
function removeComments(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => removeComments(item));
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      // 跳过以 _ 开头的注释字段
      if (key.startsWith('_')) continue;
      result[key] = removeComments(value);
    }
    return result;
  }
  
  return obj;
}

// 运行构建
buildConfigs();
