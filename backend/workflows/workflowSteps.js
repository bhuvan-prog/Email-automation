const connectDB =
  require("../config/db");

async function createWorkflowSteps(
  workflowData
) {
  try {
    const db =
      await connectDB();

    const workflowCollection =
      db.collection(
        "workflowSteps"
      );

    const result =
      await workflowCollection.insertOne(
        workflowData
      );

    console.log(
      "Workflow Steps Created ✅"
    );

    return result;
  } catch (error) {
    console.error(
      "Workflow Step Error ❌",
      error
    );
  }
}

module.exports =
  createWorkflowSteps;