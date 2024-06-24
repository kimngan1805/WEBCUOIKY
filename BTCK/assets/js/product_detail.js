let darkmode=document.querySelector('#darkmode');// code cho màn hình sáng đen khi bật đèn
darkmode.onclick=() =>{
    if(darkmode.classList.contains('bx-moon')){
        if(darkmode.classList.replace('bx-moon','bx-sun'));
        document.body.classList.add('color');
    }
    else{
        darkmode.classList.replace('bx-sun','bx-moon');
        document.body.classList.remove('color');
    }
}
//code khi web còn 600px thì bấm 3 gạch để hiện narbar
let menu=document.querySelector('#menu-icon');
let narbar=document.querySelector('.navarbar');
menu.onclick=() =>{
    menu.classList.toggle('bx-x');
    narbar.classList.toggle('open');
}
//hiện ra cửa sổ
window.onscroll=() =>{
    menu.classList.remove('bx-x');
    narbar.classList.remove('open');
}
// code để chạy trang web theo dạng scroll 
const sr=ScrollReveal({ 
    distance:'70px',
    duration:2700,
    reset:true
});
sr.reveal('.text',{delay:200, origin:'bottom'});
sr.reveal('.img',{delay:350, origin:'top'});
sr.reveal('.down-arrow',{delay:450, origin:'right'});