import { MRVitemDetails } from "../../../../../mrv/mrv-components/DisplayOutputs/mrvItemDetails";

function ReviewItemCardSTRX({}) {

  return (
    <div
      className={`itemRow subCardStyle ${activeClass}`}
      onClick={(e) => handleClick(e)}
    ></div>
  );
}
