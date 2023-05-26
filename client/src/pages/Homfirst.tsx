import React, { useState, useEffect } from "react";
import styled from "styled-components";
import iphone from "@assets/images/iphone.png";
import maintop1 from "@assets/images/maintop3.png";
import maintop2 from "@assets/images/maintop2.png";
import maintop3 from "@assets/images/mainbottom.jpg";
import maintop4 from "@assets/images/wines.jpg";
import maintop5 from "@assets/images/cocktail.jpg";
import maintop6 from "@assets/images/cocktail2.jpg";
import maintop7 from "@assets/images/happyday.jpg";

import { useNavigate } from "react-router";

const Homefirst = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImage((prevImage) => (prevImage === 1 ? 7 : prevImage - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage === 7 ? 1 : prevImage + 1));
  };
  const Randomnavigate = () => {
    setIsTakingPhoto(true);
    setTimeout(() => {
      setIsTakingPhoto(false);
      navigate(`/alcohol/detail/${getRandomItemId()}`);
    }, 900);
  };

  const getRandomItemId = () => {
    // 임의의 itemId를 생성하거나 가져오는 로직을 구현해야 합니다.
    // 예시로 1부터 100까지의 임의의 숫자를 반환하는 코드입니다.
    const randomItemId = Math.floor(Math.random() * 24) + 1;
    return randomItemId;
  };
  const getRandomImageNumber = () => {
    return Math.floor(Math.random() * 7) + 1;
  };
  const [currentImage, setCurrentImage] = useState(getRandomImageNumber());
  return (
    <HomefirstLayout>
      {isTakingPhoto && <div className="camera-animation" />}
      <div className="imgtag">
        <img src={getImageSource(currentImage)} alt="Main Top" className="Maintop" />
        <div className="iphone-wrapper">
          <div className="title">
            오늘의 한잔을 <br />
            오늘의 한장으로 <br />
            남겨보세요
          </div>
          <img src={iphone} alt="iphone" className="iphone" />
          <img src={getImageSource(currentImage)} alt="Maintopsall" className="Maintopsmall" />

          <div className="clickhere">
            사진 촬영을 누르면
            <br />
            랜덤한 주류를
            <br />
            추천해드립니다!
          </div>
          <button className="Camera" onClick={Randomnavigate}></button>
        </div>
        <button className="prevButton" onClick={handlePrevImage}>
          &lt;
        </button>
        <button className="nextButton" onClick={handleNextImage}>
          &gt;
        </button>
      </div>
    </HomefirstLayout>
  );
};

const HomefirstLayout = styled.div`
  color: ${({ theme }) => theme.colors.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 96px;
  height: 100%;

  .imgtag {
    width: 100%;
    position: relative;
  }

  .iphone-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 25.5%;
  }

  .iphone {
    width: 100%;
    max-width: 100%;
    height: auto;
    transform: translate(-50%, -50%) rotate(270deg);
  }

  .Maintop {
    width: 100%;
    filter: blur(10px);
  }

  .title {
    position: absolute;
    top: -35%;
    left: -101%;
    color: white;
    font-family: Cafe24Surroundair;
    font-size: 32px;
    z-index: 5;
    filter: drop-shadow(2px 4px 1px black);
  }

  .clickhere {
    position: absolute;
    top: 12%;
    font-size: 16px;
    color: white;
    left: 60%;
    background-color: black;
    z-index: 3;
    width: 36%;
    height: 10%;
    font-family: WanjuRegular;
    display: flex;
    align-items: center;
    border-radius: 50%;
  }

  .Camera {
    position: absolute;
    left: 63.7%;
    top: -3.69%;
    width: 14.6%;
    height: 7.2%;
    z-index: 4;
    border-radius: 50%;
  }

  .Maintopsmall {
    position: absolute;
    width: 120%;
    height: 43.5%;
    bottom: 78%;
    right: 48%;
    z-index: 2;
    transition: all 1s ease;
  }

  .prevButton,
  .nextButton {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    font-size: 48px;
    color: #fff;
    cursor: pointer;
    width: 40px;
    transition: color 0.3s ease;
    filter: drop-shadow(2px 4px 1px black);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  @media (max-width: 1023px) {
    .title {
      font-size: 20px;
    }
    .clickhere {
      font-size: 10px;
    }
  }

  @media (max-width: 767px) {
    .title {
      font-size: 16px;
      top: -37%;
    }
    .clickhere {
      font-size: 8px;
      width: 40%;
    }
  }

  .prevButton {
    left: 10px;
    font-weight: 200;
  }

  .nextButton {
    right: 20px;
    font-weight: 200;
  }

  .prevButton:hover,
  .nextButton:hover {
    color: #a84448;
  }

  /* .camera-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0;
    animation: blinkAnimation 0.3s ease;
    z-index: 999;
  } */
  .camera-animation {
    position: absolute;
    top: 61%;
    left: 47%;
    transform: translate(-50%, -50%);
    width: 33%;
    height: 43.5%;
    background-color: black;
    opacity: 0;
    animation: blinkAnimation 0.1s ease;
    z-index: 999;
  }

  @keyframes blinkAnimation {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const getImageSource = (imageNumber: number) => {
  switch (imageNumber) {
    case 1:
      return maintop1;
    case 2:
      return maintop2;
    case 3:
      return maintop3;
    case 4:
      return maintop4;
    case 5:
      return maintop5;
    case 6:
      return maintop6;
    case 7:
      return maintop7;
    default:
      return maintop1;
  }
};

export default Homefirst;
