# Changelog

## 0.2.6

- Light: the sidebar, tab strip and widgets are a warmer cream (`#f2e5bc`
  instead of `#f9f5d7`).
- Light: the activity bar is light (`#ebdbb2`, like the title bar) with dark
  icons, instead of dark (`#282828`).
- The status bar, badges and primary buttons use a softer blue (`#458588`
  instead of `#076678`). Buttons turn the darker blue on hover. Selected items
  in lists, Quick Open, menus and suggestions keep `#076678`.

## 0.2.5

- Strings are a step dimmer than the main text color (dark `#ebdbb2`, light
  `#3c3836` instead of `#fbf1c7` and `#282828`), so they stand apart from
  plain code.

## 0.2.4

- Function and method calls are green instead of aqua, the same as
  declarations (dark `#b8bb26`, light `#79740e`). Calls look the same in every
  language, with or without a language server.
- Strings use the main text color (dark `#fbf1c7`, light `#282828`) instead of
  green, so green is left to functions. Their quotes are aqua (dark
  `#8ec07c`, light `#427b58`), like the `${…}` and `#{…}` around interpolation.

## 0.2.3

- Dark: first-level rainbow brackets are bright orange (`#fe8019`) instead of
  neutral orange (`#d65d0e`), which read too dark next to code.

## 0.2.1

- Dark: method calls use bright aqua (`#8ec07c`) instead of neutral aqua
  (`#689d6a`), the same as function calls. Neutral aqua read too dark.
- Calls that the grammar tags like declarations (Ruby `foo(…)` and
  `obj.foo`, TypeScript, C, PHP, …) are aqua instead of green, so only
  declarations are green. In Ruby, calls with and without parentheses now
  look the same.

## 0.2.0

- Removed the Hard and Soft variants. Two themes remain: **Groovbox Dark** and
  **Groovbox Light** (formerly Dark Medium and Light Medium, colors unchanged).
- If you used Medium, nothing changes: your theme setting keeps working.
  If you used Hard or Soft, VS Code falls back to its default theme; pick
  Groovbox Dark or Light again in *Preferences: Color Theme*.

## 0.1.12

- Light Hard: hovering items in the explorer, Quick Open and suggestions is
  visible again (the hover color matched the sidebar).
- Hovering a warning item in the status bar keeps its dark text (it turned
  white on yellow).
- Light themes: terminal bright white is light gray (`#a89984`) and no longer
  matches black.
- Light themes: method calls, CSS pseudo-classes/elements and attribute
  selector names use the regular accents instead of the neutral ones (were
  about 2:1 contrast).
- Dark Soft: inactive tabs are `#282828`, so they stand apart from the active tab.
- README: screenshots of all six variants, clearer credits.

## 0.1.11

- Credits: code colors are credited to Brian Reilly's gruvbox Sublime port;
  no theme changes.

## 0.1.10

- Extension page links to the GitHub repository, README and issues.

## 0.1.9

- Added lines in the diff editor are aqua, matching the gutter and explorer.
- The Settings editor's modified-setting marker is yellow, like other
  "modified" markers.
- Status bar: the debugging background is `faded_orange` (was 3.4:1 under the
  white text, now 5.4:1). Warning items are `neutral_yellow` with dark text
  (5.9:1, was 3.3:1).
- Light themes: terminal ANSI black is `#282828` instead of the cream background.
- Extension Install buttons use the blue accent like other primary buttons.

## 0.1.8

- Git colors: modified files and lines are now yellow (were aqua), and new
  (untracked/added) files and lines are aqua (were green). Gruvbox's green
  leans yellow, so new files looked more "modified" than modified ones did.

## 0.1.7

- Repository cleanup; no theme changes.

## 0.1.6

- Renamed from "Gruvbox (Vim)" to **Groovbox** (extension ID `groovbox`).
  Uninstall the old `gruvbox-vim` extension after installing this one.

## 0.1.5

- Dark themes: softer panel shades. Gruvbox's dark scale has big steps, so the
  sidebar, hover, inactive tabs, activity bar, section headers, title bar and
  inputs now use in-between shades that blend two neighboring gruvbox colors.
  They match the lightness steps of VS Code's default layout. In Dark Medium the
  explorer is `#242526`, just below the `#282828` editor, instead of `#1d2021`.
- Input placeholder text is brighter (at least 4.5:1 contrast).

## 0.1.4

- Extension icon: a ring of the seven gruvbox accents.
- The sidebar, tab strip and widgets no longer share the editor's color in Dark
  Medium (now `#1d2021`) and Light Hard (now `#fbf1c7`), so there's a visible
  divide between the file explorer and the open file again.

## 0.1.3

- Panel layout now follows VS Code's default layout: lighter title bar and
  activity bar, sidebar close to the editor, lighter inactive tabs, section
  header bands, blue selection, buttons and status bar.
  Every color is the gruvbox color of the closest lightness.
- Light themes get a dark activity bar, as in VS Code's classic Light theme.

## 0.1.2

- UI around the editor (activity bar, sidebar, tabs, title bar, status bar) is one
  step darker than the editor and uses muted text, so the code stands out.
- The active tab shares the editor background. The current line number is muted
  instead of yellow.

## 0.1.1

- Version bump so editors replace the 0.1.0 build that had the Vim-style syntax colors.

## 0.1.0

- Initial release: dark and light themes, each in hard, medium and soft contrast.
- Code colors come from Brian Reilly's gruvbox Sublime port. The full VS Code UI,
  terminal and semantic highlighting are themed with the gruvbox palette.
