function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalFields = document.getElementById('modal-fields');

function openModal(type) {
  modal.classList.remove('hidden');
  modalFields.innerHTML = '';

  if(type === 'user') {
    modalTitle.innerText = 'Add User';
    modalFields.innerHTML = `
      <input type="text" name="username" placeholder="Username" required>
      <input type="email" name="email" placeholder="Email" required>
    `;
  } else if(type === 'product') {
    modalTitle.innerText = 'Add Product';
    modalFields.innerHTML = `
      <input type="text" name="name" placeholder="Product Name" required>
      <input type="text" name="description" placeholder="Description" required>
      <input type="number" name="price" placeholder="Price" required>
    `;
  } else if(type === 'transaction') {
    modalTitle.innerText = 'Add Transaction';
    modalFields.innerHTML = `
      <input type="number" name="totalPrice" placeholder="Total Price" required>
      <input type="date" name="createdAt" placeholder="Created At" required>
    `;
  }
}

function closeModal() {
  modal.classList.add('hidden');
}

function submitForm(e) {
  e.preventDefault();
  alert('Data saved (simulated)');
  closeModal();
  e.target.reset();
}
