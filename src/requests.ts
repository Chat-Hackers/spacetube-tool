import { MatrixEvent } from "../types";
import { moduleRegistration, returnPath } from "./index";

const { spacetube_url, dashboard_url, spacetube_secret } = process.env;

const baseUrl = dashboard_url?.includes("localhost") ? `http://${dashboard_url}` : `https://${dashboard_url}`;

export function postSpacetubeEvent(event: MatrixEvent) {
    const origin = `${baseUrl}/${moduleRegistration.id}/${returnPath}`;

    return fetch(`${spacetube_url}/chathackers`, {
        method: "POST",
        body: JSON.stringify({
            ...event,
            origin
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

export async function getConnection(roomId: string) {
    const origin = `${baseUrl}/${moduleRegistration.id}/${returnPath}`;

    return fetch(`${spacetube_url}/chathackers/setup?roomId=${roomId}&origin=${origin}`)
}

export async function deleteConnection(roomId: string) {
    const origin = `${baseUrl}/${moduleRegistration.id}/${returnPath}`;

    return fetch(`${spacetube_url}/chathackers/setup`, {
        method: "DELETE",
        body: JSON.stringify({
            roomId,
            origin
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}