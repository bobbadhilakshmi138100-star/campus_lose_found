import React from 'react';
import { X, MapPin } from 'lucide-react';
import { ItemPost, CampusLocation } from '../types';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: ItemPost[];
  onSelectLocation: (loc: CampusLocation) => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  const getCount = (loc: string) => {
    return posts.filter((p) => p.location.toLowerCase().includes(loc.toLowerCase())).length;
  };

  const handlePickLocation = (loc: CampusLocation) => {
    onSelectLocation(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-[#003366] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D32F2F]" />
            <h2 className="text-sm font-bold">Marwadi University Campus Hotspots</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 text-xs custom-scrollbar">
          {/* Visual Stylized Campus Map SVG */}
          <div className="relative w-full h-44 bg-slate-900 rounded-xl overflow-hidden border border-slate-300 shadow-inner flex items-center justify-center">
            {/* Background Grid representing campus aerial layout */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <pattern id="campusgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#campusgrid)" />
            </svg>

            {/* Campus Pathways & Roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180">
              {/* Main Highway Ring */}
              <path
                d="M 20 90 Q 200 20 380 90"
                fill="none"
                stroke="#475569"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 20 90 Q 200 20 380 90"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="6,4"
              />

              {/* Cross Avenues */}
              <path d="M 120 160 L 140 50" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <path d="M 270 160 L 250 50" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <circle
                cx="200"
                cy="85"
                r="30"
                fill="#003366"
                fillOpacity="0.5"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
            </svg>

            {/* Interactive Hotspot Pins */}
            <div
              className="absolute top-5 left-10 text-center cursor-pointer group hover:scale-105 transition"
              onClick={() => handlePickLocation('Central Library')}
            >
              <span className="w-5 h-5 rounded-full bg-[#003366] text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-white">
                1
              </span>
              <span className="text-[9px] font-semibold bg-white/90 text-slate-800 px-1 py-0.5 rounded shadow-xs mt-0.5 inline-block">
                Library
              </span>
            </div>

            <div
              className="absolute top-6 right-10 text-center cursor-pointer group hover:scale-105 transition"
              onClick={() => handlePickLocation('Building A Canteen')}
            >
              <span className="w-5 h-5 rounded-full bg-[#D32F2F] text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-white">
                2
              </span>
              <span className="text-[9px] font-semibold bg-white/90 text-slate-800 px-1 py-0.5 rounded shadow-xs mt-0.5 inline-block">
                Canteen
              </span>
            </div>

            <div
              className="absolute bottom-6 left-16 text-center cursor-pointer group hover:scale-105 transition"
              onClick={() => handlePickLocation('PG Hostel Block B')}
            >
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-white">
                3
              </span>
              <span className="text-[9px] font-semibold bg-white/90 text-slate-800 px-1 py-0.5 rounded shadow-xs mt-0.5 inline-block">
                Hostel B
              </span>
            </div>

            <div
              className="absolute bottom-6 right-16 text-center cursor-pointer group hover:scale-105 transition"
              onClick={() => handlePickLocation('Bus & Visitor Parking')}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-white">
                4
              </span>
              <span className="text-[9px] font-semibold bg-white/90 text-slate-800 px-1 py-0.5 rounded shadow-xs mt-0.5 inline-block">
                Parking
              </span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="bg-black/60 px-2.5 py-0.5 rounded-full text-[9px] text-slate-200 border border-white/20">
                MU Main Circle
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            Click on any campus zone to filter active reports:
          </p>

          {/* Hotspot List */}
          <div className="divide-y divide-slate-100 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden text-xs">
            <button
              onClick={() => handlePickLocation('Central Library')}
              className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-100 text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#003366]" />
                <span className="font-semibold text-slate-800">Central Library (3 Floors)</span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {getCount('Central Library')} items
              </span>
            </button>

            <button
              onClick={() => handlePickLocation('Building A Canteen')}
              className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-100 text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                <span className="font-semibold text-slate-800">
                  Building A Canteen &amp; Food Court
                </span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {getCount('Building A Canteen')} items
              </span>
            </button>

            <button
              onClick={() => handlePickLocation('PG Hostel Block B')}
              className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-100 text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-slate-800">PG Hostel Block B Lounge</span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {getCount('PG Hostel Block B')} items
              </span>
            </button>

            <button
              onClick={() => handlePickLocation('Bus & Visitor Parking')}
              className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-100 text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="font-semibold text-slate-800">
                  Bus &amp; Visitor Parking Gate 2
                </span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {getCount('Bus & Visitor Parking')} items
              </span>
            </button>

            <button
              onClick={() => handlePickLocation('Main Auditorium')}
              className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-100 text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="font-semibold text-slate-800">
                  Main Auditorium &amp; Amphitheater
                </span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {getCount('Main Auditorium')} items
              </span>
            </button>

            <button
              onClick={() => handlePickLocation('Sports Ground')}
              className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-100 text-left transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-semibold text-slate-800">Sports Ground &amp; Pavilion</span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {getCount('Sports Ground')} items
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
