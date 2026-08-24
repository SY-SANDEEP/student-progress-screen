import type { Topic } from "../types/student";
import { getNotStartedTopics, getStartedTopics } from "../lib/progress";
import { TopicCard } from "./TopicCard";

export function TopicList({ topics }: { topics: Topic[] }) {
  const started = getStartedTopics(topics);
  const notStarted = getNotStartedTopics(topics);

  const ordered = [...started].sort((a, b) => b.mastery - a.mastery);

  return (
    <section aria-labelledby="topics-heading" className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#2b6b4f]">Topic progress</p>
          <h2 id="topics-heading" className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">How each topic is going</h2>
        </div>
        <p className="hidden text-sm text-[#69736c] sm:block">{started.length} of {topics.length} topics started</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {ordered.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      <div className="rounded-3xl border border-dashed border-[#cad2c8] bg-[#fafbf9] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-[#ecefeb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#69736c]">Not started yet</span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#172019]">Two topics are still waiting for you</h3>
            <p className="mt-1 max-w-xl text-sm leading-6 text-[#69736c]">No mastery score is shown until you actually begin. Start with one topic and build from there.</p>
          </div>
          <span className="text-sm font-semibold text-[#4e5d54]">{notStarted.length} ready to start</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {notStarted.map((topic) => (
            <article key={topic.id} className="rounded-2xl border border-[#e2e6dd] bg-white p-4 transition hover:border-[#cbd3c9]">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f2ee] text-[#69736c]" aria-hidden="true">→</div>
                <div className="min-w-0 flex-1">
                  <h4 className="break-words font-semibold text-[#172019]">{topic.name}</h4>
                  <p className="mt-1 text-xs text-[#69736c]">Not started yet</p>
                  <button type="button" className="mt-4 text-sm font-semibold text-[#28694e] underline decoration-[#a6c4b2] underline-offset-4 hover:text-[#173a2d]">Start learning</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
