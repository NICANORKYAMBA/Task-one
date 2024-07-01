const url = require('url');
const getWeather = require('./weather');
const getClientIp = require('./getClientIp');
const getApproximateLocationFromIp = require('./getLocationFromIp');

const getVisitorInfo = async (req) => {
    const parseUrl = url.parse(req.url, true);
    const visitorName = parseUrl.query.visitor_name;
    let client_ip = getClientIp(req);
    let location = '';

    try {
        if (client_ip === '::1' || client_ip === '127.0.0.1') {
            client_ip = '127.0.0.1';
            location = 'New York';
        } else {
            const locationInfo = await getApproximateLocationFromIp(client_ip);
            if (locationInfo && locationInfo.city && locationInfo.city.names && locationInfo.city.names.en) {
                location = locationInfo.city.names.en;
            } else {
                location = 'New York'; // Fallback location
            }
        }

        const visitorTemperature = await getWeather(location);

        return {
            client_ip,
            location,
            greeting: `Hello, ${visitorName}! The temperature is ${visitorTemperature} degrees Celsius in ${location}`,
        };
    } catch (error) {
        throw new Error(`Failed to get visitor info: ${error.message}`);
    }
};

module.exports = getVisitorInfo;