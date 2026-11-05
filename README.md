# Groovbox

A modern take on [gruvbox](https://github.com/morhetz/gruvbox) by Pavel Pertsev
for VS Code. Code colors come from Brian Reilly's
[gruvbox for Sublime Text](https://github.com/Briles/gruvbox), taken from Tom
Philbin's VS Code port,
[Gruvbox Themes](https://github.com/tomphilbin/gruvbox-themes-vscode).
This adds the full UI and semantic highlighting.

## Variants

Dark and Light, each in Hard, Medium and Soft contrast:

- **Groovbox Dark Hard / Medium / Soft**
- **Groovbox Light Hard / Medium / Soft**

The contrast level sets the editor background, as `g:gruvbox_contrast_dark` /
`g:gruvbox_contrast_light` do in gruvbox.vim. The panels around the editor stay
the same within each mode.

## Screenshots

![Groovbox screenshots](images/screenshots/grid.png)

Top: Dark Hard, Medium, Soft. Bottom: Light Hard, Medium, Soft.

## Install

```sh
code --install-extension groovbox-<version>.vsix    # VSCodium: codium …
```

Then pick a **Groovbox** theme in *Preferences: Color Theme*.

## Semantic highlighting

The themes turn semantic highlighting on. When a language server provides
semantic tokens, function calls, method calls and declarations keep the
Sublime colors. Everything else uses the same colors as without it.

## Build

```sh
npm run build      # regenerate themes/ from src/
npm run package    # create the .vsix
```

## License

MIT. See `LICENSE`.
