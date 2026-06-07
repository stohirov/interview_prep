/**
 * Per-module display chrome (icon glyph + gradient) for the Console UI.
 * Ported from the prototype's `app/index.html` module grid. Keyed by module id so
 * the overview grid, module page, and sidebar can share one source of truth.
 */
export interface ModuleMeta {
  /** Two-letter monogram shown in the gradient tile. */
  glyph: string;
  /** CSS gradient for the icon tile / progress bar fill. */
  gradient: string;
  /** Coarse difficulty band shown in the card footer. */
  level: string;
}

const META: Record<string, ModuleMeta> = {
  collections: {
    glyph: 'Co',
    gradient: 'linear-gradient(140deg,#6d6bf5,#34d8e8)',
    level: 'JUNIOR→MID',
  },
  oop: {
    glyph: 'Oo',
    gradient: 'linear-gradient(140deg,#f3964f,#f3b350)',
    level: 'MID→SENIOR',
  },
  postgresql: {
    glyph: 'Pg',
    gradient: 'linear-gradient(140deg,#3ad29f,#34d8e8)',
    level: 'MID→SENIOR',
  },
  spring: {
    glyph: 'Sp',
    gradient: 'linear-gradient(140deg,#5da35a,#8fce6a)',
    level: 'MID→SENIOR',
  },
  dsa: {
    glyph: 'Ds',
    gradient: 'linear-gradient(140deg,#f56b8b,#f3964f)',
    level: 'ALL LEVELS',
  },
  'low-level-design': {
    glyph: 'Ll',
    gradient: 'linear-gradient(140deg,#46c1c8,#5da3f5)',
    level: 'MID→SENIOR',
  },
  'high-level-design': {
    glyph: 'Hl',
    gradient: 'linear-gradient(140deg,#9b8cf7,#6d6bf5)',
    level: 'SENIOR',
  },
};

const FALLBACK: ModuleMeta = {
  glyph: '··',
  gradient: 'linear-gradient(140deg,var(--accent),var(--accent-2))',
  level: 'ALL LEVELS',
};

export function moduleMeta(moduleId: string): ModuleMeta {
  return META[moduleId] ?? FALLBACK;
}
