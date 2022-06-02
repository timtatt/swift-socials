
export enum FieldType {
	TEXT_FIELD = "TextField"
}

export interface FieldOption {
	name: string;
	title: string;
}

export interface Field {
	type: FieldType;
	defaultValue: string; // allows support for non-string values
	options?: FieldOption[];
	children?: Field[];
}

export abstract class AbstractField {
	abstract type: FieldType;
	protected field: Field;
	protected name?: string;

	constructor(field: Field, name?: string) {
		this.field = field;
	}

	abstract getDummyData(): any;
}
