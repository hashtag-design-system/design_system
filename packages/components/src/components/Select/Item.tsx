import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClassnames, useDisabled, useSelectContext } from "../../utils";
import { ComponentProps, ComponentState } from "../__helpers__";
import Select, { SelectedItems } from "./Select";

export type Props = {
  content: string;
  valueAlternative?: string;
  htmlContent?: { before?: React.ReactNode; after?: React.ReactNode };
};

export type FProps = Props &
  Required<Pick<ComponentProps<"input">, "id">> &
  Pick<ComponentProps<"input">, "defaultChecked" | "children" | "className"> &
  ComponentProps<"div", false> &
  ComponentState<"default" | "hover" | "focus" | "disabled">;

export type SBProps = Props & Pick<FProps, "id" | "state" | "defaultChecked" | "onClick">;

export const Item: React.FC<FProps> = React.memo(
  ({ id, state, defaultChecked = false, content = "", htmlContent, onClick, children, valueAlternative, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [classNames, rest] = useClassnames("select__item", props, { stateToRemove: { state } });
    const isDisabled = useDisabled(props, state);

    const [isChecked, setIsChecked] = useState(defaultChecked);

    const { multiSelectable, filterValue, items, isMobile, setItems, handleToggle, onSelect } = useSelectContext();

    const addItem = useCallback(() => {
      setItems(prevState => [
        ...prevState,
        {
          id,
          content,
          valueAlternative: valueAlternative,
          selected: defaultChecked,
          isShown: true,
          ref,
        },
      ]);
    }, [id, defaultChecked, content, valueAlternative, setItems]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (isDisabled) {
          return;
        }
        if (!multiSelectable) {
          handleToggle(e, false);
        }

        // state has not been updated yet, that is why the opposite is used
        const newItems = items.map(item => {
          if (item.id === id) {
            const newItem: SelectedItems = {
              ...item,
              // Opposite because the state has not changed yet
              selected: !isChecked,
            };
            return newItem;
          }

          if (multiSelectable) {
            return item;
          } else {
            return { ...item, selected: false };
          }
        });
        if (!isDisabled) {
          setItems(newItems);

          if (onSelect) {
            onSelect(newItems);
          }
        }

        if (onClick) {
          onClick(e);
        }
      },
      [id, items, multiSelectable, isChecked, isDisabled, onSelect, onClick, setItems, handleToggle]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const key = e.code;

      switch (key) {
        case "Enter": {
          handleClick(e as any);
          break;
        }
        case "Escape": {
          handleToggle(e, false);
          break;
        }
      }
    };

    const item = useMemo(() => items.find(item => item.id === id), [id, items]);

    useEffect(() => {
      // if (typeof jest === "undefined") {
      if (!item) {
        // if (items.length === 0) {
        addItem();
      }
    }, [item, addItem]);

    useEffect(() => {
      setIsChecked(item?.selected!);
    }, [item?.selected]);

    useEffect(() => {
      if ((!isChecked || isDisabled) && ref && ref.current) {
        ref.current.blur();
      }
    }, [isDisabled, isChecked]);

    const isHidden = useMemo(() => !item?.isShown, [item?.isShown]);

    const handleSearch: () => string = useCallback(() => {
      let newChildren = item?.content || "";
      const newFilterValue = filterValue.join(" ");
      if (newFilterValue) {
        newChildren = newChildren.replace(new RegExp(newFilterValue, "gi"), match => `<strong><b>${match}</b></strong>`) || "";
      }
      return newChildren;
    }, [filterValue, item?.content]);

    const fChecked = useMemo(() => isChecked || defaultChecked, [isChecked, defaultChecked]);
    const fChildren = useMemo(() => handleSearch(), [handleSearch]);

    return (
      <>
        <div
          className={classNames}
          ref={ref}
          tabIndex={isDisabled ? -1 : 0}
          onClick={e => handleClick(e)}
          onMouseDown={e => handleClick(e)}
          onKeyDown={e => handleKeyDown(e)}
          aria-selected={fChecked}
          aria-disabled={isDisabled}
          data-testid="select-item"
          role="option"
          aria-hidden={isHidden}
          // Better performance
          hidden={isHidden}
          // style={{ display: isHidden ? "none" : undefined }}
          {...rest}
        >
          <input
            type="checkbox"
            value={String(fChecked)}
            aria-checked={fChecked}
            id={id}
            disabled={Boolean(isDisabled)}
            aria-disabled={isDisabled}
            className="select__item__input"
            data-testid="select-item-input"
          />
          <label unselectable="on" htmlFor={id} className="select__item__label" data-testid="select-item-label">
            {htmlContent?.before}
            <div dangerouslySetInnerHTML={{ __html: fChildren || "" }}></div>
            {htmlContent?.after}
          </label>
        </div>
        {isMobile && !isHidden && <Select.Hr />}
        {/* </MobileView> */}
      </>
    );
  }
);
