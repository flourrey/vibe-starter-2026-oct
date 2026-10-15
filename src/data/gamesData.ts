export interface ConnectionsGroup {
  category: string;
  level: 1 | 2 | 3 | 4; // 1: Yellow (Easy), 2: Green (Medium), 3: Blue (Hard), 4: Purple (Tricky)
  words: string[];
}

export const CONNECTIONS_DATA: ConnectionsGroup[] = [
  {
    category: 'NEWSPAPER SECTIONS',
    level: 1,
    words: ['OPINION', 'SPORTS', 'METRO', 'STYLE'],
  },
  {
    category: 'JOURNALISM ACTIONS',
    level: 2,
    words: ['SCOOP', 'LEAK', 'COVER', 'PRINT'],
  },
  {
    category: 'THINGS WITH HEADINGS',
    level: 3,
    words: ['ARTICLES', 'CHAPTERS', 'LETTERS', 'SPEECHES'],
  },
  {
    category: '___ TIMES',
    level: 4,
    words: ['FINANCIAL', 'MODERN', 'GOOD', 'PRIME'],
  },
];

export const WORDLE_SOLUTION = 'TIMES';
export const WORDLE_VALID_WORDS = [
  'TIMES', 'PRESS', 'PAPER', 'STORY', 'MEDIA', 'PRINT', 'DAILY', 'NEWSY',
  'COVER', 'FRONT', 'TITLE', 'DISPATCH', 'REPORT', 'WRITE', 'VOICE', 'FACTS',
  'TRUTH', 'WORDS', 'LEADS', 'TOPIC', 'ISSUE', 'BYTES', 'SHARE', 'PHOTO',
  'ALONG', 'GREAT', 'LIGHT', 'NIGHT', 'WHITE', 'BLACK', 'SMART', 'HOUSE'
];

export interface MiniCrosswordCell {
  row: number;
  col: number;
  solution: string;
  number?: number;
  isBlack?: boolean;
}

export interface MiniClue {
  number: number;
  clue: string;
  direction: 'across' | 'down';
  answer: string;
}

export const MINI_CLUES: MiniClue[] = [
  { number: 1, direction: 'across', clue: 'Headline-heavy daily publication', answer: 'TIMES' },
  { number: 6, direction: 'across', clue: 'Journalistic investigation or account', answer: 'STORY' },
  { number: 7, direction: 'across', clue: 'What printers use to press ink', answer: 'PLATE' },
  { number: 8, direction: 'across', clue: 'Looked at words in print', answer: 'READS' },
  { number: 9, direction: 'across', clue: 'Press workers or journalists', answer: 'PRESS' },

  { number: 1, direction: 'down', clue: 'Top stories or primary themes', answer: 'TOPIC' },
  { number: 2, direction: 'down', clue: 'Digital letter or dispatch', answer: 'EMAIL' },
  { number: 3, direction: 'down', clue: 'What editors do with manuscripts', answer: 'ALTER' },
  { number: 4, direction: 'down', clue: 'Front-page news or breaking bulletin', answer: 'ITEMS' },
  { number: 5, direction: 'down', clue: 'Journalist’s handwritten notebook item', answer: 'STENO' },
];

export const SPELLING_BEE_DATA = {
  centerLetter: 'E',
  outerLetters: ['T', 'I', 'M', 'S', 'P', 'R'],
  validWords: [
    'TIMES', 'EMIT', 'EMITS', 'ESTEEM', 'ITEM', 'ITEMS', 'MEET', 'MEETS',
    'METER', 'METERS', 'PERMIT', 'PERMITS', 'PETS', 'PIER', 'PIERS', 'PRESS',
    'PRIME', 'PRIMES', 'PRISE', 'RESET', 'RESETS', 'RESIST', 'RIPE', 'RIPEST',
    'SEEP', 'SEER', 'SEERS', 'SEMI', 'SEMITES', 'SEPT', 'SERPENT', 'SETTER',
    'SETTERS', 'SIMMER', 'SIMMERS', 'SITE', 'SITES', 'SMITE', 'SMITES', 'SPERM',
    'SPITE', 'SPITES', 'STEEP', 'STEER', 'STEERS', 'STEM', 'STEMS', 'STEP',
    'STEPS', 'STRIP', 'STRIPE', 'STRIPES', 'TEMPO', 'TEMPOS', 'TERM', 'TERMS',
    'TIMER', 'TIMERS', 'TRIM', 'TRIMMER', 'TRIP', 'TRIPE', 'TRIPES'
  ],
  pangram: 'STRIPES',
};
