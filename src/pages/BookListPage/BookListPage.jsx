import { useLoaderData, useSearchParams, Await } from "react-router-dom";
import { getBookListByName } from "../../api";
import { BookList } from "../../components/BookList/BookList";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  if (!searchTerm) return {};
  const bookListPromise = getBookListByName(searchTerm);
  return {
    bookList: bookListPromise,
  };
  //return getBookListByName(searchTerm);
};

export const BookListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookListPromise = useLoaderData();

  return (
    <>
      <h1>Book list page</h1>
      <Suspense
        fallback={<LoadingSpinner>Loading book list...</LoadingSpinner>}
      >
        <Await
          resolve={bookListPromise.bookList}
          errorElement={<p>Error loading book list</p>}
        >
          {(bookList) => {
            const { docs: bookListDataRes } = bookList;
            console.log(bookListDataRes);
            return (
              <>
                <span className="subpage--title">
                  Result for {searchParams.get("q")}
                </span>
                {bookListDataRes.length ? (
                  <BookList bookListData={bookListDataRes} />
                ) : (
                  <p>Book(s) not found</p>
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};
