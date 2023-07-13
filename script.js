
window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime();
            let timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        }
        function addZero(elem){
			if (String(elem).length === 1) {
				return '0' + elem;
			} else {
				return String(elem);
			}
        };
        function updateClock(){

            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
            
            if (timer.timeRemaining > 0){
                setInterval(updateClock, 1000);
            }else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        updateClock();
    }

    countTimer('5 july 2023');

    // menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItems = menu.querySelectorAll('ul>li')

        const handlerMenu = () => {
            if(!menu.style.transform || menu.style.transform === 'translate(-100%)') {
                menu.style.transform = 'translate(0)';
            } else {
                menu.style.transform = 'translate(-100%)';
            }
        }
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu))
            
    };

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup');
        const popUpBtn = document.querySelectorAll('.popup-btn');

        popUpBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
            });
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;
                  
                if(target.classList.contains('popup-close')){
                    popUp.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');

                    if(!target){
                        popUp.style.display = 'none';
                    }
                }
        });
    };

    togglePopUp();

    //tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if (index === i) {
                    tab[i].classList.add('active')
                    tabContent[i].classList.remove('d-none')
                } else {
                    tab[i].classList.remove('active')
                    tabContent[i].classList.add('d-none')
                }
            }
        }

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            if (target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }
        })
    };

    tabs()

    //slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const slider = document.querySelector('.portfolio-content');

        let currentSlide = 0;
        let interval;

        const pushDots = () => {
            const portfolioDots = document.querySelector('.portfolio-dots')
            slide.forEach(() => {
            const li = document.createElement('li');
            li.classList.add('dot');
            portfolioDots.append(li);
            });
        };
        pushDots();
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass)
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass)
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        
        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let  target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')){
                currentSlide++;
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length){
                currentSlide = 0;
            }
            if (currentSlide < 0){
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn, .dot')){
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn, .dot')){
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider();


    //  img_change

    const setCommandImg = () => {
		const command = document.querySelector('#command .row');

		const changingPhotos = (event) => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				const lastSrc = target.src;

				target.src = target.dataset.img;
				target.dataset.img = lastSrc;
			}
		};

		command.addEventListener('mouseover', changingPhotos);
		command.addEventListener('mouseout', changingPhotos);
	};
    setCommandImg();
    
    //only_numbers

	const checkCalcBlock = () => {
		const calcBlock = document.querySelector('.calc-block');

		calcBlock.addEventListener('input', (event) => {
			event.target.value = event.target.value.replace(/\D/g, '');
			
		});
	};
    checkCalcBlock();

    // calculator   

    const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquary = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0;
			let	countValue = 1;
			let	dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value;
			const squareValue = +calcSquary.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value) {
				if (calcDay.value < 5) {
					dayValue *= 2;
				} else if (calcDay.value < 10) {
					dayValue *= 1.5;
				}
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}

			totalValue.textContent = total;
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			if (target.matches('.calc-day') || target.matches('.calc-type') ||
				target.matches('.calc-square') || target.matches('.calc-count')) {
				countSum();
			}
		});
	};
    calc(100);

    // send-ajax-form

	// const sendForm = () => {
	// 	const errorMessage = 'Что-то пошло не так...',
	// 		loadMessage = 'Загрузка...',
	// 		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	// 	const postData = (body, outputData, errorData) => {
	// 		const request = new XMLHttpRequest();

	// 		request.addEventListener('readystatechange', () => {
	// 			if (request.readyState !== 4) {
	// 				return;
	// 			}

	// 			if (request.status === 200) {
	// 				outputData();
	// 			} else {
	// 				errorData(request.status);
	// 			}
	// 		});

	// 		request.open('POST', './server.php');
	// 		// request.setRequestHeader('Content-Type', 'multipart/form-data');
	// 		request.setRequestHeader('Content-Type', 'application/json');
	// 		// request.send(formData);
	// 		request.send(JSON.stringify(body));
	// 	};

	// 	const clearInput = idForm => {
	// 		const form = document.getElementById(idForm);
	// 		[...form.elements]
	// 			.filter(item =>
	// 				item.tagName.toLowerCase() !== 'button' &&
	// 				item.type !== 'button')
	// 			.forEach(item =>
	// 				item.value = '');
	// 	};

	// 	const isValid = event => {
	// 		const target = event.target;
	// 		if (target.matches('.form-phone')) {
	// 			target.value = target.value.replace(/[^+\d]/g, '');
	// 		}
	// 		if (target.name === 'user_name') {
	// 			target.value = target.value.replace(/[^а-яё ]/gi, '');
	// 		}
	// 		if (target.matches('.mess')) {
	// 			target.value = target.value.replace(/[^а-яё ,.]/gi, '');
	// 		}
	// 	};

	// 	const processingForm = idForm => {
	// 		const form = document.getElementById(idForm);
	// 		const statusMessage = document.createElement('div');

	// 		// statusMessage.textContent = 'Тут будет сообщение!';
	// 		statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
	// 		// form.appendChild(statusMessage);

	// 		form.addEventListener('submit', event => {
	// 			const formData = new FormData(form);
	// 			const body = {};

	// 			statusMessage.textContent = loadMessage;
	// 			event.preventDefault();
	// 			form.appendChild(statusMessage);

	// 			/* for (let val of formData.entries()) {
	// 				body[val[0]] = val[1];
	// 			} */

	// 			formData.forEach((val, key) => {
	// 				body[key] = val;
	// 			});

	// 			postData(body, () => {
	// 				statusMessage.textContent = successMessage;
	// 				clearInput(idForm);
	// 			}, error => {
	// 				statusMessage.textContent = errorMessage;
	// 				console.error(error);
	// 			});
	// 		});
	// 		form.addEventListener('input', isValid);
	// 	};

	// 	processingForm('form1');
	// 	processingForm('form2');
	// 	processingForm('form3');
	// };
    // sendForm();

});


