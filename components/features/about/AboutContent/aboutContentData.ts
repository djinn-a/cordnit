export type AboutTabContent = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
};

export const aboutContentData: AboutTabContent[] = [
  {
    id: "story",
    label: "Our Story",
    title: "Our Story",
    paragraphs: [
      "Cordinit exists to make that change more useful: connecting clear thinking, capable delivery and long-term operational support around the outcomes our clients need.",
      "We believe successful transformation is not just about introducing new tools. It is about creating the conditions for people, processes and technology to work better together.",
    ],
    imageSrc: "/img/team-member.jpg", // Kept local as requested
    imageAlt: "Cordinit team working in modern office",
  },
  {
    id: "mission",
    label: "Our Mission",
    title: "Our Mission",
    paragraphs: [
      "To accelerate sustainable growth for modern enterprises by aligning strategic vision with rigorous technical execution.",
      "We ensure every initiative delivers tangible business value and operational resilience."
    ],
    imageSrc: "/img/team-member.jpg",
    imageAlt: "Cordinit team working in modern office",
  },
  {
    id: "vision",
    label: "Our Vision",
    title: "Our Vision",
    paragraphs: [
      "To be the premier partner for organizations navigating complex technological transformations.",
      "We envision a future where technology acts as a seamless extension of business strategy, driving innovation and efficiency at every level."
    ],
    imageSrc: "/img/team-member.jpg",
    imageAlt: "Cordinit team working in modern office",
  }
];
