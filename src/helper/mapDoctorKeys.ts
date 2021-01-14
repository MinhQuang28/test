import { startsWith } from 'lodash';
import { ATTRIBUTES_PREFIX, ATTRIBUTES_TYPE } from '../constants/Doctors';
import {
  DoctorResponse,
  Result,
  Attribute,
  ValueClass,
} from '../model/api/doctors.model';

export function mapDoctorKeys(data: DoctorResponse) {
  const { results } = data;

  return results.map((item: Result) => {
    const specialist = item.attributes
      .filter(
        (i: Attribute) =>
          i.attributeType.display === ATTRIBUTES_TYPE.SPECIALIST,
      )
      .map((i) => (i.value as ValueClass).display);

    const workingProcess = item.attributes
      .filter((i: Attribute) =>
        startsWith(item.display, ATTRIBUTES_TYPE.WORKING_PROCESS),
      )
      .map((i) => i.value);

    const examinationFees = item.attributes
      .filter((i: Attribute) =>
        startsWith(item.display, ATTRIBUTES_TYPE.EXAMINATION_FEES),
      )
      .map((i) => i.value);

    const trainingProcess = item.attributes
      .filter((i: Attribute) =>
        startsWith(item.display, ATTRIBUTES_TYPE.TRAINING_PROCESS),
      )
      .map((i) => i.value);

    const avatar = item.user.attributes.find((i) =>
      startsWith(i.display, ATTRIBUTES_PREFIX.AVATAR),
    );

    return {
      uuid: item.uuid,
      person: {
        uuid: item.person?.uuid,
        displayName: item.person?.display,
        rank: item.rank,
        workPlace: item.workPlace,
        gender: item.person?.gender,
        specialist,
        workingProcess,
        examinationFees,
        trainingProcess,
        description: item.description,
        retired: item.retired,
        yearExperience: item.yearExperience,
        status: 'Đã từng khám',
        timeAvailable: '',
        today: item.today,
        tomorrow: item.tomorrow,
        favourite: item.favourite,
        examined: item.examined,
        avatar,
        // experience: '20 năm kinh nghiệm',
      },
    };
  });
}
