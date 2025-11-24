export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f5f5f5;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .header {
          background-color: #14B8A6;
          padding: 40px 40px;
          text-align: center;
        }

        .logo {
          width: 100px;
          height: 100px;
          border-radius: 16px;
          margin: 0 auto 20px;
          display: block;
        }

        .header-title {
          color: #ffffff;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 10px;
        }

        .header-tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          font-weight: 500;
          margin: 0;
        }

        .content {
          padding: 40px;
          text-align: center;
        }

        .content-title {
          font-size: 24px;
          font-weight: 600;
          color: #333333;
          margin: 0 0 20px;
        }

        .content-text {
          font-size: 16px;
          color: #666666;
          margin: 0 0 15px;
          line-height: 1.8;
        }

        .note {
          background-color: #FFFBEB;
          border-left: 4px solid #F59E0B;
          padding: 20px;
          margin: 30px 0;
          border-radius: 4px;
          text-align: left;
        }

        .note-title {
          font-size: 14px;
          font-weight: bold;
          color: #92400E;
          margin: 0 0 10px;
        }

        .note-text {
          font-size: 14px;
          color: #78350F;
          margin: 0;
          line-height: 1.6;
        }

        .footer {
          background-color: #f9f9f9;
          border-top: 2px solid #e5e5e5;
          padding: 30px 20px;
          text-align: center;
        }

        .footer-text {
          font-size: 12px;
          color: #999999;
          margin: 5px 0;
        }

        @media only screen and (max-width: 600px) {
          .container {
            margin: 0;
            border-radius: 0;
          }
          .header, .content {
            padding: 30px 20px;
          }
          .header-title {
            font-size: 28px;
          }
          .header-tagline {
            font-size: 16px;
          }
        }
      ` }} />

      <div className="container">
        {/* Header */}
        <div className="header">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/tap2give-c8a07.firebasestorage.app/o/tap2give_icon_1.png?alt=media&token=11ff03ad-c6a6-4ecb-871d-55be35863bea"
            alt="Tap2Give"
            className="logo"
          />
          <h1 className="header-title">Tap2Give Receipts</h1>
          <p className="header-tagline">Tap.Give.Done.</p>
        </div>

        {/* Content */}
        <div className="content">
          <h2 className="content-title">Digital Donation Receipts</h2>
          <p className="content-text">
            This is the receipt viewer for Tap2Give donations.
            If you received a receipt link via email or text message, use that link to view your donation receipt.
          </p>
          <p className="content-text">
            All receipts are securely stored and accessible for 90 days from the donation date.
          </p>

          {/* Note Box */}
          <div className="note">
            <p className="note-title">📋 Looking for a Receipt?</p>
            <p className="note-text">
              If you made a donation and requested a receipt, you should have received a link via email or text message.
              The link will take you directly to your donation receipt.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="footer-text">
            Tap2Give is a contactless donation platform for mosques and Islamic centers.
          </p>
          <p className="footer-text">© {new Date().getFullYear()} ASR Technologies LLC</p>
        </div>
      </div>
    </>
  );
}
