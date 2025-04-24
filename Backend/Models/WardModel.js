import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    wardNo: {type: Number,required: true},
    beds: {type: Number,required: true},
});

const wardSchema = new mongoose.Schema({

    wardName: { type: String, required: true },

    wardNumbers: [roomSchema]

  }, 
  {

    timestamps: true

  });

const wardModel = mongoose.models.ward || mongoose.model('ward' , wardSchema);

export default wardModel;