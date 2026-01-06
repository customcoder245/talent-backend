import Assessment from "../models/assessment.model.js";
import { processAssessment } from "../services/assessment.processor.js";

/**
 * START ASSESSMENT
 * Creates draft assessment
 */
export const startAssessment = async (req, res) => {
  try {
    const { stakeholder, employeeDetails } = req.body;

    if (!stakeholder) {
      return res.status(400).json({ message: "Stakeholder is required" });
    }

    const assessmentData = { stakeholder };

    if (stakeholder === "leader" || stakeholder === "manager") {
      assessmentData.userId = req.user.userId;
    }

    if (stakeholder === "employee") {
      if (
        !employeeDetails?.firstName ||
        !employeeDetails?.lastName ||
        !employeeDetails?.email ||
        !employeeDetails?.department
      ) {
        return res.status(400).json({ message: "Employee details required" });
      }
      assessmentData.employeeDetails = employeeDetails;
    }

    const assessment = await Assessment.create(assessmentData);

    return res.status(201).json({
      message: "Assessment started",
      assessmentId: assessment._id
    });
  } catch (error) {
    res.status(500).json({
      message: "Error starting assessment",
      error: error.message
    });
  }
};

/**
 * SUBMIT ASSESSMENT (FINAL)
 */
export const submitAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    if (assessment.isCompleted) {
      return res.status(400).json({ message: "Assessment already submitted" });
    }

    assessment.isCompleted = true;
    assessment.submittedAt = new Date();
    await assessment.save();

    // Process responses → answers
    await processAssessment(assessmentId);

    return res.status(200).json({
      message: "Assessment submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting assessment",
      error: error.message
    });
  }
};
