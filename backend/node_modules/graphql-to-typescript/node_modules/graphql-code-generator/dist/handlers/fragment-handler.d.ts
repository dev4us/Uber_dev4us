import { GraphQLSchema } from 'graphql/type/schema';
import { FragmentDefinitionNode } from 'graphql/language/ast';
import { CodegenDocument } from '../models/interfaces';
export declare const handleFragment: (schema: GraphQLSchema, fragmentNode: FragmentDefinitionNode, primitivesMap: any, flattenInnerTypes: boolean) => CodegenDocument;
