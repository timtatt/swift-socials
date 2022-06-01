export enum FieldType {
	TEXT_FIELD
}

export abstract class Field {
	name: string = '';
	type: FieldType = FieldType.TEXT_FIELD;
}
