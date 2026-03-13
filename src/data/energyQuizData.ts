import type { QuizStep } from "@/components/quiz/QuizEngine";
import modelAge from "@/assets/quiz/model-age.png";

export const energyLongSteps: QuizStep[] = [
  {
    type: "question",
    question: "How old are you?",
    image: modelAge,
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
      { label: "Constant fatigue throughout the day", emoji: "🪫" },
      { label: "Afternoon energy crashes", emoji: "📉" },
      { label: "Poor sleep quality", emoji: "🌙" },
      { label: "Brain fog and lack of focus", emoji: "🧠" },
      { label: "All of the above", emoji: "😩" },
    ],
  },
  {
    type: "question",
    question: "How many cups of coffee or energy drinks do you rely on daily?",
    options: [
      { label: "4+ cups - Can't function without it", emoji: "☕" },
      { label: "2-3 cups - Need the boost", emoji: "☕" },
      { label: "1 cup - Just to start the day", emoji: "☕" },
      { label: "None - I avoid caffeine", emoji: "🚫" },
    ],
  },
  {
    type: "question",
    question: "Do you experience brain fog or difficulty concentrating?",
    subtitle: "Especially in the afternoon or after meals.",
    options: [
      { label: "Yes, constantly", emoji: "😵‍💫" },
      { label: "Often, several times a week", emoji: "😮‍💨" },
      { label: "Occasionally", emoji: "🤔" },
      { label: "Rarely or never", emoji: "😊" },
    ],
  },
  {
    type: "question",
    question: "How would you rate your diet quality?",
    whyWeAsk:
      "Nutrient deficiencies are one of the leading causes of chronic fatigue. Ultra-processed foods now make up over 50% of the average diet and are linked to significantly lower energy levels.",
    options: [
      { label: "Mostly processed/fast food", emoji: "🍔" },
      { label: "Mix of healthy and processed", emoji: "🍕" },
      { label: "Mostly whole foods", emoji: "🥗" },
      { label: "Very clean, whole food diet", emoji: "🥦" },
    ],
  },
  {
    type: "question",
    question: "When did your energy levels start declining?",
    options: [
      { label: "Over a year ago", emoji: "📅" },
      { label: "In the past year", emoji: "🗓️" },
      { label: "In the past few months", emoji: "🕐" },
      { label: "I've always had low energy", emoji: "😔" },
    ],
  },
  {
    type: "question",
    question: "What would more energy mean for you?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    options: [
      { label: "Being more productive at work", emoji: "💼" },
      { label: "Having energy for workouts", emoji: "🏋️" },
      { label: "Being present with family", emoji: "👨‍👩‍👧‍👦" },
      { label: "Feeling like myself again", emoji: "🙌" },
      { label: "All of the above", emoji: "✅" },
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
      { label: "Less than 5 hours", emoji: "😴" },
      { label: "5-6 hours", emoji: "🌙" },
      { label: "7-8 hours", emoji: "😌" },
      { label: "More than 8 hours", emoji: "😊" },
    ],
  },
  {
    type: "question",
    question: "Do you exercise regularly?",
    options: [
      { label: "No, I'm too tired", emoji: "😮‍💨" },
      { label: "Occasionally, when I have energy", emoji: "🚶" },
      { label: "2-3 times per week", emoji: "🏃" },
      { label: "4+ times per week", emoji: "💪" },
    ],
  },
  {
    type: "question",
    question: "Do you have a family history of diabetes, heart disease, or metabolic issues?",
    whyWeAsk:
      "These conditions share similar root causes with chronic fatigue — insulin resistance, inflammation, and nutrient deficiencies. Family patterns help us identify your risk factors.",
    options: [
      { label: "Yes", emoji: "✅" },
      { label: "No", emoji: "❌" },
      { label: "Not Sure", emoji: "🤷" },
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
    image: modelAge,
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
      { label: "Constant fatigue throughout the day", emoji: "🪫" },
      { label: "Afternoon energy crashes", emoji: "📉" },
      { label: "Poor sleep quality", emoji: "🌙" },
      { label: "Brain fog and lack of focus", emoji: "🧠" },
      { label: "All of the above", emoji: "😩" },
    ],
  },
  {
    type: "question",
    question: "How many cups of coffee or energy drinks do you rely on daily?",
    options: [
      { label: "4+ cups - Can't function without it", emoji: "☕" },
      { label: "2-3 cups - Need the boost", emoji: "☕" },
      { label: "1 cup - Just to start the day", emoji: "☕" },
      { label: "None - I avoid caffeine", emoji: "🚫" },
    ],
  },
  {
    type: "question",
    question: "What would more energy mean for you?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    options: [
      { label: "Being more productive at work", emoji: "💼" },
      { label: "Having energy for workouts", emoji: "🏋️" },
      { label: "Being present with family", emoji: "👨‍👩‍👧‍👦" },
      { label: "Feeling like myself again", emoji: "🙌" },
      { label: "All of the above", emoji: "✅" },
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