/**
 * 工具箱页面
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Braces, 
  Code, 
  Clock, 
  GitCompare, 
  Link, 
  Palette,
  X
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { JsonFormatter } from '@/components/tools/JsonFormatter';
import { Base64Tool } from '@/components/tools/Base64Tool';
import { TimestampTool } from '@/components/tools/TimestampTool';
import { TextDiffTool } from '@/components/tools/TextDiffTool';
import { UrlEncoderTool } from '@/components/tools/UrlEncoderTool';
import { ColorConverterTool } from '@/components/tools/ColorConverterTool';
import { cn } from '@/lib/utils';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  component: React.ComponentType;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON 格式化',
    description: '格式化、验证、压缩 JSON 数据',
    icon: Braces,
    component: JsonFormatter,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    description: 'Base64 编码和解码工具',
    icon: Code,
    component: Base64Tool,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: 'Unix 时间戳与日期时间互转',
    icon: Clock,
    component: TimestampTool,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'text-diff',
    name: '文本对比',
    description: '比较两段文本的差异',
    icon: GitCompare,
    component: TextDiffTool,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'url-encoder',
    name: 'URL 编解码',
    description: 'URL 编码和解码工具',
    icon: Link,
    component: UrlEncoderTool,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'color-converter',
    name: '颜色转换器',
    description: 'HEX、RGB、HSL 颜色格式互转',
    icon: Palette,
    component: ColorConverterTool,
    color: 'from-pink-500 to-rose-500',
  },
];

export const ToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);
  };

  const handleClose = () => {
    setActiveTool(null);
  };

  return (
    <>
      <SEO
        title="工具箱"
        description="实用的前端开发工具集合，包括 JSON 格式化、Base64 编解码、时间戳转换等"
        url="/tools"
        keywords={['工具', 'JSON', 'Base64', '时间戳', 'URL编码', '颜色转换']}
      />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <Wrench className="w-8 h-8 mr-3 text-blue-500" />
              开发者工具箱
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              实用的纯前端开发工具，无需后端服务，数据完全在本地处理，安全高效
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleToolClick(tool)}
                  className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-left hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4',
                      tool.color
                    )}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tool Modal */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
                <div className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mr-3',
                      activeTool.color
                    )}
                  >
                    <activeTool.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {activeTool.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activeTool.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <activeTool.component />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
