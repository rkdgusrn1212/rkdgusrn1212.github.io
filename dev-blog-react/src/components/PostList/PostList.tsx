import { useState, useMemo } from 'react';

import Stack from 'react-bootstrap/Stack';
import Pagination from 'components/Pagination';
import PostListItem from 'components/PostList/PostListItem';
import ListGroup from 'react-bootstrap/container';
import { postTotal } from 'services/postApi';
import styles from './PostList.module.scss';

//게시글이 없으면 없음 메시지 띄움.
const PostList: React.FC<{ pageSize: number; pgntHalfSize: number }> = ({
  pageSize,
  pgntHalfSize,
}) => {
  const [pageNum, setPageNum] = useState(1);

  const pgntSize = useMemo(() => pgntHalfSize * 2 + 1, [pgntHalfSize]);
  const maxPage = useMemo(() => Math.ceil(postTotal / pageSize), [pageSize]);
  const idxArr = [...Array(pageSize).keys()].map(
    (i) => i + (pageNum - 1) * pageSize,
  );
  const pgnt = [...Array(pgntSize).keys()].map(
    (i) => i + pageNum - pgntHalfSize,
  );

  if (pageNum <= pgntHalfSize) {
    pgnt.splice(0, pgntHalfSize + 1 - pageNum);
  }
  if (pageNum > maxPage - pgntHalfSize) {
    pgnt.splice(pgnt.length - (pageNum + pgntHalfSize - maxPage));
  }
  if (pageNum >= maxPage) {
    idxArr.splice(pageSize - (maxPage * pageSize - postTotal));
  }

  return (
    <Stack
      className={`h-100 overflow-scroll justify-content-between ${styles.container}`}
    >
      <ListGroup className="mt-3">
        {idxArr.map((idx) => (
          <PostListItem key={idx} idx={idx} />
        ))}
      </ListGroup>

      <Pagination
        pgnt={pgnt}
        activePgNum={pageNum}
        handleChange={(pgNum) => setPageNum(pgNum)}
        maxPage={maxPage}
        pgntHalfSize={pgntHalfSize}
        direction="horizontal"
        className="justify-content-center sticky-bottom pb-4 pe-4 mb-0"
      />
    </Stack>
  );
};
export default PostList;
