// window.onload = function () {
//   let navList = document.querySelector(".nav > ul");

//   navList.addEventListener("mouseover", function () {
//       navList.querySelectorAll(".submenu").forEach(sub => {
//           sub.style.height = "300px";
//       });
//   });
//   navList.addEventListener("mouseout", function () {
//       navList.querySelectorAll(".submenu").forEach(sub => {
//           sub.style.height = "0px";
//       });
//   });
// }
// //nav





var familySite = document.querySelector(".familysite");
  var familyMenu = document.querySelector(".familymenu");
  var upPoint = document.querySelector("img[alt='패밀리사이트선택윗방향포인트이미지']");
  var downPoint = document.querySelector("img[alt='패밀리사이트선택아랫방향포인트이미지']");

  // family_menu가 열려있는지 추적하는 변수.
  var isMenuOpen = false;

  // 페이지가 로드되었을 때 'family_menu'를 숨김.
  familyMenu.style.maxHeight = "0px";
  familyMenu.style.visibility = "hidden";
  downPoint.style.display = "none"; // 아래 방향 포인트를 숨김

  familySite.addEventListener("click", function (event) {
    event.stopPropagation();

    if (!isMenuOpen) {
      familyMenu.style.visibility = "visible";
      familyMenu.style.maxHeight = "240px";
      upPoint.style.display = "none"; // 위 방향 포인트를 숨김
      downPoint.style.display = "block"; // 아래 방향 포인트를 보여줌
    } else {
      familyMenu.style.maxHeight = "0px";
      // 'family_menu'가 완전히 닫힌 후에 'visibility: hidden;'을 적용하기 위한 코드
      setTimeout(function () {
        familyMenu.style.visibility = "hidden";
        upPoint.style.display = "block"; // 위 방향 포인트를 보여줌
        downPoint.style.display = "none"; // 아래 방향 포인트를 숨김
      }, 300); // 300은 css transition이랑 일치해야됨.
    }

    // 메뉴 상태를 업데이트.
    isMenuOpen = !isMenuOpen;
  });

  // 페이지의 어떤 곳을 클릭하더라도 'family_menu'를 닫기.
  document.addEventListener("click", function () {
    if (isMenuOpen) {
      familyMenu.style.maxHeight = "0px";
      setTimeout(function () {
        familyMenu.style.visibility = "hidden";
        upPoint.style.display = "block"; // 위 방향 포인트를 보여줌
        downPoint.style.display = "none"; // 아래 방향 포인트를 숨김
      }, 300);
      isMenuOpen = false;
    }
  });
  // //family_site