const { getById } = require("../controllers/getDetail_controller");

//handler para obtener el detalle de un pokemon 
const GeTDetHandler = async (req, res) => {
    const { id } = req.params;
    try {
      //invoca al controler que busca el pokemon por id
      const response = await getById(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    GeTDetHandler 
}