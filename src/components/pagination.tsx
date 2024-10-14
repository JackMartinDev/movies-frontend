import { Metadata } from "../types/common";

type Props = {
  metadata: Metadata;
  onPageChange: (page: number) => void;
};

const Pagination = ({ metadata, onPageChange }: Props) => {
  const startRecord = (metadata.current_page - 1) * metadata.page_size + 1;
  const endRecord = Math.min(
    metadata.current_page * metadata.page_size,
    metadata.total_records,
  );
  return (
    <div>
      <div>
        <button
          onClick={() => onPageChange(1)}
          disabled={metadata.current_page === 1}
        >
          First
        </button>
        <button
          onClick={() => onPageChange(metadata.current_page - 1)}
          disabled={metadata.current_page === 1}
        >
          Prev
        </button>
        <button>{metadata.current_page}</button>
        <button
          onClick={() => onPageChange(metadata.current_page + 1)}
          disabled={metadata.current_page === metadata.last_page}
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(metadata.last_page)}
          disabled={metadata.current_page === metadata.last_page}
        >
          Last
        </button>
      </div>
      <div>
        <p>
          Displaying {startRecord}-{endRecord}results of{" "}
          {metadata.total_records}
        </p>
        <p>
          Page {metadata.current_page} of {metadata.last_page}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
