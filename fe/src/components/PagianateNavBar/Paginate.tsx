import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
  } from "react-icons/md";
  import ReactPaginate from "react-paginate";
  
  interface Props {
    onPageChange: (numberPage: number) => void;
    itemsLength: number;
    numberItemOnPage: number;
  }
  
  function Pagianate(props: Props) {
    const { onPageChange, itemsLength, numberItemOnPage } = props;
  
    return (
      <ReactPaginate
        containerClassName="flex gap-x-3 mt-12 justify-center w-full mx-auto  py-4 px-6  shadow-custom"
        pageLinkClassName="w-10 aspect-square grid place-items-center hover:bg-gray-300 transition-all duration-300 ease-in-out"
        pageClassName="rounded-full overflow-hidden min-w-fit"
        activeClassName="bg-primary text-white"
        pageCount={Math.ceil(itemsLength / numberItemOnPage)}
        previousLabel={<MdKeyboardDoubleArrowLeft />}
        nextLabel={<MdKeyboardDoubleArrowRight />}
        onPageChange={(e) => {onPageChange(e.selected)}}
        disabledLinkClassName="hover:bg-transparent hover:cursor-not-allowed text-gray-300"
        previousLinkClassName="w-10 aspect-square grid place-items-center hover:bg-gray-300 transition-all duration-300 ease-in-out rounded-full"
        nextLinkClassName="w-10 aspect-square grid place-items-center hover:bg-gray-300 transition-all duration-300 ease-in-out rounded-full"
      />
    );
  }
  
  export default Pagianate;