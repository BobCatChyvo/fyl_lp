import { Product } from '@/types';

export const productsDB: Product[] = [
  {
    id: 'p1',
    slug: 'tarta-fresa-lavanda',
    name: 'Tarta Signature Fresa & Lavanda',
    description: 'Nuestra especialidad. Un suave bizcocho empapado con infusión de lavanda fresca y un corazón de mermelada rústica de fresas.',
    price: 45.00,
    category: 'pasteles',
    imageUrl: '/images/tarta-signature.png',
    isFeatured: true,
    allergens: ['Gluten', 'Lácteos', 'Huevo']
  },
  {
    id: 'p2',
    slug: 'croissant-mantequilla',
    name: 'Croissant Clásico de Mantequilla',
    description: 'Dorado, crujiente por fuera y una nube por dentro. Horneado directamente cada mañana para asegurar frescura.',
    price: 3.50,
    category: 'bolleria',
    imageUrl: '/images/croissant.png',
    isFeatured: true,
    allergens: ['Gluten', 'Lácteos']
  },
  {
    id: 'p3',
    slug: 'macarons-frutos-rojos',
    name: 'Caja de Macarons de Frutos Rojos',
    description: 'Elegante estuche de 6 macarons franceses rellenos de ganache intenso de frambuesa, mora y cereza.' ,
    price: 15.00,
    category: 'postres',
    imageUrl: '/images/macarons.png',
    isFeatured: false,
    allergens: ['Almendras', 'Lácteos', 'Huevo']
  },
  {
    id: 'p4',
    slug: 'taza-de-cafe-especialidad',
    name: 'Café de Especialidad (Grano)',
    description: 'Bolsa de 250g con notas a chocolate oscuro y avellanas. Tostado ligero ideal para espresso o prensa francesa.',
    price: 18.00,
    category: 'cafe',
    imageUrl: '/images/cafe.png',
    isFeatured: true,
  },
  {
    id: 'p5',
    slug: 'pastel-deseo-fugaz',
    name: 'Pastel Deseo Fugaz',
    description: 'Un lienzo de azúcar que se desvanece ante el fuego para revelar un mensaje dulce y eterno. Ideal para revelaciones y momentos mágicos.',
    price: 45.00,
    category: 'pasteles',
    imageUrl: '/images/hbdquemado.png',
    isFeatured: true,
    allergens: ['Lácteos', 'Gluten', 'Huevo']
  },
  {
    id: 'p6',
    slug: 'sinfonia-de-pistacho',
    name: 'Sinfonía de Pistacho',
    description: 'Texturas de seda con el toque vibrante del limón y la tierra fértil de los mejores pistachos.',
    price: 38.00,
    category: 'pasteles',
    imageUrl: '/images/pistachocitrico.png',
    isFeatured: true,
    allergens: ['Lácteos', 'Gluten', 'Frutos Secos (Pistacho)']
  }
];
