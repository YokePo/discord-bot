/**
 * 別ファイルからイベントハンドラを読み込み、登録する処理
 */
'use strict';

// モジュール読み込み
const path = require('path');

// 自作関数読み込み
const readDir = require('./readDirectory');

// botのインスタンスを受け渡せるようエクスポート
module.exports = (client, dir) => {
    // イベントハンドラの登録
    readDir(path.join(dir, '/events'), file_path => {
        const addEventHandler = require(file_path);
        addEventHandler(client);
        console.log(`Loaded <- ${file_path.replace(`${dir}\\`, '')}`);
    });
};