import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  // Recoge parámetros de la query: por ejemplo, texto, color y tamaño
  const text = req.query.text || 'Hola, soy Nacho';
  const color = req.query.color || '#ff0055';
  const size = req.query.size || '40';
  
  // Genera el SVG con la animación personalizada
  const svg = `
  <svg width="600" height="150" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bounce {
        animation: bounce 1.5s ease-in-out infinite;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    </style>
    <text x="20" y="80" font-size="${size}" fill="${color}" class="bounce">
      ${text}
    </text>
  </svg>
  `;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
