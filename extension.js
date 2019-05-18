const vscode = require('vscode');
const request = require('request');

function activate(context) {
  //任意のコマンドID
  const cmd_id = 'slack_cmd';

  //コマンドの登録
  // 第一引数:コマンドID 第二引数:コールバック
  const cmd = vscode.commands.registerCommand(cmd_id, () => {
    vscode.window.showQuickPick(['自分で入力', 'ファイル内容送信', '選択部分を送信']).then((selected) => {
      //アクティブなエディタのドキュメントを取得
      const activeEditor = vscode.window.activeTextEditor;
      const doc = activeEditor && activeEditor.document && activeEditor.document.uri && activeEditor.document;
      if(selected === '自分で入力'){
        //入力欄を表示させる
        vscode.window.showInputBox({
          prompt: 'Slackへ通知します',
          placeHolder: '入力してね'
        }).then((value) => {
          sendSlack(value);
        });
      }else if(selected === 'ファイル内容送信'){
        //エディターの内容を読み込んで送信
        sendSlack(doc.getText());
      }else if(selected === '選択部分を送信'){
        //選択範囲を取得
        const ref = activeEditor.selection;
        sendSlack(doc.getText(ref));
      }
    });
  });
  context.subscriptions.push(cmd);

  // ステータバーにボタン登録
  // 第一引数:表示位置 第二引数:優先度
  const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  button.command = cmd_id;
  button.text = 'slackで送信';
  context.subscriptions.push(button);
  //登録しただけだと表示されないので明示的に表示させる
  button.show();
}

function sendSlack(message){
  request.post({
    uri: 'https://hooks.slack.com/services/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',
    headers: { 'Content-Type': 'application/json' },
    json: {
      username: 'VSCode',
      icon_emoji: ':ghost:',
      text: message
    }
  });
}

exports.activate = activate;

//機能を無効にした時の処理？
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
