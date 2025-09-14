export default function Item({name, quantity, category}) {
    return (
        <div>
            <h3 className="capitalize">{name}</h3>
            <p className="font-thin ml-3">Quantity: {quantity}, Category: {category}</p>
        </div>
    );
}