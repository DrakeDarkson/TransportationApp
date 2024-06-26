import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import User from "../pages/User";
import History from "../pages/History";
import NotFound from "../pages/Not Found";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;