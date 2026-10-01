export interface Publication {
  type: "patent" | "conference" | "ieee" | "book-chapter" | "journal";
  title: string;
  venue: string;
  publisher?: string;
  year: string;
  authors: string;
  topic: string;
  impact?: { label: string; value: string }[];
  badge?: string;
  badgeColor?: string;
  thumbnail?: string;
  links: { label: string; url: string }[];
}

export const publications: Publication[] = [];
