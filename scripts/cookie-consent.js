const GA_MEASUREMENT_ID = 'G-PNZRVSYMTM';

function loadGoogleAnalytics(cookieless = false) {
  if (window.gtagInitialized) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());

  if (cookieless) {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    });

    gtag('config', GA_MEASUREMENT_ID, {
      storage: 'none',
      client_storage: 'none',
      anonymize_ip: true,
    });
  } else {
    gtag('consent', 'default', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });

    gtag('config', GA_MEASUREMENT_ID);
  }

  window.gtagInitialized = true;
}

function checkConsent() {
  const consent = localStorage.getItem('cookie_consent');
  if (consent === 'accepted') {
    loadGoogleAnalytics(false);
    hideBanner();
  } else if (consent === 'declined') {
    loadGoogleAnalytics(true);
    hideBanner();
  } else {
    showBanner();
  }
}

function showBanner() {
  document.getElementById('cookie-consent-banner').classList.remove('hidden');
}

function hideBanner() {
  document.getElementById('cookie-consent-banner').classList.add('hidden');
}

function acceptCookies() {
  localStorage.setItem('cookie_consent', 'accepted');
  loadGoogleAnalytics(false);
  hideBanner();
}

function declineCookies() {
  localStorage.setItem('cookie_consent', 'declined');
  loadGoogleAnalytics(true);
  hideBanner();
}

document.getElementById('cookie-accept').addEventListener('click', acceptCookies);
document.getElementById('cookie-decline').addEventListener('click', declineCookies);

checkConsent();
