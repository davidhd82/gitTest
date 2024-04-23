import express, {NextFunction, Request, Response} from "express";
import nodemailer from 'nodemailer';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


const router = express.Router();
const BCRYPT_SALT: number = 10;
const JWT_SECRET: string = 'bflE+BRI§"GR)GWRIW&§/BIFLBS/%&($fwjbfiwl8/(§/3r9372473o)=(/wqdabdsc§$%VBDSMjwüfpüepü&';
const EMAIL_SECRET: string = 'r8372tr8ogwi&/ILM_MLDÄLKNA-*PDzitef3izwgdisn-*/DZFERdqw5rfdahvc*jsb&ETI/GDOEZG(O&QFVKUBFj';

const username: string = 'webbuilder211@gmail.com';
const psw: string = 'uivfyxxvgxmivevg';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: username,
        pass: psw,
    },
});

router.post('/changePassword', async (req: Request, res: Response, next: NextFunction) => {
    const {token, tfPsw, tfPswRetype} = req.body;

    if (!tfPsw) {
        return res.json({status: 'error', error: 'Password is empty'});
    }

    if (tfPsw.length < 6) {
        return res.json({status: 'error', error: 'Password too small. Should be at least 6 characters'});
    }

    if (tfPsw !== tfPswRetype) {
        return res.json({status: 'error', error: 'Password does not match the Retype password'});
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const hashedPassword = await bcrypt.hash(tfPsw, BCRYPT_SALT);
        await User.updateOne({_id: (user as any).id},
            {$set: {psw: hashedPassword}});
        console.log('JWT decoded', user);
    } catch (error: any) {
        return res.json({status: 'error', 'error': ';))'});
    }

    res.json({status: 'ok'});
});

router.post('/login', async (req: Request, res: Response, next) => {
    const {tfUsername, tfPsw} = req.body;

    const user = await User.findOne({username: tfUsername}).lean();

    if (!user) {
        return res.json({status: 'error', error: 'Invalid username'});
    }

    if (!user?.isVerified) {
        return res.json({status: 'error', error: 'Email is not verified'});
    }

    const isPasswordCorrect = await bcrypt.compare(tfPsw, user!.psw);

    if (isPasswordCorrect) {
        // the username, password combination is successful

        const token = jwt.sign({id: user!._id, username: user!.username}, JWT_SECRET);

        return res.json({status: 'ok', data: token});
    }

    res.json({status: 'error', error: 'Invalid password'});
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const {tfFirstName, tfLastName, tfEmail, tfPswRetype, tfUsername, tfPsw} = req.body;

    if (!tfPsw) {
        return res.json({status: 'error', error: 'Password is empty'});
    }

    if (tfPsw.length < 6) {
        return res.json({status: 'error', error: 'Password too small. Should be at least 6 characters'});
    }

    if (tfPsw !== tfPswRetype) {
        return res.json({status: 'error', error: 'Password does not match the Retype password'});
    }

    const password = await bcrypt.hash(tfPsw, BCRYPT_SALT);

    try {
        const user = await User.create({
            email: tfEmail,
            firstname: tfFirstName,
            isVerified: false,
            psw: password,
            username: tfUsername,
            lastname: tfLastName
        });

        const token = await jwt.sign({id: user._id}, EMAIL_SECRET, {expiresIn: '1d'});

        const url: string = `http://localhost:4000/users/confirmation/${token}`;

        transporter.sendMail({
            to: user.email,
            subject: 'WebBuilder Account-Verification',
            html: `Please click this link for verification: <a href="${url}">${url}</a>`
        });
    } catch (error: any) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({status: 'error', error: 'Username or Email already in use'});
        }
        throw error
    }

    res.json({status: 'ok'});
});

router.get('/confirmation/:token', async (req: Request, res: Response) => {
    const token: string = req.params.token;

    try {
        const user = jwt.verify(token, EMAIL_SECRET);
        await User.updateOne({_id: (user as any).id}, {$set: {isVerified: true}});
    } catch (error: any) {
        res.send({status: 'error', error: 'Confirmation failed'});
    }

    return res.redirect('http://localhost:3000/');
})

export default router;
