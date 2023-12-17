import mongoose from "mongoose";

const videoGameSchema = new mongoose.Schema({
    title: String,
    platform: [String],
    publisher: String,
    release_date: String,
});

export default mongoose.model("VideoGame", videoGameSchema);