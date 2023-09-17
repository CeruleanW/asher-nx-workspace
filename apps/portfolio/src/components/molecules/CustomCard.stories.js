import React from "react";
import CustomCard from "./CustomCard.jsx";

export default {
  component: CustomCard,
  title: "Storybook2",
};

// Card.propTypes = {
//   title: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
//   bg: PropTypes.string,
// };

const Template = (args) => <CustomCard {...args} />;
const project1 = {
  title: "Landing Page - Broken Dream Café",
  description:
    "A responsive design landing page for a non-existing restaurant, using React.js, Semantic UI React, and CSS Module",
  bg:
    "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
};

export const Default = Template.bind({});
Default.args = {
  ...project1
};

export const Pinned = Template.bind({});
Pinned.args = {};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
};
