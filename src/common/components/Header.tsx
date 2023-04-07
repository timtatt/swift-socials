import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import pkg from '@/../package.json';

export type HeaderProps = {
	version: string
}

export const Header = ({ version }: HeaderProps) => {
	const [info, setInfo] = useState(null);

	// useEffect({

	// }, []);

	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Swift Socials</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-nav" />
				<Navbar.Collapse id="main-nav">
					<Nav className="me-auto">
						<Nav.Link href="/templates">My Templates</Nav.Link>
						<Nav.Link href="/posts/new">Create Post</Nav.Link>
					</Nav>
					<Navbar.Text>
						Alpha v{version}
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};



