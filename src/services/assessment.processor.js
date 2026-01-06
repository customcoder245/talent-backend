import Response from "../models/response.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";

/**
 * Convert Responses → Answers (analytics-ready)
 */
export const processAssessment = async (assessmentId) => {
  const responses = await Response.find({ assessmentId });

  for (const r of responses) {
    const q = await Question.findById(r.questionId);

    if (!q) continue;

    await Answer.create({
      assessmentId,
      questionId: q._id,
      questionCode: q.questionCode,
      questionStem: q.questionStem,
      stakeholder: q.stakeholder,
      domain: q.domain,
      subdomain: q.subdomain,
      questionType: q.questionType,
      scale: q.scale,
      value: typeof r.answer === "number" ? r.answer : null,
      selectedOption: typeof r.answer === "string" ? r.answer : null,
      higherValueOption: q.forcedChoice?.higherValueOption || null,
      valueDirection: q.forcedChoice?.higherValueOption
        ? r.answer === q.forcedChoice.higherValueOption
          ? "HIGHER"
          : "LOWER"
        : null,
      comment: r.comment,
      subdomainWeight: q.subdomainWeight
    });
  }
};
