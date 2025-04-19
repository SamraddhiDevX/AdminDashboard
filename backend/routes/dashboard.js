import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import Report from '../models/Report.js';

const router = express.Router();

router.get('/data', protectRoute, async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: 'Month is required in YYYY-MM format' });
  }

  try {
    const reports = await Report.find({ month });

    const totalNGOs = new Set(reports.map((r) => r.ngoId)).size;
    const totalPeopleHelped = reports.reduce((sum, r) => sum + r.peopleHelped, 0);
    const totalEventsConducted = reports.reduce((sum, r) => sum + r.eventsConducted, 0);
    const totalFundsUtilized = reports.reduce((sum, r) => sum + r.fundsUtilized, 0);

    const distribution = {
      peopleHelped: reports.map((r) => ({
        name: r.ngoId,
        value: r.peopleHelped,
      })),
      eventsConducted: reports.map((r) => ({
        name: r.ngoId,
        value: r.eventsConducted,
      })),
      fundsUtilized: reports.map((r) => ({
        name: r.ngoId,
        value: r.fundsUtilized,
      })),
    };

    res.status(200).json({
      totals: {
        totalNGOs,
        totalPeopleHelped,
        totalEventsConducted,
        totalFundsUtilized,
      },
      distribution,
    });
  } catch (error) {
    console.error('Dashboard data error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
