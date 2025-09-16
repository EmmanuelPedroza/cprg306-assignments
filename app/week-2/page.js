import MyBackButton from "../_components/my-back-button";
import StudentInfo from "./_components/student-info";

export default function Page() {
  return (
    <main>
      <MyBackButton pageTitle="Week 2 - Assignment" />
      <div className="p-10">
        <StudentInfo />
        <div className="container mt-24">
          <h1 className="text-xl">Learnings from this Assignment</h1>
          <ul className="list-disc mt-4 ml-10">
              <li className="mb-3">Refreshed my knowledge in <span className="font-bold underline underline-offset-4">next.js</span> framework and <span className="font-bold underline underline-offset-4">javascript</span>.</li>
              <li className="mb-3">Creating and organizing components within the <span className="font-bold underline underline-offset-4">_components</span> folder for better code management.</li>
              <li className="mb-3">Implementing navigation using the <span className="font-bold underline underline-offset-4">Link</span> component from Next.js for client-side routing.</li>
              <li className="mb-3">Applying basic styling using Tailwind CSS classes to enhance the visual appearance of components.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}