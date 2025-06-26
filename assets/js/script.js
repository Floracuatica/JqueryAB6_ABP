// ===== Galería de Imágenes - jQuery =====

$(document).ready(function () {
  const $thumbnails = $(".thumbnail");
  const $modal = $("#modal");
  const $modalImage = $("#modalImage");
  const $closeBtn = $("#closeBtn");
  const $prevBtn = $("#prev");
  const $nextBtn = $("#next");

  let currentIndex = 0; // Índice de la imagen actualmente mostrada

  // --- Función para abrir el modal con la imagen seleccionada ---
 function openModal(index) {
  currentIndex = index;
  const imgSrc = $thumbnails.eq(currentIndex).attr("src");
  $modalImage.attr("src", imgSrc);
  $("#caption").hide().text($thumbnails.eq(currentIndex).attr("alt")).slideDown(300); // pie de foto
  $modal.fadeIn(250).addClass("open");
}


  // --- Función para cerrar el modal ---
  function closeModal() {
    $modal.fadeOut(200, function () {
      $modal.removeClass("open");
    });
  }

 function changeImage(direction) {
  if (direction === "prev") {
    currentIndex = (currentIndex - 1 + $thumbnails.length) % $thumbnails.length;
  } else if (direction === "next") {
    currentIndex = (currentIndex + 1) % $thumbnails.length;
  }
  const newSrc = $thumbnails.eq(currentIndex).attr("src");
  $modalImage.fadeOut(150, function () {
    $(this).attr("src", newSrc).fadeIn(150);
    $("#caption").slideUp(150, function () {
      $(this).text($thumbnails.eq(currentIndex).attr("alt")).slideDown(150);
    });
  });
}


  // --- Eventos ---
  $thumbnails.on("click", function () {
    const index = $thumbnails.index(this);
    openModal(index);
  });

  $closeBtn.on("click", closeModal);

  // Cerrar al hacer clic fuera de la imagen
  $modal.on("click", function (e) {
    if (!$(e.target).is("img, button, span")) {
      closeModal();
    }
  });

  // Navegación con botones
  $prevBtn.on("click", function (e) {
    e.stopPropagation();
    changeImage("prev");
  });

  $nextBtn.on("click", function (e) {
    e.stopPropagation();
    changeImage("next");
  });

  // Navegación con teclado
  $(document).on("keydown", function (e) {
    if (!$modal.hasClass("open")) return; // Ignorar si el modal está cerrado

    switch (e.key) {
      case "ArrowLeft":
        changeImage("prev");
        break;
      case "ArrowRight":
        changeImage("next");
        break;
      case "Escape":
        closeModal();
        break;
    }
  });
});
