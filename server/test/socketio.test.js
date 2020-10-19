const request = require('supertest')
const app = require('../app')

const io = require('socket.io-client')
const http = require('http')
const ioBack = require('socket.io')

describe('basic socket.io example', () => {
test('should communicate', (done) => {
    // once connected, emit Hello World
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
    // Check that the message matches
    expect(message).toBe('Hello World');
    done();
    });
    ioServer.on('connection', (mySocket) => {
    expect(mySocket).toBeDefined();
    });
});
test('should communicate with waiting for socket.io handshakes', (done) => {
    // Emit sth from Client do Server
    socket.emit('examlpe', 'some messages');
    // Use timeout to wait for socket.io server handshakes
    setTimeout(() => {
    // Put your server side expect() here
    done();
    }, 50);
});
});