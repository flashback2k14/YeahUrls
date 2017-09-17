module.exports = (express, UrlRepository) => {
  const url = express.Router();

  url.get("/", async (req, res) => {
    try {
      const data = await UrlRepository.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  url.get("/:userid", async (req, res) => {
    try {
      const data = await UrlRepository.getAllByUserId(req.params.userid);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  url.post("/:userid", async (req, res) => {
    try {
      const data = await UrlRepository.createNewUrlForUserId(req.params.userid, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return url;
}