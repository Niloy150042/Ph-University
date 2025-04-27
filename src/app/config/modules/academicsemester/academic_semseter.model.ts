import { model, Schema } from 'mongoose';
import { Tacademic_semester } from './academic_semester.interface';

const semesterschema = new Schema<Tacademic_semester>({
  name: {
    type: String,
    enum: ['Autum,Summer,Fall'],
    required: true,
  },
  code: {
    type: String,
    enum: ['01,02,03'],
    required: true,
  },
  year: {
    type: Date,

    enum: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    required: true,
  },
});

export const semestermodel = model<Tacademic_semester>(
  'semester',
  semesterschema,
);
