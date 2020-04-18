import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (req, res) => {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentRepository.find();
    return res.json(appointments);
});

appointmentRouter.post('/', async (req, res) => {
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute({
            provider,
            date: parsedDate,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentRouter;
