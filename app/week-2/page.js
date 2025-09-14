import MyBackButton from "../_components/my-back-button";
import StudentInfo from "./_components/student-info";

export default function Page() {
  return (
    <main>
      <MyBackButton />
      <h1>Week 2 - Assignment</h1>
      <hr className="border mt-4 mb-4"/>
      <StudentInfo />
    </main>
  );
}