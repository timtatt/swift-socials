import { Navbar, Container, Nav } from 'react-bootstrap';
import packageInfo from './../../package.json';

export const Header = () => {
	return (
		<Navbar bg="primary" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Swift Socials Alpha {packageInfo.version}</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-nav" />
				<Navbar.Collapse id="main-nav">
					<Nav className="me-auto">
						<Nav.Link href="/templates">Templates</Nav.Link>
						<Nav.Link href="/posts">Posts</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};