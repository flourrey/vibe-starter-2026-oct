import React from 'react';

interface SiteFooterProps {
  onSelectSection: (section: string) => void;
  onOpenSubscribe: () => void;
  onOpenGames: (gameKey?: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onSelectSection,
  onOpenSubscribe,
  onOpenGames,
}) => {
  return (
    <footer
      className="border-t border-black/[0.08] bg-[#f5f5f7] text-neutral-500 text-xs font-nyt-sans py-12"
      data-purpose="global-footer"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        {/* Brand & Editorial Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-black/[0.06] gap-4">
          <div className="flex items-center gap-3">
            <span className="font-masthead text-2xl text-black">The New York Times</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 bg-white px-2 py-0.5 rounded-full border border-black/10">
              Apple News+ Channel
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            {['News', 'Opinion', 'Arts', 'Living', 'Listings & More'].map((item) => (
              <button
                key={item}
                onClick={() =>
                  onSelectSection(
                    item === 'News' ? 'U.S.' : item === 'Opinion' ? 'Opinion' : item === 'Arts' ? 'Arts' : 'Lifestyle'
                  )
                }
                className="text-neutral-700 hover:text-black transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-column Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 py-8 border-b border-black/[0.06]">
          <div>
            <h5 className="font-semibold text-neutral-900 mb-2.5">News</h5>
            <ul className="space-y-1.5 text-neutral-600">
              {['Home Page', 'U.S.', 'World', 'Politics', 'New York', 'Education', 'Health'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => onSelectSection(item === 'Home Page' ? 'All' : item)}
                      className="hover:text-black hover:underline transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-neutral-900 mb-2.5">Opinion</h5>
            <ul className="space-y-1.5 text-neutral-600">
              {['Today\'s Opinion', 'Columnists', 'Editorials', 'Guest Essays', 'Letters', 'Sunday Opinion'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => onSelectSection('Opinion')}
                      className="hover:text-black hover:underline transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-neutral-900 mb-2.5">Arts</h5>
            <ul className="space-y-1.5 text-neutral-600">
              {['Today\'s Arts', 'Books', 'Best Sellers', 'Dance', 'Movies', 'Music', 'Television'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => onSelectSection('Arts')}
                      className="hover:text-black hover:underline transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-neutral-900 mb-2.5">Living</h5>
            <ul className="space-y-1.5 text-neutral-600">
              {['Style', 'Food', 'Well', 'Travel', 'Love', 'Real Estate', 'T Magazine'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => onSelectSection('Lifestyle')}
                      className="hover:text-black hover:underline transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-neutral-900 mb-2.5">Puzzles & More</h5>
            <ul className="space-y-1.5 text-neutral-600">
              <li>
                <button
                  onClick={() => onOpenGames('wordle')}
                  className="hover:text-black hover:underline font-semibold text-[#0071e3]"
                >
                  Apple Puzzles (Wordle)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('Cooking')}
                  className="hover:text-black hover:underline"
                >
                  Cooking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('Wirecutter')}
                  className="hover:text-black hover:underline"
                >
                  Wirecutter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('The Athletic')}
                  className="hover:text-black hover:underline"
                >
                  The Athletic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('Audio')}
                  className="hover:text-black hover:underline"
                >
                  Podcasts & Audio
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-neutral-900 mb-2.5">Subscription</h5>
            <ul className="space-y-1.5 text-neutral-600">
              <li>
                <button
                  onClick={onOpenSubscribe}
                  className="hover:text-[#0071e3] font-semibold text-neutral-900"
                >
                  Apple News+ Access
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubscribe}
                  className="hover:text-[#0071e3]"
                >
                  Digital Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubscribe}
                  className="hover:text-[#0071e3]"
                >
                  Games Subscription
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubscribe}
                  className="hover:text-[#0071e3]"
                >
                  Corporate Accounts
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Apple style Copyright Note */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <div>
            Copyright © 2026 The New York Times Company. Reimagined with Apple design language.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Use</span>
            <span className="hover:underline cursor-pointer">Sales Policy</span>
            <span className="hover:underline cursor-pointer">Legal</span>
            <span className="hover:underline cursor-pointer">Site Map</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
