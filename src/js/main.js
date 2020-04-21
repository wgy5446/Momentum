// src/js/main.js
import { fadeIn, fadeOut } from './animation';
import { openWeatherBox, closeWeatherBox, weatherInit } from './weather';
import { render, getTodo, changeList, removeTodo } from './todo';


// 로그인페이지에서 사인업 페이지로 넘어가는 애니메이션
const $loginSignUp = document.querySelector('.login-signup-text');
const $loginPage = document.querySelector('#login');
const $mainPage = document.querySelector('.main-page');
const $btnLogin = document.querySelector('.btn-login');
const $signupPage = document.querySelector('.signup-page');
const $signupBackBtn = document.querySelector('.signup-back-btn');
const $signupPw = document.querySelector('#signup-pw');
const $pwReq = document.querySelector('.pw-req');
const $hintSelected = document.querySelector('.hint-selected');
const $optionsContainer = document.querySelector('.hint-options-container');
const $loginContainer = document.querySelector('.login-container');

$loginSignUp.onclick = () => {
  fadeOut($loginPage, 700);
  setTimeout(() => {
    fadeIn($signupPage, 700);
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
$btnLogin.onclick = () => {
  fadeOut($loginPage, 700);
  setTimeout(() => {
    fadeIn($mainPage, 700);
    $loginContainer.style.display = 'none';
  }, 700);
};
// 싸인업 페이지에서 패스워드 focus됬을때 조건을 부드럽게 보여주는 기능
$signupPw.onfocus = () => {
  $pwReq.classList.toggle('active');
};
$signupPw.onblur = () => {
  $pwReq.classList.toggle('active');
};
// signup page hover -> show back btn
$signupPage.onmouseover = () => {
  fadeIn($signupBackBtn, 300);
};
$signupPage.onmouseleave = () => {
  fadeOut($signupBackBtn, 300);
};
//signup back btn
$signupBackBtn.onclick = () => {
  fadeOut($signupPage, 700);
  setTimeout(() => {
    fadeIn($loginPage, 700);
  }, 700);
};

// weather start
const $wMain = document.querySelector('.weather-main');
const $wBox = document.querySelector('.weather-box');

$wMain.onclick = () => {
  $wBox.style.display === 'block' ? closeWeatherBox($wBox) : openWeatherBox($wBox);
};

weatherInit();
// weather end

// todo start
const $checkbox = document.querySelector('.icon-check-empty')
const $iconCancel = document.querySelector('.icon-cancel');
const $todolistBody = document.querySelector('.todolist-body');
const $todolistMenu = document.querySelector('.todolist-menu');
const $iconList = document.querySelector('.icon-th-list-1');
const $todolistBox = document.querySelector('.todolist-box');

render();

window.onload = getTodo;

$todolistMenu.onclick = ({target}) => {
  if (!target.matches('.todolist-menu > li')) return;
  changeList(target.id);
};

const toggleIcon = ({target}) => {
  if (!target.matches('.icon-th-list-1')) return;
  if ($todolistBox.style.display === 'none') $todolistBox.style.display = 'block';
  else $todolistBox.style.display = 'none';
}


$iconList.onclick = toggleIcon;