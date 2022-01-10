// getting the user, fetch('localhost:8000/users')
const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    // reading static file from lasova-back/mock-data.json
    fs.readFile('mock-data.json', (err, data) => {
        if (err) {
            res.status(500).json({err: 'Server Error'});
        } else {
            let student = JSON.parse(data);
            res.json(student)
        }
    });
})

module.exports = router;