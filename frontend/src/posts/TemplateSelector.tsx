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
	const [templates, setTemplates] = useState<Template[]>([]);

	const selectTemplate = (template: Template) => {
		setSelectedTemplate(selectedTemplate == template ? null : template)
	}

	useEffect(() => {
		db.templates.toArray().then(storedTemplates => {
			setTemplates(storedTemplates);
		});		
	}, []);
	
	return (
		<>
			<Container fluid className="p-4">
				<Row md={6} className="g-4 mt-2">
					{templates.map((template, index) => {
						return (
							<Col key={index}>
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