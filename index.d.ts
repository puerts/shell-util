import { cd, cp, ls, mkdir, mv, pwd, touch, exec, rm } from "shelljs";
import { chmod } from "fs";
declare function compileTypescriptProject(tsConfigPath: string): void;
export { compileTypescriptProject };
export { mv, mkdir, cp, cd, chmod, ls, pwd, touch, rm, exec };
export declare function setWinCMDEncodingToUTF8(): void;
