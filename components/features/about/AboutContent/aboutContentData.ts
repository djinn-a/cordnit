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
      "Technology change can be full of promise and friction in equal measure. Cordinit exists to make that change more useful: connecting clear thinking, capable delivery and long-term operational support around the outcomes our clients need.",
      "We believe successful transformation is not just about introducing new tools. It is about creating the conditions for people, processes and technology to work better together.",
    ],
    imageSrc: "/img/team-member.webp", // Kept local as requested
    imageAlt: "Cordinit team working in modern office",
  },
  {
    id: "mission",
    label: "Our Mission",
    title: "Our Mission",
    paragraphs: [
      "To help organisations use technology with more confidence — creating better experiences, stronger operations and a more secure future."
    ],
    imageSrc: "/img/team-member.webp",
    imageAlt: "Cordinit team working in modern office",
  },
  {
    id: "vision",
    label: "Our Vision",
    title: "Our Vision",
    paragraphs: [
      "A world where complex technology change feels achievable, valuable and built to last."    ],
    imageSrc: "/img/team-member.webp",
    imageAlt: "Cordinit team working in modern office",
  }
];
