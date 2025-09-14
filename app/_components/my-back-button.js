import Link from "next/link";

export default function MyBackButton() {
    return (
        <div className="container ">
            <Link href="/" className="text-2xl font-bold py-4 flex items-center">
                &larr; <span className="text-sm ml-1 font-thin">Back</span>
            </Link>
        </div>
    );
}