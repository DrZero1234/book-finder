import { useLoaderData } from "react-router-dom";
import { getBookData } from "../../api";
import defaultCover from "../../assets/default_cover.jpg";
import { v4 as uuidv4 } from "uuid";

import { MdStar, MdStarBorder } from "react-icons/md";

import "./BookPage.scss";

export const loader = ({ params }) => {
  return getBookData(params.bookId);
};

export const BookPage = () => {
  const { bookData, bookshelfData, ratingData, editionsData } = useLoaderData();
  const { description, authors, covers, subject_people, subjects, title } =
    bookData;
  let cover_url = defaultCover;
  if (covers) {
    cover_url = covers[0]
      ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
      : defaultCover;
  }

  const { summary: ratingSummary } = ratingData;
  const { counts: bookshelfCount } = bookshelfData;
  const { entries: editionsArr } = editionsData;

  console.log(ratingSummary);

  const englishEditions = editionsArr.filter(
    (elem) => elem.languages && elem.languages[0].key === "/languages/eng"
  );
  console.log(englishEditions);

  return (
    <div className="book--site--wrapper">
      <div className="book--site--media--wrapper">
        <img
          src={cover_url}
          alt="Large book image cover"
          className="book--cover--image"
        />
      </div>
      <div className="book--site--details--wrapper">
        <div className="book--main--details">
          <h2 className="book--site--title">{title}</h2>
          {/* If possible create a Link for the author with its name as text */}
          <span>By author name</span>
        </div>
        {ratingSummary && (
          <div className="book--rating">
            Rating: {ratingSummary.average && ratingSummary.average.toFixed(1)}
            {[
              ...Array(
                Math.floor(ratingSummary.average && ratingSummary.average)
              ).fill(),
            ].map((count) => (
              <MdStar style={{ fill: "#f18e7d" }} size="24px" key={uuidv4()} />
            ))}
            {[
              ...Array(
                5 - Math.floor(ratingSummary.average && ratingSummary.average)
              ).fill(),
            ].map((count) => (
              <MdStarBorder
                style={{ fill: "#121823" }}
                size="24px"
                key={uuidv4()}
              />
            ))}
          </div>
        )}

        {description ? (
          typeof description === "string" ? (
            <p>{description}</p>
          ) : (
            <p>{description?.value}</p>
          )
        ) : (
          <p>Description not added</p>
        )}
        {subjects?.length && (
          <div className="book--page--details--list--wrapper">
            <span className="list--name">Subjects</span>
            {subjects.slice(0, 5).map((subject, i) => (
              <>
                <span className="list--item">{subject}</span>
                {i < 4 && ","}
              </>
            ))}
          </div>
        )}
        {subject_people?.length && (
          <div className="book--page--details--list--wrapper">
            <span className="list--name">Subject</span>
            {subject_people.slice(0, 5).map((subject, i) => (
              <>
                <span className="list--item">{subject}</span>
                {i < 4 && ","}
              </>
            ))}
          </div>
        )}
      </div>

      {/*  
            Edition list hidden for now

      <div className="editions--list">
        {englishEditions.map((edition) => (
          <div
            className="edition--item"
            key={edition.isbn_13?.length ? edition.isbn_13[0] : uuidv4()}
          >
            <img
              src={
                edition.covers?.length
                  ? `https://covers.openlibrary.org/b/id/${edition.covers[0]}-M.jpg`
                  : defaultCover
              }
            />
            <h3>{edition.full_title}</h3>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};
