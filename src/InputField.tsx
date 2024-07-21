import alertCircle from "./assets/alertCircle.svg";
import check from "./assets/check.svg";
import "./InputField.scss";

interface InputFieldProps {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  label: string;
  id: string;
  type?: string;
  error?: boolean;
  style?: { [key: string]: string };
  isValid?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  pattern?: string;
}

export function InputField({
  value,
  onChange,
  label,
  id,
  error = false,
  isValid = false,
  type = "text",
  style,
  inputMode = 'text',
  pattern,
}: InputFieldProps) {
  return (
    <div style={style} className="cedar_form_group">
      <label className="cedar_input__label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`cedar_input ${error ? "error" : ""}`}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        pattern={pattern}
      />
      {typeof isValid === "boolean" && isValid ? (
        <div data-testid="success-icon" className="cedar_form_group__icon">
          <img src={check} />
        </div>
      ) : null}
      {error ? (
        <>
          <div className="cedar_form_group__icon">
            <img src={alertCircle} />
          </div>
          <span className={`cedar_input__label ${error ? "error" : ""}`}>
            This field is required
          </span>
        </>
      ) : null}
    </div>
  );
}
