import type { Topic } from "../types/student";
import { formatDate, getRecommendationReason, getRelativeLastStudied } from "../lib/progress";
import { ProgressBar } from "./ProgressBar";

export function RecommendedTopic({ topic }: { topic: Topic }) {
  return (
    <section aria-labelledby="recommended-heading" className="overflow-hidden rounded-3xl border border-[#cde0d3] bg-[#edf7f0]">
      <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#173a2d] px-2.5 py-1 text-xs font-semibold text-white">Recommended next</span>
            <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-[#4e6457]">{topic.mastery}% mastery</span>
          </div>
          <h2 id="recommended-heading" className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-[#173a2d] sm:text-3xl">{topic.name}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4c6155]">{getRecommendationReason(topic)}</p>
          <div className="mt-5 max-w-xl">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#4c6155]">
              <span>Mastery</span><span>{topic.mastery}%</span>
            </div>
            <ProgressBar value={topic.mastery} label={`${topic.name} mastery`} />
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#5a6b62]">
            <span>{topic.questionsAttempted} questions attempted</span>
            <span>{getRelativeLastStudied(topic.lastStudied)}</span>
            <span>Last studied {formatDate(topic.lastStudied)}</span>
          </div>
        </div>

        <div className="flex items-end bg-[#e2f0e6] p-5 sm:p-7 lg:w-56 lg:items-center">
          <button type="button" className="w-full rounded-xl bg-[#173a2d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204c3c] active:translate-y-px">
            Study topic
          </button>
        </div>
      </div>
    </section>
  );
}
