function TestCaseStats({ testCases }) {
  const total = testCases.length;

  const passed = testCases.filter(
    (testCase) => testCase.status === "Passed"
  ).length;

  const failed = testCases.filter(
    (testCase) => testCase.status === "Failed"
  ).length;

  const notRun = testCases.filter(
    (testCase) => testCase.status === "Not Run"
  ).length;

  const cards = [
    {
      title: "Total Test Cases",
      value: total,
    },
    {
      title: "Passed",
      value: passed,
    },
    {
      title: "Failed",
      value: failed,
    },
    {
      title: "Not Run",
      value: notRun,
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default TestCaseStats;