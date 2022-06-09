import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Layout } from '../common/Layout';
import { Template } from '../lib/templates/template';
import { TemplatePreview } from '../templates/TemplatePreview';
import { db } from './../lib/database';
import { toPng } from 'html-to-image';

export const PostEditor = () => {

	const [template, setTemplate] = useState<Template>();
	const previewRef = useRef<HTMLDivElement>(null);

	useEffect(() => {

	});

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
					<TemplatePreview ref={previewRef} size={template.size} layout={template.layout} style={template.style} />
					{template.name}
					<Button onClick={exportPost}>Export Post</Button>
				</>
			) : ""}

		</Layout>
	);
};