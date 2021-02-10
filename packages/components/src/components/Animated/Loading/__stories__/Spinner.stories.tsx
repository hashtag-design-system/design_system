import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../../config";
import Animated from "../../index";
import { AnimatedLoadingSpinnerProps } from "../index";

export default {
  title: `${storybookTitles.ANIMATED_LOADING}/Spinner`,
  component: Animated.Loading.Spinner,
  args: {
    size: "5em",
    color: "var(--primary)",
    rotateAnimation: { duration: "2s", timing: "linear", iteration: "infinite" },
    dashAnimation: { duration: "1.5s", timing: "ease-in-out", iteration: "infinite" }
  },
} as Meta;

const Template: Story<AnimatedLoadingSpinnerProps> = args => <Animated.Loading.Spinner {...args} />;

export const Default = Template.bind({});

export const Smaller = Template.bind({});
Smaller.args = {
  size: "50px",
};

export const Slower = Template.bind({});
Slower.args = {
  rotateAnimation: { duration: "4s" },
};

export const Faster = Template.bind({});
Faster.args = {
  rotateAnimation: { duration: "2s" },
};

export const WithDifferentColor = Template.bind({});
WithDifferentColor.args = {
  color: "orangered",
};
WithDifferentColor.storyName = "With different color";
