import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";

import { Layout } from "./components/Layout/Layout";

// PROJECT LINK https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Book-Finder-App.md

// TEMPLATE LINK https://preview.themeforest.net/item/bookchoix-elementor-woocommerce-wordpress-theme/full_screen_preview/35505133

// Cover url example: https://covers.openlibrary.org/b/olid/OL7466533M-M.jpg (key_type/key_value-image_size.jpg)

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);
