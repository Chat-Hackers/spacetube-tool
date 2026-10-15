import express from "express";
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import handleReaction from "./reaction";
import { sendMessage } from "./requests";

export const returnPath = "api";

const port = 5054;

export const moduleRegistration = {
  id: "spacetube",
  uuid: uuidv4(),
  url: `http://localhost:${port}`,
  emoji: "🛸",
  introduction: "React to a message with 🛸 to set up a connection to another chat",
  title: "Spacetube Chat Connection",
  description: "Forwards messages to chats in far away galaxies",
  event_types: [
    "m.reaction"
  ]
}

function generateRegistrationFile() {
  fs.writeFileSync(`./${moduleRegistration.id}.json`, JSON.stringify(moduleRegistration, null, 2));
}

async function start() {
  const app = express();
  app.use(express.json());

  app.get("/", async (req, res) => {
    const htmlPath = path.resolve(__dirname, "../../web/dist/index.html")

    res.sendFile(htmlPath);
  })

  app.post("/", async (req, res) => {
    const { event } = req.body;

    console.log("event received", event)
    let response;

    if (event.type === "m.reaction") {
      response = await handleReaction(event);
    }

    console.log("response", response);

    res.send({ success: true, response });
  });

  app.get(`/${returnPath}`, async (req, res) => {
    const { roomId } = req.query;

    res.send({ success: true });
  })

  app.post(`/${returnPath}`, async (req, res) => {
    const { roomId } = req.query;
    const { message, name } = req.body;

    sendMessage(roomId as string, `🛸${name}🛸 ${message}`);

    res.send({ success: true });
  })

  app.listen(port);
};

generateRegistrationFile();
start();
