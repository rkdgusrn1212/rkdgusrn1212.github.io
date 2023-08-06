import { useState, useMemo } from 'react';

import Stack from 'react-bootstrap/Stack';
import Pagination from 'components/Pagination';
import PostListItem from 'components/PostList/PostListItem';
import ListGroup from 'react-bootstrap/container';
import { postTotal } from 'services/postApi';
import styles from './PostList.module.scss';

interface PostListProps {
  pageSize: number;
  pgntHalfSize: number;
  selected?: number;
}
//게시글이 없으면 없음 메시지 띄움.
const PostList: React.FC<PostListProps> = ({
  pageSize,
  pgntHalfSize,
  selected,
}: PostListProps) => {
  const [pageNum, setPageNum] = useState(
    selected ? Math.floor((postTotal - 1 - selected) / pageSize) + 1 : 1, //먼저 현재 페이지를 초기화
  );

  const pgntSize = useMemo(() => pgntHalfSize * 2 + 1, [pgntHalfSize]);
  const maxPage = useMemo(
    () => (postTotal > 0 ? Math.ceil(postTotal / pageSize) : 1),
    [pageSize],
  ); //0일때는 예외적으로 최대 페이지가 1
  const idxArr = [...Array(pageSize).keys()].map(
    (i) => postTotal - 1 - (i + (pageNum - 1) * pageSize), //가장 높은 번호가 맨 앞으로
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
      className={`h-100 overflow-y-scroll justify-content-between ${styles.container}`}
    >
      <ListGroup className="mt-3 px-0">
        {idxArr.map((idx) => (
          <PostListItem key={idx} idx={idx} selected={idx === selected} />
        ))}
      </ListGroup>

      <Pagination
        pgnt={pgnt}
        activePgNum={pageNum}
        handleChange={(pgNum) => setPageNum(pgNum)}
        maxPage={maxPage}
        pgntHalfSize={pgntHalfSize}
        direction="horizontal"
        className={
          'justify-content-center sticky-bottom pb-4 pt-3 my-0 ' +
          styles.pagination
        }
      />
    </Stack>
  );
};
export default PostList;
