import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Layout } from '../common/Layout';
import { getDefaultFormData, Template } from '../lib/templates/template';
import { TemplatePreview } from '../templates/TemplatePreview';
import { TemplateForm } from './TemplateForm';
import { db } from './../lib/database';
import { toPng } from 'html-to-image';

export const PostEditor = () => {

	const [template, setTemplate] = useState<Template>();
	const [layout, setLayout] = useState<string>("");
	const [formData, setFormData] = useState<any>({});

	const previewRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (template && template.layout) {
			setLayout(template.layout);
		}
	}, [template]);

	const loadTemplate = (event: ChangeEvent<HTMLSelectElement>) => {
		const templateId = Number(event.target.value);
		if (!isNaN(templateId)) {
			db.templates.get(templateId).then(setTemplate).catch(console.error);
		}
	}

	const exportPost = () => {
		if (previewRef.current) {
			toPng(previewRef.current, {
				cacheBust: true,
			})
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = 'post-export.png';
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}


	return (
		<Layout>
			<Form.Select defaultValue={template?.id} onChange={loadTemplate}>
				<option value="">No Template</option>
				<option value={13}>Test Template</option>
			</Form.Select>

			{template ? (
				<>
					<Container fluid>
						<Row>
							<Col md={4}>
								<TemplatePreview ref={previewRef} layoutProperties={formData} size={template.size} layout={layout} style={template.style} />
								<Button onClick={exportPost}>Export Post</Button>
							</Col>
							<Col>
								<TemplateForm template={template} onFormUpdate={data => setFormData(data)} />
							</Col>
						</Row>
					</Container>
				</>
			) : ""}

		</Layout>
	);
};