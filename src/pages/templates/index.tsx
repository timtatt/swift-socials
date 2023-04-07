import { TemplateList } from "@/modules/templates/TemplateList";
import { Layout } from "@/common/components/Layout";
import { Row, Col, Container } from 'react-bootstrap';

export default function Templates() {
	return <>
		<Row className="bg-dark py-5 text-center">
			<h2 className="display-5 fw-bold">My Templates</h2>
			<p className="fs-4">Create, edit or delete your templates</p>
		</Row>
		<Container className="my-3">
			<Row>
				<Col>
					<TemplateList />
				</Col>
			</Row>
		</Container>
	</>
}