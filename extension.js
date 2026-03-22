const vscode = require('vscode');
const { exec } = require("child_process");
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

	function playSound(soundPath) {
		if (platform === "darwin") {
			exec(`afplay "${soundPath}"`);
		}

		else if (platform === "win32") {
			exec(`powershell -c (New-Object Media.SoundPlayer "${soundPath}").PlaySync();`);
		}

		else {
			exec(`paplay "${soundPath}"`);
		}
	}

	if (!vscode.window.onDidEndTerminalShellExecution) {
		console.error("vscode.window.onDidEndTerminalShellExecution event not supported in this version of VS Code.");
		return;
	}

	const disposable = vscode.window.onDidEndTerminalShellExecution((event) => {
		if (event.exitCode === undefined) return;

		if (event.exitCode === 0) {
			playSound(successSound);
		} else {
			playSound(errorSound);
		}
	});

	context.subscriptions.push(disposable);

	console.log("Command Sound extension activated!");
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};