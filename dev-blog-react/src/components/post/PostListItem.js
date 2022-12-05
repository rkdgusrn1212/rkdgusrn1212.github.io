import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const PostListItem = ({ fm }) => {
  if (!Array.isArray(fm.categories)) {
    //단일 값일땐 길이 1인 배열, null(undefined)인경우 empty array로
    fm.categories = [fm.categories];
  }
  return (
    <ListGroup.Item>
      <a href="./#" className="text-decoration-none">
        <p>{fm.title}</p>
      </a>
      <p>아무내용</p>
      <div className="d-flex flex-wrap">
        {fm.categories.map((cat, i) => (
          <a href="./#">
            <Badge className="me-1" key={i}>
              {cat}
            </Badge>
          </a>
        ))}
        <p className="ms-auto">{fm.date}</p>
      </div>
    </ListGroup.Item>
  );
};
export default PostListItem;
