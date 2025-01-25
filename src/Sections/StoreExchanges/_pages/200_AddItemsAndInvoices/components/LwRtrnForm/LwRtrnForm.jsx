import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../mrv/MRVhooks/MRVhooks";

function LwRtrnForm() {
  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");

  console.log("LifetimeWarrantyOverlay");
  return (
    <div
      className={`scrimOverlay`}
    >
      <div className={`body__large color__green__text`}>Fartrell Cluggins</div>
    </div>
  );
}

export { LwRtrnForm };
