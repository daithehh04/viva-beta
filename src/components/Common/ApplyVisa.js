'use client'

import bgPc from '@/assets/images/bgBookTourPc.jpg'
import Image from 'next/image'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import TextFiledWrapper from '../FormBookTour/TextField'
import SelectField from '../FormBookTour/SelectField'
import Button from './Button'
import { gql, useMutation } from '@apollo/client'
import { useRef, useState } from 'react'
import Notification from './Notification'
import { useClickOutside } from '@/helpers/customHooks'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import ReCAPTCHA from 'react-google-recaptcha'
import addYears from 'date-fns/addYears'
import { FORM_IDS } from '@/configs/global-config'
import { useParams, usePathname } from 'next/navigation'
import { format } from 'date-fns'

// queries form
const SUBMIT_FORM = gql`
  mutation ($input: SubmitGfFormInput!) {
    submitGfForm(input: $input) {
      entry {
        id
      }
      errors {
        message
      }
    }
  }
`

function ApplyVisa({ data, setOpenModal, lang, detail, nameTour, dictionary }) {
  const [capcha, setCapcha] = useState(null)
  const [errCapcha, setErrCapcha] = useState("")
  const [open, setOpen] = useState(true);
  const [mutate, { loading }] = useMutation(SUBMIT_FORM)
  const [openNoti, setOpenNoti] = useState(false)
  const [msg, setMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isDone, setIsDone] = useState(false) // check when successful noti or error noti appeared

  const formRef = useRef()
  const pathName = usePathname()

  let timeBookTourFuture = addYears(new Date(), 1);

  const handleClose = () => {
    // setOpen(false);
    setIsConfirm(true)
    setOpenNoti(true)
  };
  let arrValueCountry = ""
  let arrCountry = []
  if (detail?.detail === true) {

    detail?.countriesTourArr?.forEach((item, index) => { arrCountry.push(item?.name) })
    arrValueCountry = arrCountry.join(", ")
  }
  // init value
  const INITAL_FORM_STATE = {
    nationality: '',
    fullName: '',
    telephone: '',
    email: '',
    participantsNumber: '',
    numberTrip: '',
    date: null,
    destination: arrCountry,
  }
  //validate
  const FORM_VALIDATION = Yup.object().shape({
    nationality: Yup.string().required(dictionary?.message?.is_required),
    fullName: Yup.string().required(dictionary?.message?.is_required),
    telephone: Yup.string()
      .required(dictionary?.message?.is_required)
      .matches(/^[0-9]+$/, dictionary?.message?.invalid_phone)
      .min(9, dictionary?.message?.min_phone)
      .required(dictionary?.message?.is_required),
    email: Yup.string().email(dictionary?.message?.invalid_email).required(dictionary?.message?.is_required),
    participantsNumber: Yup.string()
    .matches(/^[0-9]+$/, dictionary?.message?.is_number)
    .required(dictionary?.message?.is_required),
    numberTrip: Yup.string()
    .matches(/^[0-9]+$/, dictionary?.message?.is_number)
    .required(dictionary?.message?.is_required),
    date: Yup.date().required(dictionary?.message?.is_required),
    destination: Yup.array().min(1, dictionary?.message?.is_required).required(dictionary?.message?.is_required),
  })

  const dataBooktourContact = data?.data?.page?.booktour?.contactdetail
  const dataParticipant = data?.data?.page?.booktour?.participants

  const { APPLY_VISA_EN,
    APPLY_VISA_FR,
    APPLY_VISA_IT,
     } = FORM_IDS

  let idForm = lang === "en" ? APPLY_VISA_EN : lang === "fr" ? APPLY_VISA_FR : APPLY_VISA_IT;

  const handleForm = (values, resetForm) => {
    const dateTravel = format(values.date, 'MM/yyyy')
    if (capcha) {
      mutate({
        variables: {
          input: {
            id: idForm,
            fieldValues: [
              { id: 7, value: values.nationality },
              { id: 1, value: values.fullName },
              { id: 3, value: values.telephone },
              { id: 10, emailValues: { value: values.email,} },
              { id: 5, value: values.participantsNumber },
              { id: 9, value: values.numberTrip },
              { id: 6, value: dateTravel },
              { id: 8, value: detail?.detail === true ? arrValueCountry : values.destination.join(', ') },
            ]
          }
        }
      }).then((res) => {
        if (res?.data?.submitGfForm?.errors?.length > 0) {
          // Have Error
          setIsError(true)
          setOpenNoti(true)
          setMsg('Failed')
          setIsDone(true)
        } else {
          // Successful
          setIsSuccess(true)
          setIsConfirm(false)
          setOpenNoti(true)
          setMsg('Successfull')
          setIsDone(true)
          resetForm()
        }
      })
    } else {
      setErrCapcha('Please verify!')
    }
  }
  useClickOutside(formRef, (event) => {
    if (!isDone) {
      setOpenNoti(true)
      setIsConfirm(true)
    }
  })
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "82.6875vw;",
              margin: '0'
            },
          },
          "@media (max-width: 767px)": {
            "& .MuiDialog-container .MuiPaper-root": {
              maxWidth: "100%",
              height: '100%',
              maxHeight: '100%'
            },
          },
        }}
      >
        <DialogContent>
          <Image
            alt='background'
            src={bgPc}
            quality={100}
            priority
            className='absolute top-0 left-0 w-full h-full'
          />
          <div
            // ref={formRef}
            className='md:w-[82.6875vw] md:h-[75.5vw] w-full h-full overflow-auto hidden-scroll relative booktour block'
          >
            <div className='relative w-full h-full md:pt-[3.59vw] md:pl-[3.75vw] md:pr-[4.06vw] md:pb-[6.25vw] px-[4.27vw] pb-[22.29vw] pt-[8.8vw]'>
              <svg
                className='md:w-[3.5vw] md:h-[3.5vw] w-[8.53333vw] h-[8.53333vw]  fixed z-[10] md:top-[3.59vw] md:right-[10.47vw] max-md:right-[4.27vw] cursor-pointer'
                xmlns='http://www.w3.org/2000/svg'
                width='57'
                height='57'
                viewBox='0 0 57 57'
                fill='none'
                onClick={() => {
                  setOpenNoti(true)
                  setIsConfirm(true)
                }}
              >
                <line
                  x1='46.3438'
                  y1='15.857'
                  x2='18.0596'
                  y2='44.1413'
                  stroke='white'
                  strokeWidth='2'
                />
                <line
                  x1='44.9296'
                  y1='43.8575'
                  x2='16.6453'
                  y2='15.5732'
                  stroke='white'
                  strokeWidth='2'
                />
              </svg>
              <Formik
                initialValues={{ ...INITAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values, { resetForm }) => {
                  handleForm(values, resetForm)
                }}
              >
                {(formik) => {
                  return (
                    <Form
                      onSubmit={formik.handleSubmit}
                      className='max-md:pb-[3vw]'
                    >
                      <div className='block md:pt-[3.28vw] md:mb-[3.5vw] mb-[10.67vw]'>
                        <h2 className='text-white heading-1'>{dictionary?.check_visa?.title_form}</h2>
                        {/* Contact Detail */}
                        <div className='flex flex-col md:gap-[1.5vw] md:mt-[3.5vw] mt-[10.67vw]'>
                          <div className='flex items-center max-md:justify-between'>
                            <h3 className='text-white md:text-[2.5vw] text-[6.4vw] font-[500] leading-[1.1]'>
                              {dataBooktourContact?.subheading}
                            </h3>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-[4.26667vw] h-[4.26667vw] md:hidden'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                            >
                              <path
                                d='M13.0053 5.14211C13.1947 4.95263 13.5105 4.95263 13.7 5.14211C13.8895 5.33158 13.8895 5.64737 13.7 5.83684L8.26842 11.2053C8.07895 11.3947 7.76316 11.3947 7.57368 11.2053L2.14211 5.83684C1.95263 5.64737 1.95263 5.33158 2.14211 5.14211C2.33158 4.95263 2.64737 4.95263 2.83684 5.14211L7.95263 10.0684L13.0053 5.14211Z'
                                fill='white'
                              />
                            </svg>
                          </div>
                          <div className='md:grid grid-cols-3 grid-rows-2 md:gap-y-[1vw] md:gap-x-[5.31vw] max-md:mt-[6.4vw] flex flex-col gap-[6.4vw]'>
                            <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4>{dataBooktourContact?.nationality?.label}</h4>
                              <SelectField
                                name='nationality'
                                options={data?.data?.allFromCountry?.nodes}
                              />
                              <ErrorMessage
                                name='nationality'
                                component='div'
                                className='md:text-[1rem] text-[3.2vw] text-[red]'
                              />
                            </div>
                            <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4>{dataBooktourContact?.fullname?.labelname}</h4>
                              <TextFiledWrapper
                                name='fullName'
                                placeholder={dataBooktourContact?.fullname?.placeholdername}
                              />
                            </div>
                            <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4>{dataBooktourContact?.telephone?.labelphone}</h4>
                              <TextFiledWrapper
                                name='telephone'
                                placeholder={dataBooktourContact?.telephone?.placeholderphone}
                              />
                            </div>
                            <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4>{dataBooktourContact?.email?.labelemail}</h4>
                              <TextFiledWrapper
                                name='email'
                                placeholder={dataBooktourContact?.email?.placeholderemail}
                              />
                            </div>
                            <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4>{dictionary?.check_visa?.number_participants}</h4>
                              <TextFiledWrapper
                                name='participantsNumber'
                                placeholder={'0'}
                              />
                            </div>
                            <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4>{dictionary?.check_visa?.number_trip}</h4>
                              <TextFiledWrapper
                                name='numberTrip'
                                placeholder={'0'}
                              />
                            </div>
                            <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4 className='title' dangerouslySetInnerHTML={{ __html: `${dataParticipant?.time}` }}></h4>
                              {/* <DatePickerCustom name='date' /> */}
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                  name='date'
                                  views={['year', 'month']}
                                  format="MM/yyyy"
                                  value={formik.values.date}
                                  onChange={(value) => formik.setFieldValue("date", value, true)}
                                  slotProps={{
                                    textField: {
                                      variant: "outlined",
                                    }
                                  }}
                                  defaultValue={[new Date()]}
                                  minDate={new Date()}
                                  maxDate={timeBookTourFuture}
                                />
                              </LocalizationProvider>
                              <ErrorMessage
                                name='date'
                                component='div'
                                className='md:text-[1rem] text-[3.2vw] text-[red]'
                              />
                            </div>
                          </div>
                        </div>

                        {/* Participant 1 */}

                        <div className='flex flex-col md:gap-[1.5vw] participant2'>
                          {/* <div className='md:grid grid-cols-1 grid-rows-1 md:gap-[5.31vw] flex flex-col gap-[6.4vw] '> */}
                            

                            {/* checkboxx */}

                            <div className='flex flex-col md:gap-[0.5vw] gap-[3.2vw] max-md:w-full pt-4'>
                              <h4
                                className='md:text-[1.125vw] text-[3.73333vw] text-[#fff] leading-[150%] title'
                                dangerouslySetInnerHTML={{ __html: `${dataParticipant?.destinationchoice}` }}
                              ></h4>
                              <div
                                role='group'
                                aria-labelledby='checkbox-group'
                                className='grid grid-cols-2 md:grid-cols-7 grid-rows-1 md:gap-y-[1vw] md:gap-x-[1vw] gap-[4.27vw] items-center max-md:w-full '
                              >
                                {data?.data?.allCountries?.nodes?.map((des, index) => (
                                  <label key={index}>
                                    <Field
                                      type='checkbox'
                                      name='destination'
                                      value={des?.name}
                                    />
                                    <span className='md:text-[1vw] text-white font-[500] leading-[150%] whitespace-nowrap'>
                                      {des?.name}
                                    </span>
                                  </label>
                                ))}
                               
                              </div>
                              <ErrorMessage
                                  name='destination'
                                  component='div'
                                  className='md:text-[0.8vw] text-[3.2vw] text-[red]'
                                />
                            </div>

                          {/* </div> */}
                        </div>
                        {/* trip,note,budget */}
                        
                        <div className='mt-[2.5vw]'>
                          <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_KEY} onChange={setCapcha} />
                          <p className='error-capcha md:text-[1rem] text-[3.2vw] text-[red]'>{errCapcha}</p>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className='justify-center btn-primary max-md:w-full max-md:flex'
                      >
                        {data?.data?.page?.booktour?.buttontext} {loading && '...'}
                      </Button>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </DialogContent>
        {/* Capcha */}
      </Dialog>


      <Notification
        lang={lang}
        openNoti={openNoti}
        setOpenNoti={setOpenNoti}
        msg={msg}
        isSuccess={isSuccess}
        isError={isError}
        isConfirm={isConfirm}
        handleSuccess={() => {
          setIsSuccess(false)
          setOpenModal(false)
        }}
        handleError={() => {
          setIsError(false)
        }}
        handleConfirm={() => {
          setOpenModal(false)

        }}
      />
    </div>
  )
}

export default ApplyVisa
