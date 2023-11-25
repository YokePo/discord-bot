// モジュール読み込み
const fs = require('fs');
const path = require('path');

/**
 * 第一引数で指定したディレクトリ配下を全て網羅し、
 * 第二引数で受け渡した関数を実行する再帰関数
 * @param {path} dir 読み込み対象のディレクトリパス
 * @param {function} callback コールバック関数
 */
const readDirectory = (dir, callback) => {
    // 一階層下のファイル/ディレクトリを全て取得
    const files = fs.readdirSync(dir);

    // 各ファイル/ディレクトリ毎にループ処理
    files.forEach(file => {
        // 一階層下のファイル/ディレクトリパスを生成
        const file_path = path.join(dir, file);

        // ファイルかディレクトリかをチェック
        const stat = fs.lstatSync(file_path);

        // ディレクトリだった場合
        if (stat.isDirectory()) {
            // 再帰呼び出し
            readDirectory(file_path, callback);
        }
        // jsファイルの場合
        else if (file.endsWith('.js')) {
            // 渡された関数を実行する
            callback(file_path);
        }
    })
};

module.exports = readDirectory;