function ProductInvoRow({}) {
  return (
    <div className={`hBox width__max flex__min gap__0rem`}>
      <div className={`cell rcptNumCol`}>Receipt#: 12345</div>
      <div className={`cell rcptQtyCol`}>x 2</div>
      <div className={`cell rcptValueCol`}>$-69.00</div>
    </div>
  );
}

export { ProductInvoRow };
