import React from 'react';
import { MessageSquare, Bookmark } from 'lucide-react';
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
  // Find specific articles by ID or index
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
    <main className="max-w-[1340px] mx-auto px-4 py-5" data-purpose="primary-news-grid">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* ======================================================== */}
        {/* LEFT COLUMN: Secondary Lead Stories (3 cols)              */}
        {/* ======================================================== */}
        <section aria-label="Lead Side Stories" className="lg:col-span-3 space-y-6 lg:border-r lg:border-nyt lg:pr-6">
          {/* Story 1: High Ranking Women */}
          {trumpWomenArticle && (
            <article className="space-y-2.5 pb-5 border-b border-nyt relative group">
              <div className="flex items-start justify-between gap-2">
                <h2
                  onClick={() => onSelectArticle(trumpWomenArticle)}
                  className="font-headline text-2xl font-bold leading-tight hover:text-[#555] cursor-pointer"
                >
                  {trumpWomenArticle.title}
                </h2>
                <button
                  onClick={(e) => onToggleSave(trumpWomenArticle.id, e)}
                  title={savedArticleIds.includes(trumpWomenArticle.id) ? 'Saved' : 'Save article'}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-neutral-400 hover:text-black shrink-0"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      savedArticleIds.includes(trumpWomenArticle.id) ? 'fill-current text-black opacity-100' : ''
                    }`}
                  />
                </button>
              </div>
              <p
                onClick={() => onSelectArticle(trumpWomenArticle)}
                className="text-[14px] leading-snug text-neutral-700 cursor-pointer"
              >
                {trumpWomenArticle.summary}
              </p>
              <div className="font-nyt-sans text-[11px] text-neutral-500 flex items-center gap-2">
                <span>{trumpWomenArticle.readTime}</span>
                <span>•</span>
                <span className="text-neutral-400">{trumpWomenArticle.byline}</span>
              </div>
            </article>
          )}

          {/* Story 2: Kimberly Guilfoyle Fall */}
          {guilfoyleArticle && (
            <article className="space-y-2 pb-5 border-b border-nyt group">
              <h3
                onClick={() => onSelectArticle(guilfoyleArticle)}
                className="font-headline text-lg font-bold leading-tight hover:text-neutral-600 cursor-pointer"
              >
                {guilfoyleArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(guilfoyleArticle)}
                className="text-[13px] leading-snug text-neutral-600 cursor-pointer"
              >
                {guilfoyleArticle.summary}
              </p>
              <div className="font-nyt-sans text-[11px] text-neutral-500 flex items-center gap-1 font-semibold">
                <svg className="w-3 h-3 text-neutral-400 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    fillRule="evenodd"
                  />
                </svg>
                <span>{guilfoyleArticle.commentsCount} comments</span>
              </div>
            </article>
          )}

          {/* Story 3: Katie Zacharia / Press Secretary */}
          {zachariaArticle && (
            <article className="space-y-2 pb-5 border-b border-nyt group">
              <h3
                onClick={() => onSelectArticle(zachariaArticle)}
                className="font-headline text-lg font-bold leading-tight hover:text-neutral-600 cursor-pointer"
              >
                {zachariaArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(zachariaArticle)}
                className="text-[13px] leading-snug text-neutral-600 cursor-pointer"
              >
                {zachariaArticle.summary}
              </p>
              <div className="font-nyt-sans text-[11px] text-neutral-500">
                <span>{zachariaArticle.readTime}</span>
              </div>
            </article>
          )}

          {/* Section: Cornell Rape Investigation */}
          {cornellArticle && (
            <article className="space-y-3 pt-2">
              <div className="font-nyt-sans uppercase tracking-widest text-[10px] font-bold text-red-800">
                {cornellArticle.kicker || 'Campus Inquiry'}
              </div>
              <h3
                onClick={() => onSelectArticle(cornellArticle)}
                className="font-headline text-xl font-bold leading-snug hover:text-neutral-600 cursor-pointer"
              >
                {cornellArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(cornellArticle)}
                className="text-[13px] leading-snug text-neutral-600 cursor-pointer"
              >
                {cornellArticle.summary}
              </p>
              {cornellArticle.subLinks && (
                <ul className="font-nyt-sans text-[12px] space-y-1.5 text-neutral-800 font-semibold pt-1">
                  {cornellArticle.subLinks.map((link, idx) => (
                    <li
                      key={idx}
                      onClick={() => onSelectArticle(cornellArticle)}
                      className="hover:underline cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full inline-block" />
                      <span>{link}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )}
        </section>

        {/* ======================================================== */}
        {/* CENTER COLUMN: Primary Breaking Headline & Image (6 cols) */}
        {/* ======================================================== */}
        <section aria-label="Hero Story and Deep Dives" className="lg:col-span-6 space-y-5 lg:border-r lg:border-nyt lg:pr-8">
          {heroArticle && (
            <article className="space-y-3 pb-6 border-b border-nyt">
              <h2
                onClick={() => onSelectArticle(heroArticle)}
                className="font-headline text-3xl sm:text-4xl font-extrabold leading-[1.12] tracking-tight hover:text-neutral-700 cursor-pointer text-center md:text-left"
              >
                {heroArticle.title}
              </h2>
              <p
                onClick={() => onSelectArticle(heroArticle)}
                className="text-[16px] leading-relaxed text-neutral-700 font-body-serif cursor-pointer"
              >
                {heroArticle.summary}
              </p>
              <div className="font-nyt-sans text-[11px] text-neutral-500 flex items-center justify-between pb-1">
                <span className="font-medium">By {heroArticle.byline}</span>
                <span
                  onClick={() => onSelectArticle(heroArticle)}
                  className="font-semibold text-neutral-600 flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <svg className="w-3.5 h-3.5 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      clipRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      fillRule="evenodd"
                    />
                  </svg>
                  1.1k comments
                </span>
              </div>

              {/* Lead Editorial Photography */}
              <figure
                onClick={() => onSelectArticle(heroArticle)}
                className="pt-2 cursor-pointer group"
              >
                <div className="w-full overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img
                    alt={heroArticle.title}
                    className="w-full object-cover max-h-[380px] group-hover:scale-[1.01] transition-transform duration-300"
                    src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                    onError={(e) => {
                      // Fallback if network blocked
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
                <figcaption className="font-nyt-sans text-[11px] text-neutral-500 pt-1.5 flex justify-between">
                  <span>{heroArticle.imageCredit}</span>
                  <span>{heroArticle.imageCaption}</span>
                </figcaption>
              </figure>

              {/* Russia-Ukraine Analysis Bullet Points */}
              {heroArticle.highlightBullets && (
                <div className="bg-stone-50 border-l-2 border-black p-3.5 mt-4 space-y-2">
                  <span className="font-nyt-sans text-[11px] uppercase tracking-wider font-extrabold text-neutral-900 block">
                    Russia-Ukraine War Analysis
                  </span>
                  <ul className="text-[13px] space-y-1.5 text-neutral-800">
                    {heroArticle.highlightBullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        onClick={() => onSelectArticle(heroArticle)}
                        className="hover:underline cursor-pointer"
                      >
                        • <strong>{bullet.boldPrefix}</strong> {bullet.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )}

          {/* Two Column Sub-lead Split below Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {/* Story 1: Trump Diesel Deal */}
            {dieselArticle && (
              <article className="space-y-1.5 pb-4 border-b md:border-b-0 border-nyt">
                <h3
                  onClick={() => onSelectArticle(dieselArticle)}
                  className="font-headline text-lg font-bold leading-tight hover:text-neutral-700 cursor-pointer"
                >
                  {dieselArticle.title}
                </h3>
                <p
                  onClick={() => onSelectArticle(dieselArticle)}
                  className="text-[13px] leading-snug text-neutral-600 cursor-pointer"
                >
                  {dieselArticle.summary}
                </p>
                <div className="font-nyt-sans text-[11px] text-neutral-400">
                  {dieselArticle.readTime}
                </div>
              </article>
            )}

            {/* Story 2: US Intel Ukraine */}
            {usIntelArticle && (
              <article className="space-y-1.5">
                <h3
                  onClick={() => onSelectArticle(usIntelArticle)}
                  className="font-headline text-lg font-bold leading-tight hover:text-neutral-700 cursor-pointer"
                >
                  {usIntelArticle.title}
                </h3>
                <p
                  onClick={() => onSelectArticle(usIntelArticle)}
                  className="text-[13px] leading-snug text-neutral-600 cursor-pointer"
                >
                  {usIntelArticle.summary}
                </p>
                <div className="font-nyt-sans text-[11px] text-neutral-400">
                  {usIntelArticle.readTime}
                </div>
              </article>
            )}
          </div>

          {/* The Evening Briefing Feature Block */}
          {eveningBriefingArticle && (
            <article
              onClick={() => onSelectArticle(eveningBriefingArticle)}
              className="bg-[#f9f9f9] border border-nyt p-4 rounded-sm mt-4 cursor-pointer hover:bg-neutral-100 transition-colors"
            >
              <div className="font-nyt-sans uppercase tracking-widest text-[10px] font-extrabold text-blue-900 mb-1">
                The Evening Briefing
              </div>
              <h3 className="font-headline text-xl font-bold leading-snug hover:text-neutral-700">
                {eveningBriefingArticle.title}
              </h3>
              <p className="text-[13px] text-neutral-600 mt-1">
                {eveningBriefingArticle.summary}
              </p>
              <span className="font-nyt-sans text-[11px] text-neutral-500 font-semibold block mt-2">
                5 min read • By {eveningBriefingArticle.byline}
              </span>
            </article>
          )}
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Opinion, Tech, and Politics (3 cols)        */}
        {/* ======================================================== */}
        <section aria-label="Opinion and Politics Column" className="lg:col-span-3 space-y-6">
          {/* Election Dispatches Section */}
          {texasSenateArticle && (
            <article className="space-y-2 pb-5 border-b border-nyt">
              <div className="flex items-center justify-between border-b border-black pb-1 mb-2">
                <span className="font-nyt-sans uppercase tracking-wider text-[11px] font-bold text-black">
                  Election Dispatches
                </span>
                <span className="font-nyt-sans text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 font-bold uppercase rounded-sm">
                  2026 Polls
                </span>
              </div>
              <h3
                onClick={() => onSelectArticle(texasSenateArticle)}
                className="font-headline text-xl font-bold leading-tight hover:text-neutral-700 cursor-pointer"
              >
                {texasSenateArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(texasSenateArticle)}
                className="text-[13px] leading-snug text-neutral-600 cursor-pointer"
              >
                {texasSenateArticle.summary}
              </p>
              {texasSenateArticle.highlightBullets && (
                <ul className="font-nyt-sans text-[12px] space-y-1.5 text-neutral-800 pt-1">
                  {texasSenateArticle.highlightBullets.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => onSelectArticle(texasSenateArticle)}
                      className="hover:underline cursor-pointer"
                    >
                      › <strong>{item.boldPrefix}</strong> {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )}

          {/* Tech & Artificial Intelligence */}
          {aiDinnerArticle && (
            <article className="space-y-2 pb-5 border-b border-nyt">
              <div className="border-b border-neutral-300 pb-1 mb-2 flex justify-between items-center">
                <span className="font-nyt-sans uppercase tracking-wider text-[11px] font-bold text-neutral-800">
                  Artificial Intelligence
                </span>
                <span className="font-nyt-sans text-[10px] text-neutral-500 font-semibold">
                  Tech Focus
                </span>
              </div>
              <h3
                onClick={() => onSelectArticle(aiDinnerArticle)}
                className="font-headline text-lg font-bold leading-tight hover:text-neutral-700 cursor-pointer"
              >
                {aiDinnerArticle.title}
              </h3>
              <p
                onClick={() => onSelectArticle(aiDinnerArticle)}
                className="text-[13px] leading-snug text-neutral-600 cursor-pointer"
              >
                {aiDinnerArticle.summary}
              </p>
              <div className="font-nyt-sans text-[11px] text-neutral-500 flex items-center justify-between">
                <span>By {aiDinnerArticle.byline}</span>
                <span className="font-semibold text-neutral-700">
                  {aiDinnerArticle.commentsCount} comments
                </span>
              </div>
              {anthropicArticle && (
                <div
                  onClick={() => onSelectArticle(anthropicArticle)}
                  className="pt-2 text-[13px] border-t border-dashed border-nyt cursor-pointer group"
                >
                  <span className="font-bold group-hover:underline block">
                    {anthropicArticle.title}
                  </span>
                  <p className="text-[12px] text-neutral-500 mt-0.5">
                    {anthropicArticle.readTime}
                  </p>
                </div>
              )}
            </article>
          )}

          {/* Opinion Column with Byline Headshots */}
          <aside aria-label="Editorial Columnists" className="space-y-4 pt-1">
            <div className="border-b-2 border-black pb-1 mb-2 flex items-center justify-between">
              <h3 className="font-nyt-sans uppercase tracking-widest text-[12px] font-black text-black">
                Opinion
              </h3>
              <button
                onClick={() => onOpenSection('Opinion')}
                className="font-nyt-sans text-[11px] text-neutral-500 hover:underline cursor-pointer"
              >
                See All ›
              </button>
            </div>

            {/* Columnist 1: David Wallace-Wells */}
            {opinion1 && (
              <div
                onClick={() => onSelectArticle(opinion1)}
                className="flex gap-3 pb-3 border-b border-nyt cursor-pointer group"
              >
                <div className="flex-1 space-y-1">
                  <span className="font-nyt-sans text-[11px] font-bold text-neutral-900 block">
                    {opinion1.byline}
                  </span>
                  <h4 className="font-headline text-[15px] font-bold leading-snug group-hover:text-neutral-700">
                    {opinion1.title}
                  </h4>
                  <span className="font-nyt-sans text-[10px] text-neutral-400">
                    {opinion1.commentsCount} comments
                  </span>
                </div>
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden flex-shrink-0 border border-neutral-300 flex items-center justify-center font-bold font-serif text-neutral-600">
                  DW
                </div>
              </div>
            )}

            {/* Columnist 2: Carlos Lozada */}
            {opinion2 && (
              <div
                onClick={() => onSelectArticle(opinion2)}
                className="flex gap-3 pb-3 border-b border-nyt cursor-pointer group"
              >
                <div className="flex-1 space-y-1">
                  <span className="font-nyt-sans text-[11px] font-bold text-neutral-900 block">
                    {opinion2.byline}
                  </span>
                  <h4 className="font-headline text-[15px] font-bold leading-snug group-hover:text-neutral-700">
                    {opinion2.title}
                  </h4>
                  <span className="font-nyt-sans text-[10px] text-neutral-400">
                    {opinion2.commentsCount} comments
                  </span>
                </div>
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden flex-shrink-0 border border-neutral-300 flex items-center justify-center font-bold font-serif text-neutral-600">
                  CL
                </div>
              </div>
            )}

            {/* Columnist 3: Heather Kerr */}
            {opinion3 && (
              <div
                onClick={() => onSelectArticle(opinion3)}
                className="flex gap-3 pb-1 cursor-pointer group"
              >
                <div className="flex-1 space-y-1">
                  <span className="font-nyt-sans text-[11px] font-bold text-neutral-900 block">
                    {opinion3.byline}
                  </span>
                  <h4 className="font-headline text-[15px] font-bold leading-snug group-hover:text-neutral-700">
                    {opinion3.title}
                  </h4>
                  <span className="font-nyt-sans text-[10px] text-neutral-400">Guest Essay</span>
                </div>
                <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden flex-shrink-0 border border-neutral-300 flex items-center justify-center font-bold font-serif text-neutral-600">
                  HK
                </div>
              </div>
            )}
          </aside>

          {/* Pope Leo Health Update Section */}
          {popeLeoArticle && (
            <article
              onClick={() => onSelectArticle(popeLeoArticle)}
              className="bg-stone-50 p-3.5 border border-nyt space-y-2 cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <span className="font-nyt-sans text-[10px] uppercase tracking-wider font-extrabold text-neutral-700 block">
                Health & Science
              </span>
              <h4 className="font-headline text-[16px] font-bold leading-snug">
                {popeLeoArticle.title}
              </h4>
              <p className="text-[12px] text-neutral-600">
                {popeLeoArticle.summary}
              </p>
              <span className="font-nyt-sans text-[10px] text-neutral-400 block">
                {popeLeoArticle.commentsCount} comments
              </span>
            </article>
          )}
        </section>
      </div>
    </main>
  );
};
