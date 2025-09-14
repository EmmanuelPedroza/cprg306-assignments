import Link from "next/link";

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
            <ul className="list-disc list-inside mt-4">
              <li className="mb-1"><Link className="nav-link" href="/week-2">Week 2 Assignment</Link></li>
              <li className="mb-1"><Link className="nav-link" href="/week-3">Week 3 Assignment</Link></li>
              <li className="mb-1"><Link className="nav-link" href="/week-4">Week 4 Assignment</Link></li>
            </ul>
        </div>

       
      </div>
    </main>
  );
}
