import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './App.scss';
import CSS from 'csstype';
import domToImage from 'dom-to-image';
import fileSaver from 'file-saver';
import { db } from './lib/database';
import { Template } from './lib/templates/template';
import Editor from "@monaco-editor/react";
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import Parser from 'html-react-parser';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import Mustache from 'mustache';

const previewProps: CSS.Properties = {
	background: 'red',
	width: '400px',
	height: '400px'
}

export default function App() {
	const previewRef = useRef(null);
	const cssEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
	const htmlEditor = useRef<monaco.editor.IStandaloneCodeEditor>();

	const [postHtml, setPostHtml] = useState("");
	const [postStyle, setPostStyle] = useState("");
	const [template, setTemplate] = useState<Template | null>(null);

	const exportDom = () => {
		if (previewRef && previewRef.current != null) {
			domToImage.toBlob(previewRef.current as Node).then((blob: Blob) => {
				fileSaver.saveAs(blob, 'test.png');
			});
		}
	}

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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (template) {
			template.name = e.target.value;
		}
	};

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
		field = <Form.Control type="text" value={template.name} onChange={handleChange} />;
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
						{/* TODO: scaling export to 1200x1200 */}
						<div style={previewProps} ref={previewRef}>
							{/* TODO: add sanitising for XSS */}
							{Parser(postHtml)}
							<style>{Parser(postStyle)}</style>
						</div>
						<Row>
							<Col>{field}</Col>
						</Row>
						<Row>
							<Col>
								<Button onClick={exportDom}>Export</Button>
								<Button onClick={saveTemplate}>Save Template</Button>
							</Col>
						</Row>
					</Col>
					<Col>
						{dummyData}
					</Col>
					<Col>
						<Editor
							height="90vh"
							defaultLanguage="html"
							theme="vs-dark"
							onMount={editor => htmlEditor.current = editor}
							defaultValue={postHtml}
							onChange={updateHtml}
						/>
					</Col>
					<Col>
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
					</Col>
				</Row>
			</Container>
		</div>
	);
}
