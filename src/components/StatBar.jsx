import PropTypes from "prop-types";
import { getColorForType, capitalizeFirstLetter } from "../service/utils";

const SOFT_CAP = 200;
const ABSOLUTE_MAX = 255;

// Tier color signals stat strength regardless of type identity.
// Thresholds roughly match Pokémon HOME / community Pokédex conventions.
function getTierColor(value, opacity = 1) {
  if (value < 50) return `rgba(220, 53, 69, ${opacity})`; // red
  if (value < 80) return `rgba(253, 126, 20, ${opacity})`; // orange
  if (value < 100) return `rgba(255, 193, 7, ${opacity})`; // yellow
  if (value < 130) return `rgba(40, 167, 69, ${opacity})`; // light green
  return `rgba(20, 110, 50, ${opacity})`; // dark green
}

function StatBar({ name, value, type }) {
  const TrackOpacity = 0.25;
  const FillOpacity = 0.85;

  const widthPercent = (Math.min(value, SOFT_CAP) / SOFT_CAP) * 100;

  return (
    <div className="d-flex flex-column text-center">
      <p className="fs-6 mb-1 fw-semibold">{capitalizeFirstLetter(name)}</p>
      <div
        className="progress mb-2"
        style={{
          width: "300px",
          backgroundColor: getColorForType(type, TrackOpacity),
        }}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated text-black fw-bolder"
          role="progressbar"
          style={{
            width: `${widthPercent}%`,
            backgroundColor: getTierColor(value, FillOpacity),
          }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={ABSOLUTE_MAX}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

StatBar.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default StatBar;
