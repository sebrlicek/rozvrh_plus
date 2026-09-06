(function () {
  'use strict';

  var BASE_STORE_KEY = 'rozvrh-plus-v2';
  var STORE_KEY = BASE_STORE_KEY;
  var OLD_STORE_KEY = 'rozvrh-plus';
  var DATA_MIGRATION_KEY = 'rozvrh-plus-data-owner';
  var AUTH_SESSION_KEY = 'rozvrh-plus-auth-session';
  var SUPABASE_URL = 'https://ibkkvlcylmfqujigttit.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_2bv1MUgHRPOa6ErJxjpvcQ_HjugvWUN';
  var INSTALL_DISMISS_KEY = 'rozvrh-plus-install-dismissed';
  var DAYS = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];
  var DAY_SHORT = ['Po', 'Út', 'St', 'Čt', 'Pá'];
  var COLORS = ['#6757e8', '#2878e6', '#0795a6', '#1b9a67', '#e19b22', '#e36b32', '#df466d', '#8d4bd4'];

  var icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>',
    schedule: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
    tasks: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h7M9 12h7M9 16h5M7 8h.01M7 12h.01M7 16h.01"/></svg>',
    exams: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 11.2V16c3 2.3 7 2.3 10 0v-4.8M21 9v6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    materials: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    notes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    stats: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.97 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.53-1H3v-4h.08A1.7 1.7 0 0 0 4.6 8.97a1.7 1.7 0 0 0-.34-1.88l-.06-.06L7.03 4.2l.06.06A1.7 1.7 0 0 0 8.97 4.6 1.7 1.7 0 0 0 10 3.08V3h4v.08a1.7 1.7 0 0 0 1.03 1.53 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    upload: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 15v5h14v-5"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14"/></svg>',
    file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    export: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
    install: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 15v4h14v-4"/></svg>'
  };

  var NAV = [
    { id: 'domu', label: 'Domů', icon: 'home', kicker: 'PŘEHLED' },
    { id: 'rozvrh', label: 'Rozvrh', icon: 'schedule', kicker: 'TÝDENNÍ PLÁN' },
    { id: 'ukoly', label: 'Úkoly', icon: 'tasks', kicker: 'CO JE POTŘEBA' },
    { id: 'zkousky', label: 'Zkoušky', icon: 'exams', kicker: 'PŘÍPRAVA' },
    { id: 'kalendar', label: 'Kalendář', icon: 'calendar', kicker: 'MĚSÍČNÍ PŘEHLED' },
    { id: 'materialy', label: 'Materiály', icon: 'materials', kicker: 'SOUBORY' },
    { id: 'poznamky', label: 'Poznámky', icon: 'notes', kicker: 'RYCHLÉ ZÁPISKY' },
    { id: 'statistiky', label: 'Statistiky', icon: 'stats', kicker: 'TVŮJ POKROK' },
    { id: 'nastaveni', label: 'Nastavení', icon: 'settings', kicker: 'PŘIZPŮSOBENÍ' }
  ];

  function id() {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
  }

  function isoOffset(days) {
    var date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return localISO(date);
  }

  function defaults() {
    return {
      version: 2,
      settings: { name: 'Student', theme: 'system', accent: '#6757e8' },
      lessons: [
        { id: id(), day: 0, start: '08:00', end: '08:45', name: 'Matematika', room: '214', teacher: 'Nováková', color: '#2878e6', notes: '' },
        { id: id(), day: 0, start: '08:55', end: '09:40', name: 'Český jazyk', room: '112', teacher: 'Svobodová', color: '#df466d', notes: '' },
        { id: id(), day: 0, start: '09:50', end: '10:35', name: 'Angličtina', room: '205', teacher: 'Johnson', color: '#8d4bd4', notes: '' },
        { id: id(), day: 1, start: '08:00', end: '08:45', name: 'Přírodopis', room: '301', teacher: 'Novotný', color: '#1b9a67', notes: '' },
        { id: id(), day: 1, start: '08:55', end: '09:40', name: 'Matematika', room: '214', teacher: 'Nováková', color: '#2878e6', notes: '' },
        { id: id(), day: 2, start: '08:00', end: '08:45', name: 'Český jazyk', room: '112', teacher: 'Svobodová', color: '#df466d', notes: '' },
        { id: id(), day: 2, start: '08:55', end: '09:40', name: 'Dějepis', room: '208', teacher: 'Dvořák', color: '#e19b22', notes: '' },
        { id: id(), day: 3, start: '08:00', end: '08:45', name: 'Angličtina', room: '205', teacher: 'Johnson', color: '#8d4bd4', notes: '' },
        { id: id(), day: 3, start: '08:55', end: '09:40', name: 'Informatika', room: 'PC1', teacher: 'Král', color: '#0795a6', notes: '' },
        { id: id(), day: 4, start: '08:00', end: '08:45', name: 'Matematika', room: '214', teacher: 'Nováková', color: '#2878e6', notes: '' },
        { id: id(), day: 4, start: '08:55', end: '09:40', name: 'Tělesná výchova', room: 'Tělocvična', teacher: 'Malý', color: '#e36b32', notes: '' }
      ],
      tasks: [
        { id: id(), title: 'Dopsat pracovní list', subject: 'Matematika', due: isoOffset(1), priority: 'Střední', done: false, notes: '' },
        { id: id(), title: 'Přečíst 3. kapitolu', subject: 'Český jazyk', due: isoOffset(2), priority: 'Nízká', done: false, notes: '' },
        { id: id(), title: 'Slovíčka – lekce 4', subject: 'Angličtina', due: isoOffset(4), priority: 'Vysoká', done: false, notes: '' }
      ],
      exams: [
        { id: id(), title: 'Písemka – zlomky', subject: 'Matematika', date: isoOffset(5), type: 'Písemka', color: '#2878e6', notes: 'Procvičit krácení a rozšiřování.' },
        { id: id(), title: 'Starověké Řecko', subject: 'Dějepis', date: isoOffset(9), type: 'Test', color: '#e19b22', notes: '' }
      ],
      notes: [
        { id: id(), title: 'Co nezapomenout', body: 'Přinést kružítko a podepsaný pracovní list.', color: '#6757e8', updatedAt: new Date().toISOString() }
      ]
    };
  }

  var ui = {
    view: validView(location.hash.slice(1)) ? location.hash.slice(1) : 'domu',
    scheduleDay: Math.min(Math.max((new Date().getDay() + 6) % 7, 0), 4),
    taskFilter: 'vse',
    taskQuery: '',
    noteQuery: '',
    materialQuery: '',
    calendarMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    calendarSelected: isoOffset(0),
    materials: [],
    installPrompt: null
  };

  var currentUser = null;
  var authSession = null;
  var state = loadState();
  var main = document.getElementById('main-content');
  var modalRoot = document.getElementById('modal-root');
  var toastRoot = document.getElementById('toast-root');
  var authRoot = document.getElementById('auth-root');
  var appRoot = document.getElementById('app');

  async function authRequest(path, options) {
    options = options || {};
    var headers = Object.assign({
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json'
    }, options.headers || {});
    if (options.accessToken) headers.Authorization = 'Bearer ' + options.accessToken;
    var response;
    try {
      response = await fetch(SUPABASE_URL + path, {
        method: options.method || 'GET',
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : undefined
      });
    } catch (error) {
      throw new Error('network_error');
    }
    var text = await response.text();
    var data = {};
    if (text) {
      try { data = JSON.parse(text); }
      catch (error) { data = { message: text }; }
    }
    if (!response.ok) {
      var message = data.msg || data.message || data.error_description || data.error || ('HTTP ' + response.status);
      var authError = new Error(message);
      authError.status = response.status;
      authError.code = data.error_code || data.code || '';
      throw authError;
    }
    return data;
  }

  function authErrorMessage(error) {
    var message = String(error && error.message || '').toLowerCase();
    var code = String(error && error.code || '').toLowerCase();
    if (message === 'network_error') return 'Nepodařilo se spojit se serverem. Zkontroluj internetové připojení.';
    if (message.indexOf('invalid login credentials') >= 0) return 'Nesprávný e-mail nebo heslo.';
    if (message.indexOf('email not confirmed') >= 0) return 'Nejdřív potvrď e-mail od Supabase.';
    if (message.indexOf('already registered') >= 0 || code.indexOf('user_already_exists') >= 0) return 'Tento e-mail už je zaregistrovaný.';
    if (message.indexOf('password') >= 0 && message.indexOf('weak') >= 0) return 'Heslo je příliš slabé. Použij alespoň 8 znaků.';
    if (message.indexOf('rate limit') >= 0 || code.indexOf('over_email_send_rate_limit') >= 0) return 'Bylo odesláno příliš mnoho e-mailů. Počkej chvíli a zkus to znovu.';
    if (message.indexOf('email address') >= 0 || message.indexOf('invalid email') >= 0) return 'Zadej platnou e-mailovou adresu.';
    if (error && error.status === 429) return 'Příliš mnoho pokusů. Počkej chvíli a zkus to znovu.';
    return 'Akce se nepodařila. ' + (error && error.message ? error.message : 'Zkus to prosím znovu.');
  }

  function normalizeSession(data, previous) {
    previous = previous || {};
    return {
      access_token: data.access_token || previous.access_token || '',
      refresh_token: data.refresh_token || previous.refresh_token || '',
      expires_at: data.expires_at || (data.expires_in ? Math.floor(Date.now() / 1000) + Number(data.expires_in) : previous.expires_at || 0),
      token_type: data.token_type || previous.token_type || 'bearer',
      user: data.user || previous.user || null
    };
  }

  function saveAuthSession(session) {
    authSession = session;
    if (session) localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(AUTH_SESSION_KEY);
  }

  function loadAuthSession() {
    try { return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)); }
    catch (error) { return null; }
  }

  function consumeAuthCallback() {
    if (!location.hash || location.hash.indexOf('access_token=') < 0) return null;
    var params = new URLSearchParams(location.hash.slice(1));
    var accessToken = params.get('access_token');
    if (!accessToken) return null;
    var session = normalizeSession({
      access_token: accessToken,
      refresh_token: params.get('refresh_token') || '',
      expires_in: Number(params.get('expires_in') || 3600),
      token_type: params.get('token_type') || 'bearer'
    });
    saveAuthSession(session);
    var type = params.get('type') || '';
    history.replaceState(null, '', location.pathname + location.search + '#domu');
    return type;
  }

  async function refreshAuthSession(session) {
    if (!session || !session.refresh_token) throw new Error('missing_refresh_token');
    var data = await authRequest('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      body: { refresh_token: session.refresh_token }
    });
    var refreshed = normalizeSession(data, session);
    saveAuthSession(refreshed);
    return refreshed;
  }

  async function fetchAuthUser(session) {
    if (!session || !session.access_token) throw new Error('missing_access_token');
    var user = await authRequest('/auth/v1/user', { accessToken: session.access_token });
    session.user = user;
    saveAuthSession(session);
    return user;
  }

  function authAside() {
    return '<aside class="auth-aside">' +
      '<div class="auth-logo"><span class="brand-mark">R<span>+</span></span><strong>Rozvrh<span>+</span></strong></div>' +
      '<div class="auth-promise"><small>TVŮJ ŠKOLNÍ ORGANIZÉR</small><h1>Měj školu pod kontrolou.</h1><p>Rozvrh, úkoly, zkoušky a poznámky na jednom místě.</p></div>' +
      '<div class="auth-points"><span><i>✓</i> Funguje jako aplikace na iPhonu</span><span><i>✓</i> Data jednotlivých účtů jsou oddělená</span><span><i>✓</i> Heslo spravuje zabezpečené přihlášení</span></div>' +
    '</aside>';
  }

  function passwordField(name, label, autocomplete, placeholder) {
    return '<label class="field password-field">' + label +
      '<input name="' + name + '" type="password" minlength="8" autocomplete="' + autocomplete + '" placeholder="' + placeholder + '" required>' +
      '<button class="password-toggle" type="button" data-action="toggle-password">Ukázat</button></label>';
  }

  function authMessageHtml(message, success) {
    return message ? '<div class="auth-message ' + (success ? 'success' : '') + '" role="status">' + escapeHtml(message) + '</div>' : '';
  }

  function renderAuth(view, message, success) {
    view = view || 'login';
    var content = '';
    if (view === 'register') {
      content = '<div class="auth-panel-header"><h2>Vytvořit účet</h2><p>Vyplň údaje stejně jako v předchozí verzi.</p></div>' +
        '<form class="auth-form" data-auth-form="register">' +
          '<div class="field-row"><label class="field">Jméno<input name="first_name" maxlength="50" autocomplete="given-name" required></label><label class="field">Příjmení<input name="last_name" maxlength="50" autocomplete="family-name" required></label></div>' +
          '<label class="field">Prostřední jméno <span class="optional">volitelné</span><input name="middle_name" maxlength="50" autocomplete="additional-name"></label>' +
          '<div class="field-row"><label class="field">Telefon <span class="optional">volitelné</span><input name="phone" type="tel" maxlength="30" autocomplete="tel" placeholder="+420 123 456 789"></label><label class="field">Datum narození<input name="birth_date" type="date" autocomplete="bday" required></label></div>' +
          '<label class="field">E-mail<input name="email" type="email" autocomplete="email" placeholder="tvuj@email.cz" required></label>' +
          passwordField('password', 'Heslo', 'new-password', 'Minimálně 8 znaků') +
          passwordField('password2', 'Potvrzení hesla', 'new-password', 'Zopakuj heslo') +
          authMessageHtml(message, success) +
          '<button class="primary-button auth-submit" type="submit">Vytvořit účet</button>' +
        '</form><p class="auth-switch">Už účet máš? <button type="button" data-action="auth-view" data-auth-view="login">Přihlásit se</button></p>';
    } else if (view === 'forgot') {
      content = '<div class="auth-panel-header"><h2>Obnovit heslo</h2><p>Pošleme ti e-mail s odkazem pro nastavení nového hesla.</p></div>' +
        '<form class="auth-form" data-auth-form="forgot"><label class="field">E-mail<input name="email" type="email" autocomplete="email" placeholder="tvuj@email.cz" required></label>' +
        authMessageHtml(message, success) + '<button class="primary-button auth-submit" type="submit">Poslat odkaz</button></form>' +
        '<p class="auth-switch"><button type="button" data-action="auth-view" data-auth-view="login">← Zpět na přihlášení</button></p>';
    } else if (view === 'new-password') {
      content = '<div class="auth-panel-header"><h2>Nastavit nové heslo</h2><p>Zadej nové heslo, které bude mít alespoň 8 znaků.</p></div>' +
        '<form class="auth-form" data-auth-form="new-password">' + passwordField('password', 'Nové heslo', 'new-password', 'Minimálně 8 znaků') +
        passwordField('password2', 'Potvrzení hesla', 'new-password', 'Zopakuj nové heslo') + authMessageHtml(message, success) +
        '<button class="primary-button auth-submit" type="submit">Uložit nové heslo</button></form>';
    } else {
      content = '<div class="auth-panel-header"><h2>Vítej zpátky</h2><p>Přihlas se ke svému účtu Rozvrh+.</p></div>' +
        '<form class="auth-form" data-auth-form="login"><label class="field">E-mail<input name="email" type="email" autocomplete="email" placeholder="tvuj@email.cz" required></label>' +
        passwordField('password', 'Heslo', 'current-password', 'Tvoje heslo') +
        '<div class="auth-forgot"><button class="auth-link" type="button" data-action="auth-view" data-auth-view="forgot">Zapomenuté heslo?</button></div>' +
        authMessageHtml(message, success) + '<button class="primary-button auth-submit" type="submit">Přihlásit se</button></form>' +
        '<p class="auth-switch">Nemáš účet? <button type="button" data-action="auth-view" data-auth-view="register">Vytvořit účet</button></p>';
    }
    appRoot.hidden = true;
    authRoot.hidden = false;
    authRoot.innerHTML = '<section class="auth-shell">' + authAside() + '<div class="auth-panel">' + content + '<p class="auth-note">Přihlášení bezpečně zpracovává Supabase. Heslo se v aplikaci ani v tomto zařízení neukládá.</p></div></section>';
    document.title = (view === 'register' ? 'Registrace' : view === 'forgot' ? 'Obnova hesla' : 'Přihlášení') + ' · Rozvrh+';
  }

  async function handleAuthSubmit(form) {
    var button = form.querySelector('[type="submit"]');
    var original = button.textContent;
    button.disabled = true;
    button.textContent = 'Pracuji…';
    var data = new FormData(form);
    var type = form.dataset.authForm;
    try {
      if (type === 'login') {
        var loginData = await authRequest('/auth/v1/token?grant_type=password', {
          method: 'POST',
          body: { email: String(data.get('email')).trim().toLowerCase(), password: String(data.get('password')) }
        });
        var loginSession = normalizeSession(loginData);
        saveAuthSession(loginSession);
        await enterApp(loginSession.user || await fetchAuthUser(loginSession));
      } else if (type === 'register') {
        var password = String(data.get('password'));
        if (password.length < 8) throw new Error('weak_password');
        if (password !== String(data.get('password2'))) throw new Error('password_mismatch');
        var registerData = await authRequest('/auth/v1/signup?redirect_to=' + encodeURIComponent(location.origin + '/'), {
          method: 'POST',
          body: {
            email: String(data.get('email')).trim().toLowerCase(),
            password: password,
            data: {
              first_name: String(data.get('first_name')).trim(),
              last_name: String(data.get('last_name')).trim(),
              middle_name: String(data.get('middle_name')).trim() || null,
              phone: String(data.get('phone')).trim() || null,
              birth_date: String(data.get('birth_date'))
            }
          }
        });
        if (registerData.access_token) {
          var registerSession = normalizeSession(registerData);
          saveAuthSession(registerSession);
          await enterApp(registerSession.user || await fetchAuthUser(registerSession));
        } else {
          renderAuth('login', 'Účet byl vytvořen. Zkontroluj e-mail a potvrď registraci, potom se přihlas.', true);
        }
      } else if (type === 'forgot') {
        await authRequest('/auth/v1/recover?redirect_to=' + encodeURIComponent(location.origin + '/'), {
          method: 'POST',
          body: { email: String(data.get('email')).trim().toLowerCase() }
        });
        renderAuth('forgot', 'Odkaz pro obnovu hesla byl odeslán. Zkontroluj i složku Spam.', true);
      } else if (type === 'new-password') {
        var newPassword = String(data.get('password'));
        if (newPassword.length < 8) throw new Error('weak_password');
        if (newPassword !== String(data.get('password2'))) throw new Error('password_mismatch');
        await authRequest('/auth/v1/user', { method: 'PUT', accessToken: authSession.access_token, body: { password: newPassword } });
        var recoveredUser = await fetchAuthUser(authSession);
        await enterApp(recoveredUser);
        toast('Nové heslo bylo uložené.');
      }
    } catch (error) {
      var custom = error.message === 'password_mismatch' ? 'Hesla se neshodují.' : error.message === 'weak_password' ? 'Heslo musí mít alespoň 8 znaků.' : authErrorMessage(error);
      renderAuth(type === 'register' ? 'register' : type === 'forgot' ? 'forgot' : type === 'new-password' ? 'new-password' : 'login', custom, false);
    } finally {
      if (button && button.isConnected) {
        button.disabled = false;
        button.textContent = original;
      }
    }
  }

  async function enterApp(user) {
    currentUser = user;
    var ownedKey = BASE_STORE_KEY + ':' + user.id;
    var migrationOwner = localStorage.getItem(DATA_MIGRATION_KEY);
    var oldData = localStorage.getItem(BASE_STORE_KEY);
    if (!localStorage.getItem(ownedKey) && oldData && !migrationOwner) {
      localStorage.setItem(ownedKey, oldData);
      localStorage.setItem(DATA_MIGRATION_KEY, user.id);
    }
    STORE_KEY = ownedKey;
    state = loadState();
    var meta = user.user_metadata || user.raw_user_meta_data || {};
    if ((!state.settings.name || state.settings.name === 'Student') && meta.first_name) {
      state.settings.name = meta.first_name;
      saveState();
    }
    authRoot.hidden = true;
    appRoot.hidden = false;
    render();
    await refreshMaterials();
    maybeShowInstall();
  }

  async function logout() {
    try {
      if (authSession && authSession.access_token) await authRequest('/auth/v1/logout', { method: 'POST', accessToken: authSession.access_token });
    } catch (error) {
      console.warn('Odhlášení na serveru se nepodařilo.', error);
    }
    saveAuthSession(null);
    currentUser = null;
    STORE_KEY = BASE_STORE_KEY;
    document.getElementById('install-nudge').hidden = true;
    closeModal();
    renderAuth('login', 'Byl jsi bezpečně odhlášen.', true);
  }

  async function initializeAuth() {
    var callbackType = consumeAuthCallback();
    var session = authSession || loadAuthSession();
    if (!session || !session.access_token) {
      renderAuth('login');
      return;
    }
    authSession = session;
    try {
      if (session.expires_at && session.expires_at <= Math.floor(Date.now() / 1000) + 30) {
        session = await refreshAuthSession(session);
      } else {
        saveAuthSession(session);
      }
      if (!session.user) await fetchAuthUser(session);
      if (callbackType === 'recovery') {
        renderAuth('new-password');
        return;
      }
      await enterApp(authSession.user);
    } catch (error) {
      if (!navigator.onLine && session.user) {
        await enterApp(session.user);
        return;
      }
      saveAuthSession(null);
      renderAuth('login', authErrorMessage(error), false);
    }
  }

  function validView(view) {
    return NAV.some(function (item) { return item.id === view; });
  }

  function loadState() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY));
      if (saved && saved.version === 2) {
        var base = defaults();
        return {
          version: 2,
          settings: Object.assign(base.settings, saved.settings || {}),
          lessons: Array.isArray(saved.lessons) ? saved.lessons : base.lessons,
          tasks: Array.isArray(saved.tasks) ? saved.tasks : base.tasks,
          exams: Array.isArray(saved.exams) ? saved.exams : base.exams,
          notes: Array.isArray(saved.notes) ? saved.notes : base.notes
        };
      }
      var old = JSON.parse(localStorage.getItem(OLD_STORE_KEY));
      if (old && old.d) {
        var migrated = defaults();
        migrated.settings.theme = old.dark ? 'dark' : 'light';
        migrated.settings.accent = old.accent || migrated.settings.accent;
        migrated.lessons = Array.isArray(old.d.lessons) ? old.d.lessons : migrated.lessons;
        migrated.tasks = (old.d.tasks || []).map(function (task) {
          return { id: task.id || id(), title: task.title || task.name || 'Úkol', subject: task.subject || '', due: task.due || task.date || isoOffset(0), priority: task.priority || 'Střední', done: !!task.done, notes: task.notes || '' };
        });
        migrated.exams = (old.d.exams || []).map(function (exam) {
          return { id: exam.id || id(), title: exam.title || exam.name || 'Zkouška', subject: exam.subject || '', date: exam.date || isoOffset(0), type: exam.type || 'Test', color: exam.color || migrated.settings.accent, notes: exam.notes || '' };
        });
        saveState(migrated);
        return migrated;
      }
    } catch (error) {
      console.warn('Data Rozvrh+ se nepodařilo načíst.', error);
    }
    return defaults();
  }

  function saveState(next) {
    if (next) state = next;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (error) {
      toast('Změny se nepodařilo uložit.', 'error');
    }
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function asDate(iso) {
    return new Date(String(iso) + 'T12:00:00');
  }

  function formatDate(iso, options) {
    if (!iso) return 'Bez termínu';
    return asDate(iso).toLocaleDateString('cs-CZ', options || { day: 'numeric', month: 'long' });
  }

  function formatLongDate(date) {
    return date.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function daysUntil(iso) {
    var today = asDate(isoOffset(0));
    return Math.round((asDate(iso) - today) / 86400000);
  }

  function timeMinutes(value) {
    var parts = String(value || '00:00').split(':');
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  function rgbFromHex(hex) {
    var value = String(hex).replace('#', '');
    if (value.length === 3) value = value.split('').map(function (part) { return part + part; }).join('');
    var number = parseInt(value, 16);
    return [(number >> 16) & 255, (number >> 8) & 255, number & 255].join(', ');
  }

  function applyAppearance() {
    var theme = state.settings.theme || 'system';
    var dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('dark', dark);
    document.documentElement.style.setProperty('--accent', state.settings.accent);
    document.documentElement.style.setProperty('--accent-rgb', rgbFromHex(state.settings.accent));
    document.documentElement.style.setProperty('--accent-soft', 'rgba(' + rgbFromHex(state.settings.accent) + ', .12)');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#13141d' : state.settings.accent;
  }

  function subjectColor(subject) {
    var lesson = state.lessons.find(function (item) { return item.name.toLowerCase() === String(subject).toLowerCase(); });
    return lesson ? lesson.color : state.settings.accent;
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' kB';
    return (bytes / 1048576).toFixed(1).replace('.', ',') + ' MB';
  }

  function toast(message, type) {
    var node = document.createElement('div');
    node.className = 'toast ' + (type || 'success');
    node.textContent = message;
    toastRoot.appendChild(node);
    setTimeout(function () {
      node.style.opacity = '0';
      node.style.transform = 'translateY(-5px)';
      setTimeout(function () { node.remove(); }, 220);
    }, 2900);
  }

  function navCount(view) {
    if (view === 'ukoly') return state.tasks.filter(function (item) { return !item.done; }).length;
    if (view === 'zkousky') return state.exams.filter(function (item) { return daysUntil(item.date) >= 0; }).length;
    return 0;
  }

  function renderNavigation() {
    var desktop = document.getElementById('desktop-nav');
    desktop.innerHTML = NAV.map(function (item) {
      var count = navCount(item.id);
      return '<button class="nav-item ' + (ui.view === item.id ? 'active' : '') + '" data-action="navigate" data-view="' + item.id + '">' +
        icons[item.icon] + '<span>' + item.label + '</span>' + (count ? '<span class="nav-badge">' + count + '</span>' : '') + '</button>';
    }).join('');

    var mobileItems = NAV.filter(function (item) { return ['domu', 'rozvrh', 'ukoly', 'kalendar'].indexOf(item.id) >= 0; });
    var extraActive = ['zkousky', 'materialy', 'poznamky', 'statistiky', 'nastaveni'].indexOf(ui.view) >= 0;
    document.getElementById('mobile-nav').innerHTML = mobileItems.map(function (item) {
      var count = navCount(item.id);
      return '<button class="nav-item ' + (ui.view === item.id ? 'active' : '') + '" data-action="navigate" data-view="' + item.id + '">' +
        icons[item.icon] + '<span>' + item.label + '</span>' + (count ? '<span class="nav-badge">' + count + '</span>' : '') + '</button>';
    }).join('') +
      '<button class="nav-item ' + (extraActive ? 'active' : '') + '" data-action="more">' + icons.more + '<span>Více</span></button>';
  }

  function updateHeader() {
    var info = NAV.find(function (item) { return item.id === ui.view; }) || NAV[0];
    document.getElementById('page-title').textContent = info.label;
    document.getElementById('page-kicker').textContent = info.kicker;
    var name = (state.settings.name || 'Student').trim();
    var initial = (name.charAt(0) || 'S').toUpperCase();
    document.getElementById('side-name').textContent = name || 'Student';
    document.getElementById('side-avatar').textContent = initial;
    document.getElementById('top-avatar').textContent = initial;
    document.title = info.label + ' · Rozvrh+';
  }

  function go(view) {
    if (!validView(view)) return;
    ui.view = view;
    if (location.hash.slice(1) !== view) history.replaceState(null, '', '#' + view);
    render();
    setTimeout(function () { main.focus({ preventScroll: true }); }, 0);
  }

  function render() {
    applyAppearance();
    renderNavigation();
    updateHeader();
    if (ui.view === 'domu') renderHome();
    else if (ui.view === 'rozvrh') renderSchedule();
    else if (ui.view === 'ukoly') renderTasks();
    else if (ui.view === 'zkousky') renderExams();
    else if (ui.view === 'kalendar') renderCalendar();
    else if (ui.view === 'materialy') renderMaterials();
    else if (ui.view === 'poznamky') renderNotes();
    else if (ui.view === 'statistiky') renderStats();
    else renderSettings();
  }

  function todayIndex(date) {
    return (date.getDay() + 6) % 7;
  }

  function upcomingLesson() {
    var now = new Date();
    var minutes = now.getHours() * 60 + now.getMinutes();
    for (var offset = 0; offset < 8; offset += 1) {
      var candidateDate = new Date(now);
      candidateDate.setDate(now.getDate() + offset);
      var day = todayIndex(candidateDate);
      if (day > 4) continue;
      var lessons = state.lessons.filter(function (lesson) { return lesson.day === day; }).sort(function (a, b) { return a.start.localeCompare(b.start); });
      for (var index = 0; index < lessons.length; index += 1) {
        var lesson = lessons[index];
        if (offset === 0 && minutes >= timeMinutes(lesson.start) && minutes < timeMinutes(lesson.end)) {
          return { lesson: lesson, offset: offset, current: true, date: candidateDate };
        }
        if (offset > 0 || timeMinutes(lesson.start) > minutes) {
          return { lesson: lesson, offset: offset, current: false, date: candidateDate };
        }
      }
    }
    return null;
  }

  function greeting() {
    var hour = new Date().getHours();
    var name = (state.settings.name || '').trim();
    var start = hour < 11 ? 'Dobré ráno' : hour < 18 ? 'Hezké odpoledne' : 'Hezký večer';
    return start + (name && name.toLowerCase() !== 'student' ? ', ' + escapeHtml(name) : '') + '!';
  }

  function taskPriorityClass(priority) {
    if (priority === 'Vysoká') return 'high';
    if (priority === 'Nízká') return 'low';
    return '';
  }

  function dueText(iso) {
    var days = daysUntil(iso);
    if (days === 0) return 'Dnes';
    if (days === 1) return 'Zítra';
    if (days === -1) return 'Včera';
    if (days < -1) return Math.abs(days) + ' d. po termínu';
    return formatDate(iso);
  }

  function renderHome() {
    var now = new Date();
    var day = todayIndex(now);
    var lessons = day < 5 ? state.lessons.filter(function (lesson) { return lesson.day === day; }).sort(function (a, b) { return a.start.localeCompare(b.start); }) : [];
    var next = upcomingLesson();
    var openTasks = state.tasks.filter(function (task) { return !task.done; }).sort(function (a, b) { return a.due.localeCompare(b.due); });
    var done = state.tasks.filter(function (task) { return task.done; }).length;
    var progress = state.tasks.length ? Math.round(done / state.tasks.length * 100) : 0;
    var dateLabel = formatLongDate(now);
    var nextLabel = next ? (next.current ? 'Právě probíhá' : next.offset === 0 ? 'Další hodina' : 'Nejbližší hodina') : 'Výuka';

    var heroLesson = next ? '<div class="hero-lesson">' +
      '<div class="hero-time">' + escapeHtml(next.lesson.start) + '</div>' +
      '<div><strong>' + escapeHtml(next.lesson.name) + '</strong><span>' +
      (next.offset ? DAY_SHORT[todayIndex(next.date)] + ' · ' : '') + escapeHtml(next.lesson.teacher || 'Bez učitele') + ' · ' + escapeHtml(next.lesson.room || 'bez učebny') +
      '</span></div></div>' :
      '<div class="hero-lesson"><div class="hero-time">✓</div><div><strong>Všechno hotovo</strong><span>Přidej si další hodinu do rozvrhu.</span></div></div>';

    var timeline = lessons.length ? lessons.map(function (lesson) {
      return '<div class="timeline-row">' +
        '<span class="timeline-time">' + escapeHtml(lesson.start) + '</span>' +
        '<i class="timeline-dot" style="--lesson-color:' + escapeHtml(lesson.color) + '"></i>' +
        '<div><strong>' + escapeHtml(lesson.name) + '</strong><small>' + escapeHtml(lesson.teacher || 'Bez učitele') + '</small></div>' +
        '<span class="timeline-room">' + escapeHtml(lesson.room || '—') + '</span></div>';
    }).join('') : emptyState('☀️', 'Dnes nemáš vyučování', 'Užij si volný den nebo si připrav příští týden.', true);

    var tasks = openTasks.slice(0, 4).map(function (task) {
      return '<div class="mini-task">' +
        '<button class="check-button" data-action="toggle-task" data-id="' + task.id + '" aria-label="Označit jako hotové"></button>' +
        '<div><strong>' + escapeHtml(task.title) + '</strong><small>' + escapeHtml(task.subject) + ' · ' + escapeHtml(dueText(task.due)) + '</small></div>' +
        '<span class="priority ' + taskPriorityClass(task.priority) + '">' + escapeHtml(task.priority) + '</span></div>';
    }).join('');
    if (!tasks) tasks = emptyState('✓', 'Žádný otevřený úkol', 'Máš hotovo. To je dobrý pocit.', true);

    main.innerHTML = '<section class="view">' +
      '<div class="home-grid">' +
        '<article class="hero-card">' +
          '<div class="hero-top"><div><span class="eyebrow">' + escapeHtml(nextLabel.toUpperCase()) + '</span><h2>' + greeting() + '</h2></div>' +
          '<span class="hero-date-pill">' + escapeHtml(dateLabel) + '</span></div>' +
          heroLesson +
        '</article>' +
        '<div class="quick-stack">' +
          '<article class="stat-card"><span class="stat-icon">' + icons.tasks + '</span><div><strong>' + openTasks.length + '</strong><span>otevřené úkoly</span></div></article>' +
          '<article class="stat-card"><span class="stat-icon">' + icons.exams + '</span><div><strong>' + state.exams.filter(function (exam) { return daysUntil(exam.date) >= 0; }).length + '</strong><span>blížící se zkoušky</span></div></article>' +
          '<article class="stat-card wide"><div><span>Splněno ze všech úkolů</span><strong>' + progress + ' %</strong></div><div class="progress-line"><i style="width:' + progress + '%"></i></div></article>' +
        '</div>' +
      '</div>' +
      '<div class="dashboard-columns">' +
        '<article class="panel"><div class="section-head"><div><h2>Dnešní rozvrh</h2><p>' + lessons.length + ' ' + lessonWord(lessons.length) + '</p></div><button class="text-button" data-action="navigate" data-view="rozvrh">Celý rozvrh</button></div><div class="timeline">' + timeline + '</div></article>' +
        '<article class="panel"><div class="section-head"><div><h2>Nejbližší úkoly</h2><p>Ať na nic nezapomeneš</p></div><button class="text-button" data-action="add-task">+ Přidat</button></div><div>' + tasks + '</div></article>' +
      '</div>' +
    '</section>';
  }

  function lessonWord(count) {
    if (count === 1) return 'hodina';
    if (count > 1 && count < 5) return 'hodiny';
    return 'hodin';
  }

  function emptyState(icon, title, text, compact) {
    return '<div class="empty-state ' + (compact ? 'compact' : '') + '"><span class="empty-state-icon">' + icon + '</span><strong>' +
      escapeHtml(title) + '</strong><p>' + escapeHtml(text) + '</p></div>';
  }

  function renderSchedule() {
    var lessons = state.lessons.filter(function (lesson) { return lesson.day === ui.scheduleDay; }).sort(function (a, b) { return a.start.localeCompare(b.start); });
    var tabs = DAYS.map(function (day, index) {
      var count = state.lessons.filter(function (lesson) { return lesson.day === index; }).length;
      return '<button class="day-tab ' + (ui.scheduleDay === index ? 'active' : '') + '" data-action="select-day" data-day="' + index + '">' +
        DAY_SHORT[index] + '<span>' + count + ' ' + lessonWord(count) + '</span></button>';
    }).join('');
    var cards = lessons.map(function (lesson) {
      return '<article class="lesson-card">' +
        '<div class="lesson-time"><strong>' + escapeHtml(lesson.start) + '</strong><span>' + escapeHtml(lesson.end) + '</span></div>' +
        '<i class="lesson-color" style="--lesson-color:' + escapeHtml(lesson.color) + '"></i>' +
        '<div class="lesson-copy"><h3>' + escapeHtml(lesson.name) + '</h3><p>' + escapeHtml(lesson.teacher || 'Bez učitele') + ' · ' + escapeHtml(lesson.room || 'bez učebny') + '</p></div>' +
        '<div class="row-actions"><button class="row-action" data-action="edit-lesson" data-id="' + lesson.id + '" aria-label="Upravit">' + icons.edit + '</button>' +
        '<button class="row-action danger" data-action="delete-request" data-kind="lesson" data-id="' + lesson.id + '" aria-label="Smazat">' + icons.trash + '</button></div>' +
      '</article>';
    }).join('');
    if (!cards) cards = emptyState('📚', 'Zatím žádná hodina', 'Přidej první hodinu pro tento den.', false);

    main.innerHTML = '<section class="view">' +
      toolbar('Rozvrh', 'Uprav si týden přesně podle školy.', '<button class="primary-button" data-action="add-lesson">' + icons.plus + '<span>Přidat hodinu</span></button>') +
      '<div class="day-tabs">' + tabs + '</div>' +
      '<div class="section-head"><div><h2>' + DAYS[ui.scheduleDay] + '</h2><p>' + lessons.length + ' ' + lessonWord(lessons.length) + '</p></div></div>' +
      '<div class="schedule-list">' + cards + '</div>' +
    '</section>';
  }

  function toolbar(title, subtitle, actions) {
    return '<div class="toolbar"><div class="toolbar-copy"><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(subtitle) + '</p></div><div class="toolbar-actions">' + actions + '</div></div>';
  }

  function renderTasks() {
    var today = isoOffset(0);
    var list = state.tasks.filter(function (task) {
      var filterOk = ui.taskFilter === 'vse' ||
        (ui.taskFilter === 'dnes' && task.due === today && !task.done) ||
        (ui.taskFilter === 'nadchazejici' && task.due > today && !task.done) ||
        (ui.taskFilter === 'hotovo' && task.done) ||
        (ui.taskFilter === 'po-terminu' && task.due < today && !task.done);
      var query = ui.taskQuery.toLowerCase().trim();
      return filterOk && (!query || task.title.toLowerCase().indexOf(query) >= 0 || task.subject.toLowerCase().indexOf(query) >= 0);
    }).sort(function (a, b) { return Number(a.done) - Number(b.done) || a.due.localeCompare(b.due); });

    var filters = [
      ['vse', 'Vše'], ['dnes', 'Dnes'], ['nadchazejici', 'Nadcházející'], ['po-terminu', 'Po termínu'], ['hotovo', 'Hotovo']
    ].map(function (item) {
      return '<button class="filter-tab ' + (ui.taskFilter === item[0] ? 'active' : '') + '" data-action="task-filter" data-filter="' + item[0] + '">' + item[1] + '</button>';
    }).join('');

    var cards = list.map(function (task) {
      var color = subjectColor(task.subject);
      return '<article class="task-card ' + (task.done ? 'is-done' : '') + '">' +
        '<button class="check-button ' + (task.done ? 'checked' : '') + '" data-action="toggle-task" data-id="' + task.id + '" aria-label="' + (task.done ? 'Označit jako nedokončené' : 'Označit jako hotové') + '">' + (task.done ? icons.check : '') + '</button>' +
        '<div><h3>' + escapeHtml(task.title) + '</h3><div class="task-meta"><span class="subject-pill" style="--subject-color:' + color + '">' + escapeHtml(task.subject || 'Bez předmětu') + '</span>' +
        '<span class="date-pill">' + escapeHtml(dueText(task.due)) + '</span><span class="priority ' + taskPriorityClass(task.priority) + '">' + escapeHtml(task.priority) + '</span></div></div>' +
        '<div class="row-actions"><button class="row-action" data-action="edit-task" data-id="' + task.id + '" aria-label="Upravit">' + icons.edit + '</button>' +
        '<button class="row-action danger" data-action="delete-request" data-kind="task" data-id="' + task.id + '" aria-label="Smazat">' + icons.trash + '</button></div>' +
      '</article>';
    }).join('');
    if (!cards) cards = emptyState('✅', 'Nic tu není', 'Zkus jiný filtr nebo přidej nový úkol.', false);

    main.innerHTML = '<section class="view">' +
      toolbar('Úkoly', 'Všechny povinnosti na jednom místě.', '<button class="primary-button" data-action="add-task">' + icons.plus + '<span>Přidat úkol</span></button>') +
      '<div class="search-filter"><label class="searchbox">' + icons.search + '<input id="task-search" type="search" placeholder="Hledat úkol nebo předmět" value="' + escapeHtml(ui.taskQuery) + '" aria-label="Hledat úkol"></label></div>' +
      '<div class="filter-tabs">' + filters + '</div><div class="card-list">' + cards + '</div>' +
    '</section>';
  }

  function examCountdown(iso) {
    var days = daysUntil(iso);
    if (days < 0) return 'Proběhlo před ' + Math.abs(days) + ' dny';
    if (days === 0) return 'Je to dnes';
    if (days === 1) return 'Už zítra';
    return 'Za ' + days + ' dní';
  }

  function renderExams() {
    var list = state.exams.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
    var cards = list.map(function (exam) {
      var date = asDate(exam.date);
      return '<article class="exam-card" style="--exam-color:' + escapeHtml(exam.color || subjectColor(exam.subject)) + '">' +
        '<div class="exam-top"><div class="exam-date"><strong>' + date.getDate() + '</strong><span>' + date.toLocaleDateString('cs-CZ', { month: 'short' }) + '</span></div>' +
        '<div class="row-actions"><button class="row-action" data-action="edit-exam" data-id="' + exam.id + '" aria-label="Upravit">' + icons.edit + '</button>' +
        '<button class="row-action danger" data-action="delete-request" data-kind="exam" data-id="' + exam.id + '" aria-label="Smazat">' + icons.trash + '</button></div></div>' +
        '<span class="exam-status">' + escapeHtml(exam.type) + '</span><h3>' + escapeHtml(exam.title) + '</h3><p>' + escapeHtml(exam.subject) + (exam.notes ? ' · ' + escapeHtml(exam.notes) : '') + '</p>' +
        '<div class="exam-countdown">' + escapeHtml(examCountdown(exam.date)) + '</div></article>';
    }).join('');
    if (!cards) cards = emptyState('🎓', 'Žádná zkouška', 'Přidej si test, písemku nebo zkoušení.', false);

    main.innerHTML = '<section class="view">' +
      toolbar('Zkoušky', 'Přehled testů, písemek a zkoušení.', '<button class="primary-button" data-action="add-exam">' + icons.plus + '<span>Přidat zkoušku</span></button>') +
      '<div class="exam-grid">' + cards + '</div>' +
    '</section>';
  }

  function calendarEvents(iso) {
    var taskEvents = state.tasks.filter(function (item) { return item.due === iso; }).map(function (item) {
      return { id: item.id, kind: 'Úkol', title: item.title, meta: item.subject + (item.done ? ' · hotovo' : ''), color: subjectColor(item.subject) };
    });
    var examEvents = state.exams.filter(function (item) { return item.date === iso; }).map(function (item) {
      return { id: item.id, kind: item.type, title: item.title, meta: item.subject, color: item.color || subjectColor(item.subject) };
    });
    return taskEvents.concat(examEvents);
  }

  function renderCalendar() {
    var year = ui.calendarMonth.getFullYear();
    var month = ui.calendarMonth.getMonth();
    var first = new Date(year, month, 1);
    var startOffset = (first.getDay() + 6) % 7;
    var gridStart = new Date(year, month, 1 - startOffset);
    var daysHtml = '';
    for (var i = 0; i < 42; i += 1) {
      var date = new Date(gridStart);
      date.setDate(gridStart.getDate() + i);
      var iso = localISO(date);
      var events = calendarEvents(iso);
      var classes = ['calendar-day'];
      if (date.getMonth() !== month) classes.push('outside');
      if (iso === isoOffset(0)) classes.push('today');
      if (iso === ui.calendarSelected) classes.push('selected');
      var dots = events.length ? '<span class="event-dots">' + events.slice(0, 3).map(function (event) {
        return '<i style="--dot:' + escapeHtml(event.color) + '"></i>';
      }).join('') + '</span>' : '';
      daysHtml += '<button class="' + classes.join(' ') + '" data-action="calendar-select" data-date="' + iso + '">' + date.getDate() + dots + '</button>';
    }
    var agenda = calendarEvents(ui.calendarSelected);
    var agendaHtml = agenda.map(function (event) {
      return '<div class="agenda-item" style="--event-color:' + escapeHtml(event.color) + '"><i class="agenda-mark"></i><div><strong>' + escapeHtml(event.title) + '</strong><small>' + escapeHtml(event.kind + ' · ' + event.meta) + '</small></div></div>';
    }).join('');
    if (!agendaHtml) agendaHtml = emptyState('🗓️', 'Volný den', 'Na tento den zatím nic nemáš.', true);

    main.innerHTML = '<section class="view">' +
      toolbar('Kalendář', 'Úkoly a zkoušky v jednom přehledu.', '<button class="secondary-button" data-action="export-calendar">' + icons.download + '<span>Exportovat</span></button>') +
      '<div class="calendar-layout"><article class="calendar-panel">' +
        '<div class="calendar-head"><button class="icon-button" data-action="calendar-prev" aria-label="Předchozí měsíc">' + icons.arrowLeft + '</button>' +
        '<h2>' + escapeHtml(ui.calendarMonth.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' })) + '</h2>' +
        '<button class="icon-button" data-action="calendar-next" aria-label="Další měsíc">' + icons.arrowRight + '</button></div>' +
        '<div class="calendar-grid">' + ['Po','Út','St','Čt','Pá','So','Ne'].map(function (day) { return '<span class="calendar-weekday">' + day + '</span>'; }).join('') + daysHtml + '</div>' +
      '</article><aside class="agenda-panel"><h2 class="agenda-date">' + escapeHtml(formatDate(ui.calendarSelected, { weekday: 'long', day: 'numeric', month: 'long' })) + '</h2><div class="agenda-list">' + agendaHtml + '</div></aside></div>' +
    '</section>';
  }

  function localISO(date) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }

  function renderMaterials() {
    var query = ui.materialQuery.toLowerCase().trim();
    var materials = ui.materials.filter(function (file) { return !query || file.name.toLowerCase().indexOf(query) >= 0; });
    var cards = materials.map(function (file) {
      return '<article class="material-card"><span class="file-icon">' + icons.file + '</span><h3 title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</h3>' +
        '<p>' + escapeHtml(formatSize(file.size)) + ' · ' + escapeHtml(formatDate(file.addedAt.slice(0, 10))) + '</p>' +
        '<div class="material-actions"><button class="row-action" data-action="download-material" data-id="' + file.id + '" aria-label="Stáhnout">' + icons.download + '</button>' +
        '<button class="row-action danger" data-action="delete-request" data-kind="material" data-id="' + file.id + '" aria-label="Smazat">' + icons.trash + '</button></div></article>';
    }).join('');
    if (!cards) cards = emptyState('📁', 'Žádné materiály', 'Nahraj PDF, obrázek nebo jiný soubor. Zůstane v tomto zařízení.', false);

    main.innerHTML = '<section class="view">' +
      toolbar('Materiály', 'Soubory se ukládají přímo do zařízení.', '<button class="primary-button" data-action="upload-material">' + icons.upload + '<span>Nahrát soubor</span></button>') +
      '<div class="search-filter"><label class="searchbox">' + icons.search + '<input id="material-search" type="search" placeholder="Hledat v materiálech" value="' + escapeHtml(ui.materialQuery) + '" aria-label="Hledat materiál"></label></div>' +
      '<div class="materials-grid">' + cards + '</div>' +
    '</section>';
  }

  function renderNotes() {
    var query = ui.noteQuery.toLowerCase().trim();
    var notes = state.notes.filter(function (note) {
      return !query || note.title.toLowerCase().indexOf(query) >= 0 || note.body.toLowerCase().indexOf(query) >= 0;
    }).sort(function (a, b) { return b.updatedAt.localeCompare(a.updatedAt); });
    var cards = notes.map(function (note) {
      return '<article class="note-card" style="--note-color:' + escapeHtml(note.color || state.settings.accent) + '"><span class="subject-pill" style="--subject-color:' + escapeHtml(note.color || state.settings.accent) + '">Poznámka</span>' +
        '<h3>' + escapeHtml(note.title) + '</h3><p>' + escapeHtml(note.body || 'Prázdná poznámka') + '</p>' +
        '<div class="note-card-footer"><small>Upraveno ' + escapeHtml(formatDate(note.updatedAt.slice(0, 10))) + '</small><div class="row-actions">' +
        '<button class="row-action" data-action="edit-note" data-id="' + note.id + '" aria-label="Upravit">' + icons.edit + '</button>' +
        '<button class="row-action danger" data-action="delete-request" data-kind="note" data-id="' + note.id + '" aria-label="Smazat">' + icons.trash + '</button></div></div></article>';
    }).join('');
    if (!cards) cards = emptyState('📝', 'Žádné poznámky', 'Zapiš si rychlou myšlenku nebo důležitou informaci.', false);

    main.innerHTML = '<section class="view">' +
      toolbar('Poznámky', 'Rychlé zápisky vždy při ruce.', '<button class="primary-button" data-action="add-note">' + icons.plus + '<span>Nová poznámka</span></button>') +
      '<div class="search-filter"><label class="searchbox">' + icons.search + '<input id="note-search" type="search" placeholder="Hledat v poznámkách" value="' + escapeHtml(ui.noteQuery) + '" aria-label="Hledat poznámku"></label></div>' +
      '<div class="notes-grid">' + cards + '</div>' +
    '</section>';
  }

  function renderStats() {
    var total = state.tasks.length;
    var completed = state.tasks.filter(function (task) { return task.done; }).length;
    var percent = total ? Math.round(completed / total * 100) : 0;
    var lessonMinutes = state.lessons.reduce(function (sum, lesson) { return sum + Math.max(0, timeMinutes(lesson.end) - timeMinutes(lesson.start)); }, 0);
    var subjects = {};
    state.lessons.forEach(function (lesson) {
      subjects[lesson.name] = subjects[lesson.name] || { minutes: 0, color: lesson.color };
      subjects[lesson.name].minutes += Math.max(0, timeMinutes(lesson.end) - timeMinutes(lesson.start));
    });
    var sortedSubjects = Object.keys(subjects).map(function (name) {
      return { name: name, minutes: subjects[name].minutes, color: subjects[name].color };
    }).sort(function (a, b) { return b.minutes - a.minutes; });
    var maxMinutes = sortedSubjects.length ? sortedSubjects[0].minutes : 1;
    var bars = sortedSubjects.slice(0, 7).map(function (subject) {
      return '<div><div class="bar-head"><span>' + escapeHtml(subject.name) + '</span><span>' + (subject.minutes / 60).toFixed(1).replace('.', ',') + ' h</span></div>' +
        '<div class="bar-track"><i style="width:' + Math.round(subject.minutes / maxMinutes * 100) + '%;--bar-color:' + escapeHtml(subject.color) + '"></i></div></div>';
    }).join('');
    if (!bars) bars = emptyState('📊', 'Zatím bez dat', 'Přidej hodiny do rozvrhu.', true);

    main.innerHTML = '<section class="view">' +
      toolbar('Statistiky', 'Přehled tvého týdne a hotových úkolů.', '') +
      '<div class="stats-overview">' +
        '<article class="metric-card"><span>Hodin v týdnu</span><strong>' + state.lessons.length + '</strong></article>' +
        '<article class="metric-card"><span>Čas ve škole</span><strong>' + (lessonMinutes / 60).toFixed(1).replace('.', ',') + ' h</strong></article>' +
        '<article class="metric-card"><span>Hotové úkoly</span><strong>' + completed + ' / ' + total + '</strong></article>' +
      '</div><div class="stats-grid">' +
        '<article class="panel"><div class="section-head"><div><h2>Plnění úkolů</h2><p>Celkový pokrok</p></div></div><div class="donut-wrap"><div class="donut" style="--progress:' + percent + '"><strong>' + percent + ' %</strong><small>splněno</small></div></div></article>' +
        '<article class="panel"><div class="section-head"><div><h2>Čas podle předmětů</h2><p>Za jeden školní týden</p></div></div><div class="bar-list">' + bars + '</div></article>' +
      '</div></section>';
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function isStandalone() {
    return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  }

  function renderSettings() {
    var installed = isStandalone();
    var accountEmail = currentUser && currentUser.email ? currentUser.email : '';
    var accountName = state.settings.name || 'Student';
    var themeButtons = [['light','Světlý'],['dark','Tmavý'],['system','Automaticky']].map(function (item) {
      return '<button class="segment-button ' + (state.settings.theme === item[0] ? 'active' : '') + '" data-action="set-theme" data-theme="' + item[0] + '">' + item[1] + '</button>';
    }).join('');
    var colorButtons = COLORS.map(function (color) {
      return '<button class="color-option ' + (state.settings.accent.toLowerCase() === color.toLowerCase() ? 'active' : '') + '" style="--swatch:' + color + '" data-action="set-accent" data-color="' + color + '" aria-label="Nastavit barvu ' + color + '"></button>';
    }).join('');
    var installText = installed ? 'Aplikace běží z plochy v samostatném okně.' : isIOS() ? 'Na iPhonu ji přidáš přes nabídku Sdílet.' : 'Přidej si ji do zařízení pro rychlejší spuštění.';

    main.innerHTML = '<section class="view">' +
      toolbar('Nastavení', 'Přizpůsob si Rozvrh+ podle sebe.', '') +
      '<div class="settings-layout">' +
        '<article class="settings-card"><h2>Účet</h2><p>Přihlášení a heslo bezpečně spravuje Supabase.</p>' +
          '<div class="account-row"><span class="avatar">' + escapeHtml(accountName.charAt(0).toUpperCase()) + '</span><div><strong>' + escapeHtml(accountName) + '</strong><small>' + escapeHtml(accountEmail) + '</small></div></div>' +
          '<button class="secondary-button button-small button-full" data-action="logout">Odhlásit se</button></article>' +
        '<article class="settings-card"><h2>Profil</h2><p>Jméno se zobrazuje jen v tomto zařízení.</p>' +
          '<form id="profile-form"><label class="field">Tvoje jméno<input name="name" maxlength="40" value="' + escapeHtml(state.settings.name) + '" placeholder="Např. Péťo"></label><button class="primary-button button-small" type="submit">Uložit jméno</button></form></article>' +
        '<article class="settings-card"><h2>Vzhled</h2><p>Změň režim a hlavní barvu aplikace.</p>' +
          '<div class="theme-segment">' + themeButtons + '</div><div class="color-options">' + colorButtons + '</div></article>' +
        '<article class="settings-card"><h2>Instalace aplikace</h2><p>Rozvrh+ pak vypadá a funguje jako běžná aplikace.</p>' +
          '<div class="install-status"><i class="status-dot ' + (installed ? 'on' : '') + '"></i><div><strong>' + (installed ? 'Přidáno na plochu' : 'Zatím otevřeno v prohlížeči') + '</strong><small>' + escapeHtml(installText) + '</small></div></div>' +
          '<button class="primary-button button-small button-full" data-action="show-install">' + icons.install + (installed ? 'Aplikace je nainstalovaná' : 'Jak přidat na plochu') + '</button></article>' +
        '<article class="settings-card"><h2>Kalendáře</h2><p>Export funguje s Apple Kalendářem, Google Kalendářem i Outlookem.</p>' +
          '<button class="secondary-button button-small button-full" data-action="export-calendar">' + icons.calendar + 'Exportovat úkoly a zkoušky</button></article>' +
        '<article class="settings-card full"><h2>Záloha dat</h2><p>Stáhni si nastavení, rozvrh, úkoly, zkoušky a poznámky. Nahrané soubory se kvůli velikosti neexportují.</p>' +
          '<div class="settings-actions"><button class="secondary-button button-small" data-action="export-data">' + icons.download + 'Stáhnout zálohu</button>' +
          '<button class="secondary-button button-small" data-action="import-data">' + icons.upload + 'Nahrát zálohu</button>' +
          '<button class="danger-button button-small" data-action="reset-request">' + icons.trash + 'Smazat všechna data</button></div></article>' +
      '</div></section>';
  }

  function option(value, label, selected) {
    return '<option value="' + escapeHtml(value) + '"' + (value === selected ? ' selected' : '') + '>' + escapeHtml(label || value) + '</option>';
  }

  function showModal(title, body, className) {
    modalRoot.innerHTML = '<div class="modal-backdrop" data-action="backdrop-close">' +
      '<section class="modal ' + (className || '') + '" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-modal-panel>' +
      '<header class="modal-header"><h2 id="modal-title">' + escapeHtml(title) + '</h2><button class="modal-close" type="button" data-action="close-modal" aria-label="Zavřít">×</button></header>' +
      '<div class="modal-body">' + body + '</div></section></div>';
    document.body.classList.add('modal-open');
    setTimeout(function () {
      var focusable = modalRoot.querySelector('input:not([type="hidden"]), textarea, select, button');
      if (focusable) focusable.focus();
    }, 20);
  }

  function closeModal() {
    modalRoot.innerHTML = '';
    document.body.classList.remove('modal-open');
  }

  function formActions(label) {
    return '<div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Zrušit</button><button class="primary-button" type="submit">' + escapeHtml(label) + '</button></div>';
  }

  function openLessonForm(existing) {
    var lesson = existing || { day: ui.scheduleDay, start: '08:00', end: '08:45', name: '', teacher: '', room: '', color: state.settings.accent, notes: '' };
    var days = DAYS.map(function (day, index) { return option(String(index), day, String(lesson.day)); }).join('');
    var body = '<form data-editor="lesson" data-id="' + (lesson.id || '') + '">' +
      '<label class="field">Den<select name="day" required>' + days + '</select></label>' +
      '<label class="field">Název předmětu<input name="name" maxlength="60" value="' + escapeHtml(lesson.name) + '" placeholder="Např. Matematika" required></label>' +
      '<div class="field-row"><label class="field">Začátek<input name="start" type="time" value="' + escapeHtml(lesson.start) + '" required></label>' +
      '<label class="field">Konec<input name="end" type="time" value="' + escapeHtml(lesson.end) + '" required></label></div>' +
      '<div class="field-row"><label class="field">Učitel<input name="teacher" maxlength="60" value="' + escapeHtml(lesson.teacher || '') + '" placeholder="Volitelné"></label>' +
      '<label class="field">Učebna<input name="room" maxlength="30" value="' + escapeHtml(lesson.room || '') + '" placeholder="Volitelné"></label></div>' +
      '<label class="field">Barva předmětu<input name="color" type="color" value="' + escapeHtml(lesson.color || state.settings.accent) + '"></label>' +
      '<label class="field">Poznámka<textarea name="notes" maxlength="400" placeholder="Co si chceš k hodině pamatovat?">' + escapeHtml(lesson.notes || '') + '</textarea></label>' +
      formActions(existing ? 'Uložit změny' : 'Přidat hodinu') + '</form>';
    showModal(existing ? 'Upravit hodinu' : 'Přidat hodinu', body);
  }

  function openTaskForm(existing) {
    var task = existing || { title: '', subject: '', due: isoOffset(0), priority: 'Střední', notes: '', done: false };
    var body = '<form data-editor="task" data-id="' + (task.id || '') + '">' +
      '<label class="field">Název úkolu<input name="title" maxlength="100" value="' + escapeHtml(task.title) + '" placeholder="Co je potřeba udělat?" required></label>' +
      '<label class="field">Předmět<input name="subject" maxlength="60" value="' + escapeHtml(task.subject || '') + '" placeholder="Např. Matematika" required></label>' +
      '<div class="field-row"><label class="field">Termín<input name="due" type="date" value="' + escapeHtml(task.due) + '" required></label>' +
      '<label class="field">Priorita<select name="priority">' + option('Nízká', 'Nízká', task.priority) + option('Střední', 'Střední', task.priority) + option('Vysoká', 'Vysoká', task.priority) + '</select></label></div>' +
      '<label class="field">Poznámka<textarea name="notes" maxlength="500" placeholder="Volitelná poznámka">' + escapeHtml(task.notes || '') + '</textarea></label>' +
      formActions(existing ? 'Uložit změny' : 'Přidat úkol') + '</form>';
    showModal(existing ? 'Upravit úkol' : 'Nový úkol', body);
  }

  function openExamForm(existing) {
    var exam = existing || { title: '', subject: '', date: isoOffset(1), type: 'Písemka', notes: '', color: state.settings.accent };
    var body = '<form data-editor="exam" data-id="' + (exam.id || '') + '">' +
      '<label class="field">Název<input name="title" maxlength="100" value="' + escapeHtml(exam.title) + '" placeholder="Např. Písemka – zlomky" required></label>' +
      '<label class="field">Předmět<input name="subject" maxlength="60" value="' + escapeHtml(exam.subject || '') + '" placeholder="Např. Matematika" required></label>' +
      '<div class="field-row"><label class="field">Datum<input name="date" type="date" value="' + escapeHtml(exam.date) + '" required></label>' +
      '<label class="field">Typ<select name="type">' + option('Písemka','Písemka',exam.type) + option('Test','Test',exam.type) + option('Zkoušení','Zkoušení',exam.type) + option('Projekt','Projekt',exam.type) + '</select></label></div>' +
      '<label class="field">Barva<input name="color" type="color" value="' + escapeHtml(exam.color || state.settings.accent) + '"></label>' +
      '<label class="field">Co se naučit<textarea name="notes" maxlength="500" placeholder="Témata, stránky nebo poznámky">' + escapeHtml(exam.notes || '') + '</textarea></label>' +
      formActions(existing ? 'Uložit změny' : 'Přidat zkoušku') + '</form>';
    showModal(existing ? 'Upravit zkoušku' : 'Nová zkouška', body);
  }

  function openNoteForm(existing) {
    var note = existing || { title: '', body: '', color: state.settings.accent };
    var body = '<form data-editor="note" data-id="' + (note.id || '') + '">' +
      '<label class="field">Název<input name="title" maxlength="80" value="' + escapeHtml(note.title) + '" placeholder="Název poznámky" required></label>' +
      '<label class="field">Text<textarea name="body" maxlength="5000" placeholder="Začni psát…">' + escapeHtml(note.body || '') + '</textarea></label>' +
      '<label class="field">Barva<input name="color" type="color" value="' + escapeHtml(note.color || state.settings.accent) + '"></label>' +
      formActions(existing ? 'Uložit změny' : 'Vytvořit poznámku') + '</form>';
    showModal(existing ? 'Upravit poznámku' : 'Nová poznámka', body);
  }

  function openMore() {
    var extras = NAV.filter(function (item) { return ['zkousky','materialy','poznamky','statistiky','nastaveni'].indexOf(item.id) >= 0; });
    var body = '<div class="side-nav" style="gap:8px">' + extras.map(function (item) {
      return '<button class="nav-item" style="background:var(--surface-2);color:var(--ink)" data-action="navigate" data-view="' + item.id + '">' + icons[item.icon] + '<span>' + item.label + '</span></button>';
    }).join('') + '</div>';
    showModal('Další části', body);
  }

  function openDeleteConfirm(kind, itemId) {
    var labels = { lesson: 'hodinu', task: 'úkol', exam: 'zkoušku', note: 'poznámku', material: 'soubor' };
    var body = '<p style="margin:0;color:var(--muted)">Opravdu chceš tuto ' + (labels[kind] || 'položku') + ' smazat? Tuto akci nepůjde vrátit.</p>' +
      '<div class="modal-actions"><button class="secondary-button" data-action="close-modal">Nechat</button><button class="danger-button" data-action="delete-confirm" data-kind="' + kind + '" data-id="' + itemId + '">Smazat</button></div>';
    showModal('Potvrdit smazání', body);
  }

  function saveEditor(form) {
    var data = new FormData(form);
    var kind = form.dataset.editor;
    var itemId = form.dataset.id;
    if (kind === 'lesson') {
      var lesson = {
        id: itemId || id(),
        day: Number(data.get('day')),
        start: String(data.get('start')),
        end: String(data.get('end')),
        name: String(data.get('name')).trim(),
        teacher: String(data.get('teacher')).trim(),
        room: String(data.get('room')).trim(),
        color: String(data.get('color')),
        notes: String(data.get('notes')).trim()
      };
      if (timeMinutes(lesson.end) <= timeMinutes(lesson.start)) {
        toast('Konec hodiny musí být později než začátek.', 'error');
        return;
      }
      ui.scheduleDay = lesson.day;
      state.lessons = itemId ? state.lessons.map(function (item) { return item.id === itemId ? lesson : item; }) : state.lessons.concat(lesson);
    } else if (kind === 'task') {
      var oldTask = state.tasks.find(function (item) { return item.id === itemId; });
      var task = {
        id: itemId || id(),
        title: String(data.get('title')).trim(),
        subject: String(data.get('subject')).trim(),
        due: String(data.get('due')),
        priority: String(data.get('priority')),
        done: oldTask ? oldTask.done : false,
        notes: String(data.get('notes')).trim()
      };
      state.tasks = itemId ? state.tasks.map(function (item) { return item.id === itemId ? task : item; }) : state.tasks.concat(task);
    } else if (kind === 'exam') {
      var exam = {
        id: itemId || id(),
        title: String(data.get('title')).trim(),
        subject: String(data.get('subject')).trim(),
        date: String(data.get('date')),
        type: String(data.get('type')),
        color: String(data.get('color')),
        notes: String(data.get('notes')).trim()
      };
      state.exams = itemId ? state.exams.map(function (item) { return item.id === itemId ? exam : item; }) : state.exams.concat(exam);
    } else if (kind === 'note') {
      var note = {
        id: itemId || id(),
        title: String(data.get('title')).trim(),
        body: String(data.get('body')).trim(),
        color: String(data.get('color')),
        updatedAt: new Date().toISOString()
      };
      state.notes = itemId ? state.notes.map(function (item) { return item.id === itemId ? note : item; }) : state.notes.concat(note);
    }
    saveState();
    closeModal();
    render();
    toast(itemId ? 'Změny jsou uložené.' : 'Položka byla přidána.');
  }

  async function confirmDelete(kind, itemId) {
    if (kind === 'lesson') state.lessons = state.lessons.filter(function (item) { return item.id !== itemId; });
    else if (kind === 'task') state.tasks = state.tasks.filter(function (item) { return item.id !== itemId; });
    else if (kind === 'exam') state.exams = state.exams.filter(function (item) { return item.id !== itemId; });
    else if (kind === 'note') state.notes = state.notes.filter(function (item) { return item.id !== itemId; });
    else if (kind === 'material') await removeMaterial(itemId);
    if (kind !== 'material') saveState();
    closeModal();
    render();
    toast('Položka byla smazána.');
  }

  function createDownload(name, content, type) {
    var blob = content instanceof Blob ? content : new Blob([content], { type: type || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function exportData() {
    createDownload('rozvrh-plus-zaloha-' + isoOffset(0) + '.json', JSON.stringify(state, null, 2), 'application/json');
    toast('Záloha byla stažena.');
  }

  function icsEscape(value) {
    return String(value || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }

  function icsDate(iso) {
    return String(iso).replace(/-/g, '');
  }

  function exportCalendar() {
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//RozvrhPlus//CZ', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Rozvrh+'];
    state.tasks.forEach(function (task) {
      var end = asDate(task.due);
      end.setDate(end.getDate() + 1);
      lines.push('BEGIN:VEVENT', 'UID:task-' + task.id + '@rozvrh.plus', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''), 'DTSTART;VALUE=DATE:' + icsDate(task.due), 'DTEND;VALUE=DATE:' + icsDate(localISO(end)), 'SUMMARY:' + icsEscape('Úkol: ' + task.title), 'DESCRIPTION:' + icsEscape(task.subject + (task.notes ? '\n' + task.notes : '')), 'END:VEVENT');
    });
    state.exams.forEach(function (exam) {
      var end = asDate(exam.date);
      end.setDate(end.getDate() + 1);
      lines.push('BEGIN:VEVENT', 'UID:exam-' + exam.id + '@rozvrh.plus', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''), 'DTSTART;VALUE=DATE:' + icsDate(exam.date), 'DTEND;VALUE=DATE:' + icsDate(localISO(end)), 'SUMMARY:' + icsEscape(exam.type + ': ' + exam.title), 'DESCRIPTION:' + icsEscape(exam.subject + (exam.notes ? '\n' + exam.notes : '')), 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    createDownload('rozvrh-plus-kalendar.ics', lines.join('\r\n'), 'text/calendar;charset=utf-8');
    toast('Kalendář je připravený k importu.');
  }

  function resetDataRequest() {
    var body = '<p style="margin:0;color:var(--muted)">Smaže se rozvrh, úkoly, zkoušky, poznámky i nahrané materiály z tohoto zařízení.</p>' +
      '<div class="modal-actions"><button class="secondary-button" data-action="close-modal">Zrušit</button><button class="danger-button" data-action="reset-confirm">Smazat vše</button></div>';
    showModal('Smazat všechna data?', body);
  }

  async function resetAll() {
    state = defaults();
    state.lessons = []; state.tasks = []; state.exams = []; state.notes = [];
    localStorage.removeItem(OLD_STORE_KEY);
    saveState();
    await clearMaterials();
    closeModal();
    go('domu');
    toast('Data byla smazána z tohoto zařízení.');
  }

  function openDatabase() {
    return new Promise(function (resolve, reject) {
      if (!('indexedDB' in window)) return reject(new Error('IndexedDB není dostupné.'));
      var request = indexedDB.open('rozvrh-plus-files', 1);
      request.onupgradeneeded = function () {
        if (!request.result.objectStoreNames.contains('files')) request.result.createObjectStore('files', { keyPath: 'id' });
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
  }

  async function refreshMaterials() {
    try {
      var db = await openDatabase();
      var allMaterials = await new Promise(function (resolve, reject) {
        var request = db.transaction('files', 'readonly').objectStore('files').getAll();
        request.onsuccess = function () { resolve(request.result || []); };
        request.onerror = function () { reject(request.error); };
      });
      var migrationOwner = localStorage.getItem(DATA_MIGRATION_KEY);
      ui.materials = allMaterials.filter(function (file) {
        return currentUser && (file.ownerId === currentUser.id || (!file.ownerId && migrationOwner === currentUser.id));
      });
      ui.materials.sort(function (a, b) { return b.addedAt.localeCompare(a.addedAt); });
      db.close();
      if (ui.view === 'materialy') renderMaterials();
    } catch (error) {
      console.warn(error);
    }
  }

  async function addMaterials(fileList) {
    var files = Array.from(fileList || []);
    if (!files.length) return;
    try {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
      var db = await openDatabase();
      await new Promise(function (resolve, reject) {
        var transaction = db.transaction('files', 'readwrite');
        var store = transaction.objectStore('files');
        files.forEach(function (file) {
          store.put({ id: id(), ownerId: currentUser.id, name: file.name, type: file.type || 'application/octet-stream', size: file.size, addedAt: new Date().toISOString(), blob: file });
        });
        transaction.oncomplete = resolve;
        transaction.onerror = function () { reject(transaction.error); };
      });
      db.close();
      await refreshMaterials();
      toast(files.length === 1 ? 'Soubor byl uložen.' : 'Soubory byly uloženy.');
    } catch (error) {
      toast('Soubor se nepodařilo uložit. Možná je příliš velký.', 'error');
    }
  }

  async function getMaterial(itemId) {
    var db = await openDatabase();
    var result = await new Promise(function (resolve, reject) {
      var request = db.transaction('files', 'readonly').objectStore('files').get(itemId);
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
    db.close();
    var migrationOwner = localStorage.getItem(DATA_MIGRATION_KEY);
    if (!currentUser || !result || (result.ownerId !== currentUser.id && !(!result.ownerId && migrationOwner === currentUser.id))) return null;
    return result;
  }

  async function downloadMaterial(itemId) {
    try {
      var file = await getMaterial(itemId);
      if (!file) throw new Error('Soubor nenalezen.');
      createDownload(file.name, file.blob, file.type);
    } catch (error) {
      toast('Soubor se nepodařilo otevřít.', 'error');
    }
  }

  async function removeMaterial(itemId) {
    var ownedFile = await getMaterial(itemId);
    if (!ownedFile) return;
    var db = await openDatabase();
    await new Promise(function (resolve, reject) {
      var request = db.transaction('files', 'readwrite').objectStore('files').delete(itemId);
      request.onsuccess = resolve;
      request.onerror = function () { reject(request.error); };
    });
    db.close();
    await refreshMaterials();
  }

  async function clearMaterials() {
    try {
      var db = await openDatabase();
      await new Promise(function (resolve, reject) {
        var transaction = db.transaction('files', 'readwrite');
        var store = transaction.objectStore('files');
        var request = store.getAll();
        request.onsuccess = function () {
          var migrationOwner = localStorage.getItem(DATA_MIGRATION_KEY);
          (request.result || []).forEach(function (file) {
            if (currentUser && (file.ownerId === currentUser.id || (!file.ownerId && migrationOwner === currentUser.id))) store.delete(file.id);
          });
        };
        request.onerror = function () { reject(request.error); };
        transaction.oncomplete = resolve;
        transaction.onerror = function () { reject(transaction.error); };
      });
      db.close();
      ui.materials = [];
    } catch (error) {
      ui.materials = [];
    }
  }

  function showInstallGuide() {
    var installed = isStandalone();
    var ios = isIOS();
    if (installed) {
      showModal('Rozvrh+ je na ploše', '<div class="empty-state compact"><span class="empty-state-icon">✓</span><strong>Hotovo</strong><p>Aplikace už běží v samostatném režimu.</p></div><button class="primary-button button-full" data-action="close-modal">Pokračovat</button>');
      return;
    }
    if (!ios && ui.installPrompt) {
      showModal('Nainstalovat Rozvrh+', '<p style="margin:0 0 18px;color:var(--muted)">Přidej aplikaci do zařízení. Bude se spouštět z vlastní ikony a základní části budou dostupné i bez internetu.</p><button class="primary-button button-full" data-action="install-now">' + icons.install + 'Nainstalovat aplikaci</button>');
      return;
    }
    if (ios) {
      var safariTip = /CriOS|FxiOS|EdgiOS/.test(navigator.userAgent) ? '<p class="install-tip">Nejdřív stránku otevři v Safari. V jiném prohlížeči nemusí být volba „Přidat na plochu“ dostupná.</p>' : '';
      modalRoot.innerHTML = '<div class="modal-backdrop" data-action="backdrop-close"><section class="modal install-modal" role="dialog" aria-modal="true" aria-labelledby="install-title" data-modal-panel>' +
        '<div class="install-hero"><div class="install-app-icon">R<span>+</span></div><h2 id="install-title">Přidej Rozvrh+ na plochu</h2><p>Pokud už ikonu máš, otevři aplikaci z plochy. Prohlížeč neumí spolehlivě zjistit, zda tam ikona existuje.</p></div>' +
        '<div class="install-steps">' +
          '<div class="install-step"><span class="step-number">1</span><div><strong>Klepni na Sdílet</strong><small>Ikona je dole uprostřed v Safari.</small></div><span class="share-symbol">⇧</span></div>' +
          '<div class="install-step"><span class="step-number">2</span><div><strong>Vyber „Přidat na plochu“</strong><small>Možná bude potřeba nabídku posunout níž.</small></div><span>＋</span></div>' +
          '<div class="install-step"><span class="step-number">3</span><div><strong>Potvrď tlačítkem „Přidat“</strong><small>Ikona Rozvrh+ se objeví na ploše iPhonu.</small></div><span>✓</span></div>' +
        '</div>' + safariTip +
        '<div class="install-done"><button class="primary-button button-full" data-action="dismiss-install">Rozumím</button></div></section></div>';
      document.body.classList.add('modal-open');
      return;
    }
    showModal('Přidat Rozvrh+ do zařízení', '<p style="margin:0 0 14px;color:var(--muted)">V nabídce prohlížeče zvol „Nainstalovat aplikaci“ nebo „Přidat na domovskou obrazovku“.</p><button class="primary-button button-full" data-action="close-modal">Rozumím</button>');
  }

  function dismissInstall() {
    localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now()));
    document.getElementById('install-nudge').hidden = true;
    closeModal();
  }

  async function installNow() {
    if (!ui.installPrompt) return showInstallGuide();
    ui.installPrompt.prompt();
    await ui.installPrompt.userChoice;
    ui.installPrompt = null;
    closeModal();
  }

  function maybeShowInstall() {
    if (appRoot.hidden) return;
    if (isStandalone()) return;
    var dismissed = Number(localStorage.getItem(INSTALL_DISMISS_KEY) || 0);
    if (Date.now() - dismissed < 7 * 86400000) return;
    if (isIOS()) {
      setTimeout(function () {
        if (!modalRoot.firstChild && !isStandalone()) showInstallGuide();
      }, 1400);
    } else if (ui.installPrompt) {
      var nudge = document.getElementById('install-nudge');
      document.getElementById('install-nudge-text').textContent = 'Nainstaluj ji jedním klepnutím.';
      nudge.hidden = false;
    }
  }

  document.addEventListener('click', async function (event) {
    var button = event.target.closest('[data-action]');
    if (!button) return;
    var action = button.dataset.action;
    if (action === 'backdrop-close' && event.target !== button) return;
    if (action === 'auth-view') renderAuth(button.dataset.authView);
    else if (action === 'toggle-password') {
      var passwordInput = button.parentElement.querySelector('input');
      var reveal = passwordInput.type === 'password';
      passwordInput.type = reveal ? 'text' : 'password';
      button.textContent = reveal ? 'Skrýt' : 'Ukázat';
    } else if (action === 'logout') await logout();
    else if (action === 'navigate') {
      closeModal();
      go(button.dataset.view);
    } else if (action === 'more') openMore();
    else if (action === 'close-modal' || action === 'backdrop-close') closeModal();
    else if (action === 'select-day') { ui.scheduleDay = Number(button.dataset.day); renderSchedule(); }
    else if (action === 'add-lesson') openLessonForm();
    else if (action === 'edit-lesson') openLessonForm(state.lessons.find(function (item) { return item.id === button.dataset.id; }));
    else if (action === 'add-task') openTaskForm();
    else if (action === 'edit-task') openTaskForm(state.tasks.find(function (item) { return item.id === button.dataset.id; }));
    else if (action === 'toggle-task') {
      state.tasks = state.tasks.map(function (item) { return item.id === button.dataset.id ? Object.assign({}, item, { done: !item.done }) : item; });
      saveState();
      render();
    } else if (action === 'task-filter') { ui.taskFilter = button.dataset.filter; renderTasks(); }
    else if (action === 'add-exam') openExamForm();
    else if (action === 'edit-exam') openExamForm(state.exams.find(function (item) { return item.id === button.dataset.id; }));
    else if (action === 'add-note') openNoteForm();
    else if (action === 'edit-note') openNoteForm(state.notes.find(function (item) { return item.id === button.dataset.id; }));
    else if (action === 'delete-request') openDeleteConfirm(button.dataset.kind, button.dataset.id);
    else if (action === 'delete-confirm') await confirmDelete(button.dataset.kind, button.dataset.id);
    else if (action === 'calendar-prev') { ui.calendarMonth = new Date(ui.calendarMonth.getFullYear(), ui.calendarMonth.getMonth() - 1, 1); renderCalendar(); }
    else if (action === 'calendar-next') { ui.calendarMonth = new Date(ui.calendarMonth.getFullYear(), ui.calendarMonth.getMonth() + 1, 1); renderCalendar(); }
    else if (action === 'calendar-select') { ui.calendarSelected = button.dataset.date; renderCalendar(); }
    else if (action === 'upload-material') document.getElementById('material-input').click();
    else if (action === 'download-material') await downloadMaterial(button.dataset.id);
    else if (action === 'set-theme') { state.settings.theme = button.dataset.theme; saveState(); renderSettings(); applyAppearance(); }
    else if (action === 'set-accent') { state.settings.accent = button.dataset.color; saveState(); render(); }
    else if (action === 'export-data') exportData();
    else if (action === 'import-data') document.getElementById('import-input').click();
    else if (action === 'export-calendar') exportCalendar();
    else if (action === 'reset-request') resetDataRequest();
    else if (action === 'reset-confirm') await resetAll();
    else if (action === 'show-install') showInstallGuide();
    else if (action === 'dismiss-install') dismissInstall();
    else if (action === 'install-now') await installNow();
  });

  document.addEventListener('submit', function (event) {
    if (event.target.matches('[data-auth-form]')) {
      event.preventDefault();
      handleAuthSubmit(event.target);
    } else if (event.target.matches('[data-editor]')) {
      event.preventDefault();
      saveEditor(event.target);
    } else if (event.target.id === 'profile-form') {
      event.preventDefault();
      var name = String(new FormData(event.target).get('name') || '').trim();
      state.settings.name = name || 'Student';
      saveState();
      render();
      toast('Jméno bylo uložené.');
    }
  });

  document.addEventListener('input', function (event) {
    var idValue = event.target.id;
    if (idValue !== 'task-search' && idValue !== 'note-search' && idValue !== 'material-search') return;
    var value = event.target.value;
    if (idValue === 'task-search') ui.taskQuery = value;
    if (idValue === 'note-search') ui.noteQuery = value;
    if (idValue === 'material-search') ui.materialQuery = value;
    var position = event.target.selectionStart;
    if (idValue === 'task-search') renderTasks();
    if (idValue === 'note-search') renderNotes();
    if (idValue === 'material-search') renderMaterials();
    var replacement = document.getElementById(idValue);
    if (replacement) {
      replacement.focus();
      replacement.setSelectionRange(position, position);
    }
  });

  document.getElementById('material-input').addEventListener('change', function (event) {
    addMaterials(event.target.files);
    event.target.value = '';
  });

  document.getElementById('import-input').addEventListener('change', function (event) {
    var file = event.target.files && event.target.files[0];
    event.target.value = '';
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var imported = JSON.parse(reader.result);
        if (!imported || !Array.isArray(imported.lessons) || !Array.isArray(imported.tasks) || !Array.isArray(imported.exams) || !Array.isArray(imported.notes)) throw new Error('Neplatná záloha.');
        state = {
          version: 2,
          settings: Object.assign(defaults().settings, imported.settings || {}),
          lessons: imported.lessons,
          tasks: imported.tasks,
          exams: imported.exams,
          notes: imported.notes
        };
        saveState();
        render();
        toast('Záloha byla obnovena.');
      } catch (error) {
        toast('Soubor není platná záloha Rozvrh+.', 'error');
      }
    };
    reader.readAsText(file);
  });

  window.addEventListener('hashchange', function () {
    var view = location.hash.slice(1);
    if (currentUser && validView(view) && view !== ui.view) go(view);
  });

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    ui.installPrompt = event;
    maybeShowInstall();
  });

  window.addEventListener('appinstalled', function () {
    ui.installPrompt = null;
    document.getElementById('install-nudge').hidden = true;
    closeModal();
    toast('Rozvrh+ je nainstalovaný.');
    if (ui.view === 'nastaveni') renderSettings();
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modalRoot.firstChild) closeModal();
  });

  var themeQuery = matchMedia('(prefers-color-scheme: dark)');
  if (themeQuery.addEventListener) themeQuery.addEventListener('change', function () {
    if (state.settings.theme === 'system') applyAppearance();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function (error) { console.warn('Service worker:', error); });
    });
  }

  applyAppearance();
  initializeAuth();
  setInterval(function () { if (!appRoot.hidden && ui.view === 'domu' && !modalRoot.firstChild) renderHome(); }, 60000);
})();
