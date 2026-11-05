# Groovbox

A modern take on [gruvbox](https://github.com/morhetz/gruvbox) by Pavel Pertsev
for VS Code. Code colors are based on Brian Reilly's
[gruvbox for Sublime Text](https://github.com/Briles/gruvbox).

## Variants

- **Groovbox Dark**
- **Groovbox Light**

Both use gruvbox's default (medium) contrast.

## Screenshots

![Groovbox screenshots](images/screenshots/grid.png)

Groovbox Dark (left) and Groovbox Light (right).

## Install

```sh
code --install-extension groovbox-<version>.vsix    # VSCodium: codium …
```

Then pick a **Groovbox** theme in *Preferences: Color Theme*.

## Build

```sh
npm run build      # regenerate themes/ from src/
npm run package    # create the .vsix
```

## License

MIT. See `LICENSE`.
