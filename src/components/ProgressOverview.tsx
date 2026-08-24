import type { Topic } from "../types/student";
import { getNotStartedTopics, getOverallMastery, getStartedTopics, getTotalQuestions } from "../lib/progress";

function Stat({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="rounded-2xl border border-[#e2e6dd] bg-white p-4 sm:p-5">
      <p className="text-sm text-[#69736c]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172019]">{value}</p>
      {detail && <p className="mt-1 text-xs font-medium text-[#7a837c]">{detail}</p>}
    </div>
  );
}

export function ProgressOverview({ topics }: { topics: Topic[] }) {
  const started = getStartedTopics(topics);
  const notStarted = getNotStartedTopics(topics);
  const mastery = getOverallMastery(topics);
  const totalQuestions = getTotalQuestions(topics);

  return (
    <section aria-labelledby="overview-heading" className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#2b6b4f]">At a glance</p>
          <h2 id="overview-heading" className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">Your progress so far</h2>
        </div>
        <p className="hidden max-w-sm text-right text-xs leading-5 text-[#69736c] sm:block">Overall mastery reflects the average mastery of topics you&apos;ve started.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#cfe2d6] bg-[#edf6f0] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#4d6256]">Overall mastery</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-[#173a2d]">{mastery}%</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-bold text-[#28694e]">{started.length}/8</div>
          </div>
          <p className="mt-2 text-xs text-[#5f7167]">Across started topics</p>
        </div>

        <Stat label="Questions attempted" value={totalQuestions} detail="Across all topics" />
        <Stat label="Topics started" value={started.length} detail="You have made a start" />
        <Stat label="Not started" value={notStarted.length} detail="Ready to begin next" />
      </div>
    </section>
  );
}
