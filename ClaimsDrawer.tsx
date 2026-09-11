import React from 'react';
import { X, MessageSquareText, ShieldAlert } from 'lucide-react';
import { ClaimRecord } from '../types';

interface ClaimsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  claims: ClaimRecord[];
  onOpenChatForPost: (postId: string, title: string) => void;
}

export const ClaimsDrawer: React.FC<ClaimsDrawerProps> = ({
  isOpen,
  onClose,
  claims,
  onOpenChatForPost,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-[#003366] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareText className="w-5 h-5 text-rose-300" />
            <h2 className="text-sm font-bold">My Campus Claims &amp; Threads</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-2.5 text-xs custom-scrollbar">
          {claims.length === 0 ? (
            <div className="text-center py-10 text-slate-400 space-y-2">
              <ShieldAlert className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-semibold text-slate-600">No Claims Submitted Yet</p>
              <p className="text-[11px] max-w-xs mx-auto">
                When you spot a found item in the feed that belongs to you, tap &quot;Claim Item&quot; to
                submit your ownership proof.
              </p>
            </div>
          ) : (
            claims.map((c) => (
              <div
                key={c.id}
                className="bg-slate-50 border border-slate-200 p-3 rounded-xl shadow-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-800 text-xs truncate max-w-[200px]">
                    {c.itemTitle}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {c.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  <span className="font-semibold text-slate-700">Your submitted proof:</span> &quot;
                  {c.proof}&quot;
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">
                    {new Date(c.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChatForPost(c.postId, c.itemTitle);
                    }}
                    className="text-[#003366] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    View Chat &rarr;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
