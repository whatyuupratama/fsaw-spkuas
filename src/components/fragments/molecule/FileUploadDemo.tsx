'use client';

import { FileUpload } from '@/components/ui/file-upload';

type UploadProps = {
  className?: string;
};

export function FileUploadDemo(className: UploadProps) {
  // Perhatikan perubahan di sini!
  // const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = () => {};

  return (
    <div
      className={`${className}w-full mx-auto min-h-96 rounded-lg flex items-center text-white justify-center`}
    >
      <FileUpload onChange={handleFileUpload} />{' '}
    </div>
  );
}
