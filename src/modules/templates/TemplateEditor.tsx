import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Template, templateSizes, getDefaultFormData } from '@/common/types/template';
import Editor from "@monaco-editor/react";
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { TemplatePreview } from './TemplatePreview';
import FormEditor from './FormEditor';
import tinykeys from "tinykeys";

import { Row, Col, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { Field } from '@/common/types/fields';

type TemplateEditorProps = {
	template: Template
	onSave: (template: Template) => void
	onError: (message: string) => void
}

export default function TemplateEditor({ onSave = () => { }, onError = () => {}, ...params }: TemplateEditorProps) {
	const cssEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
	const htmlEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
	const templatePreviewRef = useRef<HTMLDivElement>(null);

	const [dummyData, setDummyData] = useState<any>({});
	const [template, setTemplate] = useState<Template>(params.template);

	useEffect(() => {
		const unsubscribe = tinykeys(window, {
			'$mod+s': event => {
				onSave(template);
				event.preventDefault();
			}
		});

		setDummyData(getDefaultFormData(template));

		return () => {
			unsubscribe();
		}
	}, []);

	// TODO: update styles when no marker is updated
	const updateStyles = (value: string | undefined) => {
		if (value && template) {
			console.log('updated styles');
			template.style = value;
			setTemplate(Object.assign({}, template));
		}
	}

	const updateHtml = (value: string | undefined) => {
		if (value && template) {
			template.layout = value;
			setTemplate(Object.assign({}, template));
		}
	}

	const updateTemplateSize = (event: ChangeEvent<HTMLSelectElement>) => {
		if (template) {
			template.size = templateSizes[event.target.value] ?? templateSizes['1200x1200'];
			setTemplate(Object.assign({}, template));
		}
	}

	const updateCssLint = (monaco: Monaco) => {
		monaco.languages.css.cssDefaults.setOptions({
			lint: {
				emptyRules: "ignore"
			}
		})
	}

	const fieldsUpdated = (fields: Field[]) => {
		if (template) {
			template.form = [];

			for (const field of fields) {
				template.form.push(field);
			}

			setDummyData(getDefaultFormData(template));
			onSave(template);
		}
	}

	return template && <>
		<Row>
			<Col>
				<Form.Group>
					<Form.Label>Template Name</Form.Label>
					<Form.Control type="text" defaultValue={template.name} onChange={event => template.name = event.target.value} />
				</Form.Group>
			</Col>
			<Col>
				<Form.Group>
					<Form.Label>Template Size</Form.Label>
					<Form.Select defaultValue={template.name} onChange={updateTemplateSize}>
						{Object.entries(templateSizes).map(([key, size]) => <option value={key} key={key}>{size.name}</option>)}
					</Form.Select>
				</Form.Group>
				<Button onClick={() => onSave(template)}>Save Template</Button>
			</Col>
		</Row>
		<hr />
		<h3 className="h5 mb-3">Template Layout Editor</h3>
		<Row className="my-2">
			<Col>
				<Tabs defaultActiveKey="layout">
					<Tab eventKey="sample" title="Sample Data">
						<div className="p-4">
							<pre>
								<code>{JSON.stringify(dummyData, null, 2)}</code>
							</pre>
						</div>
					</Tab>
					<Tab eventKey="layout" title="Layout">
						<Editor
							height="70vh"
							defaultLanguage="html"
							theme="vs-dark"
							onMount={editor => htmlEditor.current = editor}
							defaultValue={template.layout}
							onChange={updateHtml}
						/>
					</Tab>
					<Tab eventKey="styles" title="Styles">
						{/* TODO scope css to prevent affecting the template page */}
						<Editor
							height="70vh"
							defaultLanguage="css"
							theme="vs-dark"
							onMount={editor => cssEditor.current = editor}
							defaultValue={template.style}
							beforeMount={updateCssLint}
							onChange={updateStyles}
						/>
					</Tab>
				</Tabs>
			</Col>
			<Col>
				<TemplatePreview ref={templatePreviewRef} layoutProperties={dummyData} size={template.size ?? templateSizes['1200x1200']} layout={template.layout} style={template.style} />
			</Col>
		</Row>
		<hr />
		<h3 className="h5 my-3">Template Form Editor</h3>
		<Row>
			<Col>
				<FormEditor fields={template.form} onFieldUpdate={fieldsUpdated} />
			</Col>
		</Row>
	</>
}
