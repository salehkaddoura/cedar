import { useState } from "react";
import { InputField } from "./InputField";
import { ccFormat, formatExpiryDate } from "./util";

import visa from "./assets/visa.svg";
import "./PaymentForm.scss";

interface PaymentFormProps {
  handleNext: () => void;
}

interface FormData {
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  cardName: string;
  zipCode: string;
}

interface ValidFormFields {
  cardNumber?: boolean;
  expiryDate?: boolean;
  securityCode?: boolean;
  cardName?: boolean;
  zipCode?: boolean;
}

export function PaymentForm({ handleNext }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [errors, setErrors] = useState<ValidFormFields>({});
  const [validFields, setValidFields] = useState<ValidFormFields>({});
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const onCardNumberEdit = (value: string) => {
    setCardNumber(ccFormat(value));
  };

  const onExpiryDateEdit = (value: string) => {
    setExpiryDate(formatExpiryDate(value));
  }

  const onEdit = () => {
    setIsEditing(true);
    setFormIsValid(false);
  };

  const validateFields = (formData: FormData) => {
    const errors: Record<string, boolean> = {};
    const valid: Record<string, boolean> = {};

    if (!formData.cardNumber.trim() || !/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = true;
    } else {
      valid.cardNumber = true;
    }
    
    if (
      !formData.expiryDate.trim() ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)
    ) {
      errors.expiryDate = true;
    } else {
      valid.expiryDate = true;
    }

    if (!formData.securityCode.trim() || !/^\d{3,4}$/.test(formData.securityCode)) {
      errors.securityCode = true;
    } else {
      valid.securityCode = true;
    }

    if (!formData.cardName.trim() || formData.cardName.trim().length < 2) {
      errors.cardName = true;
    } else {
      valid.cardName = true;
    }

    if (!formData.zipCode.trim() || !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = true;
    } else {
      valid.zipCode = true;
    }

    return {errors, valid};
  };

  const onContinue = () => {
    const formData = { cardNumber, expiryDate, securityCode, cardName, zipCode };
    const {errors, valid} = validateFields(formData);

    if (Object.keys(errors).length === 0) {
      setValidFields(valid);
      setFormIsValid(true);
      setIsEditing(false);
    } else {
      setErrors(errors);
      setValidFields(valid);
      setFormIsValid(false);
    }
  };

  return (
    <section className="cedar_payment_form_container">
      <div className="cedar_payment_form">
        <div className="cedar_payment_form__step_header">
          <div className="cedar_payment_form__step_header_content">
            <span className="cedar_payment_form__step_header__number">1</span>
            <p className="cedar_payment_form__step_header__title">
              Payment Information
            </p>
          </div>

          <button onClick={onEdit} className="cedar_payment_form_edit">
            <strong>Edit</strong>
          </button>
        </div>
        {!formIsValid && isEditing ? (
          <div className="cedar_payment_form__fields">
            <InputField
              error={errors.cardNumber}
              isValid={validFields.cardNumber}
              label="Card Number"
              id="cardNumber"
              type="tel"
              value={cardNumber}
              onChange={(e) => onCardNumberEdit(e.target.value)}
            />
            <div className="cedar_payment_form__fields_parts">
              <InputField
                error={errors.expiryDate}
                isValid={validFields.expiryDate}
                style={{ marginRight: "16px" }}
                label="Expires (MM/YY)"
                id="expiryDate"
                type="tel"
                value={expiryDate}
                onChange={(e) => onExpiryDateEdit(e.target.value)}
              />
              <InputField
                error={errors.securityCode}
                isValid={validFields.securityCode}
                label="Security Code (CVV)"
                id="securityCode"
                type="tel"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
              />
            </div>
            <InputField
              error={errors.cardName}
              isValid={validFields.cardName}
              label="Name on card"
              id="name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <InputField
              error={errors.zipCode}
              isValid={validFields.zipCode}
              label="Zip Code"
              id="zipCode"
              type="tel"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <button
              onClick={onContinue}
              style={{ marginTop: "8px" }}
              className="cedar_button"
            >
              Continue
            </button>
          </div>
        ) : null}

        <div className="cedar_payment_form__review">
          <div className="cedar_payment_form__step_header">
            <div className="cedar_payment_form__step_header_content">
              <span className="cedar_payment_form__step_header__number">2</span>
              <p className="cedar_payment_form__step_header__title">
                Review and pay
              </p>
            </div>
          </div>
          {formIsValid && !isEditing ? (
            <div className="cedar_payment_form__review_body">
              <p>
                You're about to make a payment of <strong>$600.00</strong>
              </p>
              <div className="cedar_payment_form__review_payment">
                <span className="cedar_payment_form__review_payment_label">
                  <strong>Payment Method</strong>
                </span>
                <div className="cedar_payment_form__review_payment_card">
                  <img src={visa} />
                  <span>Card ending in {cardNumber.split(" ")[3]}</span>
                </div>
              </div>
              <button
                onClick={handleNext}
                style={{ marginTop: "8px" }}
                className="cedar_button"
              >
                Pay $600.00
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
