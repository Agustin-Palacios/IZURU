document.addEventListener("DOMContentLoaded", () => {
  // Funcionalidad del buscador
  const searchInput = document.getElementById("searchInput")
  const categoryCards = document.querySelectorAll(".category-card")

  // Datos de búsqueda para cada categoría
  const searchData = {
    aros: ["aros", "pendientes", "aretes", "earrings", "oro", "plata"],
    collares: ["collares", "cadenas", "necklace", "chain", "cuello", "gargantilla"],
    abridores: ["abridores", "broches", "pins", "clips", "sujetadores"],
    pulseras: ["pulseras", "brazaletes", "bracelets", "muñeca", "charm"],
    anillos: ["anillos", "rings", "sortijas", "alianzas", "compromiso", "boda"],
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim()

      categoryCards.forEach((card) => {
        const category = card.dataset.category
        const categoryKeywords = searchData[category] || []

        if (searchTerm === "") {
          // Mostrar todas las tarjetas si no hay búsqueda
          card.style.display = "block"
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        } else {
          // Verificar si el término de búsqueda coincide con alguna palabra clave
          const matches = categoryKeywords.some(
            (keyword) => keyword.includes(searchTerm) || searchTerm.includes(keyword),
          )

          if (matches) {
            card.style.display = "block"
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
            // Agregar efecto de resaltado
            card.style.boxShadow = "0 25px 50px rgba(231, 76, 60, 0.3)"
          } else {
            card.style.opacity = "0.3"
            card.style.transform = "translateY(20px)"
            card.style.boxShadow = "none"
          }
        }
      })

      // Mostrar mensaje si no hay resultados
      const visibleCards = Array.from(categoryCards).filter((card) => card.style.opacity !== "0.3")

      let noResultsMessage = document.querySelector(".no-results")
      if (searchTerm !== "" && visibleCards.length === 0) {
        if (!noResultsMessage) {
          noResultsMessage = document.createElement("div")
          noResultsMessage.className = "no-results"
          noResultsMessage.innerHTML = `
                        <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                            <h3>No se encontraron resultados</h3>
                            <p>Intenta con términos como: aros, collares, pulseras, anillos, abridores</p>
                        </div>
                    `
          document.querySelector(".categories-grid").appendChild(noResultsMessage)
        }
        noResultsMessage.style.display = "block"
      } else if (noResultsMessage) {
        noResultsMessage.style.display = "none"
      }
    })
  }

  // Navegación suave
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80 // Ajuste para navbar fija
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }

        // Actualizar clase activa
        navLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })

  // Efecto parallax sutil en el hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroPattern = document.querySelector(".hero-pattern")
    const featuredJewelry = document.querySelector(".featured-jewelry")

    if (heroPattern) {
      heroPattern.style.transform = `translateY(${scrolled * 0.3}px)`
    }

    if (featuredJewelry) {
      featuredJewelry.style.transform = `rotate(5deg) translateY(${scrolled * 0.1}px)`
    }

    // Cambiar opacidad de la navbar
    const navbar = document.querySelector(".navbar")
    if (scrolled > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.9)"
    }
  })

  // Animaciones de entrada para las tarjetas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar tarjetas de categorías y características
  document.querySelectorAll(".category-card, .feature-item").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Funcionalidad del menú móvil
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active")
      this.classList.toggle("active")
    })
  }
})
