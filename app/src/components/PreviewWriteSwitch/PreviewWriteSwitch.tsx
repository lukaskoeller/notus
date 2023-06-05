import { FC, InputHTMLAttributes } from "react";
import styles from "./SwitchGroup.module.css";

export type SwitchGroupItemProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}

const SwitchGroupItem: FC<SwitchGroupItemProps> = (props) => {
  const {
    name,
    id,
    value,
    label,
    checked,
  } = props;

  return (
    <div className={styles.item}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
      />
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export const PreviewWriteSwitch: FC = () => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Write / Edit</legend>
      <SwitchGroupItem
        name="mode"
        id="mode-preview"
        value="preview"
        label="Preview"
        checked
      />
      <SwitchGroupItem
        name="mode"
        id="mode-write"
        value="write"
        label="Write"
      />
    </fieldset>
  );
};
