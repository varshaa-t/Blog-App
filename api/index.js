import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { UserModel } from "../api/models/User.js";
import { PostModel } from "./models/Post.js";
import multer from "multer";
const uploadMiddleware = multer({ dest: 'uploads/' });
import fs from "fs";
import * as url from 'url';
import { postSchemaZod, userSchemaZod } from "./lib/validations.js"
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

const salt = bcryptjs.genSaltSync(10);

dotenv.config();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

if (process.env.mongoDBURL) {
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

app.post('/register', async (req, res) => {
    const body = req.body;
    const { email, password } = req.body;

    try{
        const parsedData = userSchemaZod.safeParse(body);
        if(!parsedData.success){
            return res.status(422).json({ error: parsedData.error });
        }

        const userDoc = await UserModel.create({
            email,
            password: bcryptjs.hashSync(password, salt)
            });
            res.status(200).json({
            id: userDoc._id,
            email: userDoc.email,
            });
    } catch(error) {
        res.status(400).json({message: error.message})
    }
    })

app.post('/login', async (req, res) => {
    const body = req.body;
    const { email, password } = req.body;

    const parsedData = userSchemaZod.safeParse(body);

    if(!parsedData.success){
        return res.status(422).json({ error: parsedData.error });
    }

    const userDoc = await UserModel.findOne({ email });
    const passOk = bcryptjs.compareSync(password, userDoc.password);
    if (passOk) {
        jsonwebtoken.sign({ email, id: userDoc._id }, process.env.secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                email,
            });
        })
    } else {
        res.status(400).json('Wrong credentials');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    jsonwebtoken.verify(token, process.env.secret, { expiresIn: '1d'}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Logged out');
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jsonwebtoken.verify(token, process.env.secret, {}, async (err, info) => {
        if (err) throw err;
        const body = req.body;
        const { title, summary, content } = req.body;

        const parsedData = postSchemaZod.safeParse(body);
        if(!parsedData.success){
            return res.status(422).json({ error: parsedData.error });
        }

        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        })
        res.json(postDoc);
    })
})

app.get('/post', async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['email'])
        .sort({ createdAt: -1 })
        .limit(20)
    );
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jsonwebtoken.verify(token, process.env.secret, {}, async (err, info) => {
        if (err) throw err;

        const body = req.body;
        const { id, title, summary, content } = req.body;

        const parsedData = postSchemaZod.safeParse(body);
        if(!parsedData.success){
            return res.status(422).json({ error: parsedData.error });
        }
        
        const postDoc = await PostModel.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('You are not the author');
        }
        await PostModel.findByIdAndUpdate(id, {
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        res.json(postDoc);
    })
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate('author', ['email']);
    res.json(postDoc);
})

app.delete('/post/:id', async (req,res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findByIdAndDelete(id);

    if (!postDoc) {
        return res.status(404).json({ message: 'Post not found' });
    }
    
    return res.status(200).send({
        message: "Blog post deleted successfully"
    })
})
