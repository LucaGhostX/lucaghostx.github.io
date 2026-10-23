// Pure dynamic site: all data is loaded from config.json

// SVG UI Icons Definition
const ICONS = {
  chevronRight: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
};

// UI text fallbacks
let appMessages = {
  privacyTitle: "Informativa sulla Privacy & Cookie Policy",
  privacyClose: "Chiudi",
  privacyTooltip: "Clicca per leggere l'informativa sulla privacy"
};

// Sanitize SVG content to prevent XSS / malicious code injection
function sanitizeSvg(svgText) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg || doc.querySelector("parsererror")) return null;

    // Remove dangerous tags
    const dangerousTags = ["script", "foreignobject", "iframe", "embed", "object", "use", "animate", "set"];
    dangerousTags.forEach(tag => {
      svg.querySelectorAll(tag).forEach(el => el.remove());
    });

    // Remove event handlers and javascript: attributes
    const elements = [svg, ...svg.querySelectorAll("*")];
    elements.forEach(el => {
      for (const attr of Array.from(el.attributes)) {
        const name = attr.name.toLowerCase();
        const val = attr.value.trim().toLowerCase();
        if (name.startsWith("on") || val.startsWith("javascript:") || val.startsWith("data:")) {
          el.removeAttribute(attr.name);
        }
      }
    });

    return svg.outerHTML;
  } catch (e) {
    return null;
  }
}

// Render the site from config
function renderSite(config) {
  // Merge configurable messages if provided
  if (config.messages) {
    appMessages = { ...appMessages, ...config.messages };
  }

  // Apply theme if specified
  if (config.theme) {
    const root = document.documentElement;
    const theme = config.theme;

    if (theme.backgroundGradient) {
      document.body.style.background = theme.backgroundGradient;
      document.body.style.backgroundRepeat = "no-repeat";
    } else if (theme.backgroundColor) {
      document.body.style.background = theme.backgroundColor;
    }

    if (theme.backgroundColor) {
      root.style.setProperty("--bg-color-start", theme.backgroundColor);
      root.style.setProperty("--modal-bg", theme.modalBgColor || theme.backgroundColor);
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.content = theme.backgroundColor;
    }

    if (theme.buttonBorderColor) {
      root.style.setProperty("--button-border", theme.buttonBorderColor);
    }
    if (theme.buttonBorderHoverColor) {
      root.style.setProperty("--button-border-hover", theme.buttonBorderHoverColor);
    }
    if (theme.buttonBgColor) {
      root.style.setProperty("--button-bg", theme.buttonBgColor);
    }
    if (theme.buttonHoverBgColor) {
      root.style.setProperty("--button-hover-bg", theme.buttonHoverBgColor);
    }
    if (theme.buttonHoverShadow) {
      root.style.setProperty("--button-hover-shadow", theme.buttonHoverShadow);
    }
    if (theme.textColor) {
      root.style.setProperty("--text-primary", theme.textColor);
    }
    if (theme.textMutedColor) {
      root.style.setProperty("--text-muted", theme.textMutedColor);
    }
    if (theme.fontFamily) {
      root.style.setProperty("--font-family", theme.fontFamily);
      document.body.style.fontFamily = theme.fontFamily;
    }
    if (theme.socialColor) {
      root.style.setProperty("--social-color", theme.socialColor);
    }
    if (theme.socialHoverColor) {
      root.style.setProperty("--social-hover-color", theme.socialHoverColor);
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
  const privacyBadgeIcon = document.getElementById("privacyBadgeIcon");
  const privacyBadgeText = document.getElementById("privacyBadgeText");
  if (privacyBadge) {
    if (config.privacy && config.privacy.gdprCompliant && config.privacy.showBadge !== false) {
      if (privacyBadgeIcon) {
        privacyBadgeIcon.innerHTML = ICONS.shield;
      }
      if (privacyBadgeText) {
        privacyBadgeText.textContent = config.privacy.badgeText || "Zero Cookie • 100% GDPR Compliant";
      }
      privacyBadge.title = config.privacy.badgeTooltip || appMessages.privacyTooltip;
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

      const platformKey = (item.platform || "").toLowerCase().trim();
      const iconPath = item.icon || `assets/icons/socials/${platformKey}.svg`;

      // Set initial image element
      const img = document.createElement("img");
      img.src = iconPath;
      img.alt = item.title || item.platform;
      img.className = "social-icon-img";
      img.width = 26;
      img.height = 26;
      img.loading = "lazy";
      socialLink.appendChild(img);

      // Attempt to load inline SVG for smoother scaling and native styling
      if (iconPath.endsWith(".svg")) {
        fetch(iconPath)
          .then(res => {
            if (!res.ok) throw new Error("Icon fetch failed: " + iconPath);
            return res.text();
          })
          .then(svgText => {
            const cleanSvg = sanitizeSvg(svgText);
            if (cleanSvg) {
              socialLink.innerHTML = cleanSvg;
            }
          })
          .catch(() => {
            // Keep the <img> element if fetch fails or is not accessible
          });
      }

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

  const modalTitleIcon = document.getElementById("modalTitleIcon");
  if (modalTitleIcon) {
    modalTitleIcon.innerHTML = ICONS.shield;
  }

  // Title
  if (modalTitle) {
    modalTitle.textContent = policy.title || appMessages.privacyTitle;
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
    modalOkBtn.textContent = policy.closeButtonText || appMessages.privacyClose;
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
