import MyBackButton from "../_components/my-back-button";
import ShoppingList from "./_components/shopping-list";

const Page = () => {
    return (
        <div>
            <MyBackButton pageTitle="Week 6 - Assignment" />
            <ShoppingList />
            <div className="container p-10">
                <h1 className="text-lg">Learning from this Assignment</h1>
                <ul className="list-disc m-5">
                    <li>Learned <span className="font-bold underline underline-offset-3">flex-col, flex-col-reverse</span> utility in Tailwind CSS for styling the main contents of the page.
                    Such as <span className="font-bold underline underline-offset-3">reversing the order of items</span> in a flex container. When <span className="font-bold underline underline-offset-3">the screen size is reduced</span>, the order of items can be changed easily.</li>
                    <li>Learned how to sort arrays of objects in JavaScript.</li>
                    <li>Learned how to style different screen sizes using Tailwind CSS.</li>
                </ul>
            </div>
        </div>
    );
}

export default Page;