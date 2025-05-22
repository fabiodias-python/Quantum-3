// Arquivo principal de JavaScript para o site Quantum
document.addEventListener('DOMContentLoaded', function() {
  // Inicialização das partículas
  particlesJS.load('particles-js', 'js/particles-config.json', function() {
    console.log('Partículas carregadas com sucesso');
  });

  // Navegação móvel
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

  // Botão de voltar ao topo
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Barra de progresso de leitura
  const readingProgress = document.querySelector('.reading-progress');
  
  if (readingProgress) {
    window.addEventListener('scroll', function() {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      readingProgress.style.width = progress + '%';
    });
  }

  // Inicialização de tooltips
  const tooltips = document.querySelectorAll('.tooltip');
  
  tooltips.forEach(tooltip => {
    const tooltipText = tooltip.querySelector('.tooltip-text');
    if (tooltipText) {
      tooltip.setAttribute('aria-describedby', tooltipText.id);
    }
  });

  // Glossário flutuante
  const glossaryTerms = document.querySelectorAll('.floating-glossary-term');
  
  glossaryTerms.forEach(term => {
    term.addEventListener('click', function(e) {
      e.preventDefault();
      const definition = this.querySelector('.term-definition');
      if (definition) {
        definition.style.visibility = definition.style.visibility === 'visible' ? 'hidden' : 'visible';
        definition.style.opacity = definition.style.opacity === '1' ? '0' : '1';
      }
    });
  });

  // Inicialização do Quiz
  initQuiz();

  // Animações ao scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(element);
  });

  // Alternador de tema (para implementação futura)
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      const isDarkTheme = !document.body.classList.contains('light-theme');
      localStorage.setItem('darkTheme', isDarkTheme);
      
      // Atualiza o ícone
      const icon = this.querySelector('i');
      if (icon) {
        icon.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
      }
    });

    // Verifica o tema salvo
    const savedDarkTheme = localStorage.getItem('darkTheme');
    if (savedDarkTheme === 'false') {
      document.body.classList.add('light-theme');
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-moon';
      }
    }
  }

  // Inicialização de simulações interativas
  initSimulations();
});

// Função para inicializar o Quiz
function initQuiz() {
  const quizContainer = document.querySelector('.quiz-container');
  
  if (!quizContainer) return;

  const quizOptions = document.querySelectorAll('.quiz-option');
  const submitButton = document.querySelector('.quiz-button');
  const feedbackElements = document.querySelectorAll('.quiz-feedback');
  const resultsElement = document.querySelector('.quiz-results');
  
  let score = 0;
  let totalQuestions = document.querySelectorAll('.quiz-question').length;
  let answeredQuestions = 0;

  quizOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove seleção anterior na mesma pergunta
      const questionOptions = this.closest('.quiz-options').querySelectorAll('.quiz-option');
      questionOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Seleciona esta opção
      this.classList.add('selected');
    });
  });

  if (submitButton) {
    submitButton.addEventListener('click', function() {
      const selectedOptions = document.querySelectorAll('.quiz-option.selected');
      
      if (selectedOptions.length < totalQuestions) {
        alert('Por favor, responda todas as perguntas antes de enviar.');
        return;
      }

      selectedOptions.forEach(option => {
        const isCorrect = option.dataset.correct === 'true';
        const questionFeedback = option.closest('.quiz-question').querySelector('.quiz-feedback');
        
        option.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        if (isCorrect) {
          score++;
          if (questionFeedback) {
            questionFeedback.classList.add('correct');
            questionFeedback.textContent = 'Correto! ' + questionFeedback.dataset.correct;
          }
        } else {
          if (questionFeedback) {
            questionFeedback.classList.add('incorrect');
            questionFeedback.textContent = 'Incorreto. ' + questionFeedback.dataset.incorrect;
          }
        }
        
        answeredQuestions++;
      });

      // Desabilita as opções após envio
      quizOptions.forEach(opt => opt.style.pointerEvents = 'none');
      
      // Mostra os resultados
      if (resultsElement) {
        const scoreElement = resultsElement.querySelector('.quiz-score');
        if (scoreElement) {
          scoreElement.textContent = `${score}/${totalQuestions}`;
        }
        resultsElement.style.display = 'block';
      }
      
      // Esconde o botão de envio
      this.style.display = 'none';
    });
  }
}

// Função para inicializar simulações interativas
function initSimulations() {
  const simulationContainers = document.querySelectorAll('.simulation-container');
  
  simulationContainers.forEach(container => {
    const simulationType = container.dataset.simulation;
    const canvas = container.querySelector('.simulation-canvas');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Ajusta o tamanho do canvas
    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Inicializa a simulação específica
    switch(simulationType) {
      case 'superposition':
        initSuperpositionSimulation(container, canvas, ctx);
        break;
      case 'entanglement':
        initEntanglementSimulation(container, canvas, ctx);
        break;
      case 'wave-particle':
        initWaveParticleSimulation(container, canvas, ctx);
        break;
    }
  });
}

// Simulação de Superposição Quântica
function initSuperpositionSimulation(container, canvas, ctx) {
  let amplitude = 0.5;
  let phase = 0;
  let animationId;
  
  const amplitudeSlider = container.querySelector('[data-param="amplitude"]');
  
  if (amplitudeSlider) {
    amplitudeSlider.addEventListener('input', function() {
      amplitude = parseFloat(this.value);
    });
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const waveHeight = canvas.height * 0.4 * amplitude;
    
    // Desenha o estado |0⟩
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    
    for (let x = 0; x < canvas.width; x++) {
      const y = centerY - Math.sin(x * 0.02 + phase) * waveHeight;
      ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = '#66d9ef';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Desenha o estado |1⟩
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    
    for (let x = 0; x < canvas.width; x++) {
      const y = centerY + Math.sin(x * 0.02 + phase) * waveHeight;
      ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = '#9580ff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Desenha a superposição
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    
    for (let x = 0; x < canvas.width; x++) {
      const wave1 = Math.sin(x * 0.02 + phase) * waveHeight;
      const wave2 = Math.sin(x * 0.02 + phase + Math.PI) * waveHeight * (1 - amplitude);
      const y = centerY - (wave1 + wave2);
      ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = '#50fa7b';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Atualiza a fase para animação
    phase += 0.05;
    
    animationId = requestAnimationFrame(draw);
  }
  
  draw();
  
  // Limpa a animação quando necessário
  return function cleanup() {
    cancelAnimationFrame(animationId);
  };
}

// Simulação de Emaranhamento Quântico
function initEntanglementSimulation(container, canvas, ctx) {
  let correlation = 0.5;
  let particles = [];
  let animationId;
  
  const correlationSlider = container.querySelector('[data-param="correlation"]');
  
  if (correlationSlider) {
    correlationSlider.addEventListener('input', function() {
      correlation = parseFloat(this.value);
    });
  }
  
  // Inicializa partículas
  function initParticles() {
    particles = [];
    
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: canvas.width / 4 + (i * canvas.width / 2),
        y: canvas.height / 2,
        radius: 10,
        color: i === 0 ? '#66d9ef' : '#9580ff',
        spin: Math.random() > 0.5 ? 1 : -1,
        angle: 0
      });
    }
  }
  
  initParticles();
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha linha de emaranhamento
    ctx.beginPath();
    ctx.moveTo(particles[0].x, particles[0].y);
    ctx.lineTo(particles[1].x, particles[1].y);
    ctx.strokeStyle = `rgba(80, 250, 123, ${correlation})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Atualiza e desenha partículas
    particles.forEach((particle, index) => {
      // Atualiza ângulo
      particle.angle += 0.02 * particle.spin;
      
      // Desenha partícula
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Desenha spin
      const spinX = particle.x + Math.cos(particle.angle) * particle.radius;
      const spinY = particle.y + Math.sin(particle.angle) * particle.radius;
      
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(spinX, spinY);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Aplica correlação
      if (Math.random() < correlation) {
        particles[1].spin = particles[0].spin;
      }
    });
    
    animationId = requestAnimationFrame(draw);
  }
  
  draw();
  
  // Limpa a animação quando necessário
  return function cleanup() {
    cancelAnimationFrame(animationId);
  };
}

// Simulação de Dualidade Onda-Partícula
function initWaveParticleSimulation(container, canvas, ctx) {
  let particleMode = 0.5; // 0 = onda pura, 1 = partícula pura
  let particles = [];
  let animationId;
  
  const modeSlider = container.querySelector('[data-param="mode"]');
  
  if (modeSlider) {
    modeSlider.addEventListener('input', function() {
      particleMode = parseFloat(this.value);
    });
  }
  
  // Inicializa partículas
  function initParticles() {
    particles = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        wavePhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  initParticles();
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Modo onda
    if (particleMode < 1) {
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x += 5) {
        let y = 0;
        
        particles.forEach(particle => {
          const distance = Math.abs(x - particle.x);
          const amplitude = Math.max(0, 50 - distance) / 50;
          y += Math.sin(x * 0.05 + particle.wavePhase) * amplitude * 20;
        });
        
        y = canvas.height / 2 + y * (1 - particleMode);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.strokeStyle = '#66d9ef';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Modo partícula
    particles.forEach(particle => {
      // Atualiza posição
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Rebate nas bordas
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }
      
      // Desenha partícula
      const particleOpacity = particleMode;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(149, 128, 255, ${particleOpacity})`;
      ctx.fill();
      
      // Atualiza fase da onda
      particle.wavePhase += 0.05;
    });
    
    animationId = requestAnimationFrame(draw);
  }
  
  draw();
  
  // Limpa a animação quando necessário
  return function cleanup() {
    cancelAnimationFrame(animationId);
  };
}

// Função para compartilhamento em redes sociais
function shareContent(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const text = encodeURIComponent('Confira este artigo sobre física quântica!');
  
  let shareUrl;
  
  switch(platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
  
  return false;
}

// Função para filtrar conteúdo
function filterContent(category) {
  const allItems = document.querySelectorAll('.filterable-item');
  const filterButtons = document.querySelectorAll('.filter-button');
  
  // Atualiza botões
  filterButtons.forEach(button => {
    if (button.dataset.filter === category || (category === 'all' && button.dataset.filter === 'all')) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Filtra itens
  allItems.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Função para ordenar conteúdo
function sortContent(method) {
  const container = document.querySelector('.sortable-container');
  
  if (!container) return;
  
  const items = Array.from(container.querySelectorAll('.sortable-item'));
  
  items.sort((a, b) => {
    switch(method) {
      case 'date-asc':
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      case 'date-desc':
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      case 'title-asc':
        return a.dataset.title.localeCompare(b.dataset.title);
      case 'title-desc':
        return b.dataset.title.localeCompare(a.dataset.title);
    }
  });
  
  // Limpa o container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Adiciona os itens ordenados
  items.forEach(item => {
    container.appendChild(item);
  });
}

// Função para imprimir conteúdo
function printContent() {
  window.print();
  return false;
}
