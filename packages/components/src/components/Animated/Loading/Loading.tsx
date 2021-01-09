import React from "react"
import Spinner from "./Spinner";

export type Props = {

}

type SubComponents = {
  Spinner: typeof Spinner;
}

const Loading: React.FC<Props> & SubComponents= () => {
  return (
    <div>

    </div>
  );
};

Loading.displayName = "Loading"
Loading.Spinner = Spinner;

export default Loading;