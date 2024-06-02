import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import ReactSelect from "react-select";
import listProduct from "../api/products.json";
import CardProduct from "../components/CardProduct";

interface Props {}

function Product(props: Props) {
  const {} = props;

  const [products, setProducts] = useState(listProduct);

  const [categories] = useState(
    Array.from(new Set(products.map((product) => product.category)))
  );

  const [sortOption] = useState([
    { value: 0, label: "Default" },
    { value: 1, label: "Price: Low to High" },
    { value: 2, label: "Price: High to Low" },
    { value: 3, label: "Name: A to Z" },
    { value: 4, label: "Name: Z to A" },
  ]);

  const handleFilter = (category: string) => {
    setProducts((prev) => [...listProduct.filter((p) => p.category === category)]);
  };

  const handleSort = (value: number) => {
    switch (value) {
      case 1:
        setProducts((prev) => [...prev.sort((a, b) => a.price - b.price)]);
        break;
      case 2:
        setProducts((prev) => [...prev.sort((a, b) => b.price - a.price)]);
        break;
      case 3:
        setProducts((prev) => [
          ...prev.sort((a, b) => a.name.localeCompare(b.name)),
        ]);
        break;
      case 4:
        setProducts((prev) => [
          ...prev.sort((a, b) => b.name.localeCompare(a.name)),
        ]);
        break;
      default:
        setProducts((prev) => [...prev.sort((a, b) => 0)]);
        break;
    }
  };

  return (
    <div className="px-[10%] pb-20">
      <div className="flex items-center gap-x-4 py-10">
        <span className="text-gray-400">Home</span> <FaChevronRight size={12} />{" "}
        Shop
      </div>
      <div className="flex gap-x-10">
        <div className="w-[247px] border-gray-300 border border-solid rounded-[20px] h-fit ">
          <h3 className="px-4 py-3 text-xl cursor-default">Filter</h3>
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className="py-3 px-4 hover:bg-gray-200 opacity-80 cursor-pointer"
                onClick={() => {
                  handleFilter(category);
                }}
              >
                {category}
              </div>
            );
          })}

          <h3 className="px-4 py-3 pt-6 text-xl cursor-default border-t border-gray-300 border-solid">
            Sort by
          </h3>
          <ReactSelect
            className="p-4"
            options={sortOption}
            defaultValue={sortOption[0]}
            onChange={(option) => option && handleSort(option.value)}
          ></ReactSelect>
        </div>
        <ul className="flex-1 grid-cols-3 grid gap-10 auto-rows-max">
          {products.map((product, index) => (
            <CardProduct key={index} data={product} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Product;
