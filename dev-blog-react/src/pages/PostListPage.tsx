import CommonFooter from 'components/Footer';
import Header from 'components/Header';
import PostList from 'components/PostList';
import Container from 'react-bootstrap/Container';

const PostListPage: React.FC = () => {
  return (
    <>
      <Header activeHref={'/#/posts'} />
      <Container>
        <PostList pageSize={8} pgntHalfSize={4} />
      </Container>
      <CommonFooter />
    </>
  );
};
export default PostListPage;
