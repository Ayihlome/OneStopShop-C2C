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
  const paymentId = Number(m_payment_id);

  if (!Number.isInteger(paymentId) || paymentId <= 0) {
    return res.status(200).send('ok');
  }

  try {
    await paymentService.updatePaymentFromPayFast(
      paymentId,
      pf_payment_id,
      payment_status
    );
  } catch (error) {
    if (error.status !== 404) {
      throw error;
    }
  }

  // PayFast expects a 200 response once the ITN has been received.
  return res.status(200).send('ok');
}

async function getPaymentStatus(req, res) {
  const data = await paymentService.getPaymentStatus(
    Number(req.params.bookingId),
    req.user
  );
  return res.status(200).json({ data });
}

async function paymentCancel(req, res) {
  const data = await paymentService.cancelPendingPayment(
    Number(req.params.bookingId),
    req.user
  );
  return res.status(200).json({ data });
}

async function paymentSuccess(req, res) {
  const data = await paymentService.getPaymentStatus(
    Number(req.params.bookingId),
    req.user
  );
  return res.status(200).json({ data });
}

module.exports = {
  initiatePayment,
  itnCallback,
  getPaymentStatus,
  paymentCancel,
  paymentSuccess,
};
