import "!style-loader!css-loader!sass-loader!../src/App.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  Story => {
    return (
      <div className="storybook__container">
        <Story />
      </div>
    );
  },
];
