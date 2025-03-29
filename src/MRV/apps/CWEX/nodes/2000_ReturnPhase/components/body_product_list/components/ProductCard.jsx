import { cloneDeep } from "lodash";

function ProductCard({ oPage, children }) {
  const fSetPageLS = oPage.fSetPageLS;
  const oResets = oPage.oResets;

  const fHandeClick = (e) => {
    const pageLS = oPage.oPageLS;
    e.stopPropagation();
    const draftPage = { ...cloneDeep(pageLS), ...oResets.errorOnly };
    fSetPageLS(draftPage);
  };

  return (
    <div
      onClick={(e) => {
        fHandeClick(e);
      }}
      className={`prodCard floorplan card`}
    >
      {children}
    </div>
  );
}

export { ProductCard };
