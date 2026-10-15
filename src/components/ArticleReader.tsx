import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  MessageSquare,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Type,
  Sun,
  Moon,
  Coffee,
  Check,
  Headphones,
} from 'lucide-react';
import { Article, ReadingTheme } from '../types/news';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onOpenArticle: (article: Article) => void;
  onOpenComments: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  allArticles: Article[];
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onOpenArticle,
  onOpenComments,
  isSaved,
  onToggleSave,
  allArticles,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<ReadingTheme>('standard');
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('lg');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(18);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 550 / audioSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, audioSpeed]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'paper':
        return 'bg-[#fbf0d9] text-[#2b241e]';
      case 'dark':
        return 'bg-[#000000] text-[#e5e5e7]';
      default:
        return 'bg-[#ffffff] text-[#1d1d1f]';
    }
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'md':
        return 'text-[17px] leading-[1.8]';
      case 'xl':
        return 'text-[22px] leading-[1.9]';
      default:
        return 'text-[19px] leading-[1.85]';
    }
  };

  const nextArticle = allArticles.find((a) => a.id !== article.id);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Top Reading Bar with Reading Progress */}
      <div className="sticky top-0 z-40 w-full glass-panel border-b border-black/[0.06]">
        {/* Apple reading progress thin track */}
        <div
          className="h-1 bg-[#0071e3] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold bg-black/[0.05] hover:bg-black/[0.09] text-neutral-800 px-3 py-1.5 rounded-full transition-all cursor-pointer font-nyt-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Front Page</span>
          </button>

          <h2 className="font-apple-display font-semibold text-xs sm:text-sm truncate max-w-sm sm:max-w-md hidden md:inline text-neutral-700">
            {article.title}
          </h2>

          {/* Apple Floating Reading Controls */}
          <div className="flex items-center gap-1.5 text-xs font-nyt-sans">
            {/* Audio narration button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer font-medium ${
                isPlayingAudio
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'bg-black/[0.05] hover:bg-black/[0.08] text-neutral-800'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isPlayingAudio ? 'Playing' : 'Listen'}
              </span>
            </button>

            {/* Typography sizing */}
            <div className="hidden sm:flex items-center bg-black/[0.05] rounded-full p-0.5">
              <button
                onClick={() => setFontSize('md')}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                  fontSize === 'md' ? 'bg-white shadow-xs text-black font-bold' : 'text-neutral-500'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                  fontSize === 'lg' ? 'bg-white shadow-xs text-black font-bold' : 'text-neutral-500'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                  fontSize === 'xl' ? 'bg-white shadow-xs text-black font-bold' : 'text-neutral-500'
                }`}
              >
                A+
              </button>
            </div>

            {/* Apple Theme Selector */}
            <div className="flex items-center bg-black/[0.05] rounded-full p-0.5">
              <button
                onClick={() => setTheme('standard')}
                className={`p-1.5 rounded-full transition-all ${
                  theme === 'standard' ? 'bg-white shadow-xs text-black' : 'text-neutral-500'
                }`}
                title="Apple White"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('paper')}
                className={`p-1.5 rounded-full transition-all ${
                  theme === 'paper' ? 'bg-[#fbf0d9] shadow-xs text-amber-900' : 'text-neutral-500'
                }`}
                title="Apple Books Sepia"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full transition-all ${
                  theme === 'dark' ? 'bg-black text-white shadow-xs' : 'text-neutral-500'
                }`}
                title="Apple Dark"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={onToggleSave}
              className="p-2 rounded-full hover:bg-black/[0.06] transition-colors cursor-pointer text-neutral-700"
              title="Save story"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#0071e3]' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-black/[0.06] transition-colors cursor-pointer text-neutral-700 relative"
              title="Share story"
            >
              {shareCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Comments */}
            <button
              onClick={onOpenComments}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-black/[0.06] transition-colors cursor-pointer text-neutral-700 font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="text-[11px]">{article.commentsCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Apple Podcasts Style Narration Player */}
      {isPlayingAudio && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md glass-panel-dark text-white rounded-full p-2.5 pl-4 shadow-2xl border border-white/10 flex items-center justify-between gap-3 font-nyt-sans">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer"
            >
              {isPlayingAudio ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                Audio Edition
              </span>
              <span className="text-xs font-semibold text-white truncate block">
                {article.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setAudioSpeed(audioSpeed === 1 ? 1.25 : audioSpeed === 1.25 ? 1.5 : 1)}
              className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 hover:text-white"
            >
              {audioSpeed}x
            </button>
            <button
              onClick={() => setIsPlayingAudio(false)}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Article Container */}
      <article className="max-w-[720px] mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Category Pill */}
        <div className="flex items-center gap-2 mb-4 font-nyt-sans">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0071e3] bg-[#0071e3]/10 px-3 py-1 rounded-full">
            {article.kicker || article.section}
          </span>
          {article.badge && (
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full uppercase">
              {article.badge}
            </span>
          )}
        </div>

        {/* Apple Display Headline */}
        <h1 className="font-apple-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12] mb-4 text-balance">
          {article.title}
        </h1>

        {/* Subtitle / Deck */}
        <p className="font-apple-display text-lg md:text-xl text-neutral-500 font-medium mb-6 leading-relaxed">
          {article.summary}
        </p>

        {/* Byline & Date Header */}
        <div className="border-t border-b border-black/[0.08] py-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-nyt-sans text-neutral-500">
          <div>
            <div className="font-bold text-neutral-900 text-sm">By {article.byline}</div>
            {article.authorRole && <div className="text-neutral-400 mt-0.5">{article.authorRole}</div>}
          </div>
          <div className="text-right sm:text-right text-[11px]">
            <div>{article.date}</div>
            <div className="font-semibold text-neutral-700 mt-0.5">{article.readTime}</div>
          </div>
        </div>

        {/* Hero Figure */}
        {article.imageUrl && (
          <figure className="mb-10">
            <div className="overflow-hidden rounded-3xl bg-neutral-100 border border-black/[0.06] shadow-sm">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full max-h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {(article.imageCaption || article.imageCredit) && (
              <figcaption className="text-xs font-nyt-sans text-neutral-500 pt-2.5 flex flex-col sm:flex-row sm:justify-between gap-1 px-1 leading-snug">
                <span>{article.imageCaption}</span>
                {article.imageCredit && (
                  <span className="text-neutral-400 font-medium">{article.imageCredit}</span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Key Takeaways in Apple Inset Card */}
        {article.highlightBullets && article.highlightBullets.length > 0 && (
          <div className="bg-black/[0.03] rounded-3xl p-6 mb-10 space-y-3 border border-black/[0.04]">
            <span className="font-apple-display text-xs uppercase tracking-wider font-extrabold text-neutral-900 block">
              Key Reporting Insights
            </span>
            <div className="space-y-2.5 font-nyt-sans text-sm text-neutral-800">
              {article.highlightBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-2 shrink-0" />
                  <p>
                    <strong className="text-black font-semibold">{bullet.boldPrefix}</strong>{' '}
                    {bullet.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body Paragraphs */}
        <div className={`font-apple-serif space-y-7 ${getFontSizeClasses()}`}>
          {article.content.map((para, index) => {
            // First paragraph drop cap
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="first-letter:text-6xl first-letter:font-apple-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#0071e3]"
                >
                  {para}
                </p>
              );
            }

            // Pull quote in middle paragraph
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <div className="my-10 p-6 rounded-3xl bg-black/[0.02] border-y border-black/[0.08] text-center">
                    <blockquote className="text-xl md:text-2xl font-apple-serif italic text-neutral-800 leading-snug">
                      “The latency difference between low-Earth orbit transceivers and legacy field relays
                      is measured directly in soldier casualties.”
                    </blockquote>
                  </div>
                  <p>{para}</p>
                </React.Fragment>
              );
            }

            return <p key={index}>{para}</p>;
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-14 pt-6 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-nyt-sans">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSave}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-black/10 hover:bg-black/[0.04] text-neutral-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved ? 'Saved to Reading List' : 'Save for Later'}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 text-xs font-semibold rounded-full border border-black/10 hover:bg-black/[0.04] text-neutral-800 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{shareCopied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>

          <button
            onClick={onOpenComments}
            className="px-4 py-2 bg-black/[0.05] hover:bg-black/[0.08] text-neutral-900 text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Join Discussion ({article.commentsCount})</span>
          </button>
        </div>

        {/* Next recommended article in Apple Bento Card */}
        {nextArticle && (
          <div
            onClick={() => onOpenArticle(nextArticle)}
            className="mt-12 p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] block mb-2 font-nyt-sans">
              Next in {nextArticle.section}
            </span>
            <h3 className="font-apple-display text-2xl font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-tight mb-2">
              {nextArticle.title}
            </h3>
            <p className="text-xs text-neutral-600 line-clamp-2 font-nyt-sans">
              {nextArticle.summary}
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#0071e3]">
              <span>Read Story</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
