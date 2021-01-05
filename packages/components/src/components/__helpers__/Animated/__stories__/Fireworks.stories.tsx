import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../../config/storybook";
import { Animated, AnimatedFireworksProps } from "../../index";

export default {
  title: `${titleGroups.ANIMATED}/Fireworks`,
  component: Animated.Fireworks,
  parameters: {
    backgrounds: { default: "dark" },
  },
  argTypes: {
    color: {
      control: "text",
    },
    animationDelay: {
      control: "text",
      defaultValue: "3s",
    },
    animationTiming: {
      control: "text",
      defaultValue: "ease-in-out",
    },
    animationDuration: {
      control: "text",
      defaultValue: "infinite",
    },
  },
} as Meta;

const Template: Story<
  Omit<AnimatedFireworksProps, "animation"> & { animationDelay?: string; animationTiming?: string; animationDuration?: string }
> = ({ animationDelay, animationDuration, animationTiming, ...args }) => (
  <Animated.Fireworks
    animation={{
      delay: animationDelay,
      duration: animationDuration,
      timing: animationTiming,
    }}
    style={{ position: "absolute", top: "50%", left: "50%" }}
    {...args}
  />
);

export const Default = Template.bind({});

export const Faster = Template.bind({});
Faster.args = {
  animationDelay: "1s",
};

export const WithDifferentColor = Template.bind({});
WithDifferentColor.args = {
  color: "blueviolet",
};
WithDifferentColor.storyName = "With different color";
