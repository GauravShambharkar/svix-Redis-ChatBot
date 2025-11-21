import express from "express";
import { Svix, Webhook } from "svix";

const testingEndpoint = express.Router();
// step 1 - from the event end point
const apiToken = "testsk_Mdxs5tNppTWJ6LPkfLWfCyCJPYqs5AzC.eu";
const AppId = "app_34NHWsSBFHHbREgBatE5QbDANFr";

// step 2 - on the webhook receiver end
const signInSecret = "whsec_aCRWj7IvTM0yYBxuClJ/Qy/jE0QlntJA";

const webhook = new Webhook(signInSecret);

const svix = new Svix(apiToken);

testingEndpoint.post("/user", async (req, res) => {
  const { email } = req.body;

  await svix.message.create(AppId, {
    payload: { email: email },
    eventType: "user.created",
  });

  res.send({
    msg: "User creation webhook sent",
  });
});

testingEndpoint.post(
  "/user/webhook",
  express.raw({ type: "*/*" }),
  async (req, res) => {
    try {
      const wh: any = webhook.verify(
        req.body,
        req.headers as Record<string, string>
      );
      if (wh.eventType === "user.created") {
        const payload = wh.data;
        console.log(payload);
      }
      res.status(204).end();
    } catch (e) {
      if (e) return res.status(400).end();
      res.status(500).end();
    }
  }
);

export { testingEndpoint };
