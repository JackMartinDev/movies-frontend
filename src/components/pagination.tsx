import { Metadata } from "../types/common";

type PaginationButtonProps = {
  label: string | number;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
};

const PaginationButton = ({
  label,
  onClick,
  disabled = false,
  selected = false,
}: PaginationButtonProps) => {
  return (
    <button
      className={`py-1.5 px-3 border enabled:hover:bg-green-500 enabled:hover:text-white disabled:opacity-40 ${selected ? "bg-green-500 text-white" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

type PaginationBarProps = {
  metadata: Metadata;
};

const PaginationBar = ({ metadata }: PaginationBarProps) => {
  const startRecord = (metadata.current_page - 1) * metadata.page_size + 1;
  const endRecord = Math.min(
    metadata.current_page * metadata.page_size,
    metadata.total_records,
  );
  return (
    <div className="text-center">
      <p>
        Displaying result {startRecord}-{endRecord} of {metadata.total_records}
      </p>
      <p>
        Page {metadata.current_page} of {metadata.last_page}
      </p>
    </div>
  );
};

type PaginationProps = {
  metadata: Metadata;
  onPageChange: (page: number) => void;
};

const Pagination = ({ metadata, onPageChange }: PaginationProps) => {
  const { current_page, last_page } = metadata;

  //Calculate which page buttons to show based on the available pages
  const getPages = () => {
    const pages = [];

    if (last_page <= 3) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      if (current_page === 1) {
        pages.push(1, 2, 3);
      } else if (current_page === last_page) {
        pages.push(last_page - 2, last_page - 1, last_page);
      } else {
        pages.push(current_page - 1, current_page, current_page + 1);
      }
    }

    return pages;
  };

  return (
    <div>
      <div>
        <PaginationButton
          label="First"
          onClick={() => onPageChange(1)}
          disabled={current_page === 1}
        />
        <PaginationButton
          label="Prev"
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
        />

        {getPages().map((page) => (
          <PaginationButton
            key={page}
            label={page}
            onClick={() => onPageChange(page)}
            selected={page === current_page}
          />
        ))}
        <PaginationButton
          label="Next"
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
        />
        <PaginationButton
          label="Last"
          onClick={() => onPageChange(last_page)}
          disabled={current_page === last_page}
        />
      </div>
      <PaginationBar metadata={metadata} />
    </div>
  );
};

export default Pagination;
