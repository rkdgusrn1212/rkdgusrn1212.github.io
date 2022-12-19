import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const PostListItem = ({ fm }) => {
  return (
    <ListGroup.Item>
      <hr/>
      <a href="./#" className="text-decoration-none">
        <p>{fm.title}</p>
      </a>
      <p className="text-truncate"><small>{fm.body}</small></p>
      <div className="d-flex flex-wrap">
        {fm.categories.map((cat, i) => (
          <a href="./#" key={i}>
            <small><Badge bg="secondary" className="me-1 pb-1">
              {cat}
            </Badge></small>
          </a>
        ))}
        <p className="ms-auto"><small>{new Date(fm.date).toString()}</small></p>
      </div>
    </ListGroup.Item>
  );
};
export default PostListItem;
