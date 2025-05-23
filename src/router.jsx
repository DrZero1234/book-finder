import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";

import { BookLayout } from "./components/BookLayout/BookLayout";

import { BookListPage } from "./pages/BookListPage/BookListPage";
import { loader as bookListPageLoader } from "./pages/BookListPage/BookListPage";

import { BookPage } from "./pages/BookPage/BookPage";
import { loader as bookPageLoader } from "./pages/BookPage/BookPage";
import { SubjectsListPage } from "./pages/SubjectsListPage/SubjectsListPage";

// PROJECT LINK https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Book-Finder-App.md

// TEMPLATE LINK https://preview.themeforest.net/item/bookchoix-elementor-woocommerce-wordpress-theme/full_screen_preview/35505133

// Cover url example: https://covers.openlibrary.org/b/olid/OL7466533M-M.jpg (key_type/key_value-image_size.jpg)

// Loader & action tutorial : https://www.telerik.com/blogs/demystifying-loaders-actions-react-router-6-part-1

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="" element={<BookLayout />}>
        <Route
          path="books"
          element={<BookListPage />}
          loader={bookListPageLoader}
        />
        <Route
          path="book/:bookId"
          element={<BookPage />}
          loader={bookPageLoader}
        />
        <Route path="subjects" element={<SubjectsListPage />} />
      </Route>
    </Route>
  )
);
