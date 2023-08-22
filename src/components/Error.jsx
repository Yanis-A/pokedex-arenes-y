import { PropTypes, errorPropTypes } from "../service/proptypes";
function Error({ err }) {
    return (
        <p className="rounded bg-danger text-white p-1 shadow shadow-sm">
        Error: {err}
        </p>
    );
}

Error.propTypes = {
    err: PropTypes.shape(errorPropTypes).isRequired,
};

export default Error;
