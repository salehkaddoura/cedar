import './WelcomeMessage.scss';

interface WelcomeMessageProps {
  handleNext: () => void;
}

export function WelcomeMessage({ handleNext }: WelcomeMessageProps) {
  return (
    <main className="cedar_welcome_content">
      <section className="cedar_welcome_message">
        <p className="cedar_welcome_message--name">Hi, Taylor</p>
        <p className="cedar_welcome_message--body">
          You have 6 medical bills ready from ABC Health System. You can pay
          your bills here or verify your identity to view full bill details.
        </p>
      </section>
      <section className="cedar_balance_details">
        <div className="cedar_balance_details_content">
          <div className="cedar_balance_details_content_text">
            <span>
              <strong>Total Due</strong>
            </span>
            <span>
              <strong>$600.00</strong>
            </span>
          </div>
          <button onClick={handleNext} className="cedar_button">
            Pay Total
          </button>
        </div>
      </section>
    </main>
  );
}
