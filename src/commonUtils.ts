export function getServerUrl():string {
    const url = import.meta.env.VITE_SERVERHOST;
    const port = import.meta.env.VITE_SERVERPORT;
    return `${url}:${port}`;
}