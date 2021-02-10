import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../config";
import Switch from "./index";

export default {
  title: `${storybookTitles.FORM}/Switch`,
  component: Switch,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as Meta;

export const Default: Story = args => <Switch {...args} />;
