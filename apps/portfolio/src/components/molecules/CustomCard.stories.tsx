import React from 'react';
import CustomCard from './CustomCard';

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
  component: CustomCard,
  title: 'Storybook2',
};

export default meta;

const Template: StoryFn = ((args: Record<string, unknown>) => <CustomCard {...(args as any)} />) as StoryFn;

const project1 = {
  title: 'Landing Page - Broken Dream Café',
  description:
    'A responsive design landing page for a non-existing restaurant, using React.js, Semantic UI React, and CSS Module',
  bg: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
};

export const Default = Template.bind({});
Default.args = { ...project1 };

export const Pinned = Template.bind({});
Pinned.args = {};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...(Default.args?.task as object | undefined),
    state: 'TASK_ARCHIVED',
  },
};
