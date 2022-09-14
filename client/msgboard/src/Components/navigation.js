import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AppRoutes from '../Routes/app_routes';

function Navigation() {
    return (
        <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/post">Post a Message!</Nav.Link>
                <Nav.Link href="/feed">Your Feed</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/profile">
                  Profile
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}


export default Navigation;