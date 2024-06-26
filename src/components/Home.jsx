import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import RecordForm from "./RecordForm";
import Months from "./Months";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const spends = useSelector((state) => state.spends.spends);
  const dispatch = useDispatch();
  const initialMonth = localStorage.getItem("selectedMonth");
  const [selectedMonth, setSelectedMonth] = useState(
    initialMonth ? parseInt(initialMonth, 10) : new Date().getMonth() + 1
  );

  // 선택된 월이 변경될 때마다 로컬 스토리지에 반영
  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth.toString());
  }, [selectedMonth]);

  // 선택된 월에 해당하는 지출을 필터링하는 함수
  const filterSpendsByMonth = (spends, month) => {
    if (!spends) {
      return [];
    }
    return spends.filter((spend) => {
      const spendMonth = new Date(spend.date).getMonth() + 1;
      return spendMonth === parseInt(month);
    });
  };

  return (
    <>
      <GlobalStyles />
      <InStyledBox>
        <RecordForm />
      </InStyledBox>
      <InStyledBox>
        <Months
          spends={spends}
          setSelectedMonth={setSelectedMonth}
          selectedMonth={selectedMonth}
        />
      </InStyledBox>
      <InStyledBox>
        <List filteredSpends={filterSpendsByMonth(spends, selectedMonth)} />
      </InStyledBox>
    </>
  );
};

const InStyledBox = styled.div`
  width: 60%;
  background-color: white;
  margin: 2rem auto;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
`;

export default Home;
