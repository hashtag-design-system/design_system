import { COUNTRIES, COUNTRIES_ARR, COUNTRIES_LITERAL_TYPE } from "@the_hashtag/common";
import { AsYouType, CountryCode } from "libphonenumber-js";
import React, { useCallback, useEffect, useState } from "react";
import { useClassnames, useDisabled } from "../../utils";
import Select, { SelectButtonFProps, SelectCountriesProps, SelectFilterFProps, SelectFProps, SelectModalFProps, SelectOptionsFProps } from "../Select";
import { SelectedItems } from "../Select/Select";
import Input, { InputFProps } from "./index";

export type Props = {
  defaultCountry?: COUNTRIES_LITERAL_TYPE;
  inputProps?: InputFProps;
  selectProps?: SelectFProps;
  selectBtnProps?: SelectButtonFProps & {placeholder?: string};
  selectModalProps?: SelectModalFProps;
  selectFilterProps?: SelectFilterFProps;
  selectOptionsProps?: SelectOptionsFProps;
} & Pick<SelectCountriesProps, "withFlags">;

const Tel: React.FC<Props> = React.memo(
  ({
    defaultCountry,
    inputProps = {},
    selectProps = {},
    selectBtnProps = {},
    selectModalProps,
    selectFilterProps,
    selectOptionsProps,
    withFlags = true,
  }) => {
    const { onSelect: selectPropsOnSelect, ...selectSRest } = selectProps;
    const { children: selectBtnChildren, ...selectBtnSRest } = selectBtnProps;
    const { onChange: inputOnChange, defaultValue, value, ...inputRest } = inputProps;

    const [inputValue, setInputValue] = useState<string>(String(value || defaultValue || ""));
    const [countryCode, setCountryCode] = useState<CountryCode | undefined>(undefined);
    const [selectClassNames, selectRest] = useClassnames("input-tel", selectSRest);
    const [selectBtnClassNames, selectBtnRest] = useClassnames("input-tel__btn", selectBtnSRest);
    const isDisabled = useDisabled(inputRest, inputProps.state);

    const setVal = useCallback(
      (newVal = inputValue, newCountryCode = countryCode): void => {
        const asYouType = new AsYouType(newCountryCode);
        const formattedVal = asYouType.input(newVal);
        setInputValue(formattedVal);
      },
      [inputValue, countryCode]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;

        if (!isDisabled) setVal(newVal);

        if (inputOnChange) inputOnChange(e);
      },
      [setVal, isDisabled, inputOnChange]
    );

    const handleSelect = useCallback(
      (items: SelectedItems[]) => {
        const selectedCountry = items.find(item => item.selected);
        if (!selectedCountry || isDisabled) return;
        const content = selectedCountry?.content;
        // https://stackoverflow.com/a/17779833/13142787
        const cCode = new RegExp(/\(\+([^)]+)\)/).exec(content);
        if (!cCode) return;
        const countryName = content.replace(cCode[0], "").trimEnd();
        const country = COUNTRIES[countryName.toUpperCase() as COUNTRIES_LITERAL_TYPE];
        setCountryCode(country.alpha2Code as CountryCode);

        if (selectPropsOnSelect) selectPropsOnSelect(items);
      },
      [isDisabled, selectPropsOnSelect]
    );

    useEffect(() => {
      if (defaultCountry && !countryCode) {
        const country = COUNTRIES[defaultCountry];

        if (country) {
          const newCountryCode = country.alpha2Code as CountryCode;
          setCountryCode(newCountryCode);
          setVal(undefined, newCountryCode);
        }
      }
    }, [defaultCountry, countryCode, setVal]);

    return (
      <div className="input-tel__container input--width" data-testid="input-tel-container">
        <Select width="5.35em" className={selectClassNames} onSelect={items => handleSelect(items)} {...selectRest}>
          <Select.Button className={selectBtnClassNames} {...selectBtnRest}>
            {selectBtnChildren
              ? selectBtnChildren
              : countryCode
              ? "+" + COUNTRIES_ARR.find(country => country.alpha2Code.toUpperCase() === countryCode.toUpperCase())?.callingCode ||
                selectBtnProps.placeholder || "Tel"
              : selectBtnProps.placeholder || "Tel"}
          </Select.Button>
          <Select.Modal {...selectModalProps}>
            <Select.Filter placeholder="Country" {...selectFilterProps} />
            <Select.Options {...selectOptionsProps}>
              {/* <div style={{ height: "100%", width: "100%", minHeight: "200px" }}>
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      height={height}
                      width={width}
                      style={{ overflowX: "hidden" }}
                      itemCount={COUNTRIES_ARR.length}
                      itemSize={50}
                      itemData={props}
                    >
                      {({ index, style }) => {
                        const { id, name, callingCode, ...country } = COUNTRIES_ARR[index];

                        return (
                          <Select.Country
                            key={id}
                            id={id}
                            name={name}
                            content={name + ` (+${callingCode})`}
                            callingCode={callingCode}
                            style={style}
                            {...country}
                            valueAlternative={"+" + callingCode}
                          />
                        );
                      }}
                    </List>
                  )}
                </AutoSizer>
              </div> */}
              {COUNTRIES_ARR.map(({ id, name, callingCode, ...country }) => {
                return (
                  <Select.Country
                    key={id}
                    id={id}
                    name={name}
                    content={name + ` (+${callingCode})`}
                    callingCode={callingCode}
                    withFlags={withFlags}
                    // style={style}
                    {...country}
                    valueAlternative={"+" + callingCode}
                  />
                );
              })}
            </Select.Options>
          </Select.Modal>
        </Select>
        <Input type="tel" overrideOnChange value={inputValue} onChange={e => handleChange(e)} {...inputRest} />
      </div>
    );
  }
);

Tel.displayName = "InputTel";

export default Tel;
