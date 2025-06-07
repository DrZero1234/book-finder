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
import { useRef } from "react";

export const Navbar = () => {
  const HomeLogo = <MdHome size="24px" className="nav--item__icon" />;

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
      overlayRef.current.style.display = "block";
    } else {
      searchToggleRef.current.setAttribute("aria-expanded", "false");
      searchTextRef.current.setAttribute("data-activesearch", "false");
      overlayRef.current.style.display = "none";
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
    const isOverlayOpen = overlayRef.current.style.display === "block";
    if (isOverlayOpen) {
      searchToggleRef.current.setAttribute("aria-expanded", "false");
      searchTextRef.current.setAttribute("data-activesearch", "false");
      overlayRef.current.style.display = "none";
    }
    console.log(isOverlayOpen);
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
          <li className="nav__item">
            <NavLink to="about">About</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="subjects">Subjects</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="">Trending</NavLink>
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
          <MdClose size="24px" color="white" />
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
