import React, { useState, useRef } from 'react';
import {
  X,
  FilePenLine,
  AlertCircle,
  HeartHandshake,
  MapPin,
  Camera,
  Check,
  Send,
  MessageCircle,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { ItemPost, ItemType, ItemCategory, CampusLocation } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: ItemPost) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reportType, setReportType] = useState<ItemType>('lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState<string>('Central Library');
  const [description, setDescription] = useState('');
  const [contactPref, setContactPref] = useState<'In-App Chat' | 'Security Desk' | 'Student Phone'>(
    'In-App Chat'
  );
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    let imageSvgType = 'default';
    if (category === 'ID Cards/Documents') imageSvgType = 'id-card';
    else if (category === 'Keys') imageSvgType = 'key';
    else if (category === 'Bags') imageSvgType = 'backpack';
    else if (category === 'Electronics') imageSvgType = 'charger';

    const newItem: ItemPost = {
      id: 'post-' + Date.now(),
      type: reportType,
      title: title.trim(),
      category: category,
      location: location,
      locationDetail: 'Reported Campus Area',
      date: 'Just now',
      timestamp: Date.now(),
      status: 'Active',
      description: description.trim(),
      contactPref: contactPref,
      author: 'Current Student (You)',
      avatarInitials: 'YOU',
      imageSvgType: imageSvgType,
      photoUrl: photoUrl,
    };

    onSubmit(newItem);
    // Reset form
    setTitle('');
    setDescription('');
    setPhotoUrl(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-[#003366] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilePenLine className="w-5 h-5 text-rose-300" />
            <h2 className="text-sm font-bold">Report an Item</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs">
          {/* Post Type Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              What are you reporting?
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setReportType('lost')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  reportType === 'lost'
                    ? 'bg-[#D32F2F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>I Lost Something</span>
              </button>

              <button
                type="button"
                onClick={() => setReportType('found')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  reportType === 'found'
                    ? 'bg-[#003366] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>I Found Something</span>
              </button>
            </div>
          </div>

          {/* Item Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Item Title <span className="text-[#D32F2F]">*</span>
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Apple AirPods Pro in White Case"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366]"
            />
          </div>

          {/* Category & Date Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category <span className="text-[#D32F2F]">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366] cursor-pointer"
              >
                <option value="Electronics">Electronics</option>
                <option value="ID Cards/Documents">ID Cards/Documents</option>
                <option value="Keys">Keys</option>
                <option value="Clothing">Clothing</option>
                <option value="Bags">Bags</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date &amp; Approx Time <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366]"
              />
            </div>
          </div>

          {/* Campus Location Spot Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Campus Location Spot <span className="text-[#D32F2F]">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-2.5 top-2.5 text-[#D32F2F]" />
              <select
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366] font-medium cursor-pointer"
              >
                <option value="Central Library">Central Library (Reading Hall / 2nd Floor)</option>
                <option value="Building A Canteen">Building A Canteen &amp; Food Court</option>
                <option value="PG Hostel Block B">PG Hostel Block B (Common Lounge)</option>
                <option value="Main Auditorium">Main Auditorium &amp; Amphitheater</option>
                <option value="Sports Ground">Cricket / Sports Ground &amp; Pavilion</option>
                <option value="Bus & Visitor Parking">Bus &amp; Visitor Parking (Gate 2)</option>
                <option value="Faculty Cabin / Admin">Administrative Block &amp; Reception</option>
              </select>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Select the most accurate zone at MU campus.</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description &amp; Distinguishing Marks <span className="text-[#D32F2F]">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention color, stickers, scratch marks, serial clues (keep one secret detail for claim verification)..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366]"
            />
          </div>

          {/* Contact / Drop-off Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Handoff / Contact Preference
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => setContactPref('In-App Chat')}
                className={`border rounded-lg p-2 flex flex-col items-center text-center cursor-pointer transition ${
                  contactPref === 'In-App Chat'
                    ? 'border-[#003366] bg-blue-50/70 text-[#003366]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <MessageCircle className="w-4 h-4 mb-0.5" />
                <span className="font-semibold">In-App Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setContactPref('Security Desk')}
                className={`border rounded-lg p-2 flex flex-col items-center text-center cursor-pointer transition ${
                  contactPref === 'Security Desk'
                    ? 'border-[#D32F2F] bg-rose-50/70 text-[#D32F2F]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mb-0.5" />
                <span className="font-semibold">Security Gate</span>
              </button>

              <button
                type="button"
                onClick={() => setContactPref('Student Phone')}
                className={`border rounded-lg p-2 flex flex-col items-center text-center cursor-pointer transition ${
                  contactPref === 'Student Phone'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-700'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <PhoneCall className="w-4 h-4 mb-0.5" />
                <span className="font-semibold">Phone Call</span>
              </button>
            </div>
          </div>

          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Attach Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">
                {photoUrl ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Photo Attached
                  </span>
                ) : (
                  'Click to select photo or take picture'
                )}
              </span>
            </div>
            {photoUrl && (
              <div className="mt-2 relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoUrl(undefined)}
                  className="absolute top-0 right-0 bg-black/60 text-white rounded-bl p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post to MU Campus</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
