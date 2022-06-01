import { useEffect, useRef, useState } from 'react';
import { db } from './../lib/database';
import { Template } from './../lib/templates/template';
import Editor from "@monaco-editor/react";
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import PreviewTemplate from './PreviewTemplate';

import { Container, Row, Col, Button, Form, Card, Tabs, Tab } from 'react-bootstrap';
import Mustache from 'mustache';


export default function App() {
	const cssEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
	const htmlEditor = useRef<monaco.editor.IStandaloneCodeEditor>();

	const [postHtml, setPostHtml] = useState("");
	const [postStyle, setPostStyle] = useState("");
	const [template, setTemplate] = useState<Template | null>(null);

	useEffect(() => {
		db.getTemplate().then(template => {
			setTemplate(template);
			setPostHtml(template.layout);
			setPostStyle(template.style);
		});
	}, []);

	const saveTemplate = () => {
		if (template) {
			template.layout = postHtml;
			template.style = postStyle;
			template.save();
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
				const renderedHtml = Mustache.render(value, template.getDummyData());
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

	let field;
	let dummyData;
	if (template) {
		field = <Form.Control type="text" value={template.name} onChange={event => template.name = event.target.value} />;
		dummyData = (
			<Card body>
				<Card.Title>Sample Data</Card.Title>
				<pre>
					<code>{JSON.stringify(template.getDummyData(), null, 2)}</code>
				</pre>
			</Card>
		);
	}

	return (
		<div className="App">
			<Container fluid>
				<Row className="g-0">
					<Col>
						<PreviewTemplate layout={postHtml} style={postStyle} />
						<Row>
							<Col>{field}</Col>
						</Row>
						<Row>
							<Col>
								<Button onClick={saveTemplate}>Save Template</Button>
							</Col>
						</Row>
					</Col>
					<Col>
						{dummyData}
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

				</Row>
			</Container>
		</div>
	);
}
