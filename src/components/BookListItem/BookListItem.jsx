import { Link } from "react-router-dom";
import "./BookListItem.scss";
import defaultCover from "../../assets/default_cover.jpg";

export const BookListItem = ({ bookData }) => {
  const {
    author_key,
    author_name,
    cover_edition_key,
    first_publish_year,
    key,
    title,
  } = bookData;
  const idSplit = key.split("/");
  const bookKey = idSplit[idSplit.length - 1];

  return (
    <div className="book--wraper">
      <img
        src={
          cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`
            : defaultCover
        }
        alt={`${title} book cover`}
        className="book--cover"
      />
      <Link to={`/book/${bookKey}`}>{title}</Link>
    </div>
  );
};
