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

	if (!router.query.templateId || typeof router.query.templateId !== "string") {
		router.push('/templates/new');
		return;
	}

	const templateId = parseInt(router.query.templateId);

	const [template, setTemplate] = useState<Template | null>(null);

	const [alert, setAlert] = useState<AlertState>({
		show: false,
		message: "oops"
	});

	useEffect(() => {
		db.getTemplate(templateId).then(template => {
			setTemplate(template);
		}).catch((err: Error) => {
			setAlert({
				show: true,
				message: err.message
			});
		});
		// }
	}, [router.query.templateId]);

	const saveTemplateToDb = useCallback(async () => {
		if (template) {
			setTemplate(Object.assign({}, template));
			await saveTemplate(template);

			toast.success(`Saved: ${template.name}`, {
				theme: "colored"
			});
		}
	}, []);

	return template && <>
		<Container>
			<Row>
				<Col>
					<Breadcrumb className="my-3">
						<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
						<Breadcrumb.Item linkAs={Link} href="/templates">Templates</Breadcrumb.Item>
						<Breadcrumb.Item href="#">{template.name}</Breadcrumb.Item>
					</Breadcrumb>
					<h2 className="h3">Edit Template: {template.name}</h2>
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