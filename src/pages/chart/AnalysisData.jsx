import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { chartBar, lineBar } from "../homePage/chart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./AnalysisData.css"
import { easing } from "jquery";
import { useLazyGetSaleQuery } from "../../app/service/analysisApi";


function AnalysisData() {
  const [type , setType] = useState('FULL')
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateFrom , setDateFrom] = useState('dd/MM/yyyy')
  const [getAnalystData, { data, isLoading }] = useLazyGetSaleQuery();
  const arr = ["thang 1", "thang 2", "thang 3"];
  const option = [666, 888, 222];

  useEffect(() => {
    getAnalystData(
         {
          type : type,
          time : selectedDate.getTime()
         }
    );
  }, [selectedDate])

  const { data: dataLiner, option: options } = chartBar(arr, option);

  const setDate = (date) => {
    setSelectedDate(date)
  }
  const changType = (type) => {
    if(type == 'Day'){
      setDateFrom('dd/MM/yyyy')
    }
    if(type == 'Month'){
      setDateFrom('MM/yyyy')
    }
    if(type == 'Year'){
      setDateFrom('yyyy')
    }
    setType(type)
  }



  
  return (
    <div>
      <main class="main">
        <div class="pagetitle">
          <h1>Statistical report </h1>
        </div>

        <section class="section">
          <div class="input-group">
            <div class="col-lg-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Sales Target</h5>
                  <div className="input-group custom-inputDate">
                  <div className="input-group-append">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                    </div>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(e) => setDate(e)}
                      dateFormat={dateFrom}
                      className="text-center custom-datePicker"
                      placeholderText="Select a date"
                    />
                  
                  </div>
                  <ul class="nav nav-pills mb-3 custom-nav1" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        onClick={()=>changType("Day")}
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Day
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        onClick={()=>changType("Month")}
                        class="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Month
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                       onClick={()=>changType("Year")}
                        class="nav-link"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        Year
                      </button>
                    </li>
                  </ul>
                 

                  <Bar options={options} data={dataLiner} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AnalysisData;
