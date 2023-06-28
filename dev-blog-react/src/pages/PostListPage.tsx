import CommonFooter from 'components/common/CommonFooter';
import CommonHeader from 'components/common/CommonHeader';
import PostList from 'components/post/PostList';
import Container from 'react-bootstrap/Container';

const PostListPage: React.FC = () => {
  return (
    <>
      <CommonHeader activeHref={'/#/posts'} />
      <Container>
        <PostList pageSize={8} pgntHalfSize={4} />
      </Container>
      <CommonFooter />
    </>
  );
};
export default PostListPage;
