import { Link, NavLink, useSearchParams } from "react-router-dom";
import "./Navbar.scss";

import pageLogo from "../../assets/page-logo.png";
import mobileLogo from "../../assets/mobile-page-logo.png";

import { MdHome, MdSearch, MdClose } from "react-icons/md";
import { RiFileListFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
  const HomeLogo = <MdHome size="24px" className="nav--item__icon" />;

  const [searchParams, setSearchParams] = useSearchParams("q");

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let book = formData.get("q");
    if (!book) return;
    setSearchParams({ q: book });
    return;
  };

  return (
    <div className="container navbar--wrapper">
      <div className="logo">
        <Link to="/">
          <picture className="page--logo">
            <source srcSet={pageLogo} media="(min-width: 768px)" />
            <img src={mobileLogo} alt="page logo" />
          </picture>
        </Link>
      </div>

      <button
        aria-controls="primary-navigation"
        aria-expanded="false"
        className="mobile--nav--toggle"
      >
        <span className="sr-only">Menu</span>
      </button>

      <nav>
        <ul className="primary--navigation" id="primary-navigation">
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
      <form
        className="search--form"
        id="search_form"
        role="search"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          name="q"
          aria-label="Search books"
          placeholder="Book title"
          type="search"
        />
        <button type="submit">
          <span className="search--button__icon"></span>
        </button>
      </form>
      <div className="overlay"></div>
    </div>
  );
};

