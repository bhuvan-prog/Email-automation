const saveWorkflowLog =
  require(
    "../logs/workflowLogs"
  );

function checkWorkflowStatus(
  status
) {
  switch (status) {
    case "active":
      console.log(
        "Workflow Active ✅"
      );

      saveWorkflowLog({
        event:
          "workflow_active",

        message:
          "Workflow Started",

        createdAt:
          new Date(),
      });

      return true;

    case "paused":
      console.log(
        "Workflow Paused ⏸️"
      );

      saveWorkflowLog({
        event:
          "workflow_paused",

        message:
          "Workflow Paused",

        createdAt:
          new Date(),
      });

      return false;

    case "completed":
      console.log(
        "Workflow Completed 🎉"
      );

      saveWorkflowLog({
        event:
          "workflow_completed",

        message:
          "Workflow Completed",

        createdAt:
          new Date(),
      });

      return false;

    default:
      return false;
  }
}

module.exports =
  checkWorkflowStatus;