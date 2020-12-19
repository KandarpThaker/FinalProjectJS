const Book = require('../models/book');

const User = require('../models/user');

exports.index = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  }
  catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const books = await Book.findById(req.params.id);

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { bookName, bookAuthor, bookReleaseDate } = req.body;

    const user = await User.findById(req.user._id)
    const bk = await Book.create({
      bookName: bookName,
      bookAuthor: bookAuthor,
      bookReleaseDate: bookReleaseDate
    });
    res.status(200).json({ message: "Book was Created", books: bk })
  }
  catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { _id, bookName, bookAuthor, bookReleaseDate } = req.body;

    const bk = await Book.findOneAndUpdate({ _id: _id }, {
      bookName,
      bookAuthor,
      bookReleaseDate
    });
    res.status(200).json({ message: "Book was updated successfully", books: bk });
  }
  catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { _id } = req.body;
    await Book.findOneAndDelete({ _id: _id });

    res.status(200).json({ message: "Book was deleted successfully" });
  } catch (error) {
    next(error);
  }
};