import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './SCI.css'
// import DragAndDropUpload from "./DragAndDropUpload";
import LineChart from "./components/LineChart.jsx";
import raw from './data/hhh.txt';

const SCI = () => {
    document.body.classList.add('backgroundHome');

    const [operationalCarbon, setOperationalCarbon] = useState([1, 2, 10, 4, 5]);
    const [timePoints, setTimePoints] = useState(["2025-09-01-00:00", "2025-09-01-00:30", "2025-09-01-01:00", "2025-09-01-01:30", "2025-09-01-02:00"]);
    const [timeInterval, setTimeInterval] = useState(0.5);

    const [devices, setDevices] = useState([]);
    const [carbonIntensities, setCarbonIntensities] = useState({});
    const [hardwareUsages, setHardwareUsages] = useState({});
    const [functionalUnits, setFunctionalUnits] = useState({});
    const [PUEs, setPUEs] = useState({});


    const [chartData, setChartData] = useState({
        labels: ["2025-09-01-00:00", "2025-09-01-00:30", "2025-09-01-01:00", "2025-09-01-01:30", "2025-09-01-02:00"],
        datasets: [{
            backgroundColor:"rgba(255, 170, 128,1.0)",
            borderColor: "rgba(255, 170, 128,0.1)",
            data: [1, 2, 10, 4, 5]
        }]
    });

    useEffect(() => {
        let yValues = operationalCarbon;
        const xValues =  timePoints;

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
        let current = [];

        let device1 = {
            device_id: "0000",
            type: "type1",
            location: "city1",
            lifetime: 8987,
            power: 400,
            idlePower: 50,
            embodied: 2000000
        };

        let device2 = {
            device_id: "0001",
            type: "type1",
            location: "city2",
            lifetime: 777777,
            power: 800,
            idlePower: 40,
            embodied: 2000000
        };

        let device3 = {
            device_id: "0002",
            type: "type2",
            location: "city2",
            lifetime: 9999999,
            power: 600,
            idlePower: 50,
            embodied: 2000000
        };

        current.push(device1);
        current.push(device2);
        current.push(device3);
        setDevices(current);
    }, []);

    //console.log("devices");
    //console.log(devices);

    useEffect(() => {
        let current = {};

        current["2025-09-01-00:00"] = {};
        current["2025-09-01-00:30"] = {};
        current["2025-09-01-01:00"] = {};
        current["2025-09-01-01:30"] = {};
        current["2025-09-01-02:00"] = {};

        current["2025-09-01-00:00"]["city1"] = 67
        current["2025-09-01-00:30"]["city1"] = 17
        current["2025-09-01-01:00"]["city1"] = 167
        current["2025-09-01-01:30"]["city1"] = 89
        current["2025-09-01-02:00"]["city1"] = 29

        current["2025-09-01-00:00"]["city2"] = 54
        current["2025-09-01-00:30"]["city2"] = 23
        current["2025-09-01-01:00"]["city2"] = 89
        current["2025-09-01-01:30"]["city2"] = 67.7
        current["2025-09-01-02:00"]["city2"] = 19

        setCarbonIntensities(current);
    }, []);

    //console.log("carbonIntensities");
    //console.log(carbonIntensities);

    useEffect(() => {
        let current = {};

        current["2025-09-01-00:00"] = {};
        current["2025-09-01-00:30"] = {};
        current["2025-09-01-01:00"] = {};
        current["2025-09-01-01:30"] = {};
        current["2025-09-01-02:00"] = {};

        current["2025-09-01-00:00"]["0000"] = 0.85;
        current["2025-09-01-00:30"]["0000"] = 0.81;
        current["2025-09-01-01:00"]["0000"] = 0.8;
        current["2025-09-01-01:30"]["0000"] = 0.9;
        current["2025-09-01-02:00"]["0000"] = 0.67;

        current["2025-09-01-00:00"]["0001"] = 0.55;
        current["2025-09-01-00:30"]["0001"] = 0.85;
        current["2025-09-01-01:00"]["0001"] = 0.85;
        current["2025-09-01-01:30"]["0001"] = 0.6;
        current["2025-09-01-02:00"]["0001"] = 0.85;

        current["2025-09-01-00:00"]["0002"] = 0.9;
        current["2025-09-01-00:30"]["0002"] = 0.12;
        current["2025-09-01-01:00"]["0002"] = 0.85;
        current["2025-09-01-01:30"]["0002"] = 0.34;
        current["2025-09-01-02:00"]["0002"] = 0.67;

        setHardwareUsages(current);
    }, []);

    //console.log("hardwareUsages");
    //console.log(hardwareUsages);

    useEffect(() => {
        let current = {};

        current["2025-09-01-00:00"] = 1167;
        current["2025-09-01-00:30"] = 1755;
        current["2025-09-01-01:00"] = 16755;
        current["2025-09-01-01:30"] = 89;
        current["2025-09-01-02:00"] = 25555;

        setFunctionalUnits(current);
    }, []);

    //console.log("functionalUnits");
    //console.log(functionalUnits);

    useEffect(() => {
        let current = {};
        current["2025-09-01-00:00"] = 1.6;
        current["2025-09-01-00:30"] = 1.7;
        current["2025-09-01-01:00"] = 1.67;
        current["2025-09-01-01:30"] = 1.09;
        current["2025-09-01-02:00"] = 1.29;

        setPUEs(current);
    }, []);

    //console.log("PUEs");
    //console.log(PUEs);

    useEffect(() => {
        // console.log("I am in the loop right now!!!");
        let targets = [];
        for (let i = 0; i < timePoints.length; i++) {
            let target = 0;
            for (let j = 0; j < devices.length; j++) {
                // to calculate O
                let currentO = 0;
                currentO = devices[j].power * hardwareUsages[timePoints[i]][devices[j].device_id];
                currentO = currentO + devices[j].idlePower;
                currentO = currentO * carbonIntensities[timePoints[i]][devices[j].location];
                currentO = currentO * timeInterval;
                currentO = currentO * PUEs[timePoints[i]];

                // to calculate M
                let currentM = devices[j].embodied;
                currentM = currentM * timeInterval;
                currentM = currentM / devices[j].lifetime;
                currentM = currentM * hardwareUsages[timePoints[i]][devices[j].device_id];

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
    }, [timePoints, devices, carbonIntensities, hardwareUsages, timeInterval, PUEs]);

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                console.log('text decoded:', text);
            });
    }, []);

    return (
        <>
            <div>
                <div className="titletext">
                    <h2>This is the new SCI page</h2>
                </div>
                <div className="topleftimage">
                    <Link to="/">
                        <img src="../public/home_logo_1.png" alt="Home Page Image" title="Home Page" width="400" height="150"/>
                    </Link>
                </div>
                {//<DragAndDropUpload onUpload={uploadToServer} />
                    }
                    <div className="bodyContent">
                        <div className="line-chart">
                            <LineChart chartData={chartData} chartTitle={'Operational Carbon'} chartHeader={'How much carbon have you used?'} />
                        </div>
                    </div>

            </div>
        </>


    );
};

export default SCI;