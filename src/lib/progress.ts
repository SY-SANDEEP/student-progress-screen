import type { Topic } from "../types/student";

export function isStarted(topic: Topic): boolean {
  return topic.questionsAttempted > 0 && topic.lastStudied !== null;
}

export function getStartedTopics(topics: Topic[]): Topic[] {
  return topics.filter(isStarted);
}

export function getNotStartedTopics(topics: Topic[]): Topic[] {
  return topics.filter((topic) => topic.questionsAttempted === 0 && topic.lastStudied === null);
}

export function getOverallMastery(topics: Topic[]): number {
  const started = getStartedTopics(topics);
  if (started.length === 0) return 0;
  return Math.round(started.reduce((sum, topic) => sum + topic.mastery, 0) / started.length);
}

export function getTotalQuestions(topics: Topic[]): number {
  return topics.reduce((sum, topic) => sum + topic.questionsAttempted, 0);
}

export function getTopicStatus(topic: Topic): "Strong" | "Developing" | "Needs Practice" | "Needs Attention" | "Not Started" {
  if (!isStarted(topic)) return "Not Started";
  if (topic.mastery >= 80) return "Strong";
  if (topic.mastery >= 60) return "Developing";
  if (topic.mastery >= 40) return "Needs Practice";
  return "Needs Attention";
}

export function getTopicStatusCopy(topic: Topic): string {
  switch (getTopicStatus(topic)) {
    case "Strong": return "You’re in a strong place";
    case "Developing": return "A little more practice will help";
    case "Needs Practice": return "Worth revisiting soon";
    case "Needs Attention": return "Top priority for your next session";
    default: return "Ready when you are";
  }
}

export function formatDate(date: string | null): string {
  if (!date) return "Not studied yet";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function getRelativeLastStudied(date: string | null, now = new Date("2026-08-24T00:00:00")): string {
  if (!date) return "Not studied yet";
  const last = new Date(`${date}T00:00:00`);
  const diffDays = Math.max(0, Math.round((now.getTime() - last.getTime()) / 86400000));
  if (diffDays === 0) return "Studied today";
  if (diffDays === 1) return "Studied yesterday";
  if (diffDays < 7) return `Studied ${diffDays} days ago`;
  if (diffDays < 30) return `Studied ${Math.floor(diffDays / 7)} weeks ago`;
  const months = Math.floor(diffDays / 30);
  return `Studied ${months} month${months === 1 ? "" : "s"} ago`;
}

export function getRecommendedTopic(topics: Topic[]): Topic | null {
  const started = getStartedTopics(topics);
  if (!started.length) return null;

  const maxDays = Math.max(...started.map((topic) => {
    const last = new Date(`${topic.lastStudied}T00:00:00`);
    return Math.max(0, Math.round((new Date("2026-08-24T00:00:00").getTime() - last.getTime()) / 86400000));
  }));

  return [...started].sort((a, b) => {
    const daysA = Math.max(0, Math.round((new Date("2026-08-24T00:00:00").getTime() - new Date(`${a.lastStudied}T00:00:00`).getTime()) / 86400000));
    const daysB = Math.max(0, Math.round((new Date("2026-08-24T00:00:00").getTime() - new Date(`${b.lastStudied}T00:00:00`).getTime()) / 86400000));
    const weaknessA = 100 - a.mastery;
    const weaknessB = 100 - b.mastery;
    const recencyA = maxDays === 0 ? 0 : daysA / maxDays;
    const recencyB = maxDays === 0 ? 0 : daysB / maxDays;
    const scoreA = weaknessA * 0.72 + recencyA * 28;
    const scoreB = weaknessB * 0.72 + recencyB * 28;
    return scoreB - scoreA;
  })[0] ?? null;
}

export function getRecommendationReason(topic: Topic): string {
  if (topic.mastery < 40) {
    return "Lowest mastery, and it has been a while since you last studied it.";
  }
  if (topic.mastery < 60) {
    return "Mastery is still developing, so this is a good topic to strengthen next.";
  }
  return "A focused refresher now can turn this into a stronger area.";
}
