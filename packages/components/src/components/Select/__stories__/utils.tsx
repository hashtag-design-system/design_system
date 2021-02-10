import Select from "../index";

export type StoriesComponentProps = { headerChildren?: boolean; optionsChildren?: boolean };

export const StoriesItems: React.FC<Pick<StoriesComponentProps, "optionsChildren">> = ({ optionsChildren = false }) => {
  return (
    <>
      {!optionsChildren && <Select.Filter placeholder="Filter" floatingplaceholder={false} />}
      <Select.Options>
        {optionsChildren && <Select.Filter placeholder="Filter" floatingplaceholder={false} />}
        <Select.Item id="hey_george" content="Hey george" />
        <Select.Item id="amsterdam" content="Amsterdam" htmlContent={{ after: <p>, NL</p> }} />
        <Select.Item id="georgekrax" content="georgekrax" />
        <Select.Item id="georgekrax2" content="georgekrachropoulos" />
        <Select.Item id="test" content="Test item" />
        <Select.Item id="test_id" content=" Amsterdam" htmlContent={{ before: <strong>NL</strong> }} />
      </Select.Options>
    </>
  );
};

export const StoriesComponent: React.FC<any & StoriesComponentProps> = ({
  headerChildren = false,
  optionsChildren = false,
  align = "left",
  ...props
}) => {
  return (
    <Select {...props}>
      <Select.Button style={{ width: "200px" }}>Projects</Select.Button>
      <Select.Modal align={align}>
        {headerChildren ? (
          <Select.Header value="header" {...props}>
            <StoriesItems optionsChildren={optionsChildren} />
          </Select.Header>
        ) : (
          <>
            <Select.Header value="header" {...props} />
            <StoriesItems optionsChildren={optionsChildren} />
          </>
        )}
      </Select.Modal>
    </Select>
  );
};
