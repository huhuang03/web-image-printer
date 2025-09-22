import './index.css';

import {Button} from '@/components/ui/button.tsx';
import {IconPhotoPlus} from '@tabler/icons-react';
import {Printer} from 'lucide-react';
import {useRef, useState} from 'react';
import {ImgPreview} from '@/components/ImgPreview.tsx';

export function App() {
  const [images, setImages] = useState<File[]>([]);

  // 2. 创建隐藏的 <input type="file">
  const inputRef = useRef<HTMLInputElement>(null);

  // 3. 点击按钮时触发 input
  const handleAddImageClick = () => {
    inputRef.current?.click();
  };
  // 4. 当选择文件时，把文件加入 images
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(prev => [...prev, ...Array.from(e.target.files || [])]);
  };

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;


    window.print();
  };

  return (
    <div className="container relative z-10" style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div ref={printRef} id="print-area">
        <ImgPreview images={images} arrange={{
          rows: 3,
          cols: 3,
          horizontal_padding: 7,
          vertical_padding: 7,
          horizontal_spacing: 5,
          vertical_spacing: 5
        }} />
      </div>
      <div className="op-area flex space-x-4 p-3 hide-when-print">
        <Button onClick={handleAddImageClick}>
          <IconPhotoPlus />添加图片
        </Button>
        <Button onClick={handlePrint}>
          <Printer />打印
        </Button>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={handleFilesChange}
        className="hidden"
      />
    </div>
  );
}

export default App;
