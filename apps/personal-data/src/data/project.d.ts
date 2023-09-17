export type project = {
  title: string; // "Landing Page - Broken Dream Café",
  subtitle: string; //"A responsive design landing page for a non-existing restaurant, using React.js, Semantic UI React, and CSS Module",
  image: string; // "https://media.githubusercontent.com/media/CeruleanW/large-static-files/master/broken-dream-01.png",
  techs: string[]; //["React.js", "Semantic UI React", "CSS Module", "HTML", "CSS"],
  id: string; // "0c6d7ee9-fbca-477f-8f0d-2f1eb50283f0",
  type?: string;
  repo?: string;
  live?: string;
  content: {
    introduction?: string;
    goal?: string;
    spotlight?: string;
    problem?: string[];
    lesson?: string[];
  };
  illustrations?: string[];
};
