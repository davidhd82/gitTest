"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = __importDefault(require("../model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const BCRYPT_SALT = 10;
const JWT_SECRET = 'bflE+BRI§"GR)GWRIW&§/BIFLBS/%&($fwjbfiwl8/(§/3r9372473o)=(/wqdabdsc§$%VBDSMjwüfpüepü&';
const EMAIL_SECRET = 'r8372tr8ogwi&/ILM_MLDÄLKNA-*PDzitef3izwgdisn-*/DZFERdqw5rfdahvc*jsb&ETI/GDOEZG(O&QFVKUBFj';
const username = 'webbuilder211@gmail.com';
const psw = 'uivfyxxvgxmivevg';
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: username,
        pass: psw,
    },
});
router.post('/changePassword', async (req, res, next) => {
    const { token, tfPsw, tfPswRetype } = req.body;
    if (!tfPsw) {
        return res.json({ status: 'error', error: 'Password is empty' });
    }
    if (tfPsw.length < 6) {
        return res.json({ status: 'error', error: 'Password too small. Should be at least 6 characters' });
    }
    if (tfPsw !== tfPswRetype) {
        return res.json({ status: 'error', error: 'Password does not match the Retype password' });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const hashedPassword = await bcrypt_1.default.hash(tfPsw, BCRYPT_SALT);
        await user_1.default.updateOne({ _id: user.id }, { $set: { psw: hashedPassword } });
        console.log('JWT decoded', user);
    }
    catch (error) {
        return res.json({ status: 'error', 'error': ';))' });
    }
    res.json({ status: 'ok' });
});
router.post('/login', async (req, res, next) => {
    const { tfUsername, tfPsw } = req.body;
    const user = await user_1.default.findOne({ username: tfUsername }).lean();
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username' });
    }
    if (!(user === null || user === void 0 ? void 0 : user.isVerified)) {
        return res.json({ status: 'error', error: 'Email is not verified' });
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(tfPsw, user.psw);
    if (isPasswordCorrect) {
        // the username, password combination is successful
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, JWT_SECRET);
        return res.json({ status: 'ok', data: token });
    }
    res.json({ status: 'error', error: 'Invalid password' });
});
router.post('/register', async (req, res, next) => {
    const { tfFirstName, tfLastName, tfEmail, tfPswRetype, tfUsername, tfPsw } = req.body;
    if (!tfPsw) {
        return res.json({ status: 'error', error: 'Password is empty' });
    }
    if (tfPsw.length < 6) {
        return res.json({ status: 'error', error: 'Password too small. Should be at least 6 characters' });
    }
    if (tfPsw !== tfPswRetype) {
        return res.json({ status: 'error', error: 'Password does not match the Retype password' });
    }
    const password = await bcrypt_1.default.hash(tfPsw, BCRYPT_SALT);
    try {
        const user = await user_1.default.create({
            email: tfEmail,
            firstname: tfFirstName,
            isVerified: false,
            psw: password,
            username: tfUsername,
            lastname: tfLastName
        });
        const token = await jsonwebtoken_1.default.sign({ id: user._id }, EMAIL_SECRET, { expiresIn: '1d' });
        const url = `http://localhost:4000/users/confirmation/${token}`;
        transporter.sendMail({
            to: user.email,
            subject: 'WebBuilder Account-Verification',
            html: `Please click this link for verification: <a href="${url}">${url}</a>`
        });
    }
    catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'Username or Email already in use' });
        }
        throw error;
    }
    res.json({ status: 'ok' });
});
router.get('/confirmation/:token', async (req, res) => {
    const token = req.params.token;
    try {
        const user = jsonwebtoken_1.default.verify(token, EMAIL_SECRET);
        await user_1.default.updateOne({ _id: user.id }, { $set: { isVerified: true } });
    }
    catch (error) {
        res.send({ status: 'error', error: 'Confirmation failed' });
    }
    return res.redirect('http://localhost:3000/');
});
exports.default = router;
