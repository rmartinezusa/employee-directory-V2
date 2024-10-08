const express = require("express");
const router = express.Router();
module.exports = router;

const employees = require("../data/employeesData");

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({ status: 404, message: `There is no employee with id ${id}.`});
  }
});

// I guess we could use "fs" module to write in to data file but i really don't want to do that right now.
router.post("/", (req, res, next) => {
    if(req.body.name){
        const newEmployeeWithId = {
            //gets that largest id and adds +1 to the new id.
            id: employees.reduce((max, employee) => Math.max(max, employee.id), 0) + 1,
            name: req.body.name,
        };
        employees.push(newEmployeeWithId);
        res.json(newEmployeeWithId);
    }else{
        next({ status: 400, message: "Bad Request"});
    }
});



