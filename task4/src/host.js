function CurrentHost() {
    const host = window.location.protocol + '//' + window.location.host;

    return host =='http://localhost:3000' ? 'http://127.0.0.1:8000/' : window.location.protocol + '//' + window.location.host + '/';
}

export default CurrentHost