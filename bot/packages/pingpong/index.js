'use strict';

// 環境の取得
require('dotenv').config();
const { TOKEN } = process.env;

// Discordライブラリからクラス等を読み込む
const { Client, Events, GatewayIntentBits } = require('discord.js');

// botの制御用ビットフラグを取得
const intents = GatewayIntentBits;

// botのインスタンスを生成
const client = new Client({
    intents: [
        intents.GuildMessages,
        intents.GuildMessageTyping,
        intents.MessageContent,
    ]
});

// 起動前セットアップ
(() => {
    // イベントハンドラの登録上限を無くす
    client.setMaxListeners(Infinity);

    // 別ファイルを読み込み、botにイベントハンドラを登録
    const loadEventHandlers = require('./loadEventHandlers');
    loadEventHandlers(client);
})();

// bot起動後に一度だけ機能する処理
client.once(Events.ClientReady, () => {
    // 接続完了ログを出力
    console.log(`Logged in as ${client.user.tag}`);
});

// Discordへ接続
client.login(TOKEN);
