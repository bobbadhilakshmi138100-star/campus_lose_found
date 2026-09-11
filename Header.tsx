import React, { useState } from 'react';
import { ShieldCheck, Bell, MapPin } from 'lucide-react';
import { MARWADI_LOGO_URL } from '../data';
import { NotificationItem } from '../types';

interface HeaderProps {
  notifications: NotificationItem[];
  onOpenSecurity: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onOpenSecurity,
  onOpenNotifications,
}) => {
  const [imgError, setImgError] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-[#003366] text-white px-4 pt-4 pb-3 shadow-md">
      <div className="flex items-center justify-between gap-3">
        {/* Logo & University Identity */}
        <div className="flex items-center gap-2.5">
          {!imgError ? (
            <img
              src={MARWADI_LOGO_URL}
              alt="Marwadi University Official Logo"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-10 h-10 rounded-lg object-contain bg-white/10 p-0.5 border border-white/20 shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-white/10 p-1 border border-white/20 shadow-sm flex items-center justify-center text-rose-400 font-bold text-sm">
              <ShieldCheck className="w-6 h-6 text-rose-300" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wider text-rose-300 uppercase">
                Marwadi University
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block pulse-dot" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight leading-none mt-0.5">
              Campus Lost &amp; Found
            </h1>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full hover:bg-white/10 text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            title="Campus Notifications"
            aria-label="Campus Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#D32F2F] ring-2 ring-[#003366]" />
            )}
          </button>

          {/* Campus Security Desk Quick Contact */}
          <button
            onClick={onOpenSecurity}
            className="flex items-center gap-1.5 bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-full shadow-sm transition-all active:scale-95 cursor-pointer"
            title="Campus Security Desk"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security</span>
          </button>
        </div>
      </div>

      {/* Quick Location Banner / Live Activity Bar */}
      <div className="mt-3 flex items-center justify-between bg-[#002244]/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 border border-white/10">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
          <span className="text-[11px] font-medium text-slate-300 truncate">
            Campus: Gauridad, Rajkot Highway
          </span>
        </div>
        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-emerald-300 font-semibold shrink-0">
          87% Return Rate
        </span>
      </div>
    </header>
  );
};
