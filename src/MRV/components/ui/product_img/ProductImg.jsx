function ProductImg({
  sImgKey,
  sSize = "4rem",
  sWidth = "100px",
  sHeight = "100px",
  radius = "0.5rem",
}) {
  const getImageSrc = (key) => {
    try {
      // Dynamically require the image based on the key
      return require(`../../../../assets/product-images/${key}.png`);
    } catch (error) {
      // Handle missing image by returning a default image
      console.error(`Image not found for key: ${key}`);
      return require(`../../../../assets/product-images/no_product.png`);
    }
  };

  const imgSrc = getImageSrc(sImgKey);

  const oStyle = {
    width: sSize || sWidth,
    height: sSize || sHeight,
    radius,
    overflow: "hidden",
  };

  return (
    <img
      src={imgSrc}
      alt="product"
      className="productImg"
      style={oStyle} // Apply width and height via inline styles
    />
  );
}

export { ProductImg };
