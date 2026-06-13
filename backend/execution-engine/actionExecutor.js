const saveWorkflowLog =
  require(
    "../logs/workflowLogs"
  );

const sendEmail =
  require(
    "../services/emailService"
  );

async function executeAction(
  action,
  workflow
) {
  let message =
    "";

  switch (
    action
  ) {

    case "send_email":

      await sendEmail(
        workflow.recipient,
        workflow.subject,
        workflow.message
      );

      message =
        "Email Sent ✅";

      break;

    case "send_message":
      message =
        "Message Sent ✅";
      break;

    case "assign_recruiter":
      message =
        "Recruiter Assigned ✅";
      break;

    default:
      message =
        "Unknown Action ❌";
  }

  console.log(
    message
  );

  await saveWorkflowLog(
    {
      event:
        action,

      message:
        message,

      createdAt:
        new Date(),
    }
  );
}

module.exports =
  executeAction;