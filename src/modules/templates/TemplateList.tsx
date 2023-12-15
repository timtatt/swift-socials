'use client';

import { ButtonWithConfirm } from '@/common/components/ButtonWithConfirm';
import { Row, Button, Col, Table, Container } from 'react-bootstrap';

import { useRouter } from 'next/navigation';
import { Template } from '@/common/types/template';

type Templates = {
	[key: number]: Template
}

type TemplateListProps = {
	templates: Template[]
}

export const TemplateList = ({ templates }: TemplateListProps) => {

	// const [templates, setTemplates] = useState<Templates>({});
	const router = useRouter();

	// const deleteTemplate = (templateId: number) => {
	// 	if (templates) {
	// 		db.templates.delete(templateId)
	// 			.then(() => {
	// 				delete templates[templateId];
	// 				// setTemplates(Object.assign({}, templates));
	// 			});
	// 	}
	// }

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
								<td className="me-auto">
									<>{template.name} {template.id}</>
								</td>
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
	</>
}
