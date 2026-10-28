import "dotenv/config";
import express from "express";
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import handleReaction from "./reaction";
import { deleteConnection, getConnection, sendMessage } from "./requests";

export const returnPath = "api";

const port = 5054;
const { spacetube_secret } = process.env;

export const moduleRegistration = {
  id: "spacetube",
  uuid: uuidv4(),
  url: `http://localhost:${port}`,
  emoji: "🛸",
  introduction: "React to a message with 🛸 to set up a connection to another chat",
  secret: spacetube_secret,
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
    const { roomId, message, name } = req.body;

    const sendResponse = await sendMessage(roomId as string, `🛸${name}🛸 ${message}`);
    const sendResult = await sendResponse.json();

    console.log(sendResult);

    res.send({ success: true });
  })

  app.get("/api", async (req, res) => {
    const { roomId } = req.query;

    console.log("connection requested for ", roomId)

    const connectionResponse = await getConnection(roomId as string);
    const connection = await connectionResponse.json();

    console.log("connection", connection)

    res.send({ sucess: true, connection });
  })

  app.delete("/api", async (req, res) => {
    const { roomId } = req.query;

    const deleteResponse = await deleteConnection(roomId as string);
    const deletion = await deleteResponse.json();

    res.send({ success: true, deletion });
  })

  app.listen(port);
};

generateRegistrationFile();
start();
