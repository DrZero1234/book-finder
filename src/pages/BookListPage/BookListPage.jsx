import { useLoaderData, useSearchParams } from "react-router-dom";
import { getBookListByName } from "../../api";
import { BookList } from "../../components/BookList/BookList";

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  if (!searchTerm) return {};
  return getBookListByName(searchTerm);
};

export const BookListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { docs: booksData } = useLoaderData();
  return (
    <>
      <h1>Book list page</h1>
      <span>Result for {searchParams.get("q")}</span>
      {booksData.length ? (
        <BookList bookListData={booksData} />
      ) : (
        <p>Book(s) not found</p>
      )}
    </>
  );
};
