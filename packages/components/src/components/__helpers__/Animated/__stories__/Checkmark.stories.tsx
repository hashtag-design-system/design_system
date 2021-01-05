import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../../config/storybook";
import { Animated, AnimatedCheckmarkSBProps } from "../../index";

export default {
  title: `${titleGroups.ANIMATED}/Checkmark`,
  component: Animated.Checkmark,
  args: {
    size: 35,
  },
} as Meta;

const Template: Story<AnimatedCheckmarkSBProps> = ({ size, stroke = "var(--primary)", ...args }) => (
  <Animated.Checkmark size={size} stroke={stroke} custom={true} {...args} />
  // <Animated.Checkmark style={{ position: "absolute", top: "50%", left: "50%" }} {...args} />
);

export const Default = Template.bind({});

export const Slower = Template.bind({});
Slower.args = {
  transition: { duration: 1 },
};

export const WithDifferentColor = Template.bind({});
WithDifferentColor.args = {
  stroke: "green",
};
WithDifferentColor.storyName = "With different color";
