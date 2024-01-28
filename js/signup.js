document.getElementById('email-domain').addEventListener('change', function() {
  var emailInput = document.getElementById('email');
  if (this.value === '') {
    // 직접 입력이 선택된 경우, 이메일 입력 필드를 활성화.
    emailInput.disabled = false;
    // 이메일 입력 필드의 도메인 부분을 삭제.
    var currentEmail = emailInput.value;
    var atIndex = currentEmail.indexOf('@');
    // '@' 기호가 있을 경우, 그 앞부분만 남김.
    if (atIndex > -1) {
      emailInput.value = currentEmail.slice(0, atIndex);
    }
    emailInput.focus();
  } else {
    // 특정 도메인이 선택된 경우, 선택된 도메인을 이메일 입력 필드에 추가.
    var existingEmail = emailInput.value;
    var atSymbolIndex = existingEmail.indexOf('@');
    // 이미 '@' 기호가 있다면, 도메인을 변경.
    if (atSymbolIndex > -1) {
      emailInput.value = existingEmail.slice(0, atSymbolIndex) + this.value;
    } else {
      // '@' 기호가 없다면, 도메인을 새롭게 추가.
      emailInput.value = existingEmail + this.value;
    }
    emailInput.disabled = false; // 사용자가 필요에 따라 수정할 수 있도록 필드를 활성화.
  }
});
// //email_input





// 문서가 로드되면 아래 코드 실행
document.addEventListener('DOMContentLoaded', function () {
  // 이메일 입력 필드와 도메인 선택 필드를 가져옴.
  const email = document.querySelector('#email');
  const emailDomain = document.querySelector('#email-domain');

  // setTimeout 함수의 반환 값(타이머 ID)를 저장할 변수를 선언.
  let timeoutId;

  // 이메일 주소의 형식을 검사하는 함수를 선언.
  const checkEmailFormat = function() {
    // 이메일 주소의 형식을 정의하는 정규 표현식.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 이메일 입력 필드가 비어있지 않다면 이메일 주소의 형식을 검사합니다.
    if (email.value !== '' && !emailRegex.test(email.value)) {
      // 이메일 주소의 형식이 올바르지 않다면 경고 메시지를 표시하고, 이메일 입력 필드와 도메인 선택 필드를 초기화합니다.
      alert("올바른 형식의 이메일 주소가 아닙니다.");
      email.value = '';
      emailDomain.value = '';
    }
  };

  // 이메일 입력 필드에서 포커스가 벗어났을 때 이메일 주소의 형식을 검사.
  email.addEventListener('blur', function() {
    timeoutId = setTimeout(checkEmailFormat, 0);
  });

  // 도메인 선택 필드에서 선택한 도메인을 이메일 입력 필드에 추가.
  emailDomain.addEventListener('change', function() {
    if (email.value !== '' && emailDomain.value !== '' && !email.value.includes(emailDomain.value)) {
      email.value += emailDomain.value;
    }
  });

  // 이메일 입력 필드에 포커스가 있을 때는 이메일 주소의 형식을 검사하지 않음.
  email.addEventListener('focus', function() {
    clearTimeout(timeoutId);
  });

  // 도메인 선택 필드에 포커스가 있을 때는 이메일 주소의 형식을 검사하지 않음.
  emailDomain.addEventListener('focus', function() {
    clearTimeout(timeoutId);
  });
});
// //email_domain





var selectBoxEmail = document.getElementById('email-domain');
var selectBoxPhone = document.getElementById('phone-prefix');
var selectBoxFax = document.getElementById('fax-prefix');
var selectBoxManager = document.getElementById('manager-contact-prefix');

selectBoxEmail.addEventListener('click', function(event) {
  this.parentNode.classList.add('select-open');
  event.stopPropagation(); // 이벤트 버블링을 막음
});

selectBoxPhone.addEventListener('click', function(event) {
  this.parentNode.classList.add('select-open');
  event.stopPropagation(); 
});

selectBoxFax.addEventListener('click', function(event) {
  this.parentNode.classList.add('select-open');
  event.stopPropagation(); 
});
selectBoxManager.addEventListener('click', function(event) {
  this.parentNode.classList.add('select-open');
  event.stopPropagation();  
});

selectBoxEmail.addEventListener('change', function() {
  setTimeout(() => {
    this.parentNode.classList.remove('select-open');
  }, 50); // 50ms 후에 'select-open' 클래스 제거
});

selectBoxPhone.addEventListener('change', function() {
  setTimeout(() => {
    this.parentNode.classList.remove('select-open');
  }, 50); 
});
selectBoxFax.addEventListener('change', function() {
  setTimeout(() => {
    this.parentNode.classList.remove('select-open');
  }, 50); 
});
selectBoxManager.addEventListener('change', function() {
  setTimeout(() => {
    this.parentNode.classList.remove('select-open');
  }, 50); 
});

// 페이지 전체에 'click' 이벤트 리스너 추가
document.addEventListener('click', function() {
  selectBoxEmail.parentNode.classList.remove('select-open');
  selectBoxPhone.parentNode.classList.remove('select-open');
  selectBoxFax.parentNode.classList.remove('select-open');
  selectBoxManager.parentNode.classList.remove('select-open');
});
// //selectbox





document.addEventListener('DOMContentLoaded', function () {
  const userId = document.querySelector('#user-id');

  userId.addEventListener('blur', function(e) {
    const userIdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,12}$/;

    if (e.target.value !== '') {
      if (e.target.value.length < 5) {
        alert("아이디가 너무 짧습니다.");
        e.target.value = '';  // '아이디' 필드를 초기화.
      } else if (e.target.value.length > 12) {
        alert("아이디가 너무 깁니다.");
        e.target.value = '';  // '아이디' 필드를 초기화.
      } else if (!userIdRegex.test(e.target.value)) {
        alert("아이디는 영문과 숫자 조합을 사용하여 입력해야 합니다.");
        e.target.value = '';  // '아이디' 필드를 초기화.
      }
    }
  });
});
// id_login





document.addEventListener('DOMContentLoaded', function () {
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirm-password');

  password.addEventListener('blur', function(e) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/;

    if (e.target.value !== '') {
      if (e.target.value.length < 4) {
        alert("비밀번호가 너무 짧습니다.");
        e.target.value = '';  // '비밀번호' 필드를 초기화.
      } else if (e.target.value.length > 12) {
        alert("비밀번호가 너무 깁니다.");
        e.target.value = '';  // '비밀번호' 필드를 초기화.
      } else if (!passwordRegex.test(e.target.value)) {
        alert("비밀번호는 영문과 숫자 조합을 사용하여 입력해야 합니다.");
        e.target.value = '';  // '비밀번호' 필드를 초기화.
      }
    }
  });

  confirmPassword.addEventListener('blur', function(e) {
    if (e.target.value !== '' && password.value !== e.target.value) {
      alert("비밀번호가 일치하지 않습니다.");
      e.target.value = '';  // '비밀번호 확인' 필드를 초기화.
    }
  });
});
// password_Coincide





document.addEventListener('DOMContentLoaded', function () {
  const phone1 = document.querySelector('#phone1');
  const phone2 = document.querySelector('#phone2');
  const fax1 = document.querySelector('#fax1');
  const fax2 = document.querySelector('#fax2');
  const managerContact1 = document.querySelector('#manager-contact1');
  const managerContact2 = document.querySelector('#manager-contact2');

  phone1.addEventListener('input', function(e) {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      alert("숫자만 입력하세요");
    }
  });

  phone2.addEventListener('input', function(e) {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      alert("숫자만 입력하세요");
    }
  });
  fax1.addEventListener('input', function(e) {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      alert("숫자만 입력하세요");
    }
  });
  fax2.addEventListener('input', function(e) {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      alert("숫자만 입력하세요");
    }
  });
  managerContact1.addEventListener('input', function(e) {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      alert("숫자만 입력하세요");
    }
  });
  managerContact2.addEventListener('input', function(e) {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      alert("숫자만 입력하세요");
    }
  });
});
// //number_lock





document.addEventListener('DOMContentLoaded', function () {
  const acceptButton = document.querySelector('#accept-button');
  const signupForm = document.querySelector('#signup-form');

  acceptButton.addEventListener('click', function(e) {
    e.preventDefault(); // 기본 버튼의 동작을 막음.

    // 폼 데이터를 수집.
    const formData = new FormData(signupForm);

    // XMLHttpRequest 객체를 생성.
    const xhr = new XMLHttpRequest();

    // 요청을 구성합니다.
    xhr.open('POST', '회원가입 처리할 서버 URL');

    // 요청이 완료되면 실행될 이벤트 핸들러를 설정합니다.
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // 요청이 성공했을 때 동작을 정의.
        // 예: 회원가입 성공 메시지를 출력하거나, 로그인 페이지로 리다이렉션 등
        alert('회원가입이 완료되었습니다.');
      } else {
        // 요청이 실패했을 때 동작을 정의.
        // 예: 오류 메시지를 출력 등
        alert('회원가입이 실패하였습니다.');
      }
    };

    // 요청을 서버로 보냄.
    xhr.send(formData);
  });
});
// //form_send





document.addEventListener('DOMContentLoaded', function () {
  const cancelButton = document.querySelector('#cancel-button');
  const signupForm = document.querySelector('#signup-form');

  cancelButton.addEventListener('click', function(e) {
    e.preventDefault(); // 기본 버튼의 동작을 막음.

    // 폼의 내용을 초기화.
    signupForm.reset();

    // 이전 페이지로 돌아감.
    window.history.back();
  });
});
// //form_cancel





document.getElementById('find-postcode').addEventListener('click', function() {
  new daum.Postcode({
      oncomplete: function(data) {
          var addr = '';
          var extraAddr = '';

          if (data.userSelectedType === 'R') {
              addr = data.roadAddress;
          } else {
              addr = data.jibunAddress;
          }

          if(data.userSelectedType === 'R'){
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
              }
          }

          document.getElementById('postcode').value = data.zonecode;
          document.getElementById('postcode2').value = data.zonecode;
          document.getElementById('address').value = addr;
          document.getElementById('detail-address').focus();
      }
  }).open();
});
// //address_api