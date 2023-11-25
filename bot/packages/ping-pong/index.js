'use strict';

// 環境の取得
require('dotenv').config();
const { TOKEN } = process.env;

const path = require("path");

// Discordライブラリからクラス等を読み込む
const { Client, Events, GatewayIntentBits } = require('discord.js');

// botのインスタンスを生成
const client = new Client({
    intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});

// 起動前セットアップ
(() => {
    // イベントハンドラの登録上限を無くす
    client.setMaxListeners(Infinity);

    // 別ファイルを読み込み、botにイベントハンドラを登録
    const loadEventHandlers = require('../utils/loadEventHandlers');
    loadEventHandlers(client, path.join(__dirname));
})();

// bot起動後に一度だけ機能する処理
client.once(Events.ClientReady, () => {
    // 接続完了ログを出力
    console.log(`Logged in as ${client.user.tag}`);
});

// Discordへ接続
client.login(TOKEN);
