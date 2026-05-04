export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Campo messages obrigatorio' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave de API nao configurada' });
  }

  try {
    const contents = [
      { role: 'user', parts: [{ text: 'Voce e MITA, uma IA inteligente e tecnica. Responda sempre em portugues do Brasil.' }] },
      { role: 'model', parts: [{ text: 'Entendido! Sou MITA, pronta para ajudar.' }] },
      ...messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'Erro na API' });
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno: ' + err.message });
  }
}
