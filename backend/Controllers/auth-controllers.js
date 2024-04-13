import { nanoid } from "nanoid";
import Users from "../Schema/Users.js";
import bcrypt from 'bcryptjs';
import  Jwt  from "jsonwebtoken";



let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const sendData = (user) => {
    const access_token = Jwt.sign({ id: user._id }, process.env.USER_SECRET_KEY)
    return {
        access_token: access_token,
        fullname : user.fullname,
        username: user.username,
        email: user.email,
    }
}

const generateUsername = async (email) => {
    let username = email.split('@')[0];
    let isUsername = await Users.findOne({ "profile_details.username": username });
    
    if (isUsername) {
        username += '-' + nanoid(8); // Append a random string if the username is not unique
    }
    
    return username;
};


export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        // Check if email is provided
        if (!email) {
            return res.status(403).json({ "error": "Please provide an email" });
        }

        // Check if password meets requirements
        if (!password || !passwordRegex.test(password)) {
            return res.status(403).json({ "error": "Password should contain at least 1 capital letter, 1 special character, and 1 number" });
        }

        // Check if name length is valid
        if (fullname.length < 3) {
            return res.status(403).json({ "error":"Your name should be at least 3 characters long" });
        }

        // Check if email is valid
        if (!emailRegex.test(email)) {
            return res.status(403).json({ "error": "Invalid email" });
        }

        // Check if email already exists
        const existingUser = await Users.findOne({ 'profile_details.email': email });
        if (existingUser) {
            return res.status(403).json({ "error": "Email is already in use" });
        }

        // Hash the password
        const saltRounds = 12;
        const hash = await bcrypt.hash(password, saltRounds);
        const username = await generateUsername(email);

        // Create a new user instance
        const newUser = new Users({
                fullname,
                email,
                username,
                password: hash
            
        });

        // Save the user to the database
        let user = await newUser.save();
        
        return res.status(200).json({"data" : sendData(user)})
    } catch (error) {
        console.log(error);
        if (error.code == 11000) {
            return res.status(400).json({ "error": "User already exists" });
        }
        return res.status(500).json({ "error": "An error occurred while signing up the user" });
    }
};


export const signin = (req, res) =>{
    const { email, password } = req.body

        Users.findOne({ "email": email })
            .then((user) => {
                if (!user) {
                    return res.status(403).json({ "error": "User does not exists" })
                }
                else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            return res.status(403).json({ "error": "Error occured while login please try again" })
                        }
                        if (!result) {
                            return res.status(403).json({ "error": "Email and password does not match" })
                        }
                        else {
                            return res.status(200).json({"data" : sendData(user)})
                        }
                    })
                }

            })

            .catch((error) => {
                console.log(error);
                res.status(500).json({ "error": error.message })
            })
}