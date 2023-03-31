import CommonFooter from 'components/common/CommonFooter';
import CommonHeader from 'components/common/CommonHeader';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useReadPostQuery } from 'services/postApi';

const PostPage: React.FC = () => {
  const params = useParams<'idx'>();
  const readPostResult = useReadPostQuery(parseInt(params.idx));

  return (
    <>
      <CommonHeader />
      <Container fluid='md'>
        {readPostResult.isSuccess ? (
          <>
            <h1>{readPostResult.data.title}</h1>
            <div className="content" dangerouslySetInnerHTML={{ __html: readPostResult.data.body }}></div>
          </>
        ) : <>로딩중</>}
      </Container>
      <CommonFooter />
    </>
  );
};
export default PostPage;