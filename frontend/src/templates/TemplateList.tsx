import { db } from './../lib/database';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Template } from '../lib/templates/template';

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
		<>
			<h1>Template List</h1>
			{templates?.map(({id, template}) => <Link to={`/templates/${id}`}>{template.name}</Link>)}
		</>
	)
};