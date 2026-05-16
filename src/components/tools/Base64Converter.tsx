import { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const convert = () => {
    try {
      if (!input.trim()) { setError('请输入内容'); return; }
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
      setError('');
    } catch (e) {
      setError(mode === 'decode' ? '无效的 Base64 字符串' : (e as Error).message);
      setOutput('');
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
          onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          编码
        </button>
        <button
          onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          解码
        </button>
        <button onClick={convert} className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 flex items-center gap-1">
          转换 <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入 Base64 字符串...'}
          className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <textarea
            readOnly
            value={output}
            placeholder="结果..."
            className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono resize-none"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
