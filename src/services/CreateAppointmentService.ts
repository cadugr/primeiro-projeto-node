import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

// Todo service sempre terá um único método...alguns chamam de execute, outros de run...
// O service nunca terá acesso as variáveis de requisição e resposta.
/**
 * Dependency inversion (SOLID)
 */
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date); // nesse caso já é uma regra de negócio
    const finAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (finAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
