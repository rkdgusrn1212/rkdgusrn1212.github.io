import { Stack, Container } from 'react-bootstrap';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <Container fluid="md">
        <Stack direction="horizontal" className="w-100">
          <img
            width="128px"
            height="128px"
            src="/react-static/logo512.png"
            className="me-auto mx-5 my-2"
          />
          <a className={styles.a} href="http://www.github.com/rkdgusrn1212">
            <img id={styles.githubIcon} />
            <span className={'d-none d-md-block ' + styles.text} id="text">
              @rkdgusrn1212
            </span>
          </a>
          <a className={styles.a} href="https://solved.ac/profile/khgkjg12">
            <span id={styles.beakjunIcon}>
              BAE
              <span className={styles.character}>{'/<'}</span>
              JOON
              <span className={styles.character}>{'>'}</span>
            </span>
            <span className={'d-none d-md-block ' + styles.text}>khgkjg12</span>
          </a>
        </Stack>
      </Container>
    </div>
  );
}

export default Footer;
