import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  playlists: { type: Array, default: [], required: true },
});

const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
