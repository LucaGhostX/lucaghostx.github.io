// Pure dynamic site: all data is loaded from config.json

// SVG Icons Definition
const ICONS = {
  chevronRight: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  share: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  check: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  youtube: `<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
};

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `${ICONS.check} <span>${message}</span>`;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

// Share or Copy link function
async function handleShare(url, title, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  const targetUrl = url || window.location.href;
  const shareTitle = title || document.title;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        url: targetUrl
      });
      return;
    } catch (err) {
      // User cancelled or unsupported share target, fallback to copy
      if (err.name !== "AbortError") {
        copyToClipboard(targetUrl);
      }
    }
  } else {
    copyToClipboard(targetUrl);
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Link copiato negli appunti!");
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const input = document.createElement("input");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
    showToast("Link copiato negli appunti!");
  } catch (e) {
    showToast("Impossibile copiare il link");
  }
  document.body.removeChild(input);
}

// Render the site from config
function renderSite(config) {
  // Apply theme if specified
  if (config.theme) {
    if (config.theme.backgroundGradient) {
      document.body.style.background = config.theme.backgroundGradient;
      document.body.style.backgroundRepeat = "no-repeat";
    } else if (config.theme.backgroundColor) {
      document.body.style.background = config.theme.backgroundColor;
    }
    if (config.theme.buttonBorderColor) {
      document.documentElement.style.setProperty("--button-border", config.theme.buttonBorderColor);
    }
    if (config.theme.textColor) {
      document.documentElement.style.setProperty("--text-primary", config.theme.textColor);
    }
  }

  // Update metadata & head elements dynamically
  if (config.profile && config.profile.name) {
    document.title = config.siteTitle || `${config.profile.name} | Links`;
  }
  if (config.metaDescription) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = config.metaDescription;
  }
  if (config.profile && config.profile.avatar) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = config.profile.avatar;
  }

  // Update profile
  const avatarWrapper = document.getElementById("avatarWrapper");
  const avatarImg = document.getElementById("profileAvatar");
  const profileName = document.getElementById("profileName");
  const profileBio = document.getElementById("profileBio");

  if (avatarWrapper && avatarImg && config.profile && config.profile.avatar) {
    avatarImg.src = config.profile.avatar;
    avatarImg.alt = config.profile.name || "Avatar";
    avatarWrapper.style.display = "block";
  }

  if (profileName && config.profile && config.profile.name) {
    profileName.textContent = config.profile.name;
  }

  if (profileBio) {
    if (config.profile && config.profile.bio) {
      profileBio.textContent = config.profile.bio;
      profileBio.style.display = "block";
    } else {
      profileBio.style.display = "none";
    }
  }

  // Privacy badge
  const privacyBadge = document.getElementById("privacyBadge");
  const privacyBadgeText = document.getElementById("privacyBadgeText");
  if (privacyBadge) {
    if (config.privacy && config.privacy.gdprCompliant && config.privacy.showBadge !== false) {
      if (privacyBadgeText) {
        privacyBadgeText.textContent = config.privacy.badgeText || "Zero Cookie • 100% GDPR Compliant";
      }
      privacyBadge.style.display = "inline-flex";
    } else {
      privacyBadge.style.display = "none";
    }
  }

  // Render main links
  const linksContainer = document.getElementById("linksContainer");
  if (linksContainer && config.links) {
    linksContainer.innerHTML = "";

    config.links.forEach(link => {
      // Skip inactive links (default is true if not explicitly set to false)
      if (link.active === false) {
        return;
      }

      const card = document.createElement("a");
      card.className = "link-card";
      card.href = link.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", link.title);

      // Icon badge
      const iconBadge = document.createElement("div");
      iconBadge.className = "link-icon-badge";
      if (link.iconBg) {
        iconBadge.style.background = link.iconBg;
      }
      
      if (link.icon) {
        const iconImg = document.createElement("img");
        iconImg.src = link.icon;
        iconImg.alt = link.title;
        iconImg.loading = "lazy";
        iconBadge.appendChild(iconImg);
      }
      card.appendChild(iconBadge);

      // Title
      const titleSpan = document.createElement("span");
      titleSpan.className = "link-title";
      titleSpan.textContent = link.title;
      card.appendChild(titleSpan);

      // Right arrow icon
      const arrowIcon = document.createElement("div");
      arrowIcon.className = "link-arrow-icon";
      arrowIcon.innerHTML = ICONS.chevronRight;
      arrowIcon.setAttribute("aria-hidden", "true");
      card.appendChild(arrowIcon);

      linksContainer.appendChild(card);
    });
  }

  // Render social links
  const socialsContainer = document.getElementById("socialsContainer");
  if (socialsContainer && config.socials) {
    socialsContainer.innerHTML = "";

    config.socials.forEach(item => {
      // Skip inactive socials (default is true if not explicitly set to false)
      if (item.active === false) {
        return;
      }

      const socialLink = document.createElement("a");
      socialLink.className = "social-icon-link";
      socialLink.href = item.url;
      socialLink.target = "_blank";
      socialLink.rel = "noopener noreferrer";
      socialLink.setAttribute("aria-label", item.title || item.platform);

      const iconSvg = ICONS[item.platform.toLowerCase()] || ICONS.share;
      socialLink.innerHTML = iconSvg;

      socialsContainer.appendChild(socialLink);
    });
  }

  // Privacy & Cookie Policy Modal setup
  setupPrivacyModal(config);
}

// Setup interactive Privacy & Cookie Policy Modal
function setupPrivacyModal(config) {
  const privacyBadge = document.getElementById("privacyBadge");
  const modal = document.getElementById("privacyModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOkBtn = document.getElementById("modalOkBtn");

  if (!modal || !config.privacyPolicy) return;

  const policy = config.privacyPolicy;

  // Title
  if (modalTitle) {
    modalTitle.textContent = policy.title || "Informativa sulla Privacy & Cookie Policy";
  }

  // Body content
  if (modalBody) {
    modalBody.innerHTML = "";

    if (policy.description) {
      const intro = document.createElement("p");
      intro.className = "policy-intro";
      intro.textContent = policy.description;
      modalBody.appendChild(intro);
    }

    if (Array.isArray(policy.points)) {
      policy.points.forEach(point => {
        const item = document.createElement("div");
        item.className = "policy-point";

        const title = document.createElement("h3");
        title.className = "policy-point-title";
        title.innerHTML = `${ICONS.shield} <span>${point.title}</span>`;

        const text = document.createElement("p");
        text.className = "policy-point-text";
        text.textContent = point.text;

        item.appendChild(title);
        item.appendChild(text);
        modalBody.appendChild(item);
      });
    }
  }

  // Footer button
  if (modalOkBtn) {
    modalOkBtn.textContent = policy.closeButtonText || "Chiudi";
  }

  // Open & Close handlers
  const openModal = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (privacyBadge) {
    privacyBadge.onclick = openModal;
    privacyBadge.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    };
  }

  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  if (modalOkBtn) modalOkBtn.onclick = closeModal;

  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// Initial loader: fetch config.json and dynamically build the entire page
async function loadConfig() {
  try {
    const response = await fetch("./config.json?v=" + Date.now(), { cache: "no-store" });
    if (response.ok) {
      const config = await response.json();
      renderSite(config);
      return;
    } else {
      console.error("Failed to load config.json:", response.status, response.statusText);
    }
  } catch (err) {
    console.error("Error fetching config.json:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadConfig);
