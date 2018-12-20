var vm = new Vue({
	el: '#app',
	data: {
		name: '',
		phone: '',
		findUs: '',
		user1: '',
		user2: '',
		user3: '',
		user4: '',
		user5: '',
		user6: '',
		user7: [],

		mySwiper: null,

		findUsInputFlag: false,
		user4InputFlag: false
	},
	methods: {
		radioClick(event) {
			var lis = event.path[1].children
			for(var i = 0; i < lis.length; i++) {
				if(lis[i].nodeName == 'LI') {
					lis[i].children[0].innerHTML = '□'
				}
			}
			event.path[0].children[0].innerHTML = '☑'
		},
		checkBoxClick(event) {
			var con = event.path[0].children[0].innerHTML
			if(event.path[0].children[0].innerHTML == '□') {
				event.path[0].children[0].innerHTML = '☑'
			} else {
				event.path[0].children[0].innerHTML = '□'
			}
		},
		setFindUs(data) {
			this.findUs = data
			this.findUsInputFlag = false
		},
		prevPage(data) {
			this.mySwiper.slidePrev()
		},
		nextPage(data) {
			if(data) {
				this.mySwiper.slideNext()
			} else {
				mui.alert('请完成选项')
			}
		},
		nextPage2(data1, data2) {
			if(data1 && data2) {
				this.mySwiper.slideNext()
			} else {
				mui.alert('请完成选项')
			}
		},
		setUser7(data) {
			if(this.user7.indexOf(data) == -1) {
				this.user7.push(data)
			}
		}
	},
	//初始化完成
	created() {

	},
	//页面挂载到dom上
	mounted() {
		//音乐
		/*function audioAutoPlay(id) {
			var audio = document.getElementById(id);
			audio.play();
			document.addEventListener("WeixinJSBridgeReady", function() {
				audio.play();
			}, false);
		}
		audioAutoPlay('musicStar');*/

		//swiper-container
		this.mySwiper = new Swiper('.swiper-container', {
			autoplay: false,
			direction: 'horizontal',
			loop: false,
			noSwiping: true,
			initialSlide: 0,
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			on: {
				init: function() {
					swiperAnimateCache(this); //隐藏动画元素 
					swiperAnimate(this); //初始化完成开始动画
				},
				slideChangeTransitionEnd: function() {
					swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
					//this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); //动画只展现一次，去除ani类名
				}
			}
		});

		//scroll
		mui('.mui-scroll-wrapper').scroll({
			scrollY: true, //是否竖向滚动
			scrollX: false, //是否横向滚动
			startX: 0, //初始化时滚动至x
			startY: 0, //初始化时滚动至y
			indicators: false, //是否显示滚动条
			deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
			bounce: true //是否启用回弹
		})

		//下一页
		//		var nextPageBtns = document.querySelectorAll('.nextPage')
		//		nextPageBtns.forEach(function(item, i, arr) {
		//			item.addEventListener('click', function() {
		//				mySwiper.slideNext()
		//			})
		//		})
		//
		//		//上一页
		//		var prevPageBtns = document.querySelectorAll('.prevPage')
		//		prevPageBtns.forEach(function(item, i, arr) {
		//			item.addEventListener('click', function() {
		//				mySwiper.slidePrev()
		//			})
		//		})

	}
})