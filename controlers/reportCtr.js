// Generated by CoffeeScript 1.6.1
(function() {
  var Response, check, crypto, reportModel, sanitize;

  crypto = require('crypto');

  check = require('validator').check;

  sanitize = require('validator').sanitize;

  reportModel = require('../models/reportModel');

  Response = require('../vo/Response').Response;

  exports.index = function(req, res) {
    return res.render("index");
  };

  exports.writeIndex = function(req, res) {
    return res.render("write");
  };

  exports.write = function(req, res) {
    var content, date, dateStr, errorMessage, months, year, _ref;
    dateStr = sanitize(req.body.date).trim();
    content = sanitize(req.body.content).trim();
    errorMessage = "";
    try {
      check(dateStr).notEmpty();
      check(content).notEmpty();
      _ref = dateStr.split("-"), year = _ref[0], months = _ref[1], date = _ref[2];
      check(year).notNull().isNumeric().len(4, 4);
      check(months).notNull().isNumeric().len(1, 2);
      check(date).notNull().isNumeric().len(1, 2);
      return reportModel.createReport("28", content, dateStr, function(response) {
        return res.send(response);
      });
    } catch (error) {
      return res.send(new Response(0, "日期格式不正确或者内容为空"));
    }
  };

  exports.showIndex = function(req, res) {
    return res.render("show");
  };

  exports.getReports = function(req, res) {
    var errorMessage, page, pageNum;
    page = sanitize(req.body.page).trim();
    pageNum = sanitize(req.body.pageNum).trim();
    errorMessage = "";
    try {
      check(page).isNumeric().min(1);
      check(page).isNumeric().min(1);
      return reportModel.getReports("28", page, pageNum, function(response) {
        return res.send(response);
      });
    } catch (error) {
      return res.send(new Response(0, "页数和每页显示条数为非负数"));
    }
  };

}).call(this);
