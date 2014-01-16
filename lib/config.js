// Product Configuration

exports.product = {
    name: 'HapiJS Mongoose MongoDB Test'
};


// Server Configuration

exports.server = {
    web: {
        host: 'localhost',
        port: 8080
    },
    api: {
        host: 'localhost',
        port: 8081
    }
};

exports.server.web.uri = (exports.server.web.tls ? 'https://' : 'http://') + exports.server.web.host + ':' + exports.server.web.port;
exports.server.api.uri = (exports.server.api.tls ? 'https://' : 'http://') + exports.server.api.host + ':' + exports.server.api.port;


// Database Configuration

exports.database = {
    host: '127.0.0.1',
    port: 27017,
    db: 'products'
};
