module.exports = (express, UrlRepository) => {
  const urlV2 = express.Router();

  urlV2.get('/:userid', async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const data = await UrlRepository.getPagedByUserId(req.params.userid, page, limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return urlV2;
};
