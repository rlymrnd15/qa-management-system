function TestCaseStats({ testCases }) {
  const total = testCases.length;

  // Supports both old values ("Pass"/"Fail")
  // and new values ("Passed"/"Failed")
  const passed = testCases.filter((testCase) => {
    const status = String(testCase.status || "")
      .trim()
      .toLowerCase();

    return (
      status === "passed" ||
      status === "pass"
    );
  }).length;

  const failed = testCases.filter((testCase) => {
    const status = String(testCase.status || "")
      .trim()
      .toLowerCase();

    return (
      status === "failed" ||
      status === "fail"
    );
  }).length;

  const notRun = testCases.filter((testCase) => {
    const status = String(testCase.status || "")
      .trim()
      .toLowerCase();

    return status === "not run";
  }).length;

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