import express, {NextFunction, Request, Response} from "express";
import nodemailer from 'nodemailer';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const router = express.Router();
const BCRYPT_SALT: number = 10;
const JWT_SECRET_ACCESS: string = 'bflE+BRI§"GR)GWRIW&§/BIFLBS/%&($fwjbfiwl8/(§/3r9372473o)=(/wqdabdsc§$%VBDSMjwüfpüepü&';
const JWT_SECRET_REFRESH: string = 'fnsjifh9whfoüake8q39prh8ug4H(/GFR/&§FRGfbuoehf8oqZOnfIUhefuwfhdjiowpht87t&/T§RIdhebf';
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

interface TokenUser {
    id: number
}

interface CustomRequest extends Request {
    user?: TokenUser
}

const authorization = (req: CustomRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.sendStatus(401).send('Access Denied. No token provided.');
    }
    try {
        const user = jwt.verify(accessToken, JWT_SECRET_ACCESS);
        req.user = (user as any);
        return next();
    } catch (error: any) {
        return res.sendStatus(400).send('Invalid Token');
    }
}

router.post('/changePassword', authorization, async (req: CustomRequest, res: Response) => {
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
        const user: any = req.user;
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

        const accessToken = jwt.sign({id: user!._id}, JWT_SECRET_ACCESS, {expiresIn: '12h'});
        const refreshToken = jwt.sign({id: user!._id}, JWT_SECRET_REFRESH, {expiresIn: '1d'});
        return res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).json({status: 'ok', accessToken: accessToken, user: user.username, roles: user.roles});
    }

    res.json({status: 'error', error: 'Invalid password'});
});

router.get("/logout", authorization, (req: Request, res: Response) => {
    return res.clearCookie("access_token").clearCookie("refresh_token")
        .status(200)
        .json({message: 'Successfully logged out'});
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
            lastname: tfLastName,
            roles: []
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
        await User.updateOne({_id: (user as any).id}, {$set: {isVerified: true, roles: [2001]}});
    } catch (error: any) {
        res.send({status: 'error', error: 'Confirmation failed'});
    }

    return res.redirect('http://localhost:3000/');
})

router.get('/refresh', (req: Request, res: Response) => {
    if (req.cookies?.refresh_token) {
        const refreshToken = req.cookies.refresh_token;

        jwt.verify(refreshToken, JWT_SECRET_REFRESH,
            async (error: any, user: any) => {
                if (error) {
                    return res.status(403).json({message: 'Login-Session has expired'});
                } else {
                    const accessToken = jwt.sign({id: user.id, username: user.username}, JWT_SECRET_ACCESS,
                        {expiresIn: '12h'});

                    const userById = await User.findOne({_id: user.id}).lean();

                    if (!userById) {
                        return res.status(406).json({status: 'error', message: 'user not found'});
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
            })
    } else {
        return res.status(406).json({message: 'Unauthorized'});
    }
})

export default router;
