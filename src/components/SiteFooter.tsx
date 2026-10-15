import React from 'react';
import { NewsSection } from '../types/news';

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
      className="border-t-2 border-black max-w-[1340px] mx-auto px-4 py-8 font-nyt-sans text-[12px] text-neutral-600"
      data-purpose="global-footer"
    >
      {/* Footer Brand & Category Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-nyt gap-4">
        <span className="font-masthead text-2xl text-black">The New York Times</span>
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          {['NEWS', 'OPINION', 'ARTS', 'LIVING', 'LISTINGS & MORE'].map((item) => (
            <button
              key={item}
              onClick={() => onSelectSection(item === 'NEWS' ? 'U.S.' : item === 'OPINION' ? 'Opinion' : item === 'ARTS' ? 'Arts' : 'Lifestyle')}
              className="text-black hover:underline cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-column Sitemap Index */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 py-6 border-b border-nyt">
        <div>
          <h5 className="font-bold text-black uppercase text-[10px] tracking-wider mb-2">
            News
          </h5>
          <ul className="space-y-1 text-[11px]">
            {['Home Page', 'U.S.', 'World', 'Politics', 'New York', 'Education', 'Health'].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => onSelectSection(item === 'Home Page' ? 'All' : item)}
                    className="hover:underline text-neutral-600 hover:text-black"
                  >
                    {item}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-black uppercase text-[10px] tracking-wider mb-2">
            Opinion
          </h5>
          <ul className="space-y-1 text-[11px]">
            {['Today\'s Opinion', 'Columnists', 'Editorials', 'Guest Essays', 'Letters', 'Sunday Opinion'].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => onSelectSection('Opinion')}
                    className="hover:underline text-neutral-600 hover:text-black"
                  >
                    {item}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-black uppercase text-[10px] tracking-wider mb-2">
            Arts
          </h5>
          <ul className="space-y-1 text-[11px]">
            {['Today\'s Arts', 'Books', 'Best Sellers', 'Dance', 'Movies', 'Music', 'Television'].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => onSelectSection('Arts')}
                    className="hover:underline text-neutral-600 hover:text-black"
                  >
                    {item}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-black uppercase text-[10px] tracking-wider mb-2">
            Living
          </h5>
          <ul className="space-y-1 text-[11px]">
            {['Style', 'Food', 'Well', 'Travel', 'Love', 'Real Estate', 'T Magazine'].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => onSelectSection('Lifestyle')}
                    className="hover:underline text-neutral-600 hover:text-black"
                  >
                    {item}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-black uppercase text-[10px] tracking-wider mb-2">
            More
          </h5>
          <ul className="space-y-1 text-[11px]">
            <li>
              <button
                onClick={() => onSelectSection('Cooking')}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Cooking
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectSection('Wirecutter')}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Wirecutter
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectSection('The Athletic')}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                The Athletic
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenGames()}
                className="hover:underline text-neutral-600 hover:text-black font-semibold"
              >
                Games
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectSection('Audio')}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Podcasts & Audio
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectSection('Video')}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Video
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-black uppercase text-[10px] tracking-wider mb-2">
            Subscribe
          </h5>
          <ul className="space-y-1 text-[11px]">
            <li>
              <button
                onClick={onOpenSubscribe}
                className="hover:underline font-semibold text-black"
              >
                ★ Home Delivery
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSubscribe}
                className="hover:underline font-semibold text-black"
              >
                ★ Digital Subscriptions
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSubscribe}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Games Subscription
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSubscribe}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Cooking Subscription
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSubscribe}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Email Newsletters
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSubscribe}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Corporate Subscriptions
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSubscribe}
                className="hover:underline text-neutral-600 hover:text-black"
              >
                Education Rate
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="pt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-neutral-500">
        <span>© 2026 The New York Times Company</span>
        <button onClick={() => alert('The New York Times Company - Established 1851.')} className="hover:underline">NYTCo</button>
        <button onClick={() => alert('Editorial Contact: news-desk@nytimes.com')} className="hover:underline">Contact Us</button>
        <button onClick={() => alert('Accessibility statement: NYT is committed to accessible journalism.')} className="hover:underline">Accessibility</button>
        <button onClick={() => alert('Careers at The New York Times.')} className="hover:underline">Work with us</button>
        <button onClick={() => alert('Advertising rates and sponsorship inquiries.')} className="hover:underline">Advertise</button>
        <button onClick={() => alert('T Brand Studio content studio.')} className="hover:underline">T Brand Studio</button>
        <button onClick={() => alert('Your Privacy Choices settings.')} className="hover:underline">Your Privacy Choices</button>
        <button onClick={() => alert('Privacy Policy.')} className="hover:underline">Privacy Policy</button>
        <button onClick={() => alert('Terms of Service.')} className="hover:underline">Terms of Service</button>
        <button onClick={() => alert('Full Site Map.')} className="hover:underline">Site Map</button>
      </div>
    </footer>
  );
};
