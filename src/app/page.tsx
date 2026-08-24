import { ProgressOverview } from "../components/ProgressOverview";
import { RecommendedTopic } from "../components/RecommendedTopic";
import { StudentHeader } from "../components/StudentHeader";
import { TopicList } from "../components/TopicList";
import { studentData } from "../data/studentData";
import { getRecommendedTopic } from "../lib/progress";

export default function HomePage() {
  const recommended = getRecommendedTopic(studentData.topics);

  return (
    <div className="min-h-screen bg-[#f6f7f2]">
      <StudentHeader student={studentData.student} />

      <main className="container-shell py-7 sm:py-9">
        <section className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#778178]">GCSE Biology · {studentData.student.examBoard}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#172019] sm:text-4xl">Hi {studentData.student.name} 👋</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69736c] sm:text-base">Here&apos;s where you stand right now - and the one topic that will make the best use of your next study session.</p>
        </section>

        <div className="space-y-8 sm:space-y-10">
          <ProgressOverview topics={studentData.topics} />

          {recommended && <RecommendedTopic topic={recommended} />}

          <TopicList topics={studentData.topics} />
        </div>
      </main>

      <footer className="container-shell pb-8 pt-2 sm:pb-10">
        <p className="text-center text-xs text-[#8a928c]">Small, focused progress view for GCSE Biology.</p>
      </footer>
    </div>
  );
}
