import React, {
  useState,
} from "react";

const SMTPSettings =
  () => {
    const [
      smtpData,
      setSmtpData,
    ] = useState({
      provider:
        "gmail",

      host: "smtp.gmail.com",

      port: "587",

      email: "bhuvanbunny77@gmail.com",

      password:
        "qomi kaow drtn wwli",
    });

    const saveSMTP =
      async () => {
        try {
          const response =
            await fetch(
              "http://localhost:5000/save-smtp",
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
                    smtpData
                  ),
              }
            );

          const data =
            await response.json();

          console.log(
            data
          );

          alert(
            "SMTP Saved ✅"
          );
        } catch (
          error
        ) {
          console.error(
            error
          );

          alert(
            "SMTP Failed ❌"
          );
        }
      };

    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            SMTP Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Configure email
            provider settings
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl">

          <div className="grid grid-cols-2 gap-6">

            {/* Provider */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Provider
              </label>

              <select
                value={
                  smtpData.provider
                }
                onChange={(
                  e
                ) =>
                  setSmtpData(
                    {
                      ...smtpData,

                      provider:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border rounded-lg p-3"
              >
                <option value="gmail">
                  Gmail
                </option>

                <option value="outlook">
                  Outlook
                </option>

                <option value="yahoo">
                  Yahoo
                </option>
              </select>
            </div>

            {/* Host */}
            <div>
              <label className="block text-sm font-medium mb-2">
                SMTP Host
              </label>

              <input
                type="text"
                placeholder="smtp.gmail.com"
                value={
                  smtpData.host
                }
                onChange={(
                  e
                ) =>
                  setSmtpData(
                    {
                      ...smtpData,

                      host:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Port */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Port
              </label>

              <input
                type="number"
                placeholder="587"
                value={
                  smtpData.port
                }
                onChange={(
                  e
                ) =>
                  setSmtpData(
                    {
                      ...smtpData,

                      port:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                value={
                  smtpData.email
                }
                onChange={(
                  e
                ) =>
                  setSmtpData(
                    {
                      ...smtpData,

                      email:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Password */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={
                  smtpData.password
                }
                onChange={(
                  e
                ) =>
                  setSmtpData(
                    {
                      ...smtpData,

                      password:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={
                saveSMTP
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Save SMTP
            </button>
          </div>
        </div>
      </div>
    );
  };

export default
  SMTPSettings;