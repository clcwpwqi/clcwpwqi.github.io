/**
 * 时间戳转换工具
 */
import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, Calendar, Clock } from 'lucide-react';
import { copyToClipboard } from '@/utils/helpers';

export const TimestampTool: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'timestamp' | 'datetime'>('timestamp');
  const [copied, setCopied] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));

  // 更新当前时间戳
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestampToDate = () => {
    if (!timestamp) return;
    
    const ts = parseInt(timestamp);
    if (isNaN(ts)) {
      setDateTime('无效的时间戳');
      return;
    }
    
    // 判断是秒还是毫秒
    const date = ts > 9999999999 ? new Date(ts) : new Date(ts * 1000);
    setDateTime(date.toLocaleString('zh-CN'));
  };

  const convertDateToTimestamp = () => {
    if (!dateTime) return;
    
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      setTimestamp('无效的日期时间');
      return;
    }
    
    setTimestamp(Math.floor(date.getTime() / 1000).toString());
  };

  const useCurrentTimestamp = () => {
    setTimestamp(currentTimestamp.toString());
    const date = new Date(currentTimestamp * 1000);
    setDateTime(date.toLocaleString('zh-CN'));
  };

  const useCurrentDateTime = () => {
    const now = new Date();
    const isoString = now.toISOString().slice(0, 16);
    setDateTime(isoString);
    setTimestamp(Math.floor(now.getTime() / 1000).toString());
  };

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Time Display */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">当前时间戳</p>
            <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
              {currentTimestamp}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">当前时间</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {new Date().toLocaleString('zh-CN')}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('timestamp')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'timestamp'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          时间戳转日期
        </button>
        <button
          onClick={() => setActiveTab('datetime')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'datetime'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          日期转时间戳
        </button>
      </div>

      {activeTab === 'timestamp' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unix 时间戳
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="输入时间戳..."
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
              <button
                onClick={useCurrentTimestamp}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={convertTimestampToDate}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            转换为日期时间
          </button>

          {dateTime && (
            <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white">{dateTime}</span>
                <button
                  onClick={() => handleCopy(dateTime)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              日期时间
            </label>
            <div className="flex space-x-2">
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                onClick={useCurrentDateTime}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={convertDateToTimestamp}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            转换为时间戳
          </button>

          {timestamp && (
            <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-gray-900 dark:text-white">{timestamp}</span>
                <button
                  onClick={() => handleCopy(timestamp)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
