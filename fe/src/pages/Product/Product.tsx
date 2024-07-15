import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import ReactSelect, { SelectInstance } from "react-select";
import { getAllProduct } from "../../api/axios";
import Paginate from "../../components/PagianateNavBar/Paginate";
import ProductItem from "../../components/ProductItem";
import { Product } from "../../types/types";
import SkeletonLoader from "./SkeletonLoader";
import { useTranslation } from "react-i18next";

function ProductPage() {
  const [page, setPage] = useState(0);
  const numItemsOfPage = 12;
  const { t } = useTranslation();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  const fetchAllProducts = useCallback(() => {
    getAllProduct(null).then((res) => {
      setAllProducts(res);
    });
  }, []);

  const [filter, setFilter] = useState({
    category: ["tree", "fruit", "spice", "wood", "flower"],
  });

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const filterCurrentProducts = useCallback(() => {
    const startIndex = page * numItemsOfPage;
    const endIndex = (page + 1) * numItemsOfPage;

    const result = allProducts
      .filter((product) => {
        return filter.category.includes(product.category.toLowerCase());
      })
      .slice(startIndex, endIndex);

    setCurrentProducts(result);
  }, [page, allProducts, filter]);

  useEffect(() => {
    if (allProducts.length > 0) {
      filterCurrentProducts();
      window.scrollTo(0, 0);
    }
  }, [page, allProducts, filterCurrentProducts]);

  const sortOption = [
    { value: 0, label: t("sort.default") },
    { value: 1, label: t("sort.priceAsc") },
    { value: 2, label: t("sort.priceDesc") },
    { value: 3, label: t("sort.nameAsc") },
    { value: 4, label: t("sort.nameDesc") },
  ];

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

  function handleChangeCategory(e: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = e.target;
    setFilter((prev) => {
      const category = checked
        ? [...prev.category, value.toLowerCase()]
        : prev.category.filter((cat) => cat !== value);
      return { ...prev, category };
    });

    setPage(0);
  }

  return (
    <div className="px-[10%] mb-20 pb-20">
      <div className="flex items-center gap-x-4 py-10">
        <span className="text-gray-400">{t("nav.home")}</span>{" "}
        <FaChevronRight size={12} /> {t("nav.products")}
      </div>
      <div className="flex gap-x-10 flex-col xl:flex-row gap-y-5">
        <div className="w-[247px] border-gray-300 border border-solid rounded-[20px] h-fit ">
          <h3 className="px-4 py-3 pt-6 text-xl cursor-default ">
            {t("sort.title")}
          </h3>
          <ReactSelect
            ref={selectRef}
            className="p-4"
            options={sortOption}
            defaultValue={sortOption[0]}
            onChange={(option) => option && handleSort(option.value)}
          ></ReactSelect>

          <h3 className="px-4 py-3 pt-6 text-xl cursor-default border-t ">
            Filter
          </h3>
          <div className="px-4 pb-4">
            <div>
              <h2 className="text-[16px] mb-2">Category</h2>
              <div className="flex items-center gap-2 mb-2 ">
                <input
                  onChange={(e) => {
                    handleChangeCategory(e);
                  }}
                  className="w-4 aspect-square cursor-pointer rounded-sm accent-primary"
                  type="checkbox"
                  defaultChecked
                  value={"tree"}
                  id="category_tree"
                />
                <label
                  className="flex-1 cursor-pointer"
                  htmlFor="category_tree"
                >
                  Tree
                </label>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  onChange={(e) => {
                    handleChangeCategory(e);
                  }}
                  className="w-4 aspect-square cursor-pointer rounded-sm accent-primary"
                  type="checkbox"
                  defaultChecked
                  value={"fruit"}
                  id="category_fruit"
                />
                <label
                  className="flex-1 cursor-pointer"
                  htmlFor="category_fruit"
                >
                  Fruit
                </label>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  onChange={(e) => {
                    handleChangeCategory(e);
                  }}
                  className="w-4 aspect-square cursor-pointer rounded-sm accent-primary"
                  type="checkbox"
                  defaultChecked
                  value={"wood"}
                  id="category_wood"
                />
                <label
                  className="flex-1 cursor-pointer"
                  htmlFor="category_wood"
                >
                  Wood
                </label>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  onChange={(e) => {
                    handleChangeCategory(e);
                  }}
                  className="w-4 aspect-square cursor-pointer rounded-sm accent-primary"
                  type="checkbox"
                  defaultChecked
                  value={"spice"}
                  id="category_spice"
                />
                <label
                  className="flex-1 cursor-pointer"
                  htmlFor="category_spice"
                >
                  Spice
                </label>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  onChange={(e) => {
                    handleChangeCategory(e);
                  }}
                  className="w-4 aspect-square cursor-pointer rounded-sm accent-primary"
                  type="checkbox"
                  defaultChecked
                  value={"flower"}
                  id="category_flower"
                />
                <label
                  className="flex-1 cursor-pointer"
                  htmlFor="category_flower"
                >
                  Flower
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {allProducts.length !== 0 ? (
            <ul className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-10 auto-rows-max">
              {currentProducts.map((prod, index) => (
                <ProductItem product={prod} key={index} />
              ))}
            </ul>
          ) : (
            <SkeletonLoader />
          )}
          <Paginate
            onPageChange={(pageNumber) => {
              setPage(pageNumber);
            }}
            numberItemOnPage={numItemsOfPage}
            itemsLength={
              allProducts.filter((product) => {
                return filter.category.includes(product.category.toLowerCase());
              }).length
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
