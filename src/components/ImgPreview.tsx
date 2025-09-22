interface ImgPreviewPros {
  images: Array<File>
}

export function ImgPreview(props: ImgPreviewPros) {
  return (
    <div>
      {props.images.map((image, index) => (
        <div key={index}>{URL.createObjectURL(image)}</div>
      ))}
    </div>
  )
}
