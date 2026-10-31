document.addEventListener('DOMContentLoaded', () => {

    // 1. VARIABLE PENTRU COȘUL DE CUMPĂRĂTURI
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');

    // 2. ADĂUGARE ÎN COȘ LA CLICK PE "VEZI DETALII"
    const detailsButtons = document.querySelectorAll('.btn-details');

    detailsButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }

            const originalText = button.textContent;
            button.textContent = 'Adăugat în coș! ✓';
            button.textContent = 'Adăugat în coș! ✓';
            button.style.backgroundColor = '#aeb5a8';

            showNotification(`Produsul a fost adăugat în coș! (${cartCount} produse în total)`);

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '#C2C8BC';
            }, 1500);
        });
    });

    // 3. GESTIONARE FAVORITE (Inimioare)
    const heartButtons = document.querySelectorAll('.btn-heart');
    heartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = button.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#e74c3c';
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = '#333';
            }
        });
    });

    // 4. FORMULAR NEWSLETTER
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', () => {
            const email = newsletterInput.value.trim();
            if (email && email.includes('@')) {
                showNotification('Vă mulțumim pentru abonare!');
                newsletterInput.value = '';
            } else {
                alert('Vă rugăm să introduceți o adresă de e-mail validă.');
            }
        });
    }

    // 5. CARUSEL CATEGORII POPULARE
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalCards = track.children.length;
        const visibleCards = 4;
        const maxIndex = Math.max(0, totalCards - visibleCards);

        function updateCarousel() {
            const cardWidth = track.children[0].getBoundingClientRect().width;
            const gap = 20;
            const amountToMove = (cardWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    }

    // FUNCȚIE AUXILIARĂ PENTRU NOTIFICĂRI ELEGANTE
    function showNotification(message) {
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = 'show-toast';

        setTimeout(() => {
            toast.className = toast.className.replace('show-toast', '');
        }, 2500);
    }

});
//functie care ma ajuta sa caut in bara de cautare
const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();

                const removeDiacritics = (str) => {
                    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
                };

                const searchTerm = removeDiacritics(searchInput.value);

                // Dicționar de mapare pentru categoriile existente
                const categoriesMap = {
                    'panza': { nume: 'panza', img: 'panze.jpg' },
                    'acrilice': { nume: 'acrilice', img: 'acrilice.jpg' },
                    'uleiuri': { nume: 'acrilice', img: 'acrilice.jpg' },
                    'pastel': { nume: 'pastel creion', img: 'pastel.jpg' },
                    'creion': { nume: 'pastel creion', img: 'pastel.jpg' },
                    'pensule': { nume: 'pensule', img: 'pensule.jpg' },
                    'creioane': { nume: 'creioane', img: 'creioane.jpg' },
                    'sevalet': { nume: 'sevalet', img: 'sevalet.jpg' },
                    'sevalete': { nume: 'sevalet', img: 'sevalet.jpg' },
                    'goase': { nume: 'goase', img: 'goase.jpg' },
                    'markere': { nume: 'markere', img: 'markere.jpg' }
                };

                // Căutăm o cheie care se potrivește cu textul introdus (fără diacritice)
                const matchedKey = Object.keys(categoriesMap).find(key => searchTerm.includes(key));

                if (matchedKey) {
                    const category = categoriesMap[matchedKey];
                    window.location.href = `produs.html?nume=${encodeURIComponent(category.nume)}&img=${category.img}`;
                } else {
                    alert('Categoria căutată nu a fost găsită.');
                }
            }
        });
    }
	
	// Verificăm dacă suntem pe pagina produs.html
if (window.location.pathname.includes('produs.html')) {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('nume');
    const productImage = params.get('img');

    const titleElement = document.getElementById('product-title');
    const imageElement = document.getElementById('product-image');

    if (productName && titleElement) {
        // Punem prima litera mare și restul mici pentru titlu
        titleElement.textContent = productName.charAt(0).toUpperCase() + productName.slice(1);
    }

    if (productImage && imageElement) {
        imageElement.src = productImage;
    }
}