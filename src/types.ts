export type CalculatorCategory =
  | 'Finance'
  | 'Health'
  | 'Education'
  | 'Math'
  | 'Unit Conversion'
  | 'Date & Time';

export interface CalculatorSEOData {
  id: string;
  slug: string;
  name: string;
  category: CalculatorCategory;
  icon: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  howToUse: string[];
  formulas: {
    title: string;
    expression: string;
    explanation: string;
  }[];
  example: {
    title: string;
    scenario: string;
    steps: string[];
    result: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
