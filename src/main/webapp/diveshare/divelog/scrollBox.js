var isIE = false;
var ScrollBox = (function(b) {
	function a(j) {
		var m = j.box,
			u = j.contBoard,
			x = j.interval,
			B = j.autoPlay,
			d = j.list,
			c;
		var t = j.loginfo ? j.loginfo : null;
		if (t && t.sid && t.keyword) {
			c = true;
		}
		var A = d.length,
			o = 100,
			e = j.startIndex,
			q, D = "",
			G = true,
			y = e + 1,
			f = true;
		if (A == 1) {
			return z(true);
		}
		
		var k = d.eq(0),
			l = d.eq(A - 1);
		u.css({
			width: o * (A + 2) + "%"
		});
		if (m.attr("id") !== "switch_img") {
			d.css("width", 100 / (A + 2) + "%");
		}
		for (var C = 0; C < A; C++) {
			D += "<a href='javascript:;' index='" + C + "'></a>";
		}
		var F = "";
		var v = e;
		var h = A;
		if (b(".b_zoomimg").length > 0) {
			D = '<div class="btns" style="margin-left:-999px;" id="js_imgbtns">' + D + "</div>";
			F = '<div class="imgNum" id="js_imgNumBox"><span class="currentNum">' + v + "</span> / " + h + "</div>";
		} else {
			D = '<div class="btns" id="js_imgbtns">' + D + "</div>";
			F = '<div class="imgNum" style="display:none;" id="js_imgNumBox"><span class="currentNum">' + v + "</span> / " + h + "</div>";
		}
		m.append(F);
		m.append(D);
		u.append(k.clone(true));
		u.prepend(l.clone(true));
		m.find(".btns a").on("click", function() {
			if (q) {
				clearInterval(q);
			}
			e = parseInt(b(this).attr("index"));
			z();
			B && r();
		});
		u.find("img").on("click", function(i) {});
		var E = u;
		if (isIE) {
			E = u.find("img");
		}
		E.swipeLeft(function() {
			if (e != m.find(".btns a.current").index()) {
				return false;
			}
			G = true;
			if (q) {
				clearInterval(q);
			}
			e++;
			e = e == A ? 0 : e;
			f = false;
			z();
			B && r();
		});
		E.swipeRight(function() {
			if (e != m.find(".btns a.current").index()) {
				return false;
			}
			G = false;
			if (q) {
				clearInterval(q);
			}
			e--;
			e = e == -1 ? (A - 1) : e;
			f = false;
			z();
			B && r();
		});

		function z(i) {
			if (A == 1) {
				y = 0;
			} else {
				if (!f) {
					if (G) {
						y = e == 0 ? A + 1 : e + 1;
					} else {
						y = e == A - 1 ? 0 : e + 1;
					}
				}
			}
			H(b("li", m));
			if (i) {
				u.css({
					marginLeft: -y * o + "%"
				});
				m.find(".btns a").eq(e).addClass("current").siblings("a").removeClass("current");
				m.find(".imgNum .currentNum").html(e + 1);
				return false;
			}
			u.animate({
				marginLeft: -y * o + "%"
			}, 500, "ease-out", function() {
				m.find(".btns a").eq(e).addClass("current").siblings("a").removeClass("current");
				y == A + 1 ? u.css({
					marginLeft: "-100%"
				}) : null;
				y == 0 ? u.css({
					marginLeft: -A * o + "%"
				}) : null;
				m.find(".imgNum .currentNum").html(e + 1);
				if (c) {
					TouchLog.send(t.sid, t.keyword);
				}
			});
		}
		function r() {
			q = setInterval(function() {
				f = false;
				G = true;
				e++;
				if (e == A) {
					e = 0;
				}
				z();
			}, x);
		}
		function H(w) {
			var s = w.eq(y).find("img"),
				p;
			var n = s.attr("orisrc");
			if (!n) {
				return false;
			}
			var i = function() {
					s.attr("src", n);
					s.removeAttr("orisrc");
					if (e == 0) {
						p = w.eq(A + 1).find("img");
					} else {
						if (e == A - 1) {
							p = w.eq(0).find("img");
						}
					}
					if (y == A + 1) {
						p = d.eq(0).find("img");
					} else {
						if (y == 0) {
							p = d.eq(A - 1).find("img");
						}
					}
					if (p) {
						p.attr("src", n);
						p.removeAttr("orisrc");
					}
				};
			g(n, i);
		}
		function g(n, p) {
			var i = new Image();
			i.onload = function() {
				i.onload = null;
				p(i);
			};
			i.src = n;
		}
		if (B) {
			r();
		}
		return z(true);
	}
	return {
		initScroll: a
	};
})($);


/*
 * iScroll v4.2.5 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(i, E) {
	var u = Math,
		n = E.createElement("div").style,
		z = (function() {
			var H = "t,webkitT,MozT,msT,OT".split(","),
				G, F = 0,
				m = H.length;
			for (; F < m; F++) {
				G = H[F] + "ransform";
				if (G in n) {
					return H[F].substr(0, H[F].length - 1);
				}
			}
			return false;
		})(),
		D = z ? "-" + z.toLowerCase() + "-" : "",
		l = s("transform"),
		x = s("transitionProperty"),
		k = s("transitionDuration"),
		o = s("transformOrigin"),
		B = s("transitionTimingFunction"),
		e = s("transitionDelay"),
		A = (/android/gi).test(navigator.appVersion),
		h = (/iphone|ipad/gi).test(navigator.appVersion),
		r = (/hp-tablet/gi).test(navigator.appVersion),
		j = s("perspective") in n,
		y = "ontouchstart" in i && !r,
		d = z !== false,
		f = s("transition") in n,
		g = "onorientationchange" in i ? "orientationchange" : "resize",
		b = y ? "touchstart" : "mousedown",
		t = y ? "touchmove" : "mousemove",
		c = y ? "touchend" : "mouseup",
		w = y ? "touchcancel" : "mouseup",
		a = (function() {
			if (z === false) {
				return false;
			}
			var m = {
				"": "transitionend",
				webkit: "webkitTransitionEnd",
				Moz: "transitionend",
				O: "otransitionend",
				ms: "MSTransitionEnd"
			};
			return m[z];
		})(),
		q = (function() {
			return i.requestAnimationFrame || i.webkitRequestAnimationFrame || i.mozRequestAnimationFrame || i.oRequestAnimationFrame || i.msRequestAnimationFrame ||
			function(m) {
				return setTimeout(m, 1);
			};
		})(),
		p = (function() {
			return i.cancelRequestAnimationFrame || i.webkitCancelAnimationFrame || i.webkitCancelRequestAnimationFrame || i.mozCancelRequestAnimationFrame || i.oCancelRequestAnimationFrame || i.msCancelRequestAnimationFrame || clearTimeout;
		})(),
		C = j ? " translateZ(0)" : "",
		v = function(G, m) {
			var H = this,
				F;
			H.wrapper = typeof G == "object" ? G : E.getElementById(G);
			H.wrapper.style.overflow = "hidden";
			H.scroller = H.wrapper.children[0];
			H.options = {
				hScroll: true,
				vScroll: true,
				x: 0,
				y: 0,
				bounce: true,
				bounceLock: false,
				momentum: true,
				lockDirection: true,
				useTransform: true,
				useTransition: false,
				topOffset: 0,
				checkDOMChanges: false,
				handleClick: true,
				hScrollbar: true,
				vScrollbar: true,
				fixedScrollbar: A,
				hideScrollbar: h,
				fadeScrollbar: h && j,
				scrollbarClass: "",
				zoom: false,
				zoomMin: 1,
				zoomMax: 4,
				doubleTapZoom: 2,
				wheelAction: "scroll",
				snap: false,
				snapThreshold: 1,
				onRefresh: null,
				onBeforeScrollStart: function(I) {
					I.preventDefault();
				},
				onScrollStart: null,
				onBeforeScrollMove: null,
				onScrollMove: null,
				onBeforeScrollEnd: null,
				onScrollEnd: null,
				onTouchEnd: null,
				onDestroy: null,
				onZoomStart: null,
				onZoom: null,
				onZoomEnd: null
			};
			for (F in m) {
				H.options[F] = m[F];
			}
			H.x = H.options.x;
			H.y = H.options.y;
			H.options.useTransform = d && H.options.useTransform;
			H.options.hScrollbar = H.options.hScroll && H.options.hScrollbar;
			H.options.vScrollbar = H.options.vScroll && H.options.vScrollbar;
			H.options.zoom = H.options.useTransform && H.options.zoom;
			H.options.useTransition = f && H.options.useTransition;
			if (H.options.zoom && A) {
				C = "";
			}
			H.scroller.style[x] = H.options.useTransform ? D + "transform" : "top left";
			H.scroller.style[k] = "0";
			H.scroller.style[o] = "0 0";
			if (H.options.useTransition) {
				H.scroller.style[B] = "cubic-bezier(0.33,0.66,0.66,1)";
			}
			if (H.options.useTransform) {
				H.scroller.style[l] = "translate(" + H.x + "px," + H.y + "px)" + C;
			} else {
				H.scroller.style.cssText += ";position:absolute;top:" + H.y + "px;left:" + H.x + "px";
			}
			if (H.options.useTransition) {
				H.options.fixedScrollbar = true;
			}
			H.refresh();
			H._bind(g, i);
			H._bind(b);
			if (!y) {
				if (H.options.wheelAction != "none") {
					H._bind("DOMMouseScroll");
					H._bind("mousewheel");
				}
			}
			if (H.options.checkDOMChanges) {
				H.checkDOMTime = setInterval(function() {
					H._checkDOMChanges();
				}, 500);
			}
		};
	v.prototype = {
		enabled: true,
		x: 0,
		y: 0,
		steps: [],
		scale: 1,
		currPageX: 0,
		currPageY: 0,
		pagesX: [],
		pagesY: [],
		aniTime: null,
		wheelZoomCount: 0,
		handleEvent: function(F) {
			var m = this;
			switch (F.type) {
			case b:
				if (!y && F.button !== 0) {
					return;
				}
				m._start(F);
				break;
			case t:
				m._move(F);
				break;
			case c:
			case w:
				m._end(F);
				break;
			case g:
				m._resize();
				break;
			case "DOMMouseScroll":
			case "mousewheel":
				m._wheel(F);
				break;
			case a:
				m._transitionEnd(F);
				break;
			}
		},
		_checkDOMChanges: function() {
			if (this.moved || this.zoomed || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) {
				return;
			}
			this.refresh();
		},
		_scrollbar: function(m) {
			var G = this,
				F;
			if (!G[m + "Scrollbar"]) {
				if (G[m + "ScrollbarWrapper"]) {
					if (d) {
						G[m + "ScrollbarIndicator"].style[l] = "";
					}
					G[m + "ScrollbarWrapper"].parentNode.removeChild(G[m + "ScrollbarWrapper"]);
					G[m + "ScrollbarWrapper"] = null;
					G[m + "ScrollbarIndicator"] = null;
				}
				return;
			}
			if (!G[m + "ScrollbarWrapper"]) {
				F = E.createElement("div");
				if (G.options.scrollbarClass) {
					F.className = G.options.scrollbarClass + m.toUpperCase();
				} else {
					F.style.cssText = "position:absolute;z-index:100;" + (m == "h" ? "height:7px;bottom:1px;left:2px;right:" + (G.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (G.hScrollbar ? "7" : "2") + "px;top:2px;right:1px");
				}
				F.style.cssText += ";pointer-events:none;" + D + "transition-property:opacity;" + D + "transition-duration:" + (G.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (G.options.hideScrollbar ? "0" : "1");
				G.wrapper.appendChild(F);
				G[m + "ScrollbarWrapper"] = F;
				F = E.createElement("div");
				if (!G.options.scrollbarClass) {
					F.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + D + "background-clip:padding-box;" + D + "box-sizing:border-box;" + (m == "h" ? "height:100%" : "width:100%") + ";" + D + "border-radius:3px;border-radius:3px";
				}
				F.style.cssText += ";pointer-events:none;" + D + "transition-property:" + D + "transform;" + D + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + D + "transition-duration:0;" + D + "transform: translate(0,0)" + C;
				if (G.options.useTransition) {
					F.style.cssText += ";" + D + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)";
				}
				G[m + "ScrollbarWrapper"].appendChild(F);
				G[m + "ScrollbarIndicator"] = F;
			}
			if (m == "h") {
				G.hScrollbarSize = G.hScrollbarWrapper.clientWidth;
				G.hScrollbarIndicatorSize = u.max(u.round(G.hScrollbarSize * G.hScrollbarSize / G.scrollerW), 8);
				G.hScrollbarIndicator.style.width = G.hScrollbarIndicatorSize + "px";
				G.hScrollbarMaxScroll = G.hScrollbarSize - G.hScrollbarIndicatorSize;
				G.hScrollbarProp = G.hScrollbarMaxScroll / G.maxScrollX;
			} else {
				G.vScrollbarSize = G.vScrollbarWrapper.clientHeight;
				G.vScrollbarIndicatorSize = u.max(u.round(G.vScrollbarSize * G.vScrollbarSize / G.scrollerH), 8);
				G.vScrollbarIndicator.style.height = G.vScrollbarIndicatorSize + "px";
				G.vScrollbarMaxScroll = G.vScrollbarSize - G.vScrollbarIndicatorSize;
				G.vScrollbarProp = G.vScrollbarMaxScroll / G.maxScrollY;
			}
			G._scrollbarPos(m, true);
		},
		_resize: function() {
			var m = this;
			setTimeout(function() {
				m.refresh();
			}, A ? 200 : 0);
		},
		_pos: function(m, F) {
			if (this.zoomed) {
				return;
			}
			m = this.hScroll ? m : 0;
			F = this.vScroll ? F : 0;
			if (this.options.useTransform) {
				this.scroller.style[l] = "translate(" + m + "px," + F + "px) scale(" + this.scale + ")" + C;
			} else {
				m = u.round(m);
				F = u.round(F);
				this.scroller.style.left = m + "px";
				this.scroller.style.top = F + "px";
			}
			this.x = m;
			this.y = F;
			this._scrollbarPos("h");
			this._scrollbarPos("v");
		},
		_scrollbarPos: function(m, H) {
			var G = this,
				I = m == "h" ? G.x : G.y,
				F;
			if (!G[m + "Scrollbar"]) {
				return;
			}
			I = G[m + "ScrollbarProp"] * I;
			if (I < 0) {
				if (!G.options.fixedScrollbar) {
					F = G[m + "ScrollbarIndicatorSize"] + u.round(I * 3);
					if (F < 8) {
						F = 8;
					}
					G[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = F + "px";
				}
				I = 0;
			} else {
				if (I > G[m + "ScrollbarMaxScroll"]) {
					if (!G.options.fixedScrollbar) {
						F = G[m + "ScrollbarIndicatorSize"] - u.round((I - G[m + "ScrollbarMaxScroll"]) * 3);
						if (F < 8) {
							F = 8;
						}
						G[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = F + "px";
						I = G[m + "ScrollbarMaxScroll"] + (G[m + "ScrollbarIndicatorSize"] - F);
					} else {
						I = G[m + "ScrollbarMaxScroll"];
					}
				}
			}
			G[m + "ScrollbarWrapper"].style[e] = "0";
			G[m + "ScrollbarWrapper"].style.opacity = H && G.options.hideScrollbar ? "0" : "1";
			G[m + "ScrollbarIndicator"].style[l] = "translate(" + (m == "h" ? I + "px,0)" : "0," + I + "px)") + C;
		},
		_start: function(K) {
			var J = this,
				F = y ? K.touches[0] : K,
				G, m, L, I, H;
			if (!J.enabled) {
				return;
			}
			if (J.options.onBeforeScrollStart) {
				J.options.onBeforeScrollStart.call(J, K);
			}
			if (J.options.useTransition || J.options.zoom) {
				J._transitionTime(0);
			}
			J.moved = false;
			J.animating = false;
			J.zoomed = false;
			J.distX = 0;
			J.distY = 0;
			J.absDistX = 0;
			J.absDistY = 0;
			J.dirX = 0;
			J.dirY = 0;
			if (J.options.zoom && y && K.touches.length > 1) {
				I = u.abs(K.touches[0].pageX - K.touches[1].pageX);
				H = u.abs(K.touches[0].pageY - K.touches[1].pageY);
				J.touchesDistStart = u.sqrt(I * I + H * H);
				J.originX = u.abs(K.touches[0].pageX + K.touches[1].pageX - J.wrapperOffsetLeft * 2) / 2 - J.x;
				J.originY = u.abs(K.touches[0].pageY + K.touches[1].pageY - J.wrapperOffsetTop * 2) / 2 - J.y;
				if (J.options.onZoomStart) {
					J.options.onZoomStart.call(J, K);
				}
			}
			if (J.options.momentum) {
				if (J.options.useTransform) {
					G = getComputedStyle(J.scroller, null)[l].replace(/[^0-9\-.,]/g, "").split(",");
					m = +(G[12] || G[4]);
					L = +(G[13] || G[5]);
				} else {
					m = +getComputedStyle(J.scroller, null).left.replace(/[^0-9-]/g, "");
					L = +getComputedStyle(J.scroller, null).top.replace(/[^0-9-]/g, "");
				}
				if (m != J.x || L != J.y) {
					if (J.options.useTransition) {
						J._unbind(a);
					} else {
						p(J.aniTime);
					}
					J.steps = [];
					J._pos(m, L);
					if (J.options.onScrollEnd) {
						J.options.onScrollEnd.call(J);
					}
				}
			}
			J.absStartX = J.x;
			J.absStartY = J.y;
			J.startX = J.x;
			J.startY = J.y;
			J.pointX = F.pageX;
			J.pointY = F.pageY;
			J.startTime = K.timeStamp || Date.now();
			if (J.options.onScrollStart) {
				J.options.onScrollStart.call(J, K);
			}
			J._bind(t, i);
			J._bind(c, i);
			J._bind(w, i);
		},
		_move: function(M) {
			var K = this,
				N = y ? M.touches[0] : M,
				I = N.pageX - K.pointX,
				G = N.pageY - K.pointY,
				m = K.x + I,
				O = K.y + G,
				J, H, F, L = M.timeStamp || Date.now();
			if (K.options.onBeforeScrollMove) {
				K.options.onBeforeScrollMove.call(K, M);
			}
			if (K.options.zoom && y && M.touches.length > 1) {
				J = u.abs(M.touches[0].pageX - M.touches[1].pageX);
				H = u.abs(M.touches[0].pageY - M.touches[1].pageY);
				K.touchesDist = u.sqrt(J * J + H * H);
				K.zoomed = true;
				F = 1 / K.touchesDistStart * K.touchesDist * this.scale;
				if (F < K.options.zoomMin) {
					F = 0.5 * K.options.zoomMin * Math.pow(2, F / K.options.zoomMin);
				} else {
					if (F > K.options.zoomMax) {
						F = 2 * K.options.zoomMax * Math.pow(0.5, K.options.zoomMax / F);
					}
				}
				K.lastScale = F / this.scale;
				m = this.originX - this.originX * K.lastScale + this.x;
				O = this.originY - this.originY * K.lastScale + this.y;
				this.scroller.style[l] = "translate(" + m + "px," + O + "px) scale(" + F + ")" + C;
				if (K.options.onZoom) {
					K.options.onZoom.call(K, M);
				}
				return;
			}
			K.pointX = N.pageX;
			K.pointY = N.pageY;
			if (m > 0 || m < K.maxScrollX) {
				m = K.options.bounce ? K.x + (I / 2) : m >= 0 || K.maxScrollX >= 0 ? 0 : K.maxScrollX;
			}
			if (O > K.minScrollY || O < K.maxScrollY) {
				O = K.options.bounce ? K.y + (G / 2) : O >= K.minScrollY || K.maxScrollY >= 0 ? K.minScrollY : K.maxScrollY;
			}
			K.distX += I;
			K.distY += G;
			K.absDistX = u.abs(K.distX);
			K.absDistY = u.abs(K.distY);
			if (K.absDistX < 6 && K.absDistY < 6) {
				return;
			}
			if (K.options.lockDirection) {
				if (K.absDistX > K.absDistY + 5) {
					O = K.y;
					G = 0;
				} else {
					if (K.absDistY > K.absDistX + 5) {
						m = K.x;
						I = 0;
					}
				}
			}
			K.moved = true;
			K._pos(m, O);
			K.dirX = I > 0 ? -1 : I < 0 ? 1 : 0;
			K.dirY = G > 0 ? -1 : G < 0 ? 1 : 0;
			if (L - K.startTime > 300) {
				K.startTime = L;
				K.startX = K.x;
				K.startY = K.y;
			}
			if (K.options.onScrollMove) {
				K.options.onScrollMove.call(K, M);
			}
		},
		_end: function(M) {
			if (y && M.touches.length !== 0) {
				return;
			}
			var K = this,
				S = y ? M.changedTouches[0] : M,
				N, R, G = {
					dist: 0,
					time: 0
				},
				m = {
					dist: 0,
					time: 0
				},
				J = (M.timeStamp || Date.now()) - K.startTime,
				O = K.x,
				L = K.y,
				Q, P, F, I, H;
			K._unbind(t, i);
			K._unbind(c, i);
			K._unbind(w, i);
			if (K.options.onBeforeScrollEnd) {
				K.options.onBeforeScrollEnd.call(K, M);
			}
			if (K.zoomed) {
				H = K.scale * K.lastScale;
				H = Math.max(K.options.zoomMin, H);
				H = Math.min(K.options.zoomMax, H);
				K.lastScale = H / K.scale;
				K.scale = H;
				K.x = K.originX - K.originX * K.lastScale + K.x;
				K.y = K.originY - K.originY * K.lastScale + K.y;
				K.scroller.style[k] = "200ms";
				K.scroller.style[l] = "translate(" + K.x + "px," + K.y + "px) scale(" + K.scale + ")" + C;
				K.zoomed = false;
				K.refresh();
				if (K.options.onZoomEnd) {
					K.options.onZoomEnd.call(K, M);
				}
				return;
			}
			if (!K.moved) {
				if (y) {
					if (K.doubleTapTimer && K.options.zoom) {
						clearTimeout(K.doubleTapTimer);
						K.doubleTapTimer = null;
						if (K.options.onZoomStart) {
							K.options.onZoomStart.call(K, M);
						}
						K.zoom(K.pointX, K.pointY, K.scale == 1 ? K.options.doubleTapZoom : 1);
						if (K.options.onZoomEnd) {
							setTimeout(function() {
								K.options.onZoomEnd.call(K, M);
							}, 200);
						}
					} else {
						if (this.options.handleClick) {
							K.doubleTapTimer = setTimeout(function() {
								K.doubleTapTimer = null;
								N = S.target;
								while (N.nodeType != 1) {
									N = N.parentNode;
								}
								if (N.tagName != "SELECT" && N.tagName != "INPUT" && N.tagName != "TEXTAREA") {
									R = E.createEvent("MouseEvents");
									R.initMouseEvent("click", true, true, M.view, 1, S.screenX, S.screenY, S.clientX, S.clientY, M.ctrlKey, M.altKey, M.shiftKey, M.metaKey, 0, null);
									R._fake = true;
									N.dispatchEvent(R);
								}
							}, K.options.zoom ? 250 : 0);
						}
					}
				}
				K._resetPos(400);
				if (K.options.onTouchEnd) {
					K.options.onTouchEnd.call(K, M);
				}
				return;
			}
			if (J < 300 && K.options.momentum) {
				G = O ? K._momentum(O - K.startX, J, -K.x, K.scrollerW - K.wrapperW + K.x, K.options.bounce ? K.wrapperW : 0) : G;
				m = L ? K._momentum(L - K.startY, J, -K.y, (K.maxScrollY < 0 ? K.scrollerH - K.wrapperH + K.y - K.minScrollY : 0), K.options.bounce ? K.wrapperH : 0) : m;
				O = K.x + G.dist;
				L = K.y + m.dist;
				if ((K.x > 0 && O > 0) || (K.x < K.maxScrollX && O < K.maxScrollX)) {
					G = {
						dist: 0,
						time: 0
					};
				}
				if ((K.y > K.minScrollY && L > K.minScrollY) || (K.y < K.maxScrollY && L < K.maxScrollY)) {
					m = {
						dist: 0,
						time: 0
					};
				}
			}
			if (G.dist || m.dist) {
				F = u.max(u.max(G.time, m.time), 10);
				if (K.options.snap) {
					Q = O - K.absStartX;
					P = L - K.absStartY;
					if (u.abs(Q) < K.options.snapThreshold && u.abs(P) < K.options.snapThreshold) {
						K.scrollTo(K.absStartX, K.absStartY, 200);
					} else {
						I = K._snap(O, L);
						O = I.x;
						L = I.y;
						F = u.max(I.time, F);
					}
				}
				K.scrollTo(u.round(O), u.round(L), F);
				if (K.options.onTouchEnd) {
					K.options.onTouchEnd.call(K, M);
				}
				return;
			}
			if (K.options.snap) {
				Q = O - K.absStartX;
				P = L - K.absStartY;
				if (u.abs(Q) < K.options.snapThreshold && u.abs(P) < K.options.snapThreshold) {
					K.scrollTo(K.absStartX, K.absStartY, 200);
				} else {
					I = K._snap(K.x, K.y);
					if (I.x != K.x || I.y != K.y) {
						K.scrollTo(I.x, I.y, I.time);
					}
				}
				if (K.options.onTouchEnd) {
					K.options.onTouchEnd.call(K, M);
				}
				return;
			}
			K._resetPos(200);
			if (K.options.onTouchEnd) {
				K.options.onTouchEnd.call(K, M);
			}
		},
		_resetPos: function(G) {
			var m = this,
				H = m.x >= 0 ? 0 : m.x < m.maxScrollX ? m.maxScrollX : m.x,
				F = m.y >= m.minScrollY || m.maxScrollY > 0 ? m.minScrollY : m.y < m.maxScrollY ? m.maxScrollY : m.y;
			if (H == m.x && F == m.y) {
				if (m.moved) {
					m.moved = false;
					if (m.options.onScrollEnd) {
						m.options.onScrollEnd.call(m);
					}
				}
				if (m.hScrollbar && m.options.hideScrollbar) {
					if (z == "webkit") {
						m.hScrollbarWrapper.style[e] = "300ms";
					}
					m.hScrollbarWrapper.style.opacity = "0";
				}
				if (m.vScrollbar && m.options.hideScrollbar) {
					if (z == "webkit") {
						m.vScrollbarWrapper.style[e] = "300ms";
					}
					m.vScrollbarWrapper.style.opacity = "0";
				}
				return;
			}
			m.scrollTo(H, F, G || 0);
		},
		_wheel: function(J) {
			var H = this,
				I, G, F, m, K;
			if ("wheelDeltaX" in J) {
				I = J.wheelDeltaX / 12;
				G = J.wheelDeltaY / 12;
			} else {
				if ("wheelDelta" in J) {
					I = G = J.wheelDelta / 12;
				} else {
					if ("detail" in J) {
						I = G = -J.detail * 3;
					} else {
						return;
					}
				}
			}
			if (H.options.wheelAction == "zoom") {
				K = H.scale * Math.pow(2, 1 / 3 * (G ? G / Math.abs(G) : 0));
				if (K < H.options.zoomMin) {
					K = H.options.zoomMin;
				}
				if (K > H.options.zoomMax) {
					K = H.options.zoomMax;
				}
				if (K != H.scale) {
					if (!H.wheelZoomCount && H.options.onZoomStart) {
						H.options.onZoomStart.call(H, J);
					}
					H.wheelZoomCount++;
					H.zoom(J.pageX, J.pageY, K, 400);
					setTimeout(function() {
						H.wheelZoomCount--;
						if (!H.wheelZoomCount && H.options.onZoomEnd) {
							H.options.onZoomEnd.call(H, J);
						}
					}, 400);
				}
				return;
			}
			F = H.x + I;
			m = H.y + G;
			if (F > 0) {
				F = 0;
			} else {
				if (F < H.maxScrollX) {
					F = H.maxScrollX;
				}
			}
			if (m > H.minScrollY) {
				m = H.minScrollY;
			} else {
				if (m < H.maxScrollY) {
					m = H.maxScrollY;
				}
			}
			if (H.maxScrollY < 0) {
				H.scrollTo(F, m, 0);
			}
		},
		_transitionEnd: function(F) {
			var m = this;
			if (F.target != m.scroller) {
				return;
			}
			m._unbind(a);
			m._startAni();
		},
		_startAni: function() {
			var K = this,
				F = K.x,
				m = K.y,
				I = Date.now(),
				J, H, G;
			if (K.animating) {
				return;
			}
			if (!K.steps.length) {
				K._resetPos(400);
				return;
			}
			J = K.steps.shift();
			if (J.x == F && J.y == m) {
				J.time = 0;
			}
			K.animating = true;
			K.moved = true;
			if (K.options.useTransition) {
				K._transitionTime(J.time);
				K._pos(J.x, J.y);
				K.animating = false;
				if (J.time) {
					K._bind(a);
				} else {
					K._resetPos(0);
				}
				return;
			}
			G = function() {
				var L = Date.now(),
					N, M;
				if (L >= I + J.time) {
					K._pos(J.x, J.y);
					K.animating = false;
					if (K.options.onAnimationEnd) {
						K.options.onAnimationEnd.call(K);
					}
					K._startAni();
					return;
				}
				L = (L - I) / J.time - 1;
				H = u.sqrt(1 - L * L);
				N = (J.x - F) * H + F;
				M = (J.y - m) * H + m;
				K._pos(N, M);
				if (K.animating) {
					K.aniTime = q(G);
				}
			};
			G();
		},
		_transitionTime: function(m) {
			m += "ms";
			this.scroller.style[k] = m;
			if (this.hScrollbar) {
				this.hScrollbarIndicator.style[k] = m;
			}
			if (this.vScrollbar) {
				this.vScrollbarIndicator.style[k] = m;
			}
		},
		_momentum: function(L, F, J, m, N) {
			var K = 0.0006,
				G = u.abs(L) / F,
				H = (G * G) / (2 * K),
				M = 0,
				I = 0;
			if (L > 0 && H > J) {
				I = N / (6 / (H / G * K));
				J = J + I;
				G = G * J / H;
				H = J;
			} else {
				if (L < 0 && H > m) {
					I = N / (6 / (H / G * K));
					m = m + I;
					G = G * m / H;
					H = m;
				}
			}
			H = H * (L < 0 ? -1 : 1);
			M = G / K;
			return {
				dist: H,
				time: u.round(M)
			};
		},
		_offset: function(m) {
			var G = -m.offsetLeft,
				F = -m.offsetTop;
			while (m = m.offsetParent) {
				G -= m.offsetLeft;
				F -= m.offsetTop;
			}
			if (m != this.wrapper) {
				G *= this.scale;
				F *= this.scale;
			}
			return {
				left: G,
				top: F
			};
		},
		_snap: function(M, L) {
			var J = this,
				I, H, K, G, F, m;
			K = J.pagesX.length - 1;
			for (I = 0, H = J.pagesX.length; I < H; I++) {
				if (M >= J.pagesX[I]) {
					K = I;
					break;
				}
			}
			if (K == J.currPageX && K > 0 && J.dirX < 0) {
				K--;
			}
			M = J.pagesX[K];
			F = u.abs(M - J.pagesX[J.currPageX]);
			F = F ? u.abs(J.x - M) / F * 500 : 0;
			J.currPageX = K;
			K = J.pagesY.length - 1;
			for (I = 0; I < K; I++) {
				if (L >= J.pagesY[I]) {
					K = I;
					break;
				}
			}
			if (K == J.currPageY && K > 0 && J.dirY < 0) {
				K--;
			}
			L = J.pagesY[K];
			m = u.abs(L - J.pagesY[J.currPageY]);
			m = m ? u.abs(J.y - L) / m * 500 : 0;
			J.currPageY = K;
			G = u.round(u.max(F, m)) || 200;
			return {
				x: M,
				y: L,
				time: G
			};
		},
		_bind: function(G, F, m) {
			(F || this.scroller).addEventListener(G, this, !! m);
		},
		_unbind: function(G, F, m) {
			(F || this.scroller).removeEventListener(G, this, !! m);
		},
		destroy: function() {
			var m = this;
			m.scroller.style[l] = "";
			m.hScrollbar = false;
			m.vScrollbar = false;
			m._scrollbar("h");
			m._scrollbar("v");
			m._unbind(g, i);
			m._unbind(b);
			m._unbind(t, i);
			m._unbind(c, i);
			m._unbind(w, i);
			if (!m.options.hasTouch) {
				m._unbind("DOMMouseScroll");
				m._unbind("mousewheel");
			}
			if (m.options.useTransition) {
				m._unbind(a);
			}
			if (m.options.checkDOMChanges) {
				clearInterval(m.checkDOMTime);
			}
			if (m.options.onDestroy) {
				m.options.onDestroy.call(m);
			}
		},
		refresh: function() {
			var H = this,
				J, G, m, F, K = 0,
				I = 0;
			if (H.scale < H.options.zoomMin) {
				H.scale = H.options.zoomMin;
			}
			H.wrapperW = H.wrapper.clientWidth || 1;
			H.wrapperH = H.wrapper.clientHeight || 1;
			H.minScrollY = -H.options.topOffset || 0;
			H.scrollerW = u.round(H.scroller.offsetWidth * H.scale);
			H.scrollerH = u.round((H.scroller.offsetHeight + H.minScrollY) * H.scale);
			H.maxScrollX = H.wrapperW - H.scrollerW;
			H.maxScrollY = H.wrapperH - H.scrollerH + H.minScrollY;
			H.dirX = 0;
			H.dirY = 0;
			if (H.options.onRefresh) {
				H.options.onRefresh.call(H);
			}
			H.hScroll = H.options.hScroll && H.maxScrollX < 0;
			H.vScroll = H.options.vScroll && (!H.options.bounceLock && !H.hScroll || H.scrollerH > H.wrapperH);
			H.hScrollbar = H.hScroll && H.options.hScrollbar;
			H.vScrollbar = H.vScroll && H.options.vScrollbar && H.scrollerH > H.wrapperH;
			J = H._offset(H.wrapper);
			H.wrapperOffsetLeft = -J.left;
			H.wrapperOffsetTop = -J.top;
			if (typeof H.options.snap == "string") {
				H.pagesX = [];
				H.pagesY = [];
				F = H.scroller.querySelectorAll(H.options.snap);
				for (G = 0, m = F.length; G < m; G++) {
					K = H._offset(F[G]);
					K.left += H.wrapperOffsetLeft;
					K.top += H.wrapperOffsetTop;
					H.pagesX[G] = K.left < H.maxScrollX ? H.maxScrollX : K.left * H.scale;
					H.pagesY[G] = K.top < H.maxScrollY ? H.maxScrollY : K.top * H.scale;
				}
			} else {
				if (H.options.snap) {
					H.pagesX = [];
					while (K >= H.maxScrollX) {
						H.pagesX[I] = K;
						K = K - H.wrapperW;
						I++;
					}
					if (H.maxScrollX % H.wrapperW) {
						H.pagesX[H.pagesX.length] = H.maxScrollX - H.pagesX[H.pagesX.length - 1] + H.pagesX[H.pagesX.length - 1];
					}
					K = 0;
					I = 0;
					H.pagesY = [];
					while (K >= H.maxScrollY) {
						H.pagesY[I] = K;
						K = K - H.wrapperH;
						I++;
					}
					if (H.maxScrollY % H.wrapperH) {
						H.pagesY[H.pagesY.length] = H.maxScrollY - H.pagesY[H.pagesY.length - 1] + H.pagesY[H.pagesY.length - 1];
					}
				}
			}
			H._scrollbar("h");
			H._scrollbar("v");
			if (!H.zoomed) {
				H.scroller.style[k] = "0";
				H._resetPos(400);
			}
		},
		scrollTo: function(m, L, K, J) {
			var I = this,
				H = m,
				G, F;
			I.stop();
			if (!H.length) {
				H = [{
					x: m,
					y: L,
					time: K,
					relative: J
				}];
			}
			for (G = 0, F = H.length; G < F; G++) {
				if (H[G].relative) {
					H[G].x = I.x - H[G].x;
					H[G].y = I.y - H[G].y;
				}
				I.steps.push({
					x: H[G].x,
					y: H[G].y,
					time: H[G].time || 0
				});
			}
			I._startAni();
		},
		scrollToElement: function(m, G) {
			var F = this,
				H;
			m = m.nodeType ? m : F.scroller.querySelector(m);
			if (!m) {
				return;
			}
			H = F._offset(m);
			H.left += F.wrapperOffsetLeft;
			H.top += F.wrapperOffsetTop;
			H.left = H.left > 0 ? 0 : H.left < F.maxScrollX ? F.maxScrollX : H.left;
			H.top = H.top > F.minScrollY ? F.minScrollY : H.top < F.maxScrollY ? F.maxScrollY : H.top;
			G = G === undefined ? u.max(u.abs(H.left) * 2, u.abs(H.top) * 2) : G;
			F.scrollTo(H.left, H.top, G);
		},
		scrollToPage: function(G, F, I) {
			var H = this,
				m, J;
			I = I === undefined ? 400 : I;
			if (H.options.onScrollStart) {
				H.options.onScrollStart.call(H);
			}
			if (H.options.snap) {
				G = G == "next" ? H.currPageX + 1 : G == "prev" ? H.currPageX - 1 : G;
				F = F == "next" ? H.currPageY + 1 : F == "prev" ? H.currPageY - 1 : F;
				G = G < 0 ? 0 : G > H.pagesX.length - 1 ? H.pagesX.length - 1 : G;
				F = F < 0 ? 0 : F > H.pagesY.length - 1 ? H.pagesY.length - 1 : F;
				H.currPageX = G;
				H.currPageY = F;
				m = H.pagesX[G];
				J = H.pagesY[F];
			} else {
				m = -H.wrapperW * G;
				J = -H.wrapperH * F;
				if (m < H.maxScrollX) {
					m = H.maxScrollX;
				}
				if (J < H.maxScrollY) {
					J = H.maxScrollY;
				}
			}
			H.scrollTo(m, J, I);
		},
		disable: function() {
			this.stop();
			this._resetPos(0);
			this.enabled = false;
			this._unbind(t, i);
			this._unbind(c, i);
			this._unbind(w, i);
		},
		enable: function() {
			this.enabled = true;
		},
		stop: function() {
			if (this.options.useTransition) {
				this._unbind(a);
			} else {
				p(this.aniTime);
			}
			this.steps = [];
			this.moved = false;
			this.animating = false;
		},
		zoom: function(m, J, I, H) {
			var F = this,
				G = I / F.scale;
			if (!F.options.useTransform) {
				return;
			}
			F.zoomed = true;
			H = H === undefined ? 200 : H;
			m = m - F.wrapperOffsetLeft - F.x;
			J = J - F.wrapperOffsetTop - F.y;
			F.x = m - m * G + F.x;
			F.y = J - J * G + F.y;
			F.scale = I;
			F.refresh();
			F.x = F.x > 0 ? 0 : F.x < F.maxScrollX ? F.maxScrollX : F.x;
			F.y = F.y > F.minScrollY ? F.minScrollY : F.y < F.maxScrollY ? F.maxScrollY : F.y;
			F.scroller.style[k] = H + "ms";
			F.scroller.style[l] = "translate(" + F.x + "px," + F.y + "px) scale(" + I + ")" + C;
			F.zoomed = false;
		},
		isReady: function() {
			return !this.moved && !this.zoomed && !this.animating;
		}
	};

	function s(m) {
		if (z === "") {
			return m;
		}
		m = m.charAt(0).toUpperCase() + m.substr(1);
		return z + m;
	}
	n = null;
	if (typeof exports !== "undefined") {
		exports.iScroll = v;
	} else {
		i.iScroll = v;
	}
})(window, document);
var ImgScrollBorad = (function(h, c, k) {
	var r = k.isIE;
	var x = '<div class="b_dialog_mask"></div>';
	var b = '<div class="b_dialog b_zoomimg"><div class="e_dialog_hd hide"></div><div class="e_dialog_ct"><div class="scrollInnerBox"></div></div><div class="e_dialog_ft hide"></div></div>';
	var q, d, l, t, f = 0,
		z, e, j;
	var p = h("body"),
		g = h(k);
	var m = g.width(),
		v = g.height();
	function w(A) {
		h(A).on("click", function() {
			f = h(this).index();//Math.ceil(h(this).index() / 2);
			var B = h(this).hasClass("mapbox") ? h(this) : h(this).parent("div");
			u(B);
			a();
			y();
		});
	}
	function o() {
		var B = g.width(),
			A = g.height();
		
		j.css({
			"max-width": Math.max(B, m) + "px",
			"max-height": A + "px"
		});
		
		z.css({
			height: document.body.scrollHeight + "px",
			width: Math.max(B, m) + "px",
			top: "0px",
			left: "0px",
			position: "absolute",
			"z-index": "1000"
		});
		e.css({
			top: 0 + "px",
			left: "0px",
			position: "absolute",
			"z-index": 1005,
			height: A + "px"
		});
		if (r) {
			s(z[0]);
			s(e[0]);
		}
	}
	function s(A) {
		if (typeof A.style.msTouchAction != "undefined") {
			A.style.msTouchAction = "none";
		}
	}
	function u(A) {
		d = h(A);
		//l = d.find("a img").attr('simage');
		l = d.find("img");
		t = (function() {
			var C = [];
			if (!l.length) {
				C.push('<li><img orisrc="' + h(A).find("img").attr("src") + '" src="../../images/loading.gif"/></li>');
			} else {
				for (var B = 0; B < l.length; B++) {
					C.push('<li><img orisrc="' + l.eq(B).attr('simage') + '" src="../../images/loading.gif"/></li>');
				}
			}
			return C.length ? '<ul class="list_item clrfix">' + C.join("") + "</ul>" : "";
		})();
		if (!h("#scrollImg").length) {
			p.append('<div id="scrollImg" style="display:none">' + x + b + "</div>");
			h("#scrollImg").on("click", function(B) {
				n(B);
			});
		}
		q = h("#scrollImg");
		q.find(".scrollInnerBox").html(t);
		z = h(".b_dialog_mask", q);
		e = h(".b_dialog", q);
		j = h("img", q);
		o();
		g.on("resize", o);
	}
	function i(A) {
		A.preventDefault();
		return false;
	}
	function a() {
		var A = {
			box: h(".scrollInnerBox", A),
			contBoard: h(".scrollInnerBox  ul", A),
			list: h(".scrollInnerBox ul li", A),
			autoPlay: false,
			interval: "5000",
			startIndex: f
		};
		c.initScroll(A);
	}
	function y() {
		q.show();
		p.on("touchmove", i, false);
	}
	function n(A) {
		q && q.hide();
		p.unbind("touchmove", i, false);
		A.preventDefault();
		g.unbind("resize scroll", o);
	}
	return {
		init: w
	};
})($, ScrollBox, window);

(function(e, d, c, f, b, g, a) {
	e(function() {
		b.init(".note_img a,.animal_list a");		
	});
})($, '', '', '', ImgScrollBorad, '', '');