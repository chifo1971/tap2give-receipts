'use client';

interface PrintButtonProps {
  brandColor: string;
}

export default function PrintButton({ brandColor }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="print-button"
      style={{
        backgroundColor: brandColor,
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        margin: '20px 0',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      🖨️ Print Receipt
    </button>
  );
}
