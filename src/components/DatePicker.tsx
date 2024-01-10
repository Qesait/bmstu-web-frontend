import { Button } from 'react-bootstrap';
import { forwardRef, ButtonHTMLAttributes, FC } from 'react';
import DatePicker from 'react-datepicker';

interface DatePickerProps {
    selected: Date | null | undefined;
    onChange: any;
}

interface CustomInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DateTimePicker: FC<DatePickerProps> = ({ selected, onChange }) => {
    const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>((props, ref) => (
        <Button
            variant="outline-dark"
            ref={ref}
            size="sm"
            className="text-nowrap"
            style={{ paddingRight: '1.5rem', minWidth: '137px' }}
            {...props}
        >
            {props.value ? props.value : 'Выберите дату'}
        </Button>
    ));

    return (
        <DatePicker
            selected={selected}
            onChange={onChange}
            isClearable
            timeCaption="Время"
            dateFormat="MM.d.yyyy"
            customInput={<CustomInput />}
            className="text-nowrap shadow-sm"
        />
    );
};

export default DateTimePicker;
