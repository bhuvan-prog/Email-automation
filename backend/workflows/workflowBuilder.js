const connectDB =
  require("../config/db");

async function createWorkflow(
  workflowData
) {
  try {
    const db =
      await connectDB();

    const workflowCollection =
      db.collection(
        "workflows"
      );

    const result =
      await workflowCollection.insertOne(
        workflowData
      );

    console.log(
      "Workflow Created ✅"
    );

    return result;
  } catch (error) {
    console.error(
      "Workflow Creation Failed ❌",
      error
    );
  }
}

module.exports =
  createWorkflow;