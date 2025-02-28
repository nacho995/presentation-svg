import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  // Recoge parámetros de la query: lines, color y size
  const linesParam = req.query.lines || 'Hola, soy Nacho;Full Stack Developer;Siempre aprendiendo';
  // Separa las líneas usando ';'
  const lines = linesParam.split(';');
  const color = req.query.color || '#3133EE';
  const size = req.query.size || '40';

  // Genera el SVG con la animación personalizada
  const svg = `<svg width="600" height="450" xmlns="http://www.w3.org/2000/svg">
    <style>
      .text {
        font-size: ${size}px;
        fill: ${color};
        text-anchor: middle;
      }
      .line {
        opacity: 0;
        animation: fade 9s infinite;
      }
      ${lines.map((_, index) => 
        `.line:nth-of-type(${index + 1}) {
          animation-delay: ${index * 3}s;
        }`
      ).join('\n')}
      @keyframes fade {
        0% { opacity: 0; }
        10% { opacity: 1; }
        33.33% { opacity: 1; }
        43.33% { opacity: 0; }
        100% { opacity: 0; }
      }
    </style>
    ${lines.map((line, index) => 
      `<text x="50%" y="50%" dy="${index * 1.2}em" class="text line">${line}</text>`
    ).join('\n')}
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
