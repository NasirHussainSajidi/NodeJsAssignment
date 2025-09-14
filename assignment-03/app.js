const API = '/api/products';

const $ = (sel) => document.querySelector(sel);
const form = $('#product-form');
const idInput = $('#product-id');
const titleInput = $('#title');
const priceInput = $('#price');
const categoryInput = $('#category');
const descInput = $('#description');
const saveBtn = $('#save-btn');
const resetBtn = $('#reset-btn');
const formTitle = $('#form-title');
const tbody = $('#products-body');
const searchInput = $('#search');

let all = [];

// -------- Helpers --------
function rowTemplate(p) {
  return `
    <tr>
      <td>${p.id}</td>
      <td>${escapeHtml(p.title)}</td>
      <td>$${Number(p.price).toFixed(2)}</td>
      <td><span class="badge">${escapeHtml(p.category || '')}</span></td>
      <td>${escapeHtml(p.description || '')}</td>
      <td class="right">
        <button class="btn warn" data-edit="${p.id}">Edit</button>
        <button class="btn danger" data-del="${p.id}">Delete</button>
      </td>
    </tr>
  `;
}
function render(list = all) {
  tbody.innerHTML = list.map(rowTemplate).join('');
}
function escapeHtml(s='') {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function clearForm() {
  idInput.value = '';
  titleInput.value = '';
  priceInput.value = '';
  categoryInput.value = '';
  descInput.value = '';
  formTitle.textContent = 'Add New Product';
  saveBtn.textContent = 'Save';
}

// -------- API Calls --------
async function fetchAll() {
  const res = await fetch(API);
  all = await res.json();
  render(all);
}

async function createProduct(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

async function updateProduct(id, data) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

async function deleteProduct(id) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}

// -------- Events --------
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    title: titleInput.value.trim(),
    price: priceInput.value,
    category: categoryInput.value.trim(),
    description: descInput.value.trim()
  };
  if (!payload.title || payload.price === '') {
    alert('Title and Price are required');
    return;
  }

  try {
    if (idInput.value) {
      // update
      const id = Number(idInput.value);
      await updateProduct(id, payload);
    } else {
      // create
      await createProduct(payload);
    }
    await fetchAll();
    clearForm();
  } catch (err) {
    alert(err.message);
  }
});

resetBtn.addEventListener('click', () => clearForm());

tbody.addEventListener('click', async (e) => {
  const editId = e.target.getAttribute('data-edit');
  const delId = e.target.getAttribute('data-del');

  if (editId) {
    const prod = all.find(p => p.id === Number(editId));
    if (!prod) return;
    idInput.value = prod.id;
    titleInput.value = prod.title;
    priceInput.value = prod.price;
    categoryInput.value = prod.category || '';
    descInput.value = prod.description || '';
    formTitle.textContent = `Edit Product #${prod.id}`;
    saveBtn.textContent = 'Update';
  }

  if (delId) {
    if (!confirm(`Delete product #${delId}?`)) return;
    try {
      await deleteProduct(Number(delId));
      await fetchAll();
      if (idInput.value === delId) clearForm();
    } catch (err) {
      alert(err.message);
    }
  }
});

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) return render(all);
  const filtered = all.filter(p =>
    (p.title || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q)
  );
  render(filtered);
});

// Init
fetchAll().catch(() => alert('API not reachable. Did you start the server?'));


