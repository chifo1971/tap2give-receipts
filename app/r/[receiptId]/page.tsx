import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import PrintButton from '@/app/components/PrintButton';

interface ReceiptData {
  receiptId: string;
  donationId: string;
  mosqueCode: string;
  amount: number;
  donationTimestamp: number;
  contact: string;
  method: 'email' | 'sms';
  sent: boolean;
  createdAt: { seconds: number; nanoseconds: number };
  expiresAt: { seconds: number; nanoseconds: number };
  timezone?: string;
}

interface MosqueData {
  mosqueName: string;
  mosqueCode: string;
  brandColor?: string;
  logoUrl?: string;
  taxId?: string;
  address?: string;
  contactEmail?: string;
}

async function getReceiptData(receiptId: string): Promise<ReceiptData | null> {
  try {
    const receiptRef = doc(db, 'receipts', receiptId);
    const receiptSnap = await getDoc(receiptRef);

    if (!receiptSnap.exists()) {
      return null;
    }

    const data = receiptSnap.data() as ReceiptData;

    // Check if receipt is expired
    const now = Date.now();
    const expiresAtMs = data.expiresAt.seconds * 1000;

    if (now > expiresAtMs) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching receipt:', error);
    return null;
  }
}

async function getMosqueData(mosqueCode: string): Promise<MosqueData | null> {
  try {
    const mosqueRef = doc(db, 'mosques', mosqueCode);
    const mosqueSnap = await getDoc(mosqueRef);

    if (!mosqueSnap.exists()) {
      return null;
    }

    return mosqueSnap.data() as MosqueData;
  } catch (error) {
    console.error('Error fetching mosque data:', error);
    return null;
  }
}

function formatDateTime(timestamp: number, timezone?: string): string {
  const date = new Date(timestamp);

  // Format: "December 25, 2024 at 3:45 PM EST"
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone: timezone || 'America/New_York'
  };

  return date.toLocaleString('en-US', options);
}

function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function getRelativeLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Apply gamma correction
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ receiptId: string }>;
}) {
  const { receiptId } = await params;

  // Fetch receipt data
  const receipt = await getReceiptData(receiptId);

  if (!receipt) {
    notFound();
  }

  // Fetch mosque data
  const mosque = await getMosqueData(receipt.mosqueCode);

  if (!mosque) {
    notFound();
  }

  const brandColor = mosque.brandColor || '#14B8A6';
  const mosqueName = mosque.mosqueName || 'Our Mosque';
  const mosqueLogoUrl = mosque.logoUrl || '';
  const mosqueTaxId = mosque.taxId || '';
  const mosqueAddress = mosque.address || '';
  const mosqueContactEmail = mosque.contactEmail || '';

  // Calculate relative luminance to choose appropriate heart emoji
  const luminance = getRelativeLuminance(brandColor);
  // Use white heart for dark backgrounds, green heart for light backgrounds
  const heartEmoji = luminance > 0.5 ? '💚' : '🤍';

  const formattedAmount = formatAmount(receipt.amount);
  const dateTime = formatDateTime(receipt.donationTimestamp, receipt.timezone);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Donation Receipt - {mosqueName}</title>
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

          .receipt-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .header {
            background-color: ${brandColor};
            padding: 30px 40px;
            text-align: center;
          }

          .header-title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
          }

          .hero {
            background-color: #ffffff;
            padding: 40px 40px 20px;
            text-align: center;
          }

          .header-logo {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            object-fit: cover;
            margin: 0 auto 15px;
            display: block;
          }

          .hero-subtitle {
            font-size: 20px;
            font-weight: 600;
            color: #333333;
            margin: 0 0 10px;
          }

          .hero-tagline {
            font-size: 16px;
            color: #666666;
            margin: 0;
          }

          .body-section {
            padding: 20px 40px;
            background-color: #ffffff;
          }

          .body-text {
            margin: 0 0 15px;
            color: #333333;
            font-size: 15px;
          }

          .details-box {
            background-color: #f9f9f9;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }

          .details-title {
            font-size: 12px;
            font-weight: bold;
            color: #666666;
            text-transform: uppercase;
            margin: 0 0 15px;
            letter-spacing: 0.5px;
          }

          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e5e5;
          }

          .detail-row:last-child {
            border-bottom: none;
          }

          .detail-label {
            color: #666666;
            font-size: 14px;
          }

          .detail-value {
            color: #333333;
            font-weight: 600;
            font-size: 14px;
            text-align: right;
          }

          .amount-value {
            color: ${brandColor};
            font-size: 18px;
            font-weight: bold;
          }

          .tax-notice {
            background-color: #FFFBEB;
            border-left: 4px solid #F59E0B;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
          }

          .tax-notice-title {
            font-size: 14px;
            font-weight: bold;
            color: #92400E;
            margin: 0 0 10px;
          }

          .tax-notice-text {
            font-size: 13px;
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

          .footer-brand {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            margin: 0 0 5px;
          }

          .footer-tagline {
            font-size: 13px;
            color: #666666;
            margin: 0 0 15px;
          }

          .footer-text {
            font-size: 12px;
            color: #999999;
            margin: 5px 0;
            line-height: 1.5;
          }

          .footer-copyright {
            font-size: 11px;
            color: #999999;
            margin: 15px 0 0;
          }

          .print-button {
            background-color: ${brandColor};
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin: 20px 0;
            display: inline-block;
          }

          .print-button:hover {
            opacity: 0.9;
          }

          @media print {
            body {
              background-color: white;
            }
            .receipt-container {
              box-shadow: none;
              margin: 0;
            }
            .print-button {
              display: none;
            }
          }

          @media only screen and (max-width: 600px) {
            .receipt-container {
              margin: 0;
            }
            .header, .body-section {
              padding: 20px !important;
            }
            .hero {
              padding: 30px 20px 15px !important;
            }
            .header-title {
              font-size: 24px !important;
            }
            .details-box {
              margin: 20px 0 !important;
            }
          }
        ` }} />
      </head>
      <body>
        <div className="receipt-container">
          {/* Header */}
          <div className="header">
            <h1 className="header-title">{heartEmoji} Thank You for Your Donation!</h1>
          </div>

          {/* Hero Section */}
          <div className="hero">
            {mosqueLogoUrl && (
              <img src={mosqueLogoUrl} alt={mosqueName} className="header-logo" />
            )}
            <h2 className="hero-subtitle">Donation Receipt</h2>
            <p className="hero-tagline">May Allah accept your generosity</p>
          </div>

          {/* Body Section */}
          <div className="body-section">
            <p className="body-text">Dear Generous Donor,</p>
            <p className="body-text">
              Jazakum Allahu Khayran for your generous donation to <strong>{mosqueName}</strong>.
              Your contribution supports {mosqueName}, our community, and activities.
            </p>

            {/* Donation Details Box */}
            <div className="details-box">
              <p className="details-title">DONATION DETAILS</p>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value amount-value">{formattedAmount}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{dateTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Receipt ID:</span>
                <span className="detail-value">{receipt.donationId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method:</span>
                <span className="detail-value">Contactless Card</span>
              </div>
            </div>

            {/* Organization Details Box */}
            {(mosqueTaxId || mosqueAddress) && (
              <div className="details-box">
                <p className="details-title">ORGANIZATION DETAILS</p>
                <div className="detail-row">
                  <span className="detail-label">Organization:</span>
                  <span className="detail-value">{mosqueName}</span>
                </div>
                {mosqueTaxId && (
                  <div className="detail-row">
                    <span className="detail-label">Tax ID (EIN):</span>
                    <span className="detail-value">{mosqueTaxId}</span>
                  </div>
                )}
                {mosqueAddress && (
                  <div className="detail-row" style={{ display: 'block', borderBottom: 'none' }}>
                    <span className="detail-label" style={{ display: 'block', paddingTop: '10px' }}>
                      <strong>Address:</strong>
                    </span>
                    <span className="detail-label" style={{ display: 'block', paddingTop: '5px' }}>
                      {mosqueAddress.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Tax Notice */}
            {mosqueTaxId && (
              <div className="tax-notice">
                <p className="tax-notice-title">📋 TAX DEDUCTIBILITY NOTICE</p>
                <p className="tax-notice-text">
                  This receipt confirms your charitable contribution. {mosqueName} is a tax-exempt
                  organization under IRS Section 501(c)(3). Please consult with your tax advisor
                  regarding the deductibility of your donation. No goods or services were provided
                  in exchange for this donation.
                </p>
              </div>
            )}

            {/* Closing */}
            <p className="body-text">
              Barak Allahu Feekum,<br />
              <strong>{mosqueName} Team</strong>
            </p>

            {mosqueContactEmail && (
              <p className="body-text" style={{ fontSize: '13px', color: '#666666' }}>
                Questions? Contact us at <a href={`mailto:${mosqueContactEmail}`} style={{ color: brandColor }}>{mosqueContactEmail}</a>
              </p>
            )}

            {/* Print Button */}
            <center>
              <PrintButton brandColor={brandColor} />
            </center>
          </div>

          {/* Footer */}
          <div className="footer">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/tap2give-c8a07.firebasestorage.app/o/tap2give_icon_1.png?alt=media&token=11ff03ad-c6a6-4ecb-871d-55be35863bea"
              alt="Tap2Give"
              style={{ width: '80px', height: '80px', marginBottom: '10px', borderRadius: '12px' }}
            />
            <p className="footer-brand">Powered by Tap2Give</p>
            <p className="footer-tagline">Tap.Give.Done.</p>
            <p className="footer-text">
              This receipt was generated automatically.<br />
              Please save this page for your tax records.
            </p>
            <p className="footer-copyright">© {new Date().getFullYear()} ASR Technologies LLC</p>
          </div>
        </div>
      </body>
    </html>
  );
}
