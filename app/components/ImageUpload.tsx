'use client'

import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { useCallback, useEffect } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { Button } from './Button';
type ImageUploadProps = {
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[]
}
declare global {
    var cloudinary: any
}
const ImageUpload = ({ onChange, value, onRemove }: ImageUploadProps) => {
    const handleUpload = useCallback((result: any) => {

        onChange(result.info.secure_url)

    }, [onChange])



    return (
        <div>
            <div className='mb-4 flex items-center gap-4'>
                {value.map((url) => (
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='absolute right-2 top-2 z-10' onClick={() => onRemove(url)}>
                            <Button variant='secondary' size='icon'>
                                <BsTrash className='h-4 w-4' />
                            </Button>
                        </div>
                        <Image
                            alt='Upload'
                            fill
                            style={{ objectFit: 'cover' }}
                            src={url}
                        />
                    </div>
                ))}

            </div>
            <CldUploadWidget
                onUpload={handleUpload}
                uploadPreset='ynz4ncg6'
                options={{
                    singleUploadAutoClose: false
                }}
            >
                {({ open }) => {
                    const onClick = () => {
                        open()
                    };
                    return (
                        <div>
                            <Button onClick={onClick} variant='primary' className='bg-slate-100 hover:bg-slate-50  gap-2 border-none'>
                                <BiImageAdd />
                                <span>Adicione uma imagem</span>
                            </Button>
                        </div>
                    )
                }}
            </CldUploadWidget>
        </div >
    )
}

export default ImageUpload