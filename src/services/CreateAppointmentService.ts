import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
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
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date); // nesse caso já é uma regra de negócio
    const finAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (finAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    // Nesse caso não usa o await pq esse método create não salva
    // o registro no banco de dados.  Ele apenas cria uma instância
    // do objeto que queremos salvar no banco
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
