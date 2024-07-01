const url = require('url');
const getWeather = require('./weather');
const getClientIp = require('./getClientIp');
const getApproximateLocationFromIp = require('./getLocationFromIp');

const getVisitorInfo = async (req) => {
    const parseUrl = url.parse(req.url, true);
    const visitorName = parseUrl.query.visitor_name;
    // const clientIp = '85.25.43.84';
    const clientIp = getClientIp(req);

    try {
        const visitorLocation = await getApproximateLocationFromIp(clientIp);
        // const visitorLocation = 'New York';
        const visitorTemperature = await getWeather(visitorLocation);

        return {
            clientIp,
            visitorLocation,
            greeting: `Hello, ${visitorName}!, the temperature is ${visitorTemperature} degrees Celcius in ${visitorLocation}.`
        };
    } catch (error) {
        throw new Error(`Failed to get visitor info: ${error.message}`);
    }
};

module.exports = getVisitorInfo;