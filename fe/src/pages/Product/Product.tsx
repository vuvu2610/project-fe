import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import ReactSelect, { SelectInstance } from "react-select";
import { callApi, getAllProduct } from "../../api/axios";
import Paginate from "../../components/PagianateNavBar/Paginate";
import ProductItem from "../../components/ProductItem";
import { Product } from "../../types/types";
import SkeletonLoader from "./SkeletonLoader";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import routes from "../../config/routes";

function ProductPage() {
  const [page, setPage] = useState(0);
  const numItemsOfPage = 12;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string | null>(null);

  const isLoading = useSelector((state: RootState) => state.app.loading);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name") || null;
    setQuery(name);
    callApi(() => getAllProduct(name)).then((res) => {
        setAllProducts(res);
        setCurrentProducts(res.slice(0, numItemsOfPage));
    });
  }, [location]);

  const filterCurrentProducts = useCallback(() => {
    const startIndex = page * numItemsOfPage;
    const endIndex = (page + 1) * numItemsOfPage;
    setCurrentProducts(allProducts.slice(startIndex, endIndex));
  }, [page, allProducts]);

  useEffect(() => {
    if (allProducts.length > 0) {
      filterCurrentProducts();
      window.scrollTo(0, 0);
    }
  }, [page, allProducts, filterCurrentProducts]);

  const [sortOption] = useState([
    { value: 0, label: "Mặc định" },
    { value: 1, label: "Giá: thấp tới cao" },
    { value: 2, label: "Giá: cao tới thấp" },
    { value: 3, label: "Tên: A to Z" },
    { value: 4, label: "Tên: Z to A" },
  ]);

  const selectRef = useRef<SelectInstance<any>>(null);

  useEffect(() => {
    selectRef.current?.selectOption(sortOption[0]);
  }, []);

  const handleSort = (value: number) => {
    const sortedProducts = [...allProducts];
    switch (value) {
      case 1:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 2:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 3:
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 4:
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setAllProducts(sortedProducts);
    setPage(0);
  };

  return (
    <div className="px-[10%] mb-20 pb-20">
      <div className="flex items-center gap-x-4 py-10">
        <Link to={routes.home} className="text-gray-400">Home</Link> <FaChevronRight size={12} />{" "}
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
          {!isLoading? (
            <ul className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-10 auto-rows-max">
              {currentProducts.map((prod, index) => (
                <ProductItem product={prod} key={index} />
              ))}
            </ul>
          ) : (
            <SkeletonLoader />
          )}
          {currentProducts.length === 0 && (<p>Không tìm thấy sản phẩm</p>)}
          <Paginate
            onPageChange={(pageNumber) => {
              setPage(pageNumber);
            }}
            numberItemOnPage={numItemsOfPage}
            itemsLength={allProducts.length}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
