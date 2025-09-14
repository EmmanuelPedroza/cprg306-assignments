import MyBackButton from "../_components/my-back-button";
import ItemList from "./_components/item-list";

export const metadata = {
    title: "Shopping List",
    description: "A simple shopping list application"
};

export default function Page() {
    return (
        <div>
            <MyBackButton />
            <h1>Week 3 - Assignment</h1>
            <hr className="border mt-4 mb-4"/>
            <br/>
            <h1>Shopping List</h1>
            <ItemList />
        </div>

    );
}