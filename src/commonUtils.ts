export function getServerUrl():string {
    const url = import.meta.env.VITE_SERVERHOST;
    const port = import.meta.env.VITE_SERVERPORT;
    console.log(url, port);
    return `${url}:${port}`;
}