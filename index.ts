import * as ts from "typescript";
import { cd, cp, ls, mkdir, mv, pwd, touch, exec, rm } from "shelljs";
import { chmod } from "fs";

function compileTypescriptProject(tsConfigPath: string) {
    var result: ts.ParsedCommandLine | undefined = ts.getParsedCommandLineOfConfigFile(
        tsConfigPath,
        void 0,
        Object.assign({
            onUnRecoverableConfigFileDiagnostic: (d: ts.Diagnostic) => d
        }, ts.sys),
        void 0,
        void 0
    );
    if (!result) {
        throw new Error('parse tsconfig.json failed');
    }

    const program = ts.createProgram(result.fileNames, result.options);
    const emitResult = program.emit();

    ts.getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics)
        .forEach((diagnostic: ts.Diagnostic) => {
            if (diagnostic.file) {
                let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);

                let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
                console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
            }
        });
}

export { compileTypescriptProject }
export { mv, mkdir, cp, cd, chmod, ls, pwd, touch, rm, exec }

export function setWinCMDEncodingToUTF8() {
    if (process.platform == 'win32') {
        exec(`CHCP 65001`, { silent: true });
    }
}