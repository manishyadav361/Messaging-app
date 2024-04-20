import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {initialState,reducer } from "./Reducer";
import {StateProvider } from "./StateProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </StrictMode>,
  rootElement
);
