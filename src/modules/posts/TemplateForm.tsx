
import { getDefaultFormData, Template, TemplateFormData } from '@/common/types/template';
import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { getFieldComponents } from '@/common/lib/field-factory';

type TemplateFormProps = {
	template: Template,
	onFormUpdate?: (data: TemplateFormData) => void
}


export const TemplateForm = ({template, onFormUpdate = () => {}}: TemplateFormProps) => {

	const [formData, setFormData] = useState<TemplateFormData>({});

	useEffect(() => {
		const newFormData = getDefaultFormData(template);
		setFormData(newFormData);
	}, [template, onFormUpdate]);

	useEffect(() => {
		onFormUpdate(formData);
	}, [formData]);

	const setFieldData = (name: string, value: any) => {
		const newFormData = Object.assign({}, formData);
		newFormData[name] = value;
		setFormData(newFormData);
	};
	

	return (
		<>
			<Form>
				{template.form.map(field => (
					<Row key={field.name} className="mb-2">
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