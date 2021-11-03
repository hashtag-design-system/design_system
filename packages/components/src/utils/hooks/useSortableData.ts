import { useEffect, useState } from "react";
import { SortDirection } from "../../typings";

// See -> https://www.smashingmagazine.com/2020/03/sortable-tables-react/

type SortConfigType<T extends Record<string, any>> = { key: keyof T; direction: SortDirection };

export const useSortableData = <T extends Record<string, any>>(data: T[], config?: SortConfigType<T>) => {
  const [items, setItems] = useState(data);
  const [sort, setSort] = useState<SortConfigType<T> | undefined>(config);

  // eslint-disable-next-line
  useEffect(() => setItems(data), [data.length]);

  useEffect(() => {
    if (!sort) return;
    const { key, direction } = sort;
    setItems(
      data.slice().sort((a, b) => {
        if (a[key] < b[key]) return direction === "desc" ? 1 : -1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
    // eslint-disable-next-line
  }, [sort]);

  return { data: items, setSort };
};
