import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const comingSoonCss = `
.coming-soon * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.coming-soon {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f12;
  overflow: hidden;
  color: white;
  font-family: var(--font-inter), 'Inter', sans-serif;
}

.coming-soon::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 200%;
  height: 200%;
  left: -50%;
  top: -50%;
  background: linear-gradient(60deg, #6a5cff, #00eaff, #ff2bd6, #00ffa3);
  background-size: 400% 400%;
  animation: comingSoonGradientMove 14s ease infinite;
  filter: blur(140px);
  opacity: 0.35;
  pointer-events: none;
}

@keyframes comingSoonGradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.coming-soon .cs-container {
  text-align: center;
  z-index: 2;
  animation: comingSoonFloat 6s ease-in-out infinite;
}

@keyframes comingSoonFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

.coming-soon .cs-title {
  font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
  font-size: clamp(40px, 10vw, 80px);
  font-weight: 700;
  letter-spacing: 8px;
  background: linear-gradient(90deg, #ffffff, #00eaff, #ffffff);
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: comingSoonShine 6s linear infinite;
}

@keyframes comingSoonShine {
  0% { background-position: -200%; }
  100% { background-position: 200%; }
}

.coming-soon .cs-subtitle {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 300;
  opacity: 0.85;
  letter-spacing: 1px;
}

.coming-soon .cs-line {
  margin: 40px auto;
  width: 240px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00eaff, transparent);
  animation: comingSoonPulse 2.5s infinite;
}

@keyframes comingSoonPulse {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

.coming-soon .cs-loading {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.coming-soon .cs-loading span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00eaff;
  animation: comingSoonDot 1.4s infinite;
}

.coming-soon .cs-loading span:nth-child(2) { animation-delay: 0.2s; }
.coming-soon .cs-loading span:nth-child(3) { animation-delay: 0.4s; }

@keyframes comingSoonDot {
  0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; }
  40% { transform: scale(1.2); opacity: 1; }
}
`;

export function ComingSoonPage() {
  return (
    <div className={`coming-soon ${spaceGrotesk.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: comingSoonCss }} />
      <div className="cs-container">
        <div className="cs-title">COMING SOON</div>
        <div className="cs-subtitle">
          We&apos;re building something beautiful. Stay tuned.
        </div>
        <div className="cs-line" />
        <div className="cs-loading" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
