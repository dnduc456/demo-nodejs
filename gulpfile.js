'use strict';

const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const ts = require('gulp-typescript');
const spawn = require('child_process').spawn;
const outDir = 'dist';

const { src, dest, parallel, series, watch } = require('gulp');

let node;

function server () {
    if (node) {
        node.kill();
        node = null;
    }

    node = spawn('node', ['-r', 'dotenv/config', outDir + '/index.js'], { stdio: 'inherit' });
    node.on('close', function (code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
}

/**
 * Clean
 */
function clean () {
    return src(outDir, { read: false, allowEmpty: true })
      .pipe(rimraf());
}

/**
 * Compile typescript
 */

function compile () {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult = tsProject
      .src()
      .pipe(tsProject());
    return tsResult.js.pipe(dest(outDir));
}

/**
 * Lint all custom TypeScript files.
 */
function lint () {
    return src('./src/**/*.ts')
      .pipe(tslint({
          configuration: "./tslint.json"
      }))
      .pipe(tslint.report());
}

/**
 * Copy view files
 */
function copy () {
    return src('./src/views/**/*.html')
      .pipe(dest('./dist/views'));
}

const build = series(clean, lint, parallel(compile, copy));

/**
 * Watch files
 */
function watchServer () {
    return watch('./src/**/*.ts', series(build, server));
}

exports.clean = clean;
exports.copy = copy;
exports.tslint = lint;
exports.compile = compile;
exports.build = build;
exports.watch = parallel(series(build, server), watchServer);
