import React from 'react';
import { Search, HeartHandshake, Plus, MapPin, MessageSquareText } from 'lucide-react';
import { ItemType } from '../types';

interface BottomNavProps {
  currentTab: ItemType;
  onTabChange: (tab: ItemType) => void;
  onOpenReport: () => void;
  onOpenMap: () => void;
  onOpenClaims: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenReport,
  onOpenMap,
  onOpenClaims,
}) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 z-40 flex items-center justify-between shadow-lg">
      <button
        onClick={() => onTabChange('lost')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer ${
          currentTab === 'lost' ? 'text-[#D32F2F]' : 'text-slate-500 hover:text-[#003366]'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-bold">Lost Feed</span>
      </button>

      <button
        onClick={() => onTabChange('found')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer ${
          currentTab === 'found' ? 'text-[#003366]' : 'text-slate-500 hover:text-[#003366]'
        }`}
      >
        <HeartHandshake className="w-5 h-5" />
        <span className="text-[10px] font-medium">Found Feed</span>
      </button>

      {/* Center Big Report Action Button */}
      <button
        onClick={onOpenReport}
        className="-mt-5 w-13 h-13 rounded-full bg-gradient-to-tr from-[#003366] to-[#0A4A8F] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform ring-4 ring-white cursor-pointer"
        title="Report Lost or Found Item"
      >
        <Plus className="w-6 h-6" />
      </button>

      <button
        onClick={onOpenMap}
        className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#003366] cursor-pointer"
      >
        <MapPin className="w-5 h-5" />
        <span className="text-[10px] font-medium">Campus Map</span>
      </button>

      <button
        onClick={onOpenClaims}
        className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#003366] cursor-pointer"
      >
        <MessageSquareText className="w-5 h-5" />
        <span className="text-[10px] font-medium">My Claims</span>
      </button>
    </nav>
  );
};
