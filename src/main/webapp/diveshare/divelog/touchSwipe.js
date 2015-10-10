(function(a) {
	if (String.prototype.trim === a) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, "");
		};
	}
	if (Array.prototype.reduce === a) {
		Array.prototype.reduce = function(c) {
			if (this === void 0 || this === null) {
				throw new TypeError();
			}
			var f = Object(this),
				b = f.length >>> 0,
				e = 0,
				d;
			if (typeof c != "function") {
				throw new TypeError();
			}
			if (b == 0 && arguments.length == 1) {
				throw new TypeError();
			}
			if (arguments.length >= 2) {
				d = arguments[1];
			} else {
				do {
					if (e in f) {
						d = f[e++];
						break;
					}
					if (++e >= b) {
						throw new TypeError();
					}
				} while (true);
			}
			while (e < b) {
				if (e in f) {
					d = c.call(a, d, f[e], e, f);
				}
				e++;
			}
			return d;
		};
	}
})();
var Zepto = (function() {
	var m, t, F, a, O = [],
		o = O.slice,
		G = O.filter,
		h = window.document,
		M = {},
		P = {},
		q = h.defaultView.getComputedStyle,
		X = {
			"column-count": 1,
			columns: 1,
			"font-weight": 1,
			"line-height": 1,
			opacity: 1,
			"z-index": 1,
			zoom: 1
		},
		y = /^\s*<(\w+|!)[^>]*>/,
		k = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		J = /^(?:body|html)$/i,
		E = ["val", "css", "html", "text", "data", "width", "height", "offset"],
		z = ["after", "prepend", "before", "append"],
		u = h.createElement("table"),
		Q = h.createElement("tr"),
		i = {
			tr: h.createElement("tbody"),
			tbody: u,
			thead: u,
			tfoot: u,
			td: Q,
			th: Q,
			"*": h.createElement("div")
		},
		v = /complete|loaded|interactive/,
		I = /^\.([\w-]+)$/,
		x = /^#([\w-]*)$/,
		L = /^[\w-]+$/,
		e = {},
		g = e.toString,
		d = {},
		V, R, H = h.createElement("div");
	d.matches = function(ae, aa) {
		if (!ae || ae.nodeType !== 1) {
			return false;
		}
		var ac = ae.webkitMatchesSelector || ae.mozMatchesSelector || ae.oMatchesSelector || ae.matchesSelector;
		if (ac) {
			return ac.call(ae, aa);
		}
		var ad, af = ae.parentNode,
			ab = !af;
		if (ab) {
			(af = H).appendChild(ae);
		}
		ad = ~d.qsa(af, aa).indexOf(ae);
		ab && H.removeChild(ae);
		return ad;
	};

	function Z(aa) {
		return aa == null ? String(aa) : e[g.call(aa)] || "object";
	}
	function p(aa) {
		return Z(aa) == "function";
	}
	function N(aa) {
		return aa != null && aa == aa.window;
	}
	function w(aa) {
		return aa != null && aa.nodeType == aa.DOCUMENT_NODE;
	}
	function K(aa) {
		return Z(aa) == "object";
	}
	function Y(aa) {
		return K(aa) && !N(aa) && aa.__proto__ == Object.prototype;
	}
	function B(aa) {
		return aa instanceof Array;
	}
	function C(aa) {
		return typeof aa.length == "number";
	}
	function W(aa) {
		return G.call(aa, function(ab) {
			return ab != null;
		});
	}
	function D(aa) {
		return aa.length > 0 ? F.fn.concat.apply([], aa) : aa;
	}
	V = function(aa) {
		return aa.replace(/-+(.)?/g, function(ab, ac) {
			return ac ? ac.toUpperCase() : "";
		});
	};

	function n(aa) {
		return aa.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
	}
	R = function(aa) {
		return G.call(aa, function(ac, ab) {
			return aa.indexOf(ac) == ab;
		});
	};

	function S(aa) {
		return aa in P ? P[aa] : (P[aa] = new RegExp("(^|\\s)" + aa + "(\\s|$)"));
	}
	function f(aa, ab) {
		return (typeof ab == "number" && !X[n(aa)]) ? ab + "px" : ab;
	}
	function T(ac) {
		var aa, ab;
		if (!M[ac]) {
			aa = h.createElement(ac);
			h.body.appendChild(aa);
			ab = q(aa, "").getPropertyValue("display");
			aa.parentNode.removeChild(aa);
			ab == "none" && (ab = "block");
			M[ac] = ab;
		}
		return M[ac];
	}
	function s(aa) {
		return "children" in aa ? o.call(aa.children) : F.map(aa.childNodes, function(ab) {
			if (ab.nodeType == 1) {
				return ab;
			}
		});
	}
	d.fragment = function(ae, ac, ad) {
		if (ae.replace) {
			ae = ae.replace(k, "<$1></$2>");
		}
		if (ac === m) {
			ac = y.test(ae) && RegExp.$1;
		}
		if (!(ac in i)) {
			ac = "*";
		}
		var ab, af, aa = i[ac];
		aa.innerHTML = "" + ae;
		af = F.each(o.call(aa.childNodes), function() {
			aa.removeChild(this);
		});
		if (Y(ad)) {
			ab = F(af);
			F.each(ad, function(ag, ah) {
				if (E.indexOf(ag) > -1) {
					ab[ag](ah);
				} else {
					ab.attr(ag, ah);
				}
			});
		}
		return af;
	};
	d.Z = function(ab, aa) {
		ab = ab || [];
		ab.__proto__ = F.fn;
		ab.selector = aa || "";
		return ab;
	};
	d.isZ = function(aa) {
		return aa instanceof d.Z;
	};
	d.init = function(aa, ab) {
		if (!aa) {
			return d.Z();
		} else {
			if (p(aa)) {
				return F(h).ready(aa);
			} else {
				if (d.isZ(aa)) {
					return aa;
				} else {
					var ac;
					if (B(aa)) {
						ac = W(aa);
					} else {
						if (K(aa)) {
							ac = [Y(aa) ? F.extend({}, aa) : aa], aa = null;
						} else {
							if (y.test(aa)) {
								ac = d.fragment(aa.trim(), RegExp.$1, ab), aa = null;
							} else {
								if (ab !== m) {
									return F(ab).find(aa);
								} else {
									ac = d.qsa(h, aa);
								}
							}
						}
					}
					return d.Z(ac, aa);
				}
			}
		}
	};
	F = function(aa, ab) {
		return d.init(aa, ab);
	};

	function l(ac, ab, aa) {
		for (t in ab) {
			if (aa && (Y(ab[t]) || B(ab[t]))) {
				if (Y(ab[t]) && !Y(ac[t])) {
					ac[t] = {};
				}
				if (B(ab[t]) && !B(ac[t])) {
					ac[t] = [];
				}
				l(ac[t], ab[t], aa);
			} else {
				if (ab[t] !== m) {
					ac[t] = ab[t];
				}
			}
		}
	}
	F.extend = function(ac) {
		var aa, ab = o.call(arguments, 1);
		if (typeof ac == "boolean") {
			aa = ac;
			ac = ab.shift();
		}
		ab.forEach(function(ad) {
			l(ac, ad, aa);
		});
		return ac;
	};
	d.qsa = function(ab, aa) {
		var ac;
		return (w(ab) && x.test(aa)) ? ((ac = ab.getElementById(RegExp.$1)) ? [ac] : []) : (ab.nodeType !== 1 && ab.nodeType !== 9) ? [] : o.call(I.test(aa) ? ab.getElementsByClassName(RegExp.$1) : L.test(aa) ? ab.getElementsByTagName(aa) : ab.querySelectorAll(aa));
	};

	function A(ab, aa) {
		return aa === m ? F(ab) : F(ab).filter(aa);
	}
	F.contains = function(aa, ab) {
		return aa !== ab && aa.contains(ab);
	};

	function r(ac, ab, aa, ad) {
		return p(ab) ? ab.call(ac, aa, ad) : ab;
	}
	function b(ab, aa, ac) {
		ac == null ? ab.removeAttribute(aa) : ab.setAttribute(aa, ac);
	}
	function U(ac, ad) {
		var aa = ac.className,
			ab = aa && aa.baseVal !== m;
		if (ad === m) {
			return ab ? aa.baseVal : aa;
		}
		ab ? (aa.baseVal = ad) : (ac.className = ad);
	}
	function j(ab) {
		var aa;
		try {
			return ab ? ab == "true" || (ab == "false" ? false : ab == "null" ? null : !isNaN(aa = Number(ab)) ? aa : /^[\[\{]/.test(ab) ? F.parseJSON(ab) : ab) : ab;
		} catch (ac) {
			return ab;
		}
	}
	F.type = Z;
	F.isFunction = p;
	F.isWindow = N;
	F.isArray = B;
	F.isPlainObject = Y;
	F.isEmptyObject = function(ab) {
		var aa;
		for (aa in ab) {
			return false;
		}
		return true;
	};
	F.inArray = function(ab, ac, aa) {
		return O.indexOf.call(ac, ab, aa);
	};
	F.camelCase = V;
	F.trim = function(aa) {
		return aa.trim();
	};
	F.uuid = 0;
	F.support = {};
	F.expr = {};
	F.map = function(ae, af) {
		var ad, aa = [],
			ac, ab;
		if (C(ae)) {
			for (ac = 0; ac < ae.length; ac++) {
				ad = af(ae[ac], ac);
				if (ad != null) {
					aa.push(ad);
				}
			}
		} else {
			for (ab in ae) {
				ad = af(ae[ab], ab);
				if (ad != null) {
					aa.push(ad);
				}
			}
		}
		return D(aa);
	};
	F.each = function(ac, ad) {
		var ab, aa;
		if (C(ac)) {
			for (ab = 0; ab < ac.length; ab++) {
				if (ad.call(ac[ab], ab, ac[ab]) === false) {
					return ac;
				}
			}
		} else {
			for (aa in ac) {
				if (ad.call(ac[aa], aa, ac[aa]) === false) {
					return ac;
				}
			}
		}
		return ac;
	};
	F.grep = function(aa, ab) {
		return G.call(aa, ab);
	};
	if (window.JSON) {
		F.parseJSON = JSON.parse;
	}
	F.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(ab, aa) {
		e["[object " + aa + "]"] = aa.toLowerCase();
	});
	F.fn = {
		forEach: O.forEach,
		reduce: O.reduce,
		push: O.push,
		sort: O.sort,
		indexOf: O.indexOf,
		concat: O.concat,
		map: function(aa) {
			return F(F.map(this, function(ac, ab) {
				return aa.call(ac, ab, ac);
			}));
		},
		slice: function() {
			return F(o.apply(this, arguments));
		},
		ready: function(aa) {
			if (v.test(h.readyState)) {
				aa(F);
			} else {
				h.addEventListener("DOMContentLoaded", function() {
					aa(F);
				}, false);
			}
			return this;
		},
		get: function(aa) {
			return aa === m ? o.call(this) : this[aa >= 0 ? aa : aa + this.length];
		},
		toArray: function() {
			return this.get();
		},
		size: function() {
			return this.length;
		},
		remove: function() {
			return this.each(function() {
				if (this.parentNode != null) {
					this.parentNode.removeChild(this);
				}
			});
		},
		each: function(aa) {
			O.every.call(this, function(ac, ab) {
				return aa.call(ac, ab, ac) !== false;
			});
			return this;
		},
		filter: function(aa) {
			if (p(aa)) {
				return this.not(this.not(aa));
			}
			return F(G.call(this, function(ab) {
				return d.matches(ab, aa);
			}));
		},
		add: function(aa, ab) {
			return F(R(this.concat(F(aa, ab))));
		},
		is: function(aa) {
			return this.length > 0 && d.matches(this[0], aa);
		},
		not: function(aa) {
			var ab = [];
			if (p(aa) && aa.call !== m) {
				this.each(function(ad) {
					if (!aa.call(this, ad)) {
						ab.push(this);
					}
				});
			} else {
				var ac = typeof aa == "string" ? this.filter(aa) : (C(aa) && p(aa.item)) ? o.call(aa) : F(aa);
				this.forEach(function(ad) {
					if (ac.indexOf(ad) < 0) {
						ab.push(ad);
					}
				});
			}
			return F(ab);
		},
		has: function(aa) {
			return this.filter(function() {
				return K(aa) ? F.contains(this, aa) : F(this).find(aa).size();
			});
		},
		eq: function(aa) {
			return aa === -1 ? this.slice(aa) : this.slice(aa, +aa + 1);
		},
		first: function() {
			var aa = this[0];
			return aa && !K(aa) ? aa : F(aa);
		},
		last: function() {
			var aa = this[this.length - 1];
			return aa && !K(aa) ? aa : F(aa);
		},
		find: function(ab) {
			var aa, ac = this;
			if (typeof ab == "object") {
				aa = F(ab).filter(function() {
					var ad = this;
					return O.some.call(ac, function(ae) {
						return F.contains(ae, ad);
					});
				});
			} else {
				if (this.length == 1) {
					aa = F(d.qsa(this[0], ab));
				} else {
					aa = this.map(function() {
						return d.qsa(this, ab);
					});
				}
			}
			return aa;
		},
		closest: function(aa, ab) {
			var ac = this[0],
				ad = false;
			if (typeof aa == "object") {
				ad = F(aa);
			}
			while (ac && !(ad ? ad.indexOf(ac) >= 0 : d.matches(ac, aa))) {
				ac = ac !== ab && !w(ac) && ac.parentNode;
			}
			return F(ac);
		},
		parents: function(aa) {
			var ac = [],
				ab = this;
			while (ab.length > 0) {
				ab = F.map(ab, function(ad) {
					if ((ad = ad.parentNode) && !w(ad) && ac.indexOf(ad) < 0) {
						ac.push(ad);
						return ad;
					}
				});
			}
			return A(ac, aa);
		},
		parent: function(aa) {
			return A(R(this.pluck("parentNode")), aa);
		},
		children: function(aa) {
			return A(this.map(function() {
				return s(this);
			}), aa);
		},
		contents: function() {
			return this.map(function() {
				return o.call(this.childNodes);
			});
		},
		siblings: function(aa) {
			return A(this.map(function(ab, ac) {
				return G.call(s(ac.parentNode), function(ad) {
					return ad !== ac;
				});
			}), aa);
		},
		empty: function() {
			return this.each(function() {
				this.innerHTML = "";
			});
		},
		pluck: function(aa) {
			return F.map(this, function(ab) {
				return ab[aa];
			});
		},
		show: function() {
			return this.each(function() {
				this.style.display == "none" && (this.style.display = null);
				if (q(this, "").getPropertyValue("display") == "none") {
					this.style.display = T(this.nodeName);
				}
			});
		},
		replaceWith: function(aa) {
			return this.before(aa).remove();
		},
		wrap: function(aa) {
			var ab = p(aa);
			if (this[0] && !ab) {
				var ac = F(aa).get(0),
					ad = ac.parentNode || this.length > 1;
			}
			return this.each(function(ae) {
				F(this).wrapAll(ab ? aa.call(this, ae) : ad ? ac.cloneNode(true) : ac);
			});
		},
		wrapAll: function(aa) {
			if (this[0]) {
				F(this[0]).before(aa = F(aa));
				var ab;
				while ((ab = aa.children()).length) {
					aa = ab.first();
				}
				F(aa).append(this);
			}
			return this;
		},
		wrapInner: function(aa) {
			var ab = p(aa);
			return this.each(function(ad) {
				var ac = F(this),
					ae = ac.contents(),
					af = ab ? aa.call(this, ad) : aa;
				ae.length ? ae.wrapAll(af) : ac.append(af);
			});
		},
		unwrap: function() {
			this.parent().each(function() {
				F(this).replaceWith(F(this).children());
			});
			return this;
		},
		clone: function() {
			return this.map(function() {
				return this.cloneNode(true);
			});
		},
		hide: function() {
			return this.css("display", "none");
		},
		toggle: function(aa) {
			return this.each(function() {
				var ab = F(this);
				(aa === m ? ab.css("display") == "none" : aa) ? ab.show() : ab.hide();
			});
		},
		prev: function(aa) {
			return F(this.pluck("previousElementSibling")).filter(aa || "*");
		},
		next: function(aa) {
			return F(this.pluck("nextElementSibling")).filter(aa || "*");
		},
		html: function(aa) {
			return aa === m ? (this.length > 0 ? this[0].innerHTML : null) : this.each(function(ab) {
				var ac = this.innerHTML;
				F(this).empty().append(r(this, aa, ab, ac));
			});
		},
		text: function(aa) {
			return aa === m ? (this.length > 0 ? this[0].textContent : null) : this.each(function() {
				this.textContent = aa;
			});
		},
		attr: function(ab, ac) {
			var aa;
			return (typeof ab == "string" && ac === m) ? (this.length == 0 || this[0].nodeType !== 1 ? m : (ab == "value" && this[0].nodeName == "INPUT") ? this.val() : (!(aa = this[0].getAttribute(ab)) && ab in this[0]) ? this[0][ab] : aa) : this.each(function(ad) {
				if (this.nodeType !== 1) {
					return;
				}
				if (K(ab)) {
					for (t in ab) {
						b(this, t, ab[t]);
					}
				} else {
					b(this, ab, r(this, ac, ad, this.getAttribute(ab)));
				}
			});
		},
		removeAttr: function(aa) {
			return this.each(function() {
				this.nodeType === 1 && b(this, aa);
			});
		},
		prop: function(aa, ab) {
			return (ab === m) ? (this[0] && this[0][aa]) : this.each(function(ac) {
				this[aa] = r(this, ab, ac, this[aa]);
			});
		},
		data: function(aa, ac) {
			var ab = this.attr("data-" + n(aa), ac);
			return ab !== null ? j(ab) : m;
		},
		val: function(aa) {
			return (aa === m) ? (this[0] && (this[0].multiple ? F(this[0]).find("option").filter(function(ab) {
				return this.selected;
			}).pluck("value") : this[0].value)) : this.each(function(ab) {
				this.value = r(this, aa, ab, this.value);
			});
		},
		offset: function(ab) {
			if (ab) {
				return this.each(function(ad) {
					var ag = F(this),
						af = r(this, ab, ad, ag.offset()),
						ac = ag.offsetParent().offset(),
						ae = {
							top: af.top - ac.top,
							left: af.left - ac.left
						};
					if (ag.css("position") == "static") {
						ae.position = "relative";
					}
					ag.css(ae);
				});
			}
			if (this.length == 0) {
				return null;
			}
			var aa = this[0].getBoundingClientRect();
			return {
				left: aa.left + window.pageXOffset,
				top: aa.top + window.pageYOffset,
				width: Math.round(aa.width),
				height: Math.round(aa.height)
			};
		},
		css: function(ac, ab) {
			if (arguments.length < 2 && typeof ac == "string") {
				return this[0] && (this[0].style[V(ac)] || q(this[0], "").getPropertyValue(ac));
			}
			var aa = "";
			if (Z(ac) == "string") {
				if (!ab && ab !== 0) {
					this.each(function() {
						this.style.removeProperty(n(ac));
					});
				} else {
					aa = n(ac) + ":" + f(ac, ab);
				}
			} else {
				for (t in ac) {
					if (!ac[t] && ac[t] !== 0) {
						this.each(function() {
							this.style.removeProperty(n(t));
						});
					} else {
						aa += n(t) + ":" + f(t, ac[t]) + ";";
					}
				}
			}
			return this.each(function() {
				this.style.cssText += ";" + aa;
			});
		},
		index: function(aa) {
			return aa ? this.indexOf(F(aa)[0]) : this.parent().children().indexOf(this[0]);
		},
		hasClass: function(aa) {
			return O.some.call(this, function(ab) {
				return this.test(U(ab));
			}, S(aa));
		},
		addClass: function(aa) {
			return this.each(function(ab) {
				a = [];
				var ad = U(this),
					ac = r(this, aa, ab, ad);
				ac.split(/\s+/g).forEach(function(ae) {
					if (!F(this).hasClass(ae)) {
						a.push(ae);
					}
				}, this);
				a.length && U(this, ad + (ad ? " " : "") + a.join(" "));
			});
		},
		removeClass: function(aa) {
			return this.each(function(ab) {
				if (aa === m) {
					return U(this, "");
				}
				a = U(this);
				r(this, aa, ab, a).split(/\s+/g).forEach(function(ac) {
					a = a.replace(S(ac), " ");
				});
				U(this, a.trim());
			});
		},
		toggleClass: function(ab, aa) {
			return this.each(function(ac) {
				var ae = F(this),
					ad = r(this, ab, ac, U(this));
				ad.split(/\s+/g).forEach(function(af) {
					(aa === m ? !ae.hasClass(af) : aa) ? ae.addClass(af) : ae.removeClass(af);
				});
			});
		},
		scrollTop: function() {
			if (!this.length) {
				return;
			}
			return ("scrollTop" in this[0]) ? this[0].scrollTop : this[0].scrollY;
		},
		position: function() {
			if (!this.length) {
				return;
			}
			var ac = this[0],
				ab = this.offsetParent(),
				ad = this.offset(),
				aa = J.test(ab[0].nodeName) ? {
					top: 0,
					left: 0
				} : ab.offset();
			ad.top -= parseFloat(F(ac).css("margin-top")) || 0;
			ad.left -= parseFloat(F(ac).css("margin-left")) || 0;
			aa.top += parseFloat(F(ab[0]).css("border-top-width")) || 0;
			aa.left += parseFloat(F(ab[0]).css("border-left-width")) || 0;
			return {
				top: ad.top - aa.top,
				left: ad.left - aa.left
			};
		},
		offsetParent: function() {
			return this.map(function() {
				var aa = this.offsetParent || h.body;
				while (aa && !J.test(aa.nodeName) && F(aa).css("position") == "static") {
					aa = aa.offsetParent;
				}
				return aa;
			});
		}
	};
	F.fn.detach = F.fn.remove;
	["width", "height"].forEach(function(aa) {
		F.fn[aa] = function(ac) {
			var ae, ab = this[0],
				ad = aa.replace(/./, function(af) {
					return af[0].toUpperCase();
				});
			if (ac === m) {
				return N(ab) ? ab["inner" + ad] : w(ab) ? ab.documentElement["offset" + ad] : (ae = this.offset()) && ae[aa];
			} else {
				return this.each(function(af) {
					ab = F(this);
					ab.css(aa, r(this, ac, af, ab[aa]()));
				});
			}
		};
	});

	function c(ac, aa) {
		aa(ac);
		for (var ab in ac.childNodes) {
			c(ac.childNodes[ab], aa);
		}
	}
	z.forEach(function(ac, ab) {
		var aa = ab % 2;
		F.fn[ac] = function() {
			var ad, ae = F.map(arguments, function(ah) {
				ad = Z(ah);
				return ad == "object" || ad == "array" || ah == null ? ah : d.fragment(ah);
			}),
				af, ag = this.length > 1;
			if (ae.length < 1) {
				return this;
			}
			return this.each(function(ah, ai) {
				af = aa ? ai : ai.parentNode;
				ai = ab == 0 ? ai.nextSibling : ab == 1 ? ai.firstChild : ab == 2 ? ai : null;
				ae.forEach(function(aj) {
					if (ag) {
						aj = aj.cloneNode(true);
					} else {
						if (!af) {
							return F(aj).remove();
						}
					}
					c(af.insertBefore(aj, ai), function(ak) {
						if (ak.nodeName != null && ak.nodeName.toUpperCase() === "SCRIPT" && (!ak.type || ak.type === "text/javascript") && !ak.src) {
							window["eval"].call(window, ak.innerHTML);
						}
					});
				});
			});
		};
		F.fn[aa ? ac + "To" : "insert" + (ab ? "Before" : "After")] = function(ad) {
			F(ad)[ac](this);
			return this;
		};
	});
	d.Z.prototype = F.fn;
	d.uniq = R;
	d.deserializeValue = j;
	F.zepto = d;
	return F;
})();
window.Zepto = Zepto;
"$" in window || (window.$ = Zepto);
(function(b) {
	function a(d) {
		var g = this.os = {},
			i = this.browser = {},
			p = d.match(/WebKit\/([\d.]+)/),
			f = d.match(/(Android)\s+([\d.]+)/),
			q = d.match(/(iPad).*OS\s([\d_]+)/),
			o = !q && d.match(/(iPhone\sOS)\s([\d_]+)/),
			s = d.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			n = s && d.match(/TouchPad/),
			m = d.match(/Kindle\/([\d.]+)/),
			l = d.match(/Silk\/([\d._]+)/),
			e = d.match(/(BlackBerry).*Version\/([\d.]+)/),
			k = d.match(/(BB10).*Version\/([\d.]+)/),
			c = d.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			r = d.match(/PlayBook/),
			h = d.match(/Chrome\/([\d.]+)/) || d.match(/CriOS\/([\d.]+)/),
			j = d.match(/Firefox\/([\d.]+)/);
		if (i.webkit = !! p) {
			i.version = p[1];
		}
		if (f) {
			g.android = true, g.version = f[2];
		}
		if (o) {
			g.ios = g.iphone = true, g.version = o[2].replace(/_/g, ".");
		}
		if (q) {
			g.ios = g.ipad = true, g.version = q[2].replace(/_/g, ".");
		}
		if (s) {
			g.webos = true, g.version = s[2];
		}
		if (n) {
			g.touchpad = true;
		}
		if (e) {
			g.blackberry = true, g.version = e[2];
		}
		if (k) {
			g.bb10 = true, g.version = k[2];
		}
		if (c) {
			g.rimtabletos = true, g.version = c[2];
		}
		if (r) {
			i.playbook = true;
		}
		if (m) {
			g.kindle = true, g.version = m[1];
		}
		if (l) {
			i.silk = true, i.version = l[1];
		}
		if (!l && g.android && d.match(/Kindle Fire/)) {
			i.silk = true;
		}
		if (h) {
			i.chrome = true, i.version = h[1];
		}
		if (j) {
			i.firefox = true, i.version = j[1];
		}
		g.tablet = !! (q || r || (f && !d.match(/Mobile/)) || (j && d.match(/Tablet/)));
		g.phone = !! (!g.tablet && (f || o || s || e || k || (h && d.match(/Android/)) || (h && d.match(/CriOS\/([\d.]+)/)) || (j && d.match(/Mobile/))));
	}
	a.call(b, navigator.userAgent);
	b.__detect = a;
})(Zepto);
(function(c) {
	var h = c.zepto.qsa,
		o = {},
		e = 1,
		k = {},
		t = {
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		};
	k.click = k.mousedown = k.mouseup = k.mousemove = "MouseEvents";

	function a(v) {
		return v._zid || (v._zid = e++);
	}
	function i(w, y, x, v) {
		y = n(y);
		if (y.ns) {
			var z = s(y.ns);
		}
		return (o[a(w)] || []).filter(function(A) {
			return A && (!y.e || A.e == y.e) && (!y.ns || z.test(A.ns)) && (!x || a(A.fn) === a(x)) && (!v || A.sel == v);
		});
	}
	function n(v) {
		var w = ("" + v).split(".");
		return {
			e: w[0],
			ns: w.slice(1).sort().join(" ")
		};
	}
	function s(v) {
		return new RegExp("(?:^| )" + v.replace(" ", " .* ?") + "(?: |$)");
	}
	function r(v, x, w) {
		if (c.type(v) != "string") {
			c.each(v, w);
		} else {
			v.split(/\s/).forEach(function(y) {
				w(y, x);
			});
		}
	}
	function f(v, w) {
		return v.del && (v.e == "focus" || v.e == "blur") || !! w;
	}
	function q(v) {
		return t[v] || v;
	}
	function l(z, y, A, w, v, x) {
		var C = a(z),
			B = (o[C] || (o[C] = []));
		r(y, A, function(F, E) {
			var D = n(F);
			D.fn = E;
			D.sel = w;
			if (D.e in t) {
				E = function(I) {
					var H = I.relatedTarget;
					if (!H || (H !== this && !c.contains(this, H))) {
						return D.fn.apply(this, arguments);
					}
				};
			}
			D.del = v && v(E, F);
			var G = D.del || E;
			D.proxy = function(I) {
				var H = G.apply(z, [I].concat(I.data));
				if (H === false) {
					I.preventDefault(), I.stopPropagation();
				}
				return H;
			};
			D.i = B.length;
			B.push(D);
			z.addEventListener(q(D.e), D.proxy, f(D, x));
		});
	}
	function u(y, x, z, v, w) {
		var A = a(y);
		r(x || "", z, function(C, B) {
			i(y, C, B, v).forEach(function(D) {
				delete o[A][D.i];
				y.removeEventListener(q(D.e), D.proxy, f(D, w));
			});
		});
	}
	c.event = {
		add: l,
		remove: u
	};
	c.proxy = function(x, w) {
		if (c.isFunction(x)) {
			var v = function() {
					return x.apply(w, arguments);
				};
			v._zid = a(x);
			return v;
		} else {
			if (typeof w == "string") {
				return c.proxy(x[w], x);
			} else {
				throw new TypeError("expected function");
			}
		}
	};
	c.fn.bind = function(v, w) {
		return this.each(function() {
			l(this, v, w);
		});
	};
	c.fn.unbind = function(v, w) {
		return this.each(function() {
			u(this, v, w);
		});
	};
	c.fn.one = function(v, w) {
		return this.each(function(y, x) {
			l(this, v, w, null, function(A, z) {
				return function() {
					var B = A.apply(x, arguments);
					u(x, z, A);
					return B;
				};
			});
		});
	};
	var p = function() {
			return true;
		},
		g = function() {
			return false;
		},
		d = /^([A-Z]|layer[XY]$)/,
		j = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};

	function b(x) {
		var w, v = {
			originalEvent: x
		};
		for (w in x) {
			if (!d.test(w) && x[w] !== undefined) {
				v[w] = x[w];
			}
		}
		c.each(j, function(z, y) {
			v[z] = function() {
				this[y] = p;
				return x[z].apply(x, arguments);
			};
			v[y] = g;
		});
		return v;
	}
	function m(w) {
		if (!("defaultPrevented" in w)) {
			w.defaultPrevented = false;
			var v = w.preventDefault;
			w.preventDefault = function() {
				this.defaultPrevented = true;
				v.call(this);
			};
		}
	}
	c.fn.delegate = function(v, w, x) {
		return this.each(function(z, y) {
			l(y, w, x, v, function(A) {
				return function(D) {
					var B, C = c(D.target).closest(v, y).get(0);
					if (C) {
						B = c.extend(b(D), {
							currentTarget: C,
							liveFired: y
						});
						return A.apply(C, [B].concat([].slice.call(arguments, 1)));
					}
				};
			});
		});
	};
	c.fn.undelegate = function(v, w, x) {
		return this.each(function() {
			u(this, w, x, v);
		});
	};
	c.fn.live = function(v, w) {
		c(document.body).delegate(this.selector, v, w);
		return this;
	};
	c.fn.die = function(v, w) {
		c(document.body).undelegate(this.selector, v, w);
		return this;
	};
	c.fn.on = function(w, v, x) {
		return !v || c.isFunction(v) ? this.bind(w, v || x) : this.delegate(v, w, x);
	};
	c.fn.off = function(w, v, x) {
		return !v || c.isFunction(v) ? this.unbind(w, v || x) : this.undelegate(v, w, x);
	};
	c.fn.trigger = function(v, w) {
		if (typeof v == "string" || c.isPlainObject(v)) {
			v = c.Event(v);
		}
		m(v);
		v.data = w;
		return this.each(function() {
			if ("dispatchEvent" in this) {
				this.dispatchEvent(v);
			}
		});
	};
	c.fn.triggerHandler = function(w, x) {
		var y, v;
		this.each(function(A, z) {
			y = b(typeof w == "string" ? c.Event(w) : w);
			y.data = x;
			y.target = z;
			c.each(i(z, w.type || w), function(B, C) {
				v = C.proxy(y);
				if (y.isImmediatePropagationStopped()) {
					return false;
				}
			});
		});
		return v;
	};
	("focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error").split(" ").forEach(function(v) {
		c.fn[v] = function(w) {
			return w ? this.bind(v, w) : this.trigger(v);
		};
	});
	["focus", "blur"].forEach(function(v) {
		c.fn[v] = function(w) {
			if (w) {
				this.bind(v, w);
			} else {
				this.each(function() {
					try {
						this[v]();
					} catch (x) {}
				});
			}
			return this;
		};
	});
	c.Event = function(y, x) {
		if (typeof y != "string") {
			x = y, y = x.type;
		}
		var z = document.createEvent(k[y] || "Events"),
			v = true;
		if (x) {
			for (var w in x) {
				(w == "bubbles") ? (v = !! x[w]) : (z[w] = x[w]);
			}
		}
		z.initEvent(y, v, true, null, null, null, null, null, null, null, null, null, null, null, null);
		z.isDefaultPrevented = function() {
			return this.defaultPrevented;
		};
		return z;
	};
})(Zepto);
(function(d, e) {
	var p = "",
		u, f, n, o = {
			Webkit: "webkit",
			Moz: "",
			O: "o",
			ms: "MS"
		},
		l = window.document,
		a = l.createElement("div"),
		m = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
		j, q, i, k, h, t, s, r = {};

	function b(v) {
		return c(v.replace(/([a-z])([A-Z])/, "$1-$2"));
	}
	function c(v) {
		return v.toLowerCase();
	}
	function g(v) {
		return u ? u + v : c(v);
	}
	d.each(o, function(w, v) {
		if (a.style[w + "TransitionProperty"] !== e) {
			p = "-" + c(w) + "-";
			u = v;
			return false;
		}
	});
	j = p + "transform";
	r[q = p + "transition-property"] = r[i = p + "transition-duration"] = r[k = p + "transition-timing-function"] = r[h = p + "animation-name"] = r[t = p + "animation-duration"] = r[s = p + "animation-timing-function"] = "";
	d.fx = {
		off: (u === e && a.style.transitionProperty === e),
		speeds: {
			_default: 400,
			fast: 200,
			slow: 600
		},
		cssPrefix: p,
		transitionEnd: g("TransitionEnd"),
		animationEnd: g("AnimationEnd")
	};
	d.fn.animate = function(v, w, x, y) {
		if (d.isPlainObject(w)) {
			x = w.easing, y = w.complete, w = w.duration;
		}
		if (w) {
			w = (typeof w == "number" ? w : (d.fx.speeds[w] || d.fx.speeds._default)) / 1000;
		}
		return this.anim(v, w, x, y);
	};
	d.fn.anim = function(B, x, w, D) {
		var C, z = {},
			F, A = "",
			y = this,
			v, E = d.fx.transitionEnd;
		if (x === e) {
			x = 0.4;
		}
		if (d.fx.off) {
			x = 0;
		}
		if (typeof B == "string") {
			z[h] = B;
			z[t] = x + "s";
			z[s] = (w || "linear");
			E = d.fx.animationEnd;
		} else {
			F = [];
			for (C in B) {
				if (m.test(C)) {
					A += C + "(" + B[C] + ") ";
				} else {
					z[C] = B[C], F.push(b(C));
				}
			}
			if (A) {
				z[j] = A, F.push(j);
			}
			if (x > 0 && typeof B === "object") {
				z[q] = F.join(", ");
				z[i] = x + "s";
				z[k] = (w || "linear");
			}
		}
		v = function(G) {
			if (typeof G !== "undefined") {
				if (G.target !== G.currentTarget) {
					return;
				}
				d(G.target).unbind(E, v);
			}
			d(this).css(r);
			D && D.call(this);
		};
		if (x > 0) {
			this.bind(E, v);
		}
		this.size() && this.get(0).clientLeft;
		this.css(z);
		if (x <= 0) {
			setTimeout(function() {
				y.each(function() {
					v.call(this);
				});
			}, 0);
		}
		return this;
	};
	a = null;
})(Zepto);
(function($) {
	var jsonpID = 0,
		document = window.document,
		key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		scriptTypeRE = /^(?:text|application)\/javascript/i,
		xmlTypeRE = /^(?:text|application)\/xml/i,
		jsonType = "application/json",
		htmlType = "text/html",
		blankRE = /^\s*$/;

	function triggerAndReturn(context, eventName, data) {
		var event = $.Event(eventName);
		$(context).trigger(event, data);
		return !event.defaultPrevented;
	}
	function triggerGlobal(settings, context, eventName, data) {
		if (settings.global) {
			return triggerAndReturn(context || document, eventName, data);
		}
	}
	$.active = 0;

	function ajaxStart(settings) {
		if (settings.global && $.active++ === 0) {
			triggerGlobal(settings, null, "ajaxStart");
		}
	}
	function ajaxStop(settings) {
		if (settings.global && !(--$.active)) {
			triggerGlobal(settings, null, "ajaxStop");
		}
	}
	function ajaxBeforeSend(xhr, settings) {
		var context = settings.context;
		if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, "ajaxBeforeSend", [xhr, settings]) === false) {
			return false;
		}
		triggerGlobal(settings, context, "ajaxSend", [xhr, settings]);
	}
	function ajaxSuccess(data, xhr, settings) {
		var context = settings.context,
			status = "success";
		settings.success.call(context, data, status, xhr);
		triggerGlobal(settings, context, "ajaxSuccess", [xhr, settings, data]);
		ajaxComplete(status, xhr, settings);
	}
	function ajaxError(error, type, xhr, settings) {
		var context = settings.context;
		settings.error.call(context, xhr, type, error);
		triggerGlobal(settings, context, "ajaxError", [xhr, settings, error]);
		ajaxComplete(type, xhr, settings);
	}
	function ajaxComplete(status, xhr, settings) {
		var context = settings.context;
		settings.complete.call(context, xhr, status);
		triggerGlobal(settings, context, "ajaxComplete", [xhr, settings]);
		ajaxStop(settings);
	}
	function empty() {}
	$.ajaxJSONP = function(options) {
		if (!("type" in options)) {
			return $.ajax(options);
		}
		var callbackName = "jsonp" + (++jsonpID),
			script = document.createElement("script"),
			cleanup = function() {
				clearTimeout(abortTimeout);
				$(script).remove();
				delete window[callbackName];
			},
			abort = function(type) {
				cleanup();
				if (!type || type == "timeout") {
					window[callbackName] = empty;
				}
				ajaxError(null, type || "abort", xhr, options);
			},
			xhr = {
				abort: abort
			},
			abortTimeout;
		if (ajaxBeforeSend(xhr, options) === false) {
			abort("abort");
			return false;
		}
		window[callbackName] = function(data) {
			cleanup();
			ajaxSuccess(data, xhr, options);
		};
		script.onerror = function() {
			abort("error");
		};
		script.src = options.url.replace(/=\?/, "=" + callbackName);
		$("head").append(script);
		if (options.timeout > 0) {
			abortTimeout = setTimeout(function() {
				abort("timeout");
			}, options.timeout);
		}
		return xhr;
	};
	$.ajaxSettings = {
		type: "GET",
		beforeSend: empty,
		success: empty,
		error: empty,
		complete: empty,
		context: null,
		global: true,
		xhr: function() {
			return new window.XMLHttpRequest();
		},
		accepts: {
			script: "text/javascript, application/javascript",
			json: jsonType,
			xml: "application/xml, text/xml",
			html: htmlType,
			text: "text/plain"
		},
		crossDomain: false,
		timeout: 0,
		processData: true,
		cache: true,
	};

	function mimeToDataType(mime) {
		if (mime) {
			mime = mime.split(";", 2)[0];
		}
		return mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : scriptTypeRE.test(mime) ? "script" : xmlTypeRE.test(mime) && "xml") || "text";
	}
	function appendQuery(url, query) {
		return (url + "&" + query).replace(/[&?]{1,2}/, "?");
	}
	function serializeData(options) {
		if (options.processData && options.data && $.type(options.data) != "string") {
			options.data = $.param(options.data, options.traditional);
		}
		if (options.data && (!options.type || options.type.toUpperCase() == "GET")) {
			options.url = appendQuery(options.url, options.data);
		}
	}
	$.ajax = function(options) {
		var settings = $.extend({}, options || {});
		for (key in $.ajaxSettings) {
			if (settings[key] === undefined) {
				settings[key] = $.ajaxSettings[key];
			}
		}
		ajaxStart(settings);
		if (!settings.crossDomain) {
			settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host;
		}
		if (!settings.url) {
			settings.url = window.location.toString();
		}
		serializeData(settings);
		if (settings.cache === false) {
			settings.url = appendQuery(settings.url, "_=" + Date.now());
		}
		var dataType = settings.dataType,
			hasPlaceholder = /=\?/.test(settings.url);
		if (dataType == "jsonp" || hasPlaceholder) {
			if (!hasPlaceholder) {
				settings.url = appendQuery(settings.url, "callback=?");
			}
			return $.ajaxJSONP(settings);
		}
		var mime = settings.accepts[dataType],
			baseHeaders = {},
			protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
			xhr = settings.xhr(),
			abortTimeout;
		if (!settings.crossDomain) {
			baseHeaders["X-Requested-With"] = "XMLHttpRequest";
		}
		if (mime) {
			baseHeaders.Accept = mime;
			if (mime.indexOf(",") > -1) {
				mime = mime.split(",", 2)[0];
			}
			xhr.overrideMimeType && xhr.overrideMimeType(mime);
		}
		if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != "GET")) {
			baseHeaders["Content-Type"] = (settings.contentType || "application/x-www-form-urlencoded");
		}
		settings.headers = $.extend(baseHeaders, settings.headers || {});
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				xhr.onreadystatechange = empty;
				clearTimeout(abortTimeout);
				var result, error = false;
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == "file:")) {
					dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type"));
					result = xhr.responseText;
					try {
						if (dataType == "script") {
							(1, eval)(result);
						} else {
							if (dataType == "xml") {
								result = xhr.responseXML;
							} else {
								if (dataType == "json") {
									result = blankRE.test(result) ? null : $.parseJSON(result);
								}
							}
						}
					} catch (e) {
						error = e;
					}
					if (error) {
						ajaxError(error, "parsererror", xhr, settings);
					} else {
						ajaxSuccess(result, xhr, settings);
					}
				} else {
					ajaxError(null, xhr.status ? "error" : "abort", xhr, settings);
				}
			}
		};
		var async = "async" in settings ? settings.async : true;
		xhr.open(settings.type, settings.url, async);
		for (name in settings.headers) {
			xhr.setRequestHeader(name, settings.headers[name]);
		}
		if (ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort();
			return false;
		}
		if (settings.timeout > 0) {
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = empty;
				xhr.abort();
				ajaxError(null, "timeout", xhr, settings);
			}, settings.timeout);
		}
		xhr.send(settings.data ? settings.data : null);
		return xhr;
	};

	function parseArguments(url, data, success, dataType) {
		var hasData = !$.isFunction(data);
		return {
			url: url,
			data: hasData ? data : undefined,
			success: !hasData ? data : $.isFunction(success) ? success : undefined,
			dataType: hasData ? dataType || success : success
		};
	}
	$.get = function(url, data, success, dataType) {
		return $.ajax(parseArguments.apply(null, arguments));
	};
	$.post = function(url, data, success, dataType) {
		var options = parseArguments.apply(null, arguments);
		options.type = "POST";
		return $.ajax(options);
	};
	$.getJSON = function(url, data, success) {
		var options = parseArguments.apply(null, arguments);
		options.dataType = "json";
		return $.ajax(options);
	};
	$.fn.load = function(url, data, success) {
		if (!this.length) {
			return this;
		}
		var self = this,
			parts = url.split(/\s/),
			selector, options = parseArguments(url, data, success),
			callback = options.success;
		if (parts.length > 1) {
			options.url = parts[0], selector = parts[1];
		}
		options.success = function(response) {
			self.html(selector ? $("<div>").html(response.replace(rscript, "")).find(selector) : response);
			callback && callback.apply(self, arguments);
		};
		$.ajax(options);
		return this;
	};
	var escape = encodeURIComponent;

	function serialize(params, obj, traditional, scope) {
		var type, array = $.isArray(obj);
		$.each(obj, function(key, value) {
			type = $.type(value);
			if (scope) {
				key = traditional ? scope : scope + "[" + (array ? "" : key) + "]";
			}
			if (!scope && array) {
				params.add(value.name, value.value);
			} else {
				if (type == "array" || (!traditional && type == "object")) {
					serialize(params, value, traditional, key);
				} else {
					params.add(key, value);
				}
			}
		});
	}
	$.param = function(obj, traditional) {
		var params = [];
		params.add = function(k, v) {
			this.push(escape(k) + "=" + escape(v));
		};
		serialize(params, obj, traditional);
		return params.join("&").replace(/%20/g, "+");
	};
})(Zepto);
(function(a) {
	a.fn.serializeArray = function() {
		var b = [],
			c;
		a(Array.prototype.slice.call(this.get(0).elements)).each(function() {
			c = a(this);
			var d = c.attr("type");
			if (this.nodeName.toLowerCase() != "fieldset" && !this.disabled && d != "submit" && d != "reset" && d != "button" && ((d != "radio" && d != "checkbox") || this.checked)) {
				b.push({
					name: c.attr("name"),
					value: c.val()
				});
			}
		});
		return b;
	};
	a.fn.serialize = function() {
		var b = [];
		this.serializeArray().forEach(function(c) {
			b.push(encodeURIComponent(c.name) + "=" + encodeURIComponent(c.value));
		});
		return b.join("&");
	};
	a.fn.submit = function(c) {
		if (c) {
			this.bind("submit", c);
		} else {
			if (this.length) {
				var b = a.Event("submit");
				this.eq(0).trigger(b);
				if (!b.defaultPrevented) {
					this.get(0).submit();
				}
			}
		}
		return this;
	};
})(Zepto);
(function(i) {
	var g = {},
		b, k, h, e = 750,
		a;

	function c(m) {
		return "tagName" in m ? m : m.parentNode;
	}
	function j(n, m, p, o) {
		var r = Math.abs(n - m),
			q = Math.abs(p - o);
		return r >= q ? (n - m > 0 ? "Left" : "Right") : (p - o > 0 ? "Up" : "Down");
	}
	function l() {
		a = null;
		if (g.last) {
			g.el.trigger("longTap");
			g = {};
		}
	}
	function d() {
		if (a) {
			clearTimeout(a);
		}
		a = null;
	}
	function f() {
		if (b) {
			clearTimeout(b);
		}
		if (k) {
			clearTimeout(k);
		}
		if (h) {
			clearTimeout(h);
		}
		if (a) {
			clearTimeout(a);
		}
		b = k = h = a = null;
		g = {};
	}
	i(document).ready(function() {
		var m, n;
		i(document.body).bind("touchstart", function(o) {
			m = Date.now();
			n = m - (g.last || m);
			g.el = i(c(o.touches[0].target));
			b && clearTimeout(b);
			g.x1 = o.touches[0].pageX;
			g.y1 = o.touches[0].pageY;
			if (n > 0 && n <= 250) {
				g.isDoubleTap = true;
			}
			g.last = m;
			a = setTimeout(l, e);
		}).bind("touchmove", function(o) {
			d();
			g.x2 = o.touches[0].pageX;
			g.y2 = o.touches[0].pageY;
			if (Math.abs(g.x1 - g.x2) > 10) {
				o.preventDefault();
			}
		}).bind("touchend", function(o) {
			d();
			if ((g.x2 && Math.abs(g.x1 - g.x2) > 30) || (g.y2 && Math.abs(g.y1 - g.y2) > 30)) {
				h = setTimeout(function() {
					g.el.trigger("swipe");
					g.el.trigger("swipe" + (j(g.x1, g.x2, g.y1, g.y2)));
					g = {};
				}, 0);
			} else {
				if ("last" in g) {
					k = setTimeout(function() {
						var p = i.Event("tap");
						p.cancelTouch = f;
						g.el.trigger(p);
						if (g.isDoubleTap) {
							g.el.trigger("doubleTap");
							g = {};
						} else {
							b = setTimeout(function() {
								b = null;
								g.el.trigger("singleTap");
								g = {};
							}, 250);
						}
					}, 0);
				}
			}
		}).bind("touchcancel", f);
		i(window).bind("scroll", f);
	});
	["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(n) {
		i.fn[n] = function(m) {
			return this.bind(n, m);
		};
	});
})(Zepto);