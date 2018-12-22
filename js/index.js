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

		idea1: '',
		idea2: [],
		idea3: '',
		idea4: '',
		idea5: '',
		idea6: '',

		read1: '',
		read2: '',
		read3a: '',
		read3b: '',

		mySwiper: null,

		findUsInputFlag: false,
		user4InputFlag: false,

		idea1InputFlag: false,
		idea3InputFlag: false,
		idea4InputFlag: false,
		idea5InputFlag: false,

		read2InputFlag: false,
	},
	methods: {
		radioClick(event) {
			var domName = event.target.nodeName

			if(domName == 'LI') {
				var lis = event.path[1].children
			} else if(domName == 'SPAN') {
				var lis = event.path[2].children
			}

			for(var i = 0; i < lis.length; i++) {
				if(lis[i].nodeName == 'LI') {
					lis[i].children[0].innerHTML = '□'
				}
			}

			if(domName == 'LI') {
				event.path[0].children[0].innerHTML = '☑'
			} else if(domName == 'SPAN') {
				event.path[0].innerHTML = '☑'
			}

		},
		checkBoxClick(event) {
			var domName = event.target.nodeName

			if(domName == 'LI') {
				if(event.path[0].children[0].innerHTML == '□') {
					event.path[0].children[0].innerHTML = '☑'
				} else {
					event.path[0].children[0].innerHTML = '□'
				}
			} else if(domName == 'SPAN') {
				if(event.path[0].innerHTML == '□') {
					event.path[0].innerHTML = '☑'
				} else {
					event.path[0].innerHTML = '□'
				}
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
		nextPage3(data) {
			if(data.length != 0) {
				this.mySwiper.slideNext()
			} else {
				mui.alert('请完成选项')
			}
		},
		setUser7(data) {
			var index = this.user7.indexOf(data)
			if(index == -1) {
				this.user7.push(data)
			} else {
				this.user7.splice(index, 1)
			}
		},
		setidea2(data) {
			var index = this.idea2.indexOf(data)
			if(index == -1) {
				this.idea2.push(data)
			} else {
				this.idea2.splice(index, 1)
			}
		},
		submit() {
			if(!this.read3a || !this.read3b) {
				mui.alert('请完成选项')
				return false
			}

			//没抽中这样
			var msg = ['与礼包擦肩不要紧，千万别错过爱车下一次的保养时间哦～', '与礼包擦肩不要紧，千万别错过妈妈辛苦炖的靓汤哦～', '与礼包擦肩不要紧，千万别错过公司赏赐的年终奖哦～', '与礼包擦肩不要紧，千万别错过落地窗外撩人的美景哦～', '与礼包擦肩不要紧，千万别错过好友聚会丰盛的大餐哦～']

			mui.alert(msg[Math.floor(Math.random() * 5)])
		}
	},
	//初始化完成
	created() {

	},
	//页面挂载到dom上
	mounted() {
		//音乐
		function audioAutoPlay(id) {
			var audio = document.getElementById(id);
			audio.play();
			document.addEventListener("WeixinJSBridgeReady", function() {
				audio.play();
			}, false);
		}
		audioAutoPlay('musicStar');

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

	}
})