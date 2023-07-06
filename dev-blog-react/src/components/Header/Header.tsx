import { useMemo } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styles from './Header.module.scss';

export interface HeaderProps {
  activeHref: '/' | '/#/posts' | '/#/projects';
}

const Header: React.FC<HeaderProps> = ({ activeHref }) => {
  const pages = useMemo(() => {
    const result = {
      '/': { name: 'Home', active: false },
      '/#/posts': { name: 'Posts', active: false },
      '/#/projects': { name: 'Projects', active: false },
    };
    if (activeHref) {
      result[activeHref].active = true;
    }
    return result;
  }, [activeHref]);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className={styles.header}
    >
      <Container>
        <Navbar.Brand href="/">9Log</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" role="navigation">
          <Nav className="me-auto">
            {Object.entries(pages).map((entry) => (
              <Nav.Link key={entry[0]} href={entry[0]} active={entry[1].active}>
                {entry[1].name}
              </Nav.Link>
            ))}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
