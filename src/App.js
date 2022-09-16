import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export const Art = () => {
  //상태관리하기
  // 1.요청의 결과
  // 2.로딩상태
  // 3.에러
  const [Art, setArt] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const fetchArt = async () => {
    try {
      //Art초기화, error초기화, loading은 true
      setArt(null);
      setError(null);
      setLoading(true);
      const response = await axios.get("https://api.artic.edu/api/v1/artworks");
      setArt(response.data.data);
      console.log(Art);
    } catch (e) {
      //에러번호를 확인하고 싶을때
      console.log(e.response.status);
      setError(e);
    }
    setLoading(false);
  };
  //렌더링 될때 axios를 사용해서 데이터를 받음
  useEffect(() => {
    fetchArt();
  }, []);
  //로딩중이라면?
  if (loading) return <div> 로딩중...</div>;
  //에러가 발생했다면?
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!Art) return null;
  return (
    <>
      <ul>
        {Art.map((item) => (
          <a href={item.api_link}>
            <li key={item.id}>
              <img
                src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
              ></img>
              {item.title}
            </li>
            {/* 이부분이반복~~ */}
          </a>
        ))}
      </ul>
      <button onClick={fetchArt}>다시 불러오기</button>
    </>
  );
};
// 404못찾았다
// 401인증되지않았다
// 400요청잘못됨

export default Art;
