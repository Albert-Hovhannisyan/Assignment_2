const NotFoundError = require('../errors/not-found.error');
const BadRequestError = require('../errors/bad-request.error')

module.exports = (err, req, res, next) => {

    if (err instanceof NotFoundError) {
        return res.status(404).send(err.message);
    }

    if (err instanceof BadRequestError) {
        return res.status(400).send(err.message);
    }

    res.status(500).send('No cities found!');
    next(err);
}