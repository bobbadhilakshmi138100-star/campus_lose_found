import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Package,
  Info,
  CheckCircle,
  MapPin,
  Laptop,
  CreditCard,
  Key,
  Briefcase,
  HelpCircle,
  Glasses,
} from 'lucide-react';
import { ItemPost } from '../types';

interface ClaimModalProps {
  item: ItemPost | null;
  onClose: () => void;
  onSubmitClaim: (claimData: {
    postId: string;
    itemTitle: string;
    claimantName: string;
    claimantId: string;
    proof: string;
    channel: string;
  }) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  item,
  onClose,
  onSubmitClaim,
}) => {
  const [claimantName, setClaimantName] = useState('Aarav Patel');
  const [claimantId, setClaimantId] = useState('MU2022CS089');
  const [proof, setProof] = useState('');
  const [channel, setChannel] = useState('Immediate In-App Chat with Finder');

  if (!item) return null;

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
    if (item.category === 'ID Cards/Documents') {
      return <CreditCard className="w-5 h-5 text-[#003366]" />;
    }
    if (item.category === 'Keys') {
      return <Key className="w-5 h-5 text-[#D32F2F]" />;
    }
    if (item.category === 'Bags') {
      return <Briefcase className="w-5 h-5 text-emerald-700" />;
    }
    if (item.imageSvgType === 'glasses') {
      return <Glasses className="w-5 h-5 text-purple-700" />;
    }
    if (item.category === 'Electronics') {
      return <Laptop className="w-5 h-5 text-slate-700" />;
    }
    return <Package className="w-5 h-5 text-[#003366]" />;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName.trim() || !claimantId.trim() || !proof.trim()) {
      alert('Please provide your name, MU ID, and proof description to proceed.');
      return;
    }

    onSubmitClaim({
      postId: item.id,
      itemTitle: item.title,
      claimantName: claimantName.trim(),
      claimantId: claimantId.trim(),
      proof: proof.trim(),
      channel,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-[#003366] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold">Ownership Claim &amp; Verification</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs custom-scrollbar">
          {/* Target Item Preview */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex gap-3 items-center">
            <div className="w-12 h-12 rounded-lg bg-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
              {renderThumbnail()}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#003366]">
                {item.type === 'found' ? 'Found Item Claim' : 'Lost Item'}
              </span>
              <h4 className="font-bold text-slate-800 text-xs truncate">{item.title}</h4>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#D32F2F] shrink-0" />
                <span>{item.location}</span>
              </p>
            </div>
          </div>

          {/* Verification Advisory Box */}
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-800 text-[11px] flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Security Question Verification</p>
              <p className="text-[10px] text-amber-700 mt-0.5 leading-relaxed">
                To prevent false claims, provide specific proof (e.g., wallpaper description,
                serial/ID number, distinctive stickers or marks, pouch color).
              </p>
            </div>
          </div>

          {/* Claimant ID info */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                required
                type="text"
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                placeholder="e.g., Aarav Patel"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                MU Enrollment / ID <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                required
                type="text"
                value={claimantId}
                onChange={(e) => setClaimantId(e.target.value)}
                placeholder="e.g., MU2022CS089"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366]"
              />
            </div>
          </div>

          {/* Proof Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Proof of Ownership / Distinguishing Feature <span className="text-[#D32F2F]">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              placeholder="Describe the item's unseen details that only the true owner would know..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366]"
            />
          </div>

          {/* Preferred Channel */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Verification Channel
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#003366] cursor-pointer"
            >
              <option value="Immediate In-App Chat with Finder">
                Immediate In-App Chat with Finder
              </option>
              <option value="Meet at Security Desk (Main Gate 1)">
                Meet at Security Desk (Main Gate 1)
              </option>
              <option value="Submit to Student Affairs Office">
                Submit to Student Affairs Office (Room 104)
              </option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit Claim &amp; Open Verification Chat</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
