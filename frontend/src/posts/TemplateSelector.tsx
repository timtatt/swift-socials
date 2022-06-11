import { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import placeholder from './../assets/placeholder.jpeg';
import './Posts.scss';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Template } from '../lib/templates/template';
import { db } from './../lib/database';

type TemplateSelectorProps = {
	onSelect?: (template: Template) => void
}

export const TemplateSelector = ({onSelect = () => {}}: TemplateSelectorProps) => {

	const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
	const [templates, setTemplates] = useState<Map<number, Template>>(new Map());

	const selectTemplate = (template: Template) => {
		setSelectedTemplate(selectedTemplate == template ? null : template)
	}

	useEffect(() => {
		const templateMap = new Map<number, Template>();
		db.templates.toCollection().each((template, cursor) => {
			templateMap.set(cursor.primaryKey, template);
		}).then(() => {
			setTemplates(templateMap);
		});
	}, []);
	
	return (
		<>
			<Container fluid className="p-4">
				<Row md={6} className="g-4 mt-2">
					{Array.from(templates.entries()).map(([templateId, template]) => {
						return (
							<Col key={templateId}>
								<Card className={`thickboy ${selectedTemplate == template ? 'selected' : ''}`} border={selectedTemplate == template ? 'primary' : ''} onClick={() => selectTemplate(template)}>
									<Card.Img src={placeholder} variant="top" />
									<Card.Body>
										<Card.Title>{template.name}</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						)
					})}
					
				</Row>
				{selectedTemplate != null ? (
					<Row className="mt-4">
						<Col className="text-center">
							<Button size="lg" onClick={() => onSelect(selectedTemplate)}>Create Post <FaLongArrowAltRight /></Button>
						</Col>
					</Row>
				) : ''}
			</Container>
		</>
	)
};