import { useState, useMemo, useCallback } from 'react'
import { WelcomeMessage } from "./WelcomeMessage";
import { PaymentForm } from "./PaymentForm";
import { ThankYou } from './ThankYou';

import abcLogo from './assets/abcLogo.svg'
import './App.scss'

export function App() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const steps = useMemo(() => {
    return [<WelcomeMessage handleNext={handleNext} />, <PaymentForm handleNext={handleNext} />, <ThankYou />];
  }, [handleNext]);

  return (
    <>
      <header className="cedar_header">
        <img src={abcLogo} className="logo" alt="Vite logo" />
      </header>

      <main className='cedar_main_content'>{steps[activeStep]}</main>
    </>
  );
}
