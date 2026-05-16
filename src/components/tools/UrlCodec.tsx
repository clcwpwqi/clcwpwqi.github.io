import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function UrlCodec() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const convert = () => {
    if (!input.trim()) return;
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput('无效的输入');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => { setMode('encode'); setOutput(''); }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          编码
        </button>
        <button
          onClick={() => { setMode('decode'); setOutput(''); }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          解码
        </button>
        <button onClick={convert} className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
          转换
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '输入 URL 或文本...' : '输入编码后的 URL...'}
          className="w-full h-32 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <textarea
            readOnly
            value={output}
            placeholder="结果..."
            className="w-full h-32 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono resize-none"
          />
          {output && (
            <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-200 dark:bg-gray-700">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
