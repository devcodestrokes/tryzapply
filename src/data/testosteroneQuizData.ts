import type { QuizStep } from "@/components/quiz/QuizEngine";
import modelAge from "@/assets/quiz/model-age.png";
import beforeAfter1 from "@/assets/quiz/before-after.png";
import beforeAfter2 from "@/assets/quiz/before-after-2.png";
import beforeAfter3 from "@/assets/quiz/before-after-3.png";

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
    options: [
      { label: "Energy levels", emoji: "😊" },
      { label: "Muscle mass and strength", emoji: "💪" },
      { label: "Sex drive and performance", emoji: "🍆" },
      { label: "Mental focus and clarity", emoji: "☁️" },
      { label: "Weight Loss", emoji: "🧘" },
    ],
  },
  {
    type: "question",
    question: "Do you have stress symptoms during the day?",
    subtitle: "Like feeling tired, cranky, foggy, or moody.",
    options: [
      { label: "Yes", emoji: "😩" },
      { label: "No", emoji: "😊" },
    ],
  },
  {
    type: "question",
    question: "How's your energy at 3pm compared to when you wake up?",
    options: [
      { label: "Completely drained - Need caffeine or a nap", emoji: "🪫" },
      { label: "Noticeably lower - Afternoon slump hits hard", emoji: "📉" },
      { label: "Slightly tired - Still functional but slower", emoji: "😮‍💨" },
      { label: "Same energy - No afternoon crash", emoji: "⚡" },
    ],
  },
  {
    type: "question",
    question: "When did you start noticing changes to your energy and drive?",
    options: [
      { label: "Over a year ago", emoji: "📅" },
      { label: "In the past year", emoji: "🗓️" },
      { label: "In the past few months", emoji: "🕐" },
      { label: "Not sure", emoji: "🤔" },
    ],
  },
  {
    type: "question",
    question: "What results are you expecting from increased testosterone?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    options: [
      { label: "Higher energy that lasts all day", emoji: "⚡" },
      { label: "Increased muscle mass and strength", emoji: "💪" },
      { label: "Better sex drive and performance", emoji: "🔥" },
      { label: "Improved mental clarity and focus", emoji: "🧠" },
      { label: "All of the above", emoji: "✅" },
    ],
  },
  {
    type: "interstitial",
    title: "You are in the right place! 💪",
    interstitialSubtitle:
      "Over 429,576 men have reclaimed their T, drive, and physique thanks to our NEW Scientific, Natural T-Revival System!",
    interstitialImages: [beforeAfter1, beforeAfter2, beforeAfter3],
  },
  {
    type: "question",
    question: "How would you describe your current body composition?",
    options: [
      { label: "Lean and muscular", emoji: "💪" },
      { label: "Average build", emoji: "🧍" },
      { label: "Soft with some muscle", emoji: "🫠" },
      { label: "Overweight/out of shape", emoji: "😓" },
    ],
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
    question: "Do you have a family history of diabetes, heart disease, or metabolic issues?",
    whyWeAsk:
      "These conditions share similar root causes with low testosterone — insulin resistance, inflammation, and metabolic dysfunction. Family patterns help us identify your risk factors.",
    options: [
      { label: "Yes", emoji: "✅" },
      { label: "No", emoji: "❌" },
      { label: "Not Sure", emoji: "🤷" },
    ],
  },
  {
    type: "question",
    question: "How often do you eat processed foods?",
    whyWeAsk:
      "Processed foods contain chemicals and additives that disrupt hormone production. Ultra-processed foods are linked to lower testosterone levels in multiple studies.",
    options: [
      { label: "Daily - Most meals include processed foods", emoji: "🍔" },
      { label: "Several times a week", emoji: "🍕" },
      { label: "Occasionally - Mostly whole foods", emoji: "🥗" },
      { label: "Rarely - I avoid processed foods", emoji: "🥦" },
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
    options: [
      { label: "Energy levels", emoji: "😊" },
      { label: "Muscle mass and strength", emoji: "💪" },
      { label: "Sex drive and performance", emoji: "🍆" },
      { label: "Mental focus and clarity", emoji: "☁️" },
      { label: "Weight Loss", emoji: "🧘" },
    ],
  },
  {
    type: "question",
    question: "How's your energy at 3pm compared to when you wake up?",
    options: [
      { label: "Completely drained - Need caffeine or a nap", emoji: "🪫" },
      { label: "Noticeably lower - Afternoon slump hits hard", emoji: "📉" },
      { label: "Slightly tired - Still functional but slower", emoji: "😮‍💨" },
      { label: "Same energy - No afternoon crash", emoji: "⚡" },
    ],
  },
  {
    type: "question",
    question: "What results are you expecting from increased testosterone?",
    subtitle: "(Choose all that apply)",
    multiSelect: true,
    options: [
      { label: "Higher energy that lasts all day", emoji: "⚡" },
      { label: "Increased muscle mass and strength", emoji: "💪" },
      { label: "Better sex drive and performance", emoji: "🔥" },
      { label: "Improved mental clarity and focus", emoji: "🧠" },
      { label: "All of the above", emoji: "✅" },
    ],
  },
  {
    type: "interstitial",
    title: "You are in the right place! 💪",
    interstitialSubtitle:
      "Over 429,576 men have reclaimed their T, drive, and physique thanks to our NEW Scientific, Natural T-Revival System!",
    interstitialImages: [beforeAfter1, beforeAfter2, beforeAfter3],
  },
  {
    type: "loading",
  },
];