// const localAddresses = ["localhost", "127.0.0.1"];
// const productionPorts = ["", "80", "443"];
const hostname = '192.168.252.198'
const port = "9009";


export function getHostname() {
    // const { protocol, hostname, port } = window.location;
    const {protocol} = window.location;
    return protocol + '//' + hostname + (port ? ':' + port : '');
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

export function getWsChatUrl() {
    return `ws://${hostname}:${port}/liveData`;
}

export function getWsLiveDataUrl() {
    const {hostname} = window.location;
    return `wss://${hostname}/liveData`;
}