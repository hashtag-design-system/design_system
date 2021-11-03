import { Heart, Heart2 } from "./Heart";
import { ThumbsUp, ThumbsDown } from "./Thumbs";
import { Email } from "./Email";
import { CreditCardChip } from "./CreditCardChip";

type SubComponents = {
  Heart: typeof Heart;
  Heart2: typeof Heart2;
  ThumbsUp: typeof ThumbsUp;
  ThumbsDown: typeof ThumbsDown;
  Email: typeof Email;
  CreditCardChip: typeof CreditCardChip;
};

const Social: React.FC & SubComponents = () => {
  return <div></div>;
};

Social.Heart = Heart;
Social.Heart2 = Heart2;
Social.ThumbsUp = ThumbsUp;
Social.ThumbsDown = ThumbsDown;
Social.Email = Email;
Social.CreditCardChip = CreditCardChip;

Social.displayName = "SocialIcon";

export default Social;
