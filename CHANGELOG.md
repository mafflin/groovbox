# Changelog

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
  They match the lightness steps of VS Code's default layout (Tom Philbin's
  theme). In Dark Medium the explorer is `#242526`, just below the `#282828`
  editor, instead of `#1d2021`.
- Input placeholder text is brighter (at least 4.5:1 contrast).

## 0.1.4

- Extension icon: a ring of the seven gruvbox accents.
- The sidebar, tab strip and widgets no longer share the editor's color in Dark
  Medium (now `#1d2021`) and Light Hard (now `#fbf1c7`), so there's a visible
  divide between the file explorer and the open file again.

## 0.1.3

- Panel layout now follows VS Code's default layout, as seen in Tom Philbin's
  theme: lighter title bar and activity bar, sidebar close to the editor, lighter
  inactive tabs, section header bands, blue selection, buttons and status bar.
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
