import { GraphQLSchema } from 'graphql';
import { Codegen } from '../models/interfaces';
import { DocumentNode } from 'graphql';
export interface CodegenConfig {
    flattenInnerTypes?: boolean;
    noSchema?: boolean;
    noDocuments?: boolean;
}
export declare const prepareCodegen: (schema: GraphQLSchema, document: DocumentNode, primitivesMap?: any, config?: CodegenConfig) => Codegen;
