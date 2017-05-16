import * as nodemailer from "nodemailer";
import {Request, Response} from "express";

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /docs
 * Docs home.
 */
export let getDocs = (req: Request, res: Response) => {
  res.render("docs", {
    title: "Docs"
  });
};
