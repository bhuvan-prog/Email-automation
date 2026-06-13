import React, {
  useEffect,
  useState,
} from "react";

const EmailTracking =
  () => {
    const [
      trackingData,
      setTrackingData,
    ] = useState([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    useEffect(() => {
      fetchTracking();
    }, []);

    const fetchTracking =
      async () => {
        try {
          const response =
            await fetch(
              "http://localhost:5000/email-tracking"
            );

          const data =
            await response.json();

          console.log(
            data
          );

          setTrackingData(
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
          <h1 className="text-xl font-semibold">
            Loading Email Tracking...
          </h1>
        </div>
      );
    }

    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Email Tracking
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor email
            activity and
            engagement
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">
                  Recipient
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Opened At
                </th>

                <th className="p-4 text-left">
                  Replied
                </th>
              </tr>
            </thead>

            <tbody>
              {trackingData
                .length >
              0 ? (
                trackingData.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={
                        index
                      }
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {
                          item.recipient
                        }
                      </td>

                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {
                            item.status
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        {
                          item.openedAt
                        }
                      </td>

                      <td className="p-4">
                        {item.reply
                          ? "Yes ✅"
                          : "No ❌"}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No Email
                    Tracking
                    Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default
  EmailTracking;