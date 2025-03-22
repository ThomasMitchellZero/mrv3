import { HeaderMRV } from "../../../../../components/layout/header/HeaderMRV";

function HeaderCWEX({ sPageTitle = "NO CEWX TITLE" }) {
  return <HeaderMRV sAppName={"Store Exchanges"} sPageTitle={sPageTitle} />;
}

export { HeaderCWEX };
