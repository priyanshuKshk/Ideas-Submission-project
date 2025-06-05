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
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
// main.jsx (or index.jsx)
import { AuthProvider } from "./context/AuthContext"; // ✅ use relative local path

import IdeaForm from "./pages/IdeaForm.jsx";
import MyIdeasPage from "./pages/MyIdeasPage.jsx";
import Layout from "./layout/Layout.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/submit-idea" element={<IdeaForm />} />
      <Route path="/my-ideas" element={<MyIdeasPage />} />
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
