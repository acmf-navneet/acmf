import React, { useEffect, useState, useContext, useMemo, useRef, forwardRef, cloneElement } from 'react';
import { cn } from '@/lib/utils';

const PinInputContext = React.createContext(false);

const PinInput = forwardRef(({ className, children, ...props }, ref) => {
  const {
    defaultValue,
    value,
    onChange,
    onComplete,
    onIncomplete,
    placeholder = '○',
    type = 'alphanumeric',
    name,
    form,
    otp = false,
    mask = false,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    ariaLabel = '',
    ...rest
  } = props;

  const validChildren = React.Children.toArray(children).filter(child => React.isValidElement(child));
  const length = validChildren.length;

  const { pins, pinValue, refMap, handleChange, handleFocus, handleBlur, handleKeyDown, handlePaste } = usePinInput({
    value,
    defaultValue,
    placeholder,
    type,
    length,
    readOnly,
  });

  useEffect(() => {
    onChange && onChange(pinValue);
  }, [onChange, pinValue]);

  useEffect(() => {
    if (onComplete && pinValue.length === length) {
      onComplete(pinValue);
    }
    if (onIncomplete && pinValue.length !== length) {
      onIncomplete(pinValue);
    }
  }, [length, onComplete, onIncomplete, pinValue]);

  useEffect(() => {
    if (!autoFocus) return;
    const node = refMap?.get(0);
    if (node) {
      node.focus();
    }
  }, [autoFocus, refMap]);

  let counter = 0;
  const clones = validChildren.map((child) => {
    if (child.type === PinInputField) {
      const pinIndex = counter++;
      return cloneElement(child, {
        name,
        inputKey: `input-${pinIndex}`,
        value: pins[pinIndex] || '',
        onChange: (e) => handleChange(e, pinIndex),
        onFocus: (e) => handleFocus(e, pinIndex),
        onBlur: () => handleBlur(pinIndex),
        onKeyDown: (e) => handleKeyDown(e, pinIndex),
        onPaste: (e) => handlePaste(e),
        placeholder,
        type,
        mask,
        autoComplete: otp ? 'one-time-code' : 'off',
        disabled,
        readOnly,
        'aria-label': ariaLabel || `Pin input ${counter} of ${length}`,
        ref: (node) => {
          if (node) {
            refMap?.set(pinIndex, node);
          } else {
            refMap?.delete(pinIndex);
          }
        },
      });
    }
    return child;
  });

  return (
    <PinInputContext.Provider value={true}>
      <div ref={ref} aria-label="Pin Input" className={className} {...rest}>
        {clones}
        <input type="hidden" name={name} form={form} value={pinValue} />
      </div>
    </PinInputContext.Provider>
  );
});

const PinInputField = forwardRef(({ className, component: Component = 'input', ...props }, ref) => {
  const { mask, type, inputKey, ...rest } = props;

  const isInsidePinInput = useContext(PinInputContext);
  if (!isInsidePinInput) {
    throw new Error(`PinInputField must be used within PinInput.`);
  }

  return (
    <Component
      key={inputKey}
      ref={ref}
      type={mask ? 'password' : type === 'numeric' ? 'tel' : 'text'}
      inputMode={type === 'numeric' ? 'numeric' : 'text'}
      className={cn('size-10 text-center', className)}
      {...rest}
    />
  );
});

const usePinInput = ({ value, defaultValue, placeholder, type, length, readOnly }) => {
  const pinInputs = useMemo(() => Array.from({ length }, (_, index) => {
    return defaultValue?.charAt(index) || value?.charAt(index) || '';
  }), [defaultValue, length, value]);

  const [pins, setPins] = useState(pinInputs);
  const pinValue = pins.join('').trim();
  const refMap = useRef(new Map());

  useEffect(() => {
    setPins(pinInputs);
  }, [pinInputs]);

  const getNode = (index) => refMap.current.get(index);

  const focusInput = (index) => {
    const node = getNode(index);
    if (node) {
      node.focus();
      node.placeholder = '';
    }
  };

  const handleFocus = (event, index) => {
    event.target.select();
    focusInput(index);
  };

  const handleBlur = (index) => {
    const node = getNode(index);
    if (node) {
      node.placeholder = placeholder;
    }
  };

  const updateInputField = (val, index) => {
    const node = getNode(index);
    if (node) {
      node.value = val;
    }
    setPins(prev => prev.map((p, i) => (i === index ? val : p)));
  };

  const validate = (value) => {
    const regex = type === 'alphanumeric' ? /^[a-zA-Z0-9]+$/i : /^[0-9]+$/;
    return regex.test(value);
  };

  const pastedVal = useRef(null);
  const handleChange = (e, index) => {
    const inputValue = e.target.value;
    const pastedValue = pastedVal.current;
    const inputChar = pastedValue && pastedValue.length === length
      ? pastedValue.charAt(length - 1)
      : inputValue.slice(-1);

    if (validate(inputChar)) {
      updateInputField(inputChar, index);
      pastedVal.current = null;
      if (inputValue.length > 0) {
        focusInput(index + 1);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const copyValue = e.clipboardData.getData('text/plain').replace(/[\n\r\s]+/g, '');
    const copyArr = copyValue.split('').slice(0, length);

    if (!copyArr.every(c => validate(c))) return;

    for (let i = 0; i < length; i++) {
      const value = copyArr[i];
      updateInputField(value, i);
    }
    pastedVal.current = copyValue;
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (pins[index] === '') {
        focusInput(index - 1);
      } else {
        updateInputField('', index);
      }
    }
  };

  return {
    pins,
    pinValue,
    refMap: refMap.current,
    handleChange,
    handleBlur,
    handleFocus,
    handlePaste,
    handleKeyDown,
  };
};

export { PinInput, PinInputField };
