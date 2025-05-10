import { model, Schema } from "mongoose";
import { Tsemesterregistration } from "./semester_registration.interface";

const semesterregistraionschema = new Schema<Tsemesterregistration>({

})

const semesterregistraionmodel = model<Tsemesterregistration>('semesterregistration',semesterregistraionschema)

export default semesterregistraionmodel