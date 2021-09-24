const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../constants");
//fs imports
const Server = require("../models/server.model");

const hashPassword = async(password) => await bcrypt.hash(password, 10);

const validatePassword = async(plainPw, hashedPw) => {
    return await bcrypt.compare(plainPw, hashedPw);
};

//signup server
exports.signup = async(req, res, next) => {
    try {
        // get data from request body
        const { email, password } = req.body;

        //validate the data
        //to be done

        //check if email is already registered

        //hash the password
        const hashedPassword = await hashPassword(password);
        //define new server from using server model
        const newServer = new Server({
            email,
            password: hashedPassword,
        });

        //define jwt payload
        const payload = {
            serverId: newServer._id,
        };

        //get access token
        const accessToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1d",
        });

        //assign the access token to the server
        newServer.accessToken = accessToken;

        //save the server
        await newServer.save();

        res.status(201).json({
            data: newServer,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
};

//login server
exports.login = async(req, res, next) => {
    try {
        //get data from request body
        const { email, password } = req.body;

        //validate the data
        //to be done

        //search for requested server to be logged in
        const server = await Server.findOne({ email });
        if (!server) return next(new Error(`server does not exist`));

        //if server found then validate the password
        const validPassword = await validatePassword(password, server.password);
        if (!validPassword) return next(new Error(`password is incorrect`));

        //define jwt payload
        const payload = {
            serverId: server._id,
        };

        //get new access token
        const accessToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1d",
        });

        //update values and login server
        await Server.findByIdAndUpdate(server._id, { accessToken });

        //return status codes and data
        res
            .status(200)
            .json({
                email: server.email,
                token: accessToken,
                message: "Server logged in successfully",
            });
    } catch (err) {
        next(err);
    }
};