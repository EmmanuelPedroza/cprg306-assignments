import Link from "next/link";

export default function StudentInfo() {
    var githubUrl = "https://github.com/EmmanuelPedroza/cprg306-assignments";

    return (
        <div className="container p-4">
            <h1>
                Student Information Component
            </h1>
            <div className="border border-gray-300 rounded p-4 ml-4 mr-4 mx-auto mt-4">
                <h5 className="mb-5">
                    Student Name: Emmanuel Pedroza
                </h5>

                <Link className="nav-link" href={githubUrl}>
                    View GitHub Profile
                </Link>
            </div>
        </div>
    );
}