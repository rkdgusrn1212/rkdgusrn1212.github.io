import { Stack, Container } from 'react-bootstrap';
import githubMark from './github-mark-white.svg';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className="bg-dark bg-gradient">
      <Container fluid="md">
        <Stack direction="horizontal" className="w-100">
          <h1 className="text-light me-auto px-5 py-1">9Log</h1>
          <a
            className={'d-flex align-items-center px-2 py-2 ' + styles.a}
            href="http://www.github.com/rkdgusrn1212"
          >
            <img
              alt="github-logo"
              width="20px"
              height="20px"
              src={githubMark}
            />
            <span className="d-none d-md-block">&nbsp;@rkdgusrn1212</span>
          </a>
          <a
            className={'px-2 py-2 ' + styles.a}
            href="https://solved.ac/profile/khgkjg12"
          >
            <span style={{ color: 'lightgray' }}>BAE</span>
            <span style={{ color: 'skyblue' }}>{'/<'}</span>
            <span style={{ color: 'lightgray' }}>JOON</span>
            <span style={{ color: 'skyblue' }}>{'>'}</span>
            <span className="d-none d-md-inline">
              {' '}
              khgkjg12
              <span style={{ color: 'gold' }}>[5]</span>
            </span>
          </a>
        </Stack>
      </Container>
    </div>
  );
}

export default Footer;
