

; (function ($, window, undefined) {


	let $window = $(window),
		Modernizr = window.Modernizr;

	$.Slicebox = function (options, element) {

		this.$el = $(element);
		this._init(options);

	};

	$.Slicebox.defaults = {
		// (v)ertical, (h)orizontal or (r)andom
		orientation: 'v',
		// perspective value
		perspective: 900,
		// number of slices / cuboids
		// needs to be an odd number 15 => number > 0 (if you want the limit higher, change the _validate function).
		cuboidsCount: 5,
		// if true then the number of slices / cuboids is going to be random (cuboidsCount is overwitten)
		cuboidsRandom: false,
		// the range of possible number of cuboids if cuboidsRandom is true
		// it is strongly recommended that you do not set a very large number :)
		maxCuboidsCount: 5,
		// each cuboid will move x pixels left / top (depending on orientation). The middle cuboid doesn't move. the middle cuboid's neighbors will move disperseFactor pixels
		disperseFactor: 50,
		// color of the hidden sides
		colorHiddenSides: '#222',
		// the animation will start from left to right. The left most cuboid will be the first one to rotate
		// this is the interval between each rotation in ms
		sequentialFactor: 150,
		// animation speed
		// this is the speed that takes "1" cuboid to rotate
		speed: 3600,
		// transition easing
		easing: 'ease',
		// if true the slicebox will start the animation automatically
		autoplay: true,
		// time (ms) between each rotation, if autoplay is true
		interval: 3000,
		// the fallback will just fade out / fade in the items
		// this is the time fr the fade effect
		fallbackFadeSpeed: 1000,
		// callbacks
		onBeforeChange: function (position) { return false; },
		onAfterChange: function (position) { return false; },
		onReady: function () { return false; },
		//reverse direction of rotation
		reverse: false,
	};

	$.Slicebox.prototype = {

		_init: function (options) {

			// options
			this.options = {
				...$.Slicebox.defaults,
				...options
			}

			// all the items
			this.$items = this.$el.children('li');
			// total number of items
			this.itemsCount = this.$items.length;
			// if there's no items return
			if (this.itemsCount === 0) {

				return false;

			};

			// suport for css 3d transforms and css transitions
			this.support = Modernizr.csstransitions && Modernizr.csstransforms3d;

			// current image index
			this.current = 0;

			// control if the slicebox is animating
			this.isAnimating = false;

			// control if slicebox is ready (all images loaded)
			this.isReady = false;

			// preload the images
			// we need to hide the items except first one (current default value)
			let $current = this.$items.eq(this.current).css('display', 'block').addClass('sb-current');

			// get real size of image
			let i = new Image();
			i.src = $current.find('img').attr('src');
			this.realWidth = i.width;

			// assuming all images with same size
			this._setSize();
			this._setStyle();
			this._initEvents();

			this.options.onReady();
			this.isReady = true;

			if (this.options.autoplay) {

				this._startSlideshow();

			}

		},

		_setSize: function () {

			let $visible = this.$items.eq(this.current).find('img');

			this.size = {
				width: $visible.width(),
				height: $visible.height()
			};

		},
		_setStyle: function () {

			// max-width is the real size of the images
			this.$el.css({
				'max-width': this.realWidth
			});

		},
		_initEvents: function () {

			let self = this;

			$window.on('resize', function (event) {

				// assuming all images with same size
				self._setSize();

			});

		},
		_startSlideshow: function () {

			let self = this;

			this.slideshow = setTimeout(function () {

				self._navigate('next');

				self._startSlideshow();


			}, this.options.interval);

		},

		_navigate: function (dir, pos) {

			if (this.isAnimating || !this.isReady || this.itemsCount < 2) {

				return false;

			}

			this.isAnimating = true;

			// current item's index
			this.prev = this.current;

			// if position is passed
			if (pos !== undefined) {

				this.current = pos;

			}
			// if not check the boundaries
			else if (dir === 'next') {

				this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;

			}
			else if (dir === 'prev') {

				this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;

			}
			this._layout(dir);
			this._rotate();


		},
		_layout: function (dir) {

			// create a structure like this and append it to the main container (this.$el):
			// <div>	wrapper with perspective
			//   <div>
			//     <div></div> front side
			//     <div></div> back side
			//     <div></div> right side
			//     <div></div> left side
			//     <div></div> top side
			//     <div></div> bottom side
			//   </div>
			//   <div>..</div>
			//   <div>..</div>
			//   <div>..</div>
			//   ...	number of slices defined in options
			// </div>

			let orientation = this.options.orientation;

			let boxStyle = {
				'width': this.size.width,
				'height': this.size.height,
				'perspective': this.options.perspective + 'px'
			}
				let config = {...this.options,... {
					size: this.size,
					items: this.$items,
					direction: dir,
					prev: this.prev,
					current: this.current,
					o: orientation
				}}

			this.$box = $('<div>').addClass('sb-perspective').css(boxStyle).appendTo(this.$el);

			this.cuboids = [];

			this.$el.css('overflow', 'visible');

			for (let i = 0; i < this.options.cuboidsCount; ++i) {

				let cuboid = new $.Cuboid(config, i);

				this.$box.append(cuboid.getEl());

				this.cuboids.push(cuboid);

			}

		},
		_rotate: function () {

			// hide current item
			this.$items.eq(this.prev).removeClass('sb-current').hide();

			for (let i = 0; i < this.options.cuboidsCount; ++i) {

				let cuboid = this.cuboids[i],
					self = this;

				cuboid.rotate(function (pos) {

					if (pos === self.options.cuboidsCount - 1) {

						self.$el.css('overflow', 'hidden');
						self.isAnimating = false;
						self.$box.remove();
						let $current = self.$items.eq(self.current);
						$current.css('display', 'block'); // show() makes it inline style
						$current.addClass('sb-current');


					}

				});

			}

		},
		// public methos: adds more items to the slicebox
		add: function ($items, callback) {

			this.$items = this.$items.add($items);
			this.itemsCount = this.$items.length;

			if (callback) {

				callback.call($items);

			}

		},
		// public method: shows next image
		next: function () {

			this._stopSlideshow();
			this._navigate('next');

		},
		// public method: shows previous image
		previous: function () {

			this._stopSlideshow();
			this._navigate('prev');

		},
		// public method: goes to a specific image
		jump: function (pos) {

			pos -= 1;

			if (pos === this.current || pos >= this.itemsCount || pos < 0) {

				return false;

			}

			this._stopSlideshow();
			this._navigate(pos > this.current ? 'next' : 'prev', pos);

		},
		// public method: starts the slideshow
		// any call to next(), previous() or jump() will stop the slideshow
		play: function () {

			if (!this.isPlaying) {

				this.isPlaying = true;

				this._navigate('next');
				this.options.autoplay = true;
				this._startSlideshow();

			}

		},
		// publicc methos: pauses the slideshow
		// public method: check if isAnimating is true
		isActive: function () {

			return this.isAnimating;

		},


	};

	$.Cuboid = function (config, pos) {

		this.config = config;
		this.pos = pos;
		this.side = 1;
		this._setSize();
		this._configureStyles();

	};

	$.Cuboid.prototype = {

		_setSize: function () {

			this.size = {
				width: this.config.o === 'v' ? Math.floor(this.config.size.width / this.config.cuboidsCount) : this.config.size.width,
				height: this.config.o === 'v' ? this.config.size.height : Math.floor(this.config.size.height / this.config.cuboidsCount)
			};
			// extra space to fix gaps
			this.extra = this.config.o === 'v' ? this.config.size.width - (this.size.width * this.config.cuboidsCount) : this.config.size.height - (this.size.height * this.config.cuboidsCount);

		},
		_configureStyles: function () {

			// style for the cuboid element
			// set z-indexes based on the cuboid's position
			let middlepos = Math.ceil(this.config.cuboidsCount / 2),
				positionStyle = this.pos < middlepos ? {
					zIndex: (this.pos + 1) * 100,
					left: (this.config.o === 'v') ? this.size.width * this.pos : 0,
					top: (this.config.o === 'v') ? 0 : this.size.height * this.pos
				} : {
					zIndex: (this.config.cuboidsCount - this.pos) * 100,
					left: (this.config.o === 'v') ? this.size.width * this.pos : 0,
					top: (this.config.o === 'v') ? 0 : this.size.height * this.pos
				};

			// how much this cuboid is going to move (left or top values)
			this.disperseFactor = this.config.disperseFactor * ((this.pos + 1) - middlepos);

			this.style = {
				'-webkit-transition': '-webkit-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'-moz-transition': '-moz-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'-o-transition': '-o-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'-ms-transition': '-ms-transform ' + this.config.speed + 'ms ' + this.config.easing,
				'transition': 'transform ' + this.config.speed + 'ms ' + this.config.easing,
				...positionStyle, ...this.size
			};

			let rotationDirection = this.config.reverse ? '' : '-'; //default negative
			let oppositeRotationDirection = this.config.reverse ? '-' : ''; //default positive

			this.animationStyles = {
				side1: (this.config.o === 'v') ? { 'transform': 'translate3d( 0, 0, -' + (this.size.height / 2) + 'px )' } : { 'transform': 'translate3d( 0, 0, -' + (this.size.width / 2) + 'px )' },
				side2: (this.config.o === 'v') ? { 'transform': 'translate3d( 0, 0, -' + (this.size.height / 2) + 'px ) rotate3d( 1, 0, 0, ' + rotationDirection + '90deg )' } : { 'transform': 'translate3d( 0, 0, -' + (this.size.width / 2) + 'px ) rotate3d( 0, 1, 0, ' + rotationDirection + '90deg )' },
				side3: (this.config.o === 'v') ? { 'transform': 'translate3d( 0, 0, -' + (this.size.height / 2) + 'px ) rotate3d( 1, 0, 0, ' + rotationDirection + '180deg )' } : { 'transform': 'translate3d( 0, 0, -' + (this.size.width / 2) + 'px ) rotate3d( 0, 1, 0, ' + rotationDirection + '180deg )' },
				side4: (this.config.o === 'v') ? { 'transform': 'translate3d( 0, 0, -' + (this.size.height / 2) + 'px ) rotate3d( 1, 0, 0, ' + rotationDirection + '270deg )' } : { 'transform': 'translate3d( 0, 0, -' + (this.size.width / 2) + 'px ) rotate3d( 0, 1, 0, ' + rotationDirection + '270deg )' }
			};

			let measure = (this.config.o === 'v') ? this.size.height : this.size.width;

			this.sidesStyles = {
				frontSideStyle: {
					width: (this.config.o === 'v') ? this.size.width + this.extra : this.size.width,
					height: (this.config.o === 'v') ? this.size.height : this.size.height + this.extra,
					backgroundColor: this.config.colorHiddenSides,
					transform: 'rotate3d( 0, 1, 0, 0deg ) translate3d( 0, 0, ' + (measure / 2) + 'px )'
				},
				backSideStyle: {
					width: this.size.width,
					height: this.size.height,
					backgroundColor: this.config.colorHiddenSides,
					transform: 'rotate3d( 0, 1, 0, ' + oppositeRotationDirection + '180deg ) translate3d( 0, 0, ' + (measure / 2) + 'px ) rotateZ( ' + oppositeRotationDirection + '180deg )'
				},
				rightSideStyle: {
					width: measure,
					height: (this.config.o === 'v') ? this.size.height : this.size.height + this.extra,
					left: (this.config.o === 'v') ? this.size.width / 2 - this.size.height / 2 : 0,
					backgroundColor: this.config.colorHiddenSides,
					transform: 'rotate3d( 0, 1, 0, ' + oppositeRotationDirection + '90deg ) translate3d( 0, 0, ' + (this.size.width / 2) + 'px )'
				},
				leftSideStyle: {
					width: measure,
					height: (this.config.o === 'v') ? this.size.height : this.size.height + this.extra,
					left: (this.config.o === 'v') ? this.size.width / 2 - this.size.height / 2 : 0,
					backgroundColor: this.config.colorHiddenSides,
					transform: 'rotate3d( 0, 1, 0, ' + rotationDirection + '90deg ) translate3d( 0, 0, ' + (this.size.width / 2) + 'px )'
				},
				topSideStyle: {
					width: (this.config.o === 'v') ? this.size.width + this.extra : this.size.width,
					height: measure,
					top: (this.config.o === 'v') ? 0 : this.size.height / 2 - this.size.width / 2,
					backgroundColor: this.config.colorHiddenSides,
					transform: 'rotate3d( 1, 0, 0, ' + oppositeRotationDirection + '90deg ) translate3d( 0, 0, ' + (this.size.height / 2) + 'px )'
				},
				bottomSideStyle: {
					width: (this.config.o === 'v') ? this.size.width + this.extra : this.size.width,
					height: measure,
					top: (this.config.o === 'v') ? 0 : this.size.height / 2 - this.size.width / 2,
					backgroundColor: this.config.colorHiddenSides,
					transform: 'rotate3d( 1, 0, 0, ' + rotationDirection + '90deg ) translate3d( 0, 0, ' + (this.size.height / 2) + 'px )'
				}
			};

		},
		getEl: function () {

			this.$el = $('<div/>').css(this.style)
				.css(this.animationStyles.side1)
				.append($('<div/>').addClass('sb-side').css(this.sidesStyles.frontSideStyle))
				.append($('<div/>').addClass('sb-side').css(this.sidesStyles.backSideStyle))
				.append($('<div/>').addClass('sb-side').css(this.sidesStyles.rightSideStyle))
				.append($('<div/>').addClass('sb-side').css(this.sidesStyles.leftSideStyle))
				.append($('<div/>').addClass('sb-side').css(this.sidesStyles.topSideStyle))
				.append($('<div/>').addClass('sb-side').css(this.sidesStyles.bottomSideStyle));

			this._showImage(this.config.prev);

			return this.$el;

		},
		_showImage: function (imgPos) {

			let sideIdx,
				$item = this.config.items.eq(imgPos),
				imgParam = {
					'background-size': this.config.size.width + 'px ' + this.config.size.height + 'px'
				};

			imgParam.backgroundImage = 'url(' + $item.find('img').attr('src') + ')';

			switch (this.side) {

				case 1: sideIdx = 0; break;
				case 2: sideIdx = (this.config.o === 'v') ? 4 : 2; break;
				case 3: sideIdx = 1; break;
				case 4: sideIdx = (this.config.o === 'v') ? 5 : 3; break;

			};

			imgParam.backgroundPosition = (this.config.o === 'v') ? - (this.pos * this.size.width) + 'px 0px' : '0px -' + (this.pos * this.size.height) + 'px';
			this.$el.children().eq(sideIdx).css(imgParam);

		},
		rotate: function (callback) {

			let self = this, animationStyle;

			setTimeout(function () {
				if (self.config.direction === 'next') {

					switch (self.side) {
						case 1: animationStyle = self.animationStyles.side2; self.side = 2; break;
						case 2: animationStyle = self.animationStyles.side3; self.side = 3; break;
						case 3: animationStyle = self.animationStyles.side4; self.side = 4; break;
						case 4: animationStyle = self.animationStyles.side1; self.side = 1; break;
					};

				}
				else {

					switch (self.side) {
						case 1: animationStyle = self.animationStyles.side4; self.side = 4; break;
						case 2: animationStyle = self.animationStyles.side1; self.side = 1; break;
						case 3: animationStyle = self.animationStyles.side2; self.side = 2; break;
						case 4: animationStyle = self.animationStyles.side3; self.side = 3; break;
					};

				}

				self._showImage(self.config.current);

				let animateOut = {}, animateIn = {};

				if (self.config.o === 'v') {

					animateOut.left = '+=' + self.disperseFactor + 'px';
					animateIn.left = '-=' + self.disperseFactor + 'px';

				}
				else if (self.config.o === 'h') {

					animateOut.top = '+=' + self.disperseFactor + 'px';
					animateIn.top = '-=' + self.disperseFactor + 'px';

				}

				self.$el.css(animationStyle).animate(animateOut, self.config.speed / 2).animate(animateIn, self.config.speed / 2, function () {

					if (callback) {

						callback.call(self, self.pos);

					}

				});

			}, this.config.sequentialFactor * this.pos + 30);

		}

	};


	$.fn.slicebox = function (options) {


		$.data(this, 'slicebox', new $.Slicebox(options, this));


		return self;

	};

})(jQuery, window);
