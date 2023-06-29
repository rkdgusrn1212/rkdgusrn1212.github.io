import { Stack } from 'react-bootstrap';
import Pagination, { PaginationProps } from 'react-bootstrap/Pagination';
import styles from './Pagination.module.scss';

type CommonPagenationProps = PaginationProps & {
  className: string | null | undefined;
  pgnt: number[];
  activePgNum: number;
  maxPage: number;
  pgntHalfSize: number;
  handleChange: (pgNum) => void;
};

const CommonPagenation: React.FC<CommonPagenationProps> = ({
  className,
  pgnt,
  activePgNum,
  maxPage,
  pgntHalfSize,
  handleChange,
}) => {
  if (pgnt[0] == 1) {
    pgnt.splice(0, 1);
  }
  if (pgnt[pgnt.length - 1] == maxPage) {
    pgnt.splice(pgnt.length - 1);
  }

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className={styles.pagination + ' ' + className}
    >
      <li
        data-active={1 === activePgNum}
        key={1}
        onClick={() => handleChange(1)}
      >
        {1}
      </li>
      {activePgNum > pgntHalfSize + 2 && (
        <Pagination.Ellipsis onClick={() => handleChange(activePgNum - 3)} />
      )}
      {pgnt.map((pgNum) => (
        <li
          key={pgNum}
          data-active={pgNum === activePgNum}
          onClick={() => handleChange(pgNum)}
        >
          {pgNum}
        </li>
      ))}
      {activePgNum < maxPage - pgntHalfSize - 1 && (
        <Pagination.Ellipsis onClick={() => handleChange(activePgNum + 3)} />
      )}
      <li
        key={maxPage}
        data-active={maxPage === activePgNum}
        onClick={() => handleChange(maxPage)}
      >
        {maxPage}
      </li>
    </Stack>
  );
};
export default CommonPagenation;
