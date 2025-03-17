document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado - Iniciando script");
    
    // Elementos del DOM
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const letterContent = document.getElementById('letter-content');
    const paragraphs = document.querySelectorAll('.paragraph, .photo-container, .signature, .button-container');
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    const finalAnimation = document.getElementById('final-animation');
    const floatingHearts = document.getElementById('floating-hearts');
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    
    // Variables de control
    let isEnvelopeOpen = false;
    let currentParagraph = -1;
    let isMusicPlaying = false;
    
    // Verificar que todos los elementos se hayan encontrado correctamente
    console.log("Sobre encontrado:", envelope !== null);
    console.log("Carta encontrada:", letter !== null);
    console.log("Contenido de carta encontrado:", letterContent !== null);
    console.log("Párrafos encontrados:", paragraphs.length);
    
    // Inicializar la carta
    inicializarCarta();
    
    function inicializarCarta() {
        console.log("Inicializando carta");
        
        // Mostrar el sobre correctamente
        envelope.style.opacity = '1';
        envelope.style.transform = 'rotateY(0deg) scale(1)';
        
        // Ocultar la carta
        letter.style.opacity = '0';
        letter.style.transform = 'translateZ(-1px) scale(0.9)';
        
        // Crear decoraciones
        createRandomDecorations();
        
        // Configurar el audio con una URL válida o quitar si no hay audio
        try {
            // Usar un archivo de audio estático o quitar esta funcionalidad
            backgroundMusic.src = "";
            backgroundMusic.volume = 0.5;
        } catch (error) {
            console.warn("No se pudo configurar el audio:", error);
            musicControl.style.display = 'none';
        }
        
        // Añadir event listeners
        configurarEventListeners();
    }
    
    function configurarEventListeners() {
        // Event listener para el sobre con detección de doble clic
        envelope.addEventListener('click', manejarClicSobre);
        
        // Event listeners para los botones de navegación
        nextButton.addEventListener('click', showNextParagraph);
        backButton.addEventListener('click', showPreviousParagraph);
        
        // Event listener para el control de música
        musicControl.addEventListener('click', toggleMusic);
        
        // Event listener para el teclado
        document.addEventListener('keydown', manejarTeclado);
        
        // Event listener para el scroll
        letter.addEventListener('scroll', manejarScroll);
    }
    
    function manejarClicSobre() {
        console.log("Clic en sobre detectado");
        if (!isEnvelopeOpen) {
            abrirSobre();
        }
    }
    
    function manejarTeclado(event) {
        if (event.key === 'Enter' && isEnvelopeOpen) {
            if (currentParagraph < paragraphs.length - 1) {
                nextButton.classList.add('pulse');
                showNextParagraph();
                
                setTimeout(function() {
                    nextButton.classList.remove('pulse');
                }, 300);
            }
        } else if (event.key === ' ' && !isEnvelopeOpen) {
            // Espacio también puede abrir el sobre
            abrirSobre();
        }
    }
    
    function manejarScroll() {
        const scrollPosition = letter.scrollTop + letter.clientHeight;
        const scrollHeight = letter.scrollHeight;
        
        // Si estamos cerca del final del scroll, mostrar el siguiente párrafo automáticamente
        if (scrollHeight - scrollPosition < 50 && currentParagraph < paragraphs.length - 1) {
            showNextParagraph();
        }
    }
    
    // Función mejorada para abrir el sobre
    function abrirSobre() {
        console.log("Abriendo sobre...");
        isEnvelopeOpen = true;
        
        // Animar el sobre para que se voltee y desaparezca
        envelope.style.transform = 'rotateY(180deg) scale(0.1)';
        envelope.style.opacity = '0';
        
        // Mostrar la carta después de que el sobre termine su animación
        setTimeout(function() {
            console.log("Animación de sobre completada, mostrando carta");
            envelope.style.display = 'none';
            letter.style.display = 'block';
            letter.style.opacity = '1';
            letter.style.transform = 'translateZ(0) scale(1)';
            
            // Mostrar gradualmente el contenido de la carta
            setTimeout(function() {
                console.log("Mostrando contenido de la carta");
                letterContent.style.opacity = '1';
                letterContent.style.transform = 'translateY(0)';
                
                // Mostrar el primer párrafo
                showNextParagraph();
                
                // Iniciar los corazones flotantes
                startFloatingHearts();
            }, 500);
        }, 1000);
    }
    
    // Mostrar el siguiente párrafo
    function showNextParagraph() {
        currentParagraph++;
        console.log("Mostrando párrafo:", currentParagraph);
        
        // Mostrar todos los párrafos hasta el actual
        paragraphs.forEach(function(paragraph) {
            if (parseInt(paragraph.dataset.index) <= currentParagraph) {
                paragraph.style.opacity = '1';
                paragraph.style.transform = 'translateY(0)';
            }
        });
        
        // Actualizar los botones de navegación
        updateNavigationButtons();
        
        // Si llegamos al final, mostrar la animación final
        if (currentParagraph === paragraphs.length - 1) {
            setTimeout(function() {
                showFinalAnimation();
            }, 2000);
        }
        
        // Desplazar automáticamente hacia el párrafo actual
        let activeElement = document.querySelector(`[data-index="${currentParagraph}"]`);
        if (activeElement) {
            activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        
        // Añadir más corazones al mostrar un nuevo párrafo
        addBurstOfHearts();
    }
    
    // Mostrar el párrafo anterior
    function showPreviousParagraph() {
        if (currentParagraph > 0) {
            // Ocultar el párrafo actual
            paragraphs[currentParagraph].style.opacity = '0';
            paragraphs[currentParagraph].style.transform = 'translateY(20px)';
            
            currentParagraph--;
            console.log("Mostrando párrafo anterior:", currentParagraph);
            
            // Actualizar los botones de navegación
            updateNavigationButtons();
            
            // Desplazar automáticamente hacia el párrafo actual
            let activeElement = document.querySelector(`[data-index="${currentParagraph}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }
    
    // Actualizar la visibilidad de los botones de navegación
    function updateNavigationButtons() {
        backButton.style.display = currentParagraph > 0 ? 'block' : 'none';
        nextButton.style.display = currentParagraph < paragraphs.length - 1 ? 'block' : 'none';
    }
    
    // Mostrar la animación final
    function showFinalAnimation() {
        console.log("Mostrando animación final");
        finalAnimation.style.opacity = '1';
        finalAnimation.style.pointerEvents = 'auto';
        
        // Crear confeti para la animación final
        createConfetti();
        
        // Reproducir música automáticamente en la animación final si hay audio disponible
        if (!isMusicPlaying && backgroundMusic.src) {
            toggleMusic();
        }
        
        // Ocultar la animación final después de un tiempo
        setTimeout(function() {
            finalAnimation.style.opacity = '0';
            finalAnimation.style.pointerEvents = 'none';
        }, 5000);
    }
    
    // Iniciar los corazones flotantes
    function startFloatingHearts() {
        console.log("Iniciando corazones flotantes");
        setInterval(function() {
            createFloatingHeart();
        }, 800); // Reducido para mejor rendimiento
    }
    
    // Crear un corazón flotante
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        
        floatingHearts.appendChild(heart);
        
        // Hacer visible el corazón después de añadirlo al DOM
        setTimeout(function() {
            heart.style.opacity = '1';
        }, 10);
        
        // Eliminar el corazón después de la animación
        setTimeout(function() {
            if (floatingHearts.contains(heart)) {
                floatingHearts.removeChild(heart);
            }
        }, 10000);
    }
    
    // Añadir una ráfaga de corazones
    function addBurstOfHearts() {
        for (let i = 0; i < 8; i++) {
            setTimeout(function() {
                createFloatingHeart();
            }, i * 100);
        }
    }
    
    // Crear confeti para la animación final
    function createConfetti() {
        console.log("Creando confeti");
        const colors = ['#ff4081', '#9c27b0', '#3f51b5', '#03a9f4', '#4caf50', '#ffeb3b', '#ff9800'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            // Animar el confeti
            setTimeout(function() {
                confetti.style.opacity = '1';
                confetti.style.transform = 'translateY(' + (Math.random() * 500 + 500) + 'px) rotate(' + (Math.random() * 360) + 'deg)';
                confetti.style.transition = 'all ' + (Math.random() * 3 + 2) + 's ease-out';
            }, Math.random() * 500);
            
            // Eliminar el confeti después de la animación
            setTimeout(function() {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 5000);
        }
    }
    
    // Alternar la reproducción de música
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicControl.innerHTML = '♫';
            musicControl.style.backgroundColor = '#ff4081';
        } else {
            // Solo intentar reproducir si hay una fuente válida
            if (backgroundMusic.src) {
                try {
                    backgroundMusic.src = "/static/media/la-promesa.mp3";
                    backgroundMusic.volume = 0.5;
                    let playPromise = backgroundMusic.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            musicControl.innerHTML = '◼';
                            musicControl.style.backgroundColor = '#9c27b0';
                        })
                        .catch(error => {
                            console.error('Error al reproducir música:', error);
                        });
                    }
                } catch (error) {
                    console.error('Error al cargar música:', error);
                }
            }
        }
        
        isMusicPlaying = !isMusicPlaying;
    }
    
    // Crear decoraciones aleatorias en el fondo
    function createRandomDecorations() {
        console.log("Creando decoraciones");
        const decorations = ['❤', '♥', '💕', '💖', '✨', '💫'];
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 15; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'decoration';
            decoration.innerHTML = decorations[Math.floor(Math.random() * decorations.length)];
            decoration.style.left = Math.random() * 100 + '%';
            decoration.style.top = Math.random() * 100 + '%';
            decoration.style.transform = 'rotate(' + (Math.random() * 60 - 30) + 'deg)';
            container.appendChild(decoration);
        }
    }
    
    console.log("Configuración inicial completada");
});