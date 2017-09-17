module.exports = (express, UserRepository) => {
  const user = express.Router();

  user.get("/", async (req, res) => {
    try {
      const data = await UserRepository.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  user.get("/:id", async (req, res) => {
    try {
      const data = await UserRepository.getById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  user.put("/:id", async (req, res) => {
    try {
      const data = await UserRepository.updateById(req.params.id, req.body.name);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  user.delete("/:id", async (req, res) => {
    try {
      const data = await UserRepository.deleteById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return user;
}