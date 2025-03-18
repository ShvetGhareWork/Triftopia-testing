import { Route, Routes } from "react-router-dom";
import {
  Home,
  LimitedCollection,
  AntiqueCollection,
  About,
  Contact,
  Orders,
  PlaceOrder,
  LimitedAccess,
  AntiqueAccess,
  Onopen,
  Cart,
  LEProduct,
  Login,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = [
    { path: "/", element: <Onopen /> },
    { path: "/home", element: <Home /> },
    {
      path: "/limited-access/limited-collection",
      element: <LimitedCollection />,
    },
    {
      path: "/antique-access/antique-collection",
      element: <AntiqueCollection />,
    },
    { path: "/about", element: <About /> },
    { path: "/cart", element: <Cart /> },
    { path: "/contact", element: <Contact /> },
    { path: "/orders", element: <Orders /> },
    { path: "/login", element: <Login /> },
    { path: "/place-order", element: <PlaceOrder /> },
    { path: "/product/:productId", element: <LEProduct /> },
    { path: "/limited-access", element: <LimitedAccess /> },
    { path: "/antique-access", element: <AntiqueAccess /> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;
