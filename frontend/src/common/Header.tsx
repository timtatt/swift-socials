import { Navbar, Container, Nav } from 'react-bootstrap';
import packageInfo from './../../package.json';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<Navbar bg="primary" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Swift Socials</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-nav" />
				<Navbar.Collapse id="main-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/templates">My Templates</Nav.Link>
						<Nav.Link as={Link} to="/posts/new">Create Post</Nav.Link>
					</Nav>
					<Navbar.Text>
						Alpha v{packageInfo.version}
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};