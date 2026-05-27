import { Link } from 'react-router-dom';
import { tracks } from '@/content/loader';

export function LandingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-20">
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-50">
          Pass the Java backend interview.
        </h1>
        <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
          Structured topics and answers grounded in the JDK 25 Javadoc and JEPs.
        </p>
        <div className="mt-8 flex items-center gap-6">
          <Link
            to="/track/java-backend"
            className="inline-flex items-center px-5 py-2.5 rounded-md bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity"
          >
            Start
          </Link>
          <Link
            to="/sources"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
          >
            Browse sources →
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
          Tracks
        </h2>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
          {tracks.map((track) => {
            const totalQuestions = track.modules.reduce(
              (acc, m) => acc + m.topics.reduce((a, t) => a + t.questions.length, 0),
              0,
            );
            return (
              <li key={track.id}>
                <Link
                  to={`/track/${track.id}`}
                  className="flex items-baseline justify-between py-5 group"
                >
                  <div>
                    <h3 className="text-base font-medium text-slate-900 dark:text-slate-50 group-hover:underline underline-offset-4">
                      {track.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {track.description}
                    </p>
                  </div>
                  <span className="ml-6 shrink-0 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    {totalQuestions} questions
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="grid sm:grid-cols-3 gap-8 text-sm text-slate-600 dark:text-slate-400">
        <p><span className="block font-medium text-slate-900 dark:text-slate-50 mb-1">Authoritative sources</span>Every claim links to the JDK 25 Javadoc, the JLS, or a JEP.</p>
        <p><span className="block font-medium text-slate-900 dark:text-slate-50 mb-1">Track progress</span>Mark Got it / Review / Didn’t know to surface weak areas.</p>
        <p><span className="block font-medium text-slate-900 dark:text-slate-50 mb-1">Search everything</span>Client-side full-text search across questions and topics.</p>
      </section>
    </div>
  );
}
