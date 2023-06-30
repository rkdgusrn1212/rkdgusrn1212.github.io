import Header from 'components/Header';
import Footer from 'components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostList from 'components/PostList';
import Stack from 'react-bootstrap/Stack';
import ProjectCardGrid from 'components/ProjectCardGrid';
import projectList from 'projects/project-list.json';

console.log(typeof projectList);

const HomePage = () => (
  <>
    <Stack className="vh-100 overflow-scroll">
      <Header activeHref={'/'} />
      <Container fluid="md" className="flex-grow-1 h-25">
        <Row className="h-100 py-3">
          <Col xs={12} md={6} className="h-100">
            <PostList pageSize={5} pgntHalfSize={2} />
          </Col>
          <Col xs={12} md={6} className="h-100 overflow-scroll">
            <ProjectCardGrid projectList={projectList} />
          </Col>
        </Row>
      </Container>
    </Stack>
    <Footer />
  </>
);
export default HomePage;
