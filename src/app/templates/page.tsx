import { TemplateList } from "@/modules/templates/TemplateList";
import { BsPlusCircleFill } from 'react-icons/bs';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { db } from '@/common/lib/database';
import Link from "next/link";
import ClientComponent from "@/common/components/ClientComponent";


export default async function TemplatesPage() {
	await db.connect();

	const templates = await db.getTemplates();
	// const mapped = templates.map((template: any) => {
	// 	console.log(template.toJSON())
	// 	return template.toJSON()
	// });

	console.log(templates);

	return <>
		<Row className="bg-dark py-5 text-center">
			<h2 className="display-5 fw-bold">My Templates</h2>
			<p className="fs-4">Create, edit or delete your templates</p>
		</Row>
		<Container className="my-3">
			<Row>
				<Col>
					<TemplateList templates={templates} />
				</Col>
			</Row>
			<Row>
				<Col className="text-center">
					<Link href="/templates/new"><Button size="lg"><BsPlusCircleFill /> Create Template</Button></Link>
				</Col>
			</Row>
		</Container>
	</>
}
