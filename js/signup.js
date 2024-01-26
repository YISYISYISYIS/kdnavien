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
// //emailinput