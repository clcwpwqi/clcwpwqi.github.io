import { useState } from 'react';
import { Heart, CreditCard } from 'lucide-react';
import { getIcon } from '../utils/icons';
import type { SupportMethod } from '../types';

interface SupportSectionProps {
  title: string;
  description: string;
  methods: SupportMethod[];
}

export default function SupportSection({ title, description, methods }: SupportSectionProps) {
  const [showModal, setShowModal] = useState<string | null>(null);

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-500" />
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {methods.map((method, idx) => {
          const IconComponent = getIcon(method.icon);
          return (
            <button
              key={idx}
              onClick={() => setShowModal(method.image)}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <IconComponent className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">{method.text}</span>
            </button>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <img src={showModal} alt="打赏码" className="w-full max-w-[200px] mx-auto rounded-lg" />
            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">扫码打赏，感谢支持！</p>
          </div>
        </div>
      )}
    </section>
  );
}
