const delayAction =
  require(
    "../delays/delayActions"
  );

const executeAction =
  require(
    "./actionExecutor"
  );

async function executeWorkflow(
  workflow
) {
  console.log(
    "Workflow Engine Started 🚀"
  );

  for (const step of workflow.steps) {
    switch (step.type) {
      case "trigger":
        console.log(
          `Trigger Activated: ${step.value.type} ✅`
        );
        break;

      case "delay":
        console.log(
          `Executing Delay: ${step.value} ${step.unit}`
        );

        await new Promise(
          (resolve) => {
            setTimeout(
              resolve,
              step.value *
                1000
            );
          }
        );

        break;

      case "action":
       await executeAction(
  step.value,
  workflow
);
        break;

      default:
        console.log(
          "Unknown Step ❌"
        );
    }
  }

  console.log(
    "Workflow Execution Completed 🎉"
  );
}

module.exports =
  executeWorkflow;