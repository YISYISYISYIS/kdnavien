var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
// //slider





// 메뉴 관련 객체와 함수들을 저장하는 배열
var menus = [
  {
    container: document.querySelector(".cont1_container1"),
    menu: document.querySelector(".product_menu1"),
    selectionText: document.getElementById("selected_product1"),
    isOpen: false,
    defaultText: '제품군 선택'
  },
  {
    container: document.querySelector(".cont1_container2"),
    menu: document.querySelector(".product_menu2"),
    selectionText: document.getElementById("selected_product2"),
    isOpen: false,
    defaultText: '제품군 선택'
  },
  {
    container: document.querySelector(".cont1_container3"),
    menu: document.querySelector(".product_menu3"),
    selectionText: document.getElementById("selected_product3"),
    isOpen: false,
    defaultText: '브랜드 선택'
  },
  {
    container: document.querySelector(".cont1_container4"),
    menu: document.querySelector(".product_menu4"),
    selectionText: document.getElementById("selected_product4"),
    isOpen: false,
    defaultText: '모델 선택'
  }
];

// 메뉴 토글 함수
function toggleMenu(menu, shouldOpen) {
  menu.isOpen = typeof shouldOpen === 'boolean' ? shouldOpen : !menu.isOpen;
  menu.menu.style.visibility = menu.isOpen ? "visible" : "hidden";
  menu.menu.style.maxHeight = menu.isOpen ? menu.menu.scrollHeight + "px" : "0";

  var downArrow = menu.container.querySelector('img[alt="제품선택아래방향포인트이미지"]');
  var upArrow = menu.container.querySelector('img[alt="제품선택윗방향포인트이미지"]');
  if (downArrow && upArrow) {
      downArrow.style.display = menu.isOpen ? 'none' : 'block';
      upArrow.style.display = menu.isOpen ? 'block' : 'none';
  }
}

let prevSelection = null; // 이전에 선택한 항목을 저장할 변수

// 메뉴 아이템 클릭 이벤트 핸들러 함수
function handleMenuItemClick(menu, event) {
  event.stopPropagation();
  menu.selectionText.textContent = event.target.textContent;
  toggleMenu(menu, false);
  if (menu.container.nextElementSibling) {
      enableMenu(menu.container.nextElementSibling);
  }
}

// 메뉴 항목을 활성화/비활성화하는 함수
function enableMenu(menu) {
  menu.style.pointerEvents = 'auto';
}

function disableMenu(menu) {
  menu.style.pointerEvents = 'none';
}

// 메뉴별 이벤트 리스너 설정
menus.forEach((menu, i, arr) => {
  menu.container.addEventListener("click", function (event) {
      event.stopPropagation();
      // 현재 메뉴를 토글
      toggleMenu(menu);
      // 다른 모든 메뉴들을 닫음
      arr.forEach((otherMenu, j) => {
          if (i !== j && otherMenu.isOpen) {
              toggleMenu(otherMenu, false);
          }
      });
  });

  var menuItems = menu.menu.querySelectorAll("li");
  menuItems.forEach(function (item) {
      item.addEventListener("click", function (event) {
          handleMenuItemClick(menu, event);
          // 선택한 메뉴 항목에 따라 다음 메뉴 활성화
          if (i < arr.length - 1) {
              let nextMenu = arr[i + 1];
              enableMenu(nextMenu.container);
              // 다음 메뉴의 기본 텍스트로 설정
              nextMenu.selectionText.textContent = nextMenu.defaultText;
              // 다음 메뉴 뒤의 모든 메뉴를 닫고 비활성화
              arr.slice(i + 2).forEach(subsequentMenu => {
                  disableMenu(subsequentMenu.container);
                  toggleMenu(subsequentMenu, true);
              });
          }
      });
  });
});

// 페이지 클릭 이벤트 리스너 설정
document.addEventListener("click", function (event) {
  menus.forEach((menu, i, arr) => {
      // 클릭된 요소가 현재 메뉴 컨테이너나 메뉴 내부가 아닌 경우에만 처리
      if (!menu.container.contains(event.target) && !menu.menu.contains(event.target)) {
          // 메뉴를 닫음
          toggleMenu(menu, false);
          // 기본 텍스트로 되돌림
          menu.selectionText.textContent = menu.defaultText;
          // 다음 메뉴들을 비활성화함
          arr.slice(i + 1).forEach(nextMenu => {
              disableMenu(nextMenu.container);
              nextMenu.selectionText.textContent = nextMenu.defaultText;
          });
      }
  });
});
// //productMenu





function updateSubmenu(selectedItem, submenu, mapping) {
  // 모든 하위 메뉴 항목을 숨김.
  submenu.querySelectorAll('li').forEach(li => li.style.display = 'none');
  
  // 선택한 항목에 매핑된 하위 메뉴 항목을 표시.
  const relatedItems = mapping[selectedItem]?.brands || mapping[selectedItem]?.models || mapping[selectedItem]?.details || [];
  relatedItems.forEach(relatedItemKey => {
      // 'data-key' 속성을 가진 li 요소를 찾아 표시
      const li = submenu.querySelector(`li[data-key="${relatedItemKey}"]`);
      if (li) {
          li.style.display = 'block'; // 해당하는 항목을 표시
      }
  });
}

// 제품간 매핑 정의.
const productMapping = {
  'A-1': { id: 'p1', brands: ['B-1', 'B-2','B-3'] },
  'A-2': { id: 'p2', brands: ['B-4', 'B-5','B-6'] },
  'A-3': { id: 'p3', brands: ['B-7', 'B-8','B-9'] },
  'A-4': { id: 'p4', brands: ['B-10', 'B-11','B-12', 'B-13'] },
};

const brandMapping = {
  'B-1': { id: 'b1', models: ['C-1', 'C-2', 'C-3'] },
  'B-2': { id: 'b2', models: ['C-4', 'C-5'] },
  'B-3': { id: 'b3', models: ['C-6'] },
  'B-4': { id: 'b4', models: ['C-7', 'C-8'] },
  'B-5': { id: 'b5', models: ['C-9'] },
  'B-6': { id: 'b6', models: ['C-10'] },
  'B-7': { id: 'b7', models: ['C-11'] },
  'B-8': { id: 'b8', models: ['C-12', 'C-13'] },
  'B-9': { id: 'b9', models: ['C-14'] },
  'B-10': { id: 'b10', models: ['C-15'] },
  'B-11': { id: 'b11', models: ['C-16'] },
  'B-12': { id: 'b12', models: ['C-17', 'C-18'] },
  'B-13': { id: 'b13', models: ['C-19'] },
};

const modelMapping = {
  'C-1': { id: 'm1', details: ['D-1', 'D-2'] },
  'C-2': { id: 'm2', details: ['D-3', 'D-4'] },
  'C-3': { id: 'm3', details: ['D-5', 'D-6'] },
  'C-4': { id: 'm4', details: ['D-7', 'D-8'] },
  'C-5': { id: 'm5', details: ['D-9', 'D-10'] },
  'C-6': { id: 'm6', details: ['D-11', 'D-12'] },
  'C-7': { id: 'm7', details: ['D-13', 'D-14'] },
  'C-8': { id: 'm8', details: ['D-15', 'D-16'] },
  'C-9': { id: 'm9', details: ['D-17', 'D-18'] },
  'C-10': { id: 'm10', details: ['D-19', 'D-20'] },
  'C-11': { id: 'm11', details: ['D-21', 'D-22'] },
  'C-12': { id: 'm12', details: ['D-23', 'D-24'] },
  'C-13': { id: 'm13', details: ['D-25', 'D-26'] },
  'C-14': { id: 'm14', details: ['D-27', 'D-28','D-29'] },
  'C-15': { id: 'm15', details: ['D-30', 'D-31','D-32'] },
  'C-16': { id: 'm16', details: ['D-33', 'D-34','D-35'] },
  'C-17': { id: 'm17', details: ['D-36', 'D-37','D-38','D-39'] },
  'C-18': { id: 'm18', details: ['D-40', 'D-41','D-42'] },
  'C-19': { id: 'm19', details: ['D-43', 'D-44','D-45','D-46'] },
};


// 검색 버튼 클릭 시 실행되는 함수
function performSearchClick() {
  // '모델 선택' 영역에서 선택된 모델의 텍스트를 가져옴.
  const selectedModel = document.getElementById("selected_product4").textContent;

  // 선택된 모델이 '모델 선택'이 아니고, 'D-'로 시작하는 경우에만 URL 생성 및 이동
  if (selectedModel && selectedModel.startsWith('D-')) {
      // URL 생성
      const searchURL = `/details/${selectedModel}`;
      
      // 생성된 URL로 이동
      console.log(`이동할 URL: ${searchURL}`);
      window.location.href = searchURL;
  }
}

// 검색 버튼 클릭 이벤트 리스너 설정
document.querySelector('.main_search').addEventListener("click", performSearchClick);

// URL 생성 함수
function createSearchURL(product, brand, model) {
  // 여기에서 모델 항목에 따라 URL을 동적으로 생성
  const baseURL = "/search";  // 기본 검색 페이지 URL

  // 예: /search?model=D-1
  const searchParams = new URLSearchParams();
  searchParams.set("model", model);

  const searchURL = `${baseURL}?${searchParams.toString()}`;

  // 검색 버튼을 클릭한 경우에만 이동하도록 수정
  if (product || brand || model) {
      window.location.href = searchURL;
  }

  return searchURL;
}

// 첫 번째 제품군 메뉴(A) 클릭 이벤트
document.querySelectorAll('.product_menu1 li').forEach((li) => {
  li.addEventListener('click', (event) => {
    const selectedItem = event.target.textContent;
    const productMenu2 = document.querySelector('.product_menu2');
    updateSubmenu(selectedItem, productMenu2, productMapping);

    // 메뉴 A가 변경되었을 때, 메뉴 B, C, D를 초기 상태로 되돌림.
    document.getElementById("selected_product2").textContent = '제품군 선택';
    document.getElementById("selected_product3").textContent = '브랜드 선택';
    document.getElementById("selected_product4").textContent = '모델 선택';

    // 뒤에 있는 메뉴들의 서브메뉴를 닫기.
    menus.slice(1).forEach(nextMenu => toggleMenu(nextMenu, false));
  });
});

// 두 번째 제품군 메뉴(B) 클릭 이벤트
document.querySelectorAll('.product_menu2 li').forEach((li) => {
  li.addEventListener('click', (event) => {
    const selectedItem = event.target.textContent;
    const productMenu3 = document.querySelector('.product_menu3');
    updateSubmenu(selectedItem, productMenu3, brandMapping);

    // 메뉴 B가 변경되었을 때, 메뉴 C, D를 초기 상태로 되돌림.
    document.getElementById("selected_product3").textContent = '브랜드 선택';
    document.getElementById("selected_product4").textContent = '모델 선택';

    // 뒤에 있는 메뉴들의 서브메뉴를 닫기.
    menus.slice(2).forEach(nextMenu => toggleMenu(nextMenu, false));
  });
});

// 세 번째 제품군 메뉴(C) 클릭 이벤트
document.querySelectorAll('.product_menu3 li').forEach((li) => {
  li.addEventListener('click', (event) => {
    const selectedItem = event.target.textContent;
    const productMenu4 = document.querySelector('.product_menu4');
    updateSubmenu(selectedItem, productMenu4, modelMapping);

    // 메뉴 C가 변경되었을 때, 메뉴 D를 초기 상태로 되돌림.
    document.getElementById("selected_product4").textContent = '모델 선택';

    // 뒤에 있는 메뉴들의 서브메뉴를 닫rl
    toggleMenu(menus[3], false); // D 메뉴의 서브메뉴를 닫기.
  });
});

// 전역 변수로 선택된 모델의 키를 저장할 변수를 선언.
let selectedModelKey = '';

// 모델 선택 메뉴(D) 클릭 이벤트
document.querySelectorAll('.product_menu4 li').forEach((li) => {
  li.addEventListener('click', (event) => {
    // 클릭된 모델의 data-key를 저장합니다.
    selectedModelKey = event.target.getAttribute('data-key');
    // 선택된 모델 이름을 '모델 선택' 영역에 표시.
    document.getElementById("selected_product4").textContent = selectedModelKey;
  });
});
// //main_search





const tabBtn = document.querySelectorAll(".tab_btn > ul > li"); // 버튼 설정
const tabCont = document.querySelectorAll(".tab_cont > div"); // 콘텐츠 설정

tabCont.forEach(el => el.style.display = "none"); // 모든 콘텐츠를 숨김
tabCont[0].style.display = "block"; // 첫 번째 콘텐츠를 보이게 설정

tabBtn.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabBtn.forEach(tab => tab.classList.remove("active")); // 모든 버튼 클래스 삭제
        tab.classList.add("active"); // 클릭한 버튼만 클래스 추가

        tabCont.forEach(cont => cont.style.display = "none"); // 모든 콘텐츠를 숨김
        tabCont[index].style.display = "block"; // 클릭한 버튼의 콘텐츠 내용을 보여줌
    });
});
// //tab_menu





// "다시 선택하기" 버튼
const resetButton = document.querySelector('.cancel');

// "다시 선택하기" 버튼 클릭 시 이벤트 처리
resetButton.addEventListener('click', function () {
    // 체크된 값이 있는 라디오 버튼을 찾아서 초기값으로 설정
    const checkedRadio = document.querySelector('input[type="radio"]:checked');

    // 체크된 값이 있을 경우에만 초기값으로 설정
    if (checkedRadio) {
        checkedRadio.checked = false; // 기존 체크 해제
    }

    // 각 라디오 그룹의 첫 번째 값으로 초기화
    const radioGroups = document.querySelectorAll('input[type="radio"]');
    radioGroups.forEach(group => {
        group.checked = group.defaultChecked;
    });

    // '난방면적 기준' 서브메뉴 표시 및 '온수사용량 기준(동절기)' 서브메뉴 숨김 처리
    box1.style.display = 'block';
    box3.style.display = 'none';

    // '난방면적 기준' 상위 메뉴가 선택되도록 설정
    document.querySelector('.tab_cont1_2_box1 .select input').checked = true;

    
    filteredResults = allResults;
    // 총 결과 및 현재 결과 업데이트
    totalResults = filteredResults.length;
    goToPage(1); // 페이지 이동 시 첫 번째 페이지로 초기화
});

// 상위 메뉴에 따른 서브메뉴 표시 제어
const box1 = document.querySelector('.tab_cont1_2_box2');
const box3 = document.querySelector('.tab_cont1_2_box4');

// '온수사용량 기준(동절기)' 라디오 버튼 선택 해제
const box4Radios = document.querySelectorAll('.tab_cont1_2_box4 .select input');
box4Radios.forEach(radio => {
    radio.checked = false;
});

// 상위 메뉴에 따른 서브메뉴 표시 제어 함수
function controlSubMenuDisplay(box1Display, box3Display, box4RadiosDisabled) {
    box1.style.display = box1Display;
    box3.style.display = box3Display;

    // '온수사용량 기준(동절기)' 라디오 버튼 선택 해제 및 비활성화
    box4Radios.forEach(radio => {
        radio.checked = false;
        radio.disabled = box4RadiosDisabled;
    });
}

// 상위 메뉴에 따른 서브메뉴 표시 제어
document.querySelector('.tab_cont1_2_box1 .select').addEventListener('click', function () {
  // '난방면적 기준' 서브메뉴 표시 및 '온수사용량 기준(동절기)' 서브메뉴 숨김 처리
  box1.style.display = 'block';
  box3.style.display = 'none';
  // '온수사용량 기준(동절기)' 라디오 버튼 선택 해제 및 비활성화
  const box4Radios = document.querySelectorAll('.tab_cont1_2_box4 .select input');
  box4Radios.forEach(radio => {
      radio.checked = false;
      radio.disabled = true;
  });
  // '난방면적 기준' 라디오 버튼 활성화
  const box2Radios = document.querySelectorAll('.tab_cont1_2_box2 .select input');
  box2Radios.forEach(radio => {
      radio.disabled = false;
  });
});

document.querySelector('.tab_cont1_2_box3 .select').addEventListener('click', function () {
  // '온수사용량 기준(동절기)' 서브메뉴 표시 및 '난방면적 기준' 서브메뉴 숨김 처리
  box1.style.display = 'none';
  box3.style.display = 'block';
  // '난방면적 기준' 라디오 버튼 선택 해제 및 비활성화
  const box2Radios = document.querySelectorAll('.tab_cont1_2_box2 .select input');
  box2Radios.forEach(radio => {
      radio.checked = false;
      radio.disabled = true;
  });
  // '온수사용량 기준(동절기)' 라디오 버튼 활성화
  const box4Radios = document.querySelectorAll('.tab_cont1_2_box4 .select input');
  box4Radios.forEach(radio => {
      radio.disabled = false;
  });
});
// //sub_tab_menu



 

 const resultsPerPage = 9;
let currentPage = 1;
let totalResults = 0;
let currentResults = [];
let filteredResults = [];
let allResults; // 전역 변수로 선언

window.onload = function() {
  // 사용자가 페이지를 새로고침했는지 확인.
  const isPageReload = window.performance.getEntriesByType("navigation")[0].type === 'reload';

  if (isPageReload) {
    // 로컬 스토리지의 모든 키를 가져와서 새로고침시 삭제.
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('mainitem')) {
        localStorage.removeItem(key);
      }
    });
  
        // 새로고침시 전체 결과를 보여줌.
        // filteredResults = allResults;
      // } else {
      //   // 뒤로 가기를 통해 돌아왔을 때는 sessionStorage에서 필터링된 결과를 복원.
      //   const savedResults = sessionStorage.getItem('filteredResults');
      //   if (savedResults) {
      //     filteredResults = JSON.parse(savedResults);
      //   } else {
      //     // sessionStorage에 저장된 필터링된 결과가 없다면 전체 결과를 보여줌.
      //     filteredResults = allResults;
      //   }
  }
  // 새로고침이든 뒤로 가기든 전체 결과를 보여줌.
  filteredResults = allResults;
      
  totalResults = filteredResults.length;
  goToPage(currentPage); // 현재 페이지 번호를 유지하고 싶다면 currentPage 변수를 사용
};
    
      
 // 보일러 찾기 실행
function findBoiler() {
  function getCheckedValue(name) {
    const radioButtons = document.getElementsByName(name.replace(/ /g, ''));  // 공백 수정
    let selectedValue;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedValue = radioButton.value;
        break;
      }
    }
    return selectedValue;
  }
   // 보일러 검색 및 결과 가져오기 시뮬레이션
   // 실제 데이터 또는 API 호출로 대체
   allResults = [
      
      { id: "mainitem1", name: "결과 1", image: "img/main/item/Untitled-1.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem2", name: "결과 2", image: "img/main/item/Untitled-2.png",boilerType: "콘덴싱", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66", "106","165"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"] },
      { id: "mainitem3", name: "결과 3", image: "img/main/item/Untitled-3.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66", "106","165"],InstallationLocation: "대기차단식",waterTemperature: ["1°C","3단계"]},
      { id: "mainitem4", name: "결과 4", image: "img/main/item/Untitled-4.png" ,boilerType: "일반", capacitySelection: "난방면적기준", areaselection: ["106M²(32평)","165M²(50평)","231M²(70평)"],InstallationLocation: "대기차단식",waterTemperature: ["1°C","3단계"]},
      { id: "mainitem5", name: "결과 5", image: "img/main/item/Untitled-5.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["106M²(32평)","165M²(50평)","231M²(70평)","86M²(26평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem6", name: "결과 6", image: "img/main/item/Untitled-6.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem7", name: "결과 7", image: "img/main/item/Untitled-7.png" ,boilerType: "콘덴싱", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66", "106","165","231"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem8", name: "결과 8", image: "img/main/item/Untitled-8.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66", "106","165","231"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem9", name: "결과 9", image: "img/main/item/Untitled-9.png" ,boilerType: "일반", capacitySelection: "난방면적기준", areaselection: ["106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem10", name: "결과 10", image: "img/main/item/Untitled-10.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem11", name: "결과 11", image: "img/main/item/Untitled-11.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem12", name: "결과 12", image: "img/main/item/Untitled-12.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem13", name: "결과 13", image: "img/main/item/Untitled-13.png" ,boilerType: "콘덴싱", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C","3단계"]},
      { id: "mainitem14", name: "결과 14", image: "img/main/item/Untitled-14.png" ,boilerType: "일반", capacitySelection: "난방면적기준", areaselection: ["165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기차단식",waterTemperature:  ["1°C","3단계"]},
      { id: "mainitem15", name: "결과 15", image: "img/main/item/Untitled-15.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem16", name: "결과 16", image: "img/main/item/Untitled-16.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem17", name: "결과 17", image: "img/main/item/Untitled-17.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem18", name: "결과 18", image: "img/main/item/Untitled-18.png" ,boilerType: "일반", capacitySelection: "난방면적기준", areaselection: ["231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem19", name: "결과 19", image: "img/main/item/Untitled-19.png" ,boilerType: "콘덴싱", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem20", name: "결과 20", image: "img/main/item/Untitled-20.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem21", name: "결과 21", image: "img/main/item/Untitled-21.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem22", name: "결과 22", image: "img/main/item/Untitled-22.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem23", name: "결과 23", image: "img/main/item/Untitled-23.png" ,boilerType: "콘덴싱", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem24", name: "결과 24", image: "img/main/item/Untitled-24.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: "0.5°C"},
      { id: "mainitem25", name: "결과 25", image: "img/main/item/Untitled-25.png" ,boilerType: "일반", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem26", name: "결과 26", image: "img/main/item/Untitled-26.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem27", name: "결과 27", image: "img/main/item/Untitled-27.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem28", name: "결과 28", image: "img/main/item/Untitled-28.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem29", name: "결과 29", image: "img/main/item/Untitled-29.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem30", name: "결과 30", image: "img/main/item/Untitled-30.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem31", name: "결과 31", image: "img/main/item/Untitled-31.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: "0.5°C"},
      { id: "mainitem32", name: "결과 32", image: "img/main/item/Untitled-32.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["0.5°C", "1°C","3단계"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem33", name: "결과 33", image: "img/main/item/Untitled-33.png" ,boilerType: "콘덴싱", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem34", name: "결과 34", image: "img/main/item/Untitled-34.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem35", name: "결과 35", image: "img/main/item/Untitled-35.png" ,boilerType: "일반", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem36", name: "결과 36", image: "img/main/item/Untitled-36.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem37", name: "결과 37", image: "img/main/item/Untitled-37.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: "66M²(8~20평)",InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem38", name: "결과 38", image: "img/main/item/Untitled-38.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)","198M²(60평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem39", name: "결과 39", image: "img/main/item/Untitled-39.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem40", name: "결과 40", image: "img/main/item/Untitled-40.png" ,boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)","198M²(60평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem41", name: "결과 41", image: "img/main/item/Untitled-41.png" ,boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem42", name: "결과 42", image: "img/main/item/Untitled-42.png" ,boilerType: "일반", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)","231M²(70평)","132M²(40평)","86M²(26평)","132M²(40평)","198M²(60평)"],InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem43", name: "결과 43", image: "img/main/item/Untitled-43.png" ,boilerType: "콘덴싱", capacitySelection: "온수사용량기준(동절기)", waterUsage: ["66","106","165","231","86"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C","3단계"]},
      { id: "mainitem44", boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)"],InstallationLocation: "대기개방식",waterTemperature: ["0.5°C", "1°C"], name: "결과 44", image: "img/main/item/나비엔-pro-일반-가스보일러.png" },
      { id: "mainitem45", boilerType: "콘덴싱", capacitySelection: "난방면적기준", areaselection: ["66M²(8~20평)","106M²(32평)","165M²(50평)"],InstallationLocation: "대기개방식",waterTemperature: "0.5°C", name: "결과 45", image: "img/main/item/나비엔-콘뎅싱-디럭스형-18kd.png" },
      { id: "mainitem46", boilerType: "일반", capacitySelection: "온수사용량기준(동절기)", waterUsage: "66",InstallationLocation: "대기차단식",waterTemperature: ["0.5°C", "1°C","3단계"],name: "결과 46", image: "img/main/item/나비엔-콘덴싱-기름보일러1.png" },
     // 필요에 따라 더 많은 결과 추가
    ];
  
   // 각 라디오 버튼 그룹에서 선택된 값을 얻어옴.
  const boilerType = getCheckedValue('boilerType');
  const capacitySelection = getCheckedValue('capacitySelection');
  const areaSelection = getCheckedValue('areaselection');
  const waterUsage = getCheckedValue('waterUsage');
  const installationLocation = getCheckedValue('InstallationLocation');
  const waterTemperature = getCheckedValue('waterTemperature');
  
  // 사용자 선택에 따라 결과를 필터링.
  filteredResults = allResults.filter(result => {
    const isBoilerTypeMatch =
      !boilerType ||
      (Array.isArray(result.boilerType) && result.boilerType.includes(boilerType)) ||
      result.boilerType === boilerType;
  
    const isCapacitySelectionMatch =
      !capacitySelection ||
      (Array.isArray(result.capacitySelection) && result.capacitySelection.includes(capacitySelection)) ||
      result.capacitySelection === capacitySelection;
  
    const isAreaSelectionMatch =
      (!areaSelection && !waterUsage) ||
      (Array.isArray(result.areaselection) && result.areaselection.includes(areaSelection)) ||
      result.areaselection === areaSelection;
  
    const isWaterUsageMatch =
      (!areaSelection && !waterUsage) ||
      (Array.isArray(result.waterUsage) && result.waterUsage.includes(waterUsage)) ||
      result.waterUsage === waterUsage;
  
    const isInstallationLocationMatch =
      !installationLocation ||
      (Array.isArray(result.InstallationLocation) && result.InstallationLocation.includes(installationLocation)) ||
      result.InstallationLocation === installationLocation;
  
    const isWaterTemperatureMatch =
      (Array.isArray(result.waterTemperature) && result.waterTemperature.includes(waterTemperature)) ||
      result.waterTemperature === waterTemperature;
    
    return (
      isBoilerTypeMatch &&
      isCapacitySelectionMatch &&
      isAreaSelectionMatch &&
      isWaterUsageMatch &&
      isInstallationLocationMatch &&
      isWaterTemperatureMatch
    );
  });
  
  // 필터링된 결과를 화면에 표시.
  console.log(filteredResults);

  // 필터링된 결과를 sessionStorage에 저장.
  sessionStorage.setItem('filteredResults', JSON.stringify(filteredResults));

  // 사용자 선택에 따라 결과 필터링
  //  filteredResults = allResults;
  
  // 총 결과 및 현재 결과 업데이트
  totalResults = filteredResults.length;
  goToPage(1); // 페이지 이동 시 첫 번째 페이지로 초기화
  return allResults;
  }
  
  allResults = findBoiler(); // findBoiler()의 결과를 allResults에 저장
  
  





  
  
  // compare 버튼을 찾기.
  const compareButton = document.querySelector('.compareproducts');
  
  compareButton.addEventListener('click', function() {
  // 팝업창 만들기
  const popup = document.createElement('div');
  popup.classList.add('popup');


  // 팝업을 닫는 함수 정의
  function closePopup() {
    // popup이 document.body의 자식인지 확인
    if (popup && popup.parentNode === document.body) {
      document.body.removeChild(popup);
      document.body.style.overflow = '';
      // 키 이벤트 리스너를 제거.
      document.removeEventListener('keydown', handleKeyDown);
    }
  }

  
  // '닫기' 버튼을 감싸는 박스 만들기.
  const popupinner = document.createElement('div');
  popupinner.classList.add('popupinner');
  popup.appendChild(popupinner);
  
  // 팝업을 닫는 버튼 만들기.
  const closeButton = document.createElement('button');
  closeButton.textContent = '닫기';
  closeButton.classList.add('closeButton');
  closeButton.addEventListener('click', closePopup); // 수정: 클릭 이벤트 리스너에 closePopup 함수 추가
  popupinner.appendChild(closeButton); // '닫기' 버튼을 박스 안에 추가.
  
  
  // '닫기' 버튼 클릭 이벤트 리스너
  closeButton.addEventListener('click', closePopup);
  
  // 키보드 이벤트 리스너 추가
  document.addEventListener('keydown', handleKeyDown);
  
  // 키 이벤트 처리 함수
  function handleKeyDown(event) {
    // ESC 키의 keyCode는 27.
    if (event.key === 'Escape') {
      closePopup();
    }
  }

  // 팝업 내부에 각 아이템을 담을 컨테이너 생성
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('itemContainer')  
  popupinner.appendChild(itemContainer);

  // 팝업 창의 헤더를 생성합니다.
  const popupHeader = document.createElement('div');
  popupHeader.classList.add('popupHeader');  // 추가: 팝업 헤더에 클래스 이름 추가
  itemContainer.appendChild(popupHeader);
  popupHeader.style.display = 'flex';

  // 제품명 박스를 만들고 팝업 헤더에 추가
  const productNameBox = document.createElement('div');
  productNameBox.classList.add('productNameBox');
  popupHeader.appendChild(productNameBox);

  // 제품명 박스에 "제품명" 추가
  const productNameTitle = document.createElement('p');
  productNameTitle.textContent = "제품명";
  productNameBox.appendChild(productNameTitle);

  // 결과 컨테이너들을 담는 컨테이너를 만들기.
  const resultsContainer = document.createElement('div');
  resultsContainer.classList.add('resultsContainer');
  itemContainer.appendChild(resultsContainer);
 

  
// 스펙명 박스를 만들고 결과 컨테이너에 추가
const specNameBox = document.createElement('div');
specNameBox.classList.add('specNameBox');
resultsContainer.appendChild(specNameBox);

// 구체적인 스펙명을 담은 배열
const specNames = ["난방면적", "온수기준", "대기난방식", "전력소모량", "효율등급",
"제조사", "가격", "색상", "무게", "재질", "크기" ];

// 배열을 순회하며 스펙명을 생성하여 추가
specNames.forEach(name => {
  const specName = document.createElement('p');
  specName.textContent = name;
  specNameBox.appendChild(specName);
});


// 로컬 스토리지에서 선택한 아이템의 id를 가져와 그에 해당하는 결과를 찾기.
const keys = Object.keys(localStorage);
let selectedItems = [];
keys.forEach(key => {
  if (key.startsWith('mainitem')) {
    const result = allResults.find(result => result.id === key);
    if (result) {
      result.selectedTime = Number(localStorage.getItem(key)); // 선택 시간을 결과에 추가
      selectedItems.push(result);
    }
  }
});

// 선택 시간으로 결과를 정렬
selectedItems.sort((a, b) => a.selectedTime - b.selectedTime);

// 선택된 아이템들을 팝업창에 추가
selectedItems.forEach(result => {
  // 스펙 테이블의 각 행에서 스펙명만 specNameBox에 추가
  if (result.specs) {
    Object.entries(result.specs).forEach(([key, _]) => {
      const specName = document.createElement('p');
      specName.textContent = key;
      specNameBox.appendChild(specName);
    });
  }


  // 상단 컨테이너를 만들고 결과 이미지와 이름을 추가.
const topContainer = document.createElement('div');
topContainer.classList.add('topContainer'); // 추가: 상단 컨테이너에 클래스 이름 추가

const imageElement = document.createElement('img');
imageElement.src = result.image;
imageElement.alt = result.name + ' 이미지';
topContainer.appendChild(imageElement); // 수정: 이미지를 상단 컨테이너에 추가

const resultElement = document.createElement('p');
resultElement.textContent = result.name;
resultElement.style.cursor = 'pointer';
// 결과 이름을 클릭했을 때의 이벤트 리스너를 추가합니다.
resultElement.addEventListener('click', function() {
  console.log(result.name + '의 상세 페이지로 이동합니다.');
  window.location.href = '/detail/' + result.id; // 실제 상세 페이지 URL을 설정.
});
topContainer.appendChild(resultElement); // 수정: 결과 이름을 상단 컨테이너에 추가
popupHeader.appendChild(topContainer); // 추가: 상단 컨테이너를 결과 컨테이너에 추가

// 하단 컨테이너를 만들고 스펙 테이블을 추가.
const bottomContainer = document.createElement('div');
bottomContainer.classList.add('bottomContainer'); // 추가: 하단 컨테이너에 클래스 이름 추가
const specTable = document.createElement('table');
specTable.classList.add('resultTable');

// 테이블을 담을 컨테이너를 생성합니다.
const specTableContainer = document.createElement('div');
specTableContainer.classList.add('specTableContainer');

// 테이블을 컨테이너에 추가합니다.
specTableContainer.appendChild(specTable);
bottomContainer.appendChild(specTableContainer); // 수정: 테이블을 하단 컨테이너에 추가

// 하단컨테이너를 'resultContainer'에 추가.
resultsContainer.appendChild(bottomContainer);

// 'itemContainer'에 'scroll' 이벤트 리스너를 추가합니다.
itemContainer.addEventListener('scroll', function() {
  // 스크롤 위치에 따라 'specNameBox' 및 'productNameBox'의 left 값을 itemContainer의 scrollLeft 값으로 설정.
  specNameBox.style.left = `${this.scrollLeft}px`;
  productNameBox.style.left = `${this.scrollLeft}px`;
});


  
  
  // 각 결과값에 대한 전체 설명을 관리하는 객체
    const descriptions = {
    'mainitem1': ['결과 1에 대한 설명의 첫 번째.', '-','결과 1에 대한 설명의 세 번째.','결과 1에 대한 설명의 네 번째.','결과 1에 대한 설명의 다섯 번째.','결과 1에 대한 설명의 여섯 번째.','결과 1에 대한 설명의 일곱 번째.','결과 1에 대한 설명의 여덟 번째.','결과 1에 대한 설명의 아홉 번째 .','결과 1에 대한 설명의 열 번째.','결과 1에 대한 설명의 열 한번째.'],
    'mainitem2': ['결과 2에 대한 설명의 첫 번째.', '결과 2에 대한 설명의 두 번째.','결과 2에 대한 설명의 세 번째.','결과 2에 대한 설명의 네 번째.','결과 2에 대한 설명의 다섯 번째.','결과 2에 대한 설명의 여섯 번째.','결과 2에 대한 설명의 일곱 번째.','결과 2에 대한 설명의 여덟 번째.','결과 2에 대한 설명의 아홉 번째 ','결과 2에 대한 설명의 열 번째','결과 2에 대한 설명의 열 한번째.'],
    'mainitem3': ['결과 3에 대한 설명의 첫 번째.', '결과 3에 대한 설명의 두 번째.','결과 3에 대한 설명의 세 번째.','결과3 에 대한 설명의 네 번째.','결과 3에 대한 설명의 다섯 번째.','결과 3에 대한 설명의 여섯 번째.','결과 3에 대한 설명의 일곱 번째.','결과 3에 대한 설명의 여덟 번째.','결과 3에 대한 설명의 아홉 번째.','결과 3에 대한 설명의 열 번째','결과 3에 대한 설명의 열 한번째.'],
    'mainitem4': ['결과 4에 대한 설명의 첫 번째.', '결과 4에 대한 설명의 두 번째.','결과 4에 대한 설명의 세 번째.','결과 4에 대한 설명의 네 번째.','결과 4에 대한 설명의 다섯 번째.','결과 4에 대한 설명의 여섯 번째.','결과 4에 대한 설명의 일곱 번째.','결과 4에 대한 설명의 여덟 번째.','결과 4에 대한 설명의 아홉 번째','결과 4에 대한 설명의 열 번째.','결과 4에 대한 설명의 열 한번째.'],
    'mainitem5': ['결과 5에 대한 설명의 첫 번째.', '결과 5에 대한 설명의 두 번째.','결과 5에 대한 설명의 세 번째.','결과 5에 대한 설명의 네 번째.','결과 5에 대한 설명의 다섯 번째.','결과 5에 대한 설명의 여섯 번째.','결과 5에 대한 설명의 일곱 번째.','결과 5에 대한 설명의 여덟 번째.','결과 5에 대한 설명의 아홉 번째','결과 5에 대한 설명의 열 번째','결과 5에 대한 설명의 열 한번째.'],
    'mainitem6': ['결과 6에 대한 설명의 첫 번째.', '결과 6에 대한 설명의 두 번째.','결과 6에 대한 설명의 세 번째.','결과 6에 대한 설명의 네 번째.','결과 6에 대한 설명의 다섯 번째.','결과 6에 대한 설명의 여섯 번째.','결과 6에 대한 설명의 일곱 번째.','결과 6에 대한 설명의 여덟 번째.','결과 6에 대한 설명의 아홉 번째 ','결과 6에 대한 설명의 열 번째.','결과 6에 대한 설명의 열 한번째.'],
    'mainitem7': ['결과 7에 대한 설명의 첫 번째.', '결과 7에 대한 설명의 두 번째.','결과 7에 대한 설명의 세 번째.','결과 7에 대한 설명의 네 번째.','결과 7에 대한 설명의 다섯 번째.','결과 7에 대한 설명의 여섯 번째.','결과 7에 대한 설명의 일곱 번째.','결과 7에 대한 설명의 여덟 번째.','결과 7에 대한 설명의 아홉 번째 ','결과 7에 대한 설명의 열 번째.','결과 7에 대한 설명의 열 한번째.'],
    'mainitem8': ['결과 8에 대한 설명의 첫 번째.', '결과 8에 대한 설명의 두 번째.','결과 8에 대한 설명의 세 번째.','결과 8에 대한 설명의 네 번째.','결과 8에 대한 설명의 다섯 번째.','결과 8에 대한 설명의 여섯 번째.','결과 8에 대한 설명의 일곱 번째.','결과 8에 대한 설명의 여덟 번째.','결과 8에 대한 설명의 아홉 번째 ','결과 8에 대한 설명의 열 번째.','결과 8에 대한 설명의 열 한번째.'],
    'mainitem9': ['결과 9에 대한 설명의 첫 번째.', '결과 9에 대한 설명의 두 번째.','결과 9에 대한 설명의 세 번째.','결과 9에 대한 설명의 네 번째.','결과 9에 대한 설명의 다섯 번째.','결과 9에 대한 설명의 여섯 번째.','결과 9에 대한 설명의 일곱 번째.','결과 9에 대한 설명의 여덟 번째.','결과 9에 대한 설명의 아홉 번째 ','결과 9에 대한 설명의 열 번째','결과 9에 대한 설명의 열 한번째.'],
    'mainitem10': ['결과 10에 대한 설명의 첫 번째.', '결과 10에 대한 설명의 두 번째.','결과 10에 대한 설명의 세 번째.','결과 10에 대한 설명의 네 번째.','결과 10에 대한 설명의 다섯 번째.','결과 10에 대한 설명의 여섯 번째.','결과 10에 대한 설명의 일곱 번째.','결과 10에 대한 설명의 여덟 번째.','결과 10에 대한 설명의 아홉 번째 ','결과 10에 대한 설명의 열 번째','결과 10에 대한 설명의 열 한번째.'],
    'mainitem11': ['결과 11에 대한 설명의 첫 번째.', '결과 11에 대한 설명의 두 번째.','결과 11에 대한 설명의 세 번째.','결과 11에 대한 설명의 네 번째.','결과 11에 대한 설명의 다섯 번째.','결과 11에 대한 설명의 여섯 번째.','결과 11에 대한 설명의 일곱 번째.','결과 11에 대한 설명의 여덟 번째.','결과 11에 대한 설명의 아홉 번째 ','결과 11에 대한 설명의 열 번째','결과 11에 대한 설명의 열 한번째.'],
    'mainitem12': ['결과 12에 대한 설명의 첫 번째.', '결과 12에 대한 설명의 두 번째.','결과 12에 대한 설명의 세 번째.','결과 12에 대한 설명의 네 번째.','결과 12에 대한 설명의 다섯 번째.','결과 12에 대한 설명의 여섯 번째.','결과 12에 대한 설명의 일곱 번째.','결과 12에 대한 설명의 여덟 번째.','결과 12에 대한 설명의 아홉 번째 ','결과 12에 대한 설명의 열 번째','결과 12에 대한 설명의 열 한번째.'],
    'mainitem13': ['결과 13에 대한 설명의 첫 번째.', '결과 13에 대한 설명의 두 번째.','결과 13에 대한 설명의 세 번째.','결과 13에 대한 설명의 네 번째.','결과 13에 대한 설명의 다섯 번째.','결과 13에 대한 설명의 여섯 번째.','결과 13에 대한 설명의 일곱 번째.','결과 13에 대한 설명의 여덟 번째.','결과 13에 대한 설명의 아홉 번째 ','결과 13에 대한 설명의 열 번째','결과 13에 대한 설명의 열 한번째.'],
    'mainitem14': ['결과 14에 대한 설명의 첫 번째.', '결과 14에 대한 설명의 두 번째.','결과 14에 대한 설명의 세 번째.','결과 14에 대한 설명의 네 번째.','결과 14에 대한 설명의 다섯 번째.','결과 14에 대한 설명의 여섯 번째.','결과 14에 대한 설명의 일곱 번째.','결과 14에 대한 설명의 여덟 번째.','결과 14에 대한 설명의 아홉 번째 ','결과 14에 대한 설명의 열 번째','결과 14에 대한 설명의 열 한번째.'],
    'mainitem15': ['결과 15에 대한 설명의 첫 번째.', '결과 15에 대한 설명의 두 번째.','결과 15에 대한 설명의 세 번째.','결과 15에 대한 설명의 네 번째.','결과 15에 대한 설명의 다섯 번째.','결과 15에 대한 설명의 여섯 번째.','결과 15에 대한 설명의 일곱 번째.','결과 15에 대한 설명의 여덟 번째.','결과 15에 대한 설명의 아홉 번째 ','결과 15에 대한 설명의 열 번째','결과 15에 대한 설명의 열 한번째.'],
    'mainitem16': ['결과 16에 대한 설명의 첫 번째.', '결과 16에 대한 설명의 두 번째.','결과 16에 대한 설명의 세 번째.','결과 16에 대한 설명의 네 번째.','결과 16에 대한 설명의 다섯 번째.','결과 16에 대한 설명의 여섯 번째.','결과 16에 대한 설명의 일곱 번째.','결과 16에 대한 설명의 여덟 번째.','결과 16에 대한 설명의 아홉 번째 ','결과 16에 대한 설명의 열 번째','결과 16에 대한 설명의 열 한번째.'],
    'mainitem17': ['결과 17에 대한 설명의 첫 번째.', '결과 17에 대한 설명의 두 번째.','결과 17에 대한 설명의 세 번째.','결과 17에 대한 설명의 네 번째.','결과 17에 대한 설명의 다섯 번째.','결과 17에 대한 설명의 여섯 번째.','결과 17에 대한 설명의 일곱 번째.','결과 17에 대한 설명의 여덟 번째.','결과 17에 대한 설명의 아홉 번째 ','결과 17에 대한 설명의 열 번째','결과 17에 대한 설명의 열 한번째.'],
    'mainitem18': ['결과 18에 대한 설명의 첫 번째.', '결과 18에 대한 설명의 두 번째.','결과 18에 대한 설명의 세 번째.','결과 18에 대한 설명의 네 번째.','결과 18에 대한 설명의 다섯 번째.','결과 18에 대한 설명의 여섯 번째.','결과 18에 대한 설명의 일곱 번째.','결과 18에 대한 설명의 여덟 번째.','결과 18에 대한 설명의 아홉 번째 ','결과 18에 대한 설명의 열 번째','결과 18에 대한 설명의 열 한번째.'],
    'mainitem19': ['결과 19에 대한 설명의 첫 번째.', '결과 19에 대한 설명의 두 번째.','결과 19에 대한 설명의 세 번째.','결과 19에 대한 설명의 네 번째.','결과 19에 대한 설명의 다섯 번째.','결과 19에 대한 설명의 여섯 번째.','결과 19에 대한 설명의 일곱 번째.','결과 19에 대한 설명의 여덟 번째.','결과 19에 대한 설명의 아홉 번째 ','결과 19에 대한 설명의 열 번째','결과 19에 대한 설명의 열 한번째.'],
    'mainitem20': ['결과 20에 대한 설명의 첫 번째.', '결과 20에 대한 설명의 두 번째.','결과 20에 대한 설명의 세 번째.','결과 20에 대한 설명의 네 번째.','결과 20에 대한 설명의 다섯 번째.','결과 20에 대한 설명의 여섯 번째.','결과 20에 대한 설명의 일곱 번째.','결과 20에 대한 설명의 여덟 번째.','결과 20에 대한 설명의 아홉 번째 ','결과 20에 대한 설명의 열 번째','결과 20에 대한 설명의 열 한번째.'],
    'mainitem21': ['결과 21에 대한 설명의 첫 번째.', '결과 21에 대한 설명의 두 번째.','결과 21에 대한 설명의 세 번째.','결과 21에 대한 설명의 네 번째.','결과 21에 대한 설명의 다섯 번째.','결과 21에 대한 설명의 여섯 번째.','결과 21에 대한 설명의 일곱 번째.','결과 21에 대한 설명의 여덟 번째.','결과 21에 대한 설명의 아홉 번째 ','결과 21에 대한 설명의 열 번째','결과 21에 대한 설명의 열 한번째.'],
    'mainitem22': ['결과 22에 대한 설명의 첫 번째.', '결과 22에 대한 설명의 두 번째.','결과 22에 대한 설명의 세 번째.','결과 22에 대한 설명의 네 번째.','결과 22에 대한 설명의 다섯 번째.','결과 22에 대한 설명의 여섯 번째.','결과 22에 대한 설명의 일곱 번째.','결과 22에 대한 설명의 여덟 번째.','결과 22에 대한 설명의 아홉 번째 ','결과 22에 대한 설명의 열 번째','결과 22에 대한 설명의 열 한번째.'],
    'mainitem23': ['결과 23에 대한 설명의 첫 번째.', '결과 23에 대한 설명의 두 번째.','결과 23에 대한 설명의 세 번째.','결과 23에 대한 설명의 네 번째.','결과 23에 대한 설명의 다섯 번째.','결과 23에 대한 설명의 여섯 번째.','결과 23에 대한 설명의 일곱 번째.','결과 23에 대한 설명의 여덟 번째.','결과 23에 대한 설명의 아홉 번째 ','결과 23에 대한 설명의 열 번째','결과 23에 대한 설명의 열 한번째.'],
    'mainitem24': ['결과 24에 대한 설명의 첫 번째.', '결과 24에 대한 설명의 두 번째.','결과 24에 대한 설명의 세 번째.','결과 24에 대한 설명의 네 번째.','결과 24에 대한 설명의 다섯 번째.','결과 24에 대한 설명의 여섯 번째.','결과 24에 대한 설명의 일곱 번째.','결과 24에 대한 설명의 여덟 번째.','결과 24에 대한 설명의 아홉 번째 ','결과 24에 대한 설명의 열 번째','결과 24에 대한 설명의 열 한번째.'],
    'mainitem25': ['결과 25에 대한 설명의 첫 번째.', '결과 25에 대한 설명의 두 번째.','결과 25에 대한 설명의 세 번째.','결과 25에 대한 설명의 네 번째.','결과 25에 대한 설명의 다섯 번째.','결과 25에 대한 설명의 여섯 번째.','결과 25에 대한 설명의 일곱 번째.','결과 25에 대한 설명의 여덟 번째.','결과 25에 대한 설명의 아홉 번째 ','결과 25에 대한 설명의 열 번째','결과 25에 대한 설명의 열 한번째.'],
    'mainitem26': ['결과 26에 대한 설명의 첫 번째.', '결과 26에 대한 설명의 두 번째.','결과 26에 대한 설명의 세 번째.','결과 26에 대한 설명의 네 번째.','결과 26에 대한 설명의 다섯 번째.','결과 26에 대한 설명의 여섯 번째.','결과 26에 대한 설명의 일곱 번째.','결과 26에 대한 설명의 여덟 번째.','결과 26에 대한 설명의 아홉 번째 ','결과 26에 대한 설명의 열 번째','결과 26에 대한 설명의 열 한번째.'],
    'mainitem27': ['결과 27에 대한 설명의 첫 번째.', '결과 27에 대한 설명의 두 번째.','결과 27에 대한 설명의 세 번째.','결과 27에 대한 설명의 네 번째.','결과 27에 대한 설명의 다섯 번째.','결과 27에 대한 설명의 여섯 번째.','결과 27에 대한 설명의 일곱 번째.','결과 27에 대한 설명의 여덟 번째.','결과 27에 대한 설명의 아홉 번째 ','결과 27에 대한 설명의 열 번째','결과 27에 대한 설명의 열 한번째.'],
    'mainitem28': ['결과 28에 대한 설명의 첫 번째.', '결과 28에 대한 설명의 두 번째.','결과 28에 대한 설명의 세 번째.','결과 28에 대한 설명의 네 번째.','결과 28에 대한 설명의 다섯 번째.','결과 28에 대한 설명의 여섯 번째.','결과 28에 대한 설명의 일곱 번째.','결과 28에 대한 설명의 여덟 번째.','결과 28에 대한 설명의 아홉 번째 ','결과 28에 대한 설명의 열 번째','결과 28에 대한 설명의 열 한번째.'],
    'mainitem29': ['결과 29에 대한 설명의 첫 번째.', '결과 29에 대한 설명의 두 번째.','결과 29에 대한 설명의 세 번째.','결과 29에 대한 설명의 네 번째.','결과 29에 대한 설명의 다섯 번째.','결과 29에 대한 설명의 여섯 번째.','결과 29에 대한 설명의 일곱 번째.','결과 29에 대한 설명의 여덟 번째.','결과 29에 대한 설명의 아홉 번째 ','결과 29에 대한 설명의 열 번째','결과 29에 대한 설명의 열 한번째.'],
    'mainitem30': ['결과 30에 대한 설명의 첫 번째.', '결과 30에 대한 설명의 두 번째.','결과 30에 대한 설명의 세 번째.','결과 30에 대한 설명의 네 번째.','결과 30에 대한 설명의 다섯 번째.','결과 30에 대한 설명의 여섯 번째.','결과 30에 대한 설명의 일곱 번째.','결과 30에 대한 설명의 여덟 번째.','결과 30에 대한 설명의 아홉 번째 ','결과 30에 대한 설명의 열 번째','결과 30에 대한 설명의 열 한번째.'],
    'mainitem31': ['결과 31에 대한 설명의 첫 번째.', '결과 31에 대한 설명의 두 번째.','결과 31에 대한 설명의 세 번째.','결과 31에 대한 설명의 네 번째.','결과 31에 대한 설명의 다섯 번째.','결과 31에 대한 설명의 여섯 번째.','결과 31에 대한 설명의 일곱 번째.','결과 31에 대한 설명의 여덟 번째.','결과 31에 대한 설명의 아홉 번째 ','결과 31에 대한 설명의 열 번째','결과 31에 대한 설명의 열 한번째.'],
    'mainitem32': ['결과 32에 대한 설명의 첫 번째.', '결과 32에 대한 설명의 두 번째.','결과 32에 대한 설명의 세 번째.','결과 32에 대한 설명의 네 번째.','결과 32에 대한 설명의 다섯 번째.','결과 32에 대한 설명의 여섯 번째.','결과 32에 대한 설명의 일곱 번째.','결과 32에 대한 설명의 여덟 번째.','결과 32에 대한 설명의 아홉 번째 ','결과 32에 대한 설명의 열 번째','결과 32에 대한 설명의 열 한번째.'],
    'mainitem33': ['결과 33에 대한 설명의 첫 번째.', '결과 33에 대한 설명의 두 번째.','결과 33에 대한 설명의 세 번째.','결과 33에 대한 설명의 네 번째.','결과 33에 대한 설명의 다섯 번째.','결과 33에 대한 설명의 여섯 번째.','결과 33에 대한 설명의 일곱 번째.','결과 33에 대한 설명의 여덟 번째.','결과 33에 대한 설명의 아홉 번째 ','결과 33에 대한 설명의 열 번째','결과 33에 대한 설명의 열 한번째.'],
    'mainitem34': ['결과 34에 대한 설명의 첫 번째.', '결과 34에 대한 설명의 두 번째.','결과 34에 대한 설명의 세 번째.','결과 34에 대한 설명의 네 번째.','결과 34에 대한 설명의 다섯 번째.','결과 34에 대한 설명의 여섯 번째.','결과 34에 대한 설명의 일곱 번째.','결과 34에 대한 설명의 여덟 번째.','결과 34에 대한 설명의 아홉 번째 ','결과 34에 대한 설명의 열 번째','결과 34에 대한 설명의 열 한번째.'],
    'mainitem35': ['결과 35에 대한 설명의 첫 번째.', '결과 35에 대한 설명의 두 번째.','결과 35에 대한 설명의 세 번째.','결과 35에 대한 설명의 네 번째.','결과 35에 대한 설명의 다섯 번째.','결과 35에 대한 설명의 여섯 번째.','결과 35에 대한 설명의 일곱 번째.','결과 35에 대한 설명의 여덟 번째.','결과 35에 대한 설명의 아홉 번째 ','결과 35에 대한 설명의 열 번째','결과 35에 대한 설명의 열 한번째.'],
    'mainitem36': ['결과 36에 대한 설명의 첫 번째.', '결과 36에 대한 설명의 두 번째.','결과 36에 대한 설명의 세 번째.','결과 36에 대한 설명의 네 번째.','결과 36에 대한 설명의 다섯 번째.','결과 36에 대한 설명의 여섯 번째.','결과 36에 대한 설명의 일곱 번째.','결과 36에 대한 설명의 여덟 번째.','결과 36에 대한 설명의 아홉 번째 ','결과 36에 대한 설명의 열 번째','결과 36에 대한 설명의 열 한번째.'],
    'mainitem37': ['결과 37에 대한 설명의 첫 번째.', '결과 37에 대한 설명의 두 번째.','결과 37에 대한 설명의 세 번째.','결과 37에 대한 설명의 네 번째.','결과 37에 대한 설명의 다섯 번째.','결과 37에 대한 설명의 여섯 번째.','결과 37에 대한 설명의 일곱 번째.','결과 37에 대한 설명의 여덟 번째.','결과 37에 대한 설명의 아홉 번째 ','결과 37에 대한 설명의 열 번째','결과 37에 대한 설명의 열 한번째.'],
    'mainitem38': ['결과 38에 대한 설명의 첫 번째.', '결과 38에 대한 설명의 두 번째.','결과 38에 대한 설명의 세 번째.','결과 38에 대한 설명의 네 번째.','결과 38에 대한 설명의 다섯 번째.','결과 38에 대한 설명의 여섯 번째.','결과 38에 대한 설명의 일곱 번째.','결과 38에 대한 설명의 여덟 번째.','결과 38에 대한 설명의 아홉 번째 ','결과 38에 대한 설명의 열 번째','결과 38에 대한 설명의 열 한번째.'],
    'mainitem39': ['결과 39에 대한 설명의 첫 번째.', '결과 39에 대한 설명의 두 번째.','결과 39에 대한 설명의 세 번째.','결과 39에 대한 설명의 네 번째.','결과 39에 대한 설명의 다섯 번째.','결과 39에 대한 설명의 여섯 번째.','결과 39에 대한 설명의 일곱 번째.','결과 39에 대한 설명의 여덟 번째.','결과 39에 대한 설명의 아홉 번째 ','결과 39에 대한 설명의 열 번째','결과 39에 대한 설명의 열 한번째.'],
    'mainitem40': ['결과 40에 대한 설명의 첫 번째.', '결과 40에 대한 설명의 두 번째.','결과 40에 대한 설명의 세 번째.','결과 40에 대한 설명의 네 번째.','결과 40에 대한 설명의 다섯 번째.','결과 40에 대한 설명의 여섯 번째.','결과 40에 대한 설명의 일곱 번째.','결과 40에 대한 설명의 여덟 번째.','결과 40에 대한 설명의 아홉 번째 ','결과 40에 대한 설명의 열 번째','결과 40에 대한 설명의 열 한번째.'],
    'mainitem41': ['결과 41에 대한 설명의 첫 번째.', '결과 41에 대한 설명의 두 번째.','결과 41에 대한 설명의 세 번째.','결과 41에 대한 설명의 네 번째.','결과 41에 대한 설명의 다섯 번째.','결과 41에 대한 설명의 여섯 번째.','결과 41에 대한 설명의 일곱 번째.','결과 41에 대한 설명의 여덟 번째.','결과 41에 대한 설명의 아홉 번째 ','결과 41에 대한 설명의 열 번째','결과 41에 대한 설명의 열 한번째.'],
    'mainitem42': ['결과 42에 대한 설명의 첫 번째.', '결과 42에 대한 설명의 두 번째.','결과 42에 대한 설명의 세 번째.','결과 42에 대한 설명의 네 번째.','결과 42에 대한 설명의 다섯 번째.','결과 42에 대한 설명의 여섯 번째.','결과 42에 대한 설명의 일곱 번째.','결과 42에 대한 설명의 여덟 번째.','결과 42에 대한 설명의 아홉 번째 ','결과 42에 대한 설명의 열 번째','결과 42에 대한 설명의 열 한번째.'],
    'mainitem43': ['결과 43에 대한 설명의 첫 번째.', '결과 43에 대한 설명의 두 번째.','결과 43에 대한 설명의 세 번째.','결과 43에 대한 설명의 네 번째.','결과 43에 대한 설명의 다섯 번째.','결과 43에 대한 설명의 여섯 번째.','결과 43에 대한 설명의 일곱 번째.','결과 43에 대한 설명의 여덟 번째.','결과 43에 대한 설명의 아홉 번째 ','결과 43에 대한 설명의 열 번째','결과 43에 대한 설명의 열 한번째.'],
    'mainitem44': ['결과 44에 대한 설명의 첫 번째.', '결과 44에 대한 설명의 두 번째.','결과 44에 대한 설명의 세 번째.','결과 44에 대한 설명의 네 번째.','결과 44에 대한 설명의 다섯 번째.','결과 44에 대한 설명의 여섯 번째.','결과 44에 대한 설명의 일곱 번째.','결과 44에 대한 설명의 여덟 번째.','결과 44에 대한 설명의 아홉 번째 ','결과 44에 대한 설명의 열 번째','결과 44에 대한 설명의 열 한번째.'],
    'mainitem45': ['결과 45에 대한 설명의 첫 번째.', '결과 45에 대한 설명의 두 번째.','결과 45에 대한 설명의 세 번째.','결과 45에 대한 설명의 네 번째.','결과 45에 대한 설명의 다섯 번째.','결과 45에 대한 설명의 여섯 번째.','결과 45에 대한 설명의 일곱 번째.','결과 45에 대한 설명의 여덟 번째.','결과 45에 대한 설명의 아홉 번째 ','결과 45에 대한 설명의 열 번째','결과 45에 대한 설명의 열 한번째.'],
    'mainitem46': ['결과 46에 대한 설명의 첫 번째.', '결과 46에 대한 설명의 두 번째.','결과 46에 대한 설명의 세 번째.','결과 46에 대한 설명의 네 번째.','결과 46에 대한 설명의 다섯 번째.','결과 46에 대한 설명의 여섯 번째.','결과 46에 대한 설명의 일곱 번째.','결과 46에 대한 설명의 여덟 번째.','결과 46에 대한 설명의 아홉 번째 ','결과 46에 대한 설명의 열 번째','결과 46에 대한 설명의 열 한번째.'],
    // 추가적인 결과값에 대한 설명...
    };
  
  // 결과값에 대응하는 설명을 테이블에 추가.
  if (descriptions[result.id]) {
    descriptions[result.id].forEach(desc => {
      const descRow = document.createElement('tr');

      const descCell = document.createElement('td');
      descCell.textContent = desc; // 결과값에 대응하는 설명의 한 부분을 가져오기
      descRow.appendChild(descCell);

      specTable.appendChild(descRow);
    });
  }

  if (result.specs) {
    // 나머지 스펙을 테이블에 추가.
    Object.entries(result.specs).forEach(([key, value]) => {
      const row = document.createElement('tr');

      const specNameCell = document.createElement('td');
      specNameCell.textContent = key;
      row.appendChild(specNameCell);

      const specValueCell = document.createElement('td');
      specValueCell.textContent = value;
      row.appendChild(specValueCell);

      specTable.appendChild(row);
    });
  }
});
  
  
  // 선택된 제품이 없다면 팝업창을 열지 않는다.
if (selectedItems.length === 0) {
  alert('선택된 제품이 없습니다. 제품을 선택한 후 다시 시도해주세요.');
  return;
}

// 팝업창을 body에 추가.
document.body.appendChild(popup);
document.body.style.overflow = 'hidden';  // 팝업이 열릴 때 overflow 설정
});



function createEmptyGridItem() {
  const emptyItem = document.createElement('div');
  emptyItem.classList.add('result-item', 'empty');
  return emptyItem;
}
  



  function restoreSelections() {
    // 모든 체크박스를 찾기.
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // 각 체크박스에 대해
    checkboxes.forEach(checkbox => {
      // 체크박스의 ID를 가져옴.
      const id = checkbox.getAttribute('data-result-id');
      
      // 로컬 스토리지에서 해당 ID의 값을 가져옴.
      const value = localStorage.getItem(id);
      
      // 값이 있다면 체크박스를 체크 상태로 설정하고, 없다면 체크 해제 상태로 설정.
      checkbox.checked = value !== null;
      
      // 체크박스의 텍스트를 적절하게 설정.
      const checkboxText = checkbox.nextElementSibling.nextElementSibling; // .checkmark 다음에 있는 .checkbox-text 선택
      checkboxText.textContent = value !== null ? '선택됨' : '비교하기 선택';
    });
  } 
  
  // 결과 표시
  function displayResults() {
  // 결과 컨테이너를 찾기.
  const resultContainer = document.querySelector('.result-container');
  const noResultsMessage = document.getElementById('no-results');
  
  if (noResultsMessage === null) {
    console.error('no-results 엘리먼트를 찾을 수 없습니다.');
    return;
  }
  
  // 검색 결과의 개수를 카운트.
  const resultCount = filteredResults.length;
  
  // 결과 개수를 화면에 표시.
  const resultCountElement = document.getElementById('result-count');
  resultCountElement.textContent = resultCount;
  
  // 결과 컨테이너 내부를 먼저 비우기.
  resultContainer.innerHTML = '';
  
  // 현재 페이지에 맞는 결과들을 가져옴.
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);
  
  if (currentResults.length === 0) {
  // 결과가 없으면 메시지를 보여줌.
  noResultsMessage.style.display = 'block';
  
  // 결과가 없을 때도 빈 그리드 아이템을 추가.
  for (let i = 0; i < resultsPerPage; i++) {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item', 'empty');
    resultContainer.appendChild(resultItem);
  }
  } else {
  // 결과가 있으면 메시지를 숨김.
  noResultsMessage.style.display = 'none';
  
  // 가져온 결과들을 화면에 표시.
  currentResults.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
  
  
    // 모듈화된 체크박스 (셀렉트 박스) 생성
    const selectLabel = document.createElement('label');
    selectLabel.classList.add('select');
  
    const selectCheckbox = document.createElement('input');
    selectCheckbox.setAttribute('type', 'checkbox');
    selectCheckbox.setAttribute('data-result-id', result.id); // ID 설정
    selectLabel.appendChild(selectCheckbox);
  
    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');
    selectLabel.appendChild(checkmark);
  
    // 체크박스 레이블에 텍스트용 span 요소 추가
    const checkboxText = document.createElement('span');
    checkboxText.classList.add('checkbox-text');
    checkboxText.textContent = '비교하기 선택'; // 기본 텍스트
    selectLabel.appendChild(checkboxText); // 레이블에 텍스트 추가
  
    // 체크박스 변경 이벤트 리스너
    selectCheckbox.addEventListener('change', function() {
      if (this.checked) {
        localStorage.setItem(this.getAttribute('data-result-id'), Date.now());// 선택 상태 저장
        checkboxText.textContent = '선택됨'; // 체크 시 텍스트
        console.log(result.name + '이(가) 선택되었습니다.');
        // 선택 로직을 여기에 추가.
      } else {
        localStorage.removeItem(this.getAttribute('data-result-id')); // 선택 해제 상태 저장
        checkboxText.textContent = '비교하기 선택'; // 체크 해제 시 텍스트
        console.log(result.name + ' 선택이 취소되었습니다.');
        // 선택 취소 로직을 여기에 추가.
      }
    });
  
    // 체크박스를 결과 아이템에 추가
    resultItem.appendChild(selectLabel);
  
    
    // 이미지 요소를 만들고 속성을 설정.
    const imageElement = document.createElement('img');
    imageElement.src = result.image;
    imageElement.alt = result.name + ' 이미지';
    resultItem.appendChild(imageElement);
  
    // 상세 페이지 이동 버튼을 만들고 이벤트 리스너를 추가.
    const detailButton = document.createElement('div');
    detailButton.classList.add('detail-page');
    detailButton.textContent = '자세히보기';
  
    // 상세 페이지 이동 버튼 클릭시 로직을 처리할 이벤트 리스너를 추가.
    detailButton.addEventListener('click', function() {
    console.log(result.name + '의 상세 페이지로 이동합니다.');
    // 여기서 result.id는 각 결과 아이템의 고유한 식별자여야 함.
    window.location.href = '/detail/' + result.id; // 실제 상세 페이지 URL을 설정.
    });
    resultItem.appendChild(detailButton);
  
      // 완성된 결과 아이템을 결과 컨테이너에 추가.
      resultContainer.appendChild(resultItem);
    });

    // 체크박스 상태 복원 호출
     restoreSelections();

  
    // 남은 그리드 아이템을 보일러플레이트 아이템으로 채움.
    for (let i = currentResults.length; i < resultsPerPage; i++) {
      resultContainer.appendChild(createEmptyGridItem());
    }
    
    // 다시선택버튼 클릭 이벤트 리스너
    function setupSelectAgainButton() {
    const selectAgainButton = document.querySelector('.selectagain');
  
        if (selectAgainButton) {
          selectAgainButton.addEventListener('click', function() {
            // 모든 .select 클래스를 가진 체크박스들을 찾아서 해제
            const selectCheckboxes = document.querySelectorAll('.select input[type="checkbox"]');
            selectCheckboxes.forEach(function(checkbox) {
              checkbox.checked = false;
          
              // 체크박스의 텍스트를 원래대로 변경
              const checkboxText = checkbox.nextElementSibling.nextElementSibling; // .checkmark 다음에 있는 .checkbox-text 선택
              checkboxText.textContent = '비교하기 선택';
      
              // 선택된 결과를 로컬 스토리지에서 제거
              const resultId = checkbox.getAttribute('data-result-id');
              localStorage.removeItem(resultId);
            });
      
            // 로컬 스토리지에 저장된 모든 값 제거
            // localStorage.clear();
          
            console.log('비교하기 선택이 취소되었습니다.');
            // 선택 취소 로직을 여기에 추가.
      
            // 로컬 스토리지의 모든 키를 가져오기.
              const keys = Object.keys(localStorage);
      
              // 각 키에 대해
              keys.forEach(key => {
                // 만약 키가 'mainitem'으로 시작한다면
                if (key.startsWith('mainitem')) {
                  // 그 키에 해당하는 데이터를 삭제.
                  localStorage.removeItem(key);
                }
              });
          });
        }
    }
  
    // 페이지 로드 시 또는 콘텐츠가 동적으로 로드된 후에 함수를 호출
    setupSelectAgainButton();
    }
  } 


// 페이지네이션 표시
function displayPagination() {
const paginationContainer = document.querySelector('.pagination');
paginationContainer.innerHTML = '';

const totalPages = Math.ceil(totalResults / resultsPerPage);

// 첫 페이지로 이동 버튼
const firstPageButton = document.createElement('div');
firstPageButton.innerHTML = '<img src="img/main/productselectionpointleftleft.png" alt="첫페이지이동버튼">';
firstPageButton.className = "firstPageButton";
firstPageButton.addEventListener('click', () => goToPage(1));
paginationContainer.appendChild(firstPageButton);

// 이전 페이지 버튼
const prevButton = document.createElement('div');
prevButton.className = "prevButton"
prevButton.innerHTML = '<img src="img/main/productselectionpointleft.png" alt="이전페이지이동버튼">';
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
});
paginationContainer.appendChild(prevButton);

// 페이지 번호 및 전체 페이지 수 표시
const pageIndicator = document.createElement('span');
pageIndicator.innerHTML = `<span style="color: #f97b0b; position: relative; left: -px;">${currentPage}</span>/${totalPages}`;
pageIndicator.style.fontSize = "12px";
pageIndicator.style.color = "gray";
paginationContainer.appendChild(pageIndicator);

// 페이지 번호 버튼
for (let i = 1; i <= totalPages; i++) {
  const pageButton = document.createElement('div');
  pageButton.textContent = i;
  if (i === currentPage) {
    pageButton.style.color = "#f97b0b"; //현재 페이지일 때 색상
  }
  pageButton.className = "pageButton"
  pageButton.addEventListener('click', () => goToPage(i));
  paginationContainer.appendChild(pageButton);
}

// 다음 페이지 버튼
const nextButton = document.createElement('div');
nextButton.innerHTML = '<img src="img/main/productselectionpointright.png" alt="다음페이지이동버튼">';
nextButton.className = "nextButton"
nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
});
paginationContainer.appendChild(nextButton);

 // 끝 페이지로 이동 버튼
 const lastPageButton = document.createElement('div');
 lastPageButton.className = "lastPageButton"
 lastPageButton.innerHTML = '<img src="img/main/productselectionpointrightright.png" alt="끝페이지이동버튼">';
 lastPageButton.addEventListener('click', () => goToPage(totalPages));
 paginationContainer.appendChild(lastPageButton);
}

// 특정 페이지로 이동
function goToPage(page) {
currentPage = page;
displayResults();
displayPagination();
// 체크박스 상태를 복원.
  restoreSelections();
}

// 초기 로드 시 보일러 찾기 실행
// findBoiler();
// //main