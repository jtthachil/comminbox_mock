import React, { useState } from 'react';
import './App.css';
import CommunityInbox from './components/CommunityInbox';

function App() {
  const [currentView, setCurrentView] = useState('unified');

  const views = [
    { id: 'unified', name: 'Unified View', description: 'All communities in one inbox' },
    { id: 'tabbed', name: 'Tabbed View', description: 'Separate tabs for each community' },
    { id: 'sidebar', name: 'Sidebar View', description: 'Community list in sidebar' },
    { id: 'cards', name: 'Card View', description: 'Community cards layout' }
  ];

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Community Inbox Mockup</h1>
          <p>Professional messaging platform for communities with end-to-end encryption</p>
        </div>
        
        <div className="view-selector">
          {views.map(view => (
            <button
              key={view.id}
              className={`view-button ${currentView === view.id ? 'active' : ''}`}
              onClick={() => setCurrentView(view.id)}
              title={view.description}
            >
              {view.name}
            </button>
          ))}
        </div>
      </header>

      <main className="app-main">
        <CommunityInbox view={currentView} />
      </main>
    </div>
  );
}

export default App; 