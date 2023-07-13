import { Stack, Container } from 'react-bootstrap';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <Container fluid="md">
        <Stack direction="horizontal" className="w-100">
          <img
            width="100px"
            height="100px"
            src="/react-static/logo512.png"
            className="ms-md-5 ms-xs-1 me-1 my-2"
          />
          <p id={styles.copyright}>
            Copyright ©️ 2022. 강현구. All Rights Reserved.
          </p>
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
