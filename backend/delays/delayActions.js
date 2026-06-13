const executeAction =
  require(
    "../execution-engine/actionExecutor"
  );
const saveWorkflowLog =
  require(
    "../logs/workflowLogs"
  );

function convertToMilliseconds(
  value,
  unit
) {
  switch (unit) {
    case "seconds":
      return value * 1000;

    case "minutes":
      return (
        value *
        60 *
        1000
      );

    case "hours":
      return (
        value *
        60 *
        60 *
        1000
      );

    case "days":
      return (
        value *
        24 *
        60 *
        60 *
        1000
      );

    default:
      return 1000;
  }
}

function delayAction(
  delayConfig,
  action
) {
  const milliseconds =
    convertToMilliseconds(
      delayConfig.value,
      delayConfig.unit
    );

  console.log(
    `Waiting ${delayConfig.value} ${delayConfig.unit}...`
  );
  saveWorkflowLog({
  event:
    "delay_started",

  message:
    `Waiting ${delayConfig.value} ${delayConfig.unit}`,

  createdAt:
    new Date(),
});

  setTimeout(() => {
    executeAction(action);
  }, milliseconds);
}

module.exports =
  delayAction;