import Result from "../Model/resultModel.js";

export async function createResult(req, res) {
  try {
    //User not found
    if (!req.user || !req.user.id) {
      res.status(401).json({
        message: "Not authorized",
      });
    }
    const { title, technology, level, totalQuestions, correct, wrong } =
      req.body;
    if (
      !title ||
      !technology ||
      !level ||
      totalQuestions === undefined ||
      correct === undefined
    ) {
      res.status(400).json({success:false, message: "Missing fields" });
    }
    // compute wrong if not provided
    const computedWrong =
      wrong !== undefined
        ? Number(wrong)
        : Math.max(0, Number(totalQuestions) - Number(correct));

    // title not found
    if (!title) {
      res.status(400).json({ message: "title not found" });
    }
    const payload = {
      title: String(title).trim(),
      technology,
      level,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      wrong: computedWrong,
      user: req.user.id, // for particular user, user can see only his activity
    };
    const created = await Result.create(payload);
    return res
      .status(201)
      .json({ success:true, message: "Result Saved !!", result: created });
  } catch (err) {
    console.error("Create Result error", err);
    return res.status(500).json({ success:true, message: "server error" });
  }
}

//List the result

export async function listResult(req, res) {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({
        message: "Not authorized",
      });
    }

    const technology = req.query;
    const query = { user: req.user.id };
    if (technology && technology.tLowerCase() !== "all") {
      query.technology = technology;
    }

    // query is a filter object (e.g. { userId: 5 })Returns all matching documents (not just one)
    //-1 means descending order So the newest records come first
    //.lean()Converts Mongoose documents into plain JavaScript objects
    const item = await Result.find(query).sort({ createdAt: -1 }).lean();

    return res.status(201).json({ success: true, result: item });
  }catch (err) {
    console.error("listResult error", err);
    return res.status(500).json({ message: "server error" });
  }
}
