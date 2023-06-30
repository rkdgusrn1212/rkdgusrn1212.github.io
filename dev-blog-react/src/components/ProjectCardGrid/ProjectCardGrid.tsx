import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProjectCard, { ProjectCardProps } from './ProjectCard';

export interface ProjectCardGridProps {
  projectList: ProjectCardProps[];
}

const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({ projectList }) => {
  console.log(projectList);
  return (
    <Row gap={2}>
      {projectList.map((project) => (
        <Col key={project.title} xs={12} md={6} xl={4} className="my-1">
          <ProjectCard {...project} />
        </Col>
      ))}
    </Row>
  );
};
export default ProjectCardGrid;
