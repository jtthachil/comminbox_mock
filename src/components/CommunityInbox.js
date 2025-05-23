import React, { useState } from 'react';
import { MessageCircle, Users, Shield, Search, Plus, Settings, Bell, Lock, ArrowLeft } from 'lucide-react';
import './CommunityInbox.css';

const CommunityInbox = ({ view }) => {
  const [selectedCommunity, setSelectedCommunity] = useState('marketing-agency');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showInboxList, setShowInboxList] = useState(false); // For card view inbox list

  // Mock data for communities and conversations
  const communities = [
    {
      id: 'marketing-agency',
      name: 'Marketing Agency Pro',
      members: 24,
      unread: 3,
      color: '#667eea',
      description: 'Professional marketing strategies and growth hacking'
    },
    {
      id: 'startup-founders',
      name: 'Startup Founders Hub',
      members: 156,
      unread: 7,
      color: '#f093fb',
      description: 'Connect with fellow entrepreneurs and share insights'
    },
    {
      id: 'design-collective',
      name: 'Design Collective',
      members: 89,
      unread: 2,
      color: '#4facfe',
      description: 'Creative professionals sharing design trends'
    },
    {
      id: 'tech-innovators',
      name: 'Tech Innovators',
      members: 203,
      unread: 12,
      color: '#43e97b',
      description: 'Latest in technology and innovation'
    }
  ];

  const conversations = [
    {
      id: 1,
      community: 'marketing-agency',
      participant: 'Sarah Chen',
      lastMessage: 'The new campaign strategy looks promising. Should we schedule a call?',
      timestamp: '2 min ago',
      unread: true,
      avatar: '👩‍💼'
    },
    {
      id: 2,
      community: 'marketing-agency',
      participant: 'Mike Rodriguez',
      lastMessage: 'Thanks for sharing the analytics report. The conversion rates are impressive.',
      timestamp: '15 min ago',
      unread: true,
      avatar: '👨‍💻'
    },
    {
      id: 3,
      community: 'startup-founders',
      participant: 'Alex Thompson',
      lastMessage: 'Looking for feedback on our MVP. Would love to get your thoughts.',
      timestamp: '1 hour ago',
      unread: true,
      avatar: '🚀'
    },
    {
      id: 4,
      community: 'design-collective',
      participant: 'Emma Wilson',
      lastMessage: 'The new design system is ready for review. Check it out!',
      timestamp: '2 hours ago',
      unread: false,
      avatar: '🎨'
    },
    {
      id: 5,
      community: 'tech-innovators',
      participant: 'David Park',
      lastMessage: 'Interesting article about AI trends. Thought you might find it useful.',
      timestamp: '3 hours ago',
      unread: true,
      avatar: '🤖'
    },
    {
      id: 6,
      community: 'startup-founders',
      participant: 'Lisa Wang',
      lastMessage: 'Just closed our Series A! Thanks for all the advice.',
      timestamp: '4 hours ago',
      unread: false,
      avatar: '💼'
    },
    {
      id: 7,
      community: 'design-collective',
      participant: 'Carlos Rivera',
      lastMessage: 'Love the new brand guidelines. Very clean and modern.',
      timestamp: '5 hours ago',
      unread: true,
      avatar: '🎯'
    },
    {
      id: 8,
      community: 'tech-innovators',
      participant: 'Priya Patel',
      lastMessage: 'The AI integration is working perfectly. Great job!',
      timestamp: '6 hours ago',
      unread: false,
      avatar: '⚡'
    }
  ];

  // Mock messages for the selected conversation
  const getMessagesForConversation = (conversationId) => {
    const messageTemplates = {
      1: [
        { id: 1, sender: 'Sarah Chen', message: 'Hi! I wanted to discuss the new campaign strategy we outlined yesterday.', timestamp: '10:30 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Absolutely! I think the targeting approach is really solid.', timestamp: '10:32 AM', isOwn: true },
        { id: 3, sender: 'Sarah Chen', message: 'Great! I\'ve been analyzing the demographics and the 25-34 age group shows the highest engagement.', timestamp: '10:33 AM', isOwn: false },
        { id: 4, sender: 'You', message: 'That aligns perfectly with our buyer personas. Should we increase the budget allocation for that segment?', timestamp: '10:35 AM', isOwn: true },
        { id: 5, sender: 'Sarah Chen', message: 'The new campaign strategy looks promising. Should we schedule a call?', timestamp: '10:37 AM', isOwn: false }
      ],
      2: [
        { id: 1, sender: 'Mike Rodriguez', message: 'Hey, just finished reviewing the analytics report you sent.', timestamp: '9:45 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Great! What are your thoughts on the conversion rates?', timestamp: '9:50 AM', isOwn: true },
        { id: 3, sender: 'Mike Rodriguez', message: 'The numbers are really impressive. We\'re seeing a 23% increase from last quarter.', timestamp: '9:52 AM', isOwn: false },
        { id: 4, sender: 'You', message: 'That\'s fantastic! Which channels are performing best?', timestamp: '9:53 AM', isOwn: true },
        { id: 5, sender: 'Mike Rodriguez', message: 'Thanks for sharing the analytics report. The conversion rates are impressive.', timestamp: '9:55 AM', isOwn: false }
      ],
      3: [
        { id: 1, sender: 'Alex Thompson', message: 'Hi there! Hope you\'re doing well.', timestamp: 'Yesterday', isOwn: false },
        { id: 2, sender: 'You', message: 'Hey Alex! All good here, how\'s the startup going?', timestamp: 'Yesterday', isOwn: true },
        { id: 3, sender: 'Alex Thompson', message: 'It\'s been quite a journey! We\'ve just launched our beta version.', timestamp: 'Yesterday', isOwn: false },
        { id: 4, sender: 'You', message: 'That\'s exciting! How\'s the user feedback been so far?', timestamp: 'Yesterday', isOwn: true },
        { id: 5, sender: 'Alex Thompson', message: 'Looking for feedback on our MVP. Would love to get your thoughts.', timestamp: '1 hour ago', isOwn: false }
      ],
      4: [
        { id: 1, sender: 'Emma Wilson', message: 'Hi! I\'ve been working on the new design system.', timestamp: '2 hours ago', isOwn: false },
        { id: 2, sender: 'You', message: 'Awesome! I\'m excited to see what you\'ve created.', timestamp: '2 hours ago', isOwn: true },
        { id: 3, sender: 'Emma Wilson', message: 'The new design system is ready for review. Check it out!', timestamp: '2 hours ago', isOwn: false }
      ],
      5: [
        { id: 1, sender: 'David Park', message: 'Found this great article about emerging AI trends.', timestamp: '3 hours ago', isOwn: false },
        { id: 2, sender: 'You', message: 'Thanks for sharing! I\'ll take a look.', timestamp: '3 hours ago', isOwn: true },
        { id: 3, sender: 'David Park', message: 'Interesting article about AI trends. Thought you might find it useful.', timestamp: '3 hours ago', isOwn: false }
      ]
    };
    return messageTemplates[conversationId] || [];
  };

  const renderChatInterface = (conversation) => (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="chat-participant">
          <button 
            className="back-button"
            onClick={() => setSelectedConversation(null)}
          >
            <ArrowLeft size={20} />
          </button>
          <span className="participant-avatar">
            {conversation.avatar}
          </span>
          <div>
            <h3>{conversation.participant}</h3>
            <span className="community-context">
              in {communities.find(c => c.id === conversation.community)?.name}
            </span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="icon-button"><Bell size={16} /></button>
          <button className="icon-button"><Shield size={16} /></button>
        </div>
      </div>
      
      <div className="messages-area">
        <div className="encryption-notice">
          <Lock size={14} />
          <span>Messages are end-to-end encrypted</span>
        </div>
        
        <div className="messages-container">
          {getMessagesForConversation(conversation.id).map(message => (
            <div key={message.id} className={`message ${message.isOwn ? 'own-message' : 'other-message'}`}>
              <div className="message-content">
                <div className="message-text">{message.message}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="message-input">
        <input type="text" placeholder="Type your message..." />
        <button className="send-button">Send</button>
      </div>
    </div>
  );

  const renderUnifiedView = () => (
    <div className="unified-view">
      <div className="inbox-sidebar">
        <div className="sidebar-header">
          <h2><MessageCircle size={20} /> All Communities</h2>
          <div className="header-actions">
            <button className="icon-button"><Search size={16} /></button>
            <button className="icon-button"><Plus size={16} /></button>
            <button className="icon-button"><Settings size={16} /></button>
          </div>
        </div>
        
        <div className="community-filter">
          <select 
            value={selectedCommunity} 
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="community-select"
          >
            <option value="">All Communities</option>
            {communities.map(community => (
              <option key={community.id} value={community.id}>
                {community.name} ({community.unread} unread)
              </option>
            ))}
          </select>
        </div>

        <div className="conversations-list">
          {conversations
            .filter(conv => !selectedCommunity || conv.community === selectedCommunity)
            .map(conversation => (
              <div 
                key={conversation.id} 
                className={`conversation-item ${conversation.unread ? 'unread' : ''} ${selectedConversation === conversation.id ? 'selected' : ''}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="conversation-avatar">{conversation.avatar}</div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <span className="participant-name">{conversation.participant}</span>
                    <span className="community-badge" style={{ backgroundColor: communities.find(c => c.id === conversation.community)?.color }}>
                      {communities.find(c => c.id === conversation.community)?.name}
                    </span>
                  </div>
                  <div className="last-message">{conversation.lastMessage}</div>
                  <div className="conversation-meta">
                    <span className="timestamp">{conversation.timestamp}</span>
                    {conversation.unread && <div className="unread-indicator"></div>}
                    <Lock size={12} className="encryption-icon" title="End-to-end encrypted" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedConversation ? (
          renderChatInterface(conversations.find(c => c.id === selectedConversation))
        ) : (
          <div className="no-conversation">
            <MessageCircle size={48} />
            <h3>Select a conversation</h3>
            <p>Choose a conversation from the sidebar to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabbedView = () => {
    const selectedConv = conversations.find(c => c.id === selectedConversation);
    
    if (selectedConversation && selectedConv) {
      return (
        <div className="tabbed-view">
          <div className="community-tabs">
            {communities.map(community => (
              <button
                key={community.id}
                className={`community-tab ${selectedCommunity === community.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCommunity(community.id);
                  setSelectedConversation(null);
                }}
                style={{ borderBottomColor: selectedCommunity === community.id ? community.color : 'transparent' }}
              >
                <span className="tab-name">{community.name}</span>
                {community.unread > 0 && <span className="tab-badge">{community.unread}</span>}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            {renderChatInterface(selectedConv)}
          </div>
        </div>
      );
    }

    return (
      <div className="tabbed-view">
        <div className="community-tabs">
          {communities.map(community => (
            <button
              key={community.id}
              className={`community-tab ${selectedCommunity === community.id ? 'active' : ''}`}
              onClick={() => setSelectedCommunity(community.id)}
              style={{ borderBottomColor: selectedCommunity === community.id ? community.color : 'transparent' }}
            >
              <span className="tab-name">{community.name}</span>
              {community.unread > 0 && <span className="tab-badge">{community.unread}</span>}
            </button>
          ))}
        </div>
        
        <div className="tab-content">
          {selectedCommunity && (
            <div className="community-inbox">
              <div className="community-header">
                <h2 style={{ color: communities.find(c => c.id === selectedCommunity)?.color }}>
                  {communities.find(c => c.id === selectedCommunity)?.name}
                </h2>
                <p>{communities.find(c => c.id === selectedCommunity)?.description}</p>
                <div className="community-stats">
                  <span><Users size={14} /> {communities.find(c => c.id === selectedCommunity)?.members} members</span>
                  <span><Lock size={14} /> End-to-end encrypted</span>
                </div>
              </div>
              
              <div className="community-conversations">
                {conversations
                  .filter(conv => conv.community === selectedCommunity)
                  .map(conversation => (
                    <div 
                      key={conversation.id} 
                      className={`conversation-card ${conversation.unread ? 'unread' : ''}`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="conversation-avatar">{conversation.avatar}</div>
                      <div className="conversation-details">
                        <h4>{conversation.participant}</h4>
                        <p>{conversation.lastMessage}</p>
                        <span className="timestamp">{conversation.timestamp}</span>
                      </div>
                      {conversation.unread && <div className="unread-dot"></div>}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSidebarView = () => {
    const selectedConv = conversations.find(c => c.id === selectedConversation);
    
    return (
      <div className="sidebar-view">
        <div className="communities-sidebar">
          <div className="sidebar-header">
            <h2>Communities</h2>
            <button className="icon-button"><Plus size={16} /></button>
          </div>
          
          <div className="communities-list">
            {communities.map(community => (
              <div
                key={community.id}
                className={`community-item ${selectedCommunity === community.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCommunity(community.id);
                  setSelectedConversation(null);
                }}
              >
                <div className="community-icon" style={{ backgroundColor: community.color }}>
                  {community.name.charAt(0)}
                </div>
                <div className="community-info">
                  <h4>{community.name}</h4>
                  <span>{community.members} members</span>
                </div>
                {community.unread > 0 && (
                  <div className="unread-count">{community.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="main-inbox">
          {selectedConversation && selectedConv ? (
            renderChatInterface(selectedConv)
          ) : selectedCommunity ? (
            <div className="community-messages">
              <div className="inbox-header">
                <h2>{communities.find(c => c.id === selectedCommunity)?.name}</h2>
                <div className="header-actions">
                  <button className="icon-button"><Search size={16} /></button>
                  <button className="icon-button"><Settings size={16} /></button>
                </div>
              </div>
              
              <div className="messages-list">
                {conversations
                  .filter(conv => conv.community === selectedCommunity)
                  .map(conversation => (
                    <div 
                      key={conversation.id} 
                      className={`message-item ${conversation.unread ? 'unread' : ''}`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="message-avatar">{conversation.avatar}</div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="sender-name">{conversation.participant}</span>
                          <span className="message-time">{conversation.timestamp}</span>
                        </div>
                        <p className="message-text">{conversation.lastMessage}</p>
                      </div>
                      <Lock size={12} className="encryption-icon" />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="no-community">
              <Users size={48} />
              <h3>Select a community</h3>
              <p>Choose a community from the sidebar to view messages</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCardView = () => {
    const selectedConv = conversations.find(c => c.id === selectedConversation);
    
    // Show chat interface when a conversation is selected
    if (selectedConversation && selectedConv) {
      return (
        <div className="card-view">
          <div className="view-header">
            <button 
              className="back-to-cards-btn"
              onClick={() => {
                setSelectedConversation(null);
                setShowInboxList(false);
              }}
            >
              <ArrowLeft size={16} />
              Back to Communities
            </button>
          </div>
          {renderChatInterface(selectedConv)}
        </div>
      );
    }

    // Show inbox list when "Open Inbox" is clicked
    if (showInboxList && selectedCommunity) {
      const community = communities.find(c => c.id === selectedCommunity);
      const communityConversations = conversations.filter(conv => conv.community === selectedCommunity);
      
      return (
        <div className="card-view">
          <div className="view-header">
            <button 
              className="back-to-cards-btn"
              onClick={() => {
                setShowInboxList(false);
                setSelectedCommunity(null);
              }}
            >
              <ArrowLeft size={16} />
              Back to Communities
            </button>
            <div className="inbox-title">
              <h2 style={{ color: community.color }}>{community.name}</h2>
              <p>{community.description}</p>
            </div>
          </div>
          
          <div className="inbox-list-container">
            <div className="inbox-stats">
              <span><Users size={16} /> {community.members} members</span>
              <span><MessageCircle size={16} /> {communityConversations.length} conversations</span>
              <span><Lock size={16} /> End-to-end encrypted</span>
            </div>
            
            <div className="inbox-conversations">
              {communityConversations.map(conversation => (
                <div 
                  key={conversation.id} 
                  className={`inbox-conversation-item ${conversation.unread ? 'unread' : ''}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="conversation-avatar">{conversation.avatar}</div>
                  <div className="conversation-details">
                    <div className="conversation-header">
                      <h4>{conversation.participant}</h4>
                      <span className="timestamp">{conversation.timestamp}</span>
                    </div>
                    <p className="last-message">{conversation.lastMessage}</p>
                    <div className="conversation-footer">
                      <Lock size={12} className="encryption-icon" />
                      {conversation.unread && <div className="unread-dot"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Show community cards (default view)
    return (
      <div className="card-view">
        <div className="view-header">
          <h2>Community Inboxes</h2>
          <p>Manage all your community conversations in one place</p>
        </div>
        
        <div className="communities-grid">
          {communities.map(community => (
            <div key={community.id} className="community-card">
              <div className="card-header" style={{ backgroundColor: community.color }}>
                <h3>{community.name}</h3>
                <div className="card-stats">
                  <span><Users size={14} /> {community.members}</span>
                  <span><Lock size={14} /> Encrypted</span>
                </div>
              </div>
              
              <div className="card-content">
                <p className="community-description">{community.description}</p>
                
                <div className="recent-messages">
                  <h4>Recent Messages ({community.unread} unread)</h4>
                  {conversations
                    .filter(conv => conv.community === community.id)
                    .slice(0, 3)
                    .map(conversation => (
                      <div 
                        key={conversation.id} 
                        className={`mini-conversation ${conversation.unread ? 'unread' : ''}`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <span className="mini-avatar">{conversation.avatar}</span>
                        <div className="mini-content">
                          <span className="mini-name">{conversation.participant}</span>
                          <span className="mini-message">{conversation.lastMessage.substring(0, 40)}...</span>
                        </div>
                      </div>
                    ))}
                </div>
                
                <button 
                  className="open-inbox-btn"
                  style={{ backgroundColor: community.color }}
                  onClick={() => {
                    setSelectedCommunity(community.id);
                    setShowInboxList(true);
                  }}
                >
                  Open Inbox
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch (view) {
      case 'unified':
        return renderUnifiedView();
      case 'tabbed':
        return renderTabbedView();
      case 'sidebar':
        return renderSidebarView();
      case 'cards':
        return renderCardView();
      default:
        return renderUnifiedView();
    }
  };

  return (
    <div className="community-inbox">
      {renderView()}
    </div>
  );
};

export default CommunityInbox; 