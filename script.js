const faders = document.querySelectorAll('.fadeIn');
const nav = document.querySelector('.navigation');
const selector = document.querySelector('.custom-selector');

//--------------  show menu  -------------------
const menuShow = () => {
    nav.classList.toggle('flipOut'); 
}
document.getElementById('dropDownButton').addEventListener('click', menuShow);


//--------------  drop down for location search ----------------

selector.addEventListener('change', e => {
    console.log(`changed to ${e.target.value}`)
})

selector.addEventListener('mousedown', e => {
    e.preventDefault();

    // grab the children elements within .selector (the <select>)
    const select = selector.children[0];
    const locationDropDown = document.createElement('ul');
    locationDropDown.className = "selector-options";

    // forEach of the select children (the <option>s)
    [...select.children].forEach(option => {
        const dropDownOption = document.createElement('li');
        dropDownOption.textContent = option.textContent;
        
        dropDownOption.addEventListener('mousedown', e => {
            // don't trigger mousedown on selector
            e.stopPropagation();
            select.value = option.value;
            select.dispatchEvent(new Event('change'));
            selector.value = option.value;
            selector.dispatchEvent(new Event('change'));
            locationDropDown.remove();
        })
        // add the new dropDownOption to the location drop down
        locationDropDown.appendChild(dropDownOption);
    })
    
    selector.appendChild(locationDropDown);

    document.addEventListener('click', e =>{
        if(!selector.contains(e.target)){
            locationDropDown.remove();
        }
    })
})

//-------------  fade in scrolling for menu------------------

const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -32px 0px"
}


const appearOnScroll = new IntersectionObserver(function(enteries, appearOnScroll) {
    enteries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else  {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target)
        }
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})