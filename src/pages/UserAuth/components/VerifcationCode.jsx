import { useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerChildren } from "../../../animations/animations";

const VerificationCode = ({
  value = "",
  onChange,
  length = 6,
  disabled = false,
}) => {
  const inputs = useRef([]);

  const focusInput = (index) => {
    inputs.current[index]?.focus();
    inputs.current[index]?.select();
  };

  const handleChange = (index, text) => {
    const digits = text.replace(/\D/g, "");
    if (!digits) return;

    // Keep the code contiguous.
    const start = Math.min(index, value.length);
    const next = (
      value.slice(0, start) +
      digits +
      value.slice(start + digits.length)
    ).slice(0, length);

    onChange(next);
    focusInput(Math.min(start + digits.length, length - 1));
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      event.preventDefault();

      const removeIndex = value[index] ? index : index - 1;

      if (removeIndex >= 0) {
        onChange(
          value.slice(0, removeIndex) + value.slice(removeIndex + 1)
        );
      }

      focusInput(Math.max(0, index - 1));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusInput(Math.max(0, index - 1));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusInput(Math.min(length - 1, index + 1));
    }
  };

  return (
    <motion.div
      className="verification-code"
      role="group"
      aria-label="Email verification code"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length }, (_, index) => (
        <motion.input
          key={index}
          ref={(element) => {
            inputs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${index + 1} of ${length}`}
          value={value[index] ?? ""}
          disabled={disabled}
          required
          pattern="[0-9]"
          onFocus={(event) => event.target.select()}
          onChange={(event) =>
            handleChange(index, event.target.value)
          }
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={(event) => {
            event.preventDefault();
            handleChange(index, event.clipboardData.getData("text"));
          }}
          variants={staggerChildren}
        />
      ))}
    </motion.div>
  );
};

export default VerificationCode;