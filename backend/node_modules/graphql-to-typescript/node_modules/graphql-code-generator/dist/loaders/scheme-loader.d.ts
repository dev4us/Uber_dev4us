import { GraphQLSchema, IntrospectionQuery } from 'graphql';
export declare const validateSchema: (schema: IntrospectionQuery) => void;
export declare const loadSchema: (schemaObject: IntrospectionQuery) => GraphQLSchema;
