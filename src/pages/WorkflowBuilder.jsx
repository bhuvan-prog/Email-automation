import React, {
  useState,
} from "react";

import WorkflowCanvas from "../components/workflow/WorkflowCanvas";
import TriggerSelector from "../components/workflow/TriggerSelector";
import DelayModal from "../components/workflow/DelayModal";

const WorkflowBuilder =
  () => {
    const [
      workflowData,
      setWorkflowData,
    ] = useState({
      workflowName:
        "Recruitment Workflow",

      trigger:
        "connection_accepted",

      delay: 10,

      action:
        "send_email",

      recipient:
        "",

      subject:
        "",

      message:
        "",
    });

    const saveWorkflow =
      async () => {
        try {
          const response =
            await fetch(
              "http://localhost:5000/create-workflow",
              {
                method:
                  "POST",

                headers:
                  {
                    "Content-Type":
                      "application/json",
                  },

                body:
                  JSON.stringify(
                    workflowData
                  ),
              }
            );

          const data =
            await response.json();

          console.log(
            data
          );

          alert(
            "Workflow Saved ✅"
          );
        } catch (
          error
        ) {
          console.error(
            error
          );

          alert(
            "Workflow Failed ❌"
          );
        }
      };

    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Workflow Builder
          </h1>

          <p className="text-gray-500 mt-2">
            Create automated
            workflows for
            outreach campaigns
          </p>
        </div>

        {/* Workflow Configuration */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 border border-gray-200">

          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            Workflow Configuration
          </h2>

          <div className="grid grid-cols-3 gap-5">

            {/* Trigger */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Trigger
              </label>

              <select
                value={
                  workflowData.trigger
                }
                onChange={(
                  e
                ) =>
                  setWorkflowData(
                    {
                      ...workflowData,

                      trigger:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="connection_accepted">
                  Connection
                  Accepted
                </option>

                <option value="email_opened">
                  Email Opened
                </option>

                <option value="message_replied">
                  Message
                  Replied
                </option>
              </select>
            </div>

            {/* Delay */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Delay
                (Seconds)
              </label>

              <input
                type="number"
                value={
                  workflowData.delay
                }
                onChange={(
                  e
                ) =>
                  setWorkflowData(
                    {
                      ...workflowData,

                      delay:
                        Number(
                          e
                            .target
                            .value
                        ),
                    }
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Action
              </label>

              <select
                value={
                  workflowData.action
                }
                onChange={(
                  e
                ) =>
                  setWorkflowData(
                    {
                      ...workflowData,

                      action:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="send_email">
                  Send Email
                </option>

                <option value="send_message">
                  Send Message
                </option>

                <option value="assign_recruiter">
                  Assign Recruiter
                </option>
              </select>
            </div>

            {/* Recipient Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Recipient
                Email
              </label>

              <input
                type="email"
                placeholder="john@gmail.com"
                value={
                  workflowData.recipient
                }
                onChange={(
                  e
                ) =>
                  setWorkflowData(
                    {
                      ...workflowData,

                      recipient:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Subject
              </label>

              <input
                type="text"
                placeholder="Interview Invitation"
                value={
                  workflowData.subject
                }
                onChange={(
                  e
                ) =>
                  setWorkflowData(
                    {
                      ...workflowData,

                      subject:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div className="col-span-3">
              <label className="block text-sm font-medium mb-2">
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Write your email message..."
                value={
                  workflowData.message
                }
                onChange={(
                  e
                ) =>
                  setWorkflowData(
                    {
                      ...workflowData,

                      message:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="col-span-3 space-y-6">
            <TriggerSelector />
            <DelayModal />
          </div>

          {/* Canvas */}
          <div className="col-span-9">
            <WorkflowCanvas />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={
              saveWorkflow
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            Save Workflow
          </button>
        </div>
      </div>
    );
  };

export default
  WorkflowBuilder;