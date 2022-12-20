import { useState, useEffect } from 'react';
import FrontMatter, { FrontMatterResult } from 'front-matter';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CommonPagenation from 'components/common/CommonPagination';
import removeMarkdown from 'markdown-to-text';
import PostListItem from 'components/post/PostListItem';
import ListGroup from 'react-bootstrap/container';
import { useGetPostInfoByIdx } from 'hooks';

type PostListContainerProps = {
  pageSize: number;
};

//게시글이 없으면 없음 메시지 띄움.
const PostListContainer: React.FC<PostListContainerProps> = ({ pageSize }) => {
  const [pageNum, setPageNum] = useState(1);
  const { postInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetPostInfoByIdx(1);

  if (loading) {
    return (
      <Row className="justify-content-center">
        <Col>
          <Spinner animation="grow" variant="info" /> loading...
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row className="justify-content-center">
          <Col>
            <ListGroup>
              {listPage.fmArr.map((fm, i) => (
                <PostListItem key={i} fm={fm} />
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <CommonPagenation
              pgnt={listPage.pgnt}
              activePgNum={pageNum}
              handleChange={(pgNum) => setPageNum(pgNum)}
              className="justify-content-center"
            />
          </Col>
        </Row>
      </>
    );
  }
};
export default PostListContainer;
