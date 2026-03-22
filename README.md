# Command Sound

A [Visual Studio Code](https://code.visualstudio.com/) extension that plays a short sound when a terminal command finishes—one sound for success (exit code `0`) and another for failure (non-zero exit code).

## Features

- **Success / failure feedback** — Uses `vscode.window.onDidEndTerminalShellExecution` so sounds align with the integrated terminal’s command result.
- **Cross-platform playback** — macOS (`afplay`), Windows (PowerShell `SoundPlayer`), Linux (`paplay`).

## Requirements

- **VS Code** `^1.110.0` or newer (API used for shell execution events).
- **Audio files** in the extension folder:
  - `audio/command_successful.wav`
  - `audio/command_unsuccessful.wav`  
  If either file is missing, the extension logs an error and does not register the listener.
- **Linux:** `paplay` (often from the `pulseaudio-utils` package) must be available on your `PATH`.

## Usage

1. Enable the extension.
2. Run commands in the integrated terminal as usual.
3. When a command completes, you’ll hear the success or failure sound based on its exit code.

No commands or settings are contributed yet; the behavior is always on after activation.

## Development

| Script        | Description        |
|---------------|--------------------|
| `npm run lint` | Run ESLint         |
| `npm test`     | Run extension tests |

## Project structure

| Path | Role |
|------|------|
| `extension.js` | Activation, terminal listener, sound playback |
| `audio/` | `command_successful.wav`, `command_unsuccessful.wav` |

## Known limitations

- Sounds are played via external tools; path or quoting issues on unusual setups may affect playback.
- Very old VS Code builds without `onDidEndTerminalShellExecution` are unsupported.

## Release notes

See [CHANGELOG.md](CHANGELOG.md).

---

**Publisher:** aleksandar-stefanovic
