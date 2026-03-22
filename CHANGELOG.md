# Change Log

All notable changes to the "command-sound" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-22

### Added

- Play a different sound depending on whether a terminal command completed successfully or unsuccessfully
- Cross-platform audio playback:
  - **macOS** — `afplay`
  - **Windows** — PowerShell `Media.SoundPlayer`
  - **Linux** — `paplay` (PulseAudio)
- Automatic registration on VS Code startup; listens to integrated terminal shell execution events
