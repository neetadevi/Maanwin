import { getAssetUrl } from '../utils/assetUrl';

interface EntriesSectionProps {
  onOpenCheckin: () => void;
  onOpenWheel: () => void;
}

const arrowSvg = `data:image/svg+xml,%3csvg preserveAspectRatio='none' overflow='visible' style='display: block;' width='9.57145' height='16.75' viewBox='0 0 9.57145 16.75' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg id='arrow-up-1--arrow-up-keyboard'%3e%3cpath id='Union' fill-rule='evenodd' clip-rule='evenodd' d='M4.36273 0.175213C4.59635 -0.0584044 4.97511 -0.0584044 5.20873 0.175213L9.39629 4.36272C9.56738 4.53381 9.61847 4.7911 9.52586 5.01464C9.43326 5.23818 9.21515 5.38393 8.97323 5.38393H5.98216V15.5536C5.98216 16.2144 5.44649 16.75 4.78573 16.75C4.12496 16.75 3.5893 16.2144 3.5893 15.5536V5.38393H0.598231C0.356277 5.38393 0.138144 5.23818 0.0455527 5.01464C-0.0470389 4.7911 0.00414441 4.53381 0.175234 4.36272L4.36273 0.175213Z' fill='%23F97316'/%3e%3c/g%3e%3c/svg%3e`;

export function EntriesSection({ onOpenCheckin, onOpenWheel }: EntriesSectionProps) {
  return (
    <section className="s11-entries side-distance s11-home__entries">
      {/* Daily Check in */}
      <button
        type="button"
        className="s11-entries__card"
        onClick={onOpenCheckin}
      >
        <img
          className="s11-entries__art s11-entries__art--checkin"
          src={getAssetUrl('images/user_assets/daily_check.png')}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="s11-entries__text">
          <span className="s11-entries__title">Daily Check in</span>
          <span className="s11-entries__action">
            Collect Now{' '}
            <img
              className="s11-entries__arrow"
              src={arrowSvg}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </span>
        </span>
      </button>

      {/* Deposit Wheel */}
      <button
        type="button"
        className="s11-entries__card"
        onClick={onOpenWheel}
      >
        <img
          className="s11-entries__art s11-entries__art--wheel"
          src={getAssetUrl('images/user_assets/deposit_wheel.png')}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="s11-entries__text">
          <span className="s11-entries__title">Deposit Wheel</span>
          <span className="s11-entries__action">
            Spin Now{' '}
            <img
              className="s11-entries__arrow"
              src={arrowSvg}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </span>
        </span>
      </button>
    </section>
  );
}
