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
	name: string;
	type: FieldType;
	defaultValue: any;
	options?: FieldOption[];
	children?: Map<string, Field>;
}

export abstract class AbstractField {
	abstract type: FieldType;
	protected field: Field;

	constructor(field: Field, name?: string) {
		this.field = field;
	}

	abstract getDefaultValue(): any
	abstract renderField(onFieldUpdate: (value: any) => void): JSX.Element;
	abstract renderFieldEditor(onFieldUpdate: (field: Field) => void, defaultValueRef: RefObject<HTMLSelectElement>): JSX.Element;
}

