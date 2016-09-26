/**
 * PostCSS の設定ファイル
 * https://github.com/postcss/gulp-postcss などから読み込んで使う
 * https://github.com/postcss/postcss-cli 向けの設定ファイルではない
 */
const doiuse = require('doiuse');
const cssnano = require('cssnano');
const reporter = require('postcss-reporter');
const easyImport = require('postcss-easy-import');
const atApply = require('postcss-apply');
const autpPrefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const calc = require('postcss-calc');
const flexBugsFixes = require('postcss-flexbugs-fixes');

const browsers = [
    'last 1 version',
    'ie >= 11'
];

const config = {
    build: [
        easyImport({glob: true}),
        atApply,
        customProperties(),
        calc(),
        flexBugsFixes(),
        autpPrefixer({browsers: browsers}),
        cssnano()
    ],

    lint: [
        easyImport({glob: true}),
        atApply,
        customProperties(),
        calc(),
        doiuse({
            browsers: browsers, ignore: [
                'css-resize',
                'pointer-events',
                'text-size-adjust',
                'css-appearance',
                'css-transitions',
                'will-change', // 対応してなくても動作には問題ない
                'css3-cursors',
                'flexbox', // Warning: IE11>=
                'viewport-units' //Warning: 3D transforms+IE11
            ]
        }),
        reporter()
    ]

};

module.exports = config;
