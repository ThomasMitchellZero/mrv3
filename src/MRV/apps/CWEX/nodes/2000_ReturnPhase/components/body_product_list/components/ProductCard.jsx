import { cloneDeep } from "lodash";

function ProductCard({ oPage, children }) {
  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;
  const oResets = oPage.oResets;

  const fHandeClick = (e) => {
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
