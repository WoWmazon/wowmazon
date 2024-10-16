"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";

import InputDeleteButton from "@/assets/icons/input-delete-button.svg";
import Image from "next/image";

const CustomInput = forwardRef<
  HTMLInputElement,
  InputProps & { hasDelBtn?: boolean }
>((props, ref) => {
  const {
    type = "text",
    value,
    hasDelBtn = "false",
    onChange,
    className,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  // 외부에서 받은 ref와 로컬 ref를 연결
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const handleDeleteValue = () => {
    if (onChange) {
      if (inputRef.current) {
        inputRef.current.value = "";
        // React의 onChange 핸들러를 수동으로 호출
        const syntheticEvent = {
          target: inputRef.current,
          currentTarget: inputRef.current,
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
        inputRef.current.focus();
      }
    }
  };

  return (
    <div
      className={twMerge(
        "relative flex flex-row items-center w-full h-fit bg-ELSE-F5",
        className
      )}
    >
      <input
        type={type}
        ref={inputRef}
        className="w-full h-11 p-4 pr-9 bg-transparent rounded-sm text-ELSE-33 text-lg placeholder:text-ELSE-AE focus:outline-none"
        value={value}
        onChange={onChange}
        {...rest}
      />
      {hasDelBtn && value && (
        <div
          className="absolute right-5 cursor-pointer"
          onClick={handleDeleteValue}
        >
          <Image
            src={InputDeleteButton}
            alt="input-delete"
            width={10}
            height={10}
          />
        </div>
      )}
    </div>
  );
});

CustomInput.displayName = "Input";

export default CustomInput;