import { CreditCard } from "./CreditCard";
import { Refund } from "./Refund";
import { ShoppingCart } from "./ShoppingCart";

type SubComponents = {
  CreditCard: typeof CreditCard;
  Refund: typeof Refund;
  ShoppingCart: typeof ShoppingCart;
};

const Payment: React.FC & SubComponents = () => {
  return <></>;
};

Payment.CreditCard = CreditCard;
Payment.Refund = Refund;
Payment.ShoppingCart = ShoppingCart;

Payment.displayName = "PaymentIcon";

export default Payment;
