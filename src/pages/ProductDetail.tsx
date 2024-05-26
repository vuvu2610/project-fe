import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../api/products.json";
import CardProduct from "../components/CardProduct";
import routes from "../config/routes";

interface Props {}

function ProductDetail(_props: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data] = useState(
    products.find((product) => {
      const parsId = id && parseInt(id);
      return product.id === parsId;
    })
  );

  const isValidId =
    id &&
    !isNaN(parseInt(id)) &&
    products.some((product) => product.id === parseInt(id));

  useEffect(() => {
    if (!isValidId) {
      navigate(routes["page-not-found"]);
    }
  }, []);

  return <CardProduct data={data || products[0]} />;
}

export default ProductDetail;
