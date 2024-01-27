const {Kafka} =  require('kafkajs');

exports.kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['localhost:9092'],
});