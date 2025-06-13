import { useParams, useLoaderData } from "react-router-dom";
import { getBookListBySubject } from "../../api";
import { BookList } from "../../components/BookList/BookList";

export const loader = ({ params }) => {
  return getBookListBySubject(params.subjectName);
};

export const SubjectBookListPage = () => {
  const { works: subjectBookList } = useLoaderData();
  const subjectStr =
    useParams().subjectName[0].toUpperCase() + useParams().subjectName.slice(1);
  console.log(subjectStr);
  console.log(useLoaderData());
  return (
    <>
      <h2 className="subpage--title">{subjectStr} books</h2>
      <BookList bookListData={subjectBookList} />
    </>
  );
};
