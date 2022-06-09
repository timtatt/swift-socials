import { useEffect, useRef, useState } from 'react';
import { db } from './../lib/database';
import { Template } from './../lib/templates/template';
import Editor from "@monaco-editor/react";
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import TemplatePreview from './TemplatePreview';
import FormEditor from './FormEditor';

import { Container, Row, Col, Button, Form, Card, Tabs, Tab, Alert } from 'react-bootstrap';
import Mustache from 'mustache';
import { getDummyData, saveTemplate } from './../lib/templates/template';
import { Field } from '../lib/templates/fields';
import Immutable from 'immutable';
import { useParams } from 'react-router-dom'
import { Layout } from './../common/Layout';

interface AlertState {
	message?: string,
	show: boolean
}

export default function TemplateEditor() {
	const cssEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
	const htmlEditor = useRef<monaco.editor.IStandaloneCodeEditor>();

	const params = useParams();

	const [alert, setAlert] = useState<AlertState>({
		show: false,
		message: "oops"
	});
	const [postHtml, setPostHtml] = useState("");
	const [postStyle, setPostStyle] = useState("");
	const [dummyData, setDummyData] = useState<any>({});
	const [template, setTemplate] = useState<Template | null>(null);

	useEffect(() => {
		const templateId = Number(params.templateId)
		if (isNaN(templateId)) {
			setAlert({
				show: true,
				message: 'Template id is not valid'
			});
			return;
		}

		db.getTemplate(templateId).then(template => {
			setTemplate(template);
			setDummyData(getDummyData(template));
			setPostHtml(template.layout);
			setPostStyle(template.style);
		}).catch((err: Error) => {
			setAlert({
				show: true,
				message: err.message
			});
		});
	}, [params]);

	const saveTemplateToDb = () => {
		if (template) {
			template.layout = postHtml;
			template.style = postStyle;
			saveTemplate(template);
		}
	}

	// TODO: update styles when no marker is updated
	const updateStyles = (value: string | undefined) => {
		if (value && template) {
			console.log('updated styles');
			setPostStyle(value);
		}
	}

	const updateHtml = (value: string | undefined) => {
		if (value && template) {
			try {
				const renderedHtml = Mustache.render(value, dummyData);
				setPostHtml(renderedHtml);
			} catch (err) {
				console.debug('Unable to render mustache', err);
			}
		}
	}

	const updateCssLint = (monaco: Monaco) => {
		monaco.languages.css.cssDefaults.setOptions({
			lint: {
				emptyRules: "ignore"
			}
		})
	}

	const fieldsUpdated = (fields: Immutable.List<Field>) => {
		if (template) {
			template.form = [];

			for (const field of fields) {
				template.form.push(field);
			}

			setDummyData(getDummyData(template));
			saveTemplateToDb();
		}
	}

	return template ? (
		<Layout>
			<Container fluid>
				<Row className="g-0">
					<Col>
						<TemplatePreview layout={postHtml} style={postStyle} />
						<Row>
							<Col>
								<Form.Control type="text" defaultValue={template.name} onChange={event => template.name = event.target.value} />
							</Col>
						</Row>
						<Row>
							<Col>
								<Button onClick={saveTemplateToDb}>Save Template</Button>
							</Col>
						</Row>
					</Col>
					<Col>
						<Card body>
							<Card.Title>Sample Data</Card.Title>
							<pre>
								<code>{JSON.stringify(dummyData, null, 2)}</code>
							</pre>
						</Card>
					</Col>
					<Col>
						<Tabs>
							<Tab eventKey="layout" title="Layout">
								<Editor
									height="90vh"
									defaultLanguage="html"
									theme="vs-dark"
									onMount={editor => htmlEditor.current = editor}
									defaultValue={postHtml}
									onChange={updateHtml}
								/>
							</Tab>
							<Tab eventKey="styles" title="Styles">
								{/* TODO scope css to prevent affecting the template page */}
								<Editor
									height="90vh"
									defaultLanguage="css"
									theme="vs-dark"
									onMount={editor => cssEditor.current = editor}
									defaultValue={postStyle}
									beforeMount={updateCssLint}
									onChange={updateStyles}
								/>
							</Tab>
						</Tabs>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormEditor fields={template.form} onFieldUpdate={fieldsUpdated} />
					</Col>
				</Row>
			</Container>
		</Layout>
	) : (
		<Layout>
			{alert.show ? <Alert variant="danger">{alert.message}</Alert> : ""}
		</Layout>
	);

}
