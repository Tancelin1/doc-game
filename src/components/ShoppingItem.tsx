import "./ShoppingItem.css";

type ShoppingItemPropos = {
  heroicName: string;
  price: number;
};

export default function ShoppingItem(props: ShoppingItemPropos) {
  return (
    <div className="shopping-item">
      <strong>{props.heroicName}</strong>: <em>{props.price} €</em>
    </div>
  );
}
