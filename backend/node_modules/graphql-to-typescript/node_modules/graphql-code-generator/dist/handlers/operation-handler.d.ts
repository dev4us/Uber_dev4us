import { GraphQLSchema } from 'graphql/type/schema';
import { OperationDefinitionNode } from 'graphql/language/ast';
import { CodegenDocument, Field } from '../models/interfaces';
export declare const buildVariables: (schema: GraphQLSchema, definitionNode: OperationDefinitionNode, primitivesMap: any) => Field[];
export declare const handleOperation: (schema: GraphQLSchema, definitionNode: OperationDefinitionNode, primitivesMap: any, flattenInnerTypes?: boolean) => CodegenDocument;
