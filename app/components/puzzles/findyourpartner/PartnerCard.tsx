import { FormEvent, useState } from "react";
import classes from "./PartnerCard.module.css";

export interface IPartnerCardProps {
  initialValue: string;
}

export function PartnerCard(props: IPartnerCardProps) {
  const [inputValue, setInputValue] = useState<string>(props.initialValue);

  function handleInputChange(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }

  return (
    <input
      onChange={handleInputChange}
      value={inputValue}
      className={classes.partnerCardInput}
    />
  );
}
