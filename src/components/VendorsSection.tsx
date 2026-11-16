import { VENDORS } from '../data/gamesData';
import { ShieldCheck } from 'lucide-react';

export function VendorsSection() {
  return (
    <section className="vendors-section">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <ShieldCheck size={18} className="shield-icon" />
          <h2 className="section-title">Platform Partners</h2>
        </div>
        <span className="vendor-subtitle">Certified & Licensed Gaming Providers</span>
      </div>

      <div className="vendors-grid">
        {VENDORS.map((v) => (
          <div key={v.vendorCode} className="vendor-card" title={v.vendorName}>
            {v.vendorLogo ? (
              <img
                src={v.vendorLogo}
                alt={v.vendorName}
                className="vendor-logo-img"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : null}
            <span className="vendor-name-txt">{v.vendorName}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
