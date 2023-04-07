import TemplateEditor from "@/modules/templates/TemplateEditor";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb, Alert, } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { db } from '@/common/lib/database';
import { saveTemplate } from "@/common/lib/database";
import { Template } from "@/common/types/template";
import Link from "next/link";

type AlertState = {
	message?: string,
	show: boolean
}

export default function EditTemplate() {
	const router = useRouter();

	const [alert, setAlert] = useState<AlertState>({
		show: false,
		message: "oops"
	});

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

	async function saveTemplateToDb(template: Template) {
		await saveTemplate(template);

		router.push(`/templates/${template.id}`);
	}

	return <>
		<Container>
			<Row>
				<Col>
					<Breadcrumb className="my-3">
						<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
						<Breadcrumb.Item linkAs={Link} href="/templates">Templates</Breadcrumb.Item>
						<Breadcrumb.Item href="#">New Template</Breadcrumb.Item>
					</Breadcrumb>
					<h2 className="h3">New Template</h2>
				</Col>
			</Row>
			<Row>
				<Col>
					{alert.show && <Alert variant="danger">{alert.message}</Alert>}
					<TemplateEditor onSave={saveTemplateToDb} template={template} onError={message => setAlert({ show: true, message })} />
				</Col>
			</Row>
		</Container>
		<ToastContainer position={'bottom-right'} newestOnTop={true} autoClose={3000} />
	</>
}