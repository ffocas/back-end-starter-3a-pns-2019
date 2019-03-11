const { Router } = require('express');
const { Student, Ticket } = require('../../models');

function attachTickets(student) {
  return Object.assign({ }, student, {
    tickets: Ticket.get().filter(el => el.studentId === student.id)
  });
}

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get().map(attachTickets)));
router.get('/:studentId', (req, res) => res.status(200).json(attachTickets(Student.getById(req.params.studentId))));
router.delete('/:studentId', (req, res) => res.status(200).json(attachTickets(Student.delete(req.params.studentId))));
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
