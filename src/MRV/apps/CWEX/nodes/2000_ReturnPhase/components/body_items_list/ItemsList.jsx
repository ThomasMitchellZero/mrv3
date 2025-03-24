import { IconMRV } from "../../../../../../components/ui/icon/IconMRV";
import { SidesheetMRV } from "../../../../../../components/layout/sidesheet/SidesheetMRV";

function ItemsList({}) {
  return (
    <main className={`body`}>
      <div>
        <IconMRV
          sIconKey="box"
          ctnrSize="4rem"
          fontSize="3rem"
          backgroundColor="color__white"
          color="color__red__text"
        />
      </div>
    </main>
  );
}

export { ItemsList };
