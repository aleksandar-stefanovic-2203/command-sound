# Change Log

All notable changes to the "command-sound" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-22

### Added

- **Enable/disable setting** (`commandSound.enabled`) — Toggle sound playback on or off (default: enabled)
- **Sound timeout setting** (`commandSound.timeout`) — Maximum time in seconds to play sounds before automatically stopping them (default: 5 seconds)
- **Minimum interval setting** (`commandSound.minInterval`) — Minimum time in seconds between playing sounds to prevent sound spam (default: 0.5 seconds)

### Changed

- Improved sound playback implementation using `child_process.spawn()` for better process control and timeout handling

## [1.0.0] - 2026-03-22

### Added

- Play a different sound depending on whether a terminal command completed successfully or unsuccessfully
- Cross-platform audio playback:
  - **macOS** — `afplay`
  - **Windows** — PowerShell `Media.SoundPlayer`
  - **Linux** — `paplay` (PulseAudio)
- Automatic registration on VS Code startup; listens to integrated terminal shell execution events
