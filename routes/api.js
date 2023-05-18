var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary").v2;

var novedadesModel = require("../models/novedadesModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 500,
        height: 300,
        crop: "fill",
      });
      return {
        ...novedad,
        imagen,
      };
    } else {
      return {
        ...novedad,
        imagen: "",
      };
    }
  });

  res.json({ novedades });
});

module.exports = router;
