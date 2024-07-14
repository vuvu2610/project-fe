import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import ReactSelect, { SelectInstance } from "react-select";
// import listProduct from "../api/product.json";
import Pagianate from "../components/PagianateNavBar/Paginate";
import ProductItem from "../components/ProductItem";
import { Product } from "../types/types";
import { callApi, getAllProduct } from '../api/axios'
import { useLocation } from 'react-router-dom';

function ProductPage() {
  const [page, setPage] = useState(0);
  const numItemsOfPage = 12;

  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const location = useLocation();
  const [query, setQuery] = useState<string | null>(null);

  const filterCurrentProducts = useMemo(() => {
    const startIndex = page * numItemsOfPage;
    const endIndex = (page + 1) * numItemsOfPage;

    const slicedProducts = currentProducts.slice(startIndex, endIndex);
    console.log("Sliced Products:", slicedProducts);

    return slicedProducts;
  }, [page]);

  const [sortOption] = useState([
    { value: 0, label: "Mặc định" },
    { value: 1, label: "Giá: thấp tới cao" },
    { value: 2, label: "Giá: cao tới thấp" },
    { value: 3, label: "Tên: A to Z" },
    { value: 4, label: "Tên: Z to A" },
  ]);
  const selectRef = useRef<SelectInstance<any>>(null);

  useImperativeHandle(selectRef, () => selectRef.current!, []);

  useEffect(() => {  
    const queryParams = new URLSearchParams(location.search);  
    const name = queryParams.get('name') || null;  
    setQuery(name);  
    callApi(() => getAllProduct(name)).then((res) => {  
      setCurrentProducts(res);  
    });  
  }, [location]); 

  // useEffect(() => {
  //   const handleUrlChange = () => {
  //     const queryParams = new URLSearchParams(window.location.search);
  //     setSearchName(queryParams.get("name"));
  //   };

  //   // Cập nhật searchName khi component mount
  //   handleUrlChange();

  //   // Lắng nghe sự thay đổi của URL
  //   window.addEventListener("popstate", handleUrlChange);
  //   window.addEventListener("hashchange", handleUrlChange);

  //   // Dọn dẹp khi component unmount
  //   return () => {
  //     window.removeEventListener("popstate", handleUrlChange);
  //     window.removeEventListener("hashchange", handleUrlChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   callApi(() => getAllProduct(searchName)).then((res) => {
  //     setCurrentProducts(res);
  //   });
  // }, [searchName]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setCurrentProducts(filterCurrentProducts);
    selectRef.current?.selectOption(sortOption[0]);
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
          ...prev.sort((a, b) => a.name.localeCompare(b.name)),
        ]);
        break;
      case 4:
        setCurrentProducts((prev) => [
          ...prev.sort((a, b) => b.name.localeCompare(a.name)),
        ]);
        break;
      default:
        setCurrentProducts((prev) => [...prev.sort((a, b) => 0)]);
        break;
    }
  };

  return (
    <div className="px-[10%] mb-20 pb-20">
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
            ref={selectRef}
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
            onPageChange={(pageNumber) => {
              setPage(pageNumber);
              console.log(pageNumber);
            }}
            numberItemOnPage={numItemsOfPage}
            itemsLength={currentProducts.length}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
