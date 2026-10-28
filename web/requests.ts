const { origin, pathname } = window.location;
const BASE_URL = `${origin}${pathname}`;

export function getConnection(roomId: string) {
    return fetch(`${BASE_URL}/spacetube/api?roomId=${roomId}`);
}

export function deleteConnection(roomId: string) {
    return fetch(`${BASE_URL}/spacetube/api?roomId=${roomId}`, {
        method: "DELETE"
    })
}