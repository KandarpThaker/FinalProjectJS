const Issuer = require('../models/issuer');
const jwt = require('jsonwebtoken');

exports.index = async (req, res, next) => {
    try {
        const issuers = await Issuer.find();
        res.status(200).json(issuers);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}
exports.show = async (req, res, next) => {
    try {
        const { _id } = req.issuer;
        let issuer = await Issuer.findOne({ _id });
        res.status(200).json(issuer);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
exports.create = async (req, res, next) => {
    console.log(req.body);
    try {
        const { bookIssue, issueName, issueDoB, issueAddress } = req.body;
        const issuer = await Issuer.create({
            bookIssue,
            issueName,
            issueDoB,
            issueAddress,
        });
        res.status(200).json(issuer);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const { _id, bookIssue, issueName, issueDoB, issueAddress } = req.body;
        const issuer = await Issuer.findOneAndUpdate({ _id }, {
            bookIssue,
            issueName,
            issueDoB,
            issueAddress
        });
        res.status(200).json(issuer);
        const body = { _id: issuer._id };
        const token = jwt.sign({ user: body }, 'any salty secret here');
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}
exports.destroy = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const issuer = await Issuer.findOneAndDelete({ _id });
        res.status(200).json(issuer);
    } catch (error) {
        next(error);
    }
}