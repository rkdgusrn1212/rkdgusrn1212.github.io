import ScrollViewportContainer from 'components/ScrollViewportContainer';
import PostList from 'components/PostList';
import ProjectCardGrid from 'components/ProjectCardGrid';
import projectList from 'assets/project-list.json';
import { Col, Row } from 'react-bootstrap';

const HomePage = () => (
  <ScrollViewportContainer activeHref="/">
    <Row className="h-100 py-3">
      <Col xs={12} md={6} className="h-100">
        <PostList pageSize={8} pgntHalfSize={2} />
      </Col>
      <Col xs={12} md={6} className="h-100 overflow-scroll">
        <ProjectCardGrid projectList={projectList} md={6} lg={6} xl={4} />
      </Col>
    </Row>
  </ScrollViewportContainer>
);
export default HomePage;
