module.exports = (express, AuthRepository) => {
  const auth = express.Router();

  auth.post("/signin", async (req, res) => {
    try {
      const data = await AuthRepository.signIn(req.body.username, req.body.password);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  auth.post("/signup", async (req, res) => {
    try {
      const data = await AuthRepository.signUp(req.body.username, req.body.password, false);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return auth;
}