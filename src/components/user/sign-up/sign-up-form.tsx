"use client";

import { useState } from "react";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import NicknameFields from "./nickname-fields";
import CheckFields from "./check-fields";
import CustomButton from "@/components/common/custom-button";

import CloseButtonIcon from "@/assets/icons/closeButton.svg";

const SignUpForm = ({ defaultNickname }: { defaultNickname: string }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      nickName: defaultNickname,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  const handleChangeCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    reset({
      checkAge: checked,
      checkService: checked,
      checkMarketing: checked,
    });
    setIsCheckAll(checked);
  };

  const handleChangeChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkList = ["checkAge", "checkService", "checkMarketing"];

    if (!e.target.checked) {
      setIsCheckAll(false);
      return;
    }

    checkList.every(
      (check) => check === e.target.name || getValues(check as keyof FormInput)
    ) &&
      e.target.checked &&
      setIsCheckAll(true);
  };

  return (
    <div className="h-full">
      <div className="flex mb-6 ml-auto w-6 h-6 content-center justify-center">
        <Image
          src={CloseButtonIcon}
          alt="sign-up-close"
          width={16}
          height={16}
          priority
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-[calc(100%-2rem)]leading-7 text-ELSE-29"
        style={{
          height: "calc(100% - 2rem)",
        }}
      >
        <Controller
          control={control}
          name="nickName"
          rules={{
            required: true,
            pattern: /^(?=.*[A-Za-z])[A-Za-z0-9]{6,16}$/,
          }}
          render={({ field: { onChange, value } }) => (
            <NicknameFields
              isError={!!errors.nickName}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <CheckFields
          register={register}
          isCheckAll={isCheckAll}
          onChangeCheckAll={handleChangeCheckAll}
          onChangeChecks={handleChangeChecks}
        />
        <div className="w-full py-5 mt-auto">
          <CustomButton>회원가입 완료하기</CustomButton>
        </div>
      </form>
    </div>
  );
};
export default SignUpForm;