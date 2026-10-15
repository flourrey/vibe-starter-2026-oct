import { Article } from '../types/news';

export const ARTICLES: Article[] = [
  // 1. Center Hero Story
  {
    id: 'ukraine-exposure-satellite-russia',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    summary:
      'A huge missile attack cut power to 600,000 residents in Kyiv, and a Pentagon-funded satellite internet program appeared to be curbed without warning, complicating frontline defenses.',
    byline: 'Andrew E. Kramer and Eric Schmitt',
    authorRole: 'Reporting from Kyiv and Washington',
    date: 'Wednesday, October 14, 2026',
    readTime: '7 min read',
    section: 'World',
    kicker: 'Frontline Crisis',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Evgeniy Maloletka/Associated Press',
    imageCaption: 'Substation damages in northeastern Ukraine',
    commentsCount: 1142,
    isHero: true,
    highlightBullets: [
      {
        boldPrefix: 'Wins for Putin:',
        text: 'Why shifting battleground supply lines have emboldened Moscow.',
      },
      {
        boldPrefix: 'Russian Oil Deal:',
        text: 'Gulf brokers assess the diplomatic price tag of crude flows.',
      },
      {
        boldPrefix: 'Escalating Assaults:',
        text: 'Drone waves overwhelm air defense cordons in Kharkiv.',
      },
    ],
    content: [
      'KYIV, Ukraine — A coordinated barrage of ballistic missiles and modified heavy strike drones pummeled critical energy hubs across northern and eastern Ukraine before dawn on Wednesday, disabling high-voltage transmission lines and leaving roughly 600,000 homes in the greater metropolitan capital without electricity.',
      'The devastation was compounded along the 600-mile defensive perimeter when command outposts discovered that commercial satellite constellations providing reconnaissance coordinates and tactical fire-direction links had abruptly begun rejecting broadband uplinks.',
      'According to two senior defense officials in Washington who spoke on condition of anonymity, the restrictions were tied to sudden fiscal reviews within the Pentagon’s overseas contracted telecommunications branch. But on the ground in the Donbas salient, commanders described the outcome as near catastrophic for artillery crews relying on instant target verification.',
      '“We were forced to transition to line-of-sight VHF radios within minutes while Russian motorized columns pressed three separate axes toward Pokrovsk,” said Col. Oleksandr Hrytsenko, commander of an independent mechanised brigade deployed near the reservoir basin. “The latency difference between low-Earth orbit transceivers and legacy field relays is measured directly in soldier casualties.”',
      'In Moscow, military commentators claimed that the strikes targeted switching yards suspected of routing auxiliary generator power to domestic drone assembly facilities. Independent satellite imagery reviewed by weapons analysts in London confirmed significant thermal signatures at three primary substations surrounding Brovary and Boryspil.',
      'European defense ministers, convening an emergency coordination session in Brussels, pledged expedited shipments of mobile substation transformers and containerized diesel generator banks. However, diplomatic representatives acknowledged that physical electrical infrastructure cannot be shielded indefinitely without dramatic increases in Patriot PAC-3 and NASAMS interceptor stockpiles.',
      'As night fell over Kyiv, municipal transit authorities shuttered subway stations to conserve residual grid reserves, turning cavernous subterranean marble concourses into impromptu bomb shelters for tens of thousands of shivering civilians.',
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Eleanor Vance',
        location: 'Vienna, VA',
        timeAgo: '1 hour ago',
        content:
          'Cutting off or restricting tactical communications in the middle of an offensive is unconscionable. The strategic ambiguity coming out of Washington is paralyzing our allies.',
        upvotes: 412,
        isEditorPick: true,
      },
      {
        id: 'c-2',
        author: 'Marcus J. Cole',
        location: 'Oxford, UK',
        timeAgo: '2 hours ago',
        content:
          'Satellite redundancy must become public infrastructure rather than relying on private contractor contracts that can be renegotiated or throttled during active hostilities.',
        upvotes: 289,
        isEditorPick: true,
      },
      {
        id: 'c-3',
        author: 'Sarah Jenkins',
        location: 'Seattle, WA',
        timeAgo: '3 hours ago',
        content:
          'The resilience of Ukrainian utility crews working under artillery fire to restore power in sub-zero temperatures is nothing short of heroic.',
        upvotes: 194,
      },
    ],
  },

  // 2. Left Column - Top Story: High-Ranking Women
  {
    id: 'high-ranking-women-trump-admin',
    title: 'High-Ranking Women Are Leaving the Trump Administration',
    summary:
      'In the president’s second term, those heading for the exits are female officials who had built long-standing ties to the Republican base.',
    byline: 'Tierney L. Cross/The New York Times',
    authorRole: 'Congressional & Executive Correspondent',
    date: 'Wednesday, October 14, 2026',
    readTime: '5 min read',
    section: 'U.S.',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
    commentsCount: 684,
    content: [
      'WASHINGTON — A wave of high-profile departures from senior domestic and national security advisory posts in recent weeks has left the West Wing with noticeably fewer women among its inner circle of policymakers.',
      'Interviews with half a dozen current and former aides reveal that the departures reflect a growing divergence between long-time institutional conservatives and a newly ascendant faction of hyper-loyalist strategists.',
      'Many of the departing officials had been credited by Capitol Hill lawmakers with maintaining orderly liaisons between executive agency heads and congressional committees during fraught budget negotiations.',
      '“What we are seeing is not just personnel turnover, but a generational shift in who holds sway in executive policy circles,” said a senior policy fellow at the American Enterprise Institute.',
    ],
    comments: [
      {
        id: 'c-hr-1',
        author: 'Danielle Brooks',
        location: 'Chicago, IL',
        timeAgo: '4 hours ago',
        content:
          'This trend highlights how the administrative core is evolving in the second term. The loss of institutional memory on Capitol Hill will be felt.',
        upvotes: 142,
      },
    ],
  },

  // 3. Left Column - Story 2: Kimberly Guilfoyle
  {
    id: 'steep-rise-sudden-fall-kimberly-guilfoyle',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    summary:
      'A turbulent stretch in Athens ends an ambassadorial posting before confirmation hearings even commenced.',
    byline: 'Maggie Haberman and Jonathan Swan',
    authorRole: 'Political Correspondents',
    date: 'Wednesday, October 14, 2026',
    readTime: '6 min read',
    section: 'U.S.',
    commentsCount: 519,
    content: [
      'WASHINGTON — When Kimberly Guilfoyle was tapped for an ambassadorship to Greece, allies hailed the choice as an unmistakable nod to one of the campaign’s fiercest fundraisers and television surrogates.',
      'Yet within barely four weeks of informal consultations in Athens, diplomatic cables and leaked memos revealed deep rifts between the nominee’s private advance team and senior Foreign Service officers stationed at the embassy compound.',
      'The nomination was quietly rescinded Tuesday evening before the Senate Foreign Relations Committee could formally schedule a public vetting session, closing one of the swiftest reversals of an overseas appointment this cycle.',
    ],
    comments: [
      {
        id: 'c-kg-1',
        author: 'Robert Sterling',
        location: 'Boston, MA',
        timeAgo: '3 hours ago',
        content:
          'Diplomatic posts require delicate statecraft, especially in NATO southern flank nations. This outcome was predictable.',
        upvotes: 95,
      },
    ],
  },

  // 4. Left Column - Story 3: Katie Zacharia
  {
    id: 'trumps-new-press-secretary-not-quite-attorney',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    summary:
      'Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding.',
    byline: 'Michael M. Grynbaum',
    authorRole: 'Media Correspondent',
    date: 'Wednesday, October 14, 2026',
    readTime: '4 min read',
    section: 'U.S.',
    commentsCount: 341,
    content: [
      'WASHINGTON — When introduced to reporters on Monday in the James S. Brady Briefing Room, Katie Zacharia was repeatedly described as a "veteran courtroom advocate and appellate litigator."',
      'Public records with state bar associations, however, showed no active or past licensure in the jurisdictions where she claimed to have argued key constitutional challenges.',
      'In an interview, Ms. Zacharia clarified that she held an executive jurisprudence diploma and had participated extensively in moot arbitration, insisting she never meant to mislead the public.',
    ],
    comments: [],
  },

  // 5. Left Column - Campus Inquiry: Cornell's President
  {
    id: 'cornells-president-grilled-by-faculty-senate',
    title: 'Cornell’s President Is Grilled by Faculty Senate Over Handling of Allegations',
    summary:
      'Michael Kotlikoff faces a vote of no confidence following investigations into student conduct and fraternity oversight.',
    byline: 'Stephanie Saul',
    authorRole: 'Higher Education Reporter',
    date: 'Wednesday, October 14, 2026',
    readTime: '5 min read',
    section: 'U.S.',
    kicker: 'Campus Inquiry',
    commentsCount: 288,
    subLinks: [
      'Fraternity Parties Banned Pending Case',
      'Timeline of the Jane Doe Investigation',
      'How Universities Have Responded in Crisis',
    ],
    content: [
      'ITHACA, N.Y. — An emergency assembly of the Cornell University Faculty Senate grew contentious on Tuesday as professors pressed interim president Michael Kotlikoff on why disciplinary suspensions against fraternity chapters were delayed for nearly six months.',
      'Several department chairs indicated they would introduce a resolution of no confidence later this month, arguing that university leadership has prioritized public relations over student welfare.',
    ],
    comments: [],
  },

  // 6. Center Sub-lead 1: Trump Diesel Deal
  {
    id: 'trump-diesel-deal-putin-gas-prices',
    title: 'Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices',
    summary:
      'Refinery capacity bottlenecks and international tariff exemptions limit any rapid relief at retail gas pumps.',
    byline: 'Clifford Krauss',
    authorRole: 'Energy Reporter',
    date: 'Wednesday, October 14, 2026',
    readTime: '4 min read',
    section: 'Business',
    commentsCount: 178,
    content: [
      'HOUSTON — While the White House announced a memorandum aimed at facilitating bilateral petroleum distillation exchanges, commodity analysts caution that domestic fuel prices will remain elevated through winter.',
      'The constraint is not global crude supply, but rather Gulf Coast hydrocracker throughput and regional desulfurization unit limits that cannot easily process heavy Russian sour crude.',
    ],
    comments: [],
  },

  // 7. Center Sub-lead 2: US Intel Ukraine
  {
    id: 'us-continues-provide-intelligence-ukraine',
    title: 'The U.S. Continues to Provide Intelligence to Ukraine, Officials Say',
    summary:
      'Despite public friction, encrypted surveillance feeds and early-warning satellite targeting persist uninterrupted.',
    byline: 'Julian E. Barnes and Helene Cooper',
    authorRole: 'National Security Reporters',
    date: 'Wednesday, October 14, 2026',
    readTime: '3 min read',
    section: 'World',
    commentsCount: 215,
    content: [
      'WASHINGTON — Behind the diplomatic disputes over funding ceilings and communications bandwidth, real-time intelligence sharing between the Defense Intelligence Agency and Ukrainian military commands remains operational 24 hours a day.',
      'According to senior military planners, American airborne warning and control aircraft operating over Poland and the Black Sea continue to pipe radar tracks directly to Ukrainian air defense batteries.',
    ],
    comments: [],
  },

  // 8. The Evening Briefing
  {
    id: 'evening-briefing-catch-up-biggest-stories',
    title: 'Catch Up on Today’s Biggest Stories',
    summary:
      'Energy prices lift inflation, Ukraine grows more vulnerable, and the Texas Senate race enters a critical new polling sprint.',
    byline: 'Matthew Rosenberg',
    authorRole: 'Senior Correspondent',
    date: 'Wednesday, October 14, 2026',
    readTime: '5 min read',
    section: 'U.S.',
    kicker: 'The Evening Briefing',
    commentsCount: 94,
    content: [
      'Good evening. Here’s the latest:',
      '• Ukraine’s defense grid reels from targeted infrastructure strikes as low-Earth orbit telecommunications contract lapses complicate forward defense line coordination.',
      '• Inflation ticked slightly higher in September, driven almost entirely by diesel transportation surcharges and autumn heating oil restocking.',
      '• With less than three weeks until election day, national campaign committees are pouring unprecedented funding reserves into Texas and Georgia.',
    ],
    comments: [],
  },

  // 9. Right Column - Election Dispatches: Texas Senate Race
  {
    id: 'texas-senate-race-tightens-talarico-edge',
    title: 'Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge',
    summary:
      'A blitz of $10 billion in late ad spending nationwide shakes up key battlegrounds in Georgia and Texas.',
    byline: 'Nate Cohn and Reid J. Epstein',
    authorRole: 'Chief Political Analysts',
    date: 'Wednesday, October 14, 2026',
    readTime: '5 min read',
    section: 'U.S.',
    kicker: 'Election Dispatches',
    badge: '2026 Polls',
    commentsCount: 840,
    highlightBullets: [
      {
        boldPrefix: 'Debate Checks:',
        text: 'Scrutinizing clashes in Maine, Georgia, and Michigan.',
      },
      {
        boldPrefix: 'Democratic Megadonor:',
        text: 'Unprecedented late wave fuels red-state blitz.',
      },
    ],
    content: [
      'AUSTIN, Texas — In what has rapidly evolved into the most expensive Senate contest in American history, James Talarico holds a narrow two-point lead over his Republican challenger, according to a new New York Times/Siena College poll.',
      'Suburban voters in Williamson, Fort Bend, and Collin counties have shifted toward the center, energized by debates over public education funding and property tax relief.',
      '“What we are witnessing in Texas is the culmination of a decade of demographic momentum intersecting with an unusually polarized national mood,” said a lead pollster for the project.',
    ],
    comments: [],
  },

  // 10. Right Column - Tech: AI Agents Dinner Party
  {
    id: 'ai-agents-dinner-party-conversation',
    title: 'What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party',
    summary:
      'As autonomous bots proliferate, we glimpse how these digital assistants converse with one another away from our gaze.',
    byline: 'Cade Metz',
    authorRole: 'Technology Reporter',
    date: 'Wednesday, October 14, 2026',
    readTime: '6 min read',
    section: 'Business',
    kicker: 'Artificial Intelligence',
    badge: 'Tech Focus',
    commentsCount: 210,
    subLinks: ['Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter'],
    content: [
      'SAN FRANCISCO — In a loft in the Mission District on Saturday, eight tech executives sat down for dinner and placed their personal autonomous agents into peer-to-peer negotiation mode.',
      'While the human guests debated housing zoning and wine vintages, their devices executed over 4,000 asynchronous micro-negotiations: cross-referencing calendar availabilities for the next quarter, synchronizing shared contact books, and bartering encrypted cloud compute credits.',
      'The transcripts, later analyzed by computer scientists at Stanford, showed surprising emergent linguistic compression, with agents substituting lengthy protocol handshakes for dense tokenized shorthand.',
    ],
    comments: [],
  },

  // 11. Right Column - Anthropic Story
  {
    id: 'anthropic-revenue-jumped-third-quarter',
    title: 'Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter',
    summary:
      'Enterprise subscriptions and multimodal reasoning models accelerate enterprise adoption beyond software coding.',
    byline: 'Mike Isaac',
    authorRole: 'Silicon Valley Reporter',
    date: 'Wednesday, October 14, 2026',
    readTime: '3 min read',
    section: 'Business',
    commentsCount: 167,
    content: [
      'SAN FRANCISCO — Artificial intelligence developer Anthropic disclosed quarterly revenue exceeding $16.8 billion, representing a 45 percent sequential leap driven primarily by Fortune 500 workflow integration contracts.',
      'The figures reflect surging corporate appetite for agentic reasoning architectures capable of operating independently across complex legacy databases.',
    ],
    comments: [],
  },

  // 12. Right Column - Opinion 1: David Wallace-Wells
  {
    id: 'opinion-david-wallace-wells-democrats-message',
    title: 'Democrats Shouldn’t Wait Two More Years to Remake Their Message',
    summary:
      'The complacency that plagues mid-cycle strategy must yield to immediate economic clarity for working households.',
    byline: 'David Wallace-Wells',
    authorRole: 'Opinion Columnist',
    date: 'Wednesday, October 14, 2026',
    readTime: '4 min read',
    section: 'Opinion',
    isOpinion: true,
    commentsCount: 390,
    columnistAvatar: 'DW',
    content: [
      'It is a perennial temptation in American politics to treat mid-term election cycles as mere dress rehearsals for the quadrennial spectacle of presidential campaigns.',
      'Yet across kitchen tables in the Midwest and Sun Belt, the anxieties that voters express are immediate, visceral, and unyielding: utility bills that climb each quarter, childcare stipends that expire, and healthcare deductibles that outpace modest wage growth.',
      'Waiting until candidate debates in 2028 to articulate a coherent theory of industrial renewal and cost-of-living remediation is not prudence; it is political abdication.',
    ],
    comments: [],
  },

  // 13. Right Column - Opinion 2: Carlos Lozada
  {
    id: 'opinion-carlos-lozada-manifesto-to-end-manifestoes',
    title: 'A Manifesto to End All Manifestoes: What the Tech Texts Reveal',
    summary:
      'The techno-optimist literature reveals less about our mechanical future than about our enduring hunger for secular prophecy.',
    byline: 'Carlos Lozada',
    authorRole: 'Opinion Columnist',
    date: 'Wednesday, October 14, 2026',
    readTime: '5 min read',
    section: 'Opinion',
    isOpinion: true,
    commentsCount: 69,
    columnistAvatar: 'CL',
    content: [
      'To read the collected tracts and manifestos of contemporary Silicon Valley founders is to encounter a curious blend of engineering hubris and apocalyptic eschatology.',
      'Every white paper promises redemption through optimization; every keynote delivers a scripture of disruption. Yet when stripped of their algorithmic rhetoric, these declarations repeat age-old promises of utopian engineering.',
    ],
    comments: [],
  },

  // 14. Right Column - Opinion 3: Heather Kerr
  {
    id: 'opinion-heather-kerr-ebola-rural-clinics',
    title: 'I’ve Never Seen Ebola Spread Quite Like This in Rural Clinics',
    summary:
      'Frontline health workers face supply exhaustion as regional containment borders struggle to halt novel variant clusters.',
    byline: 'Heather Kerr',
    authorRole: 'Guest Essay',
    date: 'Wednesday, October 14, 2026',
    readTime: '5 min read',
    section: 'Opinion',
    isOpinion: true,
    commentsCount: 148,
    columnistAvatar: 'HK',
    content: [
      'GOMA, Democratic Republic of Congo — In my twenty-two years coordinating emergency epidemiology teams in central Africa, I have never witnessed a viral resurgence outpace local quarantine cordons with such velocity.',
      'The issue is not medical ignorance; local clinic staff know exactly how to manage barrier nursing. The issue is a chronic lack of basic personal protective gear and refrigeration generators for therapeutic monoclonal antibody vials.',
    ],
    comments: [],
  },

  // 15. Right Column - Health & Science: Pope Leo
  {
    id: 'health-science-lung-cancer-therapy-pope-leo',
    title: 'A New World of Lung Cancer Therapy Awaits Pope Leo',
    summary:
      'Targeted molecular treatments give clinicians options that were virtually nonexistent a generation ago.',
    byline: 'Benjamin Mueller and Gina Kolata',
    authorRole: 'Health & Science Correspondents',
    date: 'Wednesday, October 14, 2026',
    readTime: '4 min read',
    section: 'Lifestyle',
    kicker: 'Health & Science',
    commentsCount: 126,
    content: [
      'VATICAN CITY — As the Vatican disclosed that Pope Leo had been diagnosed with early-stage non-small cell adenocarcinoma, oncology specialists worldwide noted that recent breakthroughs in tyrosine kinase inhibitors and antibody-drug conjugates have profoundly altered the prognosis for such diagnoses.',
      'Rather than relying exclusively on systemic cytotoxic chemotherapy, medical teams can now deploy genomic sequencing to pinpoint driver mutations within 48 hours, tailoring oral regimens that preserve cognitive acuity and daily activity.',
    ],
    comments: [],
  },
];
