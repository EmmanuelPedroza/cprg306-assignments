import MyBackButton from "../_components/my-back-button";
import NewItem from "./_components/new-item";

const Page = () => {
    return (
        <div>
            <MyBackButton pageTitle={"Week 5 - Assignment"} />
            <NewItem />
        </div>
    );
};

export default Page;
