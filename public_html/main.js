/* ============================================================
   REVESTIMIENTOS ARQUITECTÓNICOS — JavaScript principal
   ============================================================ */

/* ---- CONFIG API ---- */
// Cambia esta URL cuando subas el backend al VPS:
// const API_BASE = 'http://161.97.175.65:8080';
const API_BASE = 'http://161.97.175.65:9090';

/* ---- Imágenes por categoría (fallback sin API key) ---- */
const imagenesCategoria = {
  'Microcemento':       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'Concreto Estampado': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  'Granalla':           'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
  'Pisos':              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'Epóxicos':           'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=800&q=80',
  'Aditivos':           'https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=800&q=80',
};

const imagenesFallback = [
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
  'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
  'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=800&q=80',
];

function getImagen(producto, index) {
  if (producto.imagenUrl) return producto.imagenUrl;
  return imagenesCategoria[producto.categoria] || imagenesFallback[index % imagenesFallback.length];
}

function formatPrecio(p) {
  if (!p) return 'Consultar precio';
  return 'S/ ' + parseFloat(p).toLocaleString('es-PE', { minimumFractionDigits: 2 });
}

/* ---- Render de productos ---- */
function renderProductos(productos) {
  const grid = document.getElementById('productsGrid');

  if (!productos.length) {
    grid.innerHTML = `<div class="api-error"><span>📦</span>No hay productos disponibles</div>`;
    return;
  }

  const lista = productos.slice(0, 8);

  grid.innerHTML = lista.map((p, i) => {
    const esGrande = i === 0 || i === 4;
    const imgUrl   = getImagen(p, i);
    const precioMostrar = p.enOferta && p.precioOferta
      ? `<span style="text-decoration:line-through;opacity:0.5;margin-right:8px">${formatPrecio(p.precio)}</span>${formatPrecio(p.precioOferta)}`
      : formatPrecio(p.precio);

    return `
      <div class="product-card" style="${esGrande ? 'grid-column:span 2;' : ''}">
        <div class="product-bg" style="background-image:url('${imgUrl}');background-size:cover;background-position:center;"></div>
        <div class="product-texture-overlay"></div>
        ${p.enOferta ? '<div class="oferta-badge">Oferta</div>' : ''}
        <div class="product-overlay">
          <p class="product-tag">${p.categoria}</p>
          <h3 class="product-name">${p.nombre}</h3>
          <p class="product-price">${precioMostrar}</p>
        </div>
        <div class="product-hover-info">
          <button class="product-hover-btn">Ver Detalle</button>
        </div>
      </div>`;
  }).join('');

  // Reaplica hover del cursor a las nuevas cards
  bindCursorHover();
}

/* ---- Carga desde la API ---- */
async function cargarProductos() {
  try {
    const res = await fetch(`${API_BASE}/api/productos`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    renderProductos(await res.json());
  } catch (err) {
    console.warn('API no disponible, usando productos demo:', err.message);
    renderProductos(productosDemo); // <-- aquí carga los productos estáticos
  }
}

/* ---- Formulario de contacto ---- */
function enviarFormulario() {
  const nombre   = document.getElementById('f-nombre').value.trim();
  const email    = document.getElementById('f-email').value.trim();
  const producto = document.getElementById('f-producto').value;

  if (!nombre || !email || !producto) {
    alert('Por favor completa al menos tu nombre, email y el producto de interés.');
    return;
  }

  // Conectar al backend cuando esté listo:
  // fetch(`${API_BASE}/api/contacto`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ nombre, email, producto, ... })
  // });

  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
}

/* ---- Custom cursor ---- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateRing);
})();

function bindCursorHover() {
  document.querySelectorAll('a, button, .valor-item, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; });
  });
}

/* ---- Init ---- */
cargarProductos();
bindCursorHover();