const { origin, pathname } = window.location;
const BASE_URL = `${origin}${pathname}`;

export function getConnection(roomId: string) {
    return fetch(`${BASE_URL}/api/connection?roomId=${roomId}`);
}

export function deleteConnection(roomId: string) {
    return fetch(`${BASE_URL}/api/connection?roomId=${roomId}`, {
        method: "DELETE"
    })
}