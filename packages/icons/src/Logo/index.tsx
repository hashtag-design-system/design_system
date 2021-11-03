import { Hashtag } from "./Hashtag";
import { Google } from "./Google";

type SubComponents = {
  Hashtag: typeof Hashtag;
  Google: typeof Google;
};

const Logo: React.FC & SubComponents = () => {
  return <></>;
};

Logo.displayName = "LogoIcon";

Logo.Hashtag = Hashtag;
Logo.Google = Google;

export default Logo;
