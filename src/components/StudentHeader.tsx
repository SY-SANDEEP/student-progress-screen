import type { Student } from "../types/student";
import { formatDate } from "../lib/progress";

export function StudentHeader({ student }: { student: Student }) {
  return (
    <header className="border-b border-[#e2e6dd] bg-white/80 backdrop-blur-sm">
      <div className="container-shell py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#173a2d] text-sm font-bold text-white shadow-sm" aria-hidden="true">
              U
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a837c]">Student progress</p>
              <h1 className="truncate text-sm font-bold text-[#172019] sm:text-base">{student.name}&apos;s {student.subject}</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-sm text-[#69736c] sm:flex">
            <span className="rounded-full border border-[#dfe4da] bg-[#fafbf8] px-3 py-1.5 font-medium">{student.examBoard}</span>
            <span className="rounded-full border border-[#dfe4da] bg-[#fafbf8] px-3 py-1.5">Exam: {formatDate(student.examDate)}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 sm:hidden">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-[#172019]">Hi {student.name} 👋</p>
            <p className="mt-1 text-sm text-[#69736c]">{student.subject} · {student.examBoard}</p>
          </div>
          <p className="text-xs font-medium text-[#69736c]">Exam {formatDate(student.examDate)}</p>
        </div>
      </div>
    </header>
  );
}
