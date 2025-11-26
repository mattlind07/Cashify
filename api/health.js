
export default function handler(req, res) {
    res.status(200).json({
      ok: true,
      message: 'Serverless functions operational',
      time: new Date().toISOString(),
    });
  }
  