import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { App } from "./components/App/App";
import "./index.css";
import { initialStore } from "./services/store";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={initialStore}>
      <App />
    </Provider>
  </Router>
);
