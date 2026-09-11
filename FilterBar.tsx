import React from 'react';
import {
  Search,
  X,
  Laptop,
  CreditCard,
  Key,
  Briefcase,
  Shirt,
  HelpCircle,
  MapPin,
  ArrowDownUp,
} from 'lucide-react';
import { ItemCategory, CampusLocation } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: ItemCategory;
  onCategorySelect: (cat: ItemCategory) => void;
  selectedLocation: CampusLocation;
  onLocationChange: (loc: CampusLocation) => void;
  isSortNewest: boolean;
  onToggleSort: () => void;
}

const CATEGORIES: { label: ItemCategory; icon?: React.ReactNode }[] = [
  { label: 'All Categories' },
  { label: 'Electronics', icon: <Laptop className="w-3.5 h-3.5" /> },
  { label: 'ID Cards/Documents', icon: <CreditCard className="w-3.5 h-3.5" /> },
  { label: 'Keys', icon: <Key className="w-3.5 h-3.5" /> },
  { label: 'Bags', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { label: 'Clothing', icon: <Shirt className="w-3.5 h-3.5" /> },
  { label: 'Others', icon: <HelpCircle className="w-3.5 h-3.5" /> },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedLocation,
  onLocationChange,
  isSortNewest,
  onToggleSort,
}) => {
  return (
    <section className="px-4 pt-3 pb-2 bg-white border-b border-slate-200 sticky top-[98px] z-30 shadow-xs">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search items, ID number, hall, keys..."
          className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] placeholder-slate-400 transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Category Scroll Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pt-2.5 pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => onCategorySelect(cat.label)}
              className={`text-[11px] font-semibold px-3 py-1.5 rounded-full shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#003366] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label === 'ID Cards/Documents' ? 'ID & Docs' : cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Location Dropdown & Sort Row */}
      <div className="flex items-center justify-between gap-2 pt-2 text-[11px]">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-[#003366] shrink-0" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value as CampusLocation)}
            className="w-full bg-slate-100 border border-slate-200 text-slate-700 py-1 px-2 rounded-lg text-[11px] font-medium focus:outline-none focus:border-[#003366] truncate cursor-pointer"
          >
            <option value="all">All Campus Locations</option>
            <option value="Central Library">Central Library (Main Block)</option>
            <option value="Building A Canteen">Building A Canteen / Food Court</option>
            <option value="PG Hostel Block B">PG Hostel Block B</option>
            <option value="Main Auditorium">Main Auditorium &amp; Amphitheater</option>
            <option value="Sports Ground">Cricket / Sports Ground &amp; Gym</option>
            <option value="Bus & Visitor Parking">Bus &amp; Visitor Parking Gate 2</option>
            <option value="Faculty Cabin / Admin">Administrative Block / Faculty</option>
          </select>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleSort}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg font-medium transition cursor-pointer"
            title="Sort date order"
          >
            <ArrowDownUp className="w-3 h-3 text-slate-500" />
            <span>{isSortNewest ? 'Newest' : 'Oldest'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
