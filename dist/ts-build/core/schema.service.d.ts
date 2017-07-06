import { JsonSchema } from '../models/jsonSchema';
/**
 * A Property wraps a JsonSchema and provides additional information
 * like a label and the property key.
 */
export interface Property {
    /**
     * The label is a text donating a human readable name of the schema the property describes.
     */
    readonly label: string;
    /**
     * The property is a text donating the schema key from which this property was created.
     */
    readonly property: string;
    /**
     * The schema is the JsonSchema this property describes.
     */
    readonly schema: JsonSchema;
}
/**
 * A ContainmentProperty extends the Property and provides methods
 * which allow to modify containment data.
 * @see Property
 */
export interface ContainmentProperty extends Property {
    /**
     * This allows to add data to the containment.
     * @param data The object to add to
     * @return a function that expects the element to be added
     */
    addToData(data: Object): (valueToAdd: object) => void;
    /**
     * This allows to delete data from the containment.
     * The result is a function accepting the value to delete.
     * @param data The object to delete from
     * @return function accepting the value to delete
     */
    deleteFromData(data: Object): (valueToDelete: object) => void;
    /**
     * This allows to retrieve the data of the containment.
     * @param data The object the containment is in
     * @return The containment value (e.g. an array)
     */
    getData(data: Object): Object;
}
/**
 * A ReferenceProperty extends the Property and provides methods
 * which allow to modify reference data.
 */
export interface ReferenceProperty extends Property {
    /**
     * The schema of the referenced elements.
     */
    readonly targetSchema: JsonSchema;
    /**
     * This allows to set the reference.
     * @param root The root object, needed for matching the valueToAdd
     * @param data The object to add to
     * @param valueToAdd The object to add
     */
    addToData(root: Object, data: Object, valueToAdd: object): void;
    /**
     * This allows to retrieve the data of the reference.
     * @param root The root object, needed for finding the value to retrieve
     * @param data The object the reference is in
     * @return The referenced value
     */
    getData(root: Object, data: Object): Object;
}
export declare const isContainmentProperty: (property: Property) => property is ContainmentProperty;
export declare const isReferenceProperty: (property: Property) => property is ReferenceProperty;
/**
 * The Schema Service allows to retrieve containments and references.
 */
export interface SchemaService {
    /**
     * Retrieves an array of containment properties based on the provided schema.
     * @param schema The schema to check for containments
     * @return The array of {@link ContainmentProperty} or empty if no containments are available
     * @see ContainmentProperty
     */
    getContainmentProperties(schema: JsonSchema): ContainmentProperty[];
    /**
     * Checks whether a containment properties are available in the provided schema.
     * @param schema The schema to check for containments
     * @return true if containment properties are available, false otherwise
     * @see {@link getContainmentProperties}
     */
    hasContainmentProperties(schema: JsonSchema): boolean;
    /**
     * Retieves a self contained schema.
     * @param parentSchema The schema to use for resolvement
     * @param refPath The path to resolve
     * @return a JsonSchema that is self-contained
     */
    getSelfContainedSchema(parentSchema: JsonSchema, refPath: string): JsonSchema;
    /**
     * Retrieves an array of reference properties based on the provided schema.
     * @param schema The schema to check for references
     * @return The array of {@link ReferenceProperty} or empty if no references are available
     * @see ReferenceProperty
     */
    getReferenceProperties(schema: JsonSchema): ReferenceProperty[];
}
export declare class SchemaServiceImpl implements SchemaService {
    private rootSchema;
    private selfContainedSchemas;
    constructor(rootSchema: JsonSchema);
    getContainmentProperties(schema: JsonSchema): ContainmentProperty[];
    hasContainmentProperties(schema: JsonSchema): boolean;
    getSelfContainedSchema(parentSchema: JsonSchema, refPath: string): JsonSchema;
    getReferenceProperties(schema: JsonSchema): ReferenceProperty[];
    private getContainment(key, name, schema, rootSchema, isInContainment, addFunction, deleteFunction, getFunction);
    /**
     * Makes the given JsonSchema self-contained. This means all referenced definitions
     * are contained in the schema's definitions block and references equal to
     * outerReference are set to root ('#').
     *
     * @param schema The current schema to make self contained
     * @param outerSchema The root schema to which missing definitions are added
     * @param outerReference The reference which is considered to be self ('#')
     * @param includedDefs The list of definitions which were already added to the outer schema
     */
    private selfContainSchema(schema, outerSchema, outerReference, includedDefs?);
    private copyAndResolveInner(resolved, innerRef, outerSchema, outerReference, includedDefs);
}