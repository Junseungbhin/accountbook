import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Detail = ({ spends, setSpends }) => {
  // URL에서 id 매개변수를 가져옴
  const { id } = useParams();

  // 페이지 이동을 위한 navigate 함수를 가져옴
  const navigate = useNavigate();

  // id에 해당하는 지출 항목을 찾음
  const spend = spends.find((s) => s.id === id);

  // 입력된 값을 참조하기 위한 useRef 훅을 사용
  const dateRef = useRef(null);
  const categoryRef = useRef(null);
  const amountRef = useRef(null);
  const contentRef = useRef(null);

  // 지출 항목이 변경될 때마다 해당 항목의 값을 입력란에 채움
  useEffect(() => {
    if (spend) {
      dateRef.current.value = spend.date;
      categoryRef.current.value = spend.category;
      amountRef.current.value = spend.amount;
      contentRef.current.value = spend.content;
    }
  }, [spend]);

  // 지출 항목을 삭제하는 함수
  const deleteSpend = (id) => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (isConfirmed) {
      // 삭제된 지출 항목을 제외한 새로운 배열을 생성
      const updatedSpends = spends.filter((spend) => spend.id !== id);
      // 삭제된 항목을 제외한 새로운 배열을 상태에 반영하고, setSpends가 아니라 updatedSpends를 반환
      setSpends(updatedSpends);
      // 메인 페이지로 이동
      navigate("/");
      // 삭제 완료 메시지를 표시
      alert("삭제되었습니다!");
      // 함수 완료 후, 새로운 배열을 반환
      return updatedSpends;
    } else {
      // 이전 페이지로 돌아감
      navigate(-1);
    }
  };

  // 지출 항목을 수정하는 함수
  const editSpend = (e) => {
    e.preventDefault();
    // 수정된 지출 항목을 반영한 새로운 배열을 생성
    const updatedSpends = spends.map((s) =>
      s.id === spend.id
        ? {
            ...s,
            date: dateRef.current.value,
            category: categoryRef.current.value,
            amount: parseFloat(amountRef.current.value),
            content: contentRef.current.value,
          }
        : s
    );
    // 새로운 배열을 상태에 반영
    setSpends(updatedSpends);
    // 메인 페이지로 이동
    navigate("/");
    alert("수정이 완료되었습니다!!!")
    // 함수 완료 후, 새로운 배열을 반환
    return updatedSpends;
  };

  return (
    // 수정 폼을 랜더링
    <UpdateFormStyle onSubmit={editSpend}>
      날짜
      <UpdateInputStyle type="date" ref={dateRef} />
      항목
      <UpdateInputStyle type="text" ref={categoryRef} />
      금액
      <UpdateInputStyle type="text" ref={amountRef} />
      내용
      <UpdateInputStyle type="text" ref={contentRef} />
      <ButtonContainer>
        <UpdateBtnStyle type="submit">수정</UpdateBtnStyle>
        <UpdateBtnStyleDelete
          type="button"
          onClick={() => deleteSpend(spend.id)}
        >
          삭제
        </UpdateBtnStyleDelete>
        <UpdateBtnStyleBack type="button" onClick={() => navigate(-1)}>
          뒤로 가기
        </UpdateBtnStyleBack>
      </ButtonContainer>
    </UpdateFormStyle>
  );
};

const UpdateFormStyle = styled.form`
  width: 60%;
  background-color: white;
  padding: 3rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
`;

const UpdateInputStyle = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid #b4b4b4;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const UpdateBtnStyle = styled.button`
  background-color: #ff5100;
  color: white;
  border-radius: 0.5rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const UpdateBtnStyleDelete = styled(UpdateBtnStyle)`
  background-color: red;
`;

const UpdateBtnStyleBack = styled(UpdateBtnStyle)`
  background-color: gray;
`;

export default Detail;