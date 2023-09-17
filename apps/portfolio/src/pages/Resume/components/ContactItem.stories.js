import React from "react";
import ContactItem from "./ContactItem";

export default {
  component: ContactItem,
  title: "contact item",
};

const Template = (args) => <ContactItem {...args} />;


export const Default = Template.bind({});
Default.args = {

};

export const Phone = Template.bind({});
Phone.args = {
  type: 'phone',
  children: '55555555',
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  children: 'sdfsdf@gasdf.com',
};
