import { MatrixEvent } from "../types";

const { spacetube_url, dashboard_url } = process.env;

export function postSpacetubeEvent(event: MatrixEvent) {
    return fetch(`${spacetube_url}/chathackers`, {
        method: "POST",
        body: JSON.stringify({
            ...event,
            origin: `${dashboard_url}/spacetube/api`
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}