import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // <-- this should match your PatientModel's name
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  email: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  message: {
    type: String,
    required: false,
    maxlength: 300
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const donationModel = mongoose.model('donation', donationSchema);

export default donationModel;
