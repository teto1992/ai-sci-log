import React, {useEffect, useState} from "react";
import "./Footprint.css";
import {Link} from "react-router-dom";

const Footprint = () => {
    document.body.classList.add('backgroundFootprint');

    const [embodiedCarbon, setEmbodiedCarbon] = useState('0');
    const [embodiedUnits, setEmbodiedUnits] = useState('0');
    const [embodiedFootprint, setEmbodiedFootprint] = useState(0);
    const [embodiedFootprintBlueWhale, setEmbodiedFootprintBlueWhale] = useState(0);

    const [powerW, setPowerW] = useState('0');
    const [powerUnits, setPowerUnits] = useState('0');
    const [powerPUE, setPowerPUE] = useState('0');
    const [powerHours, setPowerHours] = useState('0');
    const [powerUsed, setPowerUsed] = useState(0);

    const [powerWDeploy, setPowerWDeploy] = useState('0');
    const [powerUnitsDeploy, setPowerUnitsDeploy] = useState('0');
    const [powerPUEDeploy, setPowerPUEDeploy] = useState('0');
    const [powerDaysDeploy, setPowerDaysDeploy] = useState('0');
    const [powerUsedDeploy, setPowerUsedDeploy] = useState(0);

    const [alphaTrain, setAlphaTrain] = useState('0');
    const [tauTrain, setTauTrain] = useState('100');
    const [footprintTrain, setFootprintTrain] = useState(0);
    const [footprintTrainBlueWhale, setFootprintTrainBlueWhale] = useState(0);

    const [alphaDeploy, setAlphaDeploy] = useState('0');
    const [tauDeploy, setTauDeploy] = useState('100');
    const [footprintDeploy, setFootprintDeploy] = useState(0);
    const [footprintDeployBlueWhale, setFootprintDeployBlueWhale] = useState(0);

    const [powerUsedAll, setPowerUsedAll] = useState(0);
    const [powerUsedPercentageTrain, setPowerUsedPercentageTrain] = useState(0);
    const [powerUsedPercentageDeploy, setPowerUsedPercentageDeploy] = useState(0);

    const [footprintAll, setFootprintAll] = useState(0);
    const [footprintAllBlueWhale, setFootprintAllBlueWhale] = useState(0);
    const [footprintPercentageEmbodied, setFootprintPercentageEmbodied] = useState(0);
    const [footprintPercentageTrain, setFootprintPercentageTrain] = useState(0);
    const [footprintPercentageDeploy, setFootprintPercentageDeploy] = useState(0);

    function handleSubmitEmbodied(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        setEmbodiedCarbon(formJson.embodiedCarbon);
        setEmbodiedUnits(formJson.embodiedUnits);
        // console.log(formJson);
    }

    function handleSubmitPower(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        setPowerW(formJson.powerW);
        setPowerUnits(formJson.powerUnits);
        setPowerPUE(formJson.powerPUE);
        setPowerHours(formJson.powerHours);
    }

    function handleSubmitPowerDeploy(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        setPowerWDeploy(formJson.powerWDeploy);
        setPowerUnitsDeploy(formJson.powerUnitsDeploy);
        setPowerPUEDeploy(formJson.powerPUEDeploy);
        setPowerDaysDeploy(formJson.powerDaysDeploy);
    }

    function handleSubmitFootprintTrain(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        setAlphaTrain(formJson.alphaTrain);
        setTauTrain(formJson.tauTrain);
    }

    function handleSubmitFootprintDeploy(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        setAlphaDeploy(formJson.alphaDeploy);
        setTauDeploy(formJson.tauDeploy);
    }

    useEffect(() => {
        let embodiedCarbonNumber = Number(embodiedCarbon);
        let embodiedUnitsNumber = Number(embodiedUnits);

        let current = embodiedCarbonNumber * embodiedUnitsNumber;
        current = current / 1000.00;

        setEmbodiedFootprint(embodiedFootprint + current);

        let blueWhales = current / 170.00;
        setEmbodiedFootprintBlueWhale(embodiedFootprintBlueWhale + blueWhales);
    }, [embodiedCarbon, embodiedUnits]);

    useEffect(() => {
        let powerWNumber = Number(powerW);
        let powerKWNumber = powerWNumber / 1000.00;
        let powerUnitsNumber = Number(powerUnits);
        let powerPUENumber = Number(powerPUE);
        let powerHoursNumber = Number(powerHours);


        let current = powerKWNumber * powerUnitsNumber;
        powerPUENumber = powerPUENumber / 100.00;
        current = current * powerPUENumber;
        current = current * powerHoursNumber;
        current = current / 1000.00;

        setPowerUsed(powerUsed + current);
    }, [powerW, powerUnits, powerPUE, powerHours]);

    useEffect(() => {
        let powerWNumber = Number(powerWDeploy);
        let powerKWNumber = powerWNumber / 1000.00;
        let powerUnitsNumber = Number(powerUnitsDeploy);
        let powerPUENumber = Number(powerPUEDeploy);
        let powerHoursNumber = Number(powerDaysDeploy);
        powerHoursNumber = powerHoursNumber * 24.0;


        let current = powerKWNumber * powerUnitsNumber;
        powerPUENumber = powerPUENumber / 100.00;
        current = current * powerPUENumber;
        current = current * powerHoursNumber;
        current = current / 1000.00;

        setPowerUsedDeploy(powerUsedDeploy + current);
    }, [powerWDeploy, powerUnitsDeploy, powerPUEDeploy, powerDaysDeploy]);

    useEffect(() => {
        let alphaTrainNumber = Number(alphaTrain);
        alphaTrainNumber = alphaTrainNumber / 1000.00;
        let tauTrainNumber = Number(tauTrain);
        tauTrainNumber = tauTrainNumber / 100.00;

        let current = powerUsed * 1000.00;
        current = current / tauTrainNumber;
        current = current * alphaTrainNumber;
        current = current / 1000;

        setFootprintTrain(footprintTrain + current);

        let blueWhales = current / 170.00;
        setFootprintTrainBlueWhale(footprintTrainBlueWhale + blueWhales);
    }, [alphaTrain, tauTrain, powerUsed]);

    useEffect(() => {
        let alphaDeployNumber = Number(alphaDeploy);
        alphaDeployNumber = alphaDeployNumber / 1000.00;
        let tauDeployNumber = Number(tauDeploy);
        tauDeployNumber = tauDeployNumber / 100.00;

        let current = powerUsedDeploy * 1000.00;
        current = current / tauDeployNumber;
        current = current * alphaDeployNumber;
        current = current / 1000;

        setFootprintDeploy(footprintDeploy + current);

        let blueWhales = current / 170.00;
        setFootprintDeployBlueWhale(footprintDeployBlueWhale + blueWhales);
    }, [alphaDeploy, tauDeploy, powerUsedDeploy]);

    useEffect(() => {
        let current = powerUsed + powerUsedDeploy;
        setPowerUsedAll(current);

        if (current == 0) {
            current = 1;
        }

        setPowerUsedPercentageTrain(powerUsed / current * 100.00);
        setPowerUsedPercentageDeploy(powerUsedDeploy / current * 100.00);
    }, [powerUsed, powerUsedDeploy]);

    useEffect(() => {
        let current = embodiedFootprint + footprintTrain + footprintDeploy;
        setFootprintAll(current);

        let blueWhales = current / 170.00;
        setFootprintAllBlueWhale(blueWhales);

        if (current == 0) {
            current = 1;
        }

        setFootprintPercentageEmbodied(embodiedFootprint / current * 100.00);
        setFootprintPercentageTrain(footprintTrain / current * 100.00);
        setFootprintPercentageDeploy(footprintDeploy / current * 100.00);
    }, [embodiedFootprint, footprintTrain, footprintDeploy]);

    const resetOutput = () => {
        setEmbodiedCarbon('0');
        setEmbodiedUnits('0');
        setPowerW('0');
        setPowerUnits('0');
        setPowerPUE('0');
        setPowerHours('0');
        setPowerWDeploy('0');
        setPowerUnitsDeploy('0');
        setPowerPUEDeploy('0');
        setPowerDaysDeploy('0');
        setAlphaTrain('0');
        setTauTrain('100');
        setAlphaDeploy('0');
        setTauDeploy('100');

        setEmbodiedFootprint(0);
        setPowerUsed(0);
        setPowerUsedDeploy(0);
        setFootprintTrain(0);
        setFootprintDeploy(0);
        setPowerUsedAll(0);
        setPowerUsedPercentageTrain(0);
        setPowerUsedPercentageDeploy(0);
        setFootprintAll(0);
        setFootprintPercentageEmbodied(0);
        setFootprintPercentageTrain(0);
        setFootprintPercentageDeploy(0);
    }

    return (
        <>
            <div className="topleftimage">
                <Link to="/">
                    <img src="../public/home_logo_1.png" alt="Home Page Image" title="Home Page" width="400" height="150"/>
                </Link>
            </div>
            <div className="bodyContent">
                <div>
                    <form method="post" onSubmit={handleSubmitEmbodied}>
                        <div className="labels">
                            <label>
                                Embodied Carbon (kgCO2-eq/unit): <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="embodiedCarbon" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                Number of units: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="embodiedUnits" defaultValue="0" />
                            </label>
                        </div>
                        <br /><br />
                        <button type="reset">Reset</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit">Submit</button>
                        <br />
                    </form>
                    <h3>Carbon dioxide footprint for the production of the hardware (tCO2eq): {embodiedFootprint} </h3>
                    <h3>Carbon dioxide footprint for the production of the hardware (blueWhales): {embodiedFootprintBlueWhale} </h3>
                    <hr></hr>
                </div>
                <div>
                    <form method="post" onSubmit={handleSubmitPower}>
                        <div className="labels">
                            <label>
                                Power (W) - training phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerW" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                Number of units - training phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerUnits" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                PUE (power usage effectiveness, %) - training phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerPUE" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                Used time (hours) - training phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerHours" defaultValue="0" />
                            </label>
                        </div>
                        <br /><br />
                        <button type="reset">Reset</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit">Submit</button>
                        <br />
                    </form>
                    <h3>Energy/power consumption (MWh) - training phase: {powerUsed} </h3>
                    <hr></hr>
                </div>
                <div>
                    <form method="post" onSubmit={handleSubmitPowerDeploy}>
                        <div className="labels">
                            <label>
                                Power (W) - deployment phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerWDeploy" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                Number of units - deployment phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerUnitsDeploy" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                PUE (power usage effectiveness, %) - deployment phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerPUEDeploy" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                Used time (days) - deployment phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="powerDaysDeploy" defaultValue="0" />
                            </label>
                        </div>
                        <br /><br />
                        <button type="reset">Reset</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit">Submit</button>
                        <br />
                    </form>
                    <h3>Energy/power consumption (MWh) - deployment phase: {powerUsedDeploy} </h3>
                    <hr></hr>
                </div>
                <div>
                    <form method="post" onSubmit={handleSubmitFootprintTrain}>
                        <div className="labels">
                            <label>
                                &alpha; (gCO2-eq/kWh) - training phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="alphaTrain" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                &tau; (%) - training phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="tauTrain" defaultValue="100" />
                            </label>
                        </div>
                        <br /><br />
                        <button type="reset">Reset</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit">Submit</button>
                        <br />
                    </form>
                    <h3>Carbon dioxide footprint (tCO2eq) - training phase: {footprintTrain} </h3>
                    <h3>Carbon dioxide footprint (blueWhales) - training phase: {footprintTrainBlueWhale} </h3>
                    <hr></hr>
                </div>
                <div>
                    <form method="post" onSubmit={handleSubmitFootprintDeploy}>
                        <div className="labels">
                            <label>
                                &alpha; (gCO2-eq/kWh) - deployment phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="alphaDeploy" defaultValue="0" />
                            </label>
                            <br /><br />
                            <label>
                                &tau; (%) - deployment phase: <input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                name="tauDeploy" defaultValue="100" />
                            </label>
                        </div>
                        <br /><br />
                        <button type="reset">Reset</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="submit">Submit</button>
                        <br />
                    </form>
                    <h3>Carbon dioxide footprint (tCO2eq) - deployment phase: {footprintDeploy} </h3>
                    <h3>Carbon dioxide footprint (blueWhales) - deployment phase: {footprintDeployBlueWhale} </h3>
                    <hr></hr>
                </div>
                <div>
                    <h3>Energy consumption (kWh) - all: {powerUsedAll} </h3>
                    <h3>Energy consumption percentage - training phase: {powerUsedPercentageTrain}% </h3>
                    <h3>Energy consumption percentage - deployment phase: {powerUsedPercentageDeploy}% </h3>
                    <hr></hr>
                    <h3>Carbon dioxide footprint (tCO2eq) - all: {footprintAll} </h3>
                    <h3>Carbon dioxide footprint (blueWhales) - all: {footprintAllBlueWhale} </h3>
                    <h3>Carbon dioxide footprint percentage - embodied: {footprintPercentageEmbodied}% </h3>
                    <h3>Carbon dioxide footprint percentage - training phase: {footprintPercentageTrain}% </h3>
                    <h3>Carbon dioxide footprint percentage - deployment phase: {footprintPercentageDeploy}% </h3>
                    <hr></hr>
                </div>
                <div>
                    <button onClick={resetOutput}>Reset output</button>
                </div>
            </div>
        </>

    );
};

export default Footprint;