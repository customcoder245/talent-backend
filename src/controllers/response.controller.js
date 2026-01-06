import Response from "../models/response.model.js";

/**
 * SAVE RESPONSE (Autosave)
 */
export const saveResponse = async (req, res) => {
  try {
    const {
      assessmentId,
      questionId,
      questionCode,
      answer,
      comment
    } = req.body;

    if (!assessmentId || !questionId || !questionCode || answer === undefined) {
      return res.status(400).json({ message: "Invalid response data" });
    }

    const response = await Response.findOneAndUpdate(
      { assessmentId, questionId },
      { questionCode, answer, comment },
      { upsert: true, new: true }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error saving response",
      error: error.message
    });
  }
};
