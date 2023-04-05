import CommonFooter from 'components/common/CommonFooter';
import CommonHeader from 'components/common/CommonHeader';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useReadPostQuery } from 'services/postApi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as dayjs from 'dayjs';

const PostPage: React.FC = () => {
  const params = useParams<'idx'>();
  const readPostResult = useReadPostQuery(parseInt(params.idx));

  return (
    <>
      <CommonHeader />
      <Container fluid='md'>
        {readPostResult.isSuccess ? (
          <>
            <header style={{ marginBottom: '30px' }}>
              <h1 style={{ fontSize: '42px', letterSpacing: '-1px', lineHeight: 1 }}>{readPostResult.data.title}</h1>
              <p style={{ fontSize: '14px', color: '#828282' }}>
                <time dateTime={readPostResult.data.date}>{dayjs(readPostResult.data.date).format('YYYY/MM/DD HH시mm분')}
                </time></p>
            </header>
            <ReactMarkdown components={{
              h1: ({ node, ...props }) => <h1 {...props} style={{ fontSize: '32px', padding: '0 0 9.6px', margin: '0 0 16px', borderBottom: '1px solid grey' }} />,
              h2: ({ node, ...props }) => <h2 {...props} style={{ fontSize: '24px', padding: '0 0 7.2px', margin: '24px 0 16px', borderBottom: '1px solid grey' }} />,
              h3: ({ node, ...props }) => <h3 {...props} style={{ fontSize: '20px', margin: '24px 0 16px' }} />,
              h4: 'h3',
              h5: 'h4',
              h6: 'h5'
            }} remarkPlugins={[remarkGfm]}>{readPostResult.data.body}</ReactMarkdown>
          </>
        ) : <>로딩중</>
        }
      </Container >
      <CommonFooter />
    </>
  );
};
export default PostPage;