export default function ShoppingItem({name, quantity, category}) {
    return (
        <div>
            <h3 className="capitalize">{name}</h3>
            <p className="text-xs ml-3">Quantity: {quantity}, Category: {category}</p>
        </div>
    );
}