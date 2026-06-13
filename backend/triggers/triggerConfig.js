function configureTrigger(
  triggerType
) {
  const triggerConfig = {
    type: triggerType,

    conditions: {
      campaign:
        "Hiring Campaign",

      minimumOpens: 1,
    },

    configuredAt:
      new Date(),
  };

  console.log(
    "Trigger Configured ✅"
  );

  return triggerConfig;
}

module.exports =
  configureTrigger;