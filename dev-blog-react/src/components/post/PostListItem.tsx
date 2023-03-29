import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Placeholder from 'react-bootstrap/Placeholder';
import { useReadPostQuery } from 'services/postApi';

const PostListItem: React.FC<{ idx: number }> = ({ idx }) => {

  const readPostResult = useReadPostQuery(idx);

  return (
    <ListGroup.Item>
      <hr />
      <a href="./#" className="text-decoration-none">
        <p>
          {readPostResult.isSuccess ?
            readPostResult.data.title : <Placeholder />}
        </p>
      </a>
      <p className="text-truncate">
        <small>
          {readPostResult.isSuccess ? readPostResult.data.body : <Placeholder />}</small>
      </p>
      <div className="d-flex flex-wrap">
        {readPostResult.isSuccess ? readPostResult.data.categories.map((cat, i) => (
          <a href="./#" key={i}>
            <small>
              <Badge bg="secondary" className="me-1 pb-1">
                {cat}
              </Badge>
            </small>
          </a>
        )) : <Placeholder />}
        <p className="ms-auto">
          <small>
            {readPostResult.isSuccess ? (new Date(readPostResult.data.date).toString()) : <Placeholder />}</small>
        </p>
      </div>
    </ListGroup.Item>
  );
};
export default PostListItem;
