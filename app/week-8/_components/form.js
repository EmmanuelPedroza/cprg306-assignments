import { ITEM_CATEGORIES } from "@/app/lib/constants";

const Form = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name");
        const quantity = parseInt(formData.get("quantity"), 10);
        const category = formData.get("category");

        const newItem = {
            id: Math.random().toString(36).substring(2, 15),
            name,
            quantity,
            category: category.toLowerCase()
        };

        onSubmit(newItem);

        e.target.reset();
    }

    return (
        <div className="border rounded-lg mt-5 p-3 md:p-4 lg:p-5 bg-gray-800 text-white">
            <h1 className="text-lg w-full border-b-4 border-double mb-5">Add new Ingredient</h1>

            <form className="mt-3 flex flex-col gap-4 w-full md:w=3/5 md:w-4/5 mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1" htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="border-b border-white w-full p-2 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="border-b border-white w-full p-2 text-white"
                            required
                            increment={1}
                            max={20}
                            min={1}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 ">
                        <label className="block mb-1" htmlFor="category">Category:</label>
                        <select
                            id="category"
                            name="category"
                            className="border-b border-white w-full p-2 text-white bg-gray-800"
                            required
                            defaultValue={""}
                        >
                            <option value="" disabled >Select a category</option>
                            {
                                ITEM_CATEGORIES.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="mt-5 justify-self-center self-center">
                    <button className="border rounded-lg px-5 py-2 hover:bg-white hover:text-black" type="submit">Add Ingredient</button>
                </div>
            </form>
        </div>
    );
};

export default Form;