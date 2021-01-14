import { TimeSlotResponse } from '../model/api/timeSlot.model';

export function mapTimeSlot(data: TimeSlotResponse) {
  const { results } = data;

  return results.map((item) => {
    return {
      uuid: item.uuid,
      startDate: item.startDate,
      endDate: item.endDate,
      provider: {
        display: item.appointmentBlock.provider.person.display,
      },
    };
  });
}
