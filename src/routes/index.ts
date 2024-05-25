import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.product, component: Product, layout: DefaultLayout},
  { path: config.routes["produc-detail"], component: ProductDetail, layout: DefaultLayout},

];

const privateRoutes: any[] = [];

export { publicRoutes, privateRoutes };
