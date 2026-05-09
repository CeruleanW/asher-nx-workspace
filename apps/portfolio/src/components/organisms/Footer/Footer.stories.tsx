import React from 'react';
import Footer from './Footer';

interface StoryMeta {
  title: string;
  component: React.ComponentType<unknown>;
}

const meta: StoryMeta = {
  title: 'Footer',
  component: Footer,
};

export default meta;

export const Primary = (): JSX.Element => <Footer />;
