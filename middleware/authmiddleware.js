import { supabase } from "../utliz/supabseconncet.js";

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ success: false, message: "No token found" });

  const token = authHeader.split(" ")[0];
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user)
    return res
      .status(401)
      .json({ sucess: false, message: "Invalid or expired session" });

  req.user = user;

  next();
};

export default requireAuth;
