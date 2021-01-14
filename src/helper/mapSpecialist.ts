import { SpecialistResponse } from '../model/api/doctors.model';

export function mapSpecialist(data: SpecialistResponse) {
  return data.results.map((item) => ({
    uuid: item.uuid,
    name: item.name.display,
    type: item.name.conceptNameType,
    concept: {
      uuid: item.conceptClass.uuid,
    },
  }));
}
