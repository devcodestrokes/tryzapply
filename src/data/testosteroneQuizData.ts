import type { QuizStep } from "@/components/quiz/QuizEngine";
import modelAge from "@/assets/quiz/model-age.png";
import modelMuscle from "@/assets/quiz/model-muscle.png";
import modelStress from "@/assets/quiz/model-stress.png";
import modelEnergy from "@/assets/quiz/model-energy.png";
import modelTimeline from "@/assets/quiz/model-timeline.png";
import modelGoals from "@/assets/quiz/model-goals.png";
import modelBody from "@/assets/quiz/model-body.png";
import bodyLean from "@/assets/quiz/body-lean.png";
import bodyAverage from "@/assets/quiz/body-average.png";
import bodySoft from "@/assets/quiz/body-soft.png";
import bodyHeavy from "@/assets/quiz/body-heavy.png";
import modelSleep from "@/assets/quiz/model-sleep.png";
import modelDiet from "@/assets/quiz/model-diet.png";
import modelBrainfog from "@/assets/quiz/model-brainfog.png";

export const testosteroneLongSteps: QuizStep[] = [
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
    question: "What's your biggest concern about your masculine health right now?",
    image: modelMuscle,
    options: [
      { label: "Energy levels", icon: "battery" },
      { label: "Muscle mass and strength", icon: "dumbbell" },
      { label: "Sex drive and performance", icon: "heart" },
      { label: "Mental focus and clarity", icon: "brain" },
      { label: "Weight Loss", icon: "scale" },
    ],
  },
  {
    type: "question",
    question: "Do you have stress symptoms during the day?",
    subtitle: "Like feeling tired, cranky, foggy, or moody.",
    image: modelStress,
    options: [
      { label: "Yes" },
      { label: "No" },
    ],
  },
  {
    type: "question",
    question: "How's your energy at 3pm compared to when you wake up?",
    options: [
      { label: "Completely drained - Need caffeine or a nap", icon: "battery-low" },
      { label: "Noticeably lower - Afternoon slump hits hard", icon: "trending-down" },
      { label: "Slightly tired - Still functional but slower", icon: "wind" },
      { label: "Same energy - No afternoon crash", icon: "zap" },
    ],
  },
  {
    type: "question",
    question: "When did you start noticing changes to your energy and drive?",
    options: [
      { label: "Over a year ago" },
      { label: "In the past year" },
      { label: "In the past few months" },
      { label: "Not sure" },
    ],
  },
  {
    type: "question",
    question: "What results are you expecting from increased testosterone?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    options: [
      { label: "Higher energy that lasts all day" },
      { label: "Increased muscle mass and strength" },
      { label: "Better sex drive and performance" },
      { label: "Improved mental clarity and focus" },
      { label: "All of the above" },
    ],
  },
  {
    type: "interstitial",
    title: "You are in the right place! 💪",
    interstitialSubtitle:
      "Over 429,576 men have reclaimed their T, drive, and physique thanks to our NEW Scientific, Natural T-Revival System!",
  },
  {
    type: "question",
    question: "How would you describe your current body composition?",
    options: [
      { label: "Lean and muscular", optionImage: bodyLean },
      { label: "Average build", optionImage: bodyAverage },
      { label: "Soft with some muscle", optionImage: bodySoft },
      { label: "Overweight/out of shape", optionImage: bodyHeavy },
    ],
  },
  {
    type: "question",
    question: "How many hours of quality sleep do you get per night?",
    image: modelSleep,
    options: [
      { label: "Less than 5 hours" },
      { label: "5-6 hours" },
      { label: "7-8 hours" },
      { label: "More than 8 hours" },
    ],
  },
  {
    type: "question",
    question: "Do you have a family history of diabetes, heart disease, or metabolic issues?",
    image: modelBrainfog,
    whyWeAsk:
      "These conditions share similar root causes with low testosterone — insulin resistance, inflammation, and metabolic dysfunction. Family patterns help us identify your risk factors.",
    options: [
      { label: "Yes" },
      { label: "No" },
      { label: "Not Sure" },
    ],
  },
  {
    type: "question",
    question: "How often do you eat processed foods?",
    image: modelDiet,
    whyWeAsk:
      "Processed foods contain chemicals and additives that disrupt hormone production. Ultra-processed foods are linked to lower testosterone levels in multiple studies.",
    options: [
      { label: "Daily - Most meals include processed foods" },
      { label: "Several times a week" },
      { label: "Occasionally - Mostly whole foods" },
      { label: "Rarely - I avoid processed foods" },
    ],
  },
  {
    type: "loading",
  },
];

export const testosteroneShortSteps: QuizStep[] = [
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
    question: "What's your biggest concern about your masculine health right now?",
    image: modelMuscle,
    options: [
      { label: "Energy levels", icon: "battery" },
      { label: "Muscle mass and strength", icon: "dumbbell" },
      { label: "Sex drive and performance", icon: "heart" },
      { label: "Mental focus and clarity", icon: "brain" },
      { label: "Weight Loss", icon: "scale" },
    ],
  },
  {
    type: "question",
    question: "How's your energy at 3pm compared to when you wake up?",
    image: modelEnergy,
    options: [
      { label: "Completely drained - Need caffeine or a nap", icon: "battery-low" },
      { label: "Noticeably lower - Afternoon slump hits hard", icon: "trending-down" },
      { label: "Slightly tired - Still functional but slower", icon: "wind" },
      { label: "Same energy - No afternoon crash", icon: "zap" },
    ],
  },
  {
    type: "question",
    question: "What results are you expecting from increased testosterone?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    image: modelGoals,
    options: [
      { label: "Higher energy that lasts all day" },
      { label: "Increased muscle mass and strength" },
      { label: "Better sex drive and performance" },
      { label: "Improved mental clarity and focus" },
      { label: "All of the above" },
    ],
  },
  {
    type: "interstitial",
    title: "You are in the right place! 💪",
    interstitialSubtitle:
      "Over 429,576 men have reclaimed their T, drive, and physique thanks to our NEW Scientific, Natural T-Revival System!",
  },
  {
    type: "loading",
  },
];
