// Orígenes cafeteros — coordenadas con proyección equirectangular:
//   x = (lon + 180) / 360 * 1000
//   y = (90  - lat) / 180 * 500
export const origenes = [
  {
    id: 'etiopia', pais: 'Etiopía', region: 'África Oriental',
    x: 611, y: 228,
    altitud: '1.500 – 2.200 m', proceso: 'Natural · Lavado',
    notas: ['Jazmín', 'Frutos rojos', 'Bergamota'],
    desc: 'Cuna del café. Los granos etíopes tienen una complejidad floral y frutal única — resultado de miles de años de selección natural.',
  },
  {
    id: 'kenya', pais: 'Kenia', region: 'África Oriental',
    x: 603, y: 253,
    altitud: '1.400 – 2.000 m', proceso: 'Lavado doble',
    notas: ['Grosella negra', 'Tomate', 'Cítrico'],
    desc: 'Famoso por su acidez brillante tipo vino tinto y cuerpo denso. La variedad SL-28 es su sello distintivo.',
  },
  {
    id: 'yemen', pais: 'Yemen', region: 'Península Arábiga',
    x: 633, y: 208,
    altitud: '1.500 – 2.500 m', proceso: 'Natural antiguo',
    notas: ['Chocolate oscuro', 'Especias', 'Fruta seca'],
    desc: 'El primer café comercializado en el mundo. El puerto de Moka le dio nombre al mocha. Proceso natural antiquísimo.',
  },
  {
    id: 'colombia', pais: 'Colombia', region: 'América del Sur',
    x: 292, y: 236,
    altitud: '1.200 – 2.000 m', proceso: 'Lavado',
    notas: ['Caramelo', 'Fruta roja', 'Nuez'],
    desc: 'Perfil suave y equilibrado. La montaña y el microclima hacen de Colombia uno de los grandes orígenes del mundo.',
  },
  {
    id: 'brasil', pais: 'Brasil', region: 'América del Sur',
    x: 356, y: 292,
    altitud: '800 – 1.400 m', proceso: 'Natural · Honey',
    notas: ['Chocolate', 'Nuez', 'Caramelo'],
    desc: 'El mayor productor mundial. Cafés naturales dulces, con cuerpo alto y bajo en acidez. Base perfecta para blends.',
  },
  {
    id: 'guatemala', pais: 'Guatemala', region: 'Centroamérica',
    x: 247, y: 208,
    altitud: '1.300 – 2.000 m', proceso: 'Lavado',
    notas: ['Chocolate amargo', 'Cítrico', 'Floral'],
    desc: 'El suelo volcánico y las noches frías de los altiplanos guatemaltecos dan acidez brillante y gran complejidad.',
  },
  {
    id: 'peru', pais: 'Perú', region: 'América del Sur',
    x: 289, y: 283,
    altitud: '1.400 – 2.200 m', proceso: 'Lavado',
    notas: ['Dulce', 'Fruta tropical', 'Chocolate suave'],
    desc: 'Café orgánico y de comercio justo por excelencia. Cajamarca y San Martín producen granos limpios y delicados.',
  },
  {
    id: 'indonesia', pais: 'Indonesia', region: 'Asia Oriental',
    x: 800, y: 269,
    altitud: '800 – 1.500 m', proceso: 'Wet-hulled',
    notas: ['Tierra', 'Madera', 'Especias'],
    desc: 'Sumatra y Java son sus sedes. El proceso wet-hulled crea un perfil terroso y de baja acidez muy particular al paladar.',
  },
]
