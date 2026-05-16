import { useState } from 'react';

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const maxLines = Math.max(lines1.length, lines2.length);

  const getDiffStatus = (line: string | undefined, otherLine: string | undefined) => {
    if (line === undefined && otherLine !== undefined) return 'added';
    if (line !== undefined && otherLine === undefined) return 'removed';
    if (line !== otherLine) return 'changed';
    return 'same';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">文本 1</label>
          <textarea
            value={text1}
            onChange={e => setText1(e.target.value)}
            placeholder="输入第一段文本..."
            className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">文本 2</label>
          <textarea
            value={text2}
            onChange={e => setText2(e.target.value)}
            placeholder="输入第二段文本..."
            className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {text1 && text2 && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-3 py-2 text-left w-10">#</th>
                <th className="px-3 py-2 text-left">对比结果</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxLines }, (_, i) => {
                const l1 = lines1[i];
                const l2 = lines2[i];
                const status = getDiffStatus(l1, l2);
                const displayLine = l2 ?? l1 ?? '';
                const bg = status === 'added' ? 'bg-green-50 dark:bg-green-900/20' : status === 'removed' ? 'bg-red-50 dark:bg-red-900/20' : status === 'changed' ? 'bg-yellow-50 dark:bg-yellow-900/20' : '';
                const prefix = status === 'added' ? '+' : status === 'removed' ? '-' : status === 'changed' ? '~' : ' ';
                const color = status === 'added' ? 'text-green-600' : status === 'removed' ? 'text-red-600' : status === 'changed' ? 'text-yellow-600' : 'text-gray-400';
                return (
                  <tr key={i} className={`border-t border-gray-100 dark:border-gray-800 ${bg}`}>
                    <td className="px-3 py-1 font-mono text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-3 py-1 font-mono">
                      <span className={color}>{prefix} </span>
                      {displayLine || <span className="text-gray-400 italic">空行</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
