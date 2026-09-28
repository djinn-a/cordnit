type HoneypotFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Off-screen and inert: unreachable for people, assistive tech and autofill,
 * while naive bots that fill every input still find it in the DOM.
 */
export default function HoneypotField({ value, onChange }: Readonly<HoneypotFieldProps>) {
  return (
    <div
      aria-hidden="true"
      inert
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Leave this field empty
        <input
          type="text"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
