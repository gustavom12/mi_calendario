import React, { useContext,  } from "react";
import CalendaryMonth from "./CalendaryMonth/CalendaryMonth";
import './CalendarySection.sass'
import SelectType from "./SelectType/SelectType";
import SelectedDataContext from "../../context/SelectedDataContext";
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import UserInputs from "./UserInputs/UserInputs";
import ConfirmedTurn from "./ConfirmedTurn/ConfirmedTurn";
import { url } from "../../helpers&hooks/useFetch";
function CalendarySection() {
  console.log(url)
  SwiperCore.use([Navigation]);
  const { selectedType, setSelectedType, selectedTime, setSelectedTime } = useContext<any>(SelectedDataContext)
  return (
    <section className="CalendarySection">
      <Swiper className="w-100"
        navigation={{
          nextEl: ".review-swiper-button-next",
          prevEl: ".review-swiper-button-prev",
        }}
        speed={850}
        slidesPerView={1}
        slidesPerColumn={1}
        allowTouchMove={false}
        >
        <SwiperSlide className="slide1 d-flex pb-1">
          <SelectType
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setSelectedTime={setSelectedTime}
            />
          <CalendaryMonth
            selectedType={selectedType}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </SwiperSlide>
        <SwiperSlide className="w-100 slide2">
          <UserInputs/>
        </SwiperSlide>
        <SwiperSlide className="w-100">
          <ConfirmedTurn/>
        </SwiperSlide>
      </Swiper >
    </section >
  )
}
export default CalendarySection
