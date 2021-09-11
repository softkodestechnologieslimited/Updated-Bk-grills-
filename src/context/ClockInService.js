import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const ClockedInContext = createContext();

const baseApiUrl = "https://rms.pythonanywhere.com/api/ticket/";
const apiFormat = "?format=json";

const RawTestStaff = [
  { name: "John Doe", clockedIn: false, id: uuid() },
  { name: "Jane Doe", clockedIn: false, id: uuid() },
  { name: "Tobi Senju", clockedIn: false, id: uuid() },
  { name: "White Zetsu", clockedIn: false, id: uuid() },
  { name: "Jrue Holiday", clockedIn: false, id: uuid() },
  { name: "James Harden", clockedIn: false, id: uuid() },
  { name: "Devin Booker", clockedIn: false, id: uuid() },
  { name: "Trae Young", clockedIn: false, id: uuid() },
  { name: "Paul George", clockedIn: false, id: uuid() },
  { name: "Damian Lillard", clockedIn: false, id: uuid() },
];

export const useClockedInContext = () => {
  return useContext(ClockedInContext);
};

const ClockInService = ({ children }) => {
  const [testStaff, setTestStaff] = useState([]);
  const [clockedInStaff, setClockedInStaff] = useState([]);
  const [filteredClock, setFilteredClock] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [ticketParams, setTicketParams] = useState("");
  const [startDate, setStartDate] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let newSet = [];
    newSet = RawTestStaff.map((item) => {
      return { ...item, value: item.id, label: item.name };
    });
    setTestStaff((prev) => (prev = [...newSet]));
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchTickets(startDate);
    }
    return () => {
      mounted = false;
    };
  }, [startDate]);

  // useeffect that monitors search of tickets
  useEffect(() => {
    let newArray = [...tickets];
    newArray = newArray
      .filter((item) => item.ticket_id.indexOf(ticketParams.toLowerCase()) > -1)
      .sort((a, b) => a - b);
    setFilteredTickets((prev) => (prev = [...newArray]));
  }, [tickets, ticketParams]);

  // useeffect that monitors search of staff
  useEffect(() => {
    let newArray = [...clockedInStaff];
    newArray = newArray
      .filter(
        (item) => item.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
      )
      .sort((a, b) => a - b);
    setFilteredClock((prev) => (prev = [...newArray]));
  }, [filterText, clockedInStaff]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  // function that fetches tickets based on date
  const fetchTickets = async (timeStamp) => {
    setLoading((prev) => (prev = true));
    try {
      const data = await axios.get(
        `${baseApiUrl}${apiFormat}&timestamp=${Math.floor(timeStamp / 1000)}`
      );
      setTickets([...data.data]);
      setLoading((prev) => (prev = false));
    } catch (error) {
      setLoading((prev) => (prev = false));

      return false;
    }
  };

  // function that clokcsin staff
  const ClockInStaff = (id) => {
    let newArray = [...testStaff];
    let singleStaff = newArray.find((item) => item.id === id);
    singleStaff.clockedIn = true;
    setTestStaff((prev) => (prev = [...newArray]));
    setClockedInStaff(
      (prev) => (prev = [...prev, { ...singleStaff, time: Date.now() }])
    );
  };

  // function that handles staff search on attendance
  const handleSearch = (text) => {
    setFilterText((prev) => (prev = text));
  };

  // function that handles ticket search
  const handleTicketSearch = (text) => {
    setTicketParams((prev) => (prev = text));
  };

  // function that adds a ticket to the history
  const addTicket = async (ticket) => {
    let JSONTicket = JSON.stringify(ticket);
    try {
      await axios.post(`${baseApiUrl}${apiFormat}`, JSONTicket, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchTickets(Date.now());
      return true;
    } catch (error) {
      setLoading((prev) => (prev = false));
      return false;
    }
  };

  const deleteTicket = async (id) => {
    setLoading((prev) => (prev = true));
    try {
      await axios.delete(`${baseApiUrl}/${id}${apiFormat}`);
      fetchTickets(startDate);
      return true;
    } catch (error) {
      setLoading((prev) => (prev = false));
      return false;
    }
  };

  return (
    <ClockedInContext.Provider
      value={{
        testStaff,
        setTestStaff,
        ClockInStaff,
        clockedInStaff,
        filteredClock,
        handleSearch,
        addTicket,
        handleTicketSearch,
        handleDateChange,
        startDate,
        setStartDate,
        fetchTickets,
        filteredTickets,
        loading,
        deleteTicket,
      }}
    >
      {children}
    </ClockedInContext.Provider>
  );
};

export default ClockInService;
