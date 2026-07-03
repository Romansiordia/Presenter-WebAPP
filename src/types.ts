export type SlideLayout = 'title' | 'bullets' | 'features' | 'metrics' | 'image';

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface Metric {
  number: string;
  label: string;
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  title: string;
  subtitle: string;
  bullets: string[];
  metrics: Metric[];
  features: Feature[];
  imageUrl?: string;
  imageScale?: number | string;
  imageX?: number;
  imageY?: number;
  textColor?: string;
  titleFontSize?: string;
  subtitleFontSize?: string;
}

export interface Theme {
  name: string;
  bg: string;
  cardBg: string;
  text: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  btnBg: string;
  badge: string;
  fontClass: string;
}
