import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { RELOAD_USER } from "../redux/store/user/actions";
import { CLEAR_ERROR, CLEAR_VALIDATION } from "../redux/store/app/slice";
import { routes } from "../router/routes";
import history from "../router/history";

import Error from "../components/Error";
import Validation from "../components/Validation";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Account from "../pages/Account";

const Layout = (props) => {
  const { validation, error, resetError, resetValidation, user, reloadUser } =
    props;

  useEffect(() => {
    resetError();
    resetValidation();
    reloadUser();
  }, [resetError, resetValidation]);

  if (error || validation) {
    setTimeout(() => {
      resetError();
      resetValidation();
    }, 5000);
  }

  return (
    <HistoryRouter history={history}>
      <Validation validation={validation} resetValidation={resetValidation} />
      <Error error={error} resetError={resetError} />
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.account} element={<Account />} />
      </Routes>
    </HistoryRouter>
  );
};

Layout.propTypes = {
  validation: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
  resetValidation: PropTypes.func.isRequired,
  reloadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  validation: state.app.validation,
  error: state.app.error,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  resetError: () => dispatch({ type: CLEAR_ERROR }),
  resetValidation: () => dispatch({ type: CLEAR_VALIDATION }),
  reloadUser: () => dispatch({ type: RELOAD_USER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
