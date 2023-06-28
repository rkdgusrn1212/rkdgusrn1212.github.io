import Pagination, { PaginationProps } from 'react-bootstrap/Pagination';

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
  size,
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
    <Pagination size={size} className={className}>
      <Pagination.Item
        active={1 === activePgNum}
        key={1}
        onClick={() => handleChange(1)}
      >
        {1}
      </Pagination.Item>
      {activePgNum > pgntHalfSize + 2 && (
        <Pagination.Ellipsis
          onClick={() => handleChange(activePgNum - 3)}
        />
      )}
      {pgnt
        .map((pgNum) => (
          <Pagination.Item
            key={pgNum}
            active={pgNum === activePgNum}
            onClick={() => handleChange(pgNum)}
          >
            {pgNum}
          </Pagination.Item>
        ))}
      {activePgNum < maxPage - pgntHalfSize - 1 && (
        <Pagination.Ellipsis
          onClick={() => handleChange(activePgNum + 3)}
        />
      )}
      <Pagination.Item
        key={maxPage}
        active={maxPage === activePgNum}
        onClick={() => handleChange(maxPage)}
      >
        {maxPage}
      </Pagination.Item>
    </Pagination>
  );
};
export default CommonPagenation;
