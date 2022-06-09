import { db } from './../lib/database';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Template } from '../lib/templates/template';
import { Layout } from '../common/Layout';
import { Button } from 'react-bootstrap';

type TemplateWithId = {
	id: number,
	template: Template
}

export const TemplateList = () => {

	const [templates, setTemplates] = useState<TemplateWithId[]>();

	useEffect(() => {
		const templatesList: TemplateWithId[] = [];
		
		db.templates.each((template, cursor) => {
			templatesList.push({
				id: cursor.primaryKey,
				template
			});
		}).then(() => {
			setTemplates(templatesList);
		});
	}, []);

	return (
		<Layout>
			<h1>Template List</h1>
			<Button>Create Template</Button>
			{templates?.map(({id, template}) => <Link key={id} to={`/templates/${id}`}>{template.name}</Link>)}
		</Layout>
	)
};