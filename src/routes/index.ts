import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout";
import Contact from "../pages/Contact";
import Home from "../pages/Home/Home";
import PageNotFound from "../pages/PageNotFound";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.product, component: Product, layout: DefaultLayout},
  { path: config.routes.contact, component: Contact, layout: DefaultLayout},
  { path: config.routes["produc-detail"], component: ProductDetail, layout: DefaultLayout},
  { path: config.routes["page-not-found"], component: PageNotFound},


];

const privateRoutes: any[] = [];

export { publicRoutes, privateRoutes };
