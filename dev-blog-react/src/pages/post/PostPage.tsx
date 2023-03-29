import PostList from 'components/post/PostList';

const PostPage = () => {
  return (
    <>
      <PostList pageSize={8} pgntHalfSize={2} />
    </>
  );
};
export default PostPage;
