import { useState } from 'react';
import { getConfig } from '../data';
import PageTransition from '../components/PageTransition';
import { getIcon } from '../utils/icons';
import JsonFormatter from '../components/tools/JsonFormatter';
import Base64Converter from '../components/tools/Base64Converter';
import TimestampConverter from '../components/tools/TimestampConverter';
import TextDiff from '../components/tools/TextDiff';
import UrlCodec from '../components/tools/UrlCodec';
import ColorConverter from '../components/tools/ColorConverter';

const toolComponents: Record<string, React.ComponentType> = {
  JsonFormatter,
  Base64Converter,
  TimestampConverter,
  TextDiff,
  UrlCodec,
  ColorConverter,
};

export default function ToolsPage() {
  const config = getConfig();
  const { tools } = config;
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const visibleTools = tools.tools.filter(t => t.show);

  const ActiveComponent = activeTool ? toolComponents[tools.tools.find(t => t.id === activeTool)?.component || ''] : null;
  const activeToolConfig = tools.tools.find(t => t.id === activeTool);

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">{tools.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">{tools.subtitle}</p>

        {activeTool && activeToolConfig && ActiveComponent ? (
          <div>
            <button
              onClick={() => setActiveTool(null)}
              className="mb-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← 返回工具箱
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">{activeToolConfig.name}</h2>
              <ActiveComponent />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTools.map(tool => {
              const IconComponent = getIcon(tool.icon);
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all text-left"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
