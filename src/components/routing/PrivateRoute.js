// import React from "react";

// import { Route, Redirect } from "react-router-dom";

// const PrivateRoute = ({
//   component: Component,
//   currentUser,
//   verified,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         currentUser && verified ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuth, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && !loading ? (
          <Redirect to="/login" />
        ) : (
            <Component {...props} />
          )
      }
    />
  );
};

export default PrivateRoute;
