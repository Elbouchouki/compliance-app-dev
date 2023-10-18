import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // FIXME : to be change
    pass: process.env.SMTP_PASS  // FIXME : to be change
  }
})

export const mailRouter = router({
  send: publicProcedure.input(
    z.object({
      email: z.string(),
      subject: z.string(),
      content: z.string(),
    })
  ).mutation(({ input }) => {
    return transporter.sendMail({
      to: input.email,
      subject: input.subject,
      text: JSON.stringify(input.content),
    })
  }),
});