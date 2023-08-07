import Badge from 'react-bootstrap/Badge';
import Placeholder from 'react-bootstrap/Placeholder';
import { useReadPostInfoQuery } from 'services/postApi';
import styles from './PostList.module.scss';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import dayjs from 'dayjs';

interface PostListItemProps {
  idx: number;
  selected: boolean;
}

const PostListItem: React.FC<PostListItemProps> = ({
  idx,
  selected,
}: PostListItemProps) => {
  const readPostInfoResult = useReadPostInfoQuery(idx);

  return (
    <Link to={'/posts/' + idx} className={styles.link} data-selected={selected}>
      <ListGroup.Item as="div" className={styles.listItem}>
        <h1 id={styles.title}>
          {readPostInfoResult.isSuccess ? (
            readPostInfoResult.data.title
          ) : (
            <Placeholder />
          )}
        </h1>
        <p id={styles.summary} className="text-truncate">
          {readPostInfoResult.isSuccess ? (
            readPostInfoResult.data.summary
          ) : (
            <Placeholder />
          )}
        </p>
        <div className="d-flex flex-wrap">
          {readPostInfoResult.isSuccess ? (
            readPostInfoResult.data.categories.map((cat, i) => (
              <p key={cat}>
                <small>
                  <Badge bg="secondary" className="me-1 pb-1">
                    {cat}
                  </Badge>
                </small>
              </p>
            ))
          ) : (
            <Placeholder />
          )}
          <p id={styles.time} className="ms-auto">
            <small>
              {readPostInfoResult.isSuccess ? (
                dayjs(readPostInfoResult.data.date).format('YYYY-MM-DD, HH:mm')
              ) : (
                <Placeholder />
              )}
            </small>
          </p>
        </div>
      </ListGroup.Item>
    </Link>
  );
};
export default PostListItem;
