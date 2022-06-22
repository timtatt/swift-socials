import { db } from './../lib/database';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Template } from '../lib/template';
import { Layout } from '../common/Layout';
import { ButtonWithConfirm } from './../common/ButtonWithConfirm';
import { Row, Button, Col, Table, Container } from 'react-bootstrap';
import { BsPlusCircleFill } from 'react-icons/bs';
import Immutable from 'immutable';


export const TemplateList = () => {

	const [templates, setTemplates] = useState<Immutable.Map<number, Template>>();
	const navigate = useNavigate();

	useEffect(() => {
		const templatesList = new Map<number, Template>();
		
		db.templates.each((template, cursor) => {
			templatesList.set(cursor.primaryKey, template);
		}).then(() => {
			setTemplates(Immutable.Map(templatesList));
		});
	}, []);

	const deleteTemplate = (templateId: number) => {
		if (templates) {
			db.templates.delete(templateId).then(() => {
				setTemplates(templates.delete(templateId));
			});
		}
	}

	return (
		<Layout>
			<Row className="bg-dark py-5 text-center">
				<h2 className="display-5 fw-bold">My Templates</h2>
				<p className="fs-4">Create, edit or delete your templates</p>
			</Row>
			<Container className="my-3">
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
								{templates?.toArray().map(([templateId, template]) => (
									<tr key={templateId}>
										<td className="me-auto">{template.name}</td>
										<td className="text-end">
											<Button size="sm" className="me-2" variant="secondary" onClick={() => navigate(`/templates/${templateId}`)}>Edit</Button>
											{/* <Button size="sm" variant="outline-danger" onClick={() => deleteTemplate(templateId)}>Delete</Button> */}
											<ButtonWithConfirm confirmText="Are you sure you want to delete this template" confirmButtonText="Delete" variant="outline-danger" size="sm" />
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col className="text-center">
						<Button size="lg" onClick={() => navigate(`/templates/new`)}><BsPlusCircleFill /> Create Template</Button>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
};