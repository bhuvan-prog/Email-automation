import React, {
  useEffect,
  useState,
} from "react";

const Integrations =
  () => {
    const [
      integrations,
      setIntegrations,
    ] = useState([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    useEffect(() => {
      fetchIntegrations();
    }, []);

    const fetchIntegrations =
      async () => {
        try {
          const response =
            await fetch(
              "http://localhost:5000/integrations"
            );

          const data =
            await response.json();

          const defaultIntegrations =
            [
              {
                name:
                  "LinkedIn",
                description:
                  "Connect LinkedIn account",
              },

              {
                name:
                  "Gmail",
                description:
                  "Connect Gmail account",
              },

              {
                name:
                  "Slack",
                description:
                  "Connect Slack workspace",
              },

              {
                name:
                  "HubSpot",
                description:
                  "Connect CRM account",
              },
            ];

          const merged =
            defaultIntegrations.map(
              (
                item
              ) => {
                const found =
                  data.find(
                    (
                      dbItem
                    ) =>
                      dbItem.name ===
                      item.name
                  );

                return {
                  ...item,
                  connected:
                    found?.connected ||
                    false,
                };
              }
            );

          setIntegrations(
            merged
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    const saveIntegration =
      async (
        integration
      ) => {
        try {
          const response =
            await fetch(
              "http://localhost:5000/save-integration",
              {
                method:
                  "POST",

                headers:
                  {
                    "Content-Type":
                      "application/json",
                  },

                body:
                  JSON.stringify(
                    integration
                  ),
              }
            );

          const data =
            await response.json();

          console.log(
            data
          );

          alert(
            `${integration.name} Connected ✅`
          );

          setIntegrations(
            (
              prev
            ) =>
              prev.map(
                (
                  item
                ) =>
                  item.name ===
                  integration.name
                    ? {
                        ...item,
                        connected:
                          true,
                      }
                    : item
              )
          );
        } catch (
          error
        ) {
          console.error(
            error
          );

          alert(
            "Integration Failed ❌"
          );
        }
      };

    if (loading) {
      return (
        <h1 className="text-xl font-semibold">
          Loading Integrations...
        </h1>
      );
    }

    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Integrations
          </h1>

          <p className="text-gray-500 mt-2">
            Connect external
            platforms and
            services
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6">

          {integrations.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  index
                }
                className="bg-white p-6 rounded-xl shadow-md border"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {
                    item.name
                  }
                </h2>

                <p className="text-gray-500 mt-2">
                  {
                    item.description
                  }
                </p>

                <div className="mt-5 flex justify-between items-center">

                  <span
                    className={`text-sm font-medium ${
                      item.connected
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.connected
                      ? "Connected ✅"
                      : "Not Connected ❌"}
                  </span>

                  <button
                    disabled={
                      item.connected
                    }
                    onClick={() =>
                      saveIntegration(
                        item
                      )
                    }
                    className={`px-5 py-2 rounded-lg text-white ${
                      item.connected
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {item.connected
                      ? "Connected"
                      : "Connect"}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

export default
  Integrations;