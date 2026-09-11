import React from 'react';
import { Map } from 'lucide-react';
import { ItemType } from '../types';

interface TabsHeaderProps {
  currentTab: ItemType;
  onTabChange: (tab: ItemType) => void;
  lostCount: number;
  foundCount: number;
  onOpenMap: () => void;
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({
  currentTab,
  onTabChange,
  lostCount,
  foundCount,
  onOpenMap,
}) => {
  return (
    <div className="px-4 pt-3">
      {/* Dual Tab Segmented Switcher */}
      <div className="bg-slate-200/90 p-1 rounded-xl flex items-center shadow-inner relative">
        <button
          onClick={() => onTabChange('lost')}
          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            currentTab === 'lost'
              ? 'text-[#D32F2F] bg-white shadow-xs'
              : 'text-slate-600 hover:text-[#003366]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
          <span>Lost Belongings</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
              currentTab === 'lost'
                ? 'bg-rose-100 text-[#D32F2F]'
                : 'bg-slate-300 text-slate-700'
            }`}
          >
            {lostCount}
          </span>
        </button>

        <button
          onClick={() => onTabChange('found')}
          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            currentTab === 'found'
              ? 'text-[#003366] bg-white shadow-xs'
              : 'text-slate-600 hover:text-[#003366]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Found Items</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
              currentTab === 'found'
                ? 'bg-blue-100 text-[#003366]'
                : 'bg-slate-300 text-slate-700'
            }`}
          >
            {foundCount}
          </span>
        </button>
      </div>

      {/* Active Feed Summary & Status Guide */}
      <div className="pt-2.5 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-800">
            {currentTab === 'lost' ? 'Showing Lost Items' : 'Showing Found Items'}
          </span>
          <span className="text-[11px] text-slate-400">• Marwadi University Campus</span>
        </div>
        <button
          onClick={onOpenMap}
          className="text-[#003366] font-semibold text-[11px] flex items-center gap-1 hover:underline cursor-pointer"
        >
          <Map className="w-3.5 h-3.5 text-[#003366]" />
          <span>Map View</span>
        </button>
      </div>
    </div>
  );
};
