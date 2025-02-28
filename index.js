import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const font = req.query.font || 'Oswald';
  const linesParam = req.query.lines || "Hi, I'm Nacho;Junior programmer;Full Stack Developer;Always learning";
  const lines = linesParam.split(';');
  const height = req.query.height || '150'; // Altura por defecto si no se especifica
  const color = req.query.color || '#ff0055';
  const size = req.query.size || '40';
  // Extrae el marginTop desde la query. Por defecto, -20 (se asume en px)
  const marginTop = req.query.marginTop || '-20';

  // Genera el SVG con la animación personalizada
  const svg = `<svg width="600" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .text {
        font-size: ${size}px;
        fill: ${color};
        text-anchor: middle;
        font-family: ${font}, sans-serif;
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
    <!-- Grupo con transform para aplicar margin-top -->
    <g transform="translate(0, ${marginTop})">
      ${lines.map((line, index) => 
        `<text x="50%" y="50%" dy="${index * 1.2}em" class="text line">${line}</text>`
      ).join('\n')}
    </g>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
