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

function BookTour({ data, setOpenModal, lang, detail, nameTour, dictionary }) {
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
  const [messageAbout, setMessageAbout] = useState('')

  const formRef = useRef()
  const pathName = usePathname()

  let timeBookTourFuture = addYears(new Date(), 1);

  const handleClose = () => {
    // setOpen(false);
    setIsConfirm(true)
    setOpenNoti(true)
  };
  let arrValueStyle = ""
  let arrStyle = []
  let arrValueCountry = ""
  let arrCountry = []
  let valueTrip = detail?.detail ? 0 : ''
  if (detail?.detail === true) {
    detail?.styleTourArr?.forEach((item, index) => { arrStyle.push(item?.name) })
    arrValueStyle = arrStyle.join(",")

    detail?.countriesTourArr?.forEach((item, index) => { arrCountry.push(item?.name) })
    arrValueCountry = arrCountry.join(", ")
  }
  // init value
  const INITAL_FORM_STATE = {
    nationality: '',
    fullName: '',
    telephone: '',
    email: '',
    confirmEmail: '',
    numberAdult: '',
    numberChildren: '',
    date: null,
    destination: arrCountry,
    accommodation: '',
    typeOfTrip: arrStyle,
    message: messageAbout,
    budget: '',
    confirm: false,
    numberTrip: valueTrip,
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
    confirmEmail: Yup.string().oneOf([Yup.ref('email'), null], dictionary?.message?.is_match).required(dictionary?.message?.is_required),
    numberAdult: Yup.number().typeError(dictionary?.message?.is_number).min(0).required(dictionary?.message?.is_required),
    numberChildren: Yup.number().typeError(dictionary?.message?.is_number).min(0).required(dictionary?.message?.is_required),
    date: Yup.date().required(dictionary?.message?.is_required),
    destination: Yup.array().min(1, dictionary?.message?.is_required).required(dictionary?.message?.is_required),
    accommodation: Yup.array().min(1, dictionary?.message?.is_required).required(dictionary?.message?.is_required),
    typeOfTrip: Yup.array().min(1, dictionary?.message?.is_required).required(dictionary?.message?.is_required),
    message: Yup.string(),
    budget: Yup.number().typeError(dictionary?.message?.is_number).integer().required(dictionary?.message?.is_required),
    confirm: Yup.boolean().required(dictionary?.message?.is_required),
    numberTrip: Yup.string()
      .matches(/^[0-9]+$/, dictionary?.message?.is_number)
      .required(dictionary?.message?.is_required),
  })

  const dataBooktour = data?.data?.page?.booktour
  const dataBooktourContact = data?.data?.page?.booktour?.contactdetail
  const dataBooktourAge = data?.data?.page?.booktour?.participantage
  const dataParticipant = data?.data?.page?.booktour?.participants

  const { BOOK_TOUR_EN,
    BOOK_TOUR_FR,
    BOOK_TOUR_IT,
    PERSONALIZE_EN,
    PERSONALIZE_FR,
    PERSONALIZE_IT,
    PROMOTION_EN,
    PROMOTION_FR,
    PROMOTION_IT } = FORM_IDS

  let idForm = '';
  if (lang === "en") {
    idForm = !detail?.detail ? BOOK_TOUR_EN : pathName.includes('hot-deal') ? PROMOTION_EN : PERSONALIZE_EN
  } else if (lang === "fr") {
    idForm = !detail?.detail ? BOOK_TOUR_FR : pathName.includes('hot-deal') ? PROMOTION_FR : PERSONALIZE_FR
  } else if (lang === 'it') {
    idForm = !detail?.detail ? BOOK_TOUR_IT : pathName.includes('hot-deal') ? PROMOTION_IT : PERSONALIZE_IT
  }

  const handleChangeMess = (e) => {
    setMessageAbout(e.target.value)
  }
  const handleForm = (values, resetForm) => {
    const dateTravel = format(values.date, 'MM/yyyy')
    if (capcha) {
      mutate({
        variables: {
          input: {
            id: idForm,
            fieldValues: [
              { id: 1, value: values.nationality },
              { id: 3, value: values.fullName },
              { id: 17, value: values.telephone },
              { id: 27, emailValues: { value: values.email, } },
              { id: 19, value: values.numberChildren },
              { id: 20, value: values.numberAdult },
              { id: 21, value: dateTravel },
              { id: 24, value: detail?.detail === true ? arrValueCountry : values.destination.join(', ') },
              { id: 22, value: values.accommodation.join(', ') },
              { id: 25, value: detail?.detail === true ? arrValueStyle : values.typeOfTrip.join(', ') },
              { id: 14, value: messageAbout },
              { id: 15, value: values.budget },
              { id: 16, value: `${values.confirm}` === 'true' ? 'Yes' : 'No' },
              { id: 26, value: detail?.detail ? nameTour : '' },
              { id: 28, value: !detail?.detail ? values.numberTrip : '' },
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
            className='md:w-[82.6875vw] md:h-[95.5vw] w-full h-full overflow-auto hidden-scroll relative booktour block'
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
                        <h2 className='text-white heading-1'>{detail?.detail ? dictionary?.nav?.title_personalize : dictionary?.nav?.title_quote}</h2>
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
                              <h4>{dataBooktourContact?.confirmemail?.labelconfirm}</h4>
                              <TextFiledWrapper
                                name='confirmEmail'
                                placeholder={dataBooktourContact?.confirmemail?.placeholderconfirm}
                              />
                            </div>
                            {!detail?.detail && <div className='flex flex-col md:gap-[0.5vw] inputField'>
                              <h4>{dictionary?.check_visa?.number_trip}</h4>
                              <TextFiledWrapper
                                name='numberTrip'
                                placeholder={'0'}
                              />
                            </div>}
                          </div>
                        </div>

                        {/* Participant 1 */}

                        <div className='flex flex-col md:gap-[1.5vw] md:mt-[2.5vw] md:mb-[3.75vw] my-[14.93vw] agePicker'>
                          <div className='flex max-md:justify-between  max-md:mb-[6.4vw]'>
                            <h3 className='text-white md:text-[2.5vw] font-[500] leading-[1.1]'>
                              {dataBooktourAge?.title}
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
                          <p className='md:text-[1.125vw] leading-[150%] text-white md:mb-[0.63vw] max-md:hidden'>
                            {dataBooktourAge?.subtitle}
                          </p>
                          <div className='md:grid grid-cols-3 grid-rows-1 md:gap-[5.31vw] flex flex-col gap-[6.4vw]'>
                            <div className='flex flex-col md:gap-[0.5vw] gap-[2.13vw]'>
                              <span className='md:text-white text-[#DFDFDF] md:text-[0.9375vw] text-[3.73333vw] md:font-[500] font-[400] leading-[150%]'>
                                {dataBooktourAge?.adult?.labeladult}
                              </span>
                              <TextFiledWrapper name='numberAdult' />
                            </div>
                            <div className='flex flex-col md:gap-[0.5vw] gap-[2.13vw]'>
                              <span className='md:text-white text-[#DFDFDF] md:text-[0.9375vw] text-[3.73333vw] md:font-[500] font-[400] leading-[150%]'>
                                {dataBooktourAge?.children?.labelchild}
                              </span>
                              <TextFiledWrapper name='numberChildren' />
                            </div>
                          </div>
                        </div>

                        {/* participant 2 */}

                        <div className='flex flex-col md:gap-[1.5vw] participant2'>
                          <div className='flex max-md:justify-between max-md:mb-[6.4vw]'>
                            <h3 className='text-white md:text-[2.5vw] font-[500] leading-[1.1]'>
                              {dataParticipant?.title}
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
                          <div className='md:grid grid-cols-3 grid-rows-1 md:gap-[5.31vw] flex flex-col gap-[6.4vw] '>
                            <div className='flex flex-col md:gap-[0.5vw] gap-[2.13vw] max-md:w-full'>
                              <h4 dangerouslySetInnerHTML={{ __html: `${dataParticipant?.time}` }}></h4>
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

                            {/* checkboxx */}

                            {detail?.detail ? "" : (<div className='flex flex-col md:gap-[0.5vw] gap-[3.2vw] max-md:w-full'>
                              <h4
                                className='md:text-[1.125vw] text-[3.73333vw] text-[#fff] leading-[150%]'
                                dangerouslySetInnerHTML={{ __html: `${dataParticipant?.destinationchoice}` }}
                              ></h4>
                              <div
                                role='group'
                                aria-labelledby='checkbox-group'
                                className='grid grid-cols-2 grid-rows-2 md:gap-y-[1vw] md:gap-x-[1vw] gap-[4.27vw] items-center max-md:w-full '
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
                                <ErrorMessage
                                  name='destination'
                                  component='div'
                                  className='md:text-[0.8vw] text-[3.2vw] text-[red]'
                                />
                              </div>
                            </div>)}


                            {/* radio group */}
                            <div className='flex flex-col md:gap-[0.5vw] gap-[3.2vw] max-md:w-full'>
                              <h4 dangerouslySetInnerHTML={{ __html: `${dataParticipant?.accomodation?.labelaccom}` }}></h4>
                              <div
                                role='group'
                                aria-labelledby='checkbox-group'
                                className='radio-group'
                              >
                                {dataParticipant?.accomodation?.acommodationchoice?.map((choice, index) => (
                                  <label key={index}>
                                    <Field
                                      type='checkbox'
                                      name='accommodation'
                                      value={choice?.listchoice}
                                    />
                                    <span className='md:text-[1rem] font-medium md:leading-[1.5]'>{choice?.listchoice}</span>
                                  </label>
                                ))}
                              </div>
                              <ErrorMessage
                                name='accommodation'
                                component='div'
                                className='md:text-[0.8vw] text-[3.2vw] text-[red]'
                              />
                            </div>

                            {/* type of trip */}
                          </div>
                        </div>
                        {/* trip,note,budget */}
                        <div className='md:mt-[3vw] mt-[6.4vw] md:grid grid-cols-3 md:gap-[5.31vw] items-start trip flex flex-col gap-[6.4vw]'>
                          {detail?.detail === true ? "" : <div className='flex flex-col md:gap-[0.5vw] gap-[3.2vw] max-md:w-full'>
                            <h4
                              className=''
                              dangerouslySetInnerHTML={{ __html: `${dataParticipant?.typeoftrip}` }}
                            ></h4>
                            <div
                              role='group'
                              aria-labelledby='checkbox-group'
                              className='grid grid-cols-1 md:gap-[1vw] gap-[4.27vw] typeOfTrip 2xl:grid-cols-2'
                            >
                              {data?.data?.allTourStyle?.nodes?.map((tour, index) => (
                                <label key={index}>
                                  <Field
                                    type='checkbox'
                                    name='typeOfTrip'
                                    value={tour?.name}
                                  />
                                  <span className='md:text-[1rem] font-medium md:leading-[1.5] whitespace-nowrap'>{tour?.name}</span>
                                </label>
                              ))}
                              <ErrorMessage
                                name='typeOfTrip'
                                component='div'
                                className='md:text-[0.8vw] text-[3.2vw] text-[red]'
                              />
                            </div>
                          </div>}

                          {/* Budget */}
                          <div className='flex flex-col md:gap-[0.5vw] gap-[3.2vw] max-md:w-full budgetTour'>
                            <h4 dangerouslySetInnerHTML={{ __html: `${dataParticipant?.budget?.label}` }}></h4>
                            <TextFiledWrapper
                              name='budget'
                              placeholder='8888'
                            />
                          </div>

                          {/* note */}
                          <div className='flex flex-col md:gap-[0.5vw] gap-[3.2vw] message max-md:w-full'>
                            <h4 dangerouslySetInnerHTML={{ __html: `${dataParticipant?.message?.label}` }}></h4>
                            {/* <TextFiledWrapper
                              name='message'
                              placeholder={dataParticipant?.message?.placeholdermessage}
                            /> */}
                            <TextareaAutosize
                              minRows={4}
                              name='message'
                              onChange={(e) => handleChangeMess(e)}
                              placeholder={dataParticipant?.message?.placeholdermessage} />
                          </div>
                        </div>

                        <div className='md:mt-[2.5vw] mt-[6.4vw] md:w-[25.8vw] '>
                          <h4 className='md:mb-[1.03vw] mb-[3.2vw]'>{dataParticipant?.ready?.label}</h4>
                          <div
                            role='group'
                            aria-labelledby='my-radio-group'
                            className='confirm'
                          >
                            <label>
                              <Field
                                type='radio'
                                name='confirm'
                                value='true'
                              // parse={(value) => value === 'true'}
                              />{' '}
                              {dataParticipant?.ready?.confirm}
                            </label>
                            <label>
                              <Field
                                type='radio'
                                name='confirm'
                                value='false'
                              // parse={(value) => value === 'true'}
                              />{' '}
                              {dataParticipant?.ready?.refuse}
                            </label>
                          </div>
                          <ErrorMessage
                            name='confirm'
                            component='div'
                            className='md:text-[0.8vw] text-[3.2vw] text-[red]'
                          />
                        </div>
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

export default BookTour
