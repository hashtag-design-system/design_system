import { COUNTRIES_ARR } from "@georgekrax-hashtag/common";
import React, { useMemo } from "react";
import Select, { SelectItemFProps } from "./index";

export type CountriesArrType = typeof COUNTRIES_ARR;

// const Row: React.FC<any> = ({ data, index, style }) => {
//   // const { setRowHeight, ...rest } = data;
//   // const [height, setHeight] = useState(0);

//   // useEffect(() => {
//   //   if (height) {
//   //     setRowHeight(index, height);
//   //   }
//   // }, [index, height, setRowHeight]);

//   return <Select.Country style={style} {...COUNTRIES_ARR[index]} {...data} />;
// };

export type Props = {
  withFlags?: boolean;
  arr?: (countries: CountriesArrType) => CountriesArrType;
};

export type FProps = Props & Omit<Partial<SelectItemFProps>, "id">;

const Countries: React.FC<FProps> = React.memo(({ arr, ...props }) => {
  // Works the same, as useEffect() and useState() were used, on initial render
  const fArr = useMemo(() => (arr ? arr(COUNTRIES_ARR) : COUNTRIES_ARR), [arr]);

  // function getRowHeight(index: number) {
  //   return rowHeights.current[index] + 8 || 82;
  // }

  // function setRowHeight(index: number, size: number) {
  //   listRef.current.resetAfterIndex(0);
  //   rowHeights.current = { ...rowHeights.current, [index]: size };
  // }

  return (
    // <div style={{ height: "100%", width: "100%", minHeight: "200px" }}>
    //   <AutoSizer>
    //     {({ height, width }) => (
    //       <List
    //         height={height}
    //         width={width}
    //         style={{ overflowX: "hidden" }}
    //         itemCount={fArr.length}
    //         // itemSize={idx => getRowHeight(idx)}
    //         itemSize={50}
    //         itemData={props}
    //       >
    //         {Row}
    //       </List>
    //     )}
    //   </AutoSizer>
    // </div>
    <>
      {fArr.map(country => {
        return <Select.Country key={country.id} {...country} {...props} />;
      })}
    </>
  );
});

Countries.displayName = "SelectCountries";

export default Countries;
