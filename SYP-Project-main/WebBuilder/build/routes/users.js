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
const JWT_SECRET_ACCESS = 'bflE+BRI§"GR)GWRIW&§/BIFLBS/%&($fwjbfiwl8/(§/3r9372473o)=(/wqdabdsc§$%VBDSMjwüfpüepü&';
const JWT_SECRET_REFRESH = 'fnsjifh9whfoüake8q39prh8ug4H(/GFR/&§FRGfbuoehf8oqZOnfIUhefuwfhdjiowpht87t&/T§RIdhebf';
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
const authorization = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.sendStatus(401).send('Access Denied. No token provided.');
    }
    try {
        const user = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET_ACCESS);
        req.user = user;
        return next();
    }
    catch (error) {
        return res.sendStatus(400).send('Invalid Token');
    }
};
router.post('/changePassword', authorization, async (req, res) => {
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
        const user = req.user;
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
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET_ACCESS, { expiresIn: '12h' });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET_REFRESH, { expiresIn: '1d' });
        return res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).json({ status: 'ok', accessToken: accessToken, user: user.username, roles: user.roles });
    }
    res.json({ status: 'error', error: 'Invalid password' });
});
router.get("/logout", authorization, (req, res) => {
    return res.clearCookie("access_token").clearCookie("refresh_token")
        .status(200)
        .json({ message: 'Successfully logged out' });
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
            lastname: tfLastName,
            roles: []
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
        await user_1.default.updateOne({ _id: user.id }, { $set: { isVerified: true, roles: [2001] } });
    }
    catch (error) {
        res.send({ status: 'error', error: 'Confirmation failed' });
    }
    return res.redirect('http://localhost:3000/');
});
router.get('/refresh', (req, res) => {
    var _a;
    if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refresh_token) {
        const refreshToken = req.cookies.refresh_token;
        jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET_REFRESH, async (error, user) => {
            if (error) {
                return res.status(403).json({ message: 'Login-Session has expired' });
            }
            else {
                const accessToken = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET_ACCESS, { expiresIn: '12h' });
                const userById = await user_1.default.findOne({ _id: user.id }).lean();
                if (!userById) {
                    return res.status(406).json({ status: 'error', message: 'user not found' });
                }
                return res.cookie("access_token", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                }).cookie("refresh_token", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                }).json({
                    status: 'ok',
                    accessToken: accessToken, user: userById.username, roles: userById.roles
                });
            }
        });
    }
    else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
});
exports.default = router;
