import PostList from "components/post/PostList";
import PostFiles from "posts";
import { useState, useEffect } from "react";
import FrontMatter from "front-matter";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CommonPagenation from "components/common/CommonPagination";
import removeMarkdown from "markdown-to-text";

//게시글이 없으면 없음 메시지 띄움.
const PostListContainer = ({ pageSize }) => {
  const [loading, setLoading] = useState(true);
  const [listPage, setListPage] = useState({ fmArr: [], pgnt: [] });
  const [pageNum, setPageNum] = useState(1);

  //pageSize 또는 pageNum이 변경됬을 때, 당연히 마운트 시에도 호출된다.
  useEffect(() => {
    //Pagination
    const templistPage = {
      fmArr: [],
      pgnt: [],
    };
    const pageCnt = Math.ceil(PostFiles.length / pageSize);
    for (let i = 1; i <= pageCnt; i++) {
      templistPage.pgnt.push(i);
    }
    const endIdx = Math.min(pageNum * pageSize, PostFiles.length);
    const strIdx = Math.max((pageNum - 1) * pageSize, 0);
    const promiseArr = [];
    for (let i = strIdx; i < endIdx; i++) {
      promiseArr.push(
        fetch(PostFiles[i])
          .then((res) => res.text())
          .then((text) => {
            const postObj = FrontMatter(text);
            const fm = postObj.attributes;
            fm["body"] = removeMarkdown(postObj.body);//listPage.fmArr에 body 할당.
            if(!fm.categories){
               fm.categories = [];
            }else if (!Array.isArray(fm.categories)) {
              //단일 값일땐 길이 1인 배열, null(undefined)인경우 empty array로
              fm.categories = [fm.categories];
            }
            fm.categories = fm.categories.map((cat)=>cat.toLowerCase());//카테고리 전부 소문자화.
            templistPage.fmArr.push(fm);
          })
      );
    }
    Promise.all(promiseArr).then(() => {
      setListPage(templistPage);
    });
  }, [pageSize, pageNum]);

  //listPage의 로드가 완료되면,
  useEffect(() => {
    setLoading(false);
  }, [listPage]);

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
            <PostList fmArr={listPage.fmArr} />
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
