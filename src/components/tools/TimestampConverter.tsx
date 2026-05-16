import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');
  const [now, setNow] = useState(Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tsToDate = () => {
    if (!timestamp.trim()) return;
    const ts = parseInt(timestamp) * (timestamp.length <= 10 ? 1000 : 1);
    const d = new Date(ts);
    if (!isNaN(d.getTime())) {
      setDate(d.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
    }
  };

  const dateToTs = () => {
    if (!date.trim()) return;
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      setTimestamp(String(Math.floor(d.getTime() / 1000)));
    }
  };

  const useNow = () => {
    setTimestamp(String(Math.floor(now / 1000)));
    setDate(new Date(now).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
  };

  const handleCopy = async () => {
    const text = timestamp || date;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
        <span className="text-sm text-gray-500">当前时间戳</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold">{Math.floor(now / 1000)}</span>
          <button onClick={useNow} className="px-2 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700">使用当前</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">时间戳 → 日期</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={timestamp}
              onChange={e => setTimestamp(e.target.value)}
              placeholder="输入 Unix 时间戳"
              className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={tsToDate} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">转换</button>
          </div>
          {date && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">日期 → 时间戳</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder="输入日期时间"
              className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={dateToTs} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">转换</button>
          </div>
          {timestamp && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 font-mono">{timestamp}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          复制
        </button>
      </div>
    </div>
  );
}
