import { RefObject } from "react";

export enum FieldType {
	TEXT_FIELD = "TextField",
	DROPDOWN = "Dropdown"
}

export interface FieldOption {
	name: string;
	title: string;
}

export interface Field {
	type: FieldType;
	defaultValue: string; // allows support for non-string values
	options?: FieldOption[];
	children?: Map<string, Field>;
}

export abstract class AbstractField {
	abstract type: FieldType;
	protected field: Field;
	protected name?: string;

	constructor(field: Field, name?: string) {
		this.field = field;
	}

	abstract getDummyData(): any;
	abstract renderField(): JSX.Element;
	abstract renderFieldEditor(setField: (field: Field) => void, defaultValueRef: RefObject<HTMLSelectElement>): JSX.Element;
}

