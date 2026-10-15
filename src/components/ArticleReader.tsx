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
  const [audioProgress, setAudioProgress] = useState(12);
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
      }, 600 / audioSpeed);
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
        return 'bg-[#fbf8f2] text-[#24211e] border-stone-200';
      case 'dark':
        return 'bg-[#121212] text-[#e0e0e0] border-neutral-800';
      default:
        return 'bg-white text-[#121212] border-neutral-200';
    }
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'md':
        return 'text-[17px] leading-relaxed';
      case 'xl':
        return 'text-[22px] leading-loose';
      default:
        return 'text-[19px] leading-[1.8]';
    }
  };

  const nextArticle = allArticles.find((a) => a.id !== article.id);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${getThemeClasses()}`}>
      {/* Sticky Top Reading Bar */}
      <div
        className={`sticky top-0 z-40 backdrop-blur-md border-b ${
          theme === 'dark'
            ? 'bg-[#121212]/95 border-neutral-800'
            : theme === 'paper'
            ? 'bg-[#fbf8f2]/95 border-stone-300'
            : 'bg-white/95 border-nyt'
        }`}
      >
        {/* Progress line */}
        <div
          className="h-1 bg-neutral-900 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-[1200px] mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-nyt-sans font-bold uppercase tracking-wider text-neutral-600 hover:text-black shrink-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Front Page</span>
            </button>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <span className="font-masthead text-xl tracking-tight text-black shrink-0 hidden md:inline">
              The New York Times
            </span>
            <span className="text-neutral-400 hidden lg:inline">›</span>
            <h2 className="font-headline font-semibold text-sm truncate hidden lg:inline text-neutral-700">
              {article.title}
            </h2>
          </div>

          {/* Reading Actions Controls */}
          <div className="flex items-center gap-2 shrink-0 text-xs font-nyt-sans">
            {/* Audio narration button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`p-1.5 rounded-sm flex items-center gap-1 border transition-colors ${
                isPlayingAudio
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'hover:bg-neutral-100 border-transparent text-neutral-700'
              }`}
              title="Listen to article narration"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">
                {isPlayingAudio ? 'Listening' : 'Listen'}
              </span>
            </button>

            {/* Font size toggle */}
            <div className="hidden sm:flex items-center border border-nyt rounded-xs overflow-hidden">
              <button
                onClick={() => setFontSize('md')}
                className={`px-2 py-1 text-xs font-serif ${
                  fontSize === 'md' ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                }`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 text-xs font-serif font-bold ${
                  fontSize === 'lg' ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                }`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 text-xs font-serif font-black ${
                  fontSize === 'xl' ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                }`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Theme selector */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTheme('standard')}
                className={`p-1.5 rounded-xs transition-colors ${
                  theme === 'standard' ? 'text-black font-bold' : 'text-neutral-400 hover:text-black'
                }`}
                title="Standard white"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('paper')}
                className={`p-1.5 rounded-xs transition-colors ${
                  theme === 'paper' ? 'text-amber-800 font-bold' : 'text-neutral-400 hover:text-amber-800'
                }`}
                title="Warm paper"
              >
                <Coffee className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-xs transition-colors ${
                  theme === 'dark' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Dark mode"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            <span className="text-neutral-300">|</span>

            {/* Bookmark */}
            <button
              onClick={onToggleSave}
              className={`p-1.5 rounded-xs transition-colors ${
                isSaved ? 'text-neutral-900 fill-current' : 'text-neutral-500 hover:text-black'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-black' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 text-neutral-500 hover:text-black rounded-xs transition-colors relative"
              title="Share article link"
            >
              {shareCopied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Comments button */}
            <button
              onClick={onOpenComments}
              className="p-1.5 flex items-center gap-1 text-neutral-600 hover:text-black rounded-xs transition-colors"
              title="Open discussion"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-semibold text-[11px]">{article.commentsCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Audio Bar if active */}
      {isPlayingAudio && (
        <div className="bg-neutral-900 text-white border-b border-neutral-700 py-2.5 px-4 sticky top-12 z-30 shadow-md">
          <div className="max-w-[800px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
              <div>
                <span className="text-xs font-nyt-sans font-bold uppercase tracking-wider text-neutral-400 block">
                  NYT Audio Narration
                </span>
                <span className="text-xs font-serif font-medium truncate max-w-xs block">
                  {article.title}
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-xs flex items-center gap-2">
              <span className="text-[10px] font-mono text-neutral-400">1:42</span>
              <div className="flex-1 bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-400">7:15</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setAudioSpeed(audioSpeed === 1 ? 1.25 : audioSpeed === 1.25 ? 1.5 : 1)}
                className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 hover:text-white"
              >
                {audioSpeed}x
              </button>
              <button
                onClick={() => setIsPlayingAudio(false)}
                className="text-neutral-400 hover:text-white"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Article Container */}
      <article className="max-w-[760px] mx-auto px-4 py-8 md:py-12">
        {/* Kicker & Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-nyt-sans text-xs font-extrabold uppercase tracking-widest text-red-800">
            {article.kicker || article.section}
          </span>
          {article.badge && (
            <span className="font-nyt-sans text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded uppercase">
              {article.badge}
            </span>
          )}
        </div>

        {/* Headline */}
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight mb-4 text-balance">
          {article.title}
        </h1>

        {/* Subtitle / Deck */}
        <p className="font-body-serif text-lg md:text-xl text-neutral-600 mb-6 leading-snug">
          {article.summary}
        </p>

        {/* Byline & Date Header */}
        <div className="border-t border-b border-nyt py-3.5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-nyt-sans text-neutral-600">
          <div>
            <div className="font-bold text-neutral-900 text-sm">By {article.byline}</div>
            {article.authorRole && <div className="text-neutral-500">{article.authorRole}</div>}
          </div>
          <div className="text-right sm:text-right text-[11px] text-neutral-500">
            <div>{article.date}</div>
            <div className="font-semibold text-neutral-700">{article.readTime}</div>
          </div>
        </div>

        {/* Hero Figure */}
        {article.imageUrl && (
          <figure className="mb-8">
            <div className="overflow-hidden bg-neutral-100 border border-nyt rounded-xs">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full max-h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {(article.imageCaption || article.imageCredit) && (
              <figcaption className="text-xs font-nyt-sans text-neutral-500 pt-2 flex flex-col sm:flex-row sm:justify-between gap-1 leading-snug">
                <span>{article.imageCaption}</span>
                {article.imageCredit && (
                  <span className="text-neutral-400 font-medium">{article.imageCredit}</span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Highlight War Analysis or Key Takeaways if available */}
        {article.highlightBullets && article.highlightBullets.length > 0 && (
          <div className="bg-[#f9f8f5] dark:bg-neutral-800/50 border-l-2 border-black p-4 mb-8 space-y-2">
            <span className="font-nyt-sans text-xs uppercase tracking-wider font-extrabold text-neutral-900 dark:text-neutral-100 block">
              Key Reporting Points
            </span>
            <ul className="text-sm space-y-2 font-body-serif text-neutral-800 dark:text-neutral-200">
              {article.highlightBullets.map((bullet, idx) => (
                <li key={idx} className="leading-snug">
                  • <strong>{bullet.boldPrefix}</strong> {bullet.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Paragraphs */}
        <div className={`font-body-serif space-y-6 ${getFontSizeClasses()}`}>
          {article.content.map((para, index) => {
            // Drop cap on first paragraph
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-black dark:first-letter:text-white leading-relaxed"
                >
                  {para}
                </p>
              );
            }

            // Pull quote in middle paragraph
            if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <blockquote className="my-8 py-4 border-t border-b border-nyt text-xl md:text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 text-center px-4 leading-snug">
                    “The latency difference between low-Earth orbit transceivers and legacy field relays
                    is measured directly in soldier casualties.”
                  </blockquote>
                  <p>{para}</p>
                </React.Fragment>
              );
            }

            return <p key={index}>{para}</p>;
          })}
        </div>

        {/* End of article actions */}
        <div className="mt-12 pt-6 border-t border-nyt flex flex-col sm:flex-row items-center justify-between gap-4 font-nyt-sans">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSave}
              className={`px-4 py-2 text-xs font-semibold rounded-sm border transition-colors flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-neutral-300 hover:bg-neutral-100 text-neutral-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved ? 'Saved to Your List' : 'Save for Later'}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 text-xs font-semibold rounded-sm border border-neutral-300 hover:bg-neutral-100 text-neutral-800 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{shareCopied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>

          <button
            onClick={onOpenComments}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-sm flex items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Join the Discussion ({article.commentsCount})</span>
          </button>
        </div>

        {/* Next recommended article card */}
        {nextArticle && (
          <div className="mt-12 p-6 bg-[#f8f8f8] dark:bg-neutral-800/40 border border-nyt rounded-xs">
            <span className="font-nyt-sans text-[11px] uppercase tracking-wider font-bold text-neutral-500 block mb-2">
              Next in {nextArticle.section}
            </span>
            <h3
              onClick={() => onOpenArticle(nextArticle)}
              className="font-headline text-2xl font-bold hover:underline cursor-pointer leading-tight mb-2"
            >
              {nextArticle.title}
            </h3>
            <p className="font-body-serif text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
              {nextArticle.summary}
            </p>
            <button
              onClick={() => onOpenArticle(nextArticle)}
              className="text-xs font-nyt-sans font-bold text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
            >
              Read Full Story ›
            </button>
          </div>
        )}
      </article>
    </div>
  );
};
