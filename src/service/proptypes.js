import PropTypes from 'prop-types';

export { PropTypes };
//Proptypes for the error component
export const errorPropTypes = {
    err: PropTypes.string.isRequired,
};

// Proptypes for the pagination component
export const paginationPropTypes = {
    previous: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired,
    paginationFunction: PropTypes.func.isRequired,
    callState: PropTypes.bool,
};