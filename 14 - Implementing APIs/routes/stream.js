const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
});

router.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("range is required");
    }

    const videoPath = path.join(__dirname, "../public/videos/Anime.mp4");
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6; // 1 MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

module.exports = router;