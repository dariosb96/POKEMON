const { getById } = require("../controllers/getDetail_controller");

const GeTDetHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await getById(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    GeTDetHandler 
}