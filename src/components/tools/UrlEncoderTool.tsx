/**
 * URL 编解码工具
 */
import React, { useState } from 'react';
import { Copy, Check, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';
import { copyToClipboard } from '@/utils/helpers';

export const UrlEncoderTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError('');
        return;
      }
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setError('');
    } catch (err) {
      setError('编码失败: ' + (err as Error).message);
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError('');
        return;
      }
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError('解码失败: 无效的 URL 编码字符串');
      setOutput('');
    }
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError('');
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'encode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          编码
        </button>
        <button
          onClick={switchMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          解码
        </button>
      </div>

      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === 'encode' ? '输入文本' : '输入 URL 编码'}
          </label>
          <button
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-red-500 flex items-center"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            清空
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入要解码的 URL...'}
          className="w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        {mode === 'encode' ? (
          <>
            <ArrowRight className="w-4 h-4 mr-2" />
            编码
          </>
        ) : (
          <>
            <ArrowLeft className="w-4 h-4 mr-2" />
            解码
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'encode' ? 'URL 编码结果' : '解码结果'}
            </label>
            <button
              onClick={handleCopy}
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
          <textarea
            value={output}
            readOnly
            className="w-full h-32 p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-y break-all"
          />
        </div>
      )}

      {/* Common Examples */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          常用字符编码参考
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-gray-500">空格</span>
            <span className="block font-mono text-blue-600">%20</span>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-gray-500">&</span>
            <span className="block font-mono text-blue-600">%26</span>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-gray-500">=</span>
            <span className="block font-mono text-blue-600">%3D</span>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-gray-500">?</span>
            <span className="block font-mono text-blue-600">%3F</span>
          </div>
        </div>
      </div>
    </div>
  );
};
