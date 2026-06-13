import React, {
  useEffect,
  useState,
} from "react";

import MetricCard from "../components/analytics/MetricCard";
import AnalyticsChart from "../components/analytics/AnalyticsChart";

const AnalyticsDashboard = () => {
  const [
    analytics,
    setAnalytics,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/analytics"
          );

        const data =
          await response.json();

        console.log(
          data
        );

        setAnalytics(
          data
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

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-700">
          Loading Analytics...
        </h1>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor campaign
          performance and
          growth
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {analytics.length >
        0 ? (
          <>
            <MetricCard
              title="Emails Sent"
              value={
                analytics[0]
                  ?.emailsSent ||
                0
              }
              growth="+12%"
            />

            <MetricCard
              title="Open Rate"
              value={`${analytics[0]?.openRate || 0}%`}
              growth="+8%"
            />

            <MetricCard
              title="Reply Rate"
              value={`${analytics[0]?.replyRate || 0}%`}
              growth="+5%"
            />

            <MetricCard
              title="Click Rate"
              value={`${analytics[0]?.clickRate || 0}%`}
              growth="+2%"
            />
          </>
        ) : (
          <div className="col-span-4 bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No Analytics Found
          </div>
        )}
      </div>

      {/* Campaign Data */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Campaign Analytics
        </h2>

        {analytics.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="border-b py-4"
            >
              <h3 className="font-semibold text-blue-600">
                {
                  item.campaignName
                }
              </h3>

              <div className="grid grid-cols-4 gap-4 mt-3 text-gray-600">
                <p>
                  Emails:
                  {" "}
                  {
                    item.emailsSent
                  }
                </p>

                <p>
                  Open:
                  {" "}
                  {
                    item.openRate
                  }
                  %
                </p>

                <p>
                  Reply:
                  {" "}
                  {
                    item.replyRate
                  }
                  %
                </p>

                <p>
                  Click:
                  {" "}
                  {
                    item.clickRate
                  }
                  %
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <AnalyticsChart title="Campaign Performance" />

        <AnalyticsChart title="Lead Growth" />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;