import MyBackButton from "../_components/my-back-button";
import ItemList from "./_components/item-list";

export const metadata = {
    title: "Shopping List",
    description: "A simple shopping list application"
};

export default function Page() {
    return (
        <div>
            <MyBackButton pageTitle="Week 3 - Assignment"/>
            <br/>
            <div className="p-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="basis-3/6 justify-items-center">
                        <h1 className="text-xl">Shopping List</h1>
                        <ItemList />
                    </div>
                    <div className="hidden lg:block border w-1 border-gray-300"></div>
                    <div className="basis-3/6 mt-10 lg:mt-0 justify-items-center">
                        <h1 className="text-xl">Learnings from this Assignment</h1>
                        <ul className="list-disc mt-5 ml-10">
                            <li className="mb-3">Refreshed my knowledge on handling <span className="font-bold underline underline-offset-4">objects</span> and <span className="font-bold underline underline-offset-4">arrays</span> in JavaScript.</li>
                            <li className="mb-3">Refreshed my knowledge on using flex property in vanilla css.</li>
                            <li className="mb-3">Learned about layout utilities in Tailwind CSS, such as <span className="font-bold underline underline-offset-4">grid</span> and <span className="font-bold underline underline-offset-4">flex</span> utilities.</li>
                        </ul>
                    </div>

                </div>
                
            </div>

        </div>

    );
}