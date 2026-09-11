import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  ItemType,
  ItemCategory,
  CampusLocation,
  ItemPost,
  ClaimRecord,
  ChatMessage,
  NotificationItem,
} from './types';
import {
  INITIAL_POSTS,
  INITIAL_CLAIMS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT_HISTORY,
} from './data';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TabsHeader } from './components/TabsHeader';
import { ItemCard } from './components/ItemCard';
import { BottomNav } from './components/BottomNav';
import { ReportModal } from './components/ReportModal';
import { ClaimModal } from './components/ClaimModal';
import { ChatModal } from './components/ChatModal';
import { MapModal } from './components/MapModal';
import { SecurityModal } from './components/SecurityModal';
import { ClaimsDrawer } from './components/ClaimsDrawer';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  // State Store with LocalStorage Persistence
  const [posts, setPosts] = useState<ItemPost[]>(() => {
    try {
      const saved = localStorage.getItem('mu_campus_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [claims, setClaims] = useState<ClaimRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mu_campus_claims');
      return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
    } catch {
      return INITIAL_CLAIMS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('mu_campus_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem('mu_campus_chat_history');
      return saved ? JSON.parse(saved) : INITIAL_CHAT_HISTORY;
    } catch {
      return INITIAL_CHAT_HISTORY;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mu_campus_posts', JSON.stringify(posts));
    } catch {
      // ignore
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem('mu_campus_claims', JSON.stringify(claims));
    } catch {
      // ignore
    }
  }, [claims]);

  useEffect(() => {
    try {
      localStorage.setItem('mu_campus_notifications', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('mu_campus_chat_history', JSON.stringify(chatHistory));
    } catch {
      // ignore
    }
  }, [chatHistory]);

  // View Filter & Navigation State
  const [currentTab, setCurrentTab] = useState<ItemType>('lost');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('All Categories');
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation>('all');
  const [isSortNewest, setIsSortNewest] = useState(true);

  // Modals
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [claimingItem, setClaimingItem] = useState<ItemPost | null>(null);
  const [activeChatItem, setActiveChatItem] = useState<ItemPost | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isClaimsOpen, setIsClaimsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Filtered Posts
  const filteredPosts = posts
    .filter((post) => post.type === currentTab)
    .filter((post) => {
      if (selectedCategory === 'All Categories') return true;
      return post.category === selectedCategory;
    })
    .filter((post) => {
      if (selectedLocation === 'all') return true;
      return post.location.toLowerCase().includes(selectedLocation.toLowerCase());
    })
    .filter((post) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.location.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (isSortNewest ? b.timestamp - a.timestamp : a.timestamp - b.timestamp));

  // Counts for Badges
  const lostCount = posts.filter((p) => p.type === 'lost').length;
  const foundCount = posts.filter((p) => p.type === 'found').length;

  // Handlers
  const handleCreatePost = (newItem: ItemPost) => {
    setPosts((prev) => [newItem, ...prev]);
    setCurrentTab(newItem.type);

    // Add alert notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: newItem.type === 'lost' ? 'Lost Item Broadcasted' : 'Found Item Registered',
      message: `Your report for "${newItem.title}" has been published to the campus directory.`,
      time: 'Just now',
      read: false,
      type: 'alert',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleCycleStatus = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const states: ItemPost['status'][] = [
            'Active',
            'Under Verification',
            'Claimed',
            'Resolved',
          ];
          const nextIdx = (states.indexOf(post.status) + 1) % states.length;
          return { ...post, status: states[nextIdx] };
        }
        return post;
      })
    );
  };

  const handleSubmitClaim = ({
    postId,
    itemTitle,
    claimantName,
    claimantId,
    proof,
    channel,
  }: {
    postId: string;
    itemTitle: string;
    claimantName: string;
    claimantId: string;
    proof: string;
    channel: string;
  }) => {
    // 1. Update post status to 'Under Verification'
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: 'Under Verification' } : p))
    );

    // 2. Add to user claims
    const newClaim: ClaimRecord = {
      id: 'claim-' + Date.now(),
      postId,
      itemTitle,
      claimantName,
      claimantId,
      proof,
      channel,
      status: 'Under Verification',
      timestamp: Date.now(),
    };
    setClaims((prev) => [newClaim, ...prev]);

    // 3. Populate chat thread
    const newMessages: ChatMessage[] = [
      {
        id: 'msg-' + Date.now(),
        sender: 'me',
        text: `[Claim Submission] Hi! I am submitting an ownership claim for "${itemTitle}". Student/Faculty ID: ${claimantId}. Verification Proof: ${proof}`,
        time: 'Just now',
      },
      {
        id: 'msg-' + (Date.now() + 1),
        sender: 'them',
        text: `Thank you, ${claimantName}! I have received your ownership proof. I am reviewing the details now. Let's arrange a secure handover via ${channel}.`,
        time: 'Just now',
      },
    ];

    setChatHistory((prev) => ({
      ...prev,
      [postId]: prev[postId] ? [...prev[postId], ...newMessages] : newMessages,
    }));

    // 4. Open chat modal for this post
    const target = posts.find((p) => p.id === postId);
    if (target) {
      setActiveChatItem(target);
    }
  };

  const handleSendChatMessage = (text: string) => {
    if (!activeChatItem) return;
    const postId = activeChatItem.id;
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'me',
      text,
      time: 'Just now',
    };

    setChatHistory((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), userMsg],
    }));

    // Automated realistic reply simulation
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'reply-' + Date.now(),
        sender: 'them',
        text: 'Received! Let’s meet at the designated campus location or Main Security Gate 1.',
        time: 'Just now',
      };
      setChatHistory((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), replyMsg],
      }));
    }, 900);
  };

  const handleResolveItem = (itemId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === itemId ? { ...p, status: 'Resolved' } : p))
    );

    // Update claim status if exists
    setClaims((prev) =>
      prev.map((c) => (c.postId === itemId ? { ...c, status: 'Resolved & Returned' } : c))
    );

    // Add resolved notification
    const post = posts.find((p) => p.id === itemId);
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: 'Item Resolved & Returned',
      message: `"${post?.title || 'Item'}" has been marked as officially resolved.`,
      time: 'Just now',
      read: false,
      type: 'return',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setActiveChatItem(null);
  };

  const handleOpenChatForPost = (postId: string, title: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setActiveChatItem(post);
    } else {
      // Fallback dummy item if post was deleted
      setActiveChatItem({
        id: postId,
        type: 'found',
        title,
        category: 'Others',
        location: 'Campus Security',
        date: 'Recent',
        timestamp: Date.now(),
        status: 'Under Verification',
        description: 'Claim thread conversation',
        contactPref: 'In-App Chat',
        author: 'Campus Community Desk',
        avatarInitials: 'MU',
      });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('all');
  };

  return (
    <div className="bg-slate-100 flex justify-center items-start min-h-screen">
      {/* Mobile App Container (390px-430px standard phone viewport frame) */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#F8F9FA] flex flex-col relative pb-24 shadow-2xl overflow-x-hidden border-x border-slate-200">
        {/* Top Header */}
        <Header
          notifications={notifications}
          onOpenSecurity={() => setIsSecurityOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        {/* Search & Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          isSortNewest={isSortNewest}
          onToggleSort={() => setIsSortNewest(!isSortNewest)}
        />

        {/* Dual Switch Tabs & Active Feed Heading */}
        <TabsHeader
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          lostCount={lostCount}
          foundCount={foundCount}
          onOpenMap={() => setIsMapOpen(true)}
        />

        {/* Items Feed */}
        <main className="px-4 pt-2.5 pb-8 space-y-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onOpenChat={(it) => setActiveChatItem(it)}
                onOpenClaim={(it) => setClaimingItem(it)}
                onCycleStatus={handleCycleStatus}
              />
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-700">No matching items found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Try loosening your search keywords or switching between Lost and Found tabs.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-3.5 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>

        {/* Bottom Floating Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenMap={() => setIsMapOpen(true)}
          onOpenClaims={() => setIsClaimsOpen(true)}
        />

        {/* Modals */}
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onSubmit={handleCreatePost}
        />

        <ClaimModal
          item={claimingItem}
          onClose={() => setClaimingItem(null)}
          onSubmitClaim={handleSubmitClaim}
        />

        <ChatModal
          item={activeChatItem}
          messages={activeChatItem ? chatHistory[activeChatItem.id] || [] : []}
          onClose={() => setActiveChatItem(null)}
          onSendMessage={handleSendChatMessage}
          onResolveItem={handleResolveItem}
        />

        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          posts={posts}
          onSelectLocation={(loc) => setSelectedLocation(loc)}
        />

        <SecurityModal
          isOpen={isSecurityOpen}
          onClose={() => setIsSecurityOpen(false)}
        />

        <ClaimsDrawer
          isOpen={isClaimsOpen}
          onClose={() => setIsClaimsOpen(false)}
          claims={claims}
          onOpenChatForPost={handleOpenChatForPost}
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllRead={() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
          }
        />
      </div>
    </div>
  );
}
