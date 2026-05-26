const { useState } = React;

const SEVERITY_OPTIONS = ['Low', 'Medium', 'Hard'];

const ALL_ISSUES_DEFAULT = `(high) description of biggest error in trajectory
(medium) another meaningful error....etc
(medium) description of another error...`;

const inputClass =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-950 dark:focus:ring-blue-400';

function SliderField({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      <div className="flex items-center gap-4">
        <input
          type="range"
          className="h-2 flex-1 cursor-pointer accent-blue-600"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <output className="w-8 text-center text-sm font-semibold tabular-nums">{value}</output>
      </div>
    </label>
  );
}

function IssueCard({ index, issue, onChange }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold">Issue {index}</span>
        <textarea
          className={inputClass}
          rows={4}
          placeholder="Describe the issue…"
          value={issue.text}
          onChange={(e) => onChange({ ...issue, text: e.target.value })}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Severity</span>
        <select
          className={inputClass}
          value={issue.severity}
          onChange={(e) => onChange({ ...issue, severity: e.target.value })}
        >
          {SEVERITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}

function OptionOne() {
  const [allIssues, setAllIssues] = useState(ALL_ISSUES_DEFAULT);
  const [trajectoryQuality, setTrajectoryQuality] = useState(3);

  return (
    <section className="flex flex-col gap-5" role="tabpanel">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold">All Issues</span>
        <textarea
          className={inputClass}
          rows={12}
          value={allIssues}
          onChange={(e) => setAllIssues(e.target.value)}
        />
      </label>

      <SliderField label="Trajectory Quality" value={trajectoryQuality} onChange={setTrajectoryQuality} />
    </section>
  );
}

function OptionTwo() {
  const [trajectoryQuality, setTrajectoryQuality] = useState(3);
  const [issues, setIssues] = useState([{ id: 1, text: '', severity: 'Low' }]);
  const [nextId, setNextId] = useState(2);

  const updateIssue = (id, patch) => {
    setIssues((prev) => prev.map((issue) => (issue.id === id ? { ...issue, ...patch } : issue)));
  };

  const addIssue = () => {
    setIssues((prev) => [...prev, { id: nextId, text: '', severity: 'Low' }]);
    setNextId((n) => n + 1);
  };

  return (
    <section className="flex flex-col gap-5" role="tabpanel">
      <SliderField label="Trajectory Quality" value={trajectoryQuality} onChange={setTrajectoryQuality} />

      <div className="flex flex-col gap-4">
        {issues.map((issue, idx) => (
          <IssueCard
            key={issue.id}
            index={idx + 1}
            issue={issue}
            onChange={(patch) => updateIssue(issue.id, patch)}
          />
        ))}
      </div>

      <button
        type="button"
        className="w-full rounded-lg border-2 border-dashed border-zinc-300 px-4 py-3 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
        onClick={addIssue}
      >
        <strong>Add new Issue</strong>
      </button>
    </section>
  );
}

function App() {
  const [activeOption, setActiveOption] = useState('one');

  const navClass = (active) =>
    active
      ? 'flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900'
      : 'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800';

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <nav className="mb-6 flex gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-700" role="tablist" aria-label="Form options">
        <button
          type="button"
          className={navClass(activeOption === 'one')}
          role="tab"
          aria-selected={activeOption === 'one'}
          onClick={() => setActiveOption('one')}
        >
          Option One
        </button>
        <button
          type="button"
          className={navClass(activeOption === 'two')}
          role="tab"
          aria-selected={activeOption === 'two'}
          onClick={() => setActiveOption('two')}
        >
          Option Two
        </button>
      </nav>

      {activeOption === 'one' ? <OptionOne /> : <OptionTwo />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
