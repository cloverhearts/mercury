import React from "react";
import { Provider } from "react-redux";
import createStore from "../../store";
import { useParams, useHistory, useLocation } from "react-router-dom";
export default props => {
  const { children, store = null } = props;
  let serviceStore = store;
  if (!serviceStore) {
    serviceStore = createStore({
      router: {
        history: useHistory(),
        location: useLocation(),
        params: useParams()
      }
    });
  }

  return <Provider store={serviceStore}>{children}</Provider>;
};
