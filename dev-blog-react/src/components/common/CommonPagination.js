import Pagination from "react-bootstrap/Pagination";

const CommonPagenation = ({
  className,
  size,
  pgnt,
  activePgNum,
  handleChange,
}) => {
  return (
    <Pagination size={size} className={className}>
      <Pagination.Item
        active={1 === activePgNum}
        key={1}
        onClick={() => handleChange(1)}
      >
        {1}
      </Pagination.Item>
      {activePgNum > 4 && (
        <Pagination.Ellipsis
          key={activePgNum - 3}
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
        ))
        .slice(
          Math.max(activePgNum - 3, 1),
          Math.min(activePgNum + 2, pgnt.length - 1)
        )}

      {activePgNum < pgnt.length - 3 && (
        <Pagination.Ellipsis
          key={activePgNum + 3}
          onClick={() => handleChange(activePgNum + 3)}
        />
      )}
      <Pagination.Item
        key={pgnt.length}
        active={pgnt.length === activePgNum}
        onClick={() => handleChange(pgnt.length)}
      >
        {pgnt.length}
      </Pagination.Item>
    </Pagination>
  );
};
export default CommonPagenation;
