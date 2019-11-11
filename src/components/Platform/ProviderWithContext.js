import React from "react";
import { Provider } from "react-redux";
import createStore from "../../store";
import { useParams, useHistory, useLocation } from "react-router-dom";
export default props => {
  const { children } = props;
  const store = createStore({
    router: {
      history: useHistory(),
      location: useLocation(),
      params: useParams()
    }
  });
  return <Provider store={store}>{children}</Provider>;
};
