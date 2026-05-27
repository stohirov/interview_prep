export function Footer() {
  return (
    <footer className="no-print mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-4 justify-between">
        <p>Built for senior Java engineers prepping for FAANG, EPAM and the rest. Content sourced from the JDK 25 Javadoc and JEPs.</p>
        <p>
          <a
            href="https://docs.oracle.com/en/java/javase/25/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700 dark:hover:text-slate-200 underline underline-offset-2"
          >
            Java SE 25 docs ↗
          </a>
        </p>
      </div>
    </footer>
  );
}
