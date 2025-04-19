// routes/reportRoutes.js

import express from 'express';
import Report from '../models/Report.js';

const router = express.Router();

// Submit report
router.post('/report', async (req, res) => {
  try {
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = req.body;

    const newReport = new Report({ ngoId, month, peopleHelped, eventsConducted, fundsUtilized });
    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully!' });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
