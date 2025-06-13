import "./SubjectsListPage.scss";
import { SubjectsMock } from "../../data/Subjects";
import { CategoryItem } from "../../components/CategoryItem/CategoryItem";

export const SubjectsListPage = () => {
  console.log(SubjectsMock);
  return (
    <div className="subject--list">
      {Object.keys(SubjectsMock).map((subjectKey) => (
        <CategoryItem subjectData={SubjectsMock[subjectKey]} />
      ))}
    </div>
  );
};
