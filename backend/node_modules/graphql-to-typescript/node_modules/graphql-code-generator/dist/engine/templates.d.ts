export interface TemplateConfig {
    strategy: 'SINGLE_FILE' | 'MULTIPLE_FILES';
    template?: string;
    filesExtension?: string;
    templates?: {
        [key: string]: string;
    };
    primitives?: {
        [key: string]: string;
    };
    basePath?: string;
    flattenInnerTypes?: boolean;
    partials?: string[];
    helpers?: string[];
}
export interface GeneratorTemplate {
    language: string;
    aliases: string[];
    config?: TemplateConfig;
}
export declare const getGenerators: () => {
    language: string;
    aliases: string[];
    config: TemplateConfig;
}[];
