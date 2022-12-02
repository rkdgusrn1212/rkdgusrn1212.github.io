import {Table} from 'react-bootstrap';
import PostListItem from "components/post/PostListItem";
const PostList = ({ fmArr }) => {
  return (
    <Table bordered>
      {fmArr.map((fm) => (
        <PostListItem fm={fm} />
      ))}
    </Table>
  );
};
export default PostList;
