function parseError(error) {
    if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(v => v.message);
    } else {
        return error.message.split('\n');
    }
}

function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

module.exports = {
    parseError,
    mapErrors
};
