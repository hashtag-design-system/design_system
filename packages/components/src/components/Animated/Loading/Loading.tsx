import React from "react"
import Dots from "./Dots";
import Spinner from "./Spinner";

export type Props = {

}

type SubComponents = {
  Spinner: typeof Spinner;
  Dots: typeof Dots;
}

const Loading: React.FC<Props> & SubComponents= () => {
  return (
    <div>

    </div>
  );
};

Loading.displayName = "Loading"
Loading.Spinner = Spinner;
Loading.Dots = Dots;

export default Loading;