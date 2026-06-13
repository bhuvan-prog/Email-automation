const connectDB =
  require("../config/db");

async function createAnalytics(
  analyticsData
) {
  try {
    const db =
      await connectDB();

    const analyticsCollection =
      db.collection(
        "analytics"
      );

    const result =
      await analyticsCollection.insertOne(
        analyticsData
      );

    console.log(
      "Analytics Saved ✅"
    );

    return result;
  } catch (error) {
    console.error(
      "Analytics Failed ❌",
      error
    );
  }
}

module.exports =
  createAnalytics;