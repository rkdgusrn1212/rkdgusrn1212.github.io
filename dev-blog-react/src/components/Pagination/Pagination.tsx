import { Stack } from 'react-bootstrap';
import { StackDirection } from 'react-bootstrap/Stack';
import OriginPagination from 'react-bootstrap/Pagination';
import styles from './Pagination.module.scss';

type PaginationProps = {
  className: string | null | undefined;
  pgnt: number[];
  activePgNum: number;
  maxPage: number;
  pgntHalfSize: number;
  direction: StackDirection;
  handleChange: (pgNum) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  className,
  pgnt,
  activePgNum,
  maxPage,
  pgntHalfSize,
  direction = 'horizontal',
  handleChange,
  ...props
}) => {
  if (pgnt[0] == 1) {
    pgnt.splice(0, 1);
  }
  if (pgnt[pgnt.length - 1] == maxPage) {
    pgnt.splice(pgnt.length - 1);
  }

  return (
    <Stack
      direction={direction}
      gap={2}
      className={styles.pagination + ' ' + className}
    >
      <a
        data-active={1 === activePgNum}
        key={1}
        onClick={() => handleChange(1)}
      >
        {1}
      </a>
      {activePgNum > pgntHalfSize + 2 && (
        <a onClick={() => handleChange(activePgNum - 3)}>...</a>
      )}
      {pgnt.map((pgNum) => (
        <a
          key={pgNum}
          data-active={pgNum === activePgNum}
          onClick={() => handleChange(pgNum)}
        >
          {pgNum}
        </a>
      ))}
      {activePgNum < maxPage - pgntHalfSize - 1 && (
        <a onClick={() => handleChange(activePgNum + 3)}>...</a>
      )}
      {maxPage > 1 && (
        <a
          key={maxPage}
          data-active={maxPage === activePgNum}
          onClick={() => handleChange(maxPage)}
        >
          {maxPage}
        </a>
      )}
    </Stack>
  );
};
export default Pagination;
