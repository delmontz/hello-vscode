// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const request = require("request");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  //任意のコマンドID
  const cmd_id = 'slack_cmd';

  //コマンドの登録
  // 第一引数:コマンドID 第二引数:コールバック
  const cmd = vscode.commands.registerCommand(cmd_id, () => {
    request.post({
      uri: 'https://hooks.slack.com/services/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',
      headers: { 'Content-Type': 'application/json' },
      json: {
        username: 'VSCode',
        icon_emoji: ':ghost:',
        text: '万策尽きた😇'
      }
    });
  });
  context.subscriptions.push(cmd);

  // ステータバーにボタン登録
  // 第一引数:表示位置 第二引数:優先度
  let button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  button.command = cmd_id;
  button.text = '開くボタン';
  context.subscriptions.push(button);
  //登録しただけだと表示されないので明示的に表示させる
  button.show();
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
