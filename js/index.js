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
		idea2Other: '',
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
		idea2InputFlag: false,
		idea3InputFlag: false,
		idea4InputFlag: false,
		idea5InputFlag: false,

		read2InputFlag: false,

		endFlag: false
	},
	methods: {
		radioClick(event) {
			var domName = event.target.nodeName
			var lis = null

			if (domName == 'LI') {
				//				lis = event.path[1].children
				lis = event.target.parentElement.children
			} else if (domName == 'SPAN') {
				//				lis = event.path[2].children
				lis = event.target.parentElement.parentElement.children
			}

			for (var i = 0; i < lis.length; i++) {
				if (lis[i].nodeName == 'LI') {
					lis[i].children[0].innerHTML = '□'
				}
			}

			if (domName == 'LI') {
				event.target.children[0].innerHTML = '☑'
				//				event.path[0].children[0].innerHTML = '☑'
			} else if (domName == 'SPAN') {
				event.target.innerHTML = '☑'
				//				event.path[0].innerHTML = '☑'
			}

		},
		checkBoxClick(event) {
			var domName = event.target.nodeName

			//			if(domName == 'LI') {
			//				if(event.path[0].children[0].innerHTML == '□') {
			//					event.path[0].children[0].innerHTML = '☑'
			//				} else {
			//					event.path[0].children[0].innerHTML = '□'
			//				}
			//			} else if(domName == 'SPAN') {
			//				if(event.path[0].innerHTML == '□') {
			//					event.path[0].innerHTML = '☑'
			//				} else {
			//					event.path[0].innerHTML = '□'
			//				}
			//			}

			if (domName == 'LI') {
				if (event.target.children[0].innerHTML == '□') {
					event.target.children[0].innerHTML = '☑'
				} else {
					event.target.children[0].innerHTML = '□'
				}
			} else if (domName == 'SPAN') {
				if (event.target.innerHTML == '□') {
					event.target.innerHTML = '☑'
				} else {
					event.target.innerHTML = '□'
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
			if (data) {
				this.mySwiper.slideNext()
			} else {
				mui.alert('请完成选项')
			}
		},
		nextPage2(data1, data2) {
			if (data1 && data2) {
				if (/^[1][0-9]{10}$/.test(data2)) {
					this.mySwiper.slideNext()
					return
				}
				mui.alert('请输入正确手机号码')
			} else {
				mui.alert('请完成选项')
			}
		},
		nextPage3(data) {
			if (data.length != 0) {
				this.mySwiper.slideNext()
			} else {
				mui.alert('请完成选项')
			}
		},
		idea2nextPage(data) {
			if (data.length == 0) {
				mui.alert('请完成选项')
				return false
			}
			if (data.indexOf('H') != -1) {
				if (!this.idea2Other) {
					mui.alert('请完成选项')
					return false
				}
				this.mySwiper.slideNext()
			} else {
				this.mySwiper.slideNext()
			}
		},
		setUser7(data) {
			var index = this.user7.indexOf(data)
			if (index == -1) {
				this.user7.push(data)
			} else {
				this.user7.splice(index, 1)
			}
		},
		setidea2(data) {
			var index = this.idea2.indexOf(data)
			if (index == -1) {
				this.idea2.push(data)
			} else {
				this.idea2.splice(index, 1)
			}
		},
		submit() {
			if (!this.read3a || !this.read3b) {
				mui.alert('请完成选项')
				return false
			}

			var subject_user7 = this.user7.toString();
			if(this.idea2.indexOf('H') != -1){
				this.idea2.push(this.idea2Other)
			}
			var subject_idea2 = this.idea2.toString();


			this.$http.post('http://h.uudiv.com/wapi/adduser.php', {
				username: this.name,
				userphone: this.phone,
				findus: this.findUs,
				subject_user1: this.user1,
				subject_user2: this.user2,
				subject_user3: this.user3,
				subject_user4: this.user4,
				subject_user5: this.user5,
				subject_user6: this.user6,
				subject_user7,
				subject_idea1: this.idea1,
				subject_idea2,
				subject_idea3: this.idea3,
				subject_idea4: this.idea4,
				subject_idea5: this.idea5,
				subject_idea6: this.idea6,
				subject_read1: this.read1,
				subject_read2: this.read2,
				subject_read3a: this.read3a,
				subject_read3b: this.read3b
			}, {
				emulateJSON: true
			}).then(response => {
				if(response.body.error == true){
					mui.alert(response.body.message)
					return false
				}

				if(response.body.success == true){
					this.endFlag = true
				}

			}, response => {
				// error callback
			});


			

			//没抽中这样
			//var msg = ['与礼包擦肩不要紧，千万别错过爱车下一次的保养时间哦～', '与礼包擦肩不要紧，千万别错过妈妈辛苦炖的靓汤哦～', '与礼包擦肩不要紧，千万别错过公司赏赐的年终奖哦～', '与礼包擦肩不要紧，千万别错过落地窗外撩人的美景哦～', '与礼包擦肩不要紧，千万别错过好友聚会丰盛的大餐哦～']
			//mui.alert(msg[Math.floor(Math.random() * 5)])
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
			document.addEventListener("WeixinJSBridgeReady", function () {
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
				init: function () {
					swiperAnimateCache(this); //隐藏动画元素 
					swiperAnimate(this); //初始化完成开始动画
				},
				slideChangeTransitionEnd: function () {
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