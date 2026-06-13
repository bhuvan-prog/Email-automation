const http =
  require("http");

const connectDB =
  require("./config/db");

const createWorkflowSteps =
  require(
    "./workflows/workflowSteps"
  );

const configureTrigger =
  require(
    "./triggers/triggerConfig"
  );

const checkWorkflowStatus =
  require(
    "./workflows/workflowStatus"
  );

const executeWorkflow =
  require(
    "./execution-engine/engine"
  );

connectDB();

const server =
  http.createServer(
    async (req, res) => {
      const url =
        new URL(
          req.url,
          `http://${req.headers.host}`
        );

      // ======================
      // Handle CORS
      // ======================
      if (
        req.method ===
        "OPTIONS"
      ) {
        res.writeHead(200, {
          "Access-Control-Allow-Origin":
            "*",

          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS",

          "Access-Control-Allow-Headers":
            "Content-Type",
        });

        res.end();

        return;
      }

      // ======================
      // CREATE WORKFLOW API
      // ======================
      if (
        url.pathname ===
          "/create-workflow" &&
        req.method === "POST"
      ) {
        let body = "";

        req.on(
          "data",
          (chunk) => {
            body += chunk;
          }
        );

        req.on(
          "end",
          async () => {
            try {
              const data =
                JSON.parse(
                  body
                );

              console.log(
                "Frontend Data:",
                data
              );

              const trigger =
                configureTrigger(
                  data.trigger
                );

              const workflow = {
  workflowName:
    data.workflowName,

  recipient:
    data.recipient,

  subject:
    data.subject,

  message:
    data.message,

  steps: [
    {
      stepNumber: 1,
      type:
        "trigger",

      value:
        trigger,
    },

    {
      stepNumber: 2,
      type:
        "delay",

      value:
        data.delay,

      unit:
        "seconds",
    },

    {
      stepNumber: 3,
      type:
        "action",

      value:
        data.action,
    },
  ],

  status:
    "active",

  createdAt:
    new Date(),
};

              // Save Workflow
              await createWorkflowSteps(
                workflow
              );

              // Check Workflow Status
              const isWorkflowActive =
                checkWorkflowStatus(
                  workflow.status
                );

              if (
                !isWorkflowActive
              ) {
                res.writeHead(
                  200,
                  {
                    "Content-Type":
                      "application/json",

                    "Access-Control-Allow-Origin":
                      "*",
                  }
                );

                res.end(
                  JSON.stringify(
                    {
                      success:
                        false,

                      message:
                        "Workflow Not Active",
                    }
                  )
                );

                return;
              }

              // Execute Workflow
              await executeWorkflow(
                workflow
              );

              // Success Response
              res.writeHead(
                200,
                {
                  "Content-Type":
                    "application/json",

                  "Access-Control-Allow-Origin":
                    "*",
                }
              );

              res.end(
                JSON.stringify(
                  {
                    success:
                      true,

                    message:
                      "Workflow Saved Successfully ✅",

                    workflow,
                  }
                )
              );
            } catch (
              error
            ) {
              console.error(
                error
              );

              res.writeHead(
                500,
                {
                  "Content-Type":
                    "application/json",

                  "Access-Control-Allow-Origin":
                    "*",
                }
              );

              res.end(
                JSON.stringify(
                  {
                    success:
                      false,

                    message:
                      "Server Error ❌",
                  }
                )
              );
            }
          }
        );

        return;
      }

      // ======================
      // ANALYTICS API
      // ======================
      if (
        url.pathname ===
          "/analytics" &&
        req.method === "GET"
      ) {
        try {
          const db =
            await connectDB();

          const analytics =
            await db
              .collection(
                "analytics"
              )
              .find({})
              .toArray();

          res.writeHead(
            200,
            {
              "Content-Type":
                "application/json",

              "Access-Control-Allow-Origin":
                "*",
            }
          );

          res.end(
            JSON.stringify(
              analytics
            )
          );

          return;
        } catch (
          error
        ) {
          console.error(
            error
          );

          res.writeHead(
            500,
            {
              "Content-Type":
                "application/json",

              "Access-Control-Allow-Origin":
                "*",
            }
          );

          res.end(
            JSON.stringify(
              {
                success:
                  false,

                message:
                  "Analytics Error ❌",
              }
            )
          );
        }
      }
      if (
  url.pathname ===
    "/email-tracking" &&
  req.method === "GET"
) {
  try {
    const db =
      await connectDB();

    const tracking =
      await db
        .collection(
          "emailTracking"
        )
        .find({})
        .toArray();

    res.writeHead(200, {
      "Content-Type":
        "application/json",

      "Access-Control-Allow-Origin":
        "*",
    });

    res.end(
      JSON.stringify(
        tracking
      )
    );

    return;
  } catch (
    error
  ) {
    console.error(
      error
    );

    res.writeHead(500, {
      "Content-Type":
        "application/json",

      "Access-Control-Allow-Origin":
        "*",
    });

    res.end(
      JSON.stringify({
        success:
          false,

        message:
          "Tracking Error ❌",
      })
    );
  }
}
if (
  url.pathname ===
    "/save-smtp" &&
  req.method === "POST"
) {
  let body = "";

  req.on(
    "data",
    (chunk) => {
      body += chunk;
    }
  );

  req.on(
    "end",
    async () => {
      try {
        const data =
          JSON.parse(
            body
          );

        const db =
          await connectDB();

        await db
          .collection(
            "smtpSettings"
          )
          .insertOne({
            ...data,
            createdAt:
              new Date(),
          });

        res.writeHead(
          200,
          {
            "Content-Type":
              "application/json",

            "Access-Control-Allow-Origin":
              "*",
          }
        );

        res.end(
          JSON.stringify(
            {
              success:
                true,

              message:
                "SMTP Saved ✅",
            }
          )
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        res.writeHead(
          500,
          {
            "Content-Type":
              "application/json",

            "Access-Control-Allow-Origin":
              "*",
          }
        );

        res.end(
          JSON.stringify(
            {
              success:
                false,

              message:
                "SMTP Error ❌",
            }
          )
        );
      }
    }
  );

  return;
}
if (
  url.pathname ===
    "/save-integration" &&
  req.method === "POST"
) {
  let body = "";

  req.on(
    "data",
    (chunk) => {
      body += chunk;
    }
  );

  req.on(
    "end",
    async () => {
      try {
        const data =
          JSON.parse(
            body
          );

        const db =
          await connectDB();

        await db
          .collection(
            "integrations"
          )
          .insertOne({
            ...data,
            connected:
              true,

            createdAt:
              new Date(),
          });

        res.writeHead(
          200,
          {
            "Content-Type":
              "application/json",

            "Access-Control-Allow-Origin":
              "*",
          }
        );

        res.end(
          JSON.stringify(
            {
              success:
                true,

              message:
                "Integration Saved ✅",
            }
          )
        );
      } catch (
        error
      ) {
        console.error(
          error
        );

        res.writeHead(
          500,
          {
            "Content-Type":
              "application/json",

            "Access-Control-Allow-Origin":
              "*",
          }
        );

        res.end(
          JSON.stringify(
            {
              success:
                false,

              message:
                "Integration Error ❌",
            }
          )
        );
      }
    }
  );

  return;
}
if (
  url.pathname ===
    "/integrations" &&
  req.method === "GET"
) {
  try {
    const db =
      await connectDB();

    const integrations =
      await db
        .collection(
          "integrations"
        )
        .find({})
        .toArray();

    res.writeHead(200, {
      "Content-Type":
        "application/json",

      "Access-Control-Allow-Origin":
        "*",
    });

    res.end(
      JSON.stringify(
        integrations
      )
    );

    return;
  } catch (
    error
  ) {
    console.error(
      error
    );

    res.writeHead(500, {
      "Content-Type":
        "application/json",

      "Access-Control-Allow-Origin":
        "*",
    });

    res.end(
      JSON.stringify({
        success:
          false,

        message:
          "Fetch Failed ❌",
      })
    );
  }
}
if (
  url.pathname ===
    "/track-email" &&
  req.method === "GET"
) {
  try {
    const email =
      url.searchParams.get(
        "email"
      );

    const db =
      await connectDB();

    await db
      .collection(
        "emailTracking"
      )
      .updateOne(
        {
          recipient:
            email,
        },

        {
          $set: {
            opened:
              true,

            status:
              "Opened",

            openedAt:
              new Date(),
          },
        }
      );

    console.log(
      `Email Opened: ${email} ✅`
    );

    // Transparent pixel
    const pixel =
      Buffer.from(
        "R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
        "base64"
      );

    res.writeHead(
      200,
      {
        "Content-Type":
          "image/gif",
      }
    );

    res.end(pixel);

    return;
  } catch (
    error
  ) {
    console.error(
      error
    );
  }
}
      // ======================
      // ROUTE NOT FOUND
      // ======================
      res.writeHead(404, {
        "Content-Type":
          "text/plain",
      });

      res.end(
        "Route Not Found"
      );
    }
  );

server.listen(
  5000,
  () => {
    console.log(
      "Server running on port 5000"
    );
  }
);