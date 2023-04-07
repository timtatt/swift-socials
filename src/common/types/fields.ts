export enum FieldType {
	TEXT_FIELD = "TextField",
	DROPDOWN = "Dropdown",
	IMAGE_UPLOAD = "ImageUpload"
}

export interface FieldOption {
	name: string;
	title: string;
}

export interface Field<T = any> {
	name: string;
	label: string;
	type: FieldType;
	defaultValue: any;
	settings: T,
	options?: FieldOption[];
	children?: Map<string, Field>;
}