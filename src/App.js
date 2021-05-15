import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

import Spinner from "./components/spinner/Spinner";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AppStateProvider from "context";

const Homepage = lazy(() => import("./pages/homepage/Homepage"));
const Aboutpage = lazy(() => import("./pages/about/About"));
const Contactpage = lazy(() => import("./pages/contact/Contact"));
const Menupage = lazy(() => import("./pages/menu/Menu"));
const Gallerypage = lazy(() => import("./pages/gallery/Gallery"));
const Login = lazy(() => import("./pages/auth/Login"));
const Admin = lazy(() => import("./layouts/Admin"));


const App = () => {
  return (
    <AppStateProvider>
      <ToastProvider>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/about" component={Aboutpage} />
              <Route exact path="/menu" component={Menupage} />
              <Route exact path="/contact" component={Contactpage} />
              <Route exact path="/gallery" component={Gallerypage} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Admin} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </ToastProvider>
    </AppStateProvider>
  );
};

export default App;
