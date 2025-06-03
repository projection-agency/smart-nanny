import s from "./SidePanelLangSwitcher.module.css"
const languages = ["UA", "EN"];
const SidePanelLangSwitcher = () => {
  return (
    <ul className={s.languages}>
      {languages.map((item, index) => {
        console.log(item)
       return <li key={index}>{item}</li>
      })}
    </ul>
  );
};

export default SidePanelLangSwitcher;