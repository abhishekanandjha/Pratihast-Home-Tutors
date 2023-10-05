import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  schoolName: {
    type: String,
    required: [true, "Please provide a school/college name"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
  },
  noOfClassesPerWeek: {
    type: Number,
    required: [true, "Please provide the number of classes per week"],
    min: 1,
    max: 7,
  },
  tutorMode: {
    type: String,
    required: [true, "Please select a tuition mode"],
  },
  class: {
    type: String,
    required: [true, "Please select a class"],
  },
  genderRestriction: {
    type: String,
    required: [true, "Please select a gender restriction"],
  },
  whatsappNumber: {
    type: String,
    required: [true, "Please provide a WhatsApp number"],
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value); // Validate as a 10-digit number
      },
      message: "Please enter a valid 10-digit WhatsApp number",
    },
  },
  classRequiredFrom: {
    type: Date,
    required: [true, "Please provide a date for class required from"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  note: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
