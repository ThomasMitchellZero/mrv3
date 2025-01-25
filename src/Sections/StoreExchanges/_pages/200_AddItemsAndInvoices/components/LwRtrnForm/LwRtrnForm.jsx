import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../mrv/MRVhooks/MRVhooks";

function LifetimeWarrantyOverlay() {
  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");

  return (
    <div
      onClick={resetPageLS({
        activeOverlay1: true,
      })}
      className={`scrimOverlay lw__overlay`}
    >
      <div className={`body__large color__green__text`}>Fartrell Cluggins</div>
    </div>
  );
}

export default LifetimeWarrantyOverlay;
