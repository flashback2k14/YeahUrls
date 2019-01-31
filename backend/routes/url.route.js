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

  url.get("/duplicates/:userid", async (req, res) => {
    try {
      const isLean = !!req.query.lean;
      const data = await UrlRepository.findDuplicatesByUserId(req.params.userid, isLean);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message});
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

  url.get("/:userid/:urlid", async (req, res) => {
    try {
      const data = await UrlRepository.getByUserIdAndUrlId(req.params.userid, req.params.urlid);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  url.put("/:userid/:urlid", async (req, res) => {
    try {
      const data = await UrlRepository.updateByUserIdAndUrlId(req.params.userid, req.params.urlid, req.body);
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

  url.post("/:userid/:urlid", async (req, res) => {
    try {
      const data = await UrlRepository.createNewTagForUserIdAndUrlId(req.params.userid, req.params.urlid, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  url.delete("/:userid/:urlid", async (req, res) => {
    try {
      const data = await UrlRepository.deleteByUserIdAndUrlId(req.params.userid, req.params.urlid);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  url.delete("/:userid/:urlid/:tagid", async (req, res) => {
    try {
      const data = await UrlRepository.deleteTagByUserIdAndUrlId(req.params.userid, req.params.urlid, req.params.tagid);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return url;
}