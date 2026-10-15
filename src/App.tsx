import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/mockNews';
import { Article, CommentItem } from './types/news';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { MainFrontPage } from './components/MainFrontPage';
import { ArticleReader } from './components/ArticleReader';
import { InteractiveGamesBar } from './components/InteractiveGamesBar';
import { WordleModal } from './components/games/WordleModal';
import { ConnectionsModal } from './components/games/ConnectionsModal';
import { TheMiniModal } from './components/games/TheMiniModal';
import { SpellingBeeModal } from './components/games/SpellingBeeModal';
import { SearchModal } from './components/SearchModal';
import { CommentsDrawer } from './components/CommentsDrawer';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AccountModal } from './components/AccountModal';
import { ArrowLeft, Filter } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('nyt_articles_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ARTICLES;
      }
    }
    return ARTICLES;
  });

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('nyt_saved_ids_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['ukraine-exposure-satellite-russia'];
      }
    }
    return ['ukraine-exposure-satellite-russia'];
  });

  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [currentEdition, setCurrentEdition] = useState<string>('US');
  const [activeSection, setActiveSection] = useState<string>('All');
  const [temperatureUnit, setTemperatureUnit] = useState<'F' | 'C'>('F');
  const [currentUser, setCurrentUser] = useState<{ email: string; isSubscribed: boolean } | null>(
    { email: 'yeohjoern@gmail.com', isSubscribed: true }
  );

  useEffect(() => {
    localStorage.setItem('nyt_saved_ids_v1', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  useEffect(() => {
    localStorage.setItem('nyt_articles_v1', JSON.stringify(articles));
  }, [articles]);

  const handleToggleSave = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleAddComment = (comment: CommentItem) => {
    if (!selectedArticle) return;
    const updatedArticles = articles.map((art) => {
      if (art.id === selectedArticle.id) {
        const nextComments = [comment, ...art.comments];
        return {
          ...art,
          comments: nextComments,
          commentsCount: art.commentsCount + 1,
        };
      }
      return art;
    });

    setArticles(updatedArticles);
    setSelectedArticle((prev) =>
      prev
        ? {
            ...prev,
            comments: [comment, ...prev.comments],
            commentsCount: prev.commentsCount + 1,
          }
        : null
    );
  };

  const filteredArticles = activeSection === 'All'
    ? articles
    : articles.filter((a) => a.section.toLowerCase() === activeSection.toLowerCase());

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-nyt-sans selection:bg-[#0071e3]/20 selection:text-[#0071e3] flex flex-col">
      {/* Site Header */}
      <SiteHeader
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setSelectedArticle(null);
          setActiveSection(sec);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedArticleIds.length}
        currentUser={currentUser}
        temperatureUnit={temperatureUnit}
        onToggleTempUnit={() => setTemperatureUnit((u) => (u === 'F' ? 'C' : 'F'))}
        onGoHome={() => {
          setSelectedArticle(null);
          setActiveSection('All');
        }}
        onOpenGames={(gameKey) => setActiveGame(gameKey || 'wordle')}
      />

      {/* Screen Routing: Article Reader View vs Main Broadsheet Front Page */}
      {selectedArticle ? (
        <ArticleReader
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          onOpenArticle={(art) => setSelectedArticle(art)}
          onOpenComments={() => setIsCommentsOpen(true)}
          isSaved={savedArticleIds.includes(selectedArticle.id)}
          onToggleSave={() => handleToggleSave(selectedArticle.id)}
          allArticles={articles}
        />
      ) : (
        <div className="flex-1">
          {/* Section Filter Banner if active */}
          {activeSection !== 'All' && (
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-5 pb-1">
              <div className="bg-white/80 backdrop-blur-xl border border-black/[0.06] p-3.5 px-5 rounded-2xl shadow-xs flex items-center justify-between font-nyt-sans">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#0071e3]" />
                  <span className="text-xs uppercase tracking-wider font-extrabold text-neutral-900">
                    Filtered by Department: <strong className="text-[#0071e3]">{activeSection}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setActiveSection('All')}
                  className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1.5 bg-black/[0.04] hover:bg-black/[0.08] px-3 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Stories</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Front Page Broadsheet Grid */}
          <MainFrontPage
            articles={filteredArticles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            savedArticleIds={savedArticleIds}
            onToggleSave={handleToggleSave}
            onOpenSection={(sec) => setActiveSection(sec)}
          />

          {/* Play NYT Games Section */}
          <InteractiveGamesBar onOpenGame={(gameKey) => setActiveGame(gameKey)} />
        </div>
      )}

      {/* Site Footer */}
      <SiteFooter
        onSelectSection={(sec) => {
          setSelectedArticle(null);
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenGames={(gameKey) => setActiveGame(gameKey || 'wordle')}
      />

      {/* Interactive Modals and Drawers */}
      <WordleModal
        isOpen={activeGame === 'wordle'}
        onClose={() => setActiveGame(null)}
      />

      <ConnectionsModal
        isOpen={activeGame === 'connections'}
        onClose={() => setActiveGame(null)}
      />

      <TheMiniModal
        isOpen={activeGame === 'mini'}
        onClose={() => setActiveGame(null)}
      />

      <SpellingBeeModal
        isOpen={activeGame === 'spelling-bee'}
        onClose={() => setActiveGame(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      <SavedArticlesModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedArticleIds={savedArticleIds}
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveSave={(id) => handleToggleSave(id)}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSuccessSubscribe={() => {
          setCurrentUser((prev) => ({
            email: prev?.email || 'subscriber@nytimes.com',
            isSubscribed: true,
          }));
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        onLogin={(email) => setCurrentUser({ email, isSubscribed: true })}
        onLogout={() => setCurrentUser(null)}
      />

      {selectedArticle && (
        <CommentsDrawer
          isOpen={isCommentsOpen}
          onClose={() => setIsCommentsOpen(false)}
          article={selectedArticle}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}
