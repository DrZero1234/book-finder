import { useLoaderData } from "react-router-dom";
import { getBookData } from "../../api";

export const loader = ({ params }) => {
  return getBookData(params.bookId);
};

export const BookPage = () => {
  const data = useLoaderData();
  console.log(data);
  return <h1>BookPage</h1>;
};
