exports.home = function (request, reply) {
    return reply.view('index').code(200);
};