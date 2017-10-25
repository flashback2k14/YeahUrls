module.exports = (express, TagRepository) => {
  const tag = express.Router();

  tag.get("/", async (req, res) => {
    try {
      const data = await TagRepository.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  tag.get("/:id", async (req, res) => {
    try {
      const data = await TagRepository.getById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  tag.put("/:id", async (req, res) => {
    try {
      const data = await TagRepository.updateById(req.params.id, req.body.name);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  tag.post("/", async (req, res) => {
    try {
      const data = await TagRepository.createNewTag(req.body.name);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  tag.delete("/:id", async (req, res) => {
    try {
      const data = await TagRepository.deleteById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return tag;
}