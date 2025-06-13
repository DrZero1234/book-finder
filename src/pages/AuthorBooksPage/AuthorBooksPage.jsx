import { useLoaderData } from "react-router-dom";
import { GetBookListByAuthor } from "../../api";
import "./AuthorBooksPage.scss";
import { BookList } from "../../components/BookList/BookList";

export const loader = ({ params }) => {
  return GetBookListByAuthor(params.authorKey);
};

export const AuthorBooksPage = () => {
  const { entries, size, links } = useLoaderData();
  console.log(useLoaderData());

  return (
    <>
      <h2>Authors books page</h2>
      <BookList bookListData={entries} />
    </>
  );
};
