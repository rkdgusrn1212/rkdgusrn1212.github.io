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
            <Button variant="primary">View {title}</Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
export default ProjectCard;
