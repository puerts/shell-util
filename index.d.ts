import { cd, cp, ls, mkdir, mv, pwd, touch } from "shelljs";
import { chmod } from "fs";
declare function compileTypescriptProject(tsConfigPath: string): void;
export { compileTypescriptProject };
export { mv, mkdir, cp, cd, chmod, ls, pwd, touch };
export declare function exec(command: string): Promise<unknown>;
