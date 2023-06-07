import { ChangeEvent, FC, InputHTMLAttributes, useCallback } from "react";
import styles from "./PreviewWriteSwitch.module.css";
import { useEditor } from "../../hooks/useEditor";
import { ViewMode } from "../../contexts/editor";

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
  const { mode, setMode } = useEditor();

  const handleChange = useCallback((e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setMode(value as ViewMode);
  }, [setMode]);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Write / Edit</legend>
      <SwitchGroupItem
        name="mode"
        id="mode-preview"
        value="preview"
        label="Preview"
        checked={mode === 'preview'}
        onChange={handleChange}
      />
      <SwitchGroupItem
        name="mode"
        id="mode-write"
        value="write"
        label="Write"
        checked={mode === 'write'}
        onChange={handleChange}
      />
    </fieldset>
  );
};
