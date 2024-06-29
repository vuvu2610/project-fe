import config from "../config";
import DefaultLayout from "../layouts/DefaultLayout";
import CartPage from "../pages/Cart/CartPage";
import Contact from "../pages/Contact";
import Home from "../pages/Home/Home";
import Live from "../pages/Live/Live";
import PageNotFound from "../pages/PageNotFound";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.product, component: Product, layout: DefaultLayout},
  { path: config.routes.contact, component: Contact, layout: DefaultLayout},
  { path: config.routes.cart, component: CartPage, layout: DefaultLayout},
  { path: config.routes.live, component: Live},
  { path: config.routes["produc-detail"], component: ProductDetail, layout: DefaultLayout},
  { path: config.routes["page-not-found"], component: PageNotFound},


];

const privateRoutes: any[] = [];

export { publicRoutes, privateRoutes };
