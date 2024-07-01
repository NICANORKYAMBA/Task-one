const http = require('http');

const apikey = 'ff3e880974ca4ba5bd681904240107';

const getWeather = async (city) => {
    const base = 'http://api.weatherapi.com/v1/current.json';
    const query = `?key=${apikey}&q=${city}`;
    
    const url = base + query;
    
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            let data = '';
            
            // A chunk of data has been received.
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            // The whole response has been received.
            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    if (response.statusCode === 200) {
                        resolve(parsedData.current.temp_c);
                    } else {
                        reject(new Error(parsedData.error.message));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = getWeather;