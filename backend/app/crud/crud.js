const req = require("express/lib/request");
const db = require("../models");
const fs = require("fs");
const Site = db.site;

exports.getSite = (req, res) => {
  Site.findAll().then((results) => {
    res.send(results);
  });
};
exports.postSite = (req, res) => {
  Site.create({
    title: req.body.title,
    image: req.file.filename,
    content: req.body.content,
    path: req.body.title + Date.now(),
  }).then(() => {
    res.send({ message: "Successfully create a site!" });
  });
};
exports.deleteSite = (req, res) => {
  Site.findOne({
    where: {
      id: req.params.id,
    },
  }).then((row) => {
    fs.unlink("../frontend/public/assets/" + row.image, function (err) {
      if (err) throw err;
    });
  });
  Site.destroy({
    where: {
      id: req.params.id,
    },
  }).then((results) => {
    res.send({ results });
  });
};
exports.changeSite = (req, res) => {
  console.log(req.file, req.file.filename);
  Site.findOne({
    where: {
      id: req.params.id,
    },
  }).then((row) => {
    fs.unlink("../frontend/public/assets/" + row.image, function (err) {
      if (err) throw err;
      Site.update(
        {
          title: req.body.title,
          image: req.file.filename,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((results) => {
        res.send({ results });
      });
    });
  });
};
