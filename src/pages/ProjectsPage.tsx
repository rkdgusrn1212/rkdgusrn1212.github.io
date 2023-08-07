import ProjectCardGrid from 'components/ProjectCardGrid';
import ScrollViewportContainer from 'components/ScrollViewportContainer';
import projectList from 'assets/project-list.json';

const ProjectsPage: React.FC = () => {
  return (
    <ScrollViewportContainer activeHref="/projects">
      <div className="py-2">
        <ProjectCardGrid projectList={projectList} />
      </div>
    </ScrollViewportContainer>
  );
};
export default ProjectsPage;
