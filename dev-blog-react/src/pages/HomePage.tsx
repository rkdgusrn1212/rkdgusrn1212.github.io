import Header from 'components/common/CommonHeader';
import Footer from 'components/common/CommonFooter';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostList from 'components/post/PostList';

const HomePage = () => (
  <>
    <Header activeHref={''} />
    <Container fluid="md">
      <Row>
        <Col>
          <PostList pageSize={5} pgntHalfSize={2} />
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
);
export default HomePage;
