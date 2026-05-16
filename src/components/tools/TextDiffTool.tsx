/**
 * 文本差异对比工具
 */
import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Trash2 } from 'lucide-react';
import { copyToClipboard } from '@/utils/helpers';

export const TextDiffTool: React.FC = () => {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  const [diffResult, setDiffResult] = useState<Array<{ type: 'same' | 'removed' | 'added'; content: string }>>([]);
  const [copied, setCopied] = useState(false);

  const computeDiff = () => {
    if (!oldText && !newText) {
      setDiffResult([]);
      return;
    }

    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const result: Array<{ type: 'same' | 'removed' | 'added'; content: string }> = [];

    let oldIndex = 0;
    let newIndex = 0;

    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      const oldLine = oldLines[oldIndex];
      const newLine = newLines[newIndex];

      if (oldIndex >= oldLines.length) {
        result.push({ type: 'added', content: newLine });
        newIndex++;
      } else if (newIndex >= newLines.length) {
        result.push({ type: 'removed', content: oldLine });
        oldIndex++;
      } else if (oldLine === newLine) {
        result.push({ type: 'same', content: oldLine });
        oldIndex++;
        newIndex++;
      } else {
        // 简单处理：如果不同，先标记旧行为删除，新行为添加
        result.push({ type: 'removed', content: oldLine });
        result.push({ type: 'added', content: newLine });
        oldIndex++;
        newIndex++;
      }
    }

    setDiffResult(result);
  };

  const handleClear = () => {
    setOldText('');
    setNewText('');
    setDiffResult([]);
  };

  const handleCopyDiff = async () => {
    const diffText = diffResult
      .map((item) => {
        const prefix = item.type === 'removed' ? '-' : item.type === 'added' ? '+' : ' ';
        return prefix + ' ' + item.content;
      })
      .join('\n');
    
    const success = await copyToClipboard(diffText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              原始文本
            </label>
            <span className="text-xs text-gray-500">{oldText.split('\n').length} 行</span>
          </div>
          <textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="输入原始文本..."
            className="w-full h-48 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              修改后文本
            </label>
            <span className="text-xs text-gray-500">{newText.split('\n').length} 行</span>
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="输入修改后的文本..."
            className="w-full h-48 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={computeDiff}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          对比差异
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          清空
        </button>
      </div>

      {/* Diff Result */}
      {diffResult.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              对比结果
            </label>
            <button
              onClick={handleCopyDiff}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  复制
                </>
              )}
            </button>
          </div>
          <div className="w-full h-64 overflow-auto rounded-lg bg-gray-900 font-mono text-sm">
            {diffResult.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.type === 'removed'
                    ? 'bg-red-900/30'
                    : item.type === 'added'
                    ? 'bg-green-900/30'
                    : ''
                }`}
              >
                <span
                  className={`w-8 flex-shrink-0 text-center select-none ${
                    item.type === 'removed'
                      ? 'text-red-500'
                      : item.type === 'added'
                      ? 'text-green-500'
                      : 'text-gray-500'
                  }`}
                >
                  {item.type === 'removed' ? '-' : item.type === 'added' ? '+' : ' '}
                </span>
                <span
                  className={`flex-1 whitespace-pre ${
                    item.type === 'removed'
                      ? 'text-red-300'
                      : item.type === 'added'
                      ? 'text-green-300'
                      : 'text-gray-300'
                  }`}
                >
                  {item.content || ' '}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-red-900/30 rounded mr-1" />
              删除
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-900/30 rounded mr-1" />
              新增
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
