import { useState, useEffect } from 'react';
import { Field, AbstractField } from './../lib/templates/fields';

interface FieldProps {
	field: AbstractField,
	onFieldUpdate: (field: Field) => {}
}

const FieldComponent = (props: FieldProps) => {
	const [field, setField] = useState(props.field);

	return ;
}

export { FieldComponent as Field }