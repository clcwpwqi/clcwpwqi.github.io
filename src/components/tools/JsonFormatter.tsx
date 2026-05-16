import { useState } from 'react';
import { Copy, Check, Minimize2, Maximize2 } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      if (!input.trim()) { setError('请输入 JSON'); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      if (!input.trim()) { setError('请输入 JSON'); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError((e as Error).message);
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
      <div className="flex flex-wrap gap-2">
        <button onClick={format} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">格式化</button>
        <button onClick={minify} className="px-4 py-2 rounded-lg bg-gray-600 text-white text-sm hover:bg-gray-700">压缩</button>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-gray-500">缩进:</label>
          <select value={indent} onChange={e => setIndent(Number(e.target.value))} className="text-sm bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='粘贴 JSON 内容...'
            className="w-full h-64 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <pre className="w-full h-64 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono overflow-auto">
            {error ? <span className="text-red-500">{error}</span> : output || <span className="text-gray-400">结果将显示在这里</span>}
          </pre>
          {output && (
            <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
