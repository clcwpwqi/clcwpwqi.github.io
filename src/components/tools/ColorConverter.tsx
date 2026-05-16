import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#3B82F6');
  const [copied, setCopied] = useState('');

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100;
    let r: number, g: number, b: number;
    if (s === 0) { r = g = b = l; }
    else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(''), 2000);
    } catch {}
  };

  return (
    <div className="space-y-4">
      {/* Color picker */}
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={hex}
          onChange={e => setHex(e.target.value)}
          className="w-16 h-16 rounded-lg cursor-pointer border-0"
        />
        <div className="flex-1">
          <input
            type="text"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3B82F6"
          />
          <p className="text-xs text-gray-500 mt-1">输入 HEX 颜色值</p>
        </div>
      </div>

      {/* Preview */}
      <div
        className="w-full h-16 rounded-lg border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: hex }}
      />

      {/* Values */}
      <div className="space-y-2">
        {[
          { label: 'HEX', value: hex.toUpperCase() },
          { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '' },
          { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-500">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">{item.value}</span>
              {item.value && (
                <button
                  onClick={() => handleCopy(item.value, item.label)}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {copied === item.label ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Convert RGB/HSL to HEX */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium mb-2">RGB / HSL → HEX</h3>
        <div className="grid grid-cols-3 gap-2">
          {['r', 'g', 'b'].map(channel => (
            <div key={channel}>
              <label className="text-xs text-gray-500 uppercase">{channel.toUpperCase()}</label>
              <input
                type="number"
                min="0"
                max="255"
                defaultValue={rgb?.[channel as 'r' | 'g' | 'b'] || 0}
                onChange={e => {
                  const vals = { r: 0, g: 0, b: 0 };
                  document.querySelectorAll('[data-rgb]').forEach((el, i) => {
                    const key = ['r', 'g', 'b'][i];
                    vals[key as 'r' | 'g' | 'b'] = parseInt((el as HTMLInputElement).value) || 0;
                  });
                  setHex(rgbToHex(vals.r, vals.g, vals.b));
                }}
                data-rgb
                className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
