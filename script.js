var scrollpos = window.scrollY;
      var header = document.getElementById("header");
      var navcontent = document.getElementById("nav-content");
      var navaction = document.getElementById("navAction");
      var brandname = document.getElementById("brandname");
      var toToggle = document.querySelectorAll(".toggleColour");

      document.addEventListener("scroll", function () {
        /*Apply classes for slide in bar*/
        scrollpos = window.scrollY;

        if (scrollpos > 10) {
          header.classList.add("bg-black");
          navaction.classList.remove("bg-black");
          navaction.classList.add("gradient");
          navaction.classList.remove("text-gray-800");
          navaction.classList.add("text-white");
          //Use to switch toggleColour colours
          for (var i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-gray-800");
            toToggle[i].classList.remove("text-white");
          }
          header.classList.add("shadow");
          navcontent.classList.add("bg-black");
        } else {
          header.classList.remove("bg-black");
          navaction.classList.remove("gradient");
          navaction.classList.add("bg-black");
          navaction.classList.remove("text-white");
          navaction.classList.add("text-gray-800");
          //Use to switch toggleColour colours
          for (var i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-white");
            toToggle[i].classList.remove("text-gray-800");
          }

          header.classList.remove("shadow");
          navcontent.classList.remove("bg-black");
        }
      });


      /*Toggle dropdown list*/
      /*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

      var navMenuDiv = document.getElementById("nav-content");
      var navMenu = document.getElementById("nav-toggle");

      document.onclick = check;
      function check(e) {
        var target = (e && e.target) || (event && event.srcElement);

        //Nav Menu
        if (!checkParent(target, navMenuDiv)) {
          // click NOT on the menu
          if (checkParent(target, navMenu)) {
            // click on the link
            if (navMenuDiv.classList.contains("hidden")) {
              navMenuDiv.classList.remove("hidden");
            } else {
              navMenuDiv.classList.add("hidden");
            }
          } else {
            // click both outside link and outside menu, hide menu
            navMenuDiv.classList.add("hidden");
          }
        }
      }
      function checkParent(t, elm) {
        while (t.parentNode) {
          if (t == elm) {
            return true;
          }
          t = t.parentNode;
        }
        return false;
      }


// O código abaixo deve ser movido para o seu arquivo script.js
        // para manter a separação de responsabilidades.
        // Apenas para demonstração, está aqui.

        $(document).ready(function() {
            const $carouselWrapper = $('#carousel-wrapper');
            const $carouselItems = $carouselWrapper.children('.carousel-item');
            const $prevBtn = $('#carousel-prev');
            const $nextBtn = $('#carousel-next');

            let currentIndex = 0;
            let itemsPerView = 1; // Default para mobile
            let itemWidth = 0; // Será calculado dinamicamente

            function updateItemsPerView() {
                if (window.innerWidth >= 1024) {
                    itemsPerView = 4;
                } else if (window.innerWidth >= 768) {
                    itemsPerView = 3;
                } else {
                    itemsPerView = 1;
                }
                // Recalcula a largura do item baseado no número de itens visíveis
                // Se $carouselItems.first() não existir, itemWidth será 0, evitando erro
                itemWidth = $carouselItems.first().outerWidth(true); // Inclui margem/padding
                if (itemWidth === 0) { // Fallback caso o elemento ainda não tenha sido renderizado com largura
                     itemWidth = $carouselItems.first().width() + parseInt($carouselItems.first().css('padding-left')) * 2;
                }
                updateCarouselPosition();
            }

            function updateCarouselPosition() {
                if ($carouselItems.length === 0) return; // Evita erro se não houver itens

                const totalItems = $carouselItems.length;
                let maxIndex = totalItems - itemsPerView;

                if (maxIndex < 0) maxIndex = 0; // Garante que não vá para índice negativo se poucos itens

                if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                if (currentIndex < 0) {
                    currentIndex = 0;
                }
                
                const offset = -currentIndex * itemWidth;
                $carouselWrapper.css('transform', `translateX(${offset}px)`);

                // Habilitar/Desabilitar botões
                $prevBtn.prop('disabled', currentIndex === 0).toggleClass('opacity-50 cursor-not-allowed', currentIndex === 0);
                $nextBtn.prop('disabled', currentIndex >= maxIndex).toggleClass('opacity-50 cursor-not-allowed', currentIndex >= maxIndex);
            }

            $prevBtn.on('click', function() {
                currentIndex--;
                updateCarouselPosition();
            });

            $nextBtn.on('click', function() {
                currentIndex++;
                updateCarouselPosition();
            });

            // Atualiza ao carregar e redimensionar
            $(window).on('resize', function() {
                updateItemsPerView();
            }).trigger('resize'); // Dispara uma vez para inicializar
        });