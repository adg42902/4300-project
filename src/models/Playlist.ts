import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true},
    songs: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
})

const Playlist = mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);


export default Playlist;