import { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { UserProfile } from '../utils/navigation';
import {
  calculateDiscount,
  formatEuro,
  formatEuroText,
  buildCheckoutUrl,
} from '../utils/currency';
import { WeekList } from './WeekList';

interface OfferSectionProps {
  profile: UserProfile;
}

const OFFER_TIMER_SECONDS = 600; // 10 minutes

export function OfferSection({ profile }: OfferSectionProps) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem('fernanda-offer-start');
      if (stored) {
        const startTime = Number(stored);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        return Math.max(0, OFFER_TIMER_SECONDS - elapsed);
      }
      sessionStorage.setItem('fernanda-offer-start', String(Date.now()));
    } catch (_) {}
    return OFFER_TIMER_SECONDS;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const discount = calculateDiscount(SITE_CONFIG.price, SITE_CONFIG.oldPrice);
  const checkoutUrl = buildCheckoutUrl(SITE_CONFIG.checkoutUrl);

  const handleScrollToPacote = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pacote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article className="offer won has-disc" id="offer-root" data-disc="1">
      <style>{`
        body:has(.bf-top) {
          padding-top: 44px;
        }
        .bf-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;
          background: #111;
          color: #fff;
          text-align: center;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: .03em;
          padding: 11px 10px;
          box-shadow: 0 2px 10px #0004;
        }
        .bf-top span {
          color: #f9c80e;
        }
        .deal .plan-card {
          overflow: visible;
          margin-top: 22px;
        }
        .bf-badge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(90deg, #111, #2a2a2a);
          color: #f9c80e;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: .06em;
          white-space: nowrap;
          padding: 7px 18px;
          border-radius: 30px;
          border: 2px solid #17a34a;
          box-shadow: 0 4px 12px #0003;
          z-index: 2;
        }
        .deal .plan-card-body {
          justify-content: center;
          text-align: center;
          padding: 28px 16px 20px;
        }
        .deal .plan-card-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .deal .prices {
          justify-content: center;
        }
        .worth {
          color: #18181b;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          margin: 8px 0 4px;
        }
        .pay-once {
          color: #666;
          text-align: center;
          font-size: 12px;
          margin: 6px 0 0;
        }
        .xb-eye {
          text-align: center;
          color: #bd246d;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .14em;
          margin: 0 0 8px;
        }
        .xb-title {
          font-size: 32px !important;
          font-weight: 900;
          text-transform: uppercase;
          color: #18181b !important;
          margin: 0 0 12px;
          line-height: 1.05;
          text-align: center;
        }
        .xb-title em {
          color: #ec4899;
          font-style: normal;
        }
        .xb-lead {
          text-align: center;
          color: #555;
          font-size: 14px;
          margin: 0 auto 22px;
          max-width: 380px;
        }
      `}</style>

      <div className="bf-top" role="status">
        🎁 OFERTA POR TEMPO LIMITADO · <span>BLACK FRIDAY</span> 🎁
      </div>

      <p className="eyebrow">Aulas sem sair de casa</p>
      <h1 className="title" tabIndex={-1}>
        {profile.name ? `${profile.name}, o` : 'O'} teu plano de treino de Pilates está pronto!
        <br />
        <em>Começa hoje e muda de vida em 2026!</em>
      </h1>

      <p className="offer-lead">
        Pilates na Parede com Fernanda Martins. Uma sequência de aulas em casa para trabalhares
        força, mobilidade e uma rotina de movimento no teu ritmo.
      </p>

      {/* Package inclusion */}
      <section>
        <h2>O que vais receber</h2>
        <div className="plan-pack">
          <header>
            <b>{SITE_CONFIG.durationDays}</b>
            <span>
              DIAS DE PILATES
              <br />
              NA PAREDE
            </span>
          </header>
          {SITE_CONFIG.features.map((feat, idx) => (
            <div key={idx} className="pack-row">
              <span className="icon" aria-hidden="true">
                {feat.icon}
              </span>
              <div>
                <strong>{feat.title}</strong>
                <small>{feat.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2>Como funciona o desafio</h2>
        <WeekList />
      </section>

      {/* Comparison */}
      <section>
        <h2>Sem uma rotina vs. com o desafio</h2>
        <div className="comparison">
          <div>
            <strong>SEM UMA ROTINA</strong>
            <p>✕ Não saber o que praticar.</p>
            <p>✕ Adiar por falta de organização.</p>
            <p>✕ Começar sem uma sequência.</p>
          </div>
          <div>
            <strong>COM O DESAFIO</strong>
            <p>✓ Uma aula para acompanhares.</p>
            <p>✓ Um momento reservado na agenda.</p>
            <p>✓ Um percurso de 21 dias.</p>
          </div>
        </div>
      </section>

      {/* Student testimonials */}
      <section className="testimonial-strip" aria-label="Depoimentos de alunas">
        <h2>O que as nossas alunas dizem</h2>
        <div className="testimonial-grid">
          <img
            src="/media/ext-07.webp"
            alt="Depoimento de Carla Martins"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/media/ext-09.webp"
            alt="Depoimento de Fernanda Santos"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/media/ext-08.webp"
            alt="Depoimento adicional de uma aluna"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* Exclusive bonuses */}
      <section>
        <p className="xb-eye">🎁 E NÃO É SÓ ISSO</p>
        <h2 className="xb-title">
          Ainda tem <em>mais.</em>
        </h2>
        <p className="xb-lead">
          O Desafio 21 Dias inclui também 4 bónus exclusivos para acelerar os teus resultados e
          transformar a tua rotina em casa.
        </p>

        <div className="bonus-grid">
          {SITE_CONFIG.bonuses.map((bonus, idx) => (
            <article key={idx} className="bonus">
              <img src={bonus.img} alt={bonus.title} loading="lazy" decoding="async" />
              <div>
                <strong>{bonus.title}</strong>
                <small className="bonus-old">✕ DE {bonus.value}</small>
                <small className="bonus-free">✓ POR 0 €</small>
              </div>
            </article>
          ))}
        </div>
        <p className="disclaimer">
          Materiais educativos complementares. Não substituem aconselhamento médico ou nutricional
          individual.
        </p>
      </section>

      {/* Main Deal Offer Card */}
      <div className="deal" id="pacote">
        <h2 className="deal-title">
          GARANTE O TEU PLANO PESSOAL
          <span className="only-won">
            <br />
            <em>AGORA {discount.pct}% OFF!</em>
          </span>
        </h2>

        <div className="offer-bar only-won js-bar">
          {timeLeft > 0 ? (
            <>
              ⏱ Oferta válida por <b className="js-timer">{formatTimer(timeLeft)}</b>
            </>
          ) : (
            '🔥 Garante o teu plano hoje'
          )}
        </div>

        <div className="plan-card">
          <div className="bf-badge">🎁 BLACK FRIDAY 🎁</div>
          <div className="plan-card-head only-won">
            🎁 PRENDA DE HOJE · {discount.pct}% DE DESCONTO
          </div>
          <div className="plan-card-body">
            <div className="plan-card-info">
              <strong>DESAFIO 21 DIAS</strong>
              <span className="plan-tag">Pagamento único</span>
              <p className="worth">
                Tudo o que vais receber vale mais de {formatEuro(SITE_CONFIG.oldPrice)}
              </p>
              <div className="prices">
                <s className="old">{formatEuro(SITE_CONFIG.oldPrice)}</s>
                <b className="new">{formatEuro(SITE_CONFIG.price)}</b>
              </div>
              <p className="pay-once">Pagamento único — sem mensalidade</p>
            </div>
          </div>
        </div>

        <p className="guarantee-link">GARANTIA DE {SITE_CONFIG.guaranteeDays} DIAS</p>

        <div className="buy-wrap">
          <a
            className="buy"
            href={checkoutUrl}
            target="_top"
            rel="noopener noreferrer"
          >
            GARANTIR O MEU PLANO DE AULAS
          </a>
        </div>

        <p className="fine">
          Pagamento único, sem mensalidades e sem cobranças recorrentes. Recebes o acesso ao plano
          de aulas após a confirmação do pagamento.
        </p>
      </div>

      {/* Key check points */}
      <ul className="check-points">
        <li>
          Pagamento único de {formatEuroText(SITE_CONFIG.price)}, sem mensalidades.
        </li>
        <li>Acesso ao plano de aulas após a confirmação do pagamento.</li>
        <li>Sem renovação automática e sem cobranças futuras.</li>
        <li>
          Garantia de {SITE_CONFIG.guaranteeDays} dias: se não ficares satisfeita, podes pedir o
          reembolso.
        </li>
      </ul>

      {/* Guarantee guarantee */}
      <section className="guarantee">
        <img
          src="/media/ext-01.webp"
          alt="Selo de garantia de 30 dias"
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
        />
        <h2>{SITE_CONFIG.guaranteeDays} dias de garantia</h2>
        <p>
          Tens {SITE_CONFIG.guaranteeDays} dias após a compra para conhecer o programa. Se não
          ficares satisfeita, podes solicitar a devolução do valor pago dentro do prazo da garantia.
        </p>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Perguntas frequentes</h2>
        {SITE_CONFIG.faqs.map((faq, idx) => (
          <details key={idx}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}

        <a className="buy" href="#pacote" onClick={handleScrollToPacote}>
          GARANTIR O MEU PLANO POR {formatEuroText(SITE_CONFIG.price)}
        </a>
      </section>
    </article>
  );
}
