import { Stack, Container } from 'react-bootstrap';
import styles from './Footer.module.scss';
import logo from 'assets/blog/logo.png';
import linkList from 'assets/link-list.json';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Container fluid="md">
        <Stack direction="horizontal" className="w-100">
          <img
            width="100px"
            height="100px"
            src={logo}
            className="ms-md-5 ms-xs-1 me-1 my-2"
          />
          <p id={styles.copyright}>
            Copyright ©️ 2022. 강현구. All Rights Reserved.
          </p>
          <a className={styles.a} href={linkList['my-github']}>
            <div id={styles.githubIcon} />
            <span className={'d-none d-md-block ' + styles.text} id="text">
              @rkdgusrn1212
            </span>
          </a>
          <a className={styles.a} href={linkList['my-beakjoon']}>
            <span id={styles.beakjoonIcon}>
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
};

export default Footer;
