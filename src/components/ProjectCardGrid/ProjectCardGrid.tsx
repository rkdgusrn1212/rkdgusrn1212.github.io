import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProjectCard, { ProjectCardProps } from './ProjectCard';

export interface ProjectCardGridProps {
  projectList: ProjectCardProps[];
  md?: number;
  lg?: number;
  xl?: number;
}

const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({
  projectList,
  md = 4,
  lg = 3,
  xl = 2,
}: ProjectCardGridProps) => {
  return (
    <Row gap={2}>
      {projectList.map((project) => (
        <Col
          key={project.title}
          xs={12}
          md={md}
          lg={lg}
          xl={xl}
          className="my-1"
        >
          <ProjectCard {...project} />
        </Col>
      ))}
    </Row>
  );
};
export default ProjectCardGrid;
