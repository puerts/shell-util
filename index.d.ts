import { cd, cp, ls, mkdir, mv, pwd, touch, rm, ExecFunction } from "shelljs";
import { chmod } from "fs";
declare function compileTypescriptProject(tsConfigPath: string): void;
declare const exec: ExecFunction;
export { compileTypescriptProject };
export { mv, mkdir, cp, cd, chmod, ls, pwd, touch, rm, exec };
export declare function setWinCMDEncodingToUTF8(): void;
