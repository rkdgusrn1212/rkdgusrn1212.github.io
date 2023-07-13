import { useMemo } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.scss';
import linkList from 'assets/link-list.json';

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
          <Nav className="w-100">
            {Object.entries(pages).map((entry, idx, entries) => (
              <Nav.Link
                key={entry[0]}
                href={entry[0]}
                active={entry[1].active}
                className={idx == entries.length - 1 ? 'me-auto' : undefined}
              >
                {entry[1].name}
              </Nav.Link>
            ))}
            <div className="d-flex gap-3">
              <Nav.Link href={linkList['my-github']}>
                <img width="20" height="20" className={styles.githubIcon} />
              </Nav.Link>
              <Nav.Link href={linkList['my-beakjoon']}>
                <p className={styles.beakjoonIcon + ' mb-0'}>{'/< >'}</p>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
