const { Router } = require('express');
const { check } = require('express-validator');

const { validateField, validateJWT } = require('../middlewares');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate, existsUserID, existsEventID } = require('../helpers');

const router = Router();

router.post('/create', [
    validateJWT,
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validateField
], createEvent);

router.get('/', getEvents);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsEventID ),
    validateField
], updateEvent);

router.delete("/:event_id/:user_id", [
    validateJWT,
    check('user_id', 'Invalid ID').isMongoId(),
    check('user_id').custom( existsUserID ),
    check('event_id', 'Invalid ID').isMongoId(),
    check('event_id').custom( existsEventID ),
    validateField
], deleteEvent); 

module.exports = router;