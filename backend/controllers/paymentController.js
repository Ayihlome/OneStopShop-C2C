const paymentService = require('../services/paymentService');

async function initiatePayment(req, res) {
  const data = await paymentService.initiateSandboxPayment(
    Number(req.params.bookingId),
    req.user.id
  );
  return res.status(201).json({ data, message: 'Success' });
}

// PayFast calls this endpoint directly via ITN — no auth header
async function itnCallback(req, res) {
  const { payment_status, m_payment_id, pf_payment_id } = req.body;

  if (payment_status !== 'COMPLETE') {
    // PayFast expects a 200 even on non-completion to acknowledge receipt
    return res.status(200).send('ok');
  }

  await paymentService.confirmPayment(Number(m_payment_id), pf_payment_id);
  return res.status(200).send('ok');
}

async function getPaymentStatus(req, res) {
  const data = await paymentService.getPaymentStatus(
    Number(req.params.bookingId),
    req.user.id
  );
  return res.status(200).json({ data });
}

module.exports = { initiatePayment, itnCallback, getPaymentStatus };
