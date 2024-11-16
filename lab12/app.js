document.addEventListener('DOMContentLoaded', loadContacts);

const form = document.getElementById('contactForm');
form.addEventListener('submit', addContact);

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');
        contactCard.innerHTML = `
            <div>
                <strong>${contact.nombre}</strong><br>
                Tel: ${contact.telefono}<br>
                Email: ${contact.email}<br>
                Dirección: ${contact.direccion}
            </div>
            <div>
                <button onclick="editContact(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Eliminar</button>
            </div>
        `;
        contactList.appendChild(contactCard);
    });
}

function addContact(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;

    if (!nombre || !telefono) {
        alert("Nombre y Teléfono son obligatorios.");
        return;
    }

    const newContact = { nombre, telefono, email, direccion };
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    form.reset();
    loadContacts();
}

function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}

function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];

    document.getElementById('nombre').value = contact.nombre;
    document.getElementById('telefono').value = contact.telefono;
    document.getElementById('email').value = contact.email;
    document.getElementById('direccion').value = contact.direccion;

    form.removeEventListener('submit', addContact);
    form.addEventListener('submit', function updateContact(event) {
        event.preventDefault();
        contact.nombre = document.getElementById('nombre').value;
        contact.telefono = document.getElementById('telefono').value;
        contact.email = document.getElementById('email').value;
        contact.direccion = document.getElementById('direccion').value;

        contacts[index] = contact;
        localStorage.setItem('contacts', JSON.stringify(contacts));

        form.reset();
        loadContacts();
        form.removeEventListener('submit', updateContact);
        form.addEventListener('submit', addContact);
    });
}
