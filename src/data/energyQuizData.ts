import type { QuizStep } from "@/components/quiz/QuizEngine";

export const energyLongSteps: QuizStep[] = [
  {
    type: "question",
    question: "How old are you?",
    options: [
      { label: "50+ Years Old" },
      { label: "40 - 49 Years Old" },
      { label: "30 - 39 Years Old" },
      { label: "20 - 29 Years Old" },
    ],
  },
  {
    type: "question",
    question: "What's draining your energy the most right now?",
    options: [
      { label: "Constant fatigue throughout the day", icon: "battery-low" },
      { label: "Afternoon energy crashes", icon: "trending-down" },
      { label: "Poor sleep quality", icon: "moon" },
      { label: "Brain fog and lack of focus", icon: "brain" },
      { label: "All of the above", icon: "frown" },
    ],
  },
  {
    type: "question",
    question: "How many cups of coffee or energy drinks do you rely on daily?",
    options: [
      { label: "4+ cups - Can't function without it", icon: "coffee" },
      { label: "2-3 cups - Need the boost", icon: "coffee" },
      { label: "1 cup - Just to start the day", icon: "coffee" },
      { label: "None - I avoid caffeine", icon: "ban" },
    ],
  },
  {
    type: "question",
    question: "Do you experience brain fog or difficulty concentrating?",
    subtitle: "Especially in the afternoon or after meals.",
    options: [
      { label: "Yes, constantly" },
      { label: "Often, several times a week" },
      { label: "Occasionally" },
      { label: "Rarely or never" },
    ],
  },
  {
    type: "question",
    question: "How would you rate your diet quality?",
    whyWeAsk:
      "Nutrient deficiencies are one of the leading causes of chronic fatigue. Ultra-processed foods now make up over 50% of the average diet and are linked to significantly lower energy levels.",
    options: [
      { label: "Mostly processed/fast food" },
      { label: "Mix of healthy and processed" },
      { label: "Mostly whole foods" },
      { label: "Very clean, whole food diet" },
    ],
  },
  {
    type: "question",
    question: "When did your energy levels start declining?",
    options: [
      { label: "Over a year ago" },
      { label: "In the past year" },
      { label: "In the past few months" },
      { label: "I've always had low energy" },
    ],
  },
  {
    type: "question",
    question: "What would more energy mean for you?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    options: [
      { label: "Being more productive at work" },
      { label: "Having energy for workouts" },
      { label: "Being present with family" },
      { label: "Feeling like myself again" },
      { label: "All of the above" },
    ],
  },
  {
    type: "interstitial",
    title: "Great news! ⚡",
    interstitialSubtitle:
      "Over 429,576 men have reclaimed their energy and vitality thanks to our Natural Optimization System!",
  },
  {
    type: "question",
    question: "How many hours of quality sleep do you get per night?",
    options: [
      { label: "Less than 5 hours" },
      { label: "5-6 hours" },
      { label: "7-8 hours" },
      { label: "More than 8 hours" },
    ],
  },
  {
    type: "question",
    question: "Do you exercise regularly?",
    options: [
      { label: "No, I'm too tired" },
      { label: "Occasionally, when I have energy" },
      { label: "2-3 times per week" },
      { label: "4+ times per week" },
    ],
  },
  {
    type: "question",
    question: "Do you have a family history of diabetes, heart disease, or metabolic issues?",
    whyWeAsk:
      "These conditions share similar root causes with chronic fatigue — insulin resistance, inflammation, and nutrient deficiencies. Family patterns help us identify your risk factors.",
    options: [
      { label: "Yes" },
      { label: "No" },
      { label: "Not Sure" },
    ],
  },
  {
    type: "loading",
  },
];

export const energyShortSteps: QuizStep[] = [
  {
    type: "question",
    question: "How old are you?",
    options: [
      { label: "50+ Years Old" },
      { label: "40 - 49 Years Old" },
      { label: "30 - 39 Years Old" },
      { label: "20 - 29 Years Old" },
    ],
  },
  {
    type: "question",
    question: "What's draining your energy the most right now?",
    options: [
      { label: "Constant fatigue throughout the day", icon: "battery-low" },
      { label: "Afternoon energy crashes", icon: "trending-down" },
      { label: "Poor sleep quality", icon: "moon" },
      { label: "Brain fog and lack of focus", icon: "brain" },
      { label: "All of the above", icon: "frown" },
    ],
  },
  {
    type: "question",
    question: "How many cups of coffee or energy drinks do you rely on daily?",
    options: [
      { label: "4+ cups - Can't function without it", icon: "coffee" },
      { label: "2-3 cups - Need the boost", icon: "coffee" },
      { label: "1 cup - Just to start the day", icon: "coffee" },
      { label: "None - I avoid caffeine", icon: "ban" },
    ],
  },
  {
    type: "question",
    question: "What would more energy mean for you?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    options: [
      { label: "Being more productive at work" },
      { label: "Having energy for workouts" },
      { label: "Being present with family" },
      { label: "Feeling like myself again" },
      { label: "All of the above" },
    ],
  },
  {
    type: "interstitial",
    title: "Great news! ⚡",
    interstitialSubtitle:
      "Over 429,576 men have reclaimed their energy and vitality thanks to our Natural Optimization System!",
  },
  {
    type: "loading",
  },
];
