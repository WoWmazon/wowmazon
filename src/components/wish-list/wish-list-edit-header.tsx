import CustomButton from "../common/custom-button";

const WishListEditHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="mb-1 h-[62px]" />
      <div className="fixed w-full max-w-[375px] h-[62px] content-center border-b-[1px] border-ELSE-EC bg-SYSTEM-white z-30">
        <p className="font-bold text-xl text-center">상품 선택</p>
        <CustomButton
          className="absolute right-4 top-4 w-fit h-fit py-0.5 px-[10px] rounded-full"
          variant="filled"
          smallSize
          onClick={onClose}
        >
          완료
        </CustomButton>
      </div>
    </>
  );
};
export default WishListEditHeader;