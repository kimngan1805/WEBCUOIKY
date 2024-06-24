'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });
  //login database

}
// đăng nhâpk
// Dang nhap
loginButton.addEventListener('click', () => {
  event.preventDefault();
  let phonelog = document.getElementById('phone-login').value;
  let passlog = document.getElementById('password-login').value;
  let accounts = JSON.parse(localStorage.getItem('accounts'));

  if (phonelog.length == 0) {
      document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại';
  } else if (phonelog.length != 10) {
      document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
      document.getElementById('phone-login').value = '';
  } else {
      document.querySelector('.form-message.phonelog').innerHTML = '';
  }

  if (passlog.length == 0) {
      document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu';
  } else if (passlog.length < 6) {
      document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
      document.getElementById('passwordlogin').value = '';
  } else {
      document.querySelector('.form-message-check-login').innerHTML = '';
  }

  if (phonelog && passlog) {
      let vitri = accounts.findIndex(item => item.phone == phonelog);
      if (vitri == -1) {
          toast({ title: 'Error', message: 'Tài khoản của bạn không tồn tại', type: 'error', duration: 3000 });
      } else if (accounts[vitri].password == passlog) {
          if(accounts[vitri].status == 0) {
              toast({ title: 'Warning', message: 'Tài khoản của bạn đã bị khóa', type: 'warning', duration: 3000 });
          } else {
              localStorage.setItem('currentuser', JSON.stringify(accounts[vitri]));
              toast({ title: 'Success', message: 'Đăng nhập thành công', type: 'success', duration: 3000 });
              closeModal();
              kiemtradangnhap();
              checkAdmin();
              updateAmount();
          }
      } else {
          toast({ title: 'Warning', message: 'Sai mật khẩu', type: 'warning', duration: 3000 });
      }
  }
})
// Kiểm tra xem có tài khoản đăng nhập không ?
function kiemtradangnhap() {
  let currentUser = localStorage.getItem('currentuser');
  if (currentUser != null) {
      let user = JSON.parse(currentUser);
      document.querySelector('.auth-container').innerHTML = `<span class="text-dndk">Tài khoản</span>
          <span class="text-tk">${user.fullname} <i class="fa-sharp fa-solid fa-caret-down"></span>`
      document.querySelector('.header-middle-right-menu').innerHTML = `<li><a href="javascript:;" onclick="myAccount()"><i class="fa-solid fa-circle-user"></i> Tài khoản của tôi</a></li>
          <li><a href="javascript:;" onclick="orderHistory()"><i class="fa-solid fa-bag-shopping"></i> Đơn hàng đã mua</a></li>
          <li class="border"><a id="logout" href="javascript:;"><i class="fa-solid fa-right-from-bracket"></i> Thoát tài khoản</a></li>`
      document.querySelector('#logout').addEventListener('click',logOut)
  }
}

function logOut() {
  let accounts = JSON.parse(localStorage.getItem('accounts'));
  user = JSON.parse(localStorage.getItem('currentuser'));
  let vitri = accounts.findIndex(item => item.phone == user.phone)
  accounts[vitri].cart.length = 0;
  for (let i = 0; i < user.cart.length; i++) {
      accounts[vitri].cart[i] = user.cart[i];
  }
  localStorage.setItem('accounts', JSON.stringify(accounts));
  localStorage.removeItem('currentuser');
  window.location = "/";
}

function checkAdmin() {
  let user = JSON.parse(localStorage.getItem('currentuser'));
  if(user && user.userType == 1) {
      let node = document.createElement(`li`);
      node.innerHTML = `<a href="./admin.html"><i class="fa-solid fa-gear"></i> Quản lý cửa hàng</a>`
      document.querySelector('.header-middle-right-menu').prepend(node);
  } 
}

window.onload = kiemtradangnhap();
window.onload = checkAdmin();

// Chuyển đổi trang chủ và trang thông tin tài khoản
function myAccount() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('trangchu').classList.add('hide');
  document.getElementById('order-history').classList.remove('open');
  document.getElementById('account-user').classList.add('open');
  userInfo();
}

// Chuyển đổi trang chủ và trang xem lịch sử đặt hàng 
function orderHistory() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('account-user').classList.remove('open');
  document.getElementById('trangchu').classList.add('hide');
  document.getElementById('order-history').classList.add('open');
  renderOrderProduct();
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function userInfo() {
  let user = JSON.parse(localStorage.getItem('currentuser'));
  document.getElementById('infoname').value = user.fullname;
  document.getElementById('infophone').value = user.phone;
  document.getElementById('infoemail').value = user.email;
  document.getElementById('infoaddress').value = user.address;
  if (user.email == undefined) {
      infoemail.value = '';
  }
  if (user.address == undefined) {
      infoaddress.value = '';
  }
}

// Thay doi thong tin
function changeInformation() {
 let accounts = JSON.parse(localStorage.getItem('accounts'));
 let user = JSON.parse(localStorage.getItem('currentuser'));
 let infoname = document.getElementById('infoname');
 let infoemail = document.getElementById('infoemail');
 let infoaddress = document.getElementById('infoaddress');

 user.fullname = infoname.value;
 if (infoemail.value.length > 0) {
     if (!emailIsValid(infoemail.value)) {
         document.querySelector('.inforemail-error').innerHTML = 'Vui lòng nhập lại email!';
         infoemail.value = '';
     } else {
         user.email = infoemail.value;
     }
 }

 if (infoaddress.value.length > 0) {
     user.address = infoaddress.value;
 }

 let vitri = accounts.findIndex(item => item.phone == user.phone)

 accounts[vitri].fullname = user.fullname;
 accounts[vitri].email = user.email;
 accounts[vitri].address = user.address;
 localStorage.setItem('currentuser', JSON.stringify(user));
 localStorage.setItem('accounts', JSON.stringify(accounts));
 kiemtradangnhap();
 toast({ title: 'Success', message: 'Cập nhật thông tin thành công !', type: 'success', duration: 3000 });
}


// Đổi mật khẩu 
function changePassword() {
 let currentUser = JSON.parse(localStorage.getItem("currentuser"));
 let passwordCur = document.getElementById('password-cur-info');
 let passwordAfter = document.getElementById('password-after-info');
 let passwordConfirm = document.getElementById('password-comfirm-info');
 let check = true;
 if (passwordCur.value.length == 0) {
     document.querySelector('.password-cur-info-error').innerHTML = 'Vui lòng nhập mật khẩu hiện tại';
     check = false;
 } else {
     document.querySelector('.password-cur-info-error').innerHTML = '';
 }

 if (passwordAfter.value.length == 0) {
     document.querySelector('.password-after-info-error').innerHTML = 'Vui lòn nhập mật khẩu mới';
     check = false;
 } else {
     document.querySelector('.password-after-info-error').innerHTML = '';
 }

 if (passwordConfirm.value.length == 0) {
     document.querySelector('.password-after-comfirm-error').innerHTML = 'Vui lòng nhập mật khẩu xác nhận';
     check = false;
 } else {
     document.querySelector('.password-after-comfirm-error').innerHTML = '';
 }

 if (check == true) {
     if (passwordCur.value.length > 0) {
         if (passwordCur.value == currentUser.password) {
             document.querySelector('.password-cur-info-error').innerHTML = '';
             if (passwordAfter.value.length > 0) {
                 if (passwordAfter.value.length < 6) {
                     document.querySelector('.password-after-info-error').innerHTML = 'Vui lòng nhập mật khẩu mới có số  kí tự lớn hơn bằng 6';
                 } else {
                     document.querySelector('.password-after-info-error').innerHTML = '';
                     if (passwordConfirm.value.length > 0) {
                         if (passwordConfirm.value == passwordAfter.value) {
                             document.querySelector('.password-after-comfirm-error').innerHTML = '';
                             currentUser.password = passwordAfter.value;
                             localStorage.setItem('currentuser', JSON.stringify(currentUser));
                             let userChange = JSON.parse(localStorage.getItem('currentuser'));
                             let accounts = JSON.parse(localStorage.getItem('accounts'));
                             let accountChange = accounts.find(acc => {
                                 return acc.phone = userChange.phone;
                             })
                             accountChange.password = userChange.password;
                             localStorage.setItem('accounts', JSON.stringify(accounts));
                             toast({ title: 'Success', message: 'Đổi mật khẩu thành công !', type: 'success', duration: 3000 });
                         } else {
                             document.querySelector('.password-after-comfirm-error').innerHTML = 'Mật khẩu bạn nhập không trùng khớp';
                         }
                     } else {
                         document.querySelector('.password-after-comfirm-error').innerHTML = 'Vui lòng xác nhận mật khẩu';
                     }
                 }
             } else {
                 document.querySelector('.password-after-info-error').innerHTML = 'Vui lòng nhập mật khẩu mới';
             }
         } else {
             document.querySelector('.password-cur-info-error').innerHTML = 'Bạn đã nhập sai mật khẩu hiện tại';
         }
     }
    }
  }

  




