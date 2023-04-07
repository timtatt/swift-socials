import { useEffect, useState } from 'react';
import { ButtonWithConfirm } from '@/common/components/ButtonWithConfirm';
import { Row, Button, Col, Table, Container } from 'react-bootstrap';
import { BsPlusCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Template } from '@/common/types/template';
import { db } from '@/common/lib/database';

type Templates = {
	[key: number]: Template
}

export const TemplateList = () => {

	const [templates, setTemplates] = useState<Templates>({});
	const router = useRouter();

	useEffect(() => {
		const templatesList: Templates = {}

		db.templates
			.each((template, cursor) => templatesList[cursor.primaryKey] = template)
			.then(() => setTemplates(templatesList));

		return () => {
			setTemplates({});
		}
	}, []);

	const deleteTemplate = (templateId: number) => {
		if (templates) {
			db.templates.delete(templateId)
				.then(() => {
					delete templates[templateId];
					setTemplates(Object.assign({}, templates));
				});
		}
	}

	return <>
		<Row>
			<Col>
				<Table striped bordered>
					<thead>
						<tr>
							<th>Template Name</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(templates).map(([templateId, template]) => (
							<tr key={templateId}>
								<td className="me-auto">{template.name}</td>
								<td className="text-end">
									<Button size="sm" className="me-2" variant="secondary" onClick={() => router.push(`/templates/${templateId}`)}>Edit</Button>
									{/* <Button size="sm" variant="outline-danger" onClick={() => deleteTemplate(templateId)}>Delete</Button> */}
									<ButtonWithConfirm confirmText="Are you sure you want to delete this template" confirmButtonText="Delete" variant="outline-danger" size="sm">Delete</ButtonWithConfirm>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Col>
		</Row>
		<Row>
			<Col className="text-center">
				<Button size="lg" onClick={() => router.push(`/templates/new`)}><BsPlusCircleFill /> Create Template</Button>
			</Col>
		</Row>
	</>
};