import { COUNTRY_TYPE } from "@the_hashtag/common";
import React, { useEffect, useState } from "react";
import { CONFIG } from "../../config";
import { useClassnames } from "../../utils";
import Select, { SelectCountriesProps, SelectItemFProps } from "./index";

export type FProps = COUNTRY_TYPE & Pick<SelectCountriesProps, "withFlags"> & Partial<Omit<SelectItemFProps, "id">>;

const Country: React.FC<FProps> = ({ id, name, flagKey, alpha2Code, alpha3Code, callingCode, isEu, withFlags = true, ...props }) => {
  const [url, setUrl] = useState<string>("");
  const [classNames, rest] = useClassnames("select__item__country", props);

  useEffect(() => {
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
    const newUrl = CONFIG.CLOUDFRONT_URL + btoa(imageRequest);
    setUrl(newUrl);
  }, [flagKey]);

  return (
    <Select.Item
      id={name.toLowerCase()}
      content={name}
      className={classNames}
      htmlContent={
        withFlags
          ? {
              before: <img src={url} className="select__item__country-flag" alt={name + " flag"} />,
            }
          : undefined
      }
      {...rest}
    />
  );
};

Country.displayName = "SelectCountry";

export default Country;
