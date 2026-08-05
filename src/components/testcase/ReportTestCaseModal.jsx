import { useEffect, useState } from "react";

function ReportTestCaseModal({
  isOpen,
  onClose,
  onSubmit,
  testCase = null,
  build = null,
  game = null,
  platform = null,
}) {
    console.log("isOpen:", isOpen);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Not Run",
    expectedResult: "",
    actualResult: "",
    steps: "",
    evidenceLink: "",
  });

  useEffect(() => {
    if (testCase) {
      setFormData({
        title: testCase?.title || "",
        description: testCase?.description || "",
        priority: testCase?.priority || "Medium",
        status: testCase?.status || "Not Run",
        expectedResult: testCase?.expectedResult || "",
        actualResult: testCase?.actualResult || "",
        steps: testCase?.steps || "",
        evidenceLink: testCase?.evidenceLink || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Not Run",
        expectedResult: "",
        actualResult: "",
        steps: "",
        evidenceLink: "",
      });
    }
  }, [testCase, build, isOpen]);

  const handleSubmit = () => {
    const newTestCase = {
        id: testCase ? testCase.id : Date.now(),
        testCaseId: testCase?.testCaseId || `TC-${Date.now()}`,
        game: game || testCase?.game,
        platform: platform || testCase?.platform,
        build: build?.version || testCase?.build,

        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
        expectedResult: formData.expectedResult,
        actualResult: formData.actualResult,
        steps: formData.steps,
        evidenceLink: formData.evidenceLink,

        tester: testCase?.tester || "Raily",
        date: testCase?.date || new Date().toLocaleDateString(),
    };

    onSubmit(newTestCase);
    onClose();
  };

  if (!isOpen) {
  console.log("Modal hidden");
  return null;
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {testCase ? "Edit Test Case" : "New Test Case"}
          </h2>
        </div>

        {/* Form */}
        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="text-sm font-semibold">
              Issue Title
            </label>

            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Enter test case title"
            />
          </div>            
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">
                    Description
                </label>

                <textarea
                    value={formData.description}
                    onChange={(e) =>
                    setFormData({
                        ...formData,
                        description: e.target.value,
                    })
                    }
                    className="mt-2 h-24 w-full rounded-xl border p-3"
                    placeholder="Describe the purpose of this test case..."
                />
                </div>

          <div>
            <label className="text-sm font-semibold">
              QA Test Case Priority
            </label>

            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option>P0</option>
              <option>P1</option>
              <option>P2</option>
            </select>
          </div>

              
        </div>

        <div className="mt-5">
          <label className="text-sm font-semibold">
            Steps to Execute
          </label>

          <textarea
            value={formData.steps}
            onChange={(e) =>
              setFormData({
                ...formData,
                steps: e.target.value,
              })
            }
            className="mt-2 h-32 w-full rounded-xl border p-3"
            placeholder="1. Open game..."
          />
        </div>

        <div className="mt-5">
            <label className="text-sm font-semibold">
                Expected Result
            </label>

            <textarea
                value={formData.expectedResult}
                onChange={(e) =>
                setFormData({
                    ...formData,
                    expectedResult: e.target.value,
                })
                }
                className="mt-2 h-24 w-full rounded-xl border p-3"
                placeholder="Expected outcome..."
            />
            </div>

            <div className="mt-5">
                <label className="text-sm font-semibold">
                    Actual Result
                </label>

                <textarea
                    value={formData.actualResult}
                    onChange={(e) =>
                    setFormData({
                        ...formData,
                        actualResult: e.target.value,
                    })
                    }
                    className="mt-2 h-24 w-full rounded-xl border p-3"
                    placeholder="Actual outcome..."
                />
                </div>

        <div className="mt-5">
          <label className="text-sm font-semibold">
            Evidence Link
          </label>

          <input
            value={formData.evidenceLink}
            onChange={(e) =>
              setFormData({
                ...formData,
                evidenceLink: e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border p-3"
            placeholder="https://drive.google.com/..."
          />
        </div>


        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
                className="rounded-xl px-5 py-3 hover:bg-slate-100"
            >
                Cancel
            </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {testCase ? "Save Changes" : "Submit Test Case"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ReportTestCaseModal;