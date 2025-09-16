import Link from "next/link";

export default function MyBackButton({pageTitle}) {
    return (
        <div className="container ">
            <Link href="/" className="text-2xl font-bold py-4 flex items-center">
                &larr; <span className="text-sm ml-1 font-thin hover:underline">Back</span>
            </Link>
            <hr className="border mb-4"/>
            {
                pageTitle && (
                <>  
                    <h2 className="text-xl font-semibold">{pageTitle}</h2>
                    <hr className="border mt-4 mb-4"/>
                </>
                )
            }
            
        </div>
        
    );
}