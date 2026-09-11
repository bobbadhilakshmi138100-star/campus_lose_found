import React from 'react';
import { X, ShieldCheck, Phone, Clock, MapPin } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-[#003366] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D32F2F]" />
            <h2 className="text-sm font-bold">Campus Security Central Desk</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 text-xs overflow-y-auto custom-scrollbar">
          {/* Emergency Advisory */}
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-[#D32F2F]">
            <h4 className="font-bold flex items-center gap-1.5 text-xs">
              <Phone className="w-4 h-4" /> Emergency &amp; Physical Vault Assistance
            </h4>
            <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
              High-value items (wallets, gold jewelry, laptops, government ID) are securely held
              at Main Gate 1 Security Vault.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Gate 1 Desk */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Central Security Desk
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#003366]" />
                Main Gate 1, Administrative Pavilion
              </div>
              <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Open 24/7 • Officer In-charge: Sub. R. Jadeja</span>
              </div>
              <a
                href="tel:+912817123456"
                className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 bg-[#003366] text-white rounded-lg font-bold text-[11px] hover:bg-[#002244] transition"
              >
                <Phone className="w-3 h-3" /> Call +91 (281) 712-3456 (Ext. 108)
              </a>
            </div>

            {/* Room 104 Locker */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Student Affairs Lost &amp; Found Locker
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#003366]" />
                Building A, Ground Floor, Room 104
              </div>
              <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>Mon–Sat: 9:00 AM – 5:30 PM</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                Drop off or inspect small documents, notebooks, and hostel items during office hours.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer mt-2"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
