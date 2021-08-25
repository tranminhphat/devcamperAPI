import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
	res.status(200).json({ success: true, message: 'Show all bootcamps' });
});

router.get('/:id', (req, res) => {
	res
		.status(200)
		.json({ success: true, message: `Show bootcamp ${req.params.id}` });
});

router.post('/', (_, res) => {
	res.status(200).json({ success: true, message: 'Create new bootcamp' });
});

router.put('/:id', (req, res) => {
	res
		.status(200)
		.json({ success: true, message: `Update bootcamp ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
	res
		.status(200)
		.json({ success: true, message: `Delete bootcamp ${req.params.id}` });
});

export default router;
