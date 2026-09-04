/* =========================================================
   ERYILMAZ YAPI İNŞAAT
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const header = document.getElementById("header");

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const aiButton = document.getElementById("aiButton");
    const aiChat = document.getElementById("aiChat");
    const aiClose = document.getElementById("aiClose");

    const aiInput = document.getElementById("aiInput");
    const aiSend = document.getElementById("aiSend");
    const aiMessages = document.getElementById("aiMessages");

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    const year = document.getElementById("year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 700);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const handleHeader = () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });

    handleHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");

            const opened =
                mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                mobileMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a, .mobile-menu a"
        );


    const updateActiveNavigation = () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.getBoundingClientRect().top;

            if (top <= 150) {
                current = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, " +
        ".project-card, " +
        ".process-item, " +
        ".about-content, " +
        ".about-image, " +
        ".intro-title, " +
        ".intro-text, " +
        ".contact-intro, " +
        ".contact-form-wrapper"
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(35px)";
        element.style.transition =
            "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target;

                    element.style.opacity = "1";
                    element.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(element);

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       STAGGER SERVICES
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${Math.min(index * 60, 360)}ms`;

    });


    /* =====================================================
       PROJECT IMAGE PARALLAX
    ===================================================== */

    const projectImages =
        document.querySelectorAll(".project-image");


    const updateProjectParallax = () => {

        if (window.innerWidth < 800) {
            return;
        }

        projectImages.forEach(image => {

            const rect =
                image.getBoundingClientRect();

            const center =
                window.innerHeight / 2;

            const distance =
                (rect.top + rect.height / 2 - center);

            const movement =
                Math.max(
                    -12,
                    Math.min(12, distance * -0.025)
                );

            image.style.backgroundPosition =
                `center calc(50% + ${movement}px)`;

        });

    };


    window.addEventListener(
        "scroll",
        updateProjectParallax,
        { passive: true }
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById("name")?.value.trim();

                const phone =
                    document.getElementById("phone")?.value.trim();

                const service =
                    document.getElementById("service")?.value.trim();

                const message =
                    document.getElementById("message")?.value.trim();


                if (!name || !phone || !message) {

                    showFormMessage(
                        "Lütfen gerekli alanları doldurun.",
                        false
                    );

                    return;
                }


                /*
                 * WhatsApp mesajı hazırlanıyor.
                 */

                const whatsappMessage =
                    `Merhaba Eryılmaz Yapı İnşaat.%0A%0A` +
                    `Ad Soyad: ${encodeURIComponent(name)}%0A` +
                    `Telefon: ${encodeURIComponent(phone)}%0A` +
                    `Hizmet: ${encodeURIComponent(service || "Belirtilmedi")}%0A` +
                    `Mesaj: ${encodeURIComponent(message)}`;


                const whatsappURL =
                    `https://wa.me/905312990472?text=${whatsappMessage}`;


                showFormMessage(
                    "Talebiniz hazırlanıyor, WhatsApp'a yönlendiriliyorsunuz.",
                    true
                );


                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener"
                    );

                }, 700);

            }
        );

    }


    function showFormMessage(text, success) {

        if (!formMessage) return;

        formMessage.textContent = text;

        formMessage.style.color =
            success
                ? "var(--gold-light)"
                : "#d88";

    }


    /* =====================================================
       AI CHAT
    ===================================================== */

    if (aiButton && aiChat) {

        aiButton.addEventListener("click", () => {

            aiChat.classList.toggle("active");

            if (aiChat.classList.contains("active")) {

                setTimeout(() => {

                    if (aiInput) {
                        aiInput.focus();
                    }

                }, 250);

            }

        });

    }


    if (aiClose && aiChat) {

        aiClose.addEventListener("click", () => {

            aiChat.classList.remove("active");

        });

    }


    /* =====================================================
       AI QUICK QUESTIONS
    ===================================================== */

    const quickButtons =
        document.querySelectorAll(
            ".ai-quick-actions button"
        );


    quickButtons.forEach(button => {

        button.addEventListener("click", () => {

            const question =
                button.dataset.question ||
                button.textContent.trim();

            sendAIMessage(question);

        });

    });


    /* =====================================================
       AI SEND
    ===================================================== */

    if (aiSend) {

        aiSend.addEventListener("click", () => {

            sendAIMessage();

        });

    }


    if (aiInput) {

        aiInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    sendAIMessage();

                }

            }
        );

    }


    function sendAIMessage(forcedMessage = null) {

        const message =
            forcedMessage ||
            aiInput?.value.trim();


        if (!message) {
            return;
        }


        addAIMessage(
            message,
            true
        );


        if (aiInput) {
            aiInput.value = "";
        }


        /*
         * Gerçek yapay zekâ bağlantısı
         * backend tarafında kurulacak.
         *
         * Şimdilik profesyonel bir
         * müşteri asistanı arayüzü çalışıyor.
         */

        setTimeout(() => {

            const response =
                generateAIResponse(message);

            addAIMessage(
                response,
                false
            );

        }, 650);

    }


    function addAIMessage(text, user = false) {

        if (!aiMessages) return;

        const message =
            document.createElement("div");

        message.className =
            user
                ? "ai-message user"
                : "ai-message";


        /*
         * Kullanıcı mesajını HTML olarak
         * yorumlamamak için textContent kullanıyoruz.
         */

        message.textContent = text;


        aiMessages.appendChild(message);

        aiMessages.scrollTop =
            aiMessages.scrollHeight;

    }


    /* =====================================================
       AI LOCAL RESPONSES
    ===================================================== */

    function generateAIResponse(message) {

        const text =
            message
                .toLocaleLowerCase("tr-TR");


        if (
            text.includes("hizmet") ||
            text.includes("ne yap") ||
            text.includes("iş") ||
            text.includes("yapıyorsunuz")
        ) {

            return (
                "Eryılmaz Yapı İnşaat olarak inşaat, " +
                "alçı, boya, sıva, dış cephe, mantolama, " +
                "dekoratif uygulamalar, seramik, fayans, " +
                "alçıpan, çatı, kiremit, demir işleri, " +
                "prefabrik ve çeşitli yapı uygulamalarında " +
                "hizmet sunuyoruz."
            );

        }


        if (
            text.includes("teklif") ||
            text.includes("fiyat") ||
            text.includes("ücret") ||
            text.includes("maliyet")
        ) {

            return (
                "Projeniz için doğru bir teklif hazırlayabilmemiz " +
                "için yapılacak işi, yaklaşık alanı ve " +
                "bulunduğunuz bölgeyi paylaşabilirsiniz. " +
                "Hızlı iletişim için WhatsApp butonundan bize ulaşabilirsiniz."
            );

        }


        if (
            text.includes("whatsapp") ||
            text.includes("telefon") ||
            text.includes("ulaş") ||
            text.includes("iletişim")
        ) {

            return (
                "Bize WhatsApp üzerinden 0531 299 04 72 " +
                "numarasından ulaşabilirsiniz."
            );

        }


        if (
            text.includes("mail") ||
            text.includes("gmail") ||
            text.includes("e-posta") ||
            text.includes("email")
        ) {

            return (
                "E-posta üzerinden iletişim için " +
                "info@eryilmazinsaat48.com adresini kullanabilirsiniz."
            );

        }


        if (
            text.includes("merhaba") ||
            text.includes("selam") ||
            text.includes("hey")
        ) {

            return (
                "Merhaba! Eryılmaz Yapı İnşaat'a hoş geldiniz. " +
                "Projeniz hakkında size yardımcı olmaktan memnuniyet duyarım."
            );

        }


        if (
            text.includes("alçı") ||
            text.includes("alcipan")
        ) {

            return (
                "Alçı ve alçıpan uygulamaları, " +
                "asma tavan ve iç mekân yüzey çalışmalarında " +
                "profesyonel çözümler sunuyoruz."
            );

        }


        if (
            text.includes("boya") ||
            text.includes("sıva") ||
            text.includes("siva")
        ) {

            return (
                "İç ve dış cephe boya ile sıva uygulamaları " +
                "yapıyoruz. Mekânın durumuna göre uygun " +
                "uygulama yöntemi belirlenebilir."
            );

        }


        if (
            text.includes("seramik") ||
            text.includes("fayans")
        ) {

            return (
                "Banyo, mutfak ve yaşam alanları için " +
                "seramik ve fayans uygulamaları gerçekleştiriyoruz."
            );

        }


        if (
            text.includes("çatı") ||
            text.includes("cati") ||
            text.includes("kiremit")
        ) {

            return (
                "Çatı ve kiremit uygulamaları ile bakım ve " +
                "yenileme çalışmalarında yardımcı olabiliriz."
            );

        }


        return (
            "Projenizle ilgili size yardımcı olabilirim. " +
            "Hizmetlerimiz, teklif, fiyat, iletişim veya " +
            "WhatsApp hakkında bilgi almak ister misiniz?"
        );

    }


    /* =====================================================
       CLOSE AI WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!aiChat || !aiButton) {
            return;
        }

        const insideChat =
            aiChat.contains(event.target);

        const clickedButton =
            aiButton.contains(event.target);

        if (
            aiChat.classList.contains("active") &&
            !insideChat &&
            !clickedButton
        ) {

            aiChat.classList.remove("active");

        }

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }


        if (aiChat) {
            aiChat.classList.remove("active");
        }


        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }


        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    });


    /* =====================================================
       DISABLE BROKEN HASH JUMPS
    ===================================================== */

    if (window.location.hash) {

        setTimeout(() => {

            const target =
                document.querySelector(
                    window.location.hash
                );

            if (target) {

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                window.scrollTo({
                    top:
                        target.offsetTop -
                        headerHeight,
                    behavior: "smooth"
                });

            }

        }, 100);

    }


    /* =====================================================
       INITIAL PARALLAX
    ===================================================== */

    updateProjectParallax();

});
