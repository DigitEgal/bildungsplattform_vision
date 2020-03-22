const express = require('express');
const router = express.Router();

const knex = require('../../helper/db/Knex');

const roomTbl = 'rooms';
const roomMsgTbl = 'room_messages';
const roomTrackTbl = 'track_to_room';
const trackTbl = 'tracks';

router.get('/', (req, res) => {
    knex(roomTbl)
    .select(`${roomTbl}.ID`, `${roomTbl}.Name`, `${roomTbl}.Description`, 
            `${roomTbl}.CreatedAt`, `${roomTbl}.IsPrivate`
    )
    .then(result => {
        if(result && result.length > 0) {
            res.status(200).json(result);
        }
        else res.status(200).json({ error: 'Entry not found' });
    })
    .catch(err => res.status(200).json({ error: err.sqlMessage }));
})

router.get('/:id', (req, res) => {
    knex(roomTbl)
    .select(`${roomTbl}.ID`, `${roomTbl}.Name`, `${roomTbl}.Description`, 
            `${roomTbl}.CreatedAt`, `${roomTbl}.IsPrivate`
    )
    .where('ID', req.params.id)
    .then(result => {
        if(result && result.length > 0) {
            res.status(200).json(result);
        }
        else res.status(200).json({ error: 'Entry not found' });
    })
    .catch(err => res.status(200).json({ error: err.sqlMessage }));
})

router.get('/:id/messages', (req, res) => {
    knex(roomMsgTbl)
    .select(`${roomMsgTbl}.ID`, `${roomMsgTbl}.Message`, `${roomMsgTbl}.CreatedAt`, 
            `${roomMsgTbl}.UpdatedAt`, `${roomMsgTbl}.Likes`, `${roomMsgTbl}.AuthorID`,
            `${roomMsgTbl}.ParentMessageID`,  `${roomMsgTbl}.IsPinned`
    )
    .where('RoomID', req.params.id)
    .then(result => {
        if(result && result.length > 0) {
            res.status(200).json(result);
        }
        else res.status(200).json({ error: 'Entry not found' });
    })
    .catch(err => res.status(200).json({ error: err.sqlMessage }));
})

router.get('/:id/tracks', (req, res) => {
    knex(roomTrackTbl)
    .select(`${roomTrackTbl}.TrackID`, `${roomTrackTbl}.Subject`, `${roomTrackTbl}.IsPinned`, 
            `${roomTrackTbl}.PinnedAt`, `${trackTbl}.Name`, `${trackTbl}.Description`
    )
    .leftJoin(trackTbl, `${roomTrackTbl}.TrackID`, `${trackTbl}.ID`)
    .where('RoomID', req.params.id)
    .then(result => {
        if(result && result.length > 0) {
            res.status(200).json(result);
        }
        else res.status(200).json({ error: 'Entry not found' });
    })
    .catch(err => res.status(200).json({ error: err.sqlMessage }));
})

module.exports = router;