import { Sidesheet_Base_MRV } from "../../../../../mrv/mrv-components/DisplayOutputs/Sidesheet_Base_MRV";
import { MRVinput } from "../../../../../mrv/mrv-components/inputs/MRVinput";

function NewItemEntrySTRX() {
  return (
    <Sidesheet_Base_MRV title="Add New Item">
      <div className={`vBox gap2rem`}>
        <MRVinput>
          <input type="text" />
        </MRVinput>

        <div className={`hBox gap2rem`}>
          <MRVinput>
            <input type="number" />
          </MRVinput>
        </div>
      </div>
    </Sidesheet_Base_MRV>
  );
}

export { NewItemEntrySTRX };
