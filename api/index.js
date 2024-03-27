import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {UserModel} from "../api/models/User.js";
import { PostModel } from "./models/Post.js";
import multer from "multer";
const uploadMiddleware = multer({ dest: 'uploads/'});
import fs from "fs";

const app = express();

const salt = bcryptjs.genSaltSync(10);

dotenv.config();
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());

if(process.env.mongoDBURL){
    mongoose.connect(process.env.mongoDBURL)
        .then(() => {
            console.log("App connected to database");
            app.listen(4000, () => {
                console.log(`App listening on port 4000`);
            })
        })
}
else {
    console.error("mongoDBURL is not defined.");
}

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
        const userDoc = await UserModel.create({
            username,
            password: bcryptjs.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch(error){
        res.status(400).json(error);
    }
})

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await UserModel.findOne({username});
    const passOk = bcryptjs.compareSync(password, userDoc.password);
    if(passOk){
        jsonwebtoken.sign({username,id:userDoc._id}, process.env.secret, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        })
    } else{
        res.status(400).json('Wrong credentials');
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jsonwebtoken.verify(token, process.env.secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Logged out');
})

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {title,summary,content} = req.body;
    const postDoc = await PostModel.create({
        title,
        summary,
        content,
        cover: newPath,
    })
    res.json(postDoc);
})