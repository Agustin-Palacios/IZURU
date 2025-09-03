document.addEventListener('DOMContentLoaded', function() {
    
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }
    
    
    const productosDropdown = document.getElementById('productos-dropdown');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (productosDropdown && dropdownMenu) {
        productosDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.innerWidth <= 768) {
                dropdownMenu.classList.toggle('show');
            }
        });
    }
    
    
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                
                console.log('Buscando:', searchTerm);
               
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navbarMenu) {
            navbarMenu.classList.remove('active');
        }
    });
    
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && dropdownMenu) {
            dropdownMenu.classList.remove('show');
        }
    });
});
