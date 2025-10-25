import Item from "./item";
import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

const List = forwardRef(({items, selectedItemsCallback}, ref) => {
    const [selectedItemIds, setSelectedItemIds] = useState([]);

    // Log committed changes
    // useEffect(() => {
    //     // console.log("Selected items updated: ", selectedItemIds);
    //     selectedItemsCallback?.(selectedItemIds);
    // }, [selectedItemIds]);

    useImperativeHandle(ref, () => ({
        getSelectedItemIds: () => selectedItemIds
    }), [selectedItemIds]);

    const addSelectedItemId = useCallback((id) => {
        console.log("Item selected: ", id);
        setSelectedItemIds(prev => {
            if (prev.includes(id)) {
                // remove item
                return prev.filter((itemId) => itemId !== id);
            }
            // add item
            return [...prev, id];
        });
    }, []);

    return (
        <div className="border rounded-lg mt-5 p-3 md:p-4 lg:p-5 bg-gray-800 text-white">
            <h1 className="text-lg w-full border-b-4 border-double mb-5">
                Ingredients List
            </h1>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    items.map((item, index) => (
                        <Item
                            key={item.id ?? index}
                            item={item}
                            onSelect={() => addSelectedItemId(item.id)}
                            selected={selectedItemIds.includes(item.id)}
                        />
                    ))
                }
            </div>
        </div>

    );
});

export default List;