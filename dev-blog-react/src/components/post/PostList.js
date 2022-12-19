import PostListItem from "components/post/PostListItem";
import ListGroup from "react-bootstrap/container";

const PostList = ({ fmArr }) => {
  return (
    <ListGroup>
      {fmArr.map((fm, i) => (
         <PostListItem key={i} fm={fm} />
      ))}
    </ListGroup>
  );
};
export default PostList;
