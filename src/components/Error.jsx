import propTypes from "prop-types";

function Error({ err }) {
    return (
        <p className="rounded bg-danger text-white p-1 shadow shadow-sm">
        Error: {err}
        </p>
    );
}

Error.propTypes = {
    err: propTypes.string.isRequired
};

export default Error;
