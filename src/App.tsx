/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QUIZ_STEPS } from './data/quizData';
import { SITE_CONFIG } from './config/siteConfig';
import {
  getNextStepIndex,
  getPrevStepIndex,
  parseUserProfile,
} from './utils/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { VslPlayer } from './components/VslPlayer';
import { PhotoCarousel } from './components/PhotoCarousel';
import { MeasureRuler } from './components/MeasureRuler';
import { ActivityChart } from './components/ActivityChart';
import { PlanChart } from './components/PlanChart';
import { WeekList } from './components/WeekList';
import { OfferSection } from './components/OfferSection';

const STORAGE_KEY = 'fernanda-21-quiz-v7';

export default function App() {
  const [stepIndex, setStepIndex] = useState<number>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const stepParam = urlParams.get('step');
      if (stepParam) {
        const found = QUIZ_STEPS.findIndex((s) => s.id === stepParam);
        if (found !== -1) return found;
      }
      if (urlParams.get('autostart') === '1') {
        return 1;
      }
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Number.isInteger(parsed.index) &&
          parsed.index >= 0 &&
          parsed.index < QUIZ_STEPS.length
        ) {
          return parsed.index;
        }
      }
    } catch (_) {}
    return 0;
  });

  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && typeof parsed.answers === 'object') {
          return parsed.answers;
        }
      }
    } catch (_) {}
    return {};
  });

  const [nameInput, setNameInput] = useState<string>(() => answers.name || '');
  const [nameError, setNameError] = useState<string>('');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [processingPct, setProcessingPct] = useState(0);
  const [processingMsg, setProcessingMsg] = useState('A reunir as tuas respostas…');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const currentStep = QUIZ_STEPS[stepIndex] || QUIZ_STEPS[0];

  // Save session state
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ index: stepIndex, answers })
      );
    } catch (_) {}
  }, [stepIndex, answers]);

  // Sync body class and scroll to top on step changes
  useEffect(() => {
    document.body.classList.toggle('quiz-first-step', currentStep.id === 'urgent-intro');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep.id]);

  const userProfile = useMemo(() => parseUserProfile(answers), [answers]);
  const progressPct = Math.round((stepIndex / (QUIZ_STEPS.length - 1)) * 100);

  const goNext = () => {
    const nextIdx = getNextStepIndex(stepIndex, QUIZ_STEPS, answers);
    setStepIndex(nextIdx);
  };

  const goBack = () => {
    const prevIdx = getPrevStepIndex(stepIndex, QUIZ_STEPS, answers);
    setStepIndex(prevIdx);
  };

  const handleRestart = () => {
    if (window.confirm('Queres apagar as respostas desta sessão e recomeçar?')) {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem('fernanda-offer-start');
      } catch (_) {}
      setAnswers({});
      setNameInput('');
      setStepIndex(0);
    }
  };

  const handleSingleSelect = (stepId: string, label: string) => {
    const updated = {
      ...answers,
      [stepId]: label,
    };
    setAnswers(updated);
    const nextIdx = getNextStepIndex(stepIndex, QUIZ_STEPS, updated);
    setStepIndex(nextIdx);
  };

  const handleMultiToggle = (stepId: string, label: string, exclusive?: string[]) => {
    let currentArr = Array.isArray(answers[stepId]) ? [...answers[stepId]] : [];

    if (exclusive?.includes(label)) {
      currentArr = currentArr.includes(label) ? [] : [label];
    } else {
      currentArr = currentArr.filter((item) => !exclusive?.includes(item));
      if (currentArr.includes(label)) {
        currentArr = currentArr.filter((item) => item !== label);
      } else {
        currentArr.push(label);
      }
    }

    setAnswers((prev) => ({
      ...prev,
      [stepId]: currentArr,
    }));
  };

  // Processing animation timer
  useEffect(() => {
    if (currentStep.type !== 'processing') return;

    const startTime = Date.now();
    const messages = [
      'A analisar o teu objectivo…',
      'A organizar o tempo disponível…',
      'A distribuir as aulas por três semanas…',
      'O teu plano está quase pronto…',
    ];

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / 6000) * 100));
      setProcessingPct(pct);
      setProcessingMsg(messages[Math.min(3, Math.floor(pct / 25))]);

      if (pct >= 100) {
        clearInterval(timer);
        goNext();
      }
    }, 80);

    return () => clearInterval(timer);
  }, [stepIndex, currentStep.type]);

  // Focus name field
  useEffect(() => {
    if (currentStep.type === 'name') {
      nameInputRef.current?.focus();
    }
  }, [currentStep.type]);

  return (
    <div className="app-container">
      <Header
        progressPct={progressPct}
        showBack={stepIndex > 0 && currentStep.type !== 'offer'}
        onBack={goBack}
      />

      <main aria-live="polite" className="main" id="main">
        {currentStep.type !== 'offer' && (
          <div className="progress">
            <div className="progress-label">
              <span>O teu progresso na avaliação…</span>
              <b>{progressPct}%</b>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Progresso do questionário"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <i style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* 1. HERO */}
        {currentStep.type === 'hero' && (
          <section className="step hero-intro" data-step="urgent-intro">
            <h1 className="title hero-urgent-title" tabIndex={-1}>
              <span className="hero-red">Seca a tua barriga em 21 dias</span>{' '}
              <span className="hero-black">com 10 minutos na parede.</span>
            </h1>

            <div className="hero-vsl">
              <VslPlayer
                id={SITE_CONFIG.vslHeroId}
                scriptSrc={SITE_CONFIG.vslHeroScript}
              />
            </div>

            <button
              type="button"
              className="primary hero-urgent-button"
              data-action="next"
              onClick={goNext}
            >
              {currentStep.btnText || '🟢 COMEÇAR A MINHA AVALIAÇÃO GRATUITA'}
            </button>
            <p className="hero-security">
              🔒 Avaliação 100% gratuita · Sem necessidade de equipamentos
            </p>
          </section>
        )}

        {/* 2. SINGLE SELECT */}
        {currentStep.type === 'single' && (
          <section className="step" data-step={currentStep.id}>
            <h1 className="title" tabIndex={-1}>
              {currentStep.title}
            </h1>
            {currentStep.sub && <p className="subtitle">{currentStep.sub}</p>}

            <div className={`options ${currentStep.cards ? 'cards' : ''}`}>
              {currentStep.options?.map((opt, idx) => {
                const isSelected = answers[currentStep.id] === opt.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`option ${opt.image ? 'image-option' : ''}`}
                    data-choice={idx}
                    aria-pressed={isSelected}
                    onClick={() => handleSingleSelect(currentStep.id, opt.label)}
                  >
                    {opt.image ? (
                      <>
                        <img
                          src={`/media/${opt.image}.webp`}
                          alt={opt.label}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="card-label">
                          <span className="check" aria-hidden="true">
                            ✓
                          </span>
                          <span>{opt.label}</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="emoji" aria-hidden="true">
                          {opt.emoji || ''}
                        </span>
                        <span className="check" aria-hidden="true">
                          ✓
                        </span>
                        <span className="label">{opt.label}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. MULTI SELECT */}
        {currentStep.type === 'multi' && (
          <section className="step" data-step={currentStep.id}>
            <h1 className="title" tabIndex={-1}>
              {currentStep.title}
            </h1>
            {currentStep.sub && <p className="subtitle">{currentStep.sub}</p>}

            <div className={`options ${currentStep.cards ? 'cards' : ''}`}>
              {currentStep.options?.map((opt, idx) => {
                const isSelected = (
                  Array.isArray(answers[currentStep.id]) ? answers[currentStep.id] : []
                ).includes(opt.label);

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`option multi ${opt.image ? 'image-option' : ''}`}
                    data-choice={idx}
                    aria-pressed={isSelected}
                    onClick={() =>
                      handleMultiToggle(currentStep.id, opt.label, currentStep.exclusive)
                    }
                  >
                    {opt.image ? (
                      <>
                        <img
                          src={`/media/${opt.image}.webp`}
                          alt={opt.label}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="card-label">
                          <span className="check" aria-hidden="true">
                            ✓
                          </span>
                          <span>{opt.label}</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="emoji" aria-hidden="true">
                          {opt.emoji || ''}
                        </span>
                        <span className="check" aria-hidden="true">
                          ✓
                        </span>
                        <span className="label">{opt.label}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="primary"
              data-action="next"
              style={{ marginTop: '20px' }}
              onClick={goNext}
            >
              Continuar
            </button>
          </section>
        )}

        {/* 4. NAME INPUT */}
        {currentStep.type === 'name' && (
          <section className="step" data-step="name">
            <h1 className="title" tabIndex={-1}>
              {currentStep.title}
            </h1>
            {currentStep.sub && <p className="subtitle">{currentStep.sub}</p>}

            <form
              id="answer-form"
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = nameInput.trim();
                if (trimmed) {
                  setNameError('');
                  setAnswers((prev) => ({ ...prev, name: trimmed }));
                  goNext();
                } else {
                  setNameError('Escreve o teu primeiro nome para continuar.');
                }
              }}
            >
              <label className="helper" htmlFor="first-name">
                O teu primeiro nome
              </label>
              <input
                ref={nameInputRef}
                id="first-name"
                className="field"
                name="value"
                autoComplete="given-name"
                maxLength={40}
                required
                placeholder="Escreve o teu nome"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (nameError) setNameError('');
                }}
              />
              {nameError && (
                <p className="error" id="form-error" role="alert">
                  {nameError}
                </p>
              )}
              <button className="primary" type="submit">
                Continuar
              </button>
            </form>
          </section>
        )}

        {/* 5. INTRO SCREEN */}
        {currentStep.type === 'intro' && (
          <section className="step intro-screen" data-step="intro">
            <h1 className="title intro-title" tabIndex={-1}>
              Chamo-me Professora <strong>Fernanda Martins</strong>!
            </h1>
            <p className="intro-headline">
              Mais de <span className="highlight-pink">+750 mulheres</span> já realizaram o meu
              desafio de Pilates Na Parede de <strong>21 dias</strong>!
            </p>
            <PhotoCarousel kind="presentation" />
            <p className="intro-footer-copy">
              Responde a algumas perguntas a seguir para montar o{' '}
              <span className="highlight-pink">teu plano de aulas personalizado!</span>
            </p>
            <button
              type="button"
              className="primary"
              data-action="next"
              onClick={goNext}
            >
              INICIAR AVALIAÇÃO
            </button>
          </section>
        )}

        {/* 6. BREAK / SOCIAL PROOF */}
        {currentStep.type === 'break' && (
          <section className="step break-screen" data-step={currentStep.id}>
            <div className="break-icon-wrap" aria-hidden="true">
              {currentStep.icon || '🤝'}
            </div>
            <h1 className="title break-title" tabIndex={-1}>
              {currentStep.title}
            </h1>
            <div className="break-card">
              {currentStep.stat && (
                <div className="break-stat-number">{currentStep.stat}</div>
              )}
              {currentStep.statSub && (
                <div className="break-stat-sub">{currentStep.statSub}</div>
              )}
              <p className="break-stat-desc">{currentStep.sub}</p>
            </div>
            <button
              type="button"
              className="primary break-btn"
              data-action="next"
              onClick={goNext}
            >
              {currentStep.btnText || 'Entendi, quero continuar'}
            </button>
          </section>
        )}

        {/* 7. NEWS SCREEN */}
        {currentStep.type === 'news' && (
          <section className="step news-screen" data-step={currentStep.id}>
            <h1 className="title news-screen-title" tabIndex={-1}>
              <strong>INTERNAUTAS AFIRMAM</strong>
            </h1>
            <div className="news-frame">
              <div className="news-top-tarja">
                <img
                  src="/media/xaa-tarja.webp"
                  alt="Portal de Notícias"
                  className="tarja-banner"
                />
              </div>
              <div className="news-image-container">
                <img
                  src="/media/noticia-xaa.webp"
                  alt="Reportagem sobre Pilates na Parede"
                  className="news-single-img"
                />
              </div>
            </div>
            <button
              type="button"
              className="primary"
              data-action="next"
              onClick={goNext}
            >
              Continuar
            </button>
          </section>
        )}

        {/* 8. MEASURE RULER */}
        {currentStep.type === 'measure' && (
          <section className="step" data-step="height">
            <h1 className="title" tabIndex={-1}>
              {currentStep.title}
            </h1>
            {currentStep.sub && <p className="subtitle">{currentStep.sub}</p>}
            <MeasureRuler
              initialValue={answers.height || currentStep.value || 165}
              unit={currentStep.unit || 'cm'}
              altUnit={currentStep.altUnit || 'pol'}
              min={currentStep.min || 100}
              max={currentStep.max || 230}
              onChange={(val) => setAnswers((prev) => ({ ...prev, height: val }))}
              onSubmit={(val) => {
                setAnswers((prev) => ({ ...prev, height: val }));
                goNext();
              }}
            />
          </section>
        )}

        {/* 9. PROCESSING ANIMATION */}
        {currentStep.type === 'processing' && (
          <section className="step" data-step="processing">
            <h1 className="title" tabIndex={-1}>
              Estamos a criar o teu plano de aulas personalizado!
            </h1>
            <div className="analysis-progress">
              <div>
                <span id="analysis-status">{processingMsg}</span>
                <b id="analysis-number">{processingPct}%</b>
              </div>
              <div
                className="analysis-track"
                role="progressbar"
                aria-label="Preparação do plano"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={processingPct}
              >
                <i id="analysis-fill" style={{ width: `${processingPct}%` }} />
              </div>
            </div>
            <p className="subtitle" style={{ marginTop: '16px' }}>
              A organizar o teu objectivo, a tua experiência e os teus horários num percurso de 21
              dias.
            </p>
            <PhotoCarousel kind="analysis" />
          </section>
        )}

        {/* 10. SUMMARY */}
        {currentStep.type === 'summary' && (
          <section className="step" data-step="summary">
            <h1 className="title" tabIndex={-1}>
              Este é o teu ponto de partida
            </h1>
            <p className="subtitle">
              {userProfile.name ? `${userProfile.name}, ` : ''}
              este resumo usa as respostas que acabaste de dar.
            </p>

            <div className="summary-card">
              <header>O teu perfil de prática</header>
              <dl>
                <div>
                  <dt>Objectivo</dt>
                  <dd>{userProfile.goal}</dd>
                </div>
                <div>
                  <dt>Experiência</dt>
                  <dd>{answers.experience || 'Não indicada'}</dd>
                </div>
                <div>
                  <dt>Tempo reservado</dt>
                  <dd>{userProfile.minutes} minutos</dd>
                </div>
                <div>
                  <dt>Frequência</dt>
                  <dd>{answers.days || '1 a 2 dias'}</dd>
                </div>
              </dl>
            </div>

            <p className="helper">Experiência que indicaste</p>
            <div className="level-bar">
              <span className={userProfile.level >= 1 ? 'active' : ''} />
              <span className={userProfile.level >= 2 ? 'active' : ''} />
              <span className={userProfile.level >= 3 ? 'active' : ''} />
            </div>
            <div className="level-labels">
              <span>Primeiro contacto</span>
              <span>Alguma prática</span>
              <span>Prática regular</span>
            </div>

            {userProfile.caution && (
              <div className="notice" role="note">
                <span className="icon" aria-hidden="true">
                  ⚠️
                </span>
                <div>
                  <strong>Zonas indicadas com desconforto</strong>
                  <p>
                    Indicaste atenção para alguma parte do corpo. O desafio é em ritmo tranquilo,
                    mas deves respeitar os teus limites e parar se sentires dor.
                  </p>
                </div>
              </div>
            )}

            <ActivityChart activity={answers.activity} />

            <button
              type="button"
              className="primary"
              data-action="next"
              style={{ marginTop: '20px' }}
              onClick={goNext}
            >
              VER O MEU PLANO DE AULAS
            </button>
          </section>
        )}

        {/* 11. PLAN CHART & CURRICULUM */}
        {currentStep.type === 'plan' && (
          <section className="step" data-step="plan">
            <h1 className="title" tabIndex={-1}>
              O teu plano de treino de Pilates está pronto!
            </h1>
            <p className="subtitle">
              Três semanas para organizares uma prática que cabe na tua vida.
            </p>
            <PlanChart days={userProfile.days} />
            <WeekList />
            <button
              type="button"
              className="primary"
              data-action="next"
              onClick={goNext}
            >
              CONHECER O PLANO DE AULAS
            </button>
          </section>
        )}

        {/* 12. OFFER VSL */}
        {currentStep.type === 'offer-vsl' && (
          <section className="step offer-vsl" data-step="offer-vsl">
            <style>{`
              .plan-ready {
                text-align: center;
                color: #18181b;
                font-size: 14px;
                line-height: 1.3;
                margin: 0 10px 4px;
              }
              .vsl-urgent {
                text-align: center;
                color: #bd246d;
                font-size: 15px;
                font-weight: 800;
                line-height: 1.3;
                margin: 0 12px 8px;
              }
              .vsl-frame {
                width: min(90vw, 400px);
                max-width: 100%;
                margin: 8px auto 0;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 8px 22px #00000024;
              }
              .offer-vsl .primary {
                margin-top: 14px;
              }
            `}</style>
            <p className="plan-ready">
              Assiste ao vídeo abaixo para entenderes como funciona e qual é o próximo passo. 👇
            </p>
            <p className="vsl-urgent">Assiste agora, antes que a promoção acabe.</p>
            <div className="vsl-frame">
              <VslPlayer
                id={SITE_CONFIG.vslOfferId}
                scriptSrc={SITE_CONFIG.vslOfferScript}
              />
            </div>
            <button
              type="button"
              className="primary"
              data-action="next"
              onClick={goNext}
            >
              Quero ver a minha oferta
            </button>
          </section>
        )}

        {/* 13. OFFER & CHECKOUT */}
        {currentStep.type === 'offer' && <OfferSection profile={userProfile} />}
      </main>

      <Footer onPrivacy={() => setIsPrivacyOpen(true)} onRestart={handleRestart} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}
