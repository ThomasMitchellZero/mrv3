function ProductCard({ oPage, children }) {
  const pageLS = oPage.oPageLS;
  const fSetPageLS = oPage.fSetPageLS;

  const fHandeClick = (e) => {
    e.stopPropagation();
    const draftPage = cloneDeep(pageLS);
    draftPage.sActiveError = "";
    fSetPageLS(draftPage);
  };

  return (
    <div onClick={fHandeClick} className={`prodCard floorplan card`}>
      {children}
    </div>
  );
}

export { ProductCard };
