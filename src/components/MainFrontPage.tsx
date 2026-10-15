import React from 'react';
import { MessageSquare, Bookmark, ArrowUpRight, TrendingUp, Cpu, Activity } from 'lucide-react';
import { Article } from '../types/news';

interface MainFrontPageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSave: (articleId: string, e: React.MouseEvent) => void;
  onOpenSection: (section: string) => void;
}

export const MainFrontPage: React.FC<MainFrontPageProps> = ({
  articles,
  onSelectArticle,
  savedArticleIds,
  onToggleSave,
  onOpenSection,
}) => {
  const heroArticle = articles.find((a) => a.id === 'ukraine-exposure-satellite-russia') || articles[0];
  const trumpWomenArticle = articles.find((a) => a.id === 'high-ranking-women-trump-admin') || articles[1];
  const guilfoyleArticle = articles.find((a) => a.id === 'steep-rise-sudden-fall-kimberly-guilfoyle') || articles[2];
  const zachariaArticle = articles.find((a) => a.id === 'trumps-new-press-secretary-not-quite-attorney') || articles[3];
  const cornellArticle = articles.find((a) => a.id === 'cornells-president-grilled-by-faculty-senate') || articles[4];
  const dieselArticle = articles.find((a) => a.id === 'trump-diesel-deal-putin-gas-prices') || articles[5];
  const usIntelArticle = articles.find((a) => a.id === 'us-continues-provide-intelligence-ukraine') || articles[6];
  const eveningBriefingArticle = articles.find((a) => a.id === 'evening-briefing-catch-up-biggest-stories') || articles[7];
  const texasSenateArticle = articles.find((a) => a.id === 'texas-senate-race-tightens-talarico-edge') || articles[8];
  const aiDinnerArticle = articles.find((a) => a.id === 'ai-agents-dinner-party-conversation') || articles[9];
  const anthropicArticle = articles.find((a) => a.id === 'anthropic-revenue-jumped-third-quarter') || articles[10];
  const opinion1 = articles.find((a) => a.id === 'opinion-david-wallace-wells-democrats-message') || articles[11];
  const opinion2 = articles.find((a) => a.id === 'opinion-carlos-lozada-manifesto-to-end-manifestoes') || articles[12];
  const opinion3 = articles.find((a) => a.id === 'opinion-heather-kerr-ebola-rural-clinics') || articles[13];
  const popeLeoArticle = articles.find((a) => a.id === 'health-science-lung-cancer-therapy-pope-leo') || articles[14];

  return (
    <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6" data-purpose="primary-news-grid">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ======================================================== */}
        {/* LEFT COLUMN: Apple News Editorial Cards (3 cols)         */}
        {/* ======================================================== */}
        <section aria-label="Lead Side Stories" className="lg:col-span-3 space-y-4">
          {/* Story 1: High Ranking Women */}
          {trumpWomenArticle && (
            <article className="apple-card p-5 group relative">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff3b30] bg-red-50 px-2 py-0.5 rounded-full">
                  Politics
                </span>
                <button
                  onClick={(e) => onToggleSave(trumpWomenArticle.id, e)}
                  title={savedArticleIds.includes(trumpWomenArticle.id) ? 'Saved' : 'Save story'}
                  className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-black/[0.05] transition-colors"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      savedArticleIds.includes(trumpWomenArticle.id)
                        ? 'fill-current text-[#0071e3]'
                        : ''
                    }`}
                  />
                </button>
              </div>

              <h2
                onClick={() => onSelectArticle(trumpWomenArticle)}
                className="font-apple-display text-xl font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
              >
                {trumpWomenArticle.title}
              </h2>
              <p
                onClick={() => onSelectArticle(trumpWomenArticle)}
                className="text-[13px] leading-relaxed text-neutral-600 mt-2 cursor-pointer font-nyt-sans line-clamp-3"
              >
                {trumpWomenArticle.summary}
              </p>
              <div className="text-[11px] text-neutral-400 mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between font-nyt-sans">
                <span>{trumpWomenArticle.readTime}</span>
                <span className="flex items-center gap-0.5 text-[#0071e3] font-medium group-hover:translate-x-0.5 transition-transform">
                  Read <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          )}

          {/* Story 2: Kimberly Guilfoyle Fall */}
          {guilfoyleArticle && (
            <article className="apple-card p-5 group">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                Diplomatic Desk
              </span>
              <h3
                onClick={() => onSelectArticle(guilfoyleArticle)}
                className="font-apple-display text-lg font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
              >
                {guilfoyleArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(guilfoyleArticle)}
                className="text-[13px] leading-relaxed text-neutral-600 mt-1.5 cursor-pointer font-nyt-sans line-clamp-2"
              >
                {guilfoyleArticle.summary}
              </p>
              <div className="text-[11px] text-neutral-400 mt-3 flex items-center gap-1 font-medium font-nyt-sans">
                <MessageSquare className="w-3 h-3 text-neutral-400" />
                <span>{guilfoyleArticle.commentsCount} comments</span>
              </div>
            </article>
          )}

          {/* Story 3: Katie Zacharia / Press Secretary */}
          {zachariaArticle && (
            <article className="apple-card p-5 group">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                White House
              </span>
              <h3
                onClick={() => onSelectArticle(zachariaArticle)}
                className="font-apple-display text-lg font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
              >
                {zachariaArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(zachariaArticle)}
                className="text-[13px] leading-relaxed text-neutral-600 mt-1.5 cursor-pointer font-nyt-sans line-clamp-2"
              >
                {zachariaArticle.summary}
              </p>
              <div className="text-[11px] text-neutral-400 mt-3 font-nyt-sans">
                <span>{zachariaArticle.readTime}</span>
              </div>
            </article>
          )}

          {/* Section: Cornell Campus Inquiry */}
          {cornellArticle && (
            <article className="apple-card p-5 bg-gradient-to-br from-white to-[#fafafa] border border-black/[0.06]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3261e] bg-red-50 px-2 py-0.5 rounded-full inline-block mb-2">
                Campus Inquiry
              </span>
              <h3
                onClick={() => onSelectArticle(cornellArticle)}
                className="font-apple-display text-lg font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
              >
                {cornellArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(cornellArticle)}
                className="text-[13px] leading-relaxed text-neutral-600 mt-1.5 cursor-pointer font-nyt-sans"
              >
                {cornellArticle.summary}
              </p>
              {cornellArticle.subLinks && (
                <div className="mt-3 pt-3 border-t border-black/[0.04] space-y-1.5 text-xs font-nyt-sans text-neutral-700">
                  {cornellArticle.subLinks.map((link, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectArticle(cornellArticle)}
                      className="hover:text-[#0071e3] cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      <span>{link}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )}
        </section>

        {/* ======================================================== */}
        {/* CENTER COLUMN: Apple Spotlight Bento Hero (6 cols)        */}
        {/* ======================================================== */}
        <section aria-label="Hero Story and Deep Dives" className="lg:col-span-6 space-y-6">
          {heroArticle && (
            <article className="apple-card p-6 sm:p-7 bg-white relative overflow-hidden">
              {/* Apple News Category & Read Time Capsule */}
              <div className="flex items-center justify-between mb-3 text-xs font-nyt-sans">
                <span className="bg-neutral-900 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Spotlight Story
                </span>
                <span className="text-neutral-500 font-medium">{heroArticle.readTime}</span>
              </div>

              {/* Dominant Apple Display Headline */}
              <h2
                onClick={() => onSelectArticle(heroArticle)}
                className="font-apple-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors leading-[1.14]"
              >
                {heroArticle.title}
              </h2>

              {/* Deck */}
              <p
                onClick={() => onSelectArticle(heroArticle)}
                className="text-[15px] leading-relaxed text-neutral-600 mt-3 font-nyt-sans cursor-pointer"
              >
                {heroArticle.summary}
              </p>

              {/* Byline & Discussion */}
              <div className="flex items-center justify-between mt-3 text-xs text-neutral-500 font-nyt-sans pb-4 border-b border-black/[0.04]">
                <span className="font-semibold text-neutral-800">By {heroArticle.byline}</span>
                <span
                  onClick={() => onSelectArticle(heroArticle)}
                  className="flex items-center gap-1 text-neutral-600 hover:text-black cursor-pointer font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  1.1k comments
                </span>
              </div>

              {/* Lead Editorial Image with Apple continuous rounded corners */}
              <figure
                onClick={() => onSelectArticle(heroArticle)}
                className="mt-4 cursor-pointer group"
              >
                <div className="w-full overflow-hidden rounded-2xl bg-neutral-100 border border-black/[0.06] shadow-xs">
                  <img
                    alt={heroArticle.title}
                    className="w-full object-cover max-h-[380px] group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                    src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
                <figcaption className="text-[11px] font-nyt-sans text-neutral-500 pt-2 flex justify-between px-1">
                  <span>{heroArticle.imageCredit}</span>
                  <span>{heroArticle.imageCaption}</span>
                </figcaption>
              </figure>

              {/* Russia-Ukraine War Analysis in Apple Inset Card */}
              {heroArticle.highlightBullets && (
                <div className="mt-5 p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.03]">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-neutral-900 block mb-2 font-nyt-sans">
                    War Analysis & Key Takeaways
                  </span>
                  <div className="space-y-2 text-xs font-nyt-sans text-neutral-800">
                    {heroArticle.highlightBullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        onClick={() => onSelectArticle(heroArticle)}
                        className="hover:text-[#0071e3] cursor-pointer flex items-start gap-2 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-1.5 shrink-0" />
                        <p className="leading-snug">
                          <strong className="text-black font-semibold">{bullet.boldPrefix}</strong>{' '}
                          {bullet.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}

          {/* Sub-leads Split in Two Apple Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dieselArticle && (
              <article className="apple-card p-5 group flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Energy Analysis
                  </span>
                  <h3
                    onClick={() => onSelectArticle(dieselArticle)}
                    className="font-apple-display text-base font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
                  >
                    {dieselArticle.title}
                  </h3>
                  <p
                    onClick={() => onSelectArticle(dieselArticle)}
                    className="text-xs text-neutral-600 mt-2 font-nyt-sans line-clamp-3 leading-relaxed"
                  >
                    {dieselArticle.summary}
                  </p>
                </div>
                <span className="text-[11px] text-neutral-400 mt-3 block font-nyt-sans">
                  {dieselArticle.readTime}
                </span>
              </article>
            )}

            {usIntelArticle && (
              <article className="apple-card p-5 group flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Intelligence Desk
                  </span>
                  <h3
                    onClick={() => onSelectArticle(usIntelArticle)}
                    className="font-apple-display text-base font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
                  >
                    {usIntelArticle.title}
                  </h3>
                  <p
                    onClick={() => onSelectArticle(usIntelArticle)}
                    className="text-xs text-neutral-600 mt-2 font-nyt-sans line-clamp-3 leading-relaxed"
                  >
                    {usIntelArticle.summary}
                  </p>
                </div>
                <span className="text-[11px] text-neutral-400 mt-3 block font-nyt-sans">
                  {usIntelArticle.readTime}
                </span>
              </article>
            )}
          </div>

          {/* The Evening Briefing Apple Card */}
          {eveningBriefingArticle && (
            <article
              onClick={() => onSelectArticle(eveningBriefingArticle)}
              className="apple-card p-6 bg-gradient-to-r from-neutral-900 to-[#1d1d1f] text-white cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  The Evening Briefing
                </span>
                <span className="text-neutral-400 text-xs">5 min read</span>
              </div>
              <h3 className="font-apple-display text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {eveningBriefingArticle.title}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 font-nyt-sans leading-relaxed">
                {eveningBriefingArticle.summary}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 font-nyt-sans">
                <span>By {eveningBriefingArticle.byline}</span>
                <span className="text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Listen & Read <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          )}
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Opinion & Cupertino Deep Dives (3 cols)    */}
        {/* ======================================================== */}
        <section aria-label="Opinion and Politics Column" className="lg:col-span-3 space-y-4">
          {/* Election Dispatches Apple Polling Card */}
          {texasSenateArticle && (
            <article className="apple-card p-5 group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-nyt-sans">
                  Election Dispatches
                </span>
                <span className="bg-red-50 text-red-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-red-100 font-nyt-sans">
                  2026 Polls
                </span>
              </div>
              <h3
                onClick={() => onSelectArticle(texasSenateArticle)}
                className="font-apple-display text-lg font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
              >
                {texasSenateArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(texasSenateArticle)}
                className="text-[13px] leading-relaxed text-neutral-600 mt-1.5 cursor-pointer font-nyt-sans line-clamp-2"
              >
                {texasSenateArticle.summary}
              </p>
              {texasSenateArticle.highlightBullets && (
                <div className="mt-3 pt-3 border-t border-black/[0.04] space-y-1.5 text-xs font-nyt-sans">
                  {texasSenateArticle.highlightBullets.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectArticle(texasSenateArticle)}
                      className="text-neutral-700 hover:text-black cursor-pointer leading-snug flex items-start gap-1.5"
                    >
                      <span className="text-[#0071e3] font-bold">›</span>
                      <span>
                        <strong className="text-black">{item.boldPrefix}</strong> {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )}

          {/* Tech & Artificial Intelligence */}
          {aiDinnerArticle && (
            <article className="apple-card p-5 group">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0071e3] font-nyt-sans">
                  <Cpu className="w-3.5 h-3.5" />
                  Artificial Intelligence
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">Tech Focus</span>
              </div>
              <h3
                onClick={() => onSelectArticle(aiDinnerArticle)}
                className="font-apple-display text-lg font-bold leading-snug tracking-tight text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
              >
                {aiDinnerArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(aiDinnerArticle)}
                className="text-[13px] leading-relaxed text-neutral-600 mt-1.5 cursor-pointer font-nyt-sans line-clamp-3"
              >
                {aiDinnerArticle.summary}
              </p>
              <div className="text-[11px] text-neutral-400 mt-3 pt-2.5 border-t border-black/[0.04] flex items-center justify-between font-nyt-sans">
                <span>By {aiDinnerArticle.byline}</span>
                <span>{aiDinnerArticle.commentsCount} comments</span>
              </div>

              {anthropicArticle && (
                <div
                  onClick={() => onSelectArticle(anthropicArticle)}
                  className="mt-3 pt-3 border-t border-black/[0.06] cursor-pointer group/item"
                >
                  <span className="font-bold text-xs group-hover/item:text-[#0071e3] transition-colors block leading-snug">
                    {anthropicArticle.title}
                  </span>
                  <span className="text-[11px] text-neutral-400 mt-0.5 block">
                    {anthropicArticle.readTime}
                  </span>
                </div>
              )}
            </article>
          )}

          {/* Opinion Column with Apple Squircle Columnist Avatars */}
          <aside className="apple-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
              <h3 className="font-apple-display font-bold text-sm tracking-tight text-neutral-900">
                Editorial & Opinion
              </h3>
              <button
                onClick={() => onOpenSection('Opinion')}
                className="text-xs text-[#0071e3] hover:underline cursor-pointer font-medium"
              >
                See All ›
              </button>
            </div>

            {/* Columnist 1 */}
            {opinion1 && (
              <div
                onClick={() => onSelectArticle(opinion1)}
                className="flex gap-3 cursor-pointer group pb-3 border-b border-black/[0.04]"
              >
                <div className="flex-1 space-y-1 font-nyt-sans">
                  <span className="text-xs font-bold text-neutral-900 block">
                    {opinion1.byline}
                  </span>
                  <h4 className="font-apple-display text-[14px] font-bold leading-snug group-hover:text-[#0071e3] transition-colors">
                    {opinion1.title}
                  </h4>
                  <span className="text-[11px] text-neutral-400 block">
                    {opinion1.commentsCount} comments
                  </span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold font-apple-display text-xs shrink-0 ring-1 ring-black/[0.05]">
                  DW
                </div>
              </div>
            )}

            {/* Columnist 2 */}
            {opinion2 && (
              <div
                onClick={() => onSelectArticle(opinion2)}
                className="flex gap-3 cursor-pointer group pb-3 border-b border-black/[0.04]"
              >
                <div className="flex-1 space-y-1 font-nyt-sans">
                  <span className="text-xs font-bold text-neutral-900 block">
                    {opinion2.byline}
                  </span>
                  <h4 className="font-apple-display text-[14px] font-bold leading-snug group-hover:text-[#0071e3] transition-colors">
                    {opinion2.title}
                  </h4>
                  <span className="text-[11px] text-neutral-400 block">
                    {opinion2.commentsCount} comments
                  </span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold font-apple-display text-xs shrink-0 ring-1 ring-black/[0.05]">
                  CL
                </div>
              </div>
            )}

            {/* Columnist 3 */}
            {opinion3 && (
              <div
                onClick={() => onSelectArticle(opinion3)}
                className="flex gap-3 cursor-pointer group"
              >
                <div className="flex-1 space-y-1 font-nyt-sans">
                  <span className="text-xs font-bold text-neutral-900 block">
                    {opinion3.byline}
                  </span>
                  <h4 className="font-apple-display text-[14px] font-bold leading-snug group-hover:text-[#0071e3] transition-colors">
                    {opinion3.title}
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-medium">Guest Essay</span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold font-apple-display text-xs shrink-0 ring-1 ring-black/[0.05]">
                  HK
                </div>
              </div>
            )}
          </aside>

          {/* Health & Science Apple Inset Card */}
          {popeLeoArticle && (
            <article
              onClick={() => onSelectArticle(popeLeoArticle)}
              className="apple-card p-5 bg-[#fafafa] border border-black/[0.05] cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5 font-nyt-sans">
                <Activity className="w-3.5 h-3.5 text-rose-500" />
                <span>Health & Science</span>
              </div>
              <h4 className="font-apple-display text-[15px] font-bold leading-snug group-hover:text-[#0071e3] transition-colors">
                {popeLeoArticle.title}
              </h4>
              <p className="text-xs text-neutral-600 mt-1.5 font-nyt-sans line-clamp-2">
                {popeLeoArticle.summary}
              </p>
              <span className="text-[11px] text-neutral-400 mt-2 block font-nyt-sans">
                {popeLeoArticle.commentsCount} comments
              </span>
            </article>
          )}
        </section>
      </div>
    </main>
  );
};
