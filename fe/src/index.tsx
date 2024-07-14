import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { persistor, store } from "./redux/store";
import "./i18n";
import { Suspense } from "react";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading/Loading";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Suspense fallback={<Loading/>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Suspense>
);
