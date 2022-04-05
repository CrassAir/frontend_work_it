const actualUrl = {
    'test': {hostname: '192.168.252.191', port: '9009', protocol: 'http:', ws: 'ws'},
    'main': {
        hostname: window.location.hostname,
        port: window.location.port,
        protocol: window.location.protocol,
        ws: 'wss'
    },
}

const server = window.location.port === '3000' ? 'test' : 'main'

export function getHostname() {
    const {hostname, port, protocol} = actualUrl[server]
    return `${protocol}//${hostname}${port ? ':' + port : ''}`
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

export function getWsLiveDataUrl() {
    const {hostname, port, ws} = actualUrl[server]
    return `${ws}://${hostname}${port ? ':' + port : ''}/liveData`;
}