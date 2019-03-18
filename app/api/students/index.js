const { Router } = require('express');
const { Student, Ticket } = require('../../models');

function attachTickets(student) {
  return Object.assign({ }, student, {
    tickets: Ticket.get().filter(el => el.studentId === student.id),
  });
}

function attachTicketsMultiple(students) {
  return students.map(attachTickets);
}

function getByFirstName(firstname) {
  return Student.get().filter(student => student.firstname === firstname);
}

function getByLastName(lastname) {
  return Student.get().filter(student => student.lastname === lastname);
}

/*
function getByBoth(firstname, lastname) {
  return Student.get().filter((student) => {
    student.firstname === firstname && student.lastname === lastname;
  });
}
*/

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get().map(attachTickets)));
router.get('/:studentId', (req, res) => res.status(200).json(attachTickets(Student.getById(req.params.studentId))));
router.get('/firstname/:firstname', (req, res) => res.status(200).json(attachTicketsMultiple(getByFirstName(req.params.firstname))));
router.get('/lastname/:lastname', (req, res) => {
  res.status(200).json(attachTicketsMultiple(getByLastName(req.params.lastname)));
});
/*
router.get('/firstname/:firstname/lastname/:lastname', (req, res) => {
  res.status(200).json(attachTicketsMultiple(getByBoth(req.params.firstname, req.params.lastname)));
});
*/
router.delete('/:studentId', (req, res) => res.status(200).json(Student.delete(req.params.studentId)));
router.put('/:studentId', (req, res) => res.status(200).json(attachTickets(Student.update(req.params.studentId, req.body))));
router.post('/', (req, res) => {
  try {
    const student = attachTickets(Student.create(req.body));
    res.status(201).json(student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
