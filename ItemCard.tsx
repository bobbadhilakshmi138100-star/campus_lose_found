import React from 'react';
import {
  MapPin,
  Clock,
  MessageCircle,
  MoreVertical,
  Check,
  Laptop,
  CreditCard,
  Key,
  Briefcase,
  HelpCircle,
  Glasses,
  HandMetal,
} from 'lucide-react';
import { ItemPost } from '../types';

interface ItemCardProps {
  item: ItemPost;
  onOpenChat: (item: ItemPost) => void;
  onOpenClaim: (item: ItemPost) => void;
  onCycleStatus: (id: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onOpenChat,
  onOpenClaim,
  onCycleStatus,
}) => {
  const isLost = item.type === 'lost';

  const renderThumbnail = () => {
    if (item.photoUrl) {
      return (
        <img
          src={item.photoUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      );
    }

    if (item.category === 'ID Cards/Documents' || item.imageSvgType === 'id-card') {
      return (
        <div className="w-full h-full bg-blue-50 flex items-center justify-center text-[#003366]">
          <CreditCard className="w-7 h-7" />
        </div>
      );
    }
    if (item.category === 'Keys' || item.imageSvgType === 'key') {
      return (
        <div className="w-full h-full bg-rose-50 flex items-center justify-center text-[#D32F2F]">
          <Key className="w-7 h-7" />
        </div>
      );
    }
    if (item.category === 'Bags' || item.imageSvgType === 'backpack') {
      return (
        <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-700">
          <Briefcase className="w-7 h-7" />
        </div>
      );
    }
    if (item.imageSvgType === 'glasses') {
      return (
        <div className="w-full h-full bg-purple-50 flex items-center justify-center text-purple-700">
          <Glasses className="w-7 h-7" />
        </div>
      );
    }
    if (item.category === 'Electronics') {
      return (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-700">
          <Laptop className="w-7 h-7" />
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#003366]">
        <HelpCircle className="w-7 h-7" />
      </div>
    );
  };

  const renderStatusBadge = () => {
    switch (item.status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
          </span>
        );
      case 'Under Verification':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Under Verification
          </span>
        );
      case 'Claimed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#003366] border border-blue-200">
            Claimed
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
            <Check className="w-3 h-3 text-slate-500" /> Returned / Resolved
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-medium text-slate-500">{item.status}</span>
        );
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs transition-all ${
        isLost ? 'hover:border-[#D32F2F]/40' : 'hover:border-[#003366]/40'
      } relative`}
    >
      <div className="flex items-start gap-3">
        {/* Item Visual Thumbnail */}
        <div className="w-18 h-18 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
          {renderThumbnail()}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            {isLost ? (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 text-[#D32F2F]">
                Lost Item
              </span>
            ) : (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Found Item
              </span>
            )}
            {renderStatusBadge()}
          </div>

          <h3
            className="text-[13px] font-bold text-slate-900 leading-snug truncate"
            title={item.title}
          >
            {item.title}
          </h3>

          {/* Location & Timestamp Badges */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[11px] text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1 text-slate-700 font-semibold truncate max-w-[200px]">
              <MapPin className="w-3 h-3 text-[#D32F2F] shrink-0" />
              {item.location}
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              {item.date}
            </span>
          </div>

          {/* Short description preview */}
          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Bottom Bar & Interactive Actions */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-[9px] flex items-center justify-center border border-slate-200">
            {item.avatarInitials}
          </span>
          <span className="text-[11px] text-slate-500 truncate">{item.author}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* If it's a found item and not Resolved, show Claim Item button */}
          {!isLost && item.status !== 'Resolved' && (
            <button
              onClick={() => onOpenClaim(item)}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
            >
              <HandMetal className="w-3 h-3" /> Claim Item
            </button>
          )}

          {/* Chat button */}
          <button
            onClick={() => onOpenChat(item)}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#003366] font-semibold rounded-lg text-[11px] flex items-center gap-1 transition active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-3 h-3" /> Chat
          </button>

          {/* Status cycle toggle button */}
          <button
            onClick={() => onCycleStatus(item.id)}
            title="Cycle status (Active / Under Verification / Claimed / Resolved)"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
