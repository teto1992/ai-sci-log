/** SCI - Software Carbon Intensity (v0.1)
Units:
  - total E in kWh 
  - O, M, SCI in gCO2e
  - Hours in h, ResourceShare ∈ [0,1]
*/

:- consult('data/ci.pl').

% ---------- Knowledge Base ---------------------------------------------
lifetimeHours(35040).  % ≈ 4 years
reservedHours(17520).  % ≈ 2 years
resourceShare(1.0).    % it is computed as ResourcesReserved / TotalResources, e.g. on CPU basis
carbonIntensity(0.120).  % UK average grid intensity in kgCO2e/kWh
totalEmbodied(2000).   % e.g. embodied emissions of a server in kgCO2e

% ---------- Simulation over time ---------------------------------------



sim2(T, Region, SCIList) :-
    T > 0, sim(T, Region, Tmp),
    reverse(Tmp, SCIList),
    printCSV(SCIList).

printCSV(SCIList) :-
    open('sci_output.csv', write, Stream),
    format(Stream, "Time,SCI~n", []),
    writeCSVData(Stream, SCIList),
    close(Stream).

writeCSVData(_, []).
writeCSVData(Stream, [(T,SCI)|Rest]) :-
    format(Stream, "~w,~2f~n", [T, SCI]),
    writeCSVData(Stream, Rest).

sim(T, Region, [(T,SCI)|Rest]) :-
    T > 0,
    sciScore(T, Region, SCI),
    NewT is T - 1,
    sim(NewT, Region, Rest).
sim(0, _, []). 



% carbonIntensity(1, 0, north_scotland).

% totEnergy(Timeslot, Region, EnergyConsumed)
totEnergy(_,_,1000).
functionalUnits(100000).

% ---------- Core Rules -------------------------------------------------

%% sciScore(+E, +R, -SCI)
%  compute SCI = (O + M) / R
sciScore(TimeSlot, Region, SCI) :-
    operationalCarbon(TimeSlot, Region, O),
    embodiedCarbon(M), 
    functionalUnits(R), R > 0,
    SCI is (O + M) / R.

%% operationalCarbon(+E, -O)
%  O = E * I (overall operational emissions)
operationalCarbon(TimeSlot, Region, O) :-
    totEnergy(TimeSlot,Region,E),
    carbonIntensity(TimeSlot, I, Region), I >= 0,
    O is E * I.
    

%% embodiedCarbon(-M)
%  M = TotalEmbodied * (ReservedHours / LifetimeHours) * ResourceShare
embodiedCarbon(M) :-
    totalEmbodied(TotalEmbodied), TotalEmbodied >= 0,
    lifetimeHours(EL), EL > 0,
    reservedHours(TiR), TiR >= 0,
    resourceShare(RS), RS >= 0, RS =< 1, 
    M is TotalEmbodied * (TiR / EL) * RS.


% ---------- Pretty Printing ---------------------------------------------------
%% printSci(+E, +R)
%  Compute and explain the SCI for a given energy (E, kWh) and functional units (R).
printSci(E, R) :-
    sciScore(E, R, SCI),
    carbonIntensity(I),
    embodiedCarbon(M),
    operationalCarbon(E, O),
    format("We considered a workload consuming ~2f kWh across ~w functional units.~n", [E,R]),
    format("The grid carbon intensity is set to ~w gCO2e/kWh, so operational emissions amount to ~2f gCO2e.~n", [I,O]),
    format("The amortized embodied emissions contribute an additional ~2f gCO2e.~n", [M]),
    format("Altogether, operational + embodied = ~2f gCO2e.~n", [O+M]),
    format("------------------------------------------------------------~n"),
    format("👉 The Software Carbon Intensity (SCI) is ~2f gCO2e per FU.~n", [SCI]).

% ---------- Demo scenarios --------------------------------------------

%% demo1/0
%  Batch workload: 10 kWh over 1000 functional units
demo1 :-
    printSci(10, 1000).

%% demo2/0
%  Tiny request: 0.012 kWh for 1 FU
demo2 :-
    printSci(0.012, 1).

%% demo3/0
%  Very large batch: 2000 kWh over 1,000,000 FU
demo3 :-
    printSci(2000, 1000000).

%https://logicalenglish.logicalcontracts.com/p/greenaitelier.pl