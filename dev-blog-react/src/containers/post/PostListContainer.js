import PostList from "components/post/PostList";
import PostFiles from "posts";
import { useState, useEffect } from "react";
import FrontMatter from "front-matter";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PostListContainer = () => {
  const [loading, setLoading] = useState(true);
  const [fmArr, setFmArr] = useState([]);

  //Mount시에 데이터 파일 읽기, mdObj로드
  useEffect(() => {
    const tempFmArr = [];
    Promise.all(
      PostFiles.map((file) =>
        fetch(file)
          .then((res) => res.text())
          .then((text) => {
            const fm = FrontMatter(text).attributes;
            tempFmArr.push(fm);
          })
      )
    ).then(() => {
      setFmArr(tempFmArr);
    });
  }, []);

  //mdObj의 로드가 완료되면,
  useEffect(() => {
    setLoading(false);
  }, [fmArr]);

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
        <PostList fmArr={fmArr} />
      </>
    );
  }
};
export default PostListContainer;
