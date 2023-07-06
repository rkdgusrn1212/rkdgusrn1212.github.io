import { Col, Row } from 'react-bootstrap';
import PostList from 'components/PostList';
import ScrollViewportContainer from 'components/ScrollViewportContainer';

const PostListPage: React.FC = () => {
  return (
    <ScrollViewportContainer activeHref={'/#/posts'}>
      <Row className="h-100 py-2">
        <Col className="h-100">
          <PostList pageSize={8} pgntHalfSize={4} />
        </Col>
      </Row>
    </ScrollViewportContainer>
  );
};
export default PostListPage;
