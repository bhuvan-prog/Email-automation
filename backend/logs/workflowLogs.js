const connectDB =
  require("../config/db");

async function saveWorkflowLog(
  logData
) {
  try {
    const db =
      await connectDB();

    const logCollection =
      db.collection(
        "workflowLogs"
      );

    await logCollection.insertOne(
      logData
    );

    console.log(
      "Workflow Log Saved ✅"
    );
  } catch (error) {
    console.error(
      "Workflow Log Error ❌",
      error
    );
  }
}

module.exports =
  saveWorkflowLog;