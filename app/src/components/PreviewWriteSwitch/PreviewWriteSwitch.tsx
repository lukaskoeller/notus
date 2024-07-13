import { ChangeEvent, FC, InputHTMLAttributes, useCallback } from "react";
import styles from "./PreviewWriteSwitch.module.css";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { TNoteSearch } from "../../router";

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
    onChange,
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
        onChange={onChange}
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
  const { mode } = useSearch({ from: "/note/$noteId" });
  const navigate = useNavigate({ from: "/note/$noteId" });

  const handleChange = useCallback(async (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value as TNoteSearch['mode'];
    await navigate({ search: { mode: value } });
  }, [navigate]);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>View / Edit</legend>
      <SwitchGroupItem
        name="mode"
        id="mode-view"
        value="view"
        label="view"
        checked={mode === 'view'}
        onChange={handleChange}
      />
      <SwitchGroupItem
        name="mode"
        id="mode-edit"
        value="edit"
        label="edit"
        checked={mode === 'edit'}
        onChange={handleChange}
      />
    </fieldset>
  );
};
