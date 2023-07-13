import { useMemo } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styles from './Header.module.scss';

export interface HeaderProps {
  activeHref: '/' | '/#/posts' | '/#/projects';
}

const Header: React.FC<HeaderProps> = ({ activeHref }) => {
  const pages = useMemo(() => {
    const result = {
      '/': { name: '블로그 홈', active: false },
      '/#/posts': { name: '내 포스트들', active: false },
      '/#/projects': { name: '내 프로젝트들', active: false },
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
