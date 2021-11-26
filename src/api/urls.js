// const localAddresses = ["localhost", "127.0.0.1"];
// const productionPorts = ["", "80", "443"];

export function getHostname() {
    // const { protocol, hostname, port } = window.location;
    const { protocol, hostname } = window.location;
    const port = "9009";
    // return hostname + port;
    return protocol+'//'+hostname+(port ? ':'+port : '');
}

export function getApiUrl() {
    return `${getHostname()}/api/`;
}

// export function getFileUrl() {
//     return `http://${getHostname()}/`;
// }

export function getRestAuthUrl() {
    return `${getHostname()}/rest-auth/`;
}

// export function getWsChatUrl() {
//     return `ws://${getHostname()}/chat`;
// }
//
export function getWsLiveDataUrl() {
    const { hostname } = window.location;
    return `wss://${hostname}/liveData`;
}