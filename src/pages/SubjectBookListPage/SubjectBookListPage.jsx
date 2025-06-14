import { useParams, useLoaderData, Await } from "react-router-dom";
import { getBookListBySubject } from "../../api";
import { BookList } from "../../components/BookList/BookList";
import { Suspense } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export const loader = ({ params }) => {
  const bookListBySubjectPromise = getBookListBySubject(params.subjectName);
  return {
    bookListBySubject: bookListBySubjectPromise,
  };
};

export const SubjectBookListPage = () => {
  const bookListBySubjectPromise = useLoaderData();

  return (
    <Suspense
      fallback={<LoadingSpinner>Loading subject books...</LoadingSpinner>}
    >
      <Await
        resolve={bookListBySubjectPromise.bookListBySubject}
        errorElement={<p>Error loading subject book list</p>}
      >
        {(bookListBySubject) => {
          const { works: subjectBookList } = bookListBySubject;
          const subjectStr =
            useParams().subjectName[0].toUpperCase() +
            useParams().subjectName.slice(1).split("_").join(" ");
          return (
            <>
              <h2 className="subpage--title">{subjectStr} books</h2>
              <BookList bookListData={subjectBookList} />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};
