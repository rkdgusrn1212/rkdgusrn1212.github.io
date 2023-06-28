import CommonFooter from 'components/Footer';
import CommonHeader from 'components/Header';
import PostList from 'components/PostList';
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
