import { Navbar, Container, Nav } from 'react-bootstrap';
import packageInfo from './../../package.json';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<Navbar bg="primary" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Swift Socials Alpha {packageInfo.version}</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-nav" />
				<Navbar.Collapse id="main-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/templates">Templates</Nav.Link>
						<Nav.Link as={Link} to="/posts/new">Posts</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};