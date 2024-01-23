const homePage = async (req, res, next) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

const loginPage = async (req, res, next) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = { homePage, loginPage };
