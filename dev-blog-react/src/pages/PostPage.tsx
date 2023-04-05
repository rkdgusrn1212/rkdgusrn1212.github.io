import CommonFooter from 'components/common/CommonFooter';
import CommonHeader from 'components/common/CommonHeader';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { useReadPostQuery } from 'services/postApi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as dayjs from 'dayjs';

const defaultFont = {
  color: '#1F2318',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji;'
};

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
              h1: ({ node, ...props }) => <h1 {...props} style={{ ...defaultFont, fontSize: '32px', padding: '0 0 9.6px', margin: '0 0 16px', borderBottom: '1px solid grey' }} />,
              h2: ({ node, ...props }) => <h2 {...props} style={{ ...defaultFont, fontSize: '24px', padding: '0 0 7.2px', margin: '24px 0 16px', borderBottom: '1px solid grey' }} />,
              h3: ({ node, ...props }) => <h3 {...props} style={{ ...defaultFont, fontSize: '20px', margin: '24px 0 16px' }} />,
              h4: ({ node, ...props }) => <h4 {...props} style={{ ...defaultFont, fontSize: '16px', margin: '24px 0 16px' }} />,
              h5: ({ node, ...props }) => <h5 {...props} style={{ ...defaultFont, fontSize: '14px', margin: '24px 0 16px' }} />,
              h6: ({ node, ...props }) => <h6 {...props} style={{ ...defaultFont, fontSize: '13.6px', margin: '24px 0 16px' }} />,
              p: ({ node, ...props }) => <p {...props} style={{ ...defaultFont, fontSize: '16px', margin: '0 0 16px' }} />,
              pre: ({ node, ...props }) => <pre {...props} style={{ background: '#F6F8FA', margin: '0 0 16px', padding: '16px' }} />,
              code: ({ node, ...props }) => <code {...props} style={{ ...defaultFont, fontSize: '13.6px', fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace' }} />
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