import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Placeholder from 'react-bootstrap/Placeholder';
import { useReadPostInfoQuery } from 'services/postApi';
import styles from './PostList.module.scss';

const PostListItem: React.FC<{ idx: number; selected: boolean }> = ({
  idx,
  selected,
}) => {
  const readPostInfoResult = useReadPostInfoQuery(idx);

  return (
    <ListGroup.Item
      className={'px-3 ' + styles.listItem}
      data-selected={selected}
    >
      <a href={'/#/post/' + idx} className="text-decoration-none">
        <p>
          {readPostInfoResult.isSuccess ? (
            readPostInfoResult.data.title
          ) : (
            <Placeholder />
          )}
        </p>
      </a>
      <p className="text-truncate">
        <small>
          {readPostInfoResult.isSuccess ? (
            readPostInfoResult.data.summary
          ) : (
            <Placeholder />
          )}
        </small>
      </p>
      <div className="d-flex flex-wrap">
        {readPostInfoResult.isSuccess ? (
          readPostInfoResult.data.categories.map((cat, i) => (
            <a href="./#" key={i}>
              <small>
                <Badge bg="secondary" className="me-1 pb-1">
                  {cat}
                </Badge>
              </small>
            </a>
          ))
        ) : (
          <Placeholder />
        )}
        <p className="ms-auto">
          <small>
            {readPostInfoResult.isSuccess ? (
              new Date(readPostInfoResult.data.date).toString()
            ) : (
              <Placeholder />
            )}
          </small>
        </p>
      </div>
    </ListGroup.Item>
  );
};
export default PostListItem;
