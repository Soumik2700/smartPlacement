import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.grlrl2e.mongodb.net/`);
const db = mongoose.connection;
const app =  express();

db.on("open", ()=>{
    console.log("Database connected!");
})

db.on("error", ()=>{
    console.log("connection unsucessfull!");
})


app.listen(5100, ()=>{
    console.log("Server is running on port 5100!");
})