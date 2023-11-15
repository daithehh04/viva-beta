import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useField } from 'formik'

// import { LocalizationProvider, DatePicker, TextField } from '@mui/lab'
const DateTimePicker = ({ name, formik }) => {
  const [field, meta] = useField(name)
  const configDatePicker = {
    ...field
  }

  if (meta && meta.touched && meta.error) (configDatePicker.error = true), (configDatePicker.helperText = meta.error)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={['month', 'year']}
      />
    </LocalizationProvider>
  )
}

export default DateTimePicker
