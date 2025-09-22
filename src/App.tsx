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

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;


    // 克隆内容
    const content = printRef.current!!.cloneNode(true) as HTMLElement;

    // 写入新窗口
    printWindow.document.open();
    printWindow.document.write(`
      <html lang="en">
        <head>
          <title>打印图片</title>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; }
            img { page-break-inside: avoid; }
          </style>
        </head>
        <body>
          ${content.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.focus();
    printWindow.print();
    // 打印后自动关闭
    printWindow.close();
  };

  return (
    <div className="container mx-auto p-1 text-center relative z-10" style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div ref={printRef}>
        <ImgPreview images={images} arrange={{
          rows: 3,
          cols: 3,
          horizontal_padding: 10,
          vertical_padding: 10,
          horizontal_spacing: 10,
          vertical_spacing: 10
        }} />
      </div>
      <div className="op-area flex space-x-4 p-3">
        <Button onClick={handleAddImageClick}>
          <IconPhotoPlus />添加图片
        </Button>
        <Button onClick={handlePrint}>
          <Printer />打印
        </Button>
        {/*<NumberAdjustment name={'行间距'} />*/}
        {/*<NumberAdjustment name={'列间距'} />*/}
        {/*<NumberAdjustment name={'行边距'} />*/}
        {/*<NumberAdjustment name={'列边距'} />*/}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={handleFilesChange}
        className="hidden"
      />

      {/*<Card className="bg-card/50 backdrop-blur-sm border-muted">*/}
      {/*  <CardContent className="pt-6">*/}
      {/*    <h1 className="text-5xl font-bold my-4 leading-tight">Bun + React</h1>*/}
      {/*    <p>*/}
      {/*      Edit{" "}*/}
      {/*      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">src/App.tsx</code> and*/}
      {/*      save to test HMR*/}
      {/*    </p>*/}
      {/*    <APITester />*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
    </div>
  );
}

export default App;
