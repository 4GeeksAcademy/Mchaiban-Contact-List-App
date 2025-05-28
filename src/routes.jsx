// src/router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contacts } from "./pages/Contacts";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* Render Contacts at the index (root) */}
      <Route index element={<Contacts />} />

      {/* Redirect any unknown path back to root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
