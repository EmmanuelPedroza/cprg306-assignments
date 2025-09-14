import Link from "next/link";
import MyCustomLinks from "./_components/my-custom-links";
import { ASSIGNMENT_LIST } from "./lib/constants";

export default function Home() {
  return (
    <main>
      <div className="container">

        <h1 className="text-xl mb-4">Welcome to CPRG-306 Assignments Project</h1>

        <h5>Student Name: Emmanuel Pedroza</h5>
        <h5>Student ID: 000961358</h5>
        <h5>Course: CPRG-306-E</h5>
        <h5>Instructor: Derek Yadlowski</h5>

        <hr className="border mt-4 mb-4"/>

        <div className="">
          <h2 className="text-lg mb-2">Assignments</h2>
            <ul className="list-disc mt-4 ml-10">
              {
                ASSIGNMENT_LIST.map((assignment, index) => (
                  <li key={index}>
                    <MyCustomLinks name={assignment.displayName} path={assignment.path} fallbackURL={assignment.fallbackURL} />
                  </li>
                ))
              }
            
            </ul>
        </div>

       
      </div>
    </main>
  );
}
