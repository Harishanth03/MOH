import mongoose from "mongoose";

const bedAllocationSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },

    wardName: { type: String, required: true },

    wardNo: { type: Number, required: true },

    bedNo: { type: Number, required: true },

    allocationTime: { type: Date, default: Date.now }

})

export default mongoose.model('BedAllocation', bedAllocationSchema);