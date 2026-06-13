const nodemailer =
  require(
    "nodemailer"
  );

const connectDB =
  require(
    "../config/db"
  );

async function sendEmail(
  to,
  subject,
  text
) {
  try {
    // Connect DB
    const db =
      await connectDB();

    // Get SMTP Settings
    const smtp =
      await db
        .collection(
          "smtpSettings"
        )
        .findOne();

    if (!smtp) {
      console.log(
        "SMTP Not Configured ❌"
      );

      return;
    }

    // Create Mail Transporter
    const transporter =
      nodemailer.createTransport(
        {
          host:
            smtp.host,

          port:
            Number(
              smtp.port
            ),

          secure:
            false,

          auth: {
            user:
              smtp.email,

            pass:
              smtp.password,
          },
        }
      );

    // Save Email Tracking Entry
    await db
      .collection(
        "emailTracking"
      )
      .insertOne({
        recipient:
          to,

        subject,

        status:
          "Sent",

        opened:
          false,

        replied:
          false,

        createdAt:
          new Date(),
      });

    console.log(
      "Trying to send email..."
    );

    // Tracking Pixel URL
    const trackingUrl =
      `http://localhost:5000/track-email?email=${encodeURIComponent(
        to
      )}`;

    // Send Email
    const info =
      await transporter.sendMail(
        {
          from:
            smtp.email,

          to,

          subject,

          text,

          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              
              <h2 style="color:#2563eb;">
                Workflow Email
              </h2>

              <p>
                ${text}
              </p>

              <hr />

              <p style="font-size:12px;color:gray;">
                Sent from LinkedIn Automation Platform
              </p>

              <!-- Tracking Pixel -->
              <img
                src="${trackingUrl}"
                width="1"
                height="1"
                style="display:none;"
              />
            </div>
          `,
        }
      );

    console.log(
      "Email Sent Successfully ✅"
    );

    console.log(
      "Message ID:",
      info.messageId
    );

  } catch (
    error
  ) {
    console.error(
      "Email Failed ❌",
      error
    );
  }
}

module.exports =
  sendEmail;