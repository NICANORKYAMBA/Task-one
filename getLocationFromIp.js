const { WebServiceClient } = require('@maxmind/geoip2-node');

const accountId = 1032814;
const licenseKey = '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';

const getApproximateLocationFromIp = async (ip) => {
    const client = new WebServiceClient(accountId, licenseKey, {
        host: 'geolite.info',
    });

    try {
        const response = await client.city(ip);
        return response;
    } catch (error) {
        throw new Error(`Failed to get location from IP: ${error.message}`);
    }
}

module.exports = getApproximateLocationFromIp;