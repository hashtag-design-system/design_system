import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../config";
import CreditCard, { CreditCardProps } from "./index";

export default {
  title: `${storybookTitles.DATA}/CreditCard`,
  component: CreditCard,
  argTypes: {
    expirationDate: {
      control: "text",
    },
  },
  args: {
    ownerName: "Storybook",
    brand: "MasterCard",
    creditNum: "0586",
    bg: false,
  },
} as Meta;

const Template: Story<CreditCardProps & { bg?: boolean }> = ({ bg = false, ...args }) => (
  <div className={bg ? `storybook__container credit-card` : undefined}>
    <CreditCard {...args} />
  </div>
);

export const VISA = Template.bind({});
VISA.args = {
  brand: "VISA",
};

export const MasterCard = Template.bind({});
MasterCard.args = {
  brand: "MasterCard",
};
MasterCard.storyName = "MasterCard";

export const AMEX = Template.bind({});
AMEX.args = {
  brand: "AMEX",
};

export const WithBg = Template.bind({});
WithBg.args = {
  bg: true,
};
WithBg.storyName = "With background";
