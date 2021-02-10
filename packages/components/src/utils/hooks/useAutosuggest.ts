import { SelectFilterProps } from "../../components/Select";
import { SelectedItems } from "../../components/Select/Select";

export type AutosuggestItem = Pick<SelectedItems, "id" | "content" | "isShown">;
export type UseAutosuggestOptions<T extends AutosuggestItem = AutosuggestItem> = {
  items: Array<T>;
};

export type AutosuggestHandleSearchOptions = {
  newVal: string;
} & Pick<SelectFilterProps, "filterById">;

export const useAutosuggest = <T extends AutosuggestItem = AutosuggestItem>({ items }: UseAutosuggestOptions<T>) => {
  const handleSearch = ({ newVal: value, filterById }: AutosuggestHandleSearchOptions): typeof items => {
    const newVal = value.split(" ").filter(val => val.trim().length >= 1);
    const suggestions = items.map(({ id, content, ...rest }) => {
      let isShown: boolean = rest.isShown;
      if (content) {
        isShown = newVal.every(val => content.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }
      if (filterById && id) {
        isShown = newVal.some(val => id.toLowerCase().indexOf(val.toLowerCase()) > -1);
        // isShown = id.toLowerCase().indexOf(value.toLowerCase()) > -1;
      }
      return { ...rest, id, content, isShown };
    }) as typeof items;

    return suggestions;
  };

  return { handleSearch };
};
