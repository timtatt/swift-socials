
import Immutable from 'immutable';
import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { getField } from '../lib/templates/fields';
import { getDefaultFormData, Template } from '../lib/templates/template';

type TemplateFormProps = {
	template: Template,
	onFormUpdate?: (data: any) => void
}

export const TemplateForm = ({template, onFormUpdate = () => {}}: TemplateFormProps) => {

	const [formData, setFormData] = useState<Immutable.Map<string, any>>(Immutable.Map());

	useEffect(() => {
		const newFormData: Immutable.Map<string, any> = Immutable.Map(getDefaultFormData(template));
		setFormData(newFormData);
		onFormUpdate(newFormData.toJS());
	}, []);

	const setFieldData = (name: string, value: any) => {
		const newFormData = formData.set(name, value);
		setFormData(newFormData);
		onFormUpdate(newFormData.toJS());
	}
	

	return (
		<>
			<Form>
				{template.form.map(field => (
					<Row key={field.name}>
						<Col>
							{getField(field).renderField(value => setFieldData(field.name, value))}
						</Col>
					</Row>
				))}
			</Form>
		</>
	);
};