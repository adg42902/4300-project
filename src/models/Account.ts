import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    criteria: { type: String, required: true },
    songs: [{ type: String}]
})

const accountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    playlists: [playlistSchema],
})

const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;