export default function ShoppingItem({id, name, quantity, category, removeItem}) {
    return (
        <div  className="flex flex-row justify-between items-center border-b pb-2 mb-2">
            <div>
                <h3 className="capitalize">{name}</h3>
                <p className="text-xs ml-3">Quantity: {quantity}, Category: {category}</p>
            </div>        
            <div>
                <button 
                    type="button" 
                    className="border px-2 py-1 rounded-md bg-red-400 hover:bg-white hover:text-black mt-2 mb-2"
                    onClick={() => removeItem(id)}
                >
                    -</button>
            </div>
        </div>
    );
}