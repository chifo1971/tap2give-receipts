export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
          background-color: #f5f5f5 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }

        .error-container {
          max-width: 500px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 40px;
          text-align: center;
        }

        .error-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .error-title {
          font-size: 24px;
          font-weight: 700;
          color: #333333;
          margin-bottom: 15px;
        }

        .error-message {
          font-size: 16px;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .error-reasons {
          background-color: #f9f9f9;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
          text-align: left;
        }

        .error-reasons-title {
          font-size: 14px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 10px;
        }

        .error-reasons ul {
          margin: 0;
          padding-left: 20px;
          color: #666666;
          font-size: 14px;
          line-height: 1.8;
        }

        .home-button {
          display: inline-block;
          background-color: #14B8A6;
          color: white;
          text-decoration: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          transition: opacity 0.2s;
        }

        .home-button:hover {
          opacity: 0.9;
        }

        .footer-text {
          margin-top: 30px;
          font-size: 12px;
          color: #999999;
        }

        @media only screen and (max-width: 600px) {
          .error-container {
            padding: 30px 20px;
          }
          .error-title {
            font-size: 20px;
          }
        }
      ` }} />

      <div className="error-container">
        <div className="error-icon">🔍</div>
        <h1 className="error-title">Receipt Not Found</h1>
        <p className="error-message">
          We couldn't find the receipt you're looking for. This may have happened for several reasons:
        </p>

        <div className="error-reasons">
          <p className="error-reasons-title">Possible reasons:</p>
          <ul>
            <li>The receipt link is incorrect or incomplete</li>
            <li>The receipt has expired (receipts are available for 90 days)</li>
            <li>The receipt ID doesn't exist in our system</li>
          </ul>
        </div>

        <a href="https://tap2giveapp.com" className="home-button">
          Go to Tap2Give Home
        </a>

        <p className="footer-text">
          Need help? Contact support at the mosque where you made your donation.
        </p>
      </div>
    </>
  );
}
