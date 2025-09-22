interface ImgPreviewPros {
  images: Array<File>
  arrange: PreviewArrange
}

export const UNIT = 'mm'

const WIDTH = 297
const HEIGHT = 210

export interface PreviewArrange {
  rows: number;
  cols: number;
  horizontal_spacing: number;
  vertical_spacing: number;
  horizontal_padding: number;
  vertical_padding: number;
}

/**
 * @param props
 * @constructor
 */
export function ImgPreview(props: ImgPreviewPros) {
  const {rows, cols, horizontal_spacing, vertical_spacing, horizontal_padding, vertical_padding} = props.arrange;

  // 图片尺寸 = 可用宽高 / 行列数
  const availableWidth = WIDTH - 2 * horizontal_padding - (cols - 1) * horizontal_spacing; // mm
  const availableHeight = HEIGHT - 2 * vertical_padding - (rows - 1) * vertical_spacing; // mm
  const imgWidth = availableWidth / cols;
  const imgHeight = availableHeight / rows;

  return (
    <div
      style={{
        width: `${WIDTH}mm`,
        height: `${HEIGHT}mm`,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${imgWidth}mm)`,
        gridTemplateRows: `repeat(${rows}, ${imgHeight}mm)`,
        columnGap: `${horizontal_spacing}mm`,
        rowGap: `${vertical_spacing}mm`,
        padding: `${vertical_padding}mm ${horizontal_padding}mm`,
        boxSizing: 'border-box',
        border: '1px solid #ccc', // 可选，预览边界
      }}
    >
      {props.images.map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt={file.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ))}
    </div>
  );
}
