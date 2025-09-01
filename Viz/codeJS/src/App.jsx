import React, { useState } from 'react'
import { useEffect } from "react";
import { fetchIntensity } from "./fetch-intensity-0";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/LineChart.jsx";
import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, Link,
} from "react-router-dom";
import Home from "./home.jsx";

function App() {
    document.body.classList.add('backgroundApp');

    const [intensity1, setIntensity1] = useState([]);
    const [intensity2, setIntensity2] = useState([]);
    const [intensity3, setIntensity3] = useState([]);
    const [intensity4, setIntensity4] = useState([]);
    const [intensity5, setIntensity5] = useState([]);
    const [intensity6, setIntensity6] = useState([]);
    const [intensity7, setIntensity7] = useState([]);
    const [intensity8, setIntensity8] = useState([]);
    const [intensity9, setIntensity9] = useState([]);
    const [intensity10, setIntensity10] = useState([]);
    const [intensity11, setIntensity11] = useState([]);
    const [intensity12, setIntensity12] = useState([]);
    const [intensity13, setIntensity13] = useState([]);
    const [intensity14, setIntensity14] = useState([]);
    const [intensity15, setIntensity15] = useState([]);
    const [intensity16, setIntensity16] = useState([]);
    const [intensity17, setIntensity17] = useState([]);
    const [intensity18, setIntensity18] = useState([]);
    const [intensity19, setIntensity19] = useState([]);
    const [intensity20, setIntensity20] = useState([]);
    const [intensity21, setIntensity21] = useState([]);
    const [intensity22, setIntensity22] = useState([]);
    const [intensity23, setIntensity23] = useState([]);
    const [intensity24, setIntensity24] = useState([]);
    const [intensity25, setIntensity25] = useState([]);
    const [intensity26, setIntensity26] = useState([]);
    const [intensity27, setIntensity27] = useState([]);
    const [intensity28, setIntensity28] = useState([]);
    const [intensity29, setIntensity29] = useState([]);
    const [intensity30, setIntensity30] = useState([]);
    const [intensity31, setIntensity31] = useState([]);
    const [intensity32, setIntensity32] = useState([]);
    const [intensity33, setIntensity33] = useState([]);
    const [intensity34, setIntensity34] = useState([]);
    const [intensity35, setIntensity35] = useState([]);
    const [intensity36, setIntensity36] = useState([]);
    const [intensity37, setIntensity37] = useState([]);
    const [intensity38, setIntensity38] = useState([]);
    const [intensity39, setIntensity39] = useState([]);
    const [intensity40, setIntensity40] = useState([]);
    const [intensity41, setIntensity41] = useState([]);
    const [intensity42, setIntensity42] = useState([]);
    const [intensity43, setIntensity43] = useState([]);
    const [intensity44, setIntensity44] = useState([]);
    const [intensity45, setIntensity45] = useState([]);
    const [intensity46, setIntensity46] = useState([]);
    const [intensity47, setIntensity47] = useState([]);
    const [intensity48, setIntensity48] = useState([]);

    const [chartData, setChartData] = useState({
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [{
            backgroundColor:"rgba(0,128,0,1.0)",
            borderColor: "rgba(0,128,0,0.1)",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
    });

    const [chartDataBlueWhale, setChartDataBlueWhale] = useState({
        labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        datasets: [{
            backgroundColor:"rgba(39, 135, 245,1.0)",
            borderColor: "rgba(39, 135, 245,0.3)",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
    });

    const [energy, setEnergy] = useState('0');

    var thisDate = new Date();
    var dd = String(thisDate.getDate()).padStart(2, '0');
    var mm = String(thisDate.getMonth() + 1).padStart(2, '0');
    var yyyy = thisDate.getFullYear();
    var thisDateString = yyyy + '-' + mm + '-' + dd;
    var requestPeriod1 = '1';
    var requestPeriod2 = '2';
    var requestPeriod3 = '3';
    var requestPeriod4 = '4';
    var requestPeriod5 = '5';
    var requestPeriod6 = '6';
    var requestPeriod7 = '7';
    var requestPeriod8 = '8';
    var requestPeriod9 = '9';
    var requestPeriod10 = '10';
    var requestPeriod11 = '11';
    var requestPeriod12 = '12';
    var requestPeriod13 = '13';
    var requestPeriod14 = '14';
    var requestPeriod15 = '15';
    var requestPeriod16 = '16';
    var requestPeriod17 = '17';
    var requestPeriod18 = '18';
    var requestPeriod19 = '19';
    var requestPeriod20 = '20';
    var requestPeriod21 = '21';
    var requestPeriod22 = '22';
    var requestPeriod23 = '23';
    var requestPeriod24 = '24';
    var requestPeriod25 = '25';
    var requestPeriod26 = '26';
    var requestPeriod27 = '27';
    var requestPeriod28 = '28';
    var requestPeriod29 = '29';
    var requestPeriod30 = '30';
    var requestPeriod31 = '31';
    var requestPeriod32 = '32';
    var requestPeriod33 = '33';
    var requestPeriod34 = '34';
    var requestPeriod35 = '35';
    var requestPeriod36 = '36';
    var requestPeriod37 = '37';
    var requestPeriod38 = '38';
    var requestPeriod39 = '39';
    var requestPeriod40 = '40';
    var requestPeriod41 = '41';
    var requestPeriod42 = '42';
    var requestPeriod43 = '43';
    var requestPeriod44 = '44';
    var requestPeriod45 = '45';
    var requestPeriod46 = '46';
    var requestPeriod47 = '47';
    var requestPeriod48 = '48';
    var timePeriod1 = '00:00';
    var timePeriod2 = '00:30';
    var timePeriod3 = '01:00';
    var timePeriod4 = '01:30';
    var timePeriod5 = '02:00';
    var timePeriod6 = '02:30';
    var timePeriod7 = '03:00';
    var timePeriod8 = '03:30';
    var timePeriod9 = '04:00';
    var timePeriod10 = '04:30';
    var timePeriod11 = '05:00';
    var timePeriod12 = '05:30';
    var timePeriod13 = '06:00';
    var timePeriod14 = '06:30';
    var timePeriod15 = '07:00';
    var timePeriod16 = '07:30';
    var timePeriod17 = '08:00';
    var timePeriod18 = '08:30';
    var timePeriod19 = '09:00';
    var timePeriod20 = '09:30';
    var timePeriod21 = '10:00';
    var timePeriod22 = '10:30';
    var timePeriod23 = '11:00';
    var timePeriod24 = '11:30';
    var timePeriod25 = '12:00';
    var timePeriod26 = '12:30';
    var timePeriod27 = '13:00';
    var timePeriod28 = '13:30';
    var timePeriod29 = '14:00';
    var timePeriod30 = '14:30';
    var timePeriod31 = '15:00';
    var timePeriod32 = '15:30';
    var timePeriod33 = '16:00';
    var timePeriod34 = '16:30';
    var timePeriod35 = '17:00';
    var timePeriod36 = '17:30';
    var timePeriod37 = '18:00';
    var timePeriod38 = '18:30';
    var timePeriod39 = '19:00';
    var timePeriod40 = '19:30';
    var timePeriod41 = '20:00';
    var timePeriod42 = '20:30';
    var timePeriod43 = '21:00';
    var timePeriod44 = '21:30';
    var timePeriod45 = '22:00';
    var timePeriod46 = '22:30';
    var timePeriod47 = '23:00';
    var timePeriod48 = '23:30';
    const url = 'https://api.carbonintensity.org.uk/intensity/date/' + thisDateString + '/';

    useEffect(() => {
        fetchIntensity(url + requestPeriod1).then(setIntensity1).catch(console.error);
        fetchIntensity(url + requestPeriod2).then(setIntensity2).catch(console.error);
        fetchIntensity(url + requestPeriod3).then(setIntensity3).catch(console.error);
        fetchIntensity(url + requestPeriod4).then(setIntensity4).catch(console.error);
        fetchIntensity(url + requestPeriod5).then(setIntensity5).catch(console.error);
        fetchIntensity(url + requestPeriod6).then(setIntensity6).catch(console.error);
        fetchIntensity(url + requestPeriod7).then(setIntensity7).catch (console.error);
        fetchIntensity(url + requestPeriod8).then(setIntensity8).catch (console.error);
        fetchIntensity(url + requestPeriod9).then(setIntensity9).catch (console.error);
        fetchIntensity(url + requestPeriod10).then(setIntensity10).catch (console.error);
        fetchIntensity(url + requestPeriod11).then(setIntensity11).catch (console.error);
        fetchIntensity(url + requestPeriod12).then(setIntensity12).catch (console.error);
        fetchIntensity(url + requestPeriod13).then(setIntensity13).catch (console.error);
        fetchIntensity(url + requestPeriod14).then(setIntensity14).catch (console.error);
        fetchIntensity(url + requestPeriod15).then(setIntensity15).catch (console.error);
        fetchIntensity(url + requestPeriod16).then(setIntensity16).catch (console.error);
        fetchIntensity(url + requestPeriod17).then(setIntensity17).catch (console.error);
        fetchIntensity(url + requestPeriod18).then(setIntensity18).catch (console.error);
        fetchIntensity(url + requestPeriod19).then(setIntensity19).catch (console.error);
        fetchIntensity(url + requestPeriod20).then(setIntensity20).catch (console.error);
        fetchIntensity(url + requestPeriod21).then(setIntensity21).catch (console.error);
        fetchIntensity(url + requestPeriod22).then(setIntensity22).catch (console.error);
        fetchIntensity(url + requestPeriod23).then(setIntensity23).catch (console.error);
        fetchIntensity(url + requestPeriod24).then(setIntensity24).catch (console.error);
        fetchIntensity(url + requestPeriod25).then(setIntensity25).catch (console.error);
        fetchIntensity(url + requestPeriod26).then(setIntensity26).catch (console.error);
        fetchIntensity(url + requestPeriod27).then(setIntensity27).catch (console.error);
        fetchIntensity(url + requestPeriod28).then(setIntensity28).catch (console.error);
        fetchIntensity(url + requestPeriod29).then(setIntensity29).catch (console.error);
        fetchIntensity(url + requestPeriod30).then(setIntensity30).catch (console.error);
        fetchIntensity(url + requestPeriod31).then(setIntensity31).catch (console.error);
        fetchIntensity(url + requestPeriod32).then(setIntensity32).catch (console.error);
        fetchIntensity(url + requestPeriod33).then(setIntensity33).catch (console.error);
        fetchIntensity(url + requestPeriod34).then(setIntensity34).catch (console.error);
        fetchIntensity(url + requestPeriod35).then(setIntensity35).catch (console.error);
        fetchIntensity(url + requestPeriod36).then(setIntensity36).catch (console.error);
        fetchIntensity(url + requestPeriod37).then(setIntensity37).catch (console.error);
        fetchIntensity(url + requestPeriod38).then(setIntensity38).catch (console.error);
        fetchIntensity(url + requestPeriod39).then(setIntensity39).catch (console.error);
        fetchIntensity(url + requestPeriod40).then(setIntensity40).catch (console.error);
        fetchIntensity(url + requestPeriod41).then(setIntensity41).catch (console.error);
        fetchIntensity(url + requestPeriod42).then(setIntensity42).catch (console.error);
        fetchIntensity(url + requestPeriod43).then(setIntensity43).catch (console.error);
        fetchIntensity(url + requestPeriod44).then(setIntensity44).catch (console.error);
        fetchIntensity(url + requestPeriod45).then(setIntensity45).catch (console.error);
        fetchIntensity(url + requestPeriod46).then(setIntensity46).catch (console.error);
        fetchIntensity(url + requestPeriod47).then(setIntensity47).catch (console.error);
        fetchIntensity(url + requestPeriod48).then(setIntensity48).catch (console.error);
    }, []);

    useEffect(() => {
        let yValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if(intensity1.data !== undefined && intensity2.data !== undefined && intensity3.data !== undefined && intensity4.data !== undefined && intensity5.data !== undefined && intensity6.data !== undefined && intensity7.data !== undefined && intensity8.data !== undefined && intensity9.data !== undefined && intensity10.data !== undefined && intensity11.data !== undefined && intensity12.data !== undefined && intensity13.data !== undefined && intensity14.data !== undefined && intensity15.data !== undefined && intensity16.data !== undefined && intensity17.data !== undefined && intensity18.data !== undefined && intensity19.data !== undefined && intensity20.data !== undefined && intensity21.data !== undefined && intensity22.data !== undefined && intensity23.data !== undefined && intensity24.data !== undefined && intensity25.data !== undefined && intensity26.data !== undefined && intensity27.data !== undefined && intensity28.data !== undefined && intensity29.data !== undefined && intensity30.data !== undefined && intensity31.data !== undefined && intensity32.data !== undefined && intensity33.data !== undefined && intensity34.data !== undefined && intensity35.data !== undefined && intensity36.data !== undefined && intensity37.data !== undefined && intensity38.data !== undefined && intensity39.data !== undefined && intensity40.data !== undefined && intensity41.data !== undefined && intensity42.data !== undefined && intensity43.data !== undefined && intensity44.data !== undefined && intensity45.data !== undefined && intensity46.data !== undefined && intensity47.data !== undefined && intensity48.data !== undefined) {
            yValues = [intensity1.data[0].intensity.forecast, intensity2.data[0].intensity.forecast, intensity3.data[0].intensity.forecast, intensity4.data[0].intensity.forecast, intensity5.data[0].intensity.forecast, intensity6.data[0].intensity.forecast, intensity7.data[0].intensity.forecast, intensity8.data[0].intensity.forecast, intensity9.data[0].intensity.forecast, intensity10.data[0].intensity.forecast, intensity11.data[0].intensity.forecast, intensity12.data[0].intensity.forecast, intensity13.data[0].intensity.forecast, intensity14.data[0].intensity.forecast, intensity15.data[0].intensity.forecast, intensity16.data[0].intensity.forecast, intensity17.data[0].intensity.forecast, intensity18.data[0].intensity.forecast, intensity19.data[0].intensity.forecast, intensity20.data[0].intensity.forecast, intensity21.data[0].intensity.forecast, intensity22.data[0].intensity.forecast, intensity23.data[0].intensity.forecast, intensity24.data[0].intensity.forecast, intensity25.data[0].intensity.forecast, intensity26.data[0].intensity.forecast, intensity27.data[0].intensity.forecast, intensity28.data[0].intensity.forecast, intensity29.data[0].intensity.forecast, intensity30.data[0].intensity.forecast, intensity31.data[0].intensity.forecast, intensity32.data[0].intensity.forecast, intensity33.data[0].intensity.forecast, intensity34.data[0].intensity.forecast, intensity35.data[0].intensity.forecast, intensity36.data[0].intensity.forecast, intensity37.data[0].intensity.forecast, intensity38.data[0].intensity.forecast, intensity39.data[0].intensity.forecast, intensity40.data[0].intensity.forecast, intensity41.data[0].intensity.forecast, intensity42.data[0].intensity.forecast, intensity43.data[0].intensity.forecast, intensity44.data[0].intensity.forecast, intensity45.data[0].intensity.forecast, intensity46.data[0].intensity.forecast, intensity47.data[0].intensity.forecast, intensity48.data[0].intensity.forecast];
        }
        const xValues = [timePeriod1, timePeriod2, timePeriod3, timePeriod4, timePeriod5, timePeriod6, timePeriod7, timePeriod8, timePeriod9, timePeriod10, timePeriod11, timePeriod12, timePeriod13, timePeriod14, timePeriod15, timePeriod16, timePeriod17, timePeriod18, timePeriod19, timePeriod20, timePeriod21, timePeriod22, timePeriod23, timePeriod24, timePeriod25, timePeriod26, timePeriod27, timePeriod28, timePeriod29, timePeriod30, timePeriod31, timePeriod32, timePeriod33, timePeriod34, timePeriod35, timePeriod36, timePeriod37, timePeriod38, timePeriod39, timePeriod40, timePeriod41, timePeriod42, timePeriod43, timePeriod44, timePeriod45, timePeriod46, timePeriod47, timePeriod48];

        setChartData({
            labels: xValues,
            datasets: [{
                backgroundColor:"rgba(0,128,0,1.0)",
                borderColor: "rgba(0,128,0,0.1)",
                data: yValues
            }]
        });
    }, [intensity1, intensity2, intensity3, intensity4, intensity5, intensity6, intensity7, intensity8, intensity9, intensity10, intensity11, intensity12, intensity13, intensity14, intensity15, intensity16, intensity17, intensity18, intensity19, intensity20, intensity21, intensity22, intensity23, intensity24, intensity25, intensity26, intensity27, intensity28, intensity29, intensity30, intensity31, intensity32, intensity33, intensity34, intensity35, intensity36, intensity37, intensity38, intensity39, intensity40, intensity41, intensity42, intensity43, intensity44, intensity45, intensity46, intensity47, intensity48]);

    useEffect(() => {
        let xValues = chartData.labels;
        let yValues = chartData.datasets[0].data;
        let energyNumber = Number(energy);

        let yValues2 = [];
        yValues.forEach(changeIntoBlueWhales);

        function changeIntoBlueWhales(ci) {
            let gco2 = ci * energyNumber;
            let kgco2 = gco2 / 1000.00;

            // how heavy is a blue whale: https://uk.whales.org/whales-dolphins/facts-about-blue-whales/
            // "Female blue whales weigh more (190,000kg) than males (150,000kg)."
            // let's use 170,000kg
            let blueWhales = kgco2 / 170000.00;
            yValues2.push(blueWhales);
        }

        setChartDataBlueWhale({
            labels: xValues,
            datasets: [{
                backgroundColor:"rgba(39, 135, 245,1.0)",
                borderColor: "rgba(39, 135, 245,0.3)",
                data: yValues2
            }]
        });
    }, [chartData, energy]);

  return (
    <>
        <div>
            <div className="topleftimage">
                <Link to="/">
                    <img src="../public/home_logo_1.png" alt="Home Page Image" title="Home Page" width="400" height="150"/>
                </Link>
            </div>
            <div className="bodyContent">
                <div className="line-chart">
                    <LineChart chartData={chartData} chartTitle={'Carbon Intensities (Forecast - gCO2/kWh)'} chartHeader={'Use Enerny When It\'s Cleaner'} />
                </div>
                <div className="intensities">
                    {
                        intensity1.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod1}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity2.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod2}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity3.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod3}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity4.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod4}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity5.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod5}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity6.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod6}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity7.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod7}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity8.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod8}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity9.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod9}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity10.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod10}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity11.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod11}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity12.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod12}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity13.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod13}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity14.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod14}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity15.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod15}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity16.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod16}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity17.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod17}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity18.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod18}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity19.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod19}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity20.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod20}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity21.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod21}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity22.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod22}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity23.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod23}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity24.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod24}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity25.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod25}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity26.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod26}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity27.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod27}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity28.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod28}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity29.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod29}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity30.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod30}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity31.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod31}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity32.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod32}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity33.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod33}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity34.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod34}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity35.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod35}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity36.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod36}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity37.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod37}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity38.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod38}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity39.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod39}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity40.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod40}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity41.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod41}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity42.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod42}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity43.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod43}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity44.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod44}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity45.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod45}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity46.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod46}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity47.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod47}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                    {
                        intensity48.data?.map((d, index) => {
                            return (
                                <li key={index}>{thisDateString}---{timePeriod48}: forecast: {d.intensity.forecast} | actual: {d.intensity.actual} | index: {d.intensity.index}</li>
                            )
                        })
                    }
                </div>
                <div>
                    <p className="separate-line-1">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                </div>
                <div className="energy-input">
                    <label>
                        Energy used (kWh):
                        <input
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={energy}
                            onChange={e => setEnergy(e.target.value)}
                            type="number"
                        />
                    </label>
                </div>
                <div className="line-chart">
                    {
                        // chartData !== undefined && <LineChart chartData={chartData} />
                    }
                    <LineChart chartData={chartDataBlueWhale} chartTitle={'How many blue whales does the weight of your CO2 equal?'} chartHeader={'Blue Whales Are Crying Under The Sea'}/>
                </div>
            </div>
        </div>

    </>
  )
}

export default App
