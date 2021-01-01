import Select from "../index";

export type StoriesComponentProps = { headerChildren?: boolean; optionsChilden?: boolean };

export const StoriesItems: React.FC<Pick<StoriesComponentProps, "optionsChilden">> = ({ optionsChilden = false }) => {
  return (
    <>
      {!optionsChilden && <Select.Filter placeholder="Filter" floatingplaceholder={false} />}
      <Select.Options>
        {optionsChilden && <Select.Filter placeholder="Filter" floatingplaceholder={false} />}
        <Select.Item id="hey_george">Hey george</Select.Item>
        <Select.Item id="amsterdam">
          Amsterdam<p>george</p>
        </Select.Item>
        <Select.Item id="georgekrax">georgekrax</Select.Item>
        <Select.Item id="georgekrax2">georgekrachropoulos</Select.Item>
        <Select.Item id="test">Test item</Select.Item>
        <Select.Item id="test_id">
          <strong>NL</strong> Amsterdam
        </Select.Item>
      </Select.Options>
    </>
  );
};

export const StoriesComponent: React.FC<any & StoriesComponentProps> = ({
  headerChildren = false,
  optionsChilden = false,
  align = "left",
  ...props
}) => {
  return (
    <Select {...props}>
      <Select.Button style={{ width: "200px" }}>Projects</Select.Button>
      <Select.Modal align={align}>
        {headerChildren ? (
          <Select.Header value="header" {...props}>
            <StoriesItems optionsChilden={optionsChilden} />
          </Select.Header>
        ) : (
          <>
            <Select.Header value="header" {...props} />
            <StoriesItems optionsChilden={optionsChilden} />
          </>
        )}
      </Select.Modal>
    </Select>
  );
};
