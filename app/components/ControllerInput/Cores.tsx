import { Color as TColor } from '@prisma/client'
import { forwardRef, useCallback, useState } from 'react';
import { FieldValues, ControllerRenderProps } from 'react-hook-form';

type ControllerSelectProps = ControllerRenderProps<FieldValues> & {
    data: TColor[];
}


export const Cores = forwardRef<HTMLDivElement, ControllerSelectProps>(
    ({ data, ...field }, ref) => {

        const getColorNameById = (colorId: string) => {
            const color = data.find((item) => item.id === colorId);
            return color ? color.name : '';
        };

        const [isOpen, setIsOpen] = useState(false)
        const toggle = useCallback(() => {
            setIsOpen((value) => !value)
        }, [])

        return (
            <div ref={ref}>
                <input
                    onClick={toggle}
                    type="text"
                    readOnly
                    value={getColorNameById(field.value)}
                    className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C] max-w-sm w-full"
                    placeholder="Selecione uma opção"
                />
                <div {...field}>
                    {isOpen && (
                        <div className="absolute top-16 w-full">
                            <ul className="rounded border border-[#D9D9D9]">
                                {data?.map((item) => (
                                    <li
                                        key={item.id}
                                        className="hover:bg-[#EFF2FA] my-2 mx-2 pl-4 rounded cursor-pointer"
                                        onClick={() => {
                                            field.onChange(item.id)
                                            setIsOpen(false)
                                        }}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        )
    }
)
