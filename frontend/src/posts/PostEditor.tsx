import { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { getDefaultFormData, Template } from '../lib/template';
import { TemplatePreview } from '../templates/TemplatePreview';
import { TemplateForm } from './TemplateForm';
import { toPng } from 'html-to-image';
import { BsFillCaretLeftFill, BsDownload } from 'react-icons/bs';

type PostEditorProps = {
	template: Template,
	onChangeTemplate?: () => void
}

export const PostEditor = ({ template, onChangeTemplate = () => {} }: PostEditorProps) => {

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
			<Container fluid className="my-3">
				<Row>
					<Col md={4}>
						<TemplatePreview ref={previewRef} layoutProperties={formData} size={template.size} layout={layout} style={template.style} />
					</Col>
					<Col>
						<Button onClick={onChangeTemplate} variant="secondary" className="mb-3"><BsFillCaretLeftFill /> Change Template</Button>
						<TemplateForm template={template} onFormUpdate={data => setFormData(data)} />
						<Button onClick={exportPost} className="mt-2"><BsDownload /> Export Post</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};