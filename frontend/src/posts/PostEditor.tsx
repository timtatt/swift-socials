import { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { getDefaultFormData, Template } from '../lib/template';
import { TemplatePreview } from '../templates/TemplatePreview';
import { TemplateForm } from './TemplateForm';
import { toPng } from 'html-to-image';

type PostEditorProps = {
	template: Template
}

export const PostEditor = ({ template }: PostEditorProps) => {

	const [layout, setLayout] = useState<string>("");
	const [formData, setFormData] = useState<any>({});

	const previewRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (template && template.layout) {
			setLayout(template.layout);
			setFormData(getDefaultFormData(template));
		}
	}, [template]);

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
	);
};