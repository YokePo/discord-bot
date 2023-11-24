/**
 * 別ファイルからイベントハンドラを読み込み、登録する処理
 */
'use strict';

// モジュール読み込み
const path = require('path');

// 自作関数読み込み
const readDir = require('./utils/readDirectory.js');

// botのインスタンスを受け渡せるようエクスポート
module.exports = client => {
    // イベントハンドラの登録
    readDir(path.join(__dirname, 'events'), file_path => {
        const addEventHandler = require(file_path);
        addEventHandler(client);
    });
};