import { Model } from '../models/interfaces';
import { GraphQLType, GraphQLArgument } from 'graphql/type/definition';
import { GraphQLSchema } from 'graphql/type/schema';
export declare const buildArgumentsType: (primitivesMap: any, fieldName: string, typeName: string, argumentsArr?: GraphQLArgument[]) => Model;
export declare const handleType: (schema: GraphQLSchema, primitivesMap: any, type: GraphQLType) => Model[];
