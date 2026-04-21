import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getUssdMenu, sendSmsMock } from '../services/telecomService.js';

const router = Router();

router.post('/sms', authenticate, async (req, res) => {
  const { phoneNumber, message } = req.body;
  const result = await sendSmsMock({ phoneNumber, message });
  return res.json(result);
});

router.get('/ussd', (req, res) => {
  const session = String(req.query.session || 'root');
  return res.json(getUssdMenu(session));
});

export default router;
