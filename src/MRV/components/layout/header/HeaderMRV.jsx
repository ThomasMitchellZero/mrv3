function HeaderMRV({ title = "NO TITLE", aNodes = [] }) {
  return (
    <header className={`header`}>
      <div className={`heading__large`}>{title}</div>
    </header>
  );
}

export { HeaderMRV };
