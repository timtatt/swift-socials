import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Layout } from '@/common/components/Layout';
import { PostEditor } from '@/modules/posts/PostEditor';
import { TemplateSelector } from '@/modules/posts/TemplateSelector';
import { Template } from '@/common/types/template';

export default function PostCreator() {

	const [template, setTemplate] = useState<Template | null>();

	return !template ? (
		<>
			<Row className="bg-dark py-5 text-center">
				<h2 className="display-5 fw-bold">Create a Post</h2>
				<p className="fs-4">Choose a template from below to get started with your post</p>
			</Row>
			{/* TODO: add search for templates */}
			<TemplateSelector onSelect={selectedTemplate => setTemplate(selectedTemplate)} />
		</>
	) : (
		<>
			<Row className="bg-dark py-5 text-center">
				<h2 className="display-5 fw-bold">Create a Post</h2>
				<p className="fs-4">Use the form to modify your post</p>
			</Row>
			<PostEditor template={template} onChangeTemplate={() => setTemplate(null)} />
		</>
	)
}