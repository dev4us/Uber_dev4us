import { TransformedOptions } from '../engine/transform-engine';
export declare const initCLI: (args: any) => any;
export declare const cliError: (err: string) => void;
export declare const validateCliOptions: (options: any) => void;
export declare const transformOptions: (options: any) => Promise<TransformedOptions>;
