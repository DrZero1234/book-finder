import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./Navbar.scss";

import pageLogo from "../../assets/page-logo.png";
import mobileLogo from "../../assets/mobile-page-logo.png";

import { MdHome, MdSearch, MdClose } from "react-icons/md";
import { RiFileListFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef, useState } from "react";

export const Navbar = () => {
  const HomeLogo = <MdHome size="24px" className="nav--item__icon" />;

  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("q");
  const navigate = useNavigate();

  const primaryNavRef = useRef(null);
  const navToggleRef = useRef(null);

  const searchToggleRef = useRef(null);
  const searchTextRef = useRef(null);
  const overlayRef = useRef(null);

  const closeOverlayRef = useRef(null);

  const handleSearchToggle = () => {
    const visibility = searchTextRef.current.getAttribute("data-activesearch");
    if (visibility === "false") {
      searchToggleRef.current.setAttribute("aria-expanded", "true");
      searchTextRef.current.setAttribute("data-activesearch", "true");
      overlayRef.current.style.transform = "translateY(0%)";
    } else {
      searchToggleRef.current.setAttribute("aria-expanded", "false");
      searchTextRef.current.setAttribute("data-activesearch", "false");
    }
  };

  const handleNavToggle = () => {
    const visibility = primaryNavRef.current.getAttribute("data-visible");
    if (visibility === "false") {
      primaryNavRef.current.setAttribute("data-visible", "true");
      navToggleRef.current.setAttribute("aria-expanded", "true");
    } else {
      primaryNavRef.current.setAttribute("data-visible", "false");
      navToggleRef.current.setAttribute("aria-expanded", "false");
    }
  };

  const handleCloseOverlay = () => {
    const isOverlayOpen = overlayRef.current.style.transform;
    console.log(isOverlayOpen);
    if (isOverlayOpen) {
      searchToggleRef.current.setAttribute("aria-expanded", "false");
      searchTextRef.current.setAttribute("data-activesearch", "false");
      overlayRef.current.style.transform = "translateY(-100%)";
    }
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchParams);
    navigate({
      pathname: "books",
      search: createSearchParams({
        q: searchTextRef.current.value,
      }).toString(),
    });
    primaryNavRef.current.setAttribute("data-visible", "false");
    navToggleRef.current.setAttribute("aria-expanded", "false");
    overlayRef.current.style.transform = "translateY(-100%)";
  };

  return (
    <div className="container navbar--wrapper">
      <div className="logo">
        <Link to="/">
          <picture className="page--logo">
            <source srcSet={pageLogo} media="(min-width: 48rem)" />
            <img src={mobileLogo} alt="page logo" />
          </picture>
        </Link>
      </div>

      <button
        aria-controls="primary-navigation"
        aria-expanded="false"
        className="mobile--nav--toggle"
        onClick={() => handleNavToggle()}
        ref={navToggleRef}
      >
        <span className="sr-only">Menu</span>
      </button>

      <nav>
        <ul
          className="primary--navigation"
          id="primary-navigation"
          ref={primaryNavRef}
          data-visible="false"
        >
          <h2 className="nav--menu__title">Menu</h2>

          <li className="nav--item">
            <input
              className="mobile--searchbar search--textinput"
              name="q"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              id="book_searchbar"
              aria-label="Search books"
              placeholder="Book title"
              type="search"
              form="search_form"
            />
          </li>
          <li className="nav--item">
            <NavLink to="about">About</NavLink>
          </li>
          <li className="nav--item">
            <NavLink to="subjects">Subjects</NavLink>
          </li>
          <li className="nav--item">
            <NavLink to="trending">Trending</NavLink>
          </li>
        </ul>
      </nav>
      <div className="overlay" ref={overlayRef}>
        <button
          className="close--overlay"
          type="button"
          ref={closeOverlayRef}
          onClick={() => handleCloseOverlay()}
        >
          <MdClose size="36px" />
          <span className="sr-only">Cancel search</span>
        </button>
        <div className="overlay--content">
          <form
            className="search--form"
            id="search_form"
            role="search"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              name="q"
              id="book_searchbar"
              className="search--textinput"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label="Search books"
              placeholder="Book title"
              type="search"
              data-activesearch="false"
              ref={searchTextRef}
            />

            <button type="submit">
              <span className="search--button__icon"></span>
            </button>
          </form>
        </div>
      </div>
      <button
        type="button"
        aria-controls="book_searchbar"
        aria-expanded="false"
        className="search--toggle--btn"
        ref={searchToggleRef}
        onClick={() => handleSearchToggle()}
      >
        <MdSearch size="24px" />
        <span className="sr-only">Toggle searchbar</span>
      </button>
    </div>
  );
};
