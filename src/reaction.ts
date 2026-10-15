import { MatrixEvent } from "../types";
import { postSpacetubeEvent } from "./requests";

async function sendToSpacetube(event: MatrixEvent) {
    const spacetubeResponse = await postSpacetubeEvent(event);
    const spacetubeResult = await spacetubeResponse.json();

    return spacetubeResult;
}

export default function handleReaction(event: MatrixEvent) {
    const reactionInfo = event.content["m.relates_to"];
    const eventFromReaction = event.prevEvent;

    const reactionEmoji = reactionInfo.key.trim();

    if (reactionEmoji.includes("🛸")) {
        return sendToSpacetube(eventFromReaction);
    }

    return;
}