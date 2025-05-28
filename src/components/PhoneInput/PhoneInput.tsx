import "./PhoneInput.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PhoneNumberInput = () => {
  const handlePhoneChange = (value: string) => {
    console.log("Номер телефону:", value);
  };

  return (
    <PhoneInput
      country={"ua"}
      onlyCountries={["ua", "pl", "de"]}
      placeholder="Введите свой номер телефона"
      onChange={handlePhoneChange}
      inputStyle={{}}
      buttonStyle={{
        background: "transparent",
        border: "none",
      }}
    />
  );
};
