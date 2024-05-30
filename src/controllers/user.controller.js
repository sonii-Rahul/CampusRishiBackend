import { json } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js";
import { User } from "../models/User.Model.js";
import apiResponse from "../utils/apiResponse.js";
import { generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse } from "@simplewebauthn/server";
import { Challenge } from "../models/challenge.model.js"
import { Loginchallenge } from "../models/loginchallenge.model.js";
import { Passkey } from "../models/Passkey.model.js"

import crypto from 'crypto'
let userstore = {};

if (!globalThis.crypto) {
    globalThis.crypto = crypto;
}

const genrateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new apiError(400, "usernot getting in genrate section ")
        }

        const accesstoken = user.accessTokenGenrate()
        const refreshtoken = user.reFreshTokenGentate()

        user.refreshtoken = refreshtoken
        await user.save({ validateBeforesave: false })
        return { accesstoken, refreshtoken }

    } catch (error) {
        throw new apiError("500", error, "something went wrong while genrateing refresh and access Token")

    }
}



const loginUser = asyncHandler(async (req, res) => {

    const { username, password, } = req.body;
    if (!username || !password) {
        throw new apiError("400", "all user fields are required")
    }
    const checkuser = await User.findOne({ username })
    if (!checkuser) {
        throw new apiError("401", "usernot found")
    }
    const ispasswordvalid = await checkuser.isPasswordCorrect(password)
    if (!ispasswordvalid) {
        throw new apiError("401", "password incoorect")
    }
    const { accesstoken, refreshtoken } = await genrateAccessAndRefreshTokens(checkuser._id)
    const loggedinuser = await User.findById(checkuser._id).select("-password -refreshToken")
    const options = {
        path: '/'
    }
    return res.status(200)
        .cookie("accessToken", accesstoken, options)
        .cookie("refreshToken", refreshtoken, options)
        .json(
            new apiResponse(200, {
                user: loggedinuser, accesstoken, refreshtoken
            },
                "User Logged in successfully"
            )
        )


})

const logOutUser = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const updated = await User.findByIdAndUpdate(userId,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new apiResponse(200, "user log ot successfully"))



})

const verifyLogin = async (req, res) => {
    try {
        const userId = req.user._id;
        const verifiedUser = await User.findById(userId);

        if (verifiedUser) {
            const response = new apiResponse(200, { user: verifiedUser }, "userverified");
            return res.status(response.statuscode).json(response);
        } else {
            const response = new apiResponse(404, null, "User not found");
            return res.status(response.statuscode).json(response);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        const response = new apiResponse(500, null, "Internal Server Error");
        return res.status(response.statuscode).json(response);
    }
};

const challenge = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const verifiedUser = await User.findById(user);
    if (!verifiedUser) {
        throw new apiError(404, "User not found");
    }

    const challengePayload = await generateRegistrationOptions({
        rpID: 'localhost',
        rpName: "mylocalhost",
        userName: verifiedUser.fullName,
    });

    const newChallenge = await Challenge.create({
        userId: verifiedUser._id,
        challengepayload: challengePayload.challenge
    });

    return res.json({ options: challengePayload });
});

const challengeverify = asyncHandler(async (req, res) => {
    const user = req.user;
    const { cred } = req.body;

    try {
        // Find the user by ID
        const verifiedUser = await User.findById(user._id);
        if (!verifiedUser) {
            throw new apiError(404, "User not found");
        }

        // Find the challenge by userId
        const userChallenge = await Challenge.findOne({ userId: verifiedUser._id });
        if (!userChallenge) {
            throw new apiError(404, "Challenge not found");
        }

        // Verify the registration response
        const verificationResult = await verifyRegistrationResponse({
            expectedChallenge: userChallenge.challengepayload,
            expectedOrigin: 'http://localhost:5173',
            expectedRPID: 'localhost',
            response: cred,
        });

        if (!verificationResult.verified) {
            // Delete the challenge if verification failed
            await userChallenge.delete();
            return res.json({ error: "Could not verify" });
        }

        const { credentialID, credentialPublicKey, counter, credentialDeviceType, credentialBackedUp } = verificationResult.registrationInfo;

        const publicKeyBuffer = Buffer.from(credentialPublicKey);

        const newPasskey = new Passkey({
            userId: verifiedUser._id,
            webAuthnUserID: userChallenge.userId.toString(),
            id: credentialID,
            publicKey: publicKeyBuffer,
            counter,
            deviceType: credentialDeviceType,
            backedUp: credentialBackedUp,
            transports: cred.response.transports,
        });
        await newPasskey.save();
        console.log("Verification successful:");

        // Delete the challenge after successful verification
        await Challenge.deleteOne({ _id: userChallenge._id });

        return res.json({ verified: true });
    } catch (error) {
        // Delete the challenge if there's any kind of error
        const userChallenge = await Challenge.findOne({ userId: verifiedUser._id });
        if (userChallenge) {
            await Challenge.deleteOne({ _id: userChallenge._id });
        }
        console.error("Error occurred:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



const loginchallenge = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const checkuser = await User.findOne({ username })
    if (!checkuser) {
        throw new apiError("401", "usernot found")
    }
    const opts = await generateAuthenticationOptions({
        rpID: "localhost",

    })

    const newloginchallenge = await Loginchallenge.create({
        userId: checkuser._id,
        challengepayload: opts.challenge
    })

    return res.json({ options: opts })




})
const loginchallengeverify = asyncHandler(async (req, res) => {
    const { username, cred } = req.body;
    const user = await User.findOne({ username });

    try {
        // Find the user by username
        
        if (!user) {
            throw new apiError(404, "User not found");
        }

        // Find the user by ID
        const verifiedUser = await User.findById(user._id);
        if (!verifiedUser) {
            throw new apiError(404, "User not found");
        }

        // Find the challenge by userId
        const userChallenge = await Loginchallenge.findOne({ userId: verifiedUser._id });
        if (!userChallenge) {
            throw new apiError(404, "Challenge not found");
        }

        // Find the passkey associated with the user
        const passkeyUser = await Passkey.findOne({ userId: verifiedUser._id });
        if (!passkeyUser) {
            throw new apiError(404, "Passkey not found");
        }

        // Convert Buffer to Uint8Array
        const publicKeyUint8Array = new Uint8Array(passkeyUser.publicKey);

        // Verify the authentication response
        const result = await verifyAuthenticationResponse({
            expectedChallenge: userChallenge.challengepayload,
            expectedOrigin: 'http://localhost:5173',
            expectedRPID: 'localhost',
            response: cred,
            authenticator: {
                credentialPublicKey: publicKeyUint8Array,
                counter: passkeyUser.counter,
                transports: passkeyUser.transports
            }
        });

        if (!result.verified) {
            return res.json({ error: "Something went wrong" });
        }

        // Delete the login challenge after successful authentication
        await Loginchallenge.deleteOne({ _id: userChallenge._id });

        const { accesstoken, refreshtoken } = await genrateAccessAndRefreshTokens(user._id);
        
        const loggedinuser = await User.findById(verifiedUser._id).select("-password -refreshToken");
        const options = {
            path: '/'
        };
        return res.status(200)
            .cookie("accessToken", accesstoken, options)
            .cookie("refreshToken", refreshtoken, options)
            .json(
                new apiResponse(200, {
                    user: loggedinuser, accesstoken, refreshtoken
                },
                "User logged in successfully"
            )
        );
    } catch (error) {
        // Delete the login challenge if there's any kind of error
        const userChallenge = await Loginchallenge.findOne({ userId: user._id
         });
        if (userChallenge) {
            await Loginchallenge.deleteOne({ _id: userChallenge._id });
        }
        console.error("Error occurred:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});





export { loginUser, logOutUser, verifyLogin, challenge, challengeverify, loginchallenge, loginchallengeverify };
