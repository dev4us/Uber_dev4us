export interface PartialDefinition {
    name: string;
    content: string;
}
export interface HelperDefinition {
    name: string;
    func: Function;
}
export declare const initPartials: (partials: PartialDefinition[]) => void;
export declare const initTemplateHelpers: (helpers: HelperDefinition[]) => void;
export declare const initHelpers: () => void;
