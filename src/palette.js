'use strict';

// Original gruvbox palette by Pavel Pertsev (morhetz).
// https://github.com/morhetz/gruvbox  (MIT/X11)
const gb = {
  dark0_hard: '#1d2021',
  dark0: '#282828',
  dark0_soft: '#32302f',
  dark1: '#3c3836',
  dark2: '#504945',
  dark3: '#665c54',
  dark4: '#7c6f64',

  gray_245: '#928374',
  gray_244: '#928374',

  light0_hard: '#f9f5d7',
  light0: '#fbf1c7',
  light0_soft: '#f2e5bc',
  light1: '#ebdbb2',
  light2: '#d5c4a1',
  light3: '#bdae93',
  light4: '#a89984',

  bright_red: '#fb4934',
  bright_green: '#b8bb26',
  bright_yellow: '#fabd2f',
  bright_blue: '#83a598',
  bright_purple: '#d3869b',
  bright_aqua: '#8ec07c',
  bright_orange: '#fe8019',

  neutral_red: '#cc241d',
  neutral_green: '#98971a',
  neutral_yellow: '#d79921',
  neutral_blue: '#458588',
  neutral_purple: '#b16286',
  neutral_aqua: '#689d6a',
  neutral_orange: '#d65d0e',

  faded_red: '#9d0006',
  faded_green: '#79740e',
  faded_yellow: '#b57614',
  faded_blue: '#076678',
  faded_purple: '#8f3f71',
  faded_aqua: '#427b58',
  faded_orange: '#af3a03',
};

const ACCENTS = ['red', 'green', 'yellow', 'blue', 'purple', 'aqua', 'orange'];

/**
 * Resolve the palette the same way gruvbox.vim does for a given
 * `background` and `g:gruvbox_contrast_{dark,light}` setting.
 *
 * @param {'dark'|'light'} mode
 * @param {'hard'|'medium'|'soft'} contrast
 */
function getPalette(mode, contrast) {
  const suffix = contrast === 'medium' ? '' : `_${contrast}`;
  const p = { mode, contrast };

  if (mode === 'dark') {
    p.bg0 = gb[`dark0${suffix}`];
    p.bg1 = gb.dark1;
    p.bg2 = gb.dark2;
    p.bg3 = gb.dark3;
    p.bg4 = gb.dark4;
    p.gray = gb.gray_245;
    p.fg0 = gb.light0;
    p.fg1 = gb.light1;
    p.fg2 = gb.light2;
    p.fg3 = gb.light3;
    p.fg4 = gb.light4;
    for (const c of ACCENTS) p[c] = gb[`bright_${c}`];
  } else {
    p.bg0 = gb[`light0${suffix}`];
    p.bg1 = gb.light1;
    p.bg2 = gb.light2;
    p.bg3 = gb.light3;
    p.bg4 = gb.light4;
    p.gray = gb.gray_244;
    p.fg0 = gb.dark0;
    p.fg1 = gb.dark1;
    p.fg2 = gb.dark2;
    p.fg3 = gb.dark3;
    p.fg4 = gb.dark4;
    for (const c of ACCENTS) p[c] = gb[`faded_${c}`];
  }

  // Main code text color, as in Brian Reilly's Sublime port: the
  // opposite end of the scale at the same contrast level
  // (dark hard → light0_hard, light soft → dark0_soft, …).
  p.text = mode === 'dark' ? gb[`light0${suffix}`] : gb[`dark0${suffix}`];

  // Neutral accents are shared by both backgrounds (terminal, rainbow brackets).
  p.neutral = {};
  for (const c of ACCENTS) p.neutral[c] = gb[`neutral_${c}`];

  return p;
}

/** Append an alpha channel (0..1) to a #rrggbb color. */
function alpha(hex, a) {
  const byte = Math.round(Math.min(1, Math.max(0, a)) * 255);
  return hex + byte.toString(16).padStart(2, '0');
}

/**
 * Blend two #rrggbb colors: t = 0 gives `a`, t = 1 gives `b`. Used for the
 * in-between shades the gruvbox palette lacks (e.g. between #1d2021 and #282828).
 */
function mix(a, b, t) {
  const ch = (h, i) => parseInt(h.slice(i, i + 2), 16);
  return '#' + [1, 3, 5]
    .map((i) => Math.round(ch(a, i) * (1 - t) + ch(b, i) * t).toString(16).padStart(2, '0'))
    .join('');
}

module.exports = { gb, getPalette, alpha, mix };
