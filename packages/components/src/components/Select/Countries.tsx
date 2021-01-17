import { COUNTRIES } from "@georgekrax-hashtag/common";
import React, { useMemo } from "react";
import { useClassnames } from "../../utils/hooks";
import Select, { SelectItemFProps } from "./index";

export const countriesArr = Object.values(COUNTRIES);
export type CountriesArrType = typeof countriesArr;

export type Props = {
  withFlags?: boolean;
  arr?: (countries: CountriesArrType) => CountriesArrType;
};

export type FProps = Props & Partial<SelectItemFProps>;

const Countries: React.FC<FProps> = React.memo(({ withFlags = true, arr, ...props }) => {
  const [classNames, rest] = useClassnames("select__item__country", props);

  // Works the same, if useEffect() and useState() were used, on initial render
  const fArr = useMemo(() => (arr ? arr(countriesArr) : countriesArr), [arr]);

  return (
    <>
      {fArr.map(({ id, name, flagKey }) => {
        const imageRequest = JSON.stringify({
          bucket: "hashtag.countries",
          key: `flags/${flagKey}`,
          edits: {
            resize: {
              width: 22,
              height: 16,
              fit: "fill",
            },
          },
        });
        const url = `https://d32454kkzii6gk.cloudfront.net/${btoa(imageRequest)}`;
        // const url = require(`../../../../assets/${flagKey}`)["default"];

        return (
          <Select.Item
            key={id}
            id={name.toLowerCase()}
            content={name}
            className={classNames}
            htmlContent={
              withFlags
                ? {
                    before: <img src={url} className="select__item__country-flag" alt={name.toLowerCase() + "_flag"} />,
                  }
                : undefined
            }
            {...rest}
          />
        );
      })}
    </>
  );
});

Countries.displayName = "SelectCountries";

export default Countries;
