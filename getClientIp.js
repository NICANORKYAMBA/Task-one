const getClientIp = (req) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || null;
    if (ip && ip.includes(',')) {
        ip = ip.split(',')[0];
    }
    if (ip && ip.startsWith('::ffff:')) {
        ip = ip.substr(7);
    }
    return ip;
}

module.exports = getClientIp;