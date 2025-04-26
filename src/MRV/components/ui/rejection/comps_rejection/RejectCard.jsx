function RejectCard({ uiCardLabel = null, children = null }) {
  return (
    <div className={`vBox gap__1rem width__max flex__min`}>
      {uiCardLabel}
      {children}
    </div>
  );
}

export { RejectCard };
