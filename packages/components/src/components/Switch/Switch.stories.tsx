import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../config/storybook";
import Switch from "./index";

export default {
  title: `${titleGroups.FORM}/Switch`,
  component: Switch,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as Meta;

export const Default: Story = args => <Switch incheck={isChecked => console.log(isChecked)} {...args} />;