import "./CategoryItem.scss";
import { Link } from "react-router-dom";

export const CategoryItem = ({ subjectData }) => {
  const { categorySubjects } = subjectData;

  return (
    <div className="subject--item">
      <h2>{subjectData.categoryName}</h2>
      <ul className="subject--list">
        {categorySubjects.map((subject) => {
          const subjectNameUrl = subject.subjectName
            .split(" ")
            .join("_")
            .toLowerCase();

          return (
            <li>
              <Link to={subjectNameUrl} key={subject.subjectKey}>
                {subject.subjectName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
