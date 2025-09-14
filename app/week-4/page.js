import MyBackButton from "../_components/my-back-button";
import NewItem from "./_components/new-item";

export default function Page() {
    return (
        <div>
            <MyBackButton />
            <h1>Week 4 - Assignment</h1>
            <hr className="border mt-4 mb-4"/>
            <br/>
            <NewItem/>
        </div>

    );
}