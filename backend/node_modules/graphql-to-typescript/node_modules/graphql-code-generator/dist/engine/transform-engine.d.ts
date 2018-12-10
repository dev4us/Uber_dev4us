import { IntrospectionQuery } from 'graphql/utilities/introspectionQuery';
import { GeneratorTemplate } from './templates';
export interface TransformedOptions {
    introspection?: IntrospectionQuery;
    documents?: string[];
    template?: GeneratorTemplate;
    outPath?: string;
    isDev?: boolean;
    noSchema?: boolean;
    noDocuments?: boolean;
}
export interface FileResult {
    path: string;
    content: string;
    isDev?: boolean;
}
export declare function Transform(transformedOptions: TransformedOptions): FileResult[];
export default Transform;
