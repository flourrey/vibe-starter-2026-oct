export type NewsSection =
  | 'U.S.'
  | 'World'
  | 'Business'
  | 'Arts'
  | 'Lifestyle'
  | 'Opinion'
  | 'Audio'
  | 'Games'
  | 'Cooking'
  | 'Wirecutter'
  | 'The Athletic';

export interface CommentItem {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  content: string;
  upvotes: number;
  isEditorPick?: boolean;
}

export interface RelatedItem {
  id?: string;
  title: string;
  description?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string[];
  byline: string;
  authorRole?: string;
  date: string;
  readTime: string;
  section: NewsSection;
  kicker?: string;
  badge?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  commentsCount: number;
  comments: CommentItem[];
  isHero?: boolean;
  highlightBullets?: { boldPrefix: string; text: string }[];
  subLinks?: string[];
  columnistAvatar?: string;
  isOpinion?: boolean;
  edition?: 'US' | 'International' | 'Canada' | 'Espanol' | 'Chinese';
}

export type ReadingTheme = 'standard' | 'paper' | 'dark';
