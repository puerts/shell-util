"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exports.touch = exports.pwd = exports.ls = exports.chmod = exports.cd = exports.cp = exports.mkdir = exports.mv = exports.compileTypescriptProject = void 0;
const ts = __importStar(require("typescript"));
const shelljs_1 = require("shelljs");
Object.defineProperty(exports, "cd", { enumerable: true, get: function () { return shelljs_1.cd; } });
Object.defineProperty(exports, "cp", { enumerable: true, get: function () { return shelljs_1.cp; } });
Object.defineProperty(exports, "ls", { enumerable: true, get: function () { return shelljs_1.ls; } });
Object.defineProperty(exports, "mkdir", { enumerable: true, get: function () { return shelljs_1.mkdir; } });
Object.defineProperty(exports, "mv", { enumerable: true, get: function () { return shelljs_1.mv; } });
Object.defineProperty(exports, "pwd", { enumerable: true, get: function () { return shelljs_1.pwd; } });
Object.defineProperty(exports, "touch", { enumerable: true, get: function () { return shelljs_1.touch; } });
const fs_1 = require("fs");
Object.defineProperty(exports, "chmod", { enumerable: true, get: function () { return fs_1.chmod; } });
const iconv_lite_1 = require("iconv-lite");
function compileTypescriptProject(tsConfigPath) {
    var result = ts.getParsedCommandLineOfConfigFile(tsConfigPath, void 0, Object.assign({
        onUnRecoverableConfigFileDiagnostic: (d) => d
    }, ts.sys), void 0, void 0);
    if (!result) {
        throw new Error('parse tsconfig.json failed');
    }
    const program = ts.createProgram(result.fileNames, result.options);
    const emitResult = program.emit();
    ts.getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics)
        .forEach((diagnostic) => {
        if (diagnostic.file) {
            let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
        else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
}
exports.compileTypescriptProject = compileTypescriptProject;
function exec(command) {
    return new Promise((resolve, reject) => {
        let child = (0, shelljs_1.exec)(command, {
            async: true,
            silent: true,
            encoding: 'binary'
        }, code => {
            code ? reject(code) : resolve(code);
        });
        child.stdout && child.stdout.on('data', function (data) {
            console.log((0, iconv_lite_1.decode)(Buffer.from(data, 'binary'), process.platform == 'win32' ? "gb2312" : 'utf-8'));
        });
        child.stderr && child.stderr.on('data', function (data) {
            console.error((0, iconv_lite_1.decode)(Buffer.from(data, 'binary'), process.platform == 'win32' ? "gb2312" : 'utf-8'));
        });
    });
}
exports.exec = exec;
