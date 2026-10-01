'use client';

import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data, t) {
  const errors = {};
  for (const k of ['name', 'email', 'phone', 'service']) if (!data[k]?.trim()) errors[k] = t.required;
  if (data.email && !EMAIL_RE.test(data.email.trim())) errors.email = t.invalidEmail;
  if (data.phone && data.phone.replace(/\D/g, '').length < 7) errors.phone = t.invalidPhone;
  return errors;
}

/**
 * Bayzat-style lead form.
 * variant "hero": compact (name, email, phone, company, service)
 * variant "full": adds budget + project details
 * `t` holds the localized field labels, options and messages.
 */
export default function LeadForm({ variant = 'hero', t, title, subtitle, cta, successTitle, successText, fine }) {
  const full = variant === 'full';
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  // hero form starts as a single email field (Bayzat-style) and expands on interaction
  const [open, setOpen] = useState(full);
  const expand = () => {
    if (open) return;
    setOpen(true);
  };

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!open) {
      // first step: only the email is checked, then the rest of the form opens
      const email = (data.email || '').trim();
      if (!EMAIL_RE.test(email)) {
        setErrors({ email: email ? t.invalidEmail : t.required });
        form.querySelector('[name="email"]')?.focus();
        return;
      }
      setErrors({});
      setOpen(true);
      setTimeout(() => form.querySelector('[name="name"]')?.focus({ preventScroll: true }), 350);
      return;
    }
    const errs = validate(data, t);
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: variant === 'full' ? 'get-started' : 'hero', page: location.href }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus('done');
      if (!full) setTimeout(() => { setStatus('idle'); setOpen(false); }, 6000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  }

  const clear = (name) => errors[name] && setErrors(({ [name]: _, ...rest }) => rest);
  const field = (name, label, input) => (
    <label className={`field${errors[name] ? ' is-invalid' : ''}`}>
      <span>{label}</span>
      {input}
      {errors[name] && <small className="err">{errors[name]}</small>}
    </label>
  );
  const Heading = full ? 'h3' : 'h2';
  const label = status === 'sending' ? t.sending : status === 'error' ? t.failed : cta;
  const submit = (cls = '') => (
    <button type="submit" className={`btn btn--ember ${cls}`} disabled={status === 'sending'}>
      <span className="btn__label">{open || full ? label : t.getStarted}</span>
    </button>
  );
  const serviceSelect = (placeholder) => (
    <select name="service" required defaultValue="">
      <option value="" disabled>{placeholder}</option>
      {t.services.map((s) => <option key={s}>{s}</option>)}
    </select>
  );

  return (
    <form
      className={`card-glass lead-form${full ? ' lead-form--lg' : ' lead-form--step'}${open ? ' is-open' : ''}`}
      onSubmit={onSubmit}
      onInput={(e) => clear(e.target.name)}
      noValidate
    >
      <div className="lead-form__head">
        <Heading>{title}</Heading>
        <p>{subtitle}</p>
      </div>

      {full ? (
        <>
          <div className="field-row">
            {field('name', t.name, <input type="text" name="name" autoComplete="name" placeholder={t.namePlaceholder} required />)}
            {field('email', t.email, <input type="email" name="email" autoComplete="email" placeholder={t.emailPlaceholder} required />)}
          </div>
          <div className="field-row">
            {field('phone', t.phone, <input type="tel" name="phone" autoComplete="tel" placeholder="+971 50 123 4567" required />)}
            {field('company', t.company, <input type="text" name="company" autoComplete="organization" placeholder={t.companyPlaceholder} />)}
          </div>
          <div className="field-row">
            {field('service', t.service, serviceSelect(t.select))}
            {field('budget', t.budget, (
              <select name="budget" defaultValue="">
                <option value="" disabled>{t.select}</option>
                {t.budgets.map((s) => <option key={s}>{s}</option>)}
              </select>
            ))}
          </div>
          {field('message', t.message, (
            <textarea name="message" rows={3} placeholder={t.messagePlaceholder} />
          ))}
          {submit('btn--block')}
        </>
      ) : (
        <>
          <div className="email-step">
            {field('email', t.email, (
              <input type="email" name="email" autoComplete="email" placeholder={t.emailStepPlaceholder} required onFocus={expand} onClick={expand} />
            ))}
            {!open && submit('email-step__btn')}
          </div>
          <div className="lead-form__more" aria-hidden={!open} inert={!open || undefined}>
            <div className="lead-form__more-inner">
              <div className="field-row">
                {field('name', t.name, <input type="text" name="name" autoComplete="name" placeholder={t.namePlaceholder} required />)}
                {field('phone', t.phone, <input type="tel" name="phone" autoComplete="tel" placeholder="+971 50 123 4567" required />)}
              </div>
              <div className="field-row">
                {field('company', t.company, <input type="text" name="company" autoComplete="organization" placeholder={t.companyPlaceholder} />)}
                {field('service', t.serviceHero, serviceSelect(t.selectSolution))}
              </div>
              {submit('btn--block')}
            </div>
          </div>
        </>
      )}

      <p className="lead-form__fine">{fine}</p>
      <div className="lead-form__success" role="status" aria-live="polite" hidden={status !== 'done'}>
        <div className="success-ring"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" /></svg></div>
        <h3>{successTitle}</h3>
        <p>{successText}</p>
      </div>
    </form>
  );
}
