import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './SCI.css'
import LineChart from "./components/LineChart.jsx";

const SCI = () => {
    document.body.classList.add('backgroundHome');

    const [operationalCarbon, setOperationalCarbon] = useState([0, 0, 0, 0, 0]);
    const [timePoints, setTimePoints] = useState(["00:00", "00:30", "01:00", "01:30", "02:00"]);
    const [timeInterval, setTimeInterval] = useState(0.5);

    const [devices, setDevices] = useState([]);
    const [carbonIntensities, setCarbonIntensities] = useState({});
    const [hardwareUsages, setHardwareUsages] = useState({});
    const [functionalUnits, setFunctionalUnits] = useState({});
    const [PUEs, setPUEs] = useState({});


    const [chartData, setChartData] = useState({
        labels: ["00:00", "00:30", "01:00", "01:30", "02:00"],
        datasets: [{
            backgroundColor:"rgba(255, 170, 128,1.0)",
            borderColor: "rgba(255, 170, 128,0.1)",
            data: [0, 0, 0, 0, 0]
        }]
    });

    useEffect(() => {
        let yValues = operationalCarbon;
        let xValues =  timePoints;

        setChartData({
            labels: xValues,
            datasets: [{
                backgroundColor:"rgba(255, 170, 128,1.0)",
                borderColor: "rgba(255, 170, 128,0.1)",
                data: yValues
            }]
        });
    }, [operationalCarbon, timePoints]);

    useEffect(() => {
        if (!isEmptyObject(carbonIntensities) && !isEmptyObject(hardwareUsages) && !isEmptyObject(functionalUnits) && !isEmptyObject(PUEs) && timePoints.length !== 0 && devices.length !== 0) {
            // console.log("I am in the loop right now!!!");
            let targets = [];
            for (let i = 0; i < timePoints.length; i++) {
                let target = 0;
                for (let j = 0; j < devices.length; j++) {
                    // to calculate O
                    let currentO = 0;
                    currentO = devices[j]["power_variable"] * hardwareUsages[timePoints[i]][devices[j]["device_id"]];
                    currentO = currentO + devices[j]["power_idle"];
                    currentO = currentO * carbonIntensities[timePoints[i]][devices[j]["location"]];
                    currentO = currentO * timeInterval;
                    currentO = currentO * PUEs[timePoints[i]];
                    // console.log(devices[j]["power_variable"]);
                    // console.log(hardwareUsages[timePoints[i]][devices[j]["device_id"]]);
                    //console.log(currentO);

                    // to calculate M
                    let currentM = devices[j]["embodied_carbon"];
                    currentM = currentM * timeInterval;
                    currentM = currentM / devices[j]["lifetime"];
                    currentM = currentM * hardwareUsages[timePoints[i]][devices[j]["device_id"]];

                    target = target + currentO;
                    target = target + currentM;
                    // console.log(current);
                    // console.log((devices[j]).location);
                }
                target = target / functionalUnits[timePoints[i]];
                // console.log(timePoints[i]);
                targets.push(target);
            }
            // console.log(targets);
            setOperationalCarbon(targets);
        }
    }, [timePoints, devices, carbonIntensities, hardwareUsages, functionalUnits, timeInterval, PUEs]);

    let fileReaderDevice;
    let fileReaderTime;

    const handleFileProcessDevice = () => {
        const content = fileReaderDevice.result;
        // console.log(typeof content);
        // console.log(content);

        // let inputLines = content.split(/\r?\n/);
        // console.log(typeof inputLines);
        // console.log(inputLines);

        // let's avoid save data, for the size of it can be huge
        // setInputData(inputLines);
        let devicesCurrent = [];
        let inputJson = JSON.parse(content);
        for (let i = 0; i < inputJson["devices"].length; i++) {
            let currentDevice = inputJson["devices"][0];
            devicesCurrent.push(currentDevice);
        }

        // console.log(devicesCurrent);
        setDevices(devicesCurrent);
    };

    const handleFileSelectDevice = (file) => {
        fileReaderDevice = new FileReader();
        fileReaderDevice.onloadend = handleFileProcessDevice;
        fileReaderDevice.readAsText(file);
    };

    const handleFileProcessTime = () => {
        const content = fileReaderTime.result;
        // console.log(typeof content);
        // console.log(content);

        // let inputLines = content.split(/\r?\n/);
        // console.log(typeof inputLines);
        // console.log(inputLines);

        // let's avoid save data, for the size of it can be huge
        // setInputData(inputLines);

        let timePointsCurrent = [];
        let carbonIntensitiesCurrent = {};
        let hardwareUsagesCurrent = {};
        let functionalUnitsCurrent = {};
        let PUEsCurrent = {};
        let inputJson = JSON.parse(content);
        for (let i = 0; i < inputJson["data_items"].length; i++) {
            timePointsCurrent.push(inputJson["data_items"][i]["time"]);
            carbonIntensitiesCurrent = Object.assign({}, carbonIntensitiesCurrent, inputJson["data_items"][i]["carbon_intensities"]);
            hardwareUsagesCurrent = Object.assign({}, hardwareUsagesCurrent, inputJson["data_items"][i]["hardware_usages"]);
            PUEsCurrent[inputJson["data_items"][i]["time"]] = inputJson["data_items"][i]["pue"];
            functionalUnitsCurrent[inputJson["data_items"][i]["time"]] = inputJson["data_items"][i]["functional_units"];
        }

        // console.log(timePointsCurrent);
        // console.log(carbonIntensitiesCurrent);

        setTimePoints(timePointsCurrent);
        setCarbonIntensities(carbonIntensitiesCurrent);
        setHardwareUsages(hardwareUsagesCurrent);
        setFunctionalUnits(functionalUnitsCurrent);
        setPUEs(PUEsCurrent);
    };

    const handleFileSelectTime = (file) => {
        fileReaderTime = new FileReader();
        fileReaderTime.onloadend = handleFileProcessTime;
        fileReaderTime.readAsText(file);
    };

    function isEmptyObject(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    return (
        <>
            <div>
                <div className="topleftimage">
                    <Link to="/">
                        <img src="../public/home_logo_2.png" alt="Home Page Image" title="Home Page" width="400" height="250"/>
                    </Link>
                </div>
                <div className="bodyContent">
                    <div>
                        <LineChart chartData={chartData} chartTitle={'Operational Carbon'} chartHeader={'How much carbon have you used?'} />
                    </div>
                    <h2>Always clean your data before uploading!</h2>
                    <h3>Please upload the txt file in JSON containing device information.</h3>
                    <input type="file"
                        id="file"
                        accept=".txt"
                        onChange={(e) => handleFileSelectDevice(e.target.files[0])}/>
                    <div>
                        <p>--------------------------------------------------------------------------------------------------------------------------</p>
                    </div>
                    <h3>Please upload the txt file in JSON containing time-related information.</h3>
                    <input type="file"
                           id="file"
                           accept=".txt"
                           onChange={(e) => handleFileSelectTime(e.target.files[0])}/>
                </div>
            </div>
        </>
    );
};

export default SCI;