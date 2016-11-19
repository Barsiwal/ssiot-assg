var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var device = awsIot.device({
	keyPath: './certs/private.pem.key',
	certPath: './certs/certificate.pem.crt',
	caPath: './certs/root-CA.crt',
	clientId: 'temp',
	host: 'a1of4clhgh9afs.iot.us-west-2.amazonaws.com',
	port: 8883
	//region: 'eu-west-1'
});
//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
.on('connect', function() {
	console.log('connected');
	device.subscribe('topic_1');
	device.publish('topic_2', JSON.stringify({ test_data: 'BC'}));
});

device
.on('message', function(topic, payload) {
	console.log('message', topic, payload.toString());
});
