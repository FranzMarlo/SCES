document.addEventListener("DOMContentLoaded", function () {
  const gettingStartedButton = document.getElementById("gettingStartedButton");
  const gettingStartedModal = document.getElementById("gettingStartedModal");
  const gettingStartedContent = document.getElementById(
    "gettingStartedContent"
  );
  const closeGettingStartedModal = document.getElementById(
    "closeGettingStartedModal"
  );
  const gettingStartedPCTab = document.getElementById("gettingStartedPCTab");
  const gettingStartedMobileTab = document.getElementById(
    "gettingStartedMobileTab"
  );
  const gettingStartedPC = document.getElementById("gettingStartedPC");
  const gettingStartedMobile = document.getElementById("gettingStartedMobile");
  const gettingStartedTop = document.getElementById("gettingStartedTop");

  gettingStartedButton.addEventListener("click", function () {
    gettingStartedModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    gettingStartedPC.style.display = "flex";
    gettingStartedMobile.style.display = "none";
    gettingStartedPCTab.classList.add("active");
    gettingStartedMobileTab.classList.remove("active");
  });
  closeGettingStartedModal.addEventListener("click", function () {
    gettingStartedContent.scrollTop = 0;
    gettingStartedModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
  window.onclick = function (event) {
    if (event.target == gettingStartedModal) {
      gettingStartedContent.scrollTop = 0;
      gettingStartedModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };
  gettingStartedPCTab.addEventListener("click", function () {
    gettingStartedPC.style.display = "flex";
    gettingStartedMobile.style.display = "none";
    gettingStartedPCTab.classList.add("active");
    gettingStartedMobileTab.classList.remove("active");
  });
  gettingStartedMobileTab.addEventListener("click", function () {
    gettingStartedPC.style.display = "none";
    gettingStartedMobile.style.display = "flex";
    gettingStartedPCTab.classList.remove("active");
    gettingStartedMobileTab.classList.add("active");
  });

  gettingStartedTop.onclick = () => {
    gettingStartedContent.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
});
function openFullscreen(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  lightboxImg.src = img.src;
  lightbox.style.display = "flex";
}
function closeFullscreen() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}
