import React from "react";
import CardProduct from "../components/CardProduct";
import { useLocation } from "react-router-dom";

interface Props {}

function ProductDetail(props: Props) {
  const {} = props;
  const { state } = useLocation();

  
  return <CardProduct data={state.data} />;
}

export default ProductDetail;
