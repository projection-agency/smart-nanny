import "./PhoneInput.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputClass?: string;
};

export const PhoneNumberInput = ({
  name,
  value,
  onChange,
  className,
  inputClass,
  onBlur,
}: Props) => {
  return (
    <div className={className}>
      <PhoneInput
        country={"ua"}
        inputClass={inputClass}
        onlyCountries={["ua", "pl", "de"]}
        placeholder="Введіть номер телефону"
        value={value}
        onChange={onChange}
        inputProps={{ name: name }}
        inputStyle={{}}
        buttonStyle={{
          background: "transparent",
          border: "none",
        }}
        onBlur={onBlur}
      />
    </div>
  );
};
