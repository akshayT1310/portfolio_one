document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     CURRENT YEAR
  ========================================= */

  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================
     THEME
  ========================================= */

  const themeToggle = document.getElementById('themeToggle');

  const savedTheme = localStorage.getItem('theme');

  const systemTheme = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches
    ? 'light'
    : 'dark';

  const initialTheme = savedTheme || systemTheme;

  document.body.setAttribute(
    'data-theme',
    initialTheme
  );

  function updateThemeButton(theme) {
    if (!themeToggle) return;

    themeToggle.textContent =
      theme === 'light'
        ? '🌙'
        : '☀︎';

    themeToggle.setAttribute(
      'aria-label',
      theme === 'light'
        ? 'Switch to dark mode'
        : 'Switch to light mode'
    );
  }

  updateThemeButton(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme =
        document.body.getAttribute('data-theme') ||
        'dark';

      const nextTheme =
        currentTheme === 'dark'
          ? 'light'
          : 'dark';

      document.body.setAttribute(
        'data-theme',
        nextTheme
      );

      localStorage.setItem(
        'theme',
        nextTheme
      );

      updateThemeButton(nextTheme);
    });
  }


  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuToggle =
    document.querySelector('.menu-toggle');

  const siteNav =
    document.getElementById('site-nav');

  if (menuToggle && siteNav) {

    menuToggle.addEventListener(
      'click',
      () => {

        const isOpen =
          siteNav.classList.toggle('open');

        menuToggle.setAttribute(
          'aria-expanded',
          String(isOpen)
        );

        document.body.style.overflow =
          isOpen
            ? 'hidden'
            : '';
      }
    );

    const navLinks =
      siteNav.querySelectorAll('a');

    navLinks.forEach((link) => {

      link.addEventListener(
        'click',
        () => {

          siteNav.classList.remove(
            'open'
          );

          menuToggle.setAttribute(
            'aria-expanded',
            'false'
          );

          document.body.style.overflow =
            '';
        }
      );
    });
  }


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealItems =
    document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              'visible'
            );

            observer.unobserve(
              entry.target
            );
          });

        },
        {
          threshold: 0.15,
        }
      );

    revealItems.forEach((item) => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach((item) => {
      item.classList.add('visible');
    });

  }


  /* =========================================
     TYPING ANIMATION
  ========================================= */

  const typingText =
    document.getElementById('typing-text');

  const words = [
    'scalable apps',
    'AI copilots',
    'smart platforms',
    'beautiful experiences',
    'high-performance websites',
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {

    if (!typingText) return;

    const currentWord =
      words[wordIndex];

    if (!deleting) {

      charIndex++;

      typingText.textContent =
        currentWord.slice(
          0,
          charIndex
        );

      if (
        charIndex >=
        currentWord.length
      ) {

        deleting = true;

        setTimeout(
          typeLoop,
          1400
        );

        return;
      }

      setTimeout(
        typeLoop,
        80
      );

    } else {

      charIndex--;

      typingText.textContent =
        currentWord.slice(
          0,
          charIndex
        );

      if (charIndex <= 0) {

        charIndex = 0;

        deleting = false;

        wordIndex =
          (wordIndex + 1) %
          words.length;
      }

      setTimeout(
        typeLoop,
        50
      );
    }
  }

  if (typingText) {
    typeLoop();
  }


  /* =========================================
     NUMBER COUNTERS
  ========================================= */

  const counters =
    document.querySelectorAll(
      '[data-count]'
    );

  if (
    counters.length &&
    'IntersectionObserver' in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const counter =
              entry.target;

            const target =
              Number(
                counter.getAttribute(
                  'data-count'
                )
              );

            if (
              Number.isNaN(target)
            ) {
              return;
            }

            let current = 0;

            const duration = 1200;

            const start =
              performance.now();

            function updateCounter(
              timestamp
            ) {

              const progress =
                Math.min(
                  (timestamp - start) /
                    duration,
                  1
                );

              const eased =
                1 -
                Math.pow(
                  1 - progress,
                  3
                );

              current =
                Math.floor(
                  target * eased
                );

              counter.textContent =
                current;

              if (progress < 1) {

                requestAnimationFrame(
                  updateCounter
                );

              } else {

                counter.textContent =
                  target;
              }
            }

            requestAnimationFrame(
              updateCounter
            );

            counterObserver.unobserve(
              counter
            );
          });

        },
        {
          threshold: 0.6,
        }
      );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }


  /* =========================================
     CONTACT FORM
  ========================================= */

  const form =
    document.getElementById(
      'contactForm'
    );

  const formMessage =
    document.getElementById(
      'formMessage'
    );

  if (form) {

    form.addEventListener(
      'submit',
      (event) => {

        event.preventDefault();

        const name =
          document
            .getElementById('name')
            ?.value
            .trim() || '';

        const email =
          document
            .getElementById('email')
            ?.value
            .trim() || '';

        const message =
          document
            .getElementById('message')
            ?.value
            .trim() || '';

        if (
          !name ||
          !email ||
          !message
        ) {

          if (formMessage) {
            formMessage.textContent =
              'Please fill in all fields.';
          }

          return;
        }

        const subject =
          `Portfolio Inquiry from ${name}`;

        const body =
          `Name: ${name}

Email: ${email}

Message:
${message}`;

        const mailToLink =
          `mailto:officialankush84ya@gmail.com` +
          `?subject=${encodeURIComponent(
            subject
          )}` +
          `&body=${encodeURIComponent(
            body
          )}`;

        if (formMessage) {
          formMessage.textContent =
            'Opening your mail client...';
        }

        window.location.href =
          mailToLink;
      }
    );
  }


  /* =========================================
     SMOOTH ANCHOR SCROLL
  ========================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        'click',
        (event) => {

          const targetId =
            link.getAttribute(
              'href'
            );

          if (
            !targetId ||
            targetId === '#'
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      );
    });


  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const sections =
    document.querySelectorAll(
      'main section[id]'
    );

  const navLinks =
    document.querySelectorAll(
      '.site-nav a[href^="#"]'
    );

  if (
    sections.length &&
    navLinks.length &&
    'IntersectionObserver' in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.id;

            navLinks.forEach((link) => {

              link.classList.toggle(
                'active',
                link.getAttribute(
                  'href'
                ) === `#${id}`
              );

            });
          });

        },
        {
          rootMargin:
            '-30% 0px -60% 0px',
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(
        section
      );
    });
  }


  /* =========================================
     ESC KEY
     CLOSE MOBILE MENU
  ========================================= */

  document.addEventListener(
    'keydown',
    (event) => {

      if (
        event.key !== 'Escape'
      ) {
        return;
      }

      if (
        siteNav &&
        siteNav.classList.contains(
          'open'
        )
      ) {

        siteNav.classList.remove(
          'open'
        );

        if (menuToggle) {
          menuToggle.setAttribute(
            'aria-expanded',
            'false'
          );
        }

        document.body.style.overflow =
          '';
      }
    }
  );

});