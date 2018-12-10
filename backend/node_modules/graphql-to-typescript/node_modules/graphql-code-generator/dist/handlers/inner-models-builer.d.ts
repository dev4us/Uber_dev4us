import { GraphQLType } from 'graphql/type/definition';
import { SelectionSetNode } from 'graphql/language/ast';
import { GraphQLSchema } from 'graphql/type/schema';
import { Model } from '../models/interfaces';
export declare const buildInnerModelsArray: (schema: GraphQLSchema, rootObject: GraphQLType, flattenInnerTypes: boolean, selections: SelectionSetNode, primitivesMap: any, appendTo?: Model, result?: Model[]) => Model[];
