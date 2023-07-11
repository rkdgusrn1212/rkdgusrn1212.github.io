import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as dayjs from 'dayjs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useReadPostQuery } from 'services/postApi';
import styles from './Post.module.scss';
import rehypeRaw from 'rehype-raw';

const defaultFont = {
  color: '#1F2318',
  fontFamily:
    '-apple-system, BlinkMacSystemFont,Segoe UI,Noto Sans,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
};

const Post: React.FC<{ postNo: number }> = ({ postNo }) => {
  const readPostResult = useReadPostQuery(postNo);

  return (
    <div className={'p-5 ' + styles.container}>
      {readPostResult.isSuccess ? (
        <>
          <header style={{ marginBottom: '30px' }}>
            <h1
              style={{
                fontSize: '42px',
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              {readPostResult.data.title}
            </h1>
            <p style={{ fontSize: '14px', color: '#828282' }}>
              <time dateTime={readPostResult.data.date}>
                {dayjs(readPostResult.data.date).format('YYYY/MM/DD HH시mm분')}
              </time>
            </p>
          </header>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  {...props}
                  style={{
                    ...props.style,
                    ...defaultFont,
                    fontSize: '32px',
                    padding: '0 0 9.6px',
                    margin: '0 0 16px',
                    borderBottom: '1px solid grey',
                  }}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  style={{
                    ...props.style,
                    ...defaultFont,
                    fontSize: '24px',
                    padding: '0 0 7.2px',
                    margin: '24px 0 16px',
                    borderBottom: '1px solid grey',
                  }}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  {...props}
                  style={{
                    ...props.style,
                    ...defaultFont,
                    fontSize: '20px',
                    margin: '24px 0 16px',
                  }}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  {...props}
                  style={{
                    ...props.style,
                    ...defaultFont,
                    fontSize: '16px',
                    margin: '24px 0 16px',
                  }}
                />
              ),
              h5: ({ node, ...props }) => (
                <h5
                  {...props}
                  style={{
                    ...props.style,
                    ...defaultFont,
                    fontSize: '14px',
                    margin: '24px 0 16px',
                  }}
                />
              ),
              h6: ({ node, ...props }) => (
                <h6
                  {...props}
                  style={{
                    ...props.style,
                    ...defaultFont,
                    fontSize: '13.6px',
                    margin: '24px 0 16px',
                  }}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  {...props}
                  style={{
                    ...props.style,
                    ...defaultFont,
                    fontSize: '16px',
                    margin: '0 0 16px',
                  }}
                />
              ),
              table: ({ node, ...props }) => (
                <table {...props} className={styles.table} />
              ),
              pre: ({ node, ...props }) => {
                let match = false;
                for (const child of node.children) {
                  if (
                    child['tagName'] === 'code' &&
                    /language-(\w+)/.exec(
                      child['properties']['className'] || '',
                    )
                  ) {
                    match = true;
                    break;
                  }
                }
                return match ? (
                  <pre {...props} />
                ) : (
                  <pre
                    {...props}
                    style={{
                      ...props.style,
                      background: '#F6F8FA',
                      margin: '0 0 16px',
                      padding: '16px',
                    }}
                  />
                );
              },
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    style={okaidia}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code
                    {...props}
                    className={className}
                    style={{
                      ...props.style,
                      ...defaultFont,
                      fontSize: '13.6px',
                      fontFamily:
                        'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
                    }}
                  >
                    {children}
                  </code>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {readPostResult.data.body}
          </ReactMarkdown>
        </>
      ) : (
        <>로딩중</>
      )}
    </div>
  );
};

export default Post;
