import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../../config/storybook";
import Animated from "../../index";
import { AnimatedLoadingDotsProps } from "../index";

export default {
  title: `${titleGroups.ANIMATED_LOADING}/Dots`,
  component: Animated.Loading.Dots,
  args: {
    totalDots: 3,
    size: 18,
    margin: 8,
    bgClr: "var(--secondary)",
  },
} as Meta;

const Template: Story<AnimatedLoadingDotsProps> = args => <Animated.Loading.Dots {...args} />;

export const Default = Template.bind({});

export const Bigger = Template.bind({});
Bigger.args = {
  size: 24,
};

export const Faster = Template.bind({});
Faster.args = {
  dotsProps: { transition: { duration: 0.5 } },
};

export const Slower = Template.bind({});
Slower.args = {
  dotsProps: { transition: { duration: 2.5 } },
};

export const MoreDots = Template.bind({});
MoreDots.args = {
  totalDots: 5,
};
MoreDots.storyName = "More dots";

export const BiggerMargin = Template.bind({});
BiggerMargin.args = {
  margin: 16,
};
BiggerMargin.storyName = "Bigger margin";

export const WithDifferentColor = Template.bind({});
WithDifferentColor.args = {
  bgClr: "orangered",
};
WithDifferentColor.storyName = "With different color";
