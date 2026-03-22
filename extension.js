const vscode = require('vscode');
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const successSound = path.join(context.extensionPath, "audio", "command_successful.wav");
	if (!fs.existsSync(successSound)) {
		console.error("Sound file not found:", successSound);
		return;
	}

	const errorSound = path.join(context.extensionPath, "audio", "command_unsuccessful.wav");
	if (!fs.existsSync(errorSound)) {
		console.error("Sound file not found:", errorSound);
		return;
	}

	const platform = process.platform;
	if(!platform){
		console.error("Platform not detected, cannot play sound.");
		return;
	}

	let lastSoundTime = 0;

	function playSound(soundPath) {
		const timeoutMs = vscode.workspace.getConfiguration('commandSound').get('timeout') * 1000;

		let command, args;
		if (platform === "darwin") {
			command = "afplay";
			args = [soundPath];
		} else if (platform === "win32") {
			command = "powershell";
			args = ["-c", `(New-Object Media.SoundPlayer "${soundPath}").PlaySync();`];
		} else {
			command = "paplay";
			args = [soundPath];
		}

		const child = spawn(command, args);
		setTimeout(() => {
			child.kill();
		}, timeoutMs);
	}

	if (!vscode.window.onDidEndTerminalShellExecution) {
		console.error("vscode.window.onDidEndTerminalShellExecution event not supported in this version of VS Code.");
		return;
	}

	let terminalDisposable = null;

	function registerListener() {
		if (terminalDisposable) return;
		terminalDisposable = vscode.window.onDidEndTerminalShellExecution((event) => {
			if (event.exitCode === undefined) return;

			const now = Date.now();
			const minIntervalMs = vscode.workspace.getConfiguration('commandSound').get('minInterval') * 1000;
			if (now - lastSoundTime < minIntervalMs) return;

			lastSoundTime = now;

			if (event.exitCode === 0) {
				playSound(successSound);
			} else {
				playSound(errorSound);
			}
		});
	}

	function unregisterListener() {
		if (terminalDisposable) {
			terminalDisposable.dispose();
			terminalDisposable = null;
		}
	}

	function setupListener() {
		if (vscode.workspace.getConfiguration('commandSound').get('enabled')) {
			registerListener();
		} else {
			unregisterListener();
		}
	}

	setupListener();

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration((e) => {
			if (e.affectsConfiguration('commandSound.enabled')) {
				setupListener();
			}
		}),
		{ dispose: unregisterListener }
	);

	console.log("Command Sound extension activated!");
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};