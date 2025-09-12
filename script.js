document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const messageEl = document.getElementById('message');
    const phoneNumberEl = document.getElementById('phoneNumber');
    const addContactBtn = document.getElementById('addContactBtn');
    const contactListEl = document.getElementById('contactList');
    const generateLinksBtn = document.getElementById('generateLinksBtn');
    const linksContainerEl = document.getElementById('linksContainer');

    // --- State ---
    let contacts = [];

    // --- Functions ---

    /**
     * Renders the current list of contacts to the DOM.
     */
    const renderContacts = () => {
        contactListEl.innerHTML = ''; // Clear the list
        if (contacts.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No hay contactos agregados.';
            contactListEl.appendChild(p);
            return;
        }
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');

            const numberSpan = document.createElement('span');
            numberSpan.textContent = contact;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Quitar';
            removeBtn.onclick = () => removeContact(index);

            li.appendChild(numberSpan);
            li.appendChild(removeBtn);
            contactListEl.appendChild(li);
        });
    };

    /**
     * Adds a new contact to the list.
     */
    const addContact = () => {
        // Remove any non-numeric characters from the phone number
        const phoneNumber = phoneNumberEl.value.trim().replace(/\D/g, '');

        if (phoneNumber) {
            if (!contacts.includes(phoneNumber)) {
                contacts.push(phoneNumber);
                renderContacts();
            } else {
                alert('Este número ya está en la lista.');
            }
            phoneNumberEl.value = '';
            phoneNumberEl.focus();
        } else {
            alert('Por favor, ingresa un número de teléfono válido.');
        }
    };

    /**
     * Removes a contact from the list by its index.
     * @param {number} index - The index of the contact to remove.
     */
    const removeContact = (index) => {
        contacts.splice(index, 1);
        renderContacts();
        // Also clear the generated links if a contact is removed
        linksContainerEl.innerHTML = '';
    };

    /**
     * Generates and displays the WhatsApp chat links.
     */
    const generateLinks = () => {
        const message = messageEl.value.trim();
        if (!message) {
            alert('Por favor, escribe un mensaje.');
            messageEl.focus();
            return;
        }
        if (contacts.length === 0) {
            alert('Por favor, agrega al menos un contacto.');
            phoneNumberEl.focus();
            return;
        }

        linksContainerEl.innerHTML = ''; // Clear previous links
        const encodedMessage = encodeURIComponent(message);

        contacts.forEach(contact => {
            const link = document.createElement('a');
            link.href = `https://wa.me/${contact}?text=${encodedMessage}`;
            link.target = '_blank'; // Open in new tab
            link.rel = 'noopener noreferrer';
            link.textContent = `Enviar mensaje a ${contact}`;
            linksContainerEl.appendChild(link);
        });
    };

    // --- Event Listeners ---
    addContactBtn.addEventListener('click', addContact);

    // Allow adding contact by pressing Enter key in the input field
    phoneNumberEl.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            // Prevent form submission if it's inside a form
            event.preventDefault();
            addContact();
        }
    });

    generateLinksBtn.addEventListener('click', generateLinks);

    // --- Initial Render ---
    renderContacts();
});
