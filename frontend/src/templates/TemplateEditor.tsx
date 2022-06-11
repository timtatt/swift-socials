import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { db } from './../lib/database';
import { Template, templateSizes } from './../lib/templates/template';
import Editor from "@monaco-editor/react";
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { TemplatePreview } from './TemplatePreview';
import FormEditor from './FormEditor';
import tinykeys from "tinykeys";

import { Container, Row, Col, Button, Form, Tabs, Tab, Alert, Breadcrumb } from 'react-bootstrap';
import { getDefaultFormData, saveTemplate } from './../lib/templates/template';
import { Field } from '../lib/templates/fields';
import Immutable from 'immutable';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Layout } from './../common/Layout';
import { ToastContainer, toast } from 'react-toastify';

interface AlertState {
	message?: string,
	show: boolean
}

export default function TemplateEditor() {
	const cssEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
	const htmlEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
	const templatePreviewRef = useRef<HTMLDivElement>(null);

	const params = useParams();
	const navigate = useNavigate();

	const [alert, setAlert] = useState<AlertState>({
		show: false,
		message: "oops"
	});

	const [dummyData, setDummyData] = useState<any>({});
	const [template, setTemplate] = useState<Template | null>(null);

	useEffect(() => {
		const unsubscribe = tinykeys(window, {
			'$mod+s': event => {
				saveTemplateToDb();
				event.preventDefault();
			}
		});

		return () => {
			unsubscribe();
		}
	}, []);

	useEffect(() => {
		if (params.templateId === 'new') {
			const template = {
				style: ".Post {\n\n}",
				layout: "<div class=\"Post\">New Post</div>",
				name: "New Template",
				form: [],
				size: {
					width: 1200,
					height: 1200,
				}
			};
			// TODO convert to useEffect for template
			setTemplate(template);
			setDummyData(getDefaultFormData(template));
		} else {
			const templateId = Number(params.templateId);
			if (isNaN(templateId)) {
				setAlert({
					show: true,
					message: 'Template id is not valid'
				});
				return;
			}

			db.getTemplate(templateId).then(template => {
				setTemplate(template);
				setDummyData(getDefaultFormData(template));
			}).catch((err: Error) => {
				setAlert({
					show: true,
					message: err.message
				});
			});
		}
	}, [params]);

	const saveTemplateToDb = async () => {
		if (template) {
			setTemplate(Object.assign({}, template));
			await saveTemplate(template);

			if (params.templateId === 'new') {
				navigate(`/templates/${template.id}`);
			}

			toast.success(`Saved: ${template.name}`, {
				theme: "colored"
			});
		}
	}

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
			template.size = templateSizes.get(event.target.value)!;
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

	const fieldsUpdated = (fields: Immutable.List<Field>) => {
		if (template) {
			template.form = [];

			for (const field of fields) {
				template.form.push(field);
			}

			setDummyData(getDefaultFormData(template));
			saveTemplateToDb();
		}
	}

	return template ? (
		<Layout>
			<Container>
				<Row>
					<Col>
						<Breadcrumb className="my-3">
							<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
							<Breadcrumb.Item linkAs={Link} linkProps={{to: "/templates"}}>Templates</Breadcrumb.Item>
							<Breadcrumb.Item href="#">{template.name}</Breadcrumb.Item>
						</Breadcrumb>
						<h2 className="h3">Edit Template: {template.name}</h2>
					</Col>
				</Row>
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
								{Array.from(templateSizes.entries()).map(([key, size]) => <option value={key}>{size.name}</option>)}
							</Form.Select>
						</Form.Group>
						<Button onClick={saveTemplateToDb}>Save Template</Button>
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
						<TemplatePreview ref={templatePreviewRef} layoutProperties={dummyData} size={template.size} layout={template.layout} style={template.style} />
					</Col>
				</Row>
				<hr />
				<h3 className="h5 my-3">Template Form Editor</h3>
				<Row>
					<Col>
						<FormEditor fields={template.form} onFieldUpdate={fieldsUpdated} />
					</Col>
				</Row>
			</Container>
			<ToastContainer position="bottom-right" newestOnTop={true} autoClose={3000} />
		</Layout>
	) : (
		<Layout>
			{alert.show ? <Alert variant="danger">{alert.message}</Alert> : ""}
		</Layout>
	);

}
