import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './ProjectCard.module.scss';

export interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  link,
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    /*
    noopener : 새 탭의 window.openner 참조를 null로 만든다. 원 페이지와의 브라우저 컨텍스트를 분리하여 원 페이지 컨텍스트 참조를 원천 차단함.
    If this feature is set, the new window will not have access to the originating window via Window.opener and returns null. 
    noreferrer : 페이지 HTTP 요청에서 referer라는 헤더를 제거. 그러면 페이지 요청을 받는 서버 입장에서는 이전 페이지에 대한 정보를 알 수가 없게된다. 
    If this feature is set, the browser will omit the Referer header, as well as set noopener to true. See rel="noreferrer" for more information.
    */
    window.open(link, '_blank', 'noopener noreferrer');
  };

  return (
    <Card className={styles.card}>
      <Row className="g-0">
        <Col xs={4} md={12}>
          <div
            className={styles.previewImage}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </Col>
        <Col xs={8} md={12}>
          <Card.Body className={styles.previewContent}>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button className={styles.button} size="sm" onClick={handleClick}>
              프로젝트 보기
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
export default ProjectCard;
