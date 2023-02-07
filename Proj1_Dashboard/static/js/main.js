
//Sidebar Dropdown
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');

allDropdown.forEach(item=> {
    const a = item.parentElement.querySelector('a:first-child');
    a.addEventListener('click', function (e) {
        e.preventDefault();

        // 토글 형태의 버튼이 하나만 active 상태가 되도록 만들기(기존 것 remove 후 선택한 것 active)
        if(!this.classList.contains('active')) {
            allDropdown.forEach(i=> {
                const aLink = i.parentElement.querySelector('a:first-child');

                aLink.classList.remove('active');
                i.classList.remove('show');
            })
        }

        this.classList.toggle('active');
        item.classList.toggle('show');
    })
})


//Profile Dropdown
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function() {
    dropdownProfile.classList.toggle('show');
})


window.addEventListener('click', function(e) {
    if(e.target !== imgProfile) {
        if(e.target !== dropdownProfile) {
            if(dropdownProfile.classList.contains('show')){
                dropdownProfile.classList.remove('show');
            }
        }
    }
})