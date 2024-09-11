document.addEventListener("DOMContentLoaded", () => {
	function openModalMini(title, link, img, listItems) {
		const modal_mini = document.getElementById('modal-mini');
		const modal_mini_content = document.getElementById('modal-mini-content')
		const modal_mini_link = document.getElementById('modal-mini-link')
		const modal_mini_img = document.getElementById('modal-mini-img');
		const modal_mini_title = document.getElementById('modal-mini-title');
		const modal_mini_descriptionList = document.getElementById('modal-description-list');

		modal_mini_link.href = link;
		modal_mini_img.src = img;
		modal_mini_title.textContent = title;

		modal_mini_descriptionList.innerHTML = '';

		// 리스트 아이템 추가
		listItems.forEach(item => {
			const li = document.createElement('li');
			li.textContent = item;
			modal_mini_descriptionList.appendChild(li);
		});

		modal_mini.style.display = 'flex';  // 모달 표시

		// 모달을 띄울 때 FullPage.js의 스크롤 비활성화
		fullpage_api.setAllowScrolling(false);

		gsap.fromTo(modal_mini_content,
			{ scale: 0, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
		);
	}

	function closeModalMini() {
		const modal_mini = document.getElementById('modal-mini');
		const modal_mini_content = document.getElementById('modal-mini-content');

		gsap.to(modal_mini_content, {
			scale: 0,
			opacity: 0,
			duration: 0.5,
			ease: "power2.in",
			onComplete: () => {
				modal_mini.style.display = 'none';  // 모달을 숨김
				fullpage_api.setAllowScrolling(true);  // 스크롤 활성화
			}
		});
	}

	// 카드 클릭 시 모달 열기
	document.querySelectorAll('.card-mini').forEach(card => {
		card.addEventListener('click', function () {
			const title = this.getAttribute('data-title');
			const link = this.getAttribute('data-link');
			const imageSrc = this.getAttribute('data-img');
			const listItems = JSON.parse(this.getAttribute('data-list')); // 리스트를 파싱

			openModalMini(title, link, imageSrc, listItems);
		});
	});

	// 모달 닫기 버튼 클릭 시
	document.querySelector('.close-mini').addEventListener('click', closeModalMini);

	// 모달 바깥 클릭 시 모달 닫기
	window.addEventListener('click', function (event) {
		const modal_mini = document.getElementById('modal-mini');
		if (event.target === modal_mini) {
			closeModalMini();
		}
	});
})