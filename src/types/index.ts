export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface ComparisonItem {
  feature: string;
  vocalift: boolean;
  competitors: boolean;
}

export interface NavLink {
  id: number;
  title: string;
  href: string;
}