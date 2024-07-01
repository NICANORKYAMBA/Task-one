const url = require('url');
const getWeather = require('./weather');
const getClientIp = require('./getClientIp');
const getApproximateLocationFromIp = require('./getLocationFromIp');

const getVisitorInfo = async (req) => {
    const parseUrl = url.parse(req.url, true);
    const visitorName = parseUrl.query.visitor_name;
    // const clientIp = '85.25.43.84';
    let client_ip = getClientIp(req);
    let location = 'New York';

    try {
        if (client_ip === '::1' || client_ip === '127.0.0.1') {
            client_ip = '127.0.0.1';
            location = 'New York';
        } else {
            location = await getApproximateLocationFromIp(client_ip);
        }
        // const visitorLocation = await getApproximateLocationFromIp(clientIp);
        // const visitorLocation = 'New York';
        const visitorTemperature = await getWeather(location);

        return {
            client_ip,
            location,
            greeting: `Hello, ${visitorName}!, the temperature is ${visitorTemperature} degrees Celcius in ${location}`,
        };
    } catch (error) {
        throw new Error(`Failed to get visitor info: ${error.message}`);
    }
};

module.exports = getVisitorInfo;