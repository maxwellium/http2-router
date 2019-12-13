export interface IPathParser {
    match: (path: string) => RegExp;
    extract: (path: string) => RegExp;
}
export declare const rfc6570likeParser: IPathParser;
export declare const commonPathTemplateParser: IPathParser;
export declare function extractPathParameters<T extends {
    [key: string]: string;
}>(regex: RegExp, url: string): T | null;
