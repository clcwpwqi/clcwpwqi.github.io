/**
 * 颜色转换器工具
 * 支持 HEX、RGB、HSL 互转
 */
import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '@/utils/helpers';

interface ColorState {
  hex: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
}

export const ColorConverterTool: React.FC = () => {
  const [color, setColor] = useState<ColorState>({
    hex: '#3B82F6',
    r: 59,
    g: 130,
    b: 246,
    h: 217,
    s: 91,
    l: 60,
  });
  const [copiedField, setCopiedField] = useState<string>('');

  // HEX 转 RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // RGB 转 HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = Math.max(0, Math.min(255, x)).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase()
    );
  };

  // RGB 转 HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // HSL 转 RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const handleHexChange = (value: string) => {
    const hex = value.startsWith('#') ? value : '#' + value;
    setColor((prev) => ({ ...prev, hex }));

    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor({
        hex: hex.toUpperCase(),
        ...rgb,
        ...hsl,
      });
    }
  };

  const handleRgbChange = (field: 'r' | 'g' | 'b', value: number) => {
    const newColor = { ...color, [field]: Math.max(0, Math.min(255, value)) };
    const hex = rgbToHex(newColor.r, newColor.g, newColor.b);
    const hsl = rgbToHsl(newColor.r, newColor.g, newColor.b);
    setColor({ ...newColor, hex, ...hsl });
  };

  const handleHslChange = (field: 'h' | 's' | 'l', value: number) => {
    const newColor = { ...color, [field]: value };
    const rgb = hslToRgb(newColor.h, newColor.s, newColor.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColor({ ...newColor, ...rgb, hex });
  };

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    }
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    setColor({ hex, r, g, b, ...hsl });
  };

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div className="flex items-center space-x-4">
        <div
          className="w-24 h-24 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: color.hex }}
        />
        <div className="flex-1">
          <button
            onClick={generateRandomColor}
            className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            随机颜色
          </button>
        </div>
      </div>

      {/* HEX Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          HEX
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={color.hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono uppercase"
          />
          <button
            onClick={() => handleCopy(color.hex, 'hex')}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {copiedField === 'hex' ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* RGB Inputs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          RGB
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs text-gray-500">R</label>
            <input
              type="number"
              value={color.r}
              onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">G</label>
            <input
              type="number"
              value={color.g}
              onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">B</label>
            <input
              type="number"
              value={color.b}
              onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            value={`rgb(${color.r}, ${color.g}, ${color.b})`}
            readOnly
            className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
          />
          <button
            onClick={() => handleCopy(`rgb(${color.r}, ${color.g}, ${color.b})`, 'rgb')}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {copiedField === 'rgb' ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* HSL Inputs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          HSL
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs text-gray-500">H</label>
            <input
              type="number"
              value={color.h}
              onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">S (%)</label>
            <input
              type="number"
              value={color.s}
              onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">L (%)</label>
            <input
              type="number"
              value={color.l}
              onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            value={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
            readOnly
            className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
          />
          <button
            onClick={() => handleCopy(`hsl(${color.h}, ${color.s}%, ${color.l}%)`, 'hsl')}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {copiedField === 'hsl' ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* CSS Output */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          CSS 代码
        </label>
        <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg font-mono text-sm">
          <p className="text-gray-600 dark:text-gray-400">.color {'{'}</p>
          <p className="pl-4 text-gray-800 dark:text-gray-200">
            color: <span className="text-blue-600">{color.hex}</span>;
          </p>
          <p className="pl-4 text-gray-800 dark:text-gray-200">
            background-color: <span className="text-blue-600">{color.hex}</span>;
          </p>
          <p className="text-gray-600 dark:text-gray-400">{'}'}</p>
        </div>
      </div>
    </div>
  );
};
