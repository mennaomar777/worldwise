import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Pricing from "./pages/Pricing/Pricing";
import Product from "./pages/Product/Product";
import NotFound from "./pages/NotFound/NotFound";
import Homepage from "./pages/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import Form from "./components/Form/Form";
import CityList from "./components/CitiList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import CitiesProvider from "./contexts/CitiesContext";
import AuthProvider from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "product", element: <Product /> },
        { path: "pricing", element: <Pricing /> },
        {
          path: "app",
          element: (
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Navigate to="cities" replace />,
            },
            {
              path: "cities",
              element: <CityList />,
            },
            {
              path: "cities/:id",
              element: <City />,
            },
            {
              path: "countries",
              element: <CountryList />,
            },
            { path: "form", element: <Form /> },
          ],
        },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <CitiesProvider>
        <RouterProvider router={router} />
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
