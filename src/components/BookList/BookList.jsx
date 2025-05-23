import { BookListItem } from "../BookListItem/BookListItem";
import "./BookList.scss";

export const BookList = ({ bookListData }) => {
  return (
    <div className="book--list--wrapper">
      {bookListData.map((bookData) => {
        const { key } = bookData;
        const idSplit = key.split("/");
        const bookKey = idSplit[idSplit.length - 1];
        return <BookListItem bookData={bookData} key={bookKey} />;
      })}
    </div>
  );
};
