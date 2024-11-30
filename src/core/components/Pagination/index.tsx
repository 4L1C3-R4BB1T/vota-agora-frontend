
interface Props {
    currentPage: number;
    onPageChange: (page: number) => void;
    disabled: boolean;
}

const Pagination = ({ currentPage, onPageChange, disabled = false }: Props) => {

    const handleClick = (page: number) => {
      if (page > 0) {
        onPageChange(page);
      }
    };
  
    return (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleClick(currentPage - 1)}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-lg text-gray-700">
          {currentPage}
        </span>
        <button
          onClick={() => handleClick(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={disabled}
        >
          Próximo
        </button>
      </div>
    );
};

export default Pagination;