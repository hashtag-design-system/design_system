import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../config/storybook";
import Pagination, { PaginationProps } from "./index";

export default {
  title: titleGroups.FORM_PAGINATION,
  component: Pagination,
  argTypes: {
    totalPages: {
      defaultValue: 10,
      control: "number",
    },
  },
} as Meta;

const Template: Story<PaginationProps> = ({ totalPages, ...args }) => <Pagination totalPages={totalPages} {...args} />;

export const Default = Template.bind({});

export const WithBtnsOnly = Template.bind({});
WithBtnsOnly.args = {
  showPageCount: false,
};
WithBtnsOnly.storyName = "With btns only";

export const WithShowBtnPrevious = Template.bind({});
WithShowBtnPrevious.args = {
  showBtn: "previous",
};
WithShowBtnPrevious.storyName = "With btn | Previous";

export const WithShowBtnNext = Template.bind({});
WithShowBtnNext.args = {
  showBtn: "next",
};
WithShowBtnNext.storyName = "With btn | Next";

export const WithNotBtns = Template.bind({});
WithNotBtns.args = {
  showBtn: false,
};
WithNotBtns.storyName = "With not btns";

export const ShowIfOne = Template.bind({});
ShowIfOne.args = {
  hideIfOne: false,
  totalPages: 1,
};
ShowIfOne.storyName = "Show if one";
