import PropTypes from "prop-types";
import { getColorForType, capitalizeFirstLetter } from "../service/utils";

function StatBar({ name, value, type }) {
  const LightOpacity = 0.3;
  const MediumOpacity = 0.6;

  return (
    <div className="d-flex flex-column text-center">
      <p className="fs-6 mb-1 fw-semibold">
        {capitalizeFirstLetter(name)}
      </p>
      <div
        className="progress mb-2"
        style={{
          width: "300px",
          backgroundColor: getColorForType(type, LightOpacity),
        }}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated text-black fw-bolder"
          role="progressbar"
          style={{
            width: `${(value * 100) / 255}%`,
            backgroundColor: getColorForType(type, MediumOpacity),
          }}
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
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
