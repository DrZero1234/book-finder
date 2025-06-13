import { Link, useParams } from "react-router-dom";
import "./BookListItem.scss";
import defaultCover from "../../assets/default_cover.jpg";

export const BookListItem = ({ bookData }) => {
  const {
    author_key,
    authors,
    author_name,
    cover_edition_key,
    first_publish_year,
    key,
    title,
  } = bookData;
  const idSplit = key.split("/");
  const bookKey = idSplit[idSplit.length - 1];
  const { authorKey: authorKeyParams } = useParams();
  console.log(authorKeyParams);

  return (
    <div className="book--wrapper">
      <div className="book--list--item--cover--wrapper">
        <figure>
          <img
            src={
              cover_edition_key
                ? `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`
                : defaultCover
            }
            alt={`${title} book cover`}
            className="book--cover"
          />
        </figure>
      </div>
      <div className="book--list--item--content">
        <Link to={`/book/${bookKey}`} className="book--list--item--link">
          {title}
        </Link>
        {!authorKeyParams && (
          <div className="book--list--item--author--details">
            <span>By</span>{" "}
            {author_key ? (
              <Link
                className="author--name--text"
                to={`/authors/${author_key[0]}`}
              >
                {author_name[0]}
              </Link>
            ) : authors[0].key ? (
              <Link className="author--name--text" to={`${authors[0].key}`}>
                {authors[0].name}
              </Link>
            ) : (
              <span className="author--name--text">Unknown author</span>
            )}
          </div>
        )}

        <span className="book--list--item--year">
          Published on {first_publish_year}
        </span>
      </div>
    </div>
  );
};
