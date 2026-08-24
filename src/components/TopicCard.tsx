import type { Topic } from "../types/student";
import { formatDate, getRelativeLastStudied, getTopicStatus, getTopicStatusCopy } from "../lib/progress";
import { ProgressBar } from "./ProgressBar";

const statusClasses: Record<ReturnType<typeof getTopicStatus>, string> = {
  Strong: "bg-[#e7f4ea] text-[#246343]",
  Developing: "bg-[#edf1e7] text-[#4d624f]",
  "Needs Practice": "bg-[#fbefdf] text-[#986028]",
  "Needs Attention": "bg-[#f8e7e3] text-[#a64638]",
  "Not Started": "bg-[#eef0ed] text-[#66716a]"
};

export function TopicCard({ topic }: { topic: Topic }) {
  const status = getTopicStatus(topic);

  return (
    <article className="group rounded-2xl border border-[#e2e6dd] bg-white p-4 shadow-[0_1px_0_rgba(23,32,25,0.02)] transition hover:-translate-y-0.5 hover:border-[#cfd7cd] hover:shadow-[0_10px_28px_rgba(23,32,25,0.06)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-base font-semibold leading-6 text-[#172019]">{topic.name}</h3>
          <p className="mt-1 text-xs font-medium text-[#7a837c]">{getTopicStatusCopy(topic)}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses[status]}`}>{status}</span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold tracking-tight text-[#172019]">{topic.mastery}%</p>
          <p className="mt-1 text-xs text-[#69736c]">Mastery</p>
        </div>
        <p className="text-right text-xs leading-5 text-[#69736c]">{topic.questionsAttempted} questions<br />attempted</p>
      </div>

      <div className="mt-4">
        <ProgressBar value={topic.mastery} label={`${topic.name} mastery`} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#eef0ec] pt-3 text-xs text-[#69736c]">
        <span>{getRelativeLastStudied(topic.lastStudied)}</span>
        <span className="truncate text-right">{formatDate(topic.lastStudied)}</span>
      </div>
    </article>
  );
}
