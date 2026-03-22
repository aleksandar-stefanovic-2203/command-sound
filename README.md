# Command Sound

A [Visual Studio Code](https://code.visualstudio.com/) extension that plays a short sound when a terminal command finishes—one sound for success (exit code `0`) and another for failure (non-zero exit code).

## Features

- **Success / failure feedback** — Uses `vscode.window.onDidEndTerminalShellExecution` so sounds align with the integrated terminal’s command result.
- **Cross-platform playback** — macOS (`afplay`), Windows (PowerShell `SoundPlayer`), Linux (`paplay`).
- **Configurable timeout** — Set maximum playback duration to prevent long sounds.
- **Minimum interval control** — Prevent sound spam by setting minimum time between sounds.
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

### Configuration

The extension provides several settings to customize behavior:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `commandSound.enabled` | boolean | `true` | Enable or disable sound playback |
| `commandSound.timeout` | number | `5` | Maximum time in seconds to play sounds before stopping |
| `commandSound.minInterval` | number | `0.5` | Minimum time in seconds between playing sounds |

You can configure these in VS Code Settings (search for "Command Sound") or in your `settings.json`:

```json
{
  "commandSound.enabled": true,
  "commandSound.timeout": 3,
  "commandSound.minInterval": 1.0
}
```

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
