import { MatrixEvent } from "../types";
import { moduleRegistration, returnPath } from "./index";

const { spacetube_url, dashboard_url, spacetube_secret } = process.env;

const baseUrl = dashboard_url?.includes("localhost") ? `http://${dashboard_url}` : `https://${dashboard_url}`;

export function postSpacetubeEvent(event: MatrixEvent) {
    return fetch(`${spacetube_url}/chathackers`, {
        method: "POST",
        body: JSON.stringify({
            ...event,
            origin: `${baseUrl}/${moduleRegistration.id}${returnPath}`
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}

export async function sendMessage(roomId: string, message: string) {
    return fetch(`${baseUrl}/api/send?roomId=${roomId}&toolId=spacetube&secret=${spacetube_secret}`, {
        method: "POST",
        body: JSON.stringify({
            message
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}