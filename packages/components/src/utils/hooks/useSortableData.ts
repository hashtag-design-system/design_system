import { useEffect, useState } from "react";
import { SortDirection } from "../../typings";

// See -> https://www.smashingmagazine.com/2020/03/sortable-tables-react/

type SortConfigType<T extends Record<string, any>> = { key: keyof T; direction: SortDirection };

export const useSortableData = <T extends Record<string, any>>(data: T[], config?: SortConfigType<T>) => {
  const [items, setItems] = useState(data);
  const [sort, setSort] = useState<SortConfigType<T> | undefined>(config);

  useEffect(() => {
    if (sort) {
      const { key, direction } = sort;
      setItems(prevData =>
        prevData.slice().sort((a, b) => {
          if (a[key] < b[key]) {
            return direction === "desc" ? 1 : -1;
          }
          if (a[key] > b[key]) {
            return direction === "asc" ? 1 : -1;
          }
          return 0;
        })
      );
    }
  }, [sort]);

  return { data: items, setSort };
};
