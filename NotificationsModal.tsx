import React from 'react';
import { X, Bell, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-[#003366] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-300" />
            <h2 className="text-sm font-bold">Campus Alerts &amp; Updates</h2>
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
          <div className="flex justify-between items-center pb-1">
            <span className="text-[11px] text-slate-500 font-medium">Recent Activity</span>
            <button
              onClick={onMarkAllRead}
              className="text-[11px] text-[#003366] font-bold hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          </div>

          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-xl border transition ${
                notif.read
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-blue-50/60 border-blue-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">
                  {notif.type === 'claim' && <ShieldCheck className="w-4 h-4 text-amber-600" />}
                  {notif.type === 'return' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {notif.type === 'alert' && <AlertCircle className="w-4 h-4 text-[#003366]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-xs truncate">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
