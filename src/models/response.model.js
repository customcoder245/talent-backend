import mongoose, { Schema } from "mongoose";

const responseSchema = new Schema(
  {
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true
    },

    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },

    questionCode: {
      type: String,
      required: true
    },

    answer: {
      type: Schema.Types.Mixed,
      required: true
    },

    comment: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// Prevent duplicate answers
responseSchema.index(
  { assessmentId: 1, questionId: 1 },
  { unique: true }
);

export default mongoose.model("Response", responseSchema);
