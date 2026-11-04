# Groovbox

A modern take on [gruvbox](https://github.com/morhetz/gruvbox) by Pavel Pertsev
for VS Code. Code colors come from Brian Reilly's
[gruvbox for Sublime Text](https://github.com/Briles/gruvbox), by way of Tom
Philbin's [Gruvbox Themes](https://github.com/tomphilbin/gruvbox-themes-vscode).
This adds the full UI and semantic highlighting.

Dark and Light, each in Hard, Medium and Soft contrast.

## Install

```sh
code --install-extension groovbox-*.vsix    # VSCodium: codium …
```

Then pick a **Groovbox** theme in *Preferences: Color Theme*.

## Build

```sh
npm run build      # regenerate themes/ from src/
npm run package    # create the .vsix
```

## License

MIT. See `LICENSE`.
