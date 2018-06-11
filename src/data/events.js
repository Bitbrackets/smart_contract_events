/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventMetaDataSchema = new Schema({
    sourceId : {
        type: String,
        required: [true, 'sourceId must be valid'],
    },
    sourceSystem : {
        type: String,
        required: [true, 'sourceSystem must be valid'],
    },
    eventSequenceId : {
        type: String,
        required: [true, 'eventSequenceId must be valid'],
    },
    blockNumber: {
        type: Number, default: 0, 
    },
    sourceTimestampCreation: {
        type: Date, default: Date.now,
    },
    eventWorkerId: {
        type: String,
        required: [true, 'eventWorkerId must be valid'],
    },
    version: {
        type: Number,
        default: 1,
    },
    notes:  Schema.Types.Mixed
},{ _id : false });

const EventSchema = new Schema({
    eventId: {
        type: String,
        required: [true, 'EventId is Required'],
    },
    eventType: {
        type: String,
        required: [true, 'Event Type is Required'],
    },
    createdAt: { type: Date, default: Date.now },
    blockNumber: { type: Number, default: 0 },
    data: {
        meta: EventMetaDataSchema,
        payload: Schema.Types.Mixed,
    },
});

const Events = mongoose.model('Events', EventSchema);

module.exports = Events;
