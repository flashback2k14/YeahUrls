module.exports = (express, UserRepository) => {
  const user = express.Router();

  user.get("/", async (req, res) => {
    try {
      const data = await UserRepository.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  user.get("/:id", async (req, res) => {
    try {
      const data = await UserRepository.getById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  return user;
}