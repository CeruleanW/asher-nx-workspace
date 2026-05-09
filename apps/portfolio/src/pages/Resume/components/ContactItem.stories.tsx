import React from 'react';
import ContactItem from './ContactItem';

interface StoryMeta {
  component: React.ComponentType<unknown>;
  title: string;
}

interface StoryFn {
  (args: Record<string, unknown>): JSX.Element;
  bind: (thisArg: unknown) => StoryFn;
  args?: Record<string, unknown>;
}

const meta: StoryMeta = {
  component: ContactItem,
  title: 'contact item',
};

export default meta;

const Template: StoryFn = ((args: Record<string, unknown>) => <ContactItem {...(args as any)} />) as StoryFn;

export const Default = Template.bind({});
Default.args = {};

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
