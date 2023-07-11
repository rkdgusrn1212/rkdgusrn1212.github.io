import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import githubMark from './github-mark-white.svg';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <Container fluid="true" className="bg-dark bg-gradient">
      <Row className="p-1">
        <Col>
          <h1 className="text-light text-center">9Log</h1>
        </Col>
        <Col className="d-flex flex-wrap justify-content-evenly align-items-center">
          <a className={styles.a} href="http://www.github.com/rkdgusrn1212">
            <img
              alt="github-logo"
              width="20px"
              height="20px"
              src={githubMark}
            />
            &nbsp;@rkdgusrn1212
          </a>
          <a className={styles.a} href="https://solved.ac/profile/khgkjg12">
            <span style={{ color: 'lightgray' }}>BAE</span>
            <span style={{ color: 'skyblue' }}>{'/<'}</span>
            <span style={{ color: 'lightgray' }}>JOON</span>
            <span style={{ color: 'skyblue' }}>{'>'}</span> khgkjg12
            <span style={{ color: 'gold' }}>[5]</span>
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
