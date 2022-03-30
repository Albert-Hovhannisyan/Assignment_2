const NotFoundError = require('../errors/not-found.error');

module.exports = (err, req, res, next) => {

    if (err instanceof NotFoundError) {
        return res.status(404).send(err.message);
    }

    res.status(500).send('No cities found!');
    next(err);
}