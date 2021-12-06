// const localAddresses = ["localhost", "127.0.0.1"];
// const productionPorts = ["", "80", "443"];

export function getHostname() {
    // const { protocol, hostname, port } = window.location;
    const { protocol } = window.location;
    // const hostname = '192.168.252.198'
    const hostname = 'test.ecoferma56.ru'
    // const port = "9009";
    const port = "";
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