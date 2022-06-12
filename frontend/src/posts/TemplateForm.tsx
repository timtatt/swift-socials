
import Immutable from 'immutable';
import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { getFieldComponents } from '../lib/field-factory';
import { getDefaultFormData, Template } from '../lib/template';

type TemplateFormProps = {
	template: Template,
	onFormUpdate?: (data: any) => void
}

export const TemplateForm = ({template, onFormUpdate = () => {}}: TemplateFormProps) => {

	const [formData, setFormData] = useState<Immutable.Map<string, any>>(Immutable.Map());

	useEffect(() => {
		const newFormData: Immutable.Map<string, any> = Immutable.Map(getDefaultFormData(template));
		setFormData(newFormData);
	}, [template, onFormUpdate]);

	const setFieldData = (name: string, value: any) => {
		const newFormData = formData.set(name, value);
		setFormData(newFormData);
		onFormUpdate(newFormData.toJS());
	};
	

	return (
		<>
			<Form>
				{template.form.map(field => (
					<Row key={field.name}>
						<Col>
							{getFieldComponents(field).field({
								field,
								onFieldUpdate: value => setFieldData(field.name, value)
							})}
						</Col>
					</Row>
				))}
			</Form>
		</>
	);
};