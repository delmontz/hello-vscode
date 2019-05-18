const vscode = require('vscode');
const open = require('open');

function activate(context) {
  //任意のコマンドID
  const cmd_id = 'open_cmd';

  //コマンドの登録
  // 第一引数:コマンドID 第二引数:コールバック
  const hello_command = vscode.commands.registerCommand(cmd_id, () => {
    const activeEditor = vscode.window.activeTextEditor;
    const path = activeEditor && activeEditor.document && activeEditor.document.uri && activeEditor.document.uri.fsPath;
    open(path);
  });
  context.subscriptions.push(hello_command);

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

function deactivate() { }

module.exports = {
  activate,
  deactivate
}
