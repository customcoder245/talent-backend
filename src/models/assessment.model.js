import mongoose, { Schema } from "mongoose";

const assessmentSchema = new Schema(
  {
    stakeholder: {
      type: String,
      enum: ["leader", "manager", "employee"],
      required: true
    },

    // Leader / Manager
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // Employee only
    employeeDetails: {
      firstName: String,
      lastName: String,
      email: String,
      department: String
    },

    isCompleted: {
      type: Boolean,
      default: false
    },

    submittedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Assessment", assessmentSchema);
