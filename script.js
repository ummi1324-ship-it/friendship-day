
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const musicToggle = document.getElementById("musicToggle");
  const music = document.getElementById("backgroundMusic");
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const copyStatus = document.getElementById("copyStatus");
  const letterBtn = document.getElementById("letterBtn");
  const letterContent = document.getElementById("letterContent");
  const heartsContainer = document.getElementById("floatingHearts");

  // Current year
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // ----------------------------------
  // 1. DARK / LIGHT MODE
  // ----------------------------------
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("light-mode");

    const isLight = body.classList.contains("light-mode");

    themeToggle.innerHTML = isLight
      ? '<i class="bi bi-moon-stars-fill"></i>'
      : '<i class="bi bi-sun-fill"></i>';

    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  });

  // ----------------------------------
  // 2. BACKGROUND MUSIC
  // Add friendship-song.mp3 to your folder
  // ----------------------------------
  musicToggle.addEventListener("click", async function () {
    if (music.paused) {
      try {
        await music.play();
        musicToggle.innerHTML =
          '<i class="bi bi-pause-fill"></i>';
        musicToggle.setAttribute(
          "aria-label", "Pause background music"
        );
      } catch (error) {
        alert(
          "Please add a valid friendship-song.mp3 file to your website folder."
        );
      }
    } else {
      music.pause();
      musicToggle.innerHTML =
        '<i class="bi bi-music-note-beamed"></i>';
      musicToggle.setAttribute(
        "aria-label", "Play background music"
      );
    }
  });

  // ----------------------------------
  // 3. RANDOM FRIENDSHIP QUOTES
  // ----------------------------------
  const quotes = [
    {
      text: "A true friend makes the good times better and the hard times easier.",
      author: "A thought about friendship"
    },
    {
      text: "Good friends are like stars. You don't always see them, but you know they're there.",
      author: "A friendship saying"
    },
    {
      text: "Life is better when you're laughing with your favorite people.",
      author: "A reminder to enjoy life"
    },
    {
      text: "The best friendships are built on trust, kindness, and little moments.",
      author: "A thought to remember"
    },
    {
      text: "Distance means so little when someone means so much.",
      author: "A friendship saying"
    },
    {
      text: "A good friend knows your stories. A great friend helped you create them.",
      author: "A thought about memories"
    },
    {
      text: "Friendship isn't about who you've known the longest. It's about who stands by you.",
      author: "A reminder about loyalty"
    },
    {
      text: "One small act of kindness can turn an ordinary day into a beautiful memory.",
      author: "A little inspiration"
    }
  ];

  let currentQuote = 0;

  document.getElementById("newQuoteBtn").addEventListener(
    "click", function () {
      let nextQuote;

      do {
        nextQuote = Math.floor(Math.random() * quotes.length);
      } while (quotes.length > 1 && nextQuote === currentQuote);

      currentQuote = nextQuote;

      quoteText.textContent = quotes[currentQuote].text;
      quoteAuthor.textContent = "— " + quotes[currentQuote].author;
      copyStatus.textContent = "";

      quoteText.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 400, easing: "ease-out" }
      );
    }
  );

  // ----------------------------------
  // 4. COPY QUOTE
  // ----------------------------------
  document.getElementById("copyQuoteBtn").addEventListener(
    "click", async function () {
      const textToCopy =
        '"' + quoteText.textContent + '" ' +
        quoteAuthor.textContent;

      try {
        await navigator.clipboard.writeText(textToCopy);
        copyStatus.textContent = "Quote copied! Share some kindness 💜";
      } catch (error) {
        copyStatus.textContent =
          "Copy is unavailable here. Please select the quote and copy it manually.";
      }
    }
  );

  // ----------------------------------
  // 5. OPEN THE FRIENDSHIP LETTER
  // ----------------------------------
  letterBtn.addEventListener("click", function () {
    const isHidden = letterContent.hidden;

    letterContent.hidden = !isHidden;

    letterBtn.innerHTML = isHidden
      ? 'Close My Letter <i class="bi bi-envelope"></i>'
      : 'Open My Letter <i class="bi bi-envelope-open"></i>';

    letterBtn.setAttribute("aria-expanded", String(isHidden));

    if (isHidden) {
      letterContent.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

      createHearts(7);
    }
  });

  // ----------------------------------
  // 6. FLOATING HEARTS
  // ----------------------------------
  function createHearts(amount = 5) {
    const symbols = ["♥", "♡", "💜", "💗", "✨"];

    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      heart.style.left = Math.random() * 95 + "%";
      heart.style.fontSize = (16 + Math.random() * 22) + "px";
      heart.style.animationDuration = (3 + Math.random() * 2) + "s";

      heartsContainer.appendChild(heart);

      heart.addEventListener("animationend", function () {
        heart.remove();
      });
    }
  }

  // Add a few hearts now and then
  setInterval(function () {
    if (!document.hidden) {
      createHearts(1);
    }
  }, 2200);

  // ----------------------------------
  // 7. CONFETTI CELEBRATION
  // ----------------------------------
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  let confettiPieces = [];
  let animationFrame = null;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function celebrate() {
    const colors = [
      "#f472b6",
      "#c084fc",
      "#818cf8",
      "#facc15",
      "#67e8f9",
      "#ffffff"
    ];

    // Stop an earlier animation if celebration is clicked again
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
    }

    confettiPieces = Array.from({ length: 180 }, function () {
      return {
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * window.innerHeight * 0.5,
        size: 4 + Math.random() * 7,
        speedY: 2 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 9,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });

    function drawConfetti() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      confettiPieces.forEach(function (piece) {
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.rotation += piece.rotationSpeed;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation * Math.PI / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(
          -piece.size / 2,
          -piece.size / 2,
          piece.size,
          piece.size * 0.65
        );
        ctx.restore();
      });

      confettiPieces = confettiPieces.filter(function (piece) {
        return piece.y < window.innerHeight + 30;
      });

      if (confettiPieces.length > 0) {
        animationFrame = requestAnimationFrame(drawConfetti);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        animationFrame = null;
      }
    }

    animationFrame = requestAnimationFrame(drawConfetti);
    createHearts(18);
  }

  document.getElementById("celebrateBtn").addEventListener(
    "click", celebrate
  );

  document.getElementById("finalCelebrateBtn").addEventListener(
    "click", celebrate
  );

  // ----------------------------------
  // 8. CLOSE MOBILE NAV AFTER A LINK
  // ----------------------------------
  document.querySelectorAll("#navMenu .nav-link").forEach(
    function (link) {
      link.addEventListener("click", function () {
        const menu = document.getElementById("navMenu");

        if (menu.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    }
  );
});
