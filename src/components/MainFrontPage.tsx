import React from 'react';
import { MessageSquare, Bookmark, Volume2, ExternalLink } from 'lucide-react';
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
    <main className="max-w-[1360px] mx-auto px-2 sm:px-4 py-3 font-serif" data-purpose="primary-retro-grid">
      {/* 90s Web 1.0 Three-Column Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* ======================================================== */}
        {/* LEFT COLUMN: 1990s News Desk (3 cols)                    */}
        {/* ======================================================== */}
        <section aria-label="National Dispatches" className="lg:col-span-3 space-y-3">
          {/* Section Box Frame */}
          <div className="win95-raised p-1">
            <div className="win95-titlebar mb-2">
              <span>National & Politics Desk</span>
              <span className="text-[10px] font-mono">[SECTION A]</span>
            </div>

            <div className="bg-white p-3 border border-black space-y-4">
              {/* Story 1 */}
              {trumpWomenArticle && (
                <article className="border-b border-gray-300 pb-3">
                  <span className="font-pixel text-sm text-red-700 font-bold block leading-none mb-1">
                    [SPECIAL DISPATCH]
                  </span>
                  <h2
                    onClick={() => onSelectArticle(trumpWomenArticle)}
                    className="retro-link text-base font-bold font-headline leading-tight block mb-1"
                  >
                    {trumpWomenArticle.title}
                  </h2>
                  <p className="text-xs text-black leading-snug">
                    {trumpWomenArticle.summary}
                  </p>
                  <div className="mt-2 text-[10px] font-typewriter text-gray-600 flex items-center justify-between">
                    <span>5 MIN READ · TIERNEY L. CROSS</span>
                    <button
                      onClick={(e) => onToggleSave(trumpWomenArticle.id, e)}
                      className="win95-btn px-1 py-0.2 text-[9px]"
                    >
                      {savedArticleIds.includes(trumpWomenArticle.id) ? '★ Hotlisted' : '+ Hotlist'}
                    </button>
                  </div>
                </article>
              )}

              {/* Story 2 */}
              {guilfoyleArticle && (
                <article className="border-b border-gray-300 pb-3">
                  <h3
                    onClick={() => onSelectArticle(guilfoyleArticle)}
                    className="retro-link text-sm font-bold font-headline leading-tight block mb-1"
                  >
                    {guilfoyleArticle.title}
                  </h3>
                  <p className="text-xs text-black leading-snug">
                    {guilfoyleArticle.summary}
                  </p>
                  <div className="text-[10px] font-typewriter text-gray-500 mt-1">
                    Forum: 519 responses logged
                  </div>
                </article>
              )}

              {/* Story 3 */}
              {zachariaArticle && (
                <article className="border-b border-gray-300 pb-3">
                  <h3
                    onClick={() => onSelectArticle(zachariaArticle)}
                    className="retro-link text-sm font-bold font-headline leading-tight block mb-1"
                  >
                    {zachariaArticle.title}
                  </h3>
                  <p className="text-xs text-black leading-snug">
                    {zachariaArticle.summary}
                  </p>
                  <span className="text-[10px] font-typewriter text-gray-500 block mt-1">
                    4 min text stream
                  </span>
                </article>
              )}

              {/* Story 4: Cornell Campus Inquiry */}
              {cornellArticle && (
                <article className="bg-yellow-50 p-2 border border-black">
                  <div className="bg-red-800 text-white font-pixel px-1 text-xs font-bold inline-block mb-1">
                    CAMPUS INQUIRY · ACADEMIC DISPATCH
                  </div>
                  <h3
                    onClick={() => onSelectArticle(cornellArticle)}
                    className="retro-link text-sm font-bold font-headline leading-tight block mb-1"
                  >
                    {cornellArticle.title}
                  </h3>
                  <p className="text-xs text-black leading-snug">
                    {cornellArticle.summary}
                  </p>
                  {cornellArticle.subLinks && (
                    <ul className="mt-2 text-xs text-black space-y-1 list-disc list-inside">
                      {cornellArticle.subLinks.map((link, idx) => (
                        <li
                          key={idx}
                          onClick={() => onSelectArticle(cornellArticle)}
                          className="retro-link text-[11px]"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CENTER COLUMN: Lead Headline & Retro Media (6 cols)      */}
        {/* ======================================================== */}
        <section aria-label="Hero Story and Deep Dives" className="lg:col-span-6 space-y-3">
          {heroArticle && (
            <div className="win95-raised p-1">
              <div className="win95-titlebar mb-1">
                <span>International Lead Bulletin</span>
                <span className="text-[10px] font-mono">[WAR & CRISIS]</span>
              </div>

              <div className="bg-white p-4 border border-black">
                {/* Vintage Top Category */}
                <div className="flex items-center justify-between text-xs font-typewriter text-red-800 font-bold border-b-2 border-black pb-1 mb-2">
                  <span>WORLD REPORT: KYIV FRONT LINE</span>
                  <span className="bg-black text-white px-1 text-[10px]">TRANSMISSION VERIFIED</span>
                </div>

                {/* Main Headline */}
                <h2
                  onClick={() => onSelectArticle(heroArticle)}
                  className="retro-link text-2xl sm:text-3xl font-black font-headline leading-[1.12] mb-2 block"
                >
                  {heroArticle.title}
                </h2>

                <p className="text-sm font-serif leading-relaxed text-black mb-3">
                  {heroArticle.summary}
                </p>

                <div className="text-xs font-typewriter text-gray-700 flex items-center justify-between border-t border-b border-gray-300 py-1 mb-3">
                  <span>By {heroArticle.byline}</span>
                  <span className="font-bold">Discussion: 1.1k Postings</span>
                </div>

                {/* 1990s Image Box with Inset Border */}
                <figure className="mb-3">
                  <div className="win95-sunken p-1 bg-black">
                    <img
                      alt={heroArticle.title}
                      className="w-full object-cover max-h-[340px]"
                      src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                  <figcaption className="text-[11px] font-typewriter text-gray-700 pt-1 flex justify-between bg-gray-100 p-1 border border-t-0 border-black">
                    <span>Photo: {heroArticle.imageCredit}</span>
                    <span>{heroArticle.imageCaption}</span>
                  </figcaption>
                </figure>

                {/* 90s War Analysis Table */}
                {heroArticle.highlightBullets && (
                  <div className="win95-raised p-2 my-3 text-xs">
                    <div className="bg-[#000080] text-white font-bold px-2 py-0.5 text-xs mb-1.5 flex justify-between">
                      <span>RUSSIA-UKRAINE WAR ANALYSIS</span>
                      <span className="font-mono text-[10px]">MEMORANDUM</span>
                    </div>
                    <ul className="space-y-1.5 text-black">
                      {heroArticle.highlightBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-[#000080] font-bold">»</span>
                          <span>
                            <b>{bullet.boldPrefix}</b> {bullet.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Two Sub-leads in 90s Table Cells */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t-2 border-black">
                  {dieselArticle && (
                    <article className="border border-gray-400 p-2 bg-gray-50">
                      <span className="font-typewriter text-[10px] text-gray-600 block mb-0.5">
                        COMMODITY EXCHANGE
                      </span>
                      <h4
                        onClick={() => onSelectArticle(dieselArticle)}
                        className="retro-link text-sm font-bold font-headline leading-tight block mb-1"
                      >
                        {dieselArticle.title}
                      </h4>
                      <p className="text-xs text-black">
                        {dieselArticle.summary}
                      </p>
                    </article>
                  )}

                  {usIntelArticle && (
                    <article className="border border-gray-400 p-2 bg-gray-50">
                      <span className="font-typewriter text-[10px] text-gray-600 block mb-0.5">
                        INTELLIGENCE APPARATUS
                      </span>
                      <h4
                        onClick={() => onSelectArticle(usIntelArticle)}
                        className="retro-link text-sm font-bold font-headline leading-tight block mb-1"
                      >
                        {usIntelArticle.title}
                      </h4>
                      <p className="text-xs text-black">
                        {usIntelArticle.summary}
                      </p>
                    </article>
                  )}
                </div>

                {/* The Evening Briefing 90s RealAudio Banner */}
                {eveningBriefingArticle && (
                  <article
                    onClick={() => onSelectArticle(eveningBriefingArticle)}
                    className="win95-raised p-2.5 mt-3 cursor-pointer bg-[#e0e0e0] border border-black flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="bg-[#ff0000] text-white font-pixel text-xs px-1 font-bold">
                          REALAUDIO 3.0
                        </span>
                        <span className="font-bold text-xs">The Evening Briefing</span>
                      </div>
                      <h4 className="retro-link font-bold text-sm">
                        {eveningBriefingArticle.title}
                      </h4>
                      <p className="text-xs text-gray-700 line-clamp-1">
                        {eveningBriefingArticle.summary}
                      </p>
                    </div>
                    <button className="win95-btn px-2 py-1 shrink-0 flex items-center gap-1 text-xs font-bold text-[#000080]">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play (14.4k)</span>
                    </button>
                  </article>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: CyberTimes, Opinion & Elections (3 cols)   */}
        {/* ======================================================== */}
        <section aria-label="CyberTimes and Opinions" className="lg:col-span-3 space-y-3">
          {/* Election '96 / 2026 Box */}
          {texasSenateArticle && (
            <div className="win95-raised p-1">
              <div className="win95-titlebar mb-1">
                <span>Elections '96/2026 Polls</span>
                <span className="text-[10px] font-mono">[CAMPAIGN]</span>
              </div>
              <div className="bg-white p-3 border border-black">
                <span className="bg-[#000080] text-white font-pixel text-xs px-1 font-bold inline-block mb-1">
                  BATTLEGROUND POLLING
                </span>
                <h3
                  onClick={() => onSelectArticle(texasSenateArticle)}
                  className="retro-link text-base font-bold font-headline leading-tight block mb-1"
                >
                  {texasSenateArticle.title}
                </h3>
                <p className="text-xs text-black mb-2">
                  {texasSenateArticle.summary}
                </p>
                {texasSenateArticle.highlightBullets && (
                  <div className="border-t border-gray-300 pt-1 text-xs space-y-1">
                    {texasSenateArticle.highlightBullets.map((item, idx) => (
                      <div key={idx} className="leading-snug">
                        • <b>{item.boldPrefix}</b> {item.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CyberTimes Tech Section (Authentic NYT 1996 title!) */}
          {aiDinnerArticle && (
            <div className="win95-raised p-1">
              <div className="win95-titlebar mb-1 bg-gradient-to-r from-[#008080] to-[#000080]">
                <span>CyberTimes · Digital Culture</span>
                <span className="text-[10px] font-mono">[TECH]</span>
              </div>
              <div className="bg-white p-3 border border-black space-y-2">
                <div className="font-pixel text-xs text-green-800 font-bold">
                  INTERNET & ARTIFICIAL REASONING
                </div>
                <h3
                  onClick={() => onSelectArticle(aiDinnerArticle)}
                  className="retro-link text-sm font-bold font-headline leading-tight block"
                >
                  {aiDinnerArticle.title}
                </h3>
                <p className="text-xs text-black">
                  {aiDinnerArticle.summary}
                </p>
                <div className="text-[10px] font-typewriter text-gray-500 flex justify-between pt-1 border-t border-gray-200">
                  <span>By {aiDinnerArticle.byline}</span>
                  <span>210 comments</span>
                </div>
                {anthropicArticle && (
                  <div
                    onClick={() => onSelectArticle(anthropicArticle)}
                    className="p-1.5 bg-gray-100 border border-gray-300 cursor-pointer"
                  >
                    <span className="retro-link text-xs font-bold block">
                      {anthropicArticle.title}
                    </span>
                    <span className="text-[10px] text-gray-500 font-typewriter">
                      Financials · 3 min read
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Editorial & Forum Column */}
          <div className="win95-raised p-1">
            <div className="win95-titlebar mb-1">
              <span>Forum & Opinion Columnists</span>
              <button
                onClick={() => onOpenSection('Opinion')}
                className="text-[10px] text-yellow-300 hover:underline"
              >
                Index ›
              </button>
            </div>
            <div className="bg-white p-2.5 border border-black space-y-3">
              {/* Columnist 1 */}
              {opinion1 && (
                <div
                  onClick={() => onSelectArticle(opinion1)}
                  className="flex gap-2 border-b border-gray-300 pb-2 cursor-pointer"
                >
                  <div className="win95-sunken w-8 h-8 bg-black text-green-400 font-pixel text-sm flex items-center justify-center shrink-0">
                    DW
                  </div>
                  <div>
                    <span className="font-bold text-xs text-black block">
                      {opinion1.byline}
                    </span>
                    <h4 className="retro-link text-xs font-bold leading-tight">
                      {opinion1.title}
                    </h4>
                  </div>
                </div>
              )}

              {/* Columnist 2 */}
              {opinion2 && (
                <div
                  onClick={() => onSelectArticle(opinion2)}
                  className="flex gap-2 border-b border-gray-300 pb-2 cursor-pointer"
                >
                  <div className="win95-sunken w-8 h-8 bg-black text-cyan-400 font-pixel text-sm flex items-center justify-center shrink-0">
                    CL
                  </div>
                  <div>
                    <span className="font-bold text-xs text-black block">
                      {opinion2.byline}
                    </span>
                    <h4 className="retro-link text-xs font-bold leading-tight">
                      {opinion2.title}
                    </h4>
                  </div>
                </div>
              )}

              {/* Columnist 3 */}
              {opinion3 && (
                <div
                  onClick={() => onSelectArticle(opinion3)}
                  className="flex gap-2 cursor-pointer"
                >
                  <div className="win95-sunken w-8 h-8 bg-black text-yellow-400 font-pixel text-sm flex items-center justify-center shrink-0">
                    HK
                  </div>
                  <div>
                    <span className="font-bold text-xs text-black block">
                      {opinion3.byline} (Guest)
                    </span>
                    <h4 className="retro-link text-xs font-bold leading-tight">
                      {opinion3.title}
                    </h4>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Health & Science */}
          {popeLeoArticle && (
            <div className="win95-raised p-1">
              <div className="win95-titlebar mb-1">
                <span>Science Times</span>
                <span className="text-[10px] font-mono">[MEDICINE]</span>
              </div>
              <div className="bg-white p-2.5 border border-black">
                <h4
                  onClick={() => onSelectArticle(popeLeoArticle)}
                  className="retro-link text-xs font-bold block mb-1"
                >
                  {popeLeoArticle.title}
                </h4>
                <p className="text-[11px] text-black">
                  {popeLeoArticle.summary}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
