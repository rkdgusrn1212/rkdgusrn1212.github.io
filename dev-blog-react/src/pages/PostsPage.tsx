import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import Post from 'components/Post';
import PostList from 'components/PostList';
import ScrollViewportContainer from 'components/ScrollViewportContainer';
import { postTotal } from 'services/postApi';

const isInteger = /^[0-9]+$/;

const PostsPage: React.FC = () => {
  const params = useParams<'idx'>();

  let postNo = postTotal - 1;
  if (params.idx && isInteger.test(params.idx)) {
    const idxNum = parseInt(params.idx);
    if (postNo < postTotal && postNo >= 0) {
      postNo = idxNum;
    }
  }
  //이시점에선 범위 내 입력 값 or postTotal-1만 남음. 이제 postNo가 0이상일때만 출력해주면 됨.

  return (
    <ScrollViewportContainer activeHref="/#/posts">
      <Row className="h-100 flex-row-reverse">
        <Col xs={12} xl={9} className="h-100 overflow-scroll">
          {postNo >= 0 && <Post postNo={postNo} />}
        </Col>
        <Col xs={12} xl={3} className="h-100 py-2">
          <PostList pageSize={10} pgntHalfSize={2} selected={postNo} />
        </Col>
      </Row>
    </ScrollViewportContainer>
  );
};
export default PostsPage;
