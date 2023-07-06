import Post from 'components/Post';
import PostList from 'components/PostList';
import ScrollViewportContainer from 'components/ScrollViewportContainer';
import { Col, Row } from 'react-bootstrap';

const PostPage: React.FC = () => {
  return (
    <ScrollViewportContainer activeHref="/#/posts">
      <Row className="h-100 flex-row-reverse">
        <Col xs={12} xl={9} className="h-100 overflow-scroll">
          <Post />
        </Col>
        <Col xs={12} xl={3} className="h-100 py-2">
          <PostList pageSize={10} pgntHalfSize={2} />
        </Col>
      </Row>
    </ScrollViewportContainer>
  );
};
export default PostPage;
