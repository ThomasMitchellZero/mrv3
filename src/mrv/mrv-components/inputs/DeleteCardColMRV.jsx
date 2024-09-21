import "./DeleteCardColMRV.css";
import { MdClose } from "react-icons/md";

import { greenify } from "../../MRVhooks/MRVhooks";

const DeleteCardColMRV = ({
  greenifyVal = false,
  onClick = () => {
    console.log("No function");
  },
  bigValue,
  description = "",
  customBtnContent = null,
}) => {
  const greenClass = greenify(greenifyVal);

  const btnContent = customBtnContent || <MdClose fontSize="1.5rem" />;

  return (
    <div className={`deleteCardCol`}>
      <button
        className={`secondary deleteCardBtn`}
        onClick={(e) => {
          if (onClick) {
            onClick(e); // Pass the event object to the handler
          }
        }}
      >
        {btnContent}
      </button>
      <div className={`spacer`} />
      <div className={`tinyText color__tertiary__text `}>{description}</div>
      <div className={`heading__small color__primary__text ${greenClass}`}>
        {bigValue}
      </div>
    </div>
  );
};

export { DeleteCardColMRV };
