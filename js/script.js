document.addEventListener("DOMContentLoaded", () => {
	const sliderWrapper = document.querySelector('.slider-wrapper');
	const stackInfos = document.querySelectorAll('.stack-info');
	let currentSlide = 0;

	document.querySelector('.prev').addEventListener('click', () => {
		if (currentSlide > 0) {
			currentSlide--;
		} else {
			// 처음 슬라이드에서 prev 버튼을 누르면 마지막 슬라이드로 이동
			currentSlide = stackInfos.length - 1;
		}
		updateSlide();
	});

	document.querySelector('.next').addEventListener('click', () => {
		if (currentSlide < stackInfos.length - 1) {
			currentSlide++;
		} else {
			// 마지막 슬라이드에서 next 버튼을 누르면 처음 슬라이드로 이동
			currentSlide = 0;
		}
		updateSlide();
	});

	function updateSlide() {
		const slideWidth = stackInfos[0].clientWidth;
		sliderWrapper.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
	}

	new fullpage('#fullpage', {
		autoScrolling: true,
		navigation: true
	})

	// GSAP을 사용해 모달 열기 애니메이션
	function openModal(title, images, leftListItems, rightListItems, gitLink) {
		const modal = document.getElementById('modal');
		const modalContent = document.getElementById('modal-content');
		const modalTitle = document.getElementById('modal-title');
		const modalSlider = document.getElementById('modal-slider');
		const modalLeftList = document.getElementById('modal-left-list');
		const modalRightList = document.getElementById('modal-right-list');
		const modalGitLink = document.getElementById('modal-git'); // GitHub 링크

		modalTitle.textContent = title;

		// 슬라이더 이미지 초기화
		modalSlider.innerHTML = '';
		images.forEach(imageSrc => {
			const img = document.createElement('img');
			img.src = imageSrc;
			modalSlider.appendChild(img);
		});

		// 슬라이더 초기화
		$(modalSlider).slick({
			arrows: true,
			autoplay: true,
			autoplaySpeed: 3000,
		});

		// 좌우 리스트 초기화
		modalLeftList.innerHTML = '';
		modalRightList.innerHTML = '';

		// 왼쪽 리스트 아이템 추가
		leftListItems.forEach(item => {
			const li = document.createElement('li');
			li.textContent = item;
			modalLeftList.appendChild(li);
		});

		// 오른쪽 리스트 아이템 추가
		rightListItems.forEach(item => {
			const li = document.createElement('li');
			li.textContent = item;
			modalRightList.appendChild(li);
		});

		// GitHub 링크 설정
		modalGitLink.href = gitLink;

		modal.style.display = 'flex';  // 모달 표시

		// 모달을 띄울 때 FullPage.js의 스크롤 비활성화
		fullpage_api.setAllowScrolling(false);

		// GSAP 애니메이션
		gsap.fromTo(modalContent,
			{ scale: 0, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
		);
	}

	// GSAP을 사용해 모달 닫기 애니메이션
	function closeModal() {
		const modalContent = document.getElementById('modal-content');
		const modal = document.getElementById('modal');

		gsap.to(modalContent, {
			scale: 0,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => {
				modal.style.display = 'none';  // 모달을 숨김
				fullpage_api.setAllowScrolling(true);  // 스크롤 활성화
			}
		});

		// 슬릭 슬라이더 해제
		$('#modal-slider').slick('unslick');
	}

	// 카드 클릭 시 모달 열기
	document.querySelectorAll('.card').forEach(card => {
		card.addEventListener('click', function () {
			const title = this.getAttribute('data-title');
			const images = JSON.parse(this.getAttribute('data-images')); // 이미지 배열 파싱
			const leftListItems = JSON.parse(this.getAttribute('data-list-left'));  // 왼쪽 리스트 파싱
			const rightListItems = JSON.parse(this.getAttribute('data-list-right')); // 오른쪽 리스트 파싱
			const gitLink = this.getAttribute('data-git');  // GitHub 링크 가져오기


			openModal(title, images, leftListItems, rightListItems, gitLink);
		});
	});

	// 모달 닫기 버튼 클릭 시
	document.querySelector('.close').addEventListener('click', closeModal);

	// 모달 바깥 클릭 시 모달 닫기
	window.addEventListener('click', function (event) {
		const modal = document.getElementById('modal');
		if (event.target === modal) {
			closeModal();
		}
	});

	// ==============================================================
	// gsap 단어 던지기
	const titleLines = document.querySelectorAll('.title-line');

	titleLines.forEach(line => {
		const text = line.textContent;
		line.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
	});

	const spans = document.querySelectorAll('#title-group span');

	// Randomly generate starting positions
	const getRandomPositions = () => {
		const directions = [
			{ x: -200, y: -200 },
			{ x: 200, y: -200 },
			{ x: -200, y: 200 },
			{ x: 200, y: 200 },
		];
		return directions[Math.floor(Math.random() * directions.length)];
	};

	gsap.fromTo(
		spans,
		{ opacity: 0, x: () => getRandomPositions().x, y: () => getRandomPositions().y },
		{
			opacity: 1,
			x: 0,
			y: 0,
			duration: 1.5,
			ease: "power4.out",
			stagger: {
				amount: 0.5,
				from: "start",
			}
		}
	);


	// opacity 수정
	setTimeout(() => {
		const element = document.querySelector('.next-page');
		element.style.opacity = 1; // opacity를 직접 변경
	}, 2000); // 3000 밀리초 = 3초
})

function setProgress(i, percentage) {
	const progressBars = document.querySelectorAll('.progress-bar');
	const percnet = document.querySelectorAll('.percent');
	progressBars[i].style.width = `${percentage}%`;
	setTimeout(() => {
		percnet[i].style.opacity = 1; // opacity를 직접 변경
	}, 1000); // 3000 밀리초 = 3초
}

// 부유 관리
/**
 * 부유하는 요소 관리
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 부유하는(떠 다니는) 요소를 만드는 함수
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
      repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
      ease: Power1.easeInOut // Easing 함수 적용. 타이밍 함수
    }
  )
}
floatingObject('.card-mini1', 1, 30)
floatingObject('.card-mini2', .5, 30)