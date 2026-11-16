import { getAssetUrl } from '../utils/assetUrl';

interface EntriesSectionProps {
  onOpenCheckin: () => void;
  onOpenWheel: () => void;
}

export function EntriesSection({ onOpenCheckin, onOpenWheel }: EntriesSectionProps) {
  return (
    <div className="s11-home__entries">
      <section className="s11-entries">
        {/* Daily Check-in */}
        <button
          type="button"
          className="s11-entries__card"
          onClick={onOpenCheckin}
        >
          <img
            src={getAssetUrl('images/s11_entry_checkin.webp')}
            alt="Check-in"
            className="s11-entries__art s11-entries__art--checkin"
          />
          <div className="s11-entries__text">
            <span className="s11-entries__title">Daily Check-in</span>
            <span className="s11-entries__action">
              Claim Bonus &gt;
            </span>
          </div>
        </button>

        {/* Lucky Wheel */}
        <button
          type="button"
          className="s11-entries__card"
          onClick={onOpenWheel}
        >
          <img
            src={getAssetUrl('images/s11_entry_wheel.webp')}
            alt="Lucky Wheel"
            className="s11-entries__art s11-entries__art--wheel"
          />
          <div className="s11-entries__text">
            <span className="s11-entries__title">Lucky Wheel</span>
            <span className="s11-entries__action">
              Spin & Win &gt;
            </span>
          </div>
        </button>
      </section>
    </div>
  );
}
