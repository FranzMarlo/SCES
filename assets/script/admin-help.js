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
  
    const myAccountButton = document.getElementById("myAccountButton");
    const myAccountModal = document.getElementById("myAccountModal");
    const myAccountContent = document.getElementById(
      "myAccountContent"
    );
    const closeMyAccountModal = document.getElementById(
      "closeMyAccountModal"
    );
    const myAccountPCTab = document.getElementById("myAccountPCTab");
    const myAccountMobileTab = document.getElementById(
      "myAccountMobileTab"
    );
    const myAccountPC = document.getElementById("myAccountPC");
    const myAccountMobile = document.getElementById("myAccountMobile");
    const myAccountTop = document.getElementById("myAccountTop");
  
    myAccountButton.addEventListener("click", function () {
      myAccountModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      myAccountPC.style.display = "flex";
      myAccountMobile.style.display = "none";
      myAccountPCTab.classList.add("active");
      myAccountMobileTab.classList.remove("active");
    });
    closeMyAccountModal.addEventListener("click", function () {
      myAccountContent.scrollTop = 0;
      myAccountModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
    myAccountPCTab.addEventListener("click", function () {
      myAccountPC.style.display = "flex";
      myAccountMobile.style.display = "none";
      myAccountPCTab.classList.add("active");
      myAccountMobileTab.classList.remove("active");
    });
    myAccountMobileTab.addEventListener("click", function () {
      myAccountPC.style.display = "none";
      myAccountMobile.style.display = "flex";
      myAccountPCTab.classList.remove("active");
      myAccountMobileTab.classList.add("active");
    });
  
    myAccountTop.onclick = () => {
      myAccountContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    const learningMaterialButton = document.getElementById("learningMaterialButton");
    const learningMaterialModal = document.getElementById("learningMaterialModal");
    const learningMaterialContent = document.getElementById(
      "learningMaterialContent"
    );
    const closeLearningMaterialModal = document.getElementById(
      "closeLearningMaterialModal"
    );
    const learningMaterialPCTab = document.getElementById("learningMaterialPCTab");
    const learningMaterialMobileTab = document.getElementById(
      "learningMaterialMobileTab"
    );
    const learningMaterialPC = document.getElementById("learningMaterialPC");
    const learningMaterialMobile = document.getElementById("learningMaterialMobile");
    const learningMaterialTop = document.getElementById("learningMaterialTop");
  
    learningMaterialButton.addEventListener("click", function () {
      learningMaterialModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      learningMaterialPC.style.display = "flex";
      learningMaterialMobile.style.display = "none";
      learningMaterialPCTab.classList.add("active");
      learningMaterialMobileTab.classList.remove("active");
    });
    closeLearningMaterialModal.addEventListener("click", function () {
      learningMaterialContent.scrollTop = 0;
      learningMaterialModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
    learningMaterialPCTab.addEventListener("click", function () {
      learningMaterialPC.style.display = "flex";
      learningMaterialMobile.style.display = "none";
      learningMaterialPCTab.classList.add("active");
      learningMaterialMobileTab.classList.remove("active");
    });
    learningMaterialMobileTab.addEventListener("click", function () {
      learningMaterialPC.style.display = "none";
      learningMaterialMobile.style.display = "flex";
      learningMaterialPCTab.classList.remove("active");
      learningMaterialMobileTab.classList.add("active");
    });
  
    learningMaterialTop.onclick = () => {
      learningMaterialContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    const usageGuidesButton = document.getElementById("usageGuidesButton");
    const usageGuidesModal = document.getElementById("usageGuidesModal");
    const usageGuidesContent = document.getElementById(
      "usageGuidesContent"
    );
    const closeUsageGuidesModal = document.getElementById(
      "closeUsageGuidesModal"
    );
    const usageGuidesPCTab = document.getElementById("usageGuidesPCTab");
    const usageGuidesMobileTab = document.getElementById(
      "usageGuidesMobileTab"
    );
    const usageGuidesPC = document.getElementById("usageGuidesPC");
    const usageGuidesMobile = document.getElementById("usageGuidesMobile");
    const usageGuidesTop = document.getElementById("usageGuidesTop");
  
    usageGuidesButton.addEventListener("click", function () {
      usageGuidesModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      usageGuidesPC.style.display = "flex";
      usageGuidesMobile.style.display = "none";
      usageGuidesPCTab.classList.add("active");
      usageGuidesMobileTab.classList.remove("active");
    });
    closeUsageGuidesModal.addEventListener("click", function () {
      usageGuidesContent.scrollTop = 0;
      usageGuidesModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
    usageGuidesPCTab.addEventListener("click", function () {
      usageGuidesPC.style.display = "flex";
      usageGuidesMobile.style.display = "none";
      usageGuidesPCTab.classList.add("active");
      usageGuidesMobileTab.classList.remove("active");
    });
    usageGuidesMobileTab.addEventListener("click", function () {
      usageGuidesPC.style.display = "none";
      usageGuidesMobile.style.display = "flex";
      usageGuidesPCTab.classList.remove("active");
      usageGuidesMobileTab.classList.add("active");
    });
  
    usageGuidesTop.onclick = () => {
      usageGuidesContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    
    const learningInquiriesButton = document.getElementById("learningInquiriesButton");
    const learningInquiriesModal = document.getElementById("learningInquiriesModal");
    const learningInquiriesContent = document.getElementById(
      "learningInquiriesContent"
    );
    const closeLearningInquiriesModal = document.getElementById(
      "closeLearningInquiriesModal"
    );
    const learningInquiriesPC = document.getElementById("learningInquiriesPC");
    const learningInquiriesTop = document.getElementById("learningInquiriesTop");
  
    learningInquiriesButton.addEventListener("click", function () {
      learningInquiriesModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      learningInquiriesPC.style.display = "flex";
    });
    closeLearningInquiriesModal.addEventListener("click", function () {
      learningInquiriesContent.scrollTop = 0;
      learningInquiriesModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  
    learningInquiriesTop.onclick = () => {
      learningInquiriesContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    const faqBox = document.getElementById("faqBox");
    const faqModal = document.getElementById("faqModal");
    const faqContent = document.getElementById(
      "faqContent"
    );
    const closeFaqModal = document.getElementById(
      "closeFaqModal"
    );
    const faqPCTab = document.getElementById("faqPCTab");
    const faqMobileTab = document.getElementById(
      "faqMobileTab"
    );
    const faqPC = document.getElementById("faqPC");
    const faqMobile = document.getElementById("faqMobile");
    const faqTop = document.getElementById("faqTop");
    const faqSearch = document.getElementById("faqSearch");
    
    faqBox.addEventListener("click", function () {
      faqModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      faqPC.style.display = "flex";
      faqMobile.style.display = "none";
      faqPCTab.classList.add("active");
      faqMobileTab.classList.remove("active");
      filterQuestions();
    });
  
    closeFaqModal.addEventListener("click", function () {
      faqContent.scrollTop = 0;
      faqModal.style.display = "none";
      document.body.style.overflow = "auto";
      faqSearch.value = '';
    });
  
    faqTop.onclick = () => {
      faqContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    faqPCTab.addEventListener("click", function () {
      faqPC.style.display = "flex";
      faqMobile.style.display = "none";
      faqPCTab.classList.add("active");
      faqMobileTab.classList.remove("active");
    });
    faqMobileTab.addEventListener("click", function () {
      faqPC.style.display = "none";
      faqMobile.style.display = "flex";
      faqPCTab.classList.remove("active");
      faqMobileTab.classList.add("active");
    });
  
    const usageGuidesBox = document.getElementById("usageGuidesBox");
    usageGuidesBox.addEventListener("click", function () {
      usageGuidesModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      usageGuidesPC.style.display = "flex";
      usageGuidesMobile.style.display = "none";
      usageGuidesPCTab.classList.add("active");
      usageGuidesMobileTab.classList.remove("active");
    });
  
    const updatesBox = document.getElementById("updatesBox");
    updatesBox.addEventListener("click", function(){
      Swal.fire({
        icon: "info",
        title: "No Updates Found",
        confirmButtonColor: "#4CAF50",
        allowOutsideClick: false,
      });
    });
  
    window.onclick = function (event) {
      if (event.target == gettingStartedModal) {
        gettingStartedContent.scrollTop = 0;
        gettingStartedModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
      if (event.target == myAccountModal) {
        myAccountContent.scrollTop = 0;
        myAccountModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
      if (event.target == learningMaterialModal) {
        learningMaterialContent.scrollTop = 0;
        learningMaterialModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
      if (event.target == usageGuidesModal) {
        usageGuidesContent.scrollTop = 0;
        usageGuidesModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
      if (event.target == learningInquiriesModal) {
        learningInquiriesContent.scrollTop = 0;
        learningInquiriesModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
      if (event.target == faqModal) {
        faqContent.scrollTop = 0;
        faqModal.style.display = "none";
        document.body.style.overflow = "auto";
        faqSearch.value = '';
      }
    };
  
  
  });
  function filterQuestions() {
    const searchTerm = document
      .getElementById("faqSearch")
      .value.toLowerCase();
    const faqModal = document.getElementById("faqModal");
    const modalItems = faqModal.querySelectorAll(".modal-item");
  
    let anyVisiblePC = false;
    let anyVisibleMobile = false;
  
    // Loop through all subject items and filter by search term
    modalItems.forEach(function (modalItem) {
      const questionData = modalItem
        .getAttribute("data-question-id")
        .toLowerCase();
  
      if (
        questionData.includes(searchTerm)
      ) {
        if (modalItem.closest("#faqPC")) {
          modalItem.style.display = "flex";
          anyVisiblePC = true;
        } else if (modalItem.closest("#faqMobile")) {
          modalItem.style.display = "flex";
          anyVisibleMobile = true;
        }
      } else {
        modalItem.style.display = "none";
      }
    });
    let modalEnd = document.getElementById('faqContent').querySelector(".modal-end");
    let noDataBoxPC = document
      .getElementById("faqPC")
      .querySelector(".modal-no-data");
    if (!anyVisiblePC) {
      if (!noDataBoxPC) {
        noDataBoxPC = document.createElement("div");
        noDataBoxPC.classList.add("modal-no-data");
        noDataBoxPC.innerHTML = `
                  <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                  <h1>No topic found.</h1>
              `;
        document.getElementById("faqPC").appendChild(noDataBoxPC);
        modalEnd.style.display = 'none';
      }
    } else if (noDataBoxPC) {
      document.getElementById("faqPC").removeChild(noDataBoxPC);
      modalEnd.style.display = 'flex';
    }
  
    let noDataBoxMobile = document
      .getElementById("faqMobile")
      .querySelector(".modal-no-data");
    if (!anyVisibleMobile) {
      if (!noDataBoxMobile) {
        noDataBoxMobile = document.createElement("div");
        noDataBoxMobile.classList.add("modal-no-data");
        noDataBoxMobile.innerHTML = `
                  <img src="/SCES/assets/images/no-data-icon.png" alt="no-data-icon.png">
                  <h1>No topic found.</h1>
              `;
        document
          .getElementById("faqMobile")
          .appendChild(noDataBoxMobile);
          modalEnd.style.display = 'none';
      }
    } else if (noDataBoxMobile) {
      document.getElementById("faqMobile").removeChild(noDataBoxMobile);
      modalEnd.style.display = 'flex';
    }
  }
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
  