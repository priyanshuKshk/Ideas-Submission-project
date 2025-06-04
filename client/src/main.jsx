import { StrictMode } from "react";
import "./index.css";
import "./input.css";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import Header from "./layout/Header.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ContactUs from "./pages/ContactUs.jsx";
// main.jsx (or index.jsx)
import { AuthProvider } from "./context/AuthContext"; // ✅ use relative local path

import IdeaForm from "./pages/IdeaForm.jsx";
import IdeasPage from "./pages/AllIdeasPage.jsx";
import MyIdeasPage from "./pages/MyIdeasPage.jsx";
import AllIdeasPage from "./pages/AllIdeasPage.jsx";
import Layout from "./layout/Layout.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
    

      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/submit-idea" element={<IdeaForm />} />
      <Route path="/my-ideas" element={<MyIdeasPage/>} />
      <Route path="/all-ideas" element={<AllIdeasPage/>} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
