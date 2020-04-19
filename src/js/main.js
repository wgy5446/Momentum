// src/js/main.js
import { fadeIn, fadeOut } from './animation';

// 로그인페이지에서 사인업 페이지로 넘어가는 애니메이션
const $loginSignUp = document.querySelector('.login-signup-text');
const $loginSec = document.querySelector('#login');
const $signupSec = document.querySelector('.signup-sec');
const $signupBackBtn = document.querySelector('.signup-back-btn');
const $signupPw = document.querySelector('#signup-pw');
const $pwReq = document.querySelector('.pw-req');
const $hintSelected = document.querySelector('.hint-selected');
const $optionsContainer = document.querySelector('.hint-options-container');

$loginSignUp.onclick = () => {
  fadeOut($loginSec, 700);
  setTimeout(() => {
    fadeIn($signupSec, 700);
  }, 700);
};


// 싸인업 페이지의 셀렉트 박스 기능
$hintSelected.onclick = () => {
  $optionsContainer.classList.toggle('active');
};

$optionsContainer.onclick = ({ target }) => {
  if (!target.matches('div.option > label')) return;
  $optionsContainer.classList.toggle('active');
  $hintSelected.textContent = target.textContent;
};


// 싸인업 페이지에서 패스워드 focus됬을때 조건을 부드럽게 보여주는 기능

$signupPw.onfocus = () => {
  $pwReq.classList.toggle('active');
};

$signupPw.onblur = () => {
  $pwReq.classList.toggle('active');
};

// signup page hover -> show back btn

$signupSec.onmouseover = () => {
  fadeIn($signupBackBtn, 300);
};

$signupSec.onmouseleave = () => {
  fadeOut($signupBackBtn, 300);
};


//signup back btn
$signupBackBtn.onclick = () => {
  fadeOut($signupSec, 700);
  setTimeout(() => {
    fadeIn($loginSec, 700);
  }, 700);
};