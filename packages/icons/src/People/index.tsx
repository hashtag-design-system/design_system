import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "../utils";
import {
  AlchoholicDrink,
  Beer,
  CoffeeCup,
  FreshJuice,
  RefreshmentDrink,
  SoftDrink,
} from "./Drinks";
import { Eye, EyeClosed } from "./Eye";
import { HappyFace, SadFace } from "./Faces";
import { FoodClochebell, FoodCutlery } from "./Food";
import { Share } from "./Share";
import { Snacks } from "./Snacks";
import { UserAvatar } from "./UserAvatar";
import { WaterSlides } from "./WaterSlides";

type SubComponents = { Filled: typeof PeopleFilled } & {
  UserAvatar: typeof UserAvatar;
  Eye: typeof Eye;
  EyeClosed: typeof EyeClosed;
  HappyFace: typeof HappyFace;
  SadFace: typeof SadFace;
  Share: typeof Share;
  WaterSlides: typeof WaterSlides;
  Snacks: typeof Snacks;
  FreshJuice: typeof FreshJuice;
  CoffeeCup: typeof CoffeeCup;
  SoftDrink: typeof SoftDrink;
  RefreshmentDrink: typeof RefreshmentDrink;
  Beer: typeof Beer;
  AlchoholicDrink: typeof AlchoholicDrink;
  FoodCutlery: typeof FoodCutlery;
  FoodClochebell: typeof FoodClochebell;
};

// @ts-expect-error
const People: IconSVG<SubComponents> = createIcon({
  displayName: "PeopleIcon",
  path: (
    <>
      <Path d="M7.436 5.46c-1.586 0-2.872 1.318-2.872 2.945 0 1.627 1.286 2.946 2.872 2.946A2.852 2.852 0 009.85 10c.206.294.687.928.97 1.116a4.388 4.388 0 01-.513.565c-.955-.255-1.936.622-2.307 1.092a4.223 4.223 0 01-.564.038c-2.372 0-4.294-1.973-4.294-4.406S5.064 4 7.436 4a4.19 4.19 0 012.064.542C9.396 4.862 9.168 5.6 9.094 6a2.809 2.809 0 00-1.658-.54zM3.004 22c-1.846 0-3.388-1.708-2.92-3.662.593-2.466 1.424-3.942 2.606-4.69.786-.499 1.673-.243 2.235.044.396.201.887.427 1.362.6.164.06.318.11.46.15l-.599 1.34a9.244 9.244 0 01-.337-.115 14.076 14.076 0 01-1.519-.668c-.42-.214-.708-.203-.855-.11-.699.443-1.407 1.45-1.971 3.798-.221.922.5 1.854 1.538 1.854h2.26c.34 0 .655.175.862.445.366.476.876 1.014 1.248 1.014h-4.37z" />
      <Path d="M14.5 3.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM9.75 7a4.75 4.75 0 119.5 0 4.75 4.75 0 01-9.5 0zm7.783 5.686c.481-.25 1.157-.476 1.869-.281 1.32.36 2.145 1.223 2.656 2.254.495 1.001.707 2.181.839 3.259.244 2.006-1.4 3.832-3.41 3.832H9.384c-1.95 0-3.566-1.754-3.09-3.758.673-2.826 1.627-4.474 2.987-5.284.829-.493 1.755-.238 2.352.062.442.221 1 .473 1.543.667.563.202 1.032.313 1.325.313.315 0 .826-.127 1.43-.351a14.97 14.97 0 001.603-.713zm1.473 1.165c-.181-.05-.443-.01-.784.167-.474.246-1.119.546-1.77.787-.629.233-1.353.445-1.952.445-.566 0-1.238-.188-1.831-.4a16.043 16.043 0 01-1.709-.74c-.437-.218-.748-.211-.913-.113-.824.49-1.65 1.631-2.294 4.342-.227.956.537 1.911 1.63 1.911h10.105c1.12 0 2.054-1.05 1.92-2.15-.128-1.047-.318-2.014-.695-2.776-.362-.73-.882-1.247-1.707-1.473z" />
    </>
  ),
});

const PeopleFilled = createIcon({
  displayName: "PeopleFilledIcon",
  path: (
    <>
      <Path d="M10.75 7a4.75 4.75 0 119.5 0 4.75 4.75 0 01-9.5 0zm7.783 5.686c.481-.25 1.157-.476 1.869-.281 1.32.36 2.145 1.223 2.656 2.254.495 1.001.707 2.181.839 3.259.244 2.006-1.4 3.832-3.41 3.832H10.384c-1.95 0-3.566-1.754-3.09-3.758.673-2.826 1.627-4.474 2.987-5.284.829-.493 1.755-.238 2.352.062.442.221 1 .473 1.543.667.563.202 1.032.313 1.325.313.315 0 .826-.127 1.43-.351a14.97 14.97 0 001.603-.713z" />
      <Path d="M4.004 22c-1.846 0-3.388-1.708-2.92-3.662.593-2.466 1.424-3.942 2.606-4.69.786-.499 1.673-.243 2.235.044.396.201.887.427 1.362.6.164.06.318.11.46.15l-.534 1.196a1.545 1.545 0 01-.164.268c-.512.712-.746 2.214-.79 2.533a.837.837 0 00-.009.123C6.258 20.054 6.553 22 8.374 22h-4.37zM9.902 7.25c0 1.065.332 2.049.903 2.841.183.252.577.671.862.909.045.036.09.071.137.105l.016.012a4.394 4.394 0 01-.513.564c-.955-.255-1.936.622-2.307 1.092a4.223 4.223 0 01-.564.038c-2.372 0-4.294-1.973-4.294-4.406S6.064 4 8.436 4a4.19 4.19 0 012.064.542s-.291.954-.424 1.43a4.754 4.754 0 00-.174 1.278z" />
    </>
  ),
});

People.Filled = PeopleFilled;

People.UserAvatar = UserAvatar;
People.Eye = Eye;
People.EyeClosed = EyeClosed;
People.HappyFace = HappyFace;
People.SadFace = SadFace;
People.Share = Share;
People.WaterSlides = WaterSlides;
People.Snacks = Snacks;
People.FreshJuice = FreshJuice;
People.CoffeeCup = CoffeeCup;
People.SoftDrink = SoftDrink;
People.RefreshmentDrink = RefreshmentDrink;
People.Beer = Beer;
People.AlchoholicDrink = AlchoholicDrink;
People.FoodCutlery = FoodCutlery;
People.FoodClochebell = FoodClochebell;

People.displayName = "PeopleIcon";

export default People;
