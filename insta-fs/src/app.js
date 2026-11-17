import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import UserModel from "./models/user.model.js";
import { sendEmail } from "./config/mail.js";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let { email, given_name } = profile;

      let isExists = await UserModel.findOne({ email });

      if (isExists) return done(null, profile);

      let newUser = await UserModel.create({
        email,
        fullName: given_name,
        provider: "google",
      });

      return done(null, newUser);
    }
  )
);

let template = `<div>
        <h1>Heading hai ye</h1>
        <p>This is to inform all the stuents of fs-36 to do not come tommorrow, due to sabhi log jaa rahe hai...</p>
        <img width="200"
            src="https://i.natgeofe.com/n/8257db7b-ccbb-4b42-a319-9ff4e135fc48/01-macaque-selfie-naruto-indonesia.jpg"
            alt="">
        <small>Best regards <br> <span>
                Anonymous Guy
            </span></small>
    </div>`;

app.get("/", async (req, res) => {
  try {
    await sendEmail(
      "devendradhote179@gmail.com",
      "Updates for tomorrow's class",
      template
    );

    return res.send("ok mail chala gaya");
  } catch (error) {
    console.log("error while sending email", error);
    return res.send("tumse na ho paega");
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

export default app;
