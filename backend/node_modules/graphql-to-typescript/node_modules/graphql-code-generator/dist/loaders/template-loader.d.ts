import { GeneratorTemplate } from '../engine/templates';
export declare const loadFromPath: (filePath: string) => string;
export declare const getTemplateGenerator: (template: string) => Promise<GeneratorTemplate>;
export declare const compileTemplate: (compileContext: any, templatePath: string) => string;
