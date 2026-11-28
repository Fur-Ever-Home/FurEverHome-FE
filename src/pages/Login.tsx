import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import { useLanguage } from '../useLanguage';
import { useAuthSession, type UserRole } from '../useAuthSession';
import { translations } from '../translations';
import { API_BASE_URL } from '../config';
import './Login.css';

type AuthView = 'login' | 'register';
type ResetStep = 'request' | 'sent' | 'confirm';
const PASSWORD_RESET_API = `${API_BASE_URL}/api/auth/password-reset`;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const { refreshSession } = useAuthSession();
  const t = translations[lang]?.auth || translations.ro.auth;

  const [role, setRole] = useState<UserRole>('adopter');
  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);

  // Câmpuri comune & autentificare
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Câmpuri înregistrare Adoptator
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  // Câmpuri înregistrare Centru / Adăpost
  const [shelterName, setShelterName] = useState('');
  const [cui, setCui] = useState('');

  // Telefon
  const [phonePrefix, setPhonePrefix] = useState('+40');
  const [phone, setPhone] = useState('');

  // Mesaje formular
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [resetStep, setResetStep] = useState<ResetStep | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    const token = new URLSearchParams(location.hash.slice(1)).get('reset');
    if (token === null) return;

    setResetToken(token);
    setResetError('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setResetStep('confirm');
    navigate({ pathname: location.pathname, search: location.search }, { replace: true });
  }, [location.hash, location.pathname, location.search, navigate]);

  const clearFormMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    clearFormMessages();
  };

  const handleViewSwitch = (newView: AuthView) => {
    setView(newView);
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    clearFormMessages();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    clearFormMessages();

    if (!email.trim() || !password.trim()) {
      setErrorMsg(t.errRequired);
      return;
    }

    if (view === 'register') {
      if (password !== confirmPassword) {
        setErrorMsg(t.errPasswordMismatch);
        return;
      }
      if (role === 'adopter' && (!lastName.trim() || !firstName.trim() || !phone.trim())) {
        setErrorMsg(t.errRequired);
        return;
      }
      if (password.length < 8 || password.length > 128) {
        setErrorMsg(t.errRegistrationPasswordLength);
        return;
      }
      if (role === 'shelter' && (!shelterName.trim() || !cui.trim() || !phone.trim())) {
        setErrorMsg(t.errRequired);
        return;
      }

      const registerPayload =
        role === 'adopter'
          ? {
              role,
              lastName: lastName.trim(),
              firstName: firstName.trim(),
              countryCode: phonePrefix,
              phone: phone.trim(),
              email: email.trim(),
              password,
            }
          : {
              role,
              shelterName: shelterName.trim(),
              cui: cui.trim(),
              countryCode: phonePrefix,
              phone: phone.trim(),
              email: email.trim(),
              password,
            };

      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerPayload),
        });

        if (res.status === 201) {
          setPassword('');
          setConfirmPassword('');
          setShowPassword(false);
          setShowConfirmPassword(false);
          setSuccessMsg(role === 'adopter' ? t.successRegisterAdopter : t.successRegisterShelter);
        } else if (res.status === 409) {
          const data = await res.json().catch(() => null);
          switch (data?.code) {
            case 'PHONE_ALREADY_USED':
              setErrorMsg(t.errPhoneAlreadyUsed);
              break;
            case 'CUI_ALREADY_USED':
              setErrorMsg(t.errCuiAlreadyUsed);
              break;
            default:
              setErrorMsg(t.errEmailAlreadyUsed);
          }
        } else if (res.status === 400) {
          setErrorMsg(t.errInvalidRegistrationData);
        } else if (res.status === 503 && role === 'shelter') {
          setErrorMsg(t.errShelterNotificationUnavailable);
        } else {
          setErrorMsg(t.errGeneric);
        }
      } catch {
        setErrorMsg(t.errGeneric);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Autentificare (Login)
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role,
        }),
      });

      if (res.status === 401) {
        setErrorMsg(t.errInvalidCredentials);
        return;
      }
      if (res.status === 403) {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.code === 'SHELTER_APPROVAL_PENDING' ? t.errShelterApprovalPending : t.errGeneric);
        return;
      }
      if (!res.ok) {
        setErrorMsg(res.status === 400 ? t.errInvalidCredentials : t.errGeneric);
        return;
      }

      const user = await refreshSession();
      if (!user || user.role !== role || user.email.toLowerCase() !== email.trim().toLowerCase()) {
        setErrorMsg(t.errGeneric);
        return;
      }
      navigate('/', { replace: true });
    } catch {
      setErrorMsg(t.errGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const openResetModal = () => {
    setResetEmail(email);
    setResetToken(null);
    setNewPassword('');
    setConfirmNewPassword('');
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setResetError('');
    setResetStep('request');
  };

  const closeResetModal = () => {
    if (isResetting) return;
    setResetStep(null);
    setResetToken(null);
    setNewPassword('');
    setConfirmNewPassword('');
    setResetError('');
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetting) return;
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setResetError(t.errInvalidEmail);
      return;
    }
    setResetError('');
    setIsResetting(true);
    try {
      const response = await fetch(`${PASSWORD_RESET_API}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim() }),
      });
      if (response.status === 202) {
        setResetStep('sent');
      } else {
        setResetError(response.status === 400 ? t.errInvalidEmail : t.errGeneric);
      }
    } catch {
      setResetError(t.errGeneric);
    } finally {
      setIsResetting(false);
    }
  };

  const handleResetConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetting) return;
    if (!resetToken) {
      setResetError(t.errInvalidResetToken);
      return;
    }
    if (!newPassword.trim() || !confirmNewPassword.trim()) {
      setResetError(t.errRequired);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setResetError(t.errPasswordMismatch);
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 128) {
      setResetError(t.errRegistrationPasswordLength);
      return;
    }

    setResetError('');
    setIsResetting(true);
    try {
      const response = await fetch(`${PASSWORD_RESET_API}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });
      if (response.status !== 204) {
        const body = await response.json().catch(() => null);
        if (body?.code === 'INVALID_RESET_TOKEN') {
          setResetError(t.errInvalidResetToken);
        } else {
          setResetError(body?.code === 'INVALID_NEW_PASSWORD' ? t.errRegistrationPasswordLength : t.errGeneric);
        }
        return;
      }

      setResetToken(null);
      setResetStep(null);
      setNewPassword('');
      setConfirmNewPassword('');
      handleViewSwitch('login');
      setSuccessMsg(t.successPasswordReset);
      void refreshSession().catch(() => {});
    } catch {
      setResetError(t.errGeneric);
    } finally {
      setIsResetting(false);
    }
  };

  const renderMailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  );

  const renderLockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );

  const renderEyeIcon = (visible: boolean) =>
    visible ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-3.17 4.49" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  const emailPlaceholder =
    role === 'adopter' ? t.emailPlaceholderAdopter : t.emailPlaceholderShelter;

  return (
    <div className="auth-page-wrapper">
      <Header />

      <main className="auth-main">
        <div
          className={`auth-card ${
            view === 'register' && role === 'shelter' ? 'auth-card--wide' : ''
          }`}
        >
          <h1 className="auth-welcome-title">
            {t.welcomePrefix} <span>FureverHome</span>
          </h1>

          {/* Comutator Adoptator / Centru / Adăpost */}
          <div className="auth-role-switch" role="tablist" aria-label={t.roleSwitchAria}>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'adopter'}
              disabled={isLoading}
              className={`auth-role-btn ${role === 'adopter' ? 'is-active' : ''}`}
              onClick={() => handleRoleChange('adopter')}
            >
              {t.roleAdopter}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'shelter'}
              disabled={isLoading}
              className={`auth-role-btn ${role === 'shelter' ? 'is-active' : ''}`}
              onClick={() => handleRoleChange('shelter')}
            >
              {t.roleShelter}
            </button>
          </div>

          {view === 'login' ? (
            <>
              <h2 className="auth-section-title">{t.loginTitle}</h2>
              <p className="auth-section-subtitle">
                {role === 'adopter' ? t.loginSubtitleAdopter : t.loginSubtitleShelter}
              </p>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-field">
                  <label className="auth-label" htmlFor="login-email">
                    {t.emailLabel}
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden="true">
                      {renderMailIcon()}
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      className="auth-input"
                      placeholder={emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-label-row">
                    <label className="auth-label" htmlFor="login-password">
                      {t.passwordLabel}
                    </label>
                    <button
                      type="button"
                      className="auth-forgot-link"
                      onClick={openResetModal}
                      disabled={isLoading}
                    >
                      {t.forgotPassword}
                    </button>
                  </div>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden="true">
                      {renderLockIcon()}
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      aria-label={t.togglePasswordAria}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {renderEyeIcon(showPassword)}
                    </button>
                  </div>
                </div>

                {errorMsg && <div className="auth-feedback auth-feedback--error">{errorMsg}</div>}
                {successMsg && (
                  <div className="auth-feedback auth-feedback--success" role="status">{successMsg}</div>
                )}

                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                  {t.loginSubmitBtn}
                </button>
              </form>

              <p className="auth-bottom-switch">
                {t.noAccountText}{' '}
                <button type="button" disabled={isLoading} onClick={() => handleViewSwitch('register')}>
                  {t.createAccountLink}
                </button>
              </p>
            </>
          ) : role === 'adopter' ? (
            <>
              <h2 className="auth-section-title">{t.registerAdopterTitle}</h2>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-lastname">
                      {t.lastNameLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        id="reg-lastname"
                        type="text"
                        className="auth-input"
                        placeholder={t.lastNamePlaceholder}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-firstname">
                      {t.firstNameLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        id="reg-firstname"
                        type="text"
                        className="auth-input"
                        placeholder={t.firstNamePlaceholder}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-phone-adopter">
                    {t.phoneLabel}
                  </label>
                  <div className="auth-phone-group">
                    <select
                      className="auth-prefix-select"
                      aria-label={t.phonePrefixAria}
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                    >
                      <option value="+40">+40</option>
                      <option value="+373">+373</option>
                      <option value="+44">+44</option>
                      <option value="+39">+39</option>
                      <option value="+34">+34</option>
                      <option value="+49">+49</option>
                    </select>
                    <div className="auth-input-wrap">
                      <input
                        id="reg-phone-adopter"
                        type="tel"
                        className="auth-input"
                        placeholder="07xx xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-email-adopter">
                    {t.emailLabel}
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      id="reg-email-adopter"
                      type="email"
                      className="auth-input"
                      placeholder={t.emailPlaceholderAdopter}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-pass-adopter">
                    {t.passwordLabel}
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden="true">
                      {renderLockIcon()}
                    </span>
                    <input
                      id="reg-pass-adopter"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="auth-input"
                      placeholder={t.createPasswordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      aria-label={t.togglePasswordAria}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {renderEyeIcon(showPassword)}
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label" htmlFor="reg-confirm-adopter">
                    {t.confirmPasswordLabel}
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden="true">
                      {renderLockIcon()}
                    </span>
                    <input
                      id="reg-confirm-adopter"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="auth-input"
                      placeholder={t.confirmPasswordPlaceholder}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      aria-label={t.togglePasswordAria}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {renderEyeIcon(showConfirmPassword)}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="auth-feedback auth-feedback--error" role="alert">{errorMsg}</div>
                )}
                {successMsg && (
                  <div className="auth-feedback auth-feedback--success" role="status">{successMsg}</div>
                )}

                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                  {t.registerAdopterBtn}
                </button>
              </form>

              <p className="auth-bottom-switch">
                {t.hasAccountText}{' '}
                <button type="button" disabled={isLoading} onClick={() => handleViewSwitch('login')}>
                  {t.loginLink}
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="auth-section-title">{t.registerShelterTitle}</h2>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-sheltername">
                      {t.shelterNameLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        id="reg-sheltername"
                        type="text"
                        className="auth-input"
                        placeholder={t.shelterNamePlaceholder}
                        value={shelterName}
                        onChange={(e) => setShelterName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-cui">
                      {t.cuiLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        id="reg-cui"
                        type="text"
                        className="auth-input"
                        placeholder={t.cuiPlaceholder}
                        value={cui}
                        onChange={(e) => setCui(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-email-shelter">
                      {t.emailLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        id="reg-email-shelter"
                        type="email"
                        className="auth-input"
                        placeholder={t.emailPlaceholderShelter}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-phone-shelter">
                      {t.phoneLabel}
                    </label>
                    <div className="auth-phone-group">
                      <select
                        className="auth-prefix-select"
                        aria-label={t.phonePrefixAria}
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                      >
                        <option value="+40">+40</option>
                        <option value="+373">+373</option>
                        <option value="+44">+44</option>
                        <option value="+39">+39</option>
                        <option value="+34">+34</option>
                        <option value="+49">+49</option>
                      </select>
                      <div className="auth-input-wrap">
                        <input
                          id="reg-phone-shelter"
                          type="tel"
                          className="auth-input"
                          placeholder="07xx xxx xxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-pass-shelter">
                      {t.passwordLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon" aria-hidden="true">
                        {renderLockIcon()}
                      </span>
                      <input
                        id="reg-pass-shelter"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="auth-input"
                        placeholder={t.createPasswordPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        aria-label={t.togglePasswordAria}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {renderEyeIcon(showPassword)}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reg-confirm-shelter">
                      {t.confirmPasswordLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon" aria-hidden="true">
                        {renderLockIcon()}
                      </span>
                      <input
                        id="reg-confirm-shelter"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="auth-input"
                        placeholder={t.confirmPasswordPlaceholder}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        aria-label={t.togglePasswordAria}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {renderEyeIcon(showConfirmPassword)}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="auth-shelter-notice">
                  <span className="auth-shelter-notice-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  <span>
                    <strong>{t.shelterNoteBold}</strong> {t.shelterNoteText}
                  </span>
                </div>

                {errorMsg && (
                  <div className="auth-feedback auth-feedback--error" role="alert">{errorMsg}</div>
                )}
                {successMsg && (
                  <div className="auth-feedback auth-feedback--success" role="status">{successMsg}</div>
                )}

                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                  {t.registerShelterBtn}
                </button>
              </form>

              <p className="auth-bottom-switch">
                {t.hasAccountText}{' '}
                <button type="button" disabled={isLoading} onClick={() => handleViewSwitch('login')}>
                  {t.loginLink}
                </button>
              </p>
            </>
          )}
        </div>
      </main>

      {resetStep !== null && (
        <div
          className="auth-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="password-reset-title"
          onClick={closeResetModal}
        >
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="auth-modal-close"
              aria-label={t.closeModalAria}
              onClick={closeResetModal}
              disabled={isResetting}
            >
              ✕
            </button>

            {resetStep === 'request' ? (
              <>
                <h2 id="password-reset-title" className="auth-modal-title">{t.resetStep1Title}</h2>
                <p className="auth-modal-desc">{t.resetStep1Desc}</p>

                <form className="auth-modal-form" onSubmit={handleResetRequest}>
                  <div className="auth-input-wrap">
                    <input
                      type="email"
                      className="auth-input"
                      aria-label={t.emailLabel}
                      autoComplete="email"
                      required
                      placeholder={t.emailLabel}
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </div>

                  {resetError && (
                    <div className="auth-feedback auth-feedback--error" role="alert">{resetError}</div>
                  )}

                  <button type="submit" className="auth-modal-dark-btn" disabled={isResetting}>
                    {t.resetStep1Btn}
                  </button>
                </form>
              </>
            ) : resetStep === 'sent' ? (
              <>
                <h2 id="password-reset-title" className="auth-modal-title">{t.resetSentTitle}</h2>
                <p className="auth-modal-desc" role="status">{t.resetSentDesc}</p>
              </>
            ) : (
              <>
                <h2 id="password-reset-title" className="auth-modal-title">{t.resetStep2Title}</h2>
                <p className="auth-modal-desc">{t.resetStep2Desc}</p>

                <form className="auth-modal-form" onSubmit={handleResetConfirmation}>
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reset-new-pass">
                      {t.newPasswordLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon" aria-hidden="true">
                        {renderLockIcon()}
                      </span>
                      <input
                        id="reset-new-pass"
                        autoComplete="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder={t.newPasswordPlaceholder}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        aria-label={t.togglePasswordAria}
                        onClick={() => setShowNewPassword((prev) => !prev)}
                      >
                        {renderEyeIcon(showNewPassword)}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label" htmlFor="reset-confirm-new-pass">
                      {t.confirmNewPasswordLabel}
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon" aria-hidden="true">
                        {renderLockIcon()}
                      </span>
                      <input
                        id="reset-confirm-new-pass"
                        autoComplete="new-password"
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder={t.confirmNewPasswordPlaceholder}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        aria-label={t.togglePasswordAria}
                        onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                      >
                        {renderEyeIcon(showConfirmNewPassword)}
                      </button>
                    </div>
                  </div>

                  {resetError && (
                    <div className="auth-feedback auth-feedback--error" role="alert">{resetError}</div>
                  )}

                  <button type="submit" className="auth-modal-dark-btn" disabled={isResetting}>
                    {t.resetStep2Btn}
                  </button>
                </form>
                <p className="auth-bottom-switch">
                  <button type="button" onClick={openResetModal} disabled={isResetting}>{t.resetRequestAnother}</button>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
      <FloatingBtn />
    </div>
  );
}
