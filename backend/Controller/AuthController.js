const UserModel = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const handleSignIn = async (req, res) => {
    try {
        let { email, password, passwordConfirm } = req.body;
        if (email && password && passwordConfirm) {
            //check if email already exists
            const isEmailExists = await UserModel.findOne({ email });
            if (!isEmailExists) {
                if (password === passwordConfirm) {
                    //hash password 
                    const salt = await bcrypt.genSalt(10);
                    password = await bcrypt.hash(password, salt);
                    const User = new UserModel({ email, password });
                    await User.save();
                    res.status(200).json({
                        succes: true,
                        message: "User Registered Succesful",
                    });
                }
                else
                {
                    res.status(401)
                    .json({
                        succes:false,
                        messagge:"Password Not Match"
                    })
                }

            }
            else {
                //email already registered
                res.status(409).json({ succes: false, message: "email already registered" });
            }
        }
        else {
            res.status(401).json({
                succes: false,
                message: "all fields required",
            })
        }



    } catch (error) {
        res.status(500).json({
            succes: false,
            message: error.message,
        })
    }
};
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (email && password) {
            const isEmailExists = await UserModel.findOne({ email });
            if (isEmailExists) {
                //user exits
                const isPasswordCorrect = await bcrypt.compare(password, isEmailExists.password);
                if (isPasswordCorrect) {
                    //jwt token 
                    const token = jwt.sign({ userId: isEmailExists._id }, process.env.private_key, { expiresIn: "2d" });
                    res.status(200).json({
                        succes: true,
                        message: "User Loged In Succes",
                        token,
                    })
                }
                else {
                    //incorrect password
                    res.status(401).json({
                        succes: false,
                        message: "incorrect password",
                    })
                }
            }
            else {
                //user not exists
                res.status(404).send({
                    succes: false,
                    message: "Email Not Registered",
                })
            }
        }
        else {
            res.status(401).json({
                succes: false,
                message: "all fields required",
            })
        }



    } catch (error) {
        res.status(500).json({
            succes: false,
            message: error.message,
        })
    }
}

module.exports = {
    handleSignIn,
    handleLogin,
}