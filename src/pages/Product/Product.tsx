import { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import ReactSelect from "react-select";
import listProduct from "../../api/product.json";
import ProductItem from "../../components/ProductItem";
import { Product } from "../../types/types";
import ReactPaginate from "react-paginate";
import {
  MdArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiArrowLeftCircleFill, RiArrowLeftDownLine } from "react-icons/ri";
import Pagianate from "../../components/PaginateNavBar/Pagianate";

function ProductPage() {
  const [page, setPage] = useState(0);
  const numItemsOfPage = 12;

  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  const filterCurrentProducts = useMemo(() => {
    return listProduct.filter((_, index) => {
      return (
        index >= page * numItemsOfPage && index < (page + 1) * numItemsOfPage
      );
    });
  }, [currentProducts]);

  const [sortOption] = useState([
    { value: 0, label: "Mặc định" },
    { value: 1, label: "Giá: thấp tới cao" },
    { value: 2, label: "Giá: cao tới thấp" },
    { value: 3, label: "Tên: A to Z" },
    { value: 4, label: "Tên: Z to A" },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setCurrentProducts(filterCurrentProducts);
  }, [page]);

  const handleSort = (value: number) => {
    switch (value) {
      case 1:
        setCurrentProducts((prev) => [
          ...prev.sort((a, b) => a.price - b.price),
        ]);
        break;
      case 2:
        setCurrentProducts((prev) => [
          ...prev.sort((a, b) => b.price - a.price),
        ]);
        break;
      case 3:
        setCurrentProducts((prev) => [
          ...prev.sort((a, b) => a.title.localeCompare(b.title)),
        ]);
        break;
      case 4:
        setCurrentProducts((prev) => [
          ...prev.sort((a, b) => b.title.localeCompare(a.title)),
        ]);
        break;
      default:
        setCurrentProducts((prev) => [...prev.sort((a, b) => 0)]);
        break;
    }
  };

  return (
    <div className="px-[10%] mb-20 pb-20 mt-[106px]">
      <div className="flex items-center gap-x-4 py-10">
        <span className="text-gray-400">Home</span> <FaChevronRight size={12} />{" "}
        Shop
      </div>
      <div className="flex gap-x-10 flex-col xl:flex-row gap-y-5">
        <div className="w-[247px] border-gray-300 border border-solid rounded-[20px] h-fit ">
          <h3 className="px-4 py-3 pt-6 text-xl cursor-default ">
            Sắp xếp theo
          </h3>
          <ReactSelect
            className="p-4"
            options={sortOption}
            defaultValue={sortOption[0]}
            onChange={(option) => option && handleSort(option.value)}
          ></ReactSelect>
        </div>

        <div className="flex-1">
          <ul className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-10 auto-rows-max">
            {currentProducts.map((prod, index) => (
              <ProductItem product={prod} key={index} />
            ))}
          </ul>
          <Pagianate
            onPageChange={(pageNumber) => setPage(pageNumber)}
            numberItemOnPage={numItemsOfPage}
            itemsLength={listProduct.length}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
