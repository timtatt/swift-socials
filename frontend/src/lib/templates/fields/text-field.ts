import { AbstractField, Field, FieldType } from "./field";
import { faker } from '@faker-js/faker';

export class TextField extends AbstractField {
	type = FieldType.TEXT_FIELD

	constructor(field: Field, name?: string) {
		super(field, name);
	}

	getDummyData() {
		return faker.name.findName();
	}
	
}