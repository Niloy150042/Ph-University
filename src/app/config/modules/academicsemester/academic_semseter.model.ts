import { model, Schema } from 'mongoose';
import { Tacademic_semester } from './academic_semester.interface';

const semesterschema = new Schema<Tacademic_semester>(
  {
    name: {
      type: String,
      enum: ['Autum', 'Summer', 'Fall'],
      required: true,
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
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
    },
    endMonth: {
      type: String,
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
    },
  },
  {
    timestamps: true,
  },
);

semesterschema.pre('save', async function (next) {
  const issemsterexist = await semestermodel.findOne({
    name: this.name,
    year: this.year,
  });

  if (issemsterexist) {
    throw new Error('semester is already exist');
  }
  if (
    (this.name == 'Autum' && this.code !== '01') ||
    (this.name == 'Fall' && this.code !== '02') ||
    (this.name == 'Summer' && this.code !== '03')
  ) {
    throw new Error('semester code is invalid');
  }
});

export const semestermodel = model<Tacademic_semester>(
  'semester',
  semesterschema,
);
