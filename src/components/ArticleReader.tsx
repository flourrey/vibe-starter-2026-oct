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
  Printer,
  Mail,
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(15);
  const [fontMode, setFontMode] = useState<'serif' | 'typewriter'>('serif');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextArticle = allArticles.find((a) => a.id !== article.id);

  return (
    <div className="max-w-[1000px] mx-auto p-2 sm:p-4 font-serif">
      {/* 90s Document Window Frame */}
      <div className="win95-raised p-1 shadow-lg">
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <div className="truncate">
            <span>Netscape Document: [{article.title}]</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onBack}
              className="win95-btn px-1.5 py-0.2 text-[10px] font-bold text-black"
            >
              [Back to Index]
            </button>
          </div>
        </div>

        {/* 1990s Netscape Document Utility Bar */}
        <div className="bg-[#c0c0c0] p-1.5 border-b border-[#808080] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={onBack}
              className="win95-btn px-2 py-0.5 text-xs font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Index</span>
            </button>
            <button
              onClick={() => window.print()}
              className="win95-btn px-2 py-0.5 text-xs font-bold flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Page</span>
            </button>
            <button
              onClick={onToggleSave}
              className="win95-btn px-2 py-0.5 text-xs font-bold flex items-center gap-1"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-red-700 fill-current' : ''}`} />
              <span>{isSaved ? 'Hotlisted [OK]' : 'Add to Hotlist'}</span>
            </button>
            <button
              onClick={handleShare}
              className="win95-btn px-2 py-0.5 text-xs font-bold flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'URL Copied!' : 'Copy URL'}</span>
            </button>
          </div>

          {/* Retro Font & RealAudio Trigger */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFontMode(fontMode === 'serif' ? 'typewriter' : 'serif')}
              className="win95-btn px-2 py-0.5 text-[11px] font-mono"
            >
              Font: [{fontMode.toUpperCase()}]
            </button>
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`win95-btn px-2 py-0.5 text-xs font-bold flex items-center gap-1 ${
                isPlayingAudio ? 'win95-sunken bg-yellow-100 text-[#000080]' : ''
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-red-600" />
              <span>RealAudio 3.0</span>
            </button>
            <button
              onClick={onOpenComments}
              className="win95-btn px-2 py-0.5 text-xs font-bold flex items-center gap-1 text-[#000080]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Forum ({article.commentsCount})</span>
            </button>
          </div>
        </div>

        {/* RealAudio 3.0 Vintage Player Bar */}
        {isPlayingAudio && (
          <div className="bg-[#121212] text-green-400 p-2 border-b-2 border-black flex items-center justify-between gap-3 font-typewriter text-xs">
            <div className="flex items-center gap-2">
              <span className="bg-red-700 text-white px-1.5 py-0.2 font-pixel text-sm animate-pulse">
                REC / STREAM
              </span>
              <span className="text-yellow-400 font-bold truncate max-w-xs">
                RealAudio: {article.title} (Mono 14.4k)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-500 font-pixel text-lg">01:48</span>
              <div className="win95-sunken w-32 h-3 bg-black overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <button
                onClick={() => setIsPlayingAudio(false)}
                className="win95-btn text-black text-[10px] font-bold px-1.5 py-0.2"
              >
                [Stop]
              </button>
            </div>
          </div>
        )}

        {/* Main Document Body */}
        <div className={`bg-white p-6 sm:p-10 border border-black ${fontMode === 'typewriter' ? 'font-typewriter' : 'font-serif'}`}>
          {/* Header Metadata */}
          <div className="border-b-2 border-black pb-3 mb-6">
            <div className="text-xs font-typewriter text-red-800 font-bold uppercase mb-1">
              *** {article.kicker || article.section} DISPATCH ***
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-headline leading-tight mb-2">
              {article.title}
            </h1>
            <p className="text-base text-gray-800 italic leading-snug">
              {article.summary}
            </p>
            <div className="mt-3 pt-2 border-t border-gray-300 text-xs font-typewriter text-gray-700 flex flex-wrap justify-between">
              <span><b>Byline:</b> {article.byline} ({article.authorRole || 'Correspondent'})</span>
              <span><b>Filed:</b> {article.date} · {article.readTime}</span>
            </div>
          </div>

          {/* Hero Image in Vintage Frame */}
          {article.imageUrl && (
            <figure className="my-6">
              <div className="win95-sunken p-1.5 bg-black">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full max-h-[420px] object-cover"
                />
              </div>
              <figcaption className="text-xs font-typewriter text-black pt-1 bg-gray-100 p-2 border border-black border-t-0 flex justify-between">
                <span>{article.imageCaption}</span>
                <span>Photo: {article.imageCredit}</span>
              </figcaption>
            </figure>
          )}

          {/* Highlights in 90s Inset Box */}
          {article.highlightBullets && article.highlightBullets.length > 0 && (
            <div className="win95-raised p-3 my-6 bg-yellow-50 border border-black">
              <span className="font-bold font-typewriter text-xs text-red-900 block mb-2">
                CRITICAL DISPATCH POINTS:
              </span>
              <ul className="text-xs space-y-1.5 text-black">
                {article.highlightBullets.map((bullet, idx) => (
                  <li key={idx}>
                    • <b>{bullet.boldPrefix}</b> {bullet.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Body Paragraphs */}
          <div className="space-y-4 text-base leading-relaxed text-black">
            {article.content.map((para, index) => {
              if (index === 0) {
                return (
                  <p key={index} className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-black">
                    {para}
                  </p>
                );
              }

              if (index === 3) {
                return (
                  <React.Fragment key={index}>
                    <div className="my-6 p-4 border-2 border-dashed border-black bg-gray-50 text-center font-bold text-lg italic">
                      “The latency difference between low-Earth orbit transceivers and legacy field relays
                      is measured directly in soldier casualties.”
                    </div>
                    <p>{para}</p>
                  </React.Fragment>
                );
              }

              return <p key={index}>{para}</p>;
            })}
          </div>

          {/* Document End / Signoff */}
          <div className="mt-8 pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 text-xs font-typewriter">
            <div>
              [END OF FILE - TRANSMITTED VIA NYTIMES CYBERNET]
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenComments}
                className="win95-btn px-2 py-1 font-bold text-[#000080]"
              >
                Post Response to Usenet Forum ({article.commentsCount})
              </button>
              <button
                onClick={onBack}
                className="win95-btn px-2 py-1 font-bold"
              >
                Return to Front Page
              </button>
            </div>
          </div>

          {/* Next Story Box */}
          {nextArticle && (
            <div className="mt-6 p-3 bg-gray-100 border border-black win95-raised">
              <span className="font-typewriter text-[10px] text-gray-600 block">
                NEXT FILE IN SECTION [{nextArticle.section.toUpperCase()}]:
              </span>
              <h4
                onClick={() => onOpenArticle(nextArticle)}
                className="retro-link text-base font-bold font-headline mt-1 block"
              >
                {nextArticle.title}
              </h4>
              <p className="text-xs text-gray-700 mt-1">{nextArticle.summary}</p>
            </div>
          )}
        </div>

        {/* Netscape Status Bar at bottom of document */}
        <div className="win95-sunken px-2 py-1 mt-1 text-[11px] font-typewriter text-black bg-[#c0c0c0] flex justify-between">
          <span>Document: Done (24,812 bytes downloaded at 28,800 bps)</span>
          <span className="text-green-800 font-bold">100% COMPLETE</span>
        </div>
      </div>
    </div>
  );
};
