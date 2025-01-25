import {
  useResetLocStFields,
  useSetLocStFields,
} from "../../../../../../mrv/MRVhooks/MRVhooks";

function LwRtrnForm() {
  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");

  return (
    <div
      onClick={() => {
        resetPageLS({ activeOverlay1: true });
      }}
      className={`scrimOverlay`}
    >
      <div className={`body__large color__green__text`}>Fartrell Cluggins</div>
    </div>
  );
}

export { LwRtrnForm };
