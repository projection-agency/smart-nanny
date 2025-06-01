import "./PhoneInput.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className: string;
};

export const PhoneNumberInput = ({ value, onChange, className }: Props) => {
  return (
    <div className={className}>
      <PhoneInput
        country={"ua"}
        onlyCountries={["ua", "pl", "de"]}
        placeholder="Введіть номер телефону"
        value={value}
        onChange={onChange}
        inputStyle={{}}
        buttonStyle={{
          background: "transparent",
          border: "none",
        }}
      />
    </div>
  );
};
