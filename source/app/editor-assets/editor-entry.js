import { a as Ea, b as Za } from "./chunks/chunk-Y6SLVHK3.js";
import { buildPageSearchMatches } from "./search-engine.mjs";
var Ks = Ea((q) => {
  "use strict";
  var An = Symbol.for("react.transitional.element"),
    vx = Symbol.for("react.portal"),
    Ix = Symbol.for("react.fragment"),
    wx = Symbol.for("react.strict_mode"),
    Ax = Symbol.for("react.profiler"),
    Mx = Symbol.for("react.consumer"),
    Dx = Symbol.for("react.context"),
    Tx = Symbol.for("react.forward_ref"),
    kx = Symbol.for("react.suspense"),
    zx = Symbol.for("react.memo"),
    Vs = Symbol.for("react.lazy"),
    Bx = Symbol.for("react.activity"),
    Ps = Symbol.iterator;
  function Rx(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Ps && e[Ps]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Xs = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Ys = Object.assign,
    js = {};
  function Fl(e, a, t) {
    ((this.props = e),
      (this.context = a),
      (this.refs = js),
      (this.updater = t || Xs));
  }
  Fl.prototype.isReactComponent = {};
  Fl.prototype.setState = function (e, a) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables.",
      );
    this.updater.enqueueSetState(this, e, a, "setState");
  };
  Fl.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function Zs() {}
  Zs.prototype = Fl.prototype;
  function Mn(e, a, t) {
    ((this.props = e),
      (this.context = a),
      (this.refs = js),
      (this.updater = t || Xs));
  }
  var Dn = (Mn.prototype = new Zs());
  Dn.constructor = Mn;
  Ys(Dn, Fl.prototype);
  Dn.isPureReactComponent = !0;
  var Fs = Array.isArray;
  function wn() {}
  var ie = { H: null, A: null, T: null, S: null },
    Qs = Object.prototype.hasOwnProperty;
  function Tn(e, a, t) {
    var l = t.ref;
    return {
      $$typeof: An,
      type: e,
      key: a,
      ref: l !== void 0 ? l : null,
      props: t,
    };
  }
  function Ox(e, a) {
    return Tn(e.type, a, e.props);
  }
  function kn(e) {
    return typeof e == "object" && e !== null && e.$$typeof === An;
  }
  function Ex(e) {
    var a = { "=": "=0", ":": "=2" };
    return (
      "$" +
      e.replace(/[=:]/g, function (t) {
        return a[t];
      })
    );
  }
  var Gs = /\/+/g;
  function In(e, a) {
    return typeof e == "object" && e !== null && e.key != null
      ? Ex("" + e.key)
      : a.toString(36);
  }
  function Ux(e) {
    switch (e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw e.reason;
      default:
        switch (
          (typeof e.status == "string"
            ? e.then(wn, wn)
            : ((e.status = "pending"),
              e.then(
                function (a) {
                  e.status === "pending" &&
                    ((e.status = "fulfilled"), (e.value = a));
                },
                function (a) {
                  e.status === "pending" &&
                    ((e.status = "rejected"), (e.reason = a));
                },
              )),
          e.status)
        ) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
        }
    }
    throw e;
  }
  function Pl(e, a, t, l, u) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var f = !1;
    if (e === null) f = !0;
    else
      switch (o) {
        case "bigint":
        case "string":
        case "number":
          f = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case An:
            case vx:
              f = !0;
              break;
            case Vs:
              return ((f = e._init), Pl(f(e._payload), a, t, l, u));
          }
      }
    if (f)
      return (
        (u = u(e)),
        (f = l === "" ? "." + In(e, 0) : l),
        Fs(u)
          ? ((t = ""),
            f != null && (t = f.replace(Gs, "$&/") + "/"),
            Pl(u, a, t, "", function (m) {
              return m;
            }))
          : u != null &&
            (kn(u) &&
              (u = Ox(
                u,
                t +
                  (u.key == null || (e && e.key === u.key)
                    ? ""
                    : ("" + u.key).replace(Gs, "$&/") + "/") +
                  f,
              )),
            a.push(u)),
        1
      );
    f = 0;
    var i = l === "" ? "." : l + ":";
    if (Fs(e))
      for (var r = 0; r < e.length; r++)
        ((l = e[r]), (o = i + In(l, r)), (f += Pl(l, a, t, o, u)));
    else if (((r = Rx(e)), typeof r == "function"))
      for (e = r.call(e), r = 0; !(l = e.next()).done;)
        ((l = l.value), (o = i + In(l, r++)), (f += Pl(l, a, t, o, u)));
    else if (o === "object") {
      if (typeof e.then == "function") return Pl(Ux(e), a, t, l, u);
      throw (
        (a = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            (a === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : a) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return f;
  }
  function wf(e, a, t) {
    if (e == null) return e;
    var l = [],
      u = 0;
    return (
      Pl(e, l, "", "", function (o) {
        return a.call(t, o, u++);
      }),
      l
    );
  }
  function qx(e) {
    if (e._status === -1) {
      var a = e._result;
      ((a = a()),
        a.then(
          function (t) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 1), (e._result = t));
          },
          function (t) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 2), (e._result = t));
          },
        ),
        e._status === -1 && ((e._status = 0), (e._result = a)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var _s =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var a = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(a)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    Hx = {
      map: wf,
      forEach: function (e, a, t) {
        wf(
          e,
          function () {
            a.apply(this, arguments);
          },
          t,
        );
      },
      count: function (e) {
        var a = 0;
        return (
          wf(e, function () {
            a++;
          }),
          a
        );
      },
      toArray: function (e) {
        return (
          wf(e, function (a) {
            return a;
          }) || []
        );
      },
      only: function (e) {
        if (!kn(e))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return e;
      },
    };
  q.Activity = Bx;
  q.Children = Hx;
  q.Component = Fl;
  q.Fragment = Ix;
  q.Profiler = Ax;
  q.PureComponent = Mn;
  q.StrictMode = wx;
  q.Suspense = kx;
  q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie;
  q.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (e) {
      return ie.H.useMemoCache(e);
    },
  };
  q.cache = function (e) {
    return function () {
      return e.apply(null, arguments);
    };
  };
  q.cacheSignal = function () {
    return null;
  };
  q.cloneElement = function (e, a, t) {
    if (e == null)
      throw Error(
        "The argument must be a React element, but you passed " + e + ".",
      );
    var l = Ys({}, e.props),
      u = e.key;
    if (a != null)
      for (o in (a.key !== void 0 && (u = "" + a.key), a))
        !Qs.call(a, o) ||
          o === "key" ||
          o === "__self" ||
          o === "__source" ||
          (o === "ref" && a.ref === void 0) ||
          (l[o] = a[o]);
    var o = arguments.length - 2;
    if (o === 1) l.children = t;
    else if (1 < o) {
      for (var f = Array(o), i = 0; i < o; i++) f[i] = arguments[i + 2];
      l.children = f;
    }
    return Tn(e.type, u, l);
  };
  q.createContext = function (e) {
    return (
      (e = {
        $$typeof: Dx,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
      }),
      (e.Provider = e),
      (e.Consumer = { $$typeof: Mx, _context: e }),
      e
    );
  };
  q.createElement = function (e, a, t) {
    var l,
      u = {},
      o = null;
    if (a != null)
      for (l in (a.key !== void 0 && (o = "" + a.key), a))
        Qs.call(a, l) &&
          l !== "key" &&
          l !== "__self" &&
          l !== "__source" &&
          (u[l] = a[l]);
    var f = arguments.length - 2;
    if (f === 1) u.children = t;
    else if (1 < f) {
      for (var i = Array(f), r = 0; r < f; r++) i[r] = arguments[r + 2];
      u.children = i;
    }
    if (e && e.defaultProps)
      for (l in ((f = e.defaultProps), f)) u[l] === void 0 && (u[l] = f[l]);
    return Tn(e, o, u);
  };
  q.createRef = function () {
    return { current: null };
  };
  q.forwardRef = function (e) {
    return { $$typeof: Tx, render: e };
  };
  q.isValidElement = kn;
  q.lazy = function (e) {
    return { $$typeof: Vs, _payload: { _status: -1, _result: e }, _init: qx };
  };
  q.memo = function (e, a) {
    return { $$typeof: zx, type: e, compare: a === void 0 ? null : a };
  };
  q.startTransition = function (e) {
    var a = ie.T,
      t = {};
    ie.T = t;
    try {
      var l = e(),
        u = ie.S;
      (u !== null && u(t, l),
        typeof l == "object" &&
          l !== null &&
          typeof l.then == "function" &&
          l.then(wn, _s));
    } catch (o) {
      _s(o);
    } finally {
      (a !== null && t.types !== null && (a.types = t.types), (ie.T = a));
    }
  };
  q.unstable_useCacheRefresh = function () {
    return ie.H.useCacheRefresh();
  };
  q.use = function (e) {
    return ie.H.use(e);
  };
  q.useActionState = function (e, a, t) {
    return ie.H.useActionState(e, a, t);
  };
  q.useCallback = function (e, a) {
    return ie.H.useCallback(e, a);
  };
  q.useContext = function (e) {
    return ie.H.useContext(e);
  };
  q.useDebugValue = function () {};
  q.useDeferredValue = function (e, a) {
    return ie.H.useDeferredValue(e, a);
  };
  q.useEffect = function (e, a) {
    return ie.H.useEffect(e, a);
  };
  q.useEffectEvent = function (e) {
    return ie.H.useEffectEvent(e);
  };
  q.useId = function () {
    return ie.H.useId();
  };
  q.useImperativeHandle = function (e, a, t) {
    return ie.H.useImperativeHandle(e, a, t);
  };
  q.useInsertionEffect = function (e, a) {
    return ie.H.useInsertionEffect(e, a);
  };
  q.useLayoutEffect = function (e, a) {
    return ie.H.useLayoutEffect(e, a);
  };
  q.useMemo = function (e, a) {
    return ie.H.useMemo(e, a);
  };
  q.useOptimistic = function (e, a) {
    return ie.H.useOptimistic(e, a);
  };
  q.useReducer = function (e, a, t) {
    return ie.H.useReducer(e, a, t);
  };
  q.useRef = function (e) {
    return ie.H.useRef(e);
  };
  q.useState = function (e) {
    return ie.H.useState(e);
  };
  q.useSyncExternalStore = function (e, a, t) {
    return ie.H.useSyncExternalStore(e, a, t);
  };
  q.useTransition = function () {
    return ie.H.useTransition();
  };
  q.version = "19.2.6";
});
var tl = Ea((L1, Js) => {
  "use strict";
  Js.exports = Ks();
});
var dc = Ea((me) => {
  "use strict";
  function On(e, a) {
    var t = e.length;
    e.push(a);
    e: for (; 0 < t;) {
      var l = (t - 1) >>> 1,
        u = e[l];
      if (0 < Af(u, a)) ((e[l] = a), (e[t] = u), (t = l));
      else break e;
    }
  }
  function Ua(e) {
    return e.length === 0 ? null : e[0];
  }
  function Df(e) {
    if (e.length === 0) return null;
    var a = e[0],
      t = e.pop();
    if (t !== a) {
      e[0] = t;
      e: for (var l = 0, u = e.length, o = u >>> 1; l < o;) {
        var f = 2 * (l + 1) - 1,
          i = e[f],
          r = f + 1,
          m = e[r];
        if (0 > Af(i, t))
          r < u && 0 > Af(m, i)
            ? ((e[l] = m), (e[r] = t), (l = r))
            : ((e[l] = i), (e[f] = t), (l = f));
        else if (r < u && 0 > Af(m, t)) ((e[l] = m), (e[r] = t), (l = r));
        else break e;
      }
    }
    return a;
  }
  function Af(e, a) {
    var t = e.sortIndex - a.sortIndex;
    return t !== 0 ? t : e.id - a.id;
  }
  me.unstable_now = void 0;
  typeof performance == "object" && typeof performance.now == "function"
    ? ((Ws = performance),
      (me.unstable_now = function () {
        return Ws.now();
      }))
    : ((zn = Date),
      ($s = zn.now()),
      (me.unstable_now = function () {
        return zn.now() - $s;
      }));
  var Ws,
    zn,
    $s,
    Qa = [],
    Ct = [],
    Nx = 1,
    ha = null,
    Ge = 3,
    En = !1,
    Wu = !1,
    $u = !1,
    Un = !1,
    tc = typeof setTimeout == "function" ? setTimeout : null,
    lc = typeof clearTimeout == "function" ? clearTimeout : null,
    ec = typeof setImmediate < "u" ? setImmediate : null;
  function Mf(e) {
    for (var a = Ua(Ct); a !== null;) {
      if (a.callback === null) Df(Ct);
      else if (a.startTime <= e)
        (Df(Ct), (a.sortIndex = a.expirationTime), On(Qa, a));
      else break;
      a = Ua(Ct);
    }
  }
  function qn(e) {
    if ((($u = !1), Mf(e), !Wu))
      if (Ua(Qa) !== null) ((Wu = !0), _l || ((_l = !0), Gl()));
      else {
        var a = Ua(Ct);
        a !== null && Hn(qn, a.startTime - e);
      }
  }
  var _l = !1,
    eo = -1,
    uc = 5,
    oc = -1;
  function fc() {
    return Un ? !0 : !(me.unstable_now() - oc < uc);
  }
  function Bn() {
    if (((Un = !1), _l)) {
      var e = me.unstable_now();
      oc = e;
      var a = !0;
      try {
        e: {
          ((Wu = !1), $u && (($u = !1), lc(eo), (eo = -1)), (En = !0));
          var t = Ge;
          try {
            a: {
              for (
                Mf(e), ha = Ua(Qa);
                ha !== null && !(ha.expirationTime > e && fc());
              ) {
                var l = ha.callback;
                if (typeof l == "function") {
                  ((ha.callback = null), (Ge = ha.priorityLevel));
                  var u = l(ha.expirationTime <= e);
                  if (((e = me.unstable_now()), typeof u == "function")) {
                    ((ha.callback = u), Mf(e), (a = !0));
                    break a;
                  }
                  (ha === Ua(Qa) && Df(Qa), Mf(e));
                } else Df(Qa);
                ha = Ua(Qa);
              }
              if (ha !== null) a = !0;
              else {
                var o = Ua(Ct);
                (o !== null && Hn(qn, o.startTime - e), (a = !1));
              }
            }
            break e;
          } finally {
            ((ha = null), (Ge = t), (En = !1));
          }
          a = void 0;
        }
      } finally {
        a ? Gl() : (_l = !1);
      }
    }
  }
  var Gl;
  typeof ec == "function"
    ? (Gl = function () {
        ec(Bn);
      })
    : typeof MessageChannel < "u"
      ? ((Rn = new MessageChannel()),
        (ac = Rn.port2),
        (Rn.port1.onmessage = Bn),
        (Gl = function () {
          ac.postMessage(null);
        }))
      : (Gl = function () {
          tc(Bn, 0);
        });
  var Rn, ac;
  function Hn(e, a) {
    eo = tc(function () {
      e(me.unstable_now());
    }, a);
  }
  me.unstable_IdlePriority = 5;
  me.unstable_ImmediatePriority = 1;
  me.unstable_LowPriority = 4;
  me.unstable_NormalPriority = 3;
  me.unstable_Profiling = null;
  me.unstable_UserBlockingPriority = 2;
  me.unstable_cancelCallback = function (e) {
    e.callback = null;
  };
  me.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e
      ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
        )
      : (uc = 0 < e ? Math.floor(1e3 / e) : 5);
  };
  me.unstable_getCurrentPriorityLevel = function () {
    return Ge;
  };
  me.unstable_next = function (e) {
    switch (Ge) {
      case 1:
      case 2:
      case 3:
        var a = 3;
        break;
      default:
        a = Ge;
    }
    var t = Ge;
    Ge = a;
    try {
      return e();
    } finally {
      Ge = t;
    }
  };
  me.unstable_requestPaint = function () {
    Un = !0;
  };
  me.unstable_runWithPriority = function (e, a) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var t = Ge;
    Ge = e;
    try {
      return a();
    } finally {
      Ge = t;
    }
  };
  me.unstable_scheduleCallback = function (e, a, t) {
    var l = me.unstable_now();
    switch (
      (typeof t == "object" && t !== null
        ? ((t = t.delay), (t = typeof t == "number" && 0 < t ? l + t : l))
        : (t = l),
      e)
    ) {
      case 1:
        var u = -1;
        break;
      case 2:
        u = 250;
        break;
      case 5:
        u = 1073741823;
        break;
      case 4:
        u = 1e4;
        break;
      default:
        u = 5e3;
    }
    return (
      (u = t + u),
      (e = {
        id: Nx++,
        callback: a,
        priorityLevel: e,
        startTime: t,
        expirationTime: u,
        sortIndex: -1,
      }),
      t > l
        ? ((e.sortIndex = t),
          On(Ct, e),
          Ua(Qa) === null &&
            e === Ua(Ct) &&
            ($u ? (lc(eo), (eo = -1)) : ($u = !0), Hn(qn, t - l)))
        : ((e.sortIndex = u),
          On(Qa, e),
          Wu || En || ((Wu = !0), _l || ((_l = !0), Gl()))),
      e
    );
  };
  me.unstable_shouldYield = fc;
  me.unstable_wrapCallback = function (e) {
    var a = Ge;
    return function () {
      var t = Ge;
      Ge = a;
      try {
        return e.apply(this, arguments);
      } finally {
        Ge = t;
      }
    };
  };
});
var ic = Ea((y1, nc) => {
  "use strict";
  nc.exports = dc();
});
var sc = Ea((Ve) => {
  "use strict";
  var Px = tl();
  function rc(e) {
    var a = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var t = 2; t < arguments.length; t++)
        a += "&args[]=" + encodeURIComponent(arguments[t]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      a +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function yt() {}
  var _e = {
      d: {
        f: yt,
        r: function () {
          throw Error(rc(522));
        },
        D: yt,
        C: yt,
        L: yt,
        m: yt,
        X: yt,
        S: yt,
        M: yt,
      },
      p: 0,
      findDOMNode: null,
    },
    Fx = Symbol.for("react.portal");
  function Gx(e, a, t) {
    var l =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Fx,
      key: l == null ? null : "" + l,
      children: e,
      containerInfo: a,
      implementation: t,
    };
  }
  var ao = Px.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Tf(e, a) {
    if (e === "font") return "";
    if (typeof a == "string") return a === "use-credentials" ? a : "";
  }
  Ve.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _e;
  Ve.createPortal = function (e, a) {
    var t =
      2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!a || (a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11))
      throw Error(rc(299));
    return Gx(e, a, null, t);
  };
  Ve.flushSync = function (e) {
    var a = ao.T,
      t = _e.p;
    try {
      if (((ao.T = null), (_e.p = 2), e)) return e();
    } finally {
      ((ao.T = a), (_e.p = t), _e.d.f());
    }
  };
  Ve.preconnect = function (e, a) {
    typeof e == "string" &&
      (a
        ? ((a = a.crossOrigin),
          (a =
            typeof a == "string" ? (a === "use-credentials" ? a : "") : void 0))
        : (a = null),
      _e.d.C(e, a));
  };
  Ve.prefetchDNS = function (e) {
    typeof e == "string" && _e.d.D(e);
  };
  Ve.preinit = function (e, a) {
    if (typeof e == "string" && a && typeof a.as == "string") {
      var t = a.as,
        l = Tf(t, a.crossOrigin),
        u = typeof a.integrity == "string" ? a.integrity : void 0,
        o = typeof a.fetchPriority == "string" ? a.fetchPriority : void 0;
      t === "style"
        ? _e.d.S(e, typeof a.precedence == "string" ? a.precedence : void 0, {
            crossOrigin: l,
            integrity: u,
            fetchPriority: o,
          })
        : t === "script" &&
          _e.d.X(e, {
            crossOrigin: l,
            integrity: u,
            fetchPriority: o,
            nonce: typeof a.nonce == "string" ? a.nonce : void 0,
          });
    }
  };
  Ve.preinitModule = function (e, a) {
    if (typeof e == "string")
      if (typeof a == "object" && a !== null) {
        if (a.as == null || a.as === "script") {
          var t = Tf(a.as, a.crossOrigin);
          _e.d.M(e, {
            crossOrigin: t,
            integrity: typeof a.integrity == "string" ? a.integrity : void 0,
            nonce: typeof a.nonce == "string" ? a.nonce : void 0,
          });
        }
      } else a == null && _e.d.M(e);
  };
  Ve.preload = function (e, a) {
    if (
      typeof e == "string" &&
      typeof a == "object" &&
      a !== null &&
      typeof a.as == "string"
    ) {
      var t = a.as,
        l = Tf(t, a.crossOrigin);
      _e.d.L(e, t, {
        crossOrigin: l,
        integrity: typeof a.integrity == "string" ? a.integrity : void 0,
        nonce: typeof a.nonce == "string" ? a.nonce : void 0,
        type: typeof a.type == "string" ? a.type : void 0,
        fetchPriority:
          typeof a.fetchPriority == "string" ? a.fetchPriority : void 0,
        referrerPolicy:
          typeof a.referrerPolicy == "string" ? a.referrerPolicy : void 0,
        imageSrcSet: typeof a.imageSrcSet == "string" ? a.imageSrcSet : void 0,
        imageSizes: typeof a.imageSizes == "string" ? a.imageSizes : void 0,
        media: typeof a.media == "string" ? a.media : void 0,
      });
    }
  };
  Ve.preloadModule = function (e, a) {
    if (typeof e == "string")
      if (a) {
        var t = Tf(a.as, a.crossOrigin);
        _e.d.m(e, {
          as: typeof a.as == "string" && a.as !== "script" ? a.as : void 0,
          crossOrigin: t,
          integrity: typeof a.integrity == "string" ? a.integrity : void 0,
        });
      } else _e.d.m(e);
  };
  Ve.requestFormReset = function (e) {
    _e.d.r(e);
  };
  Ve.unstable_batchedUpdates = function (e, a) {
    return e(a);
  };
  Ve.useFormState = function (e, a, t) {
    return ao.H.useFormState(e, a, t);
  };
  Ve.useFormStatus = function () {
    return ao.H.useHostTransitionStatus();
  };
  Ve.version = "19.2.6";
});
var mc = Ea((S1, pc) => {
  "use strict";
  function cc() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cc);
      } catch (e) {
        console.error(e);
      }
  }
  (cc(), (pc.exports = sc()));
});
var Ah = Ea((en) => {
  "use strict";
  var ze = ic(),
    Pp = tl(),
    _x = mc();
  function v(e) {
    var a = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var t = 2; t < arguments.length; t++)
        a += "&args[]=" + encodeURIComponent(arguments[t]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      a +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function Fp(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Go(e) {
    var a = e,
      t = e;
    if (e.alternate) for (; a.return;) a = a.return;
    else {
      e = a;
      do ((a = e), (a.flags & 4098) !== 0 && (t = a.return), (e = a.return));
      while (e);
    }
    return a.tag === 3 ? t : null;
  }
  function Gp(e) {
    if (e.tag === 13) {
      var a = e.memoizedState;
      if (
        (a === null && ((e = e.alternate), e !== null && (a = e.memoizedState)),
        a !== null)
      )
        return a.dehydrated;
    }
    return null;
  }
  function _p(e) {
    if (e.tag === 31) {
      var a = e.memoizedState;
      if (
        (a === null && ((e = e.alternate), e !== null && (a = e.memoizedState)),
        a !== null)
      )
        return a.dehydrated;
    }
    return null;
  }
  function gc(e) {
    if (Go(e) !== e) throw Error(v(188));
  }
  function Vx(e) {
    var a = e.alternate;
    if (!a) {
      if (((a = Go(e)), a === null)) throw Error(v(188));
      return a !== e ? null : e;
    }
    for (var t = e, l = a; ;) {
      var u = t.return;
      if (u === null) break;
      var o = u.alternate;
      if (o === null) {
        if (((l = u.return), l !== null)) {
          t = l;
          continue;
        }
        break;
      }
      if (u.child === o.child) {
        for (o = u.child; o;) {
          if (o === t) return (gc(u), e);
          if (o === l) return (gc(u), a);
          o = o.sibling;
        }
        throw Error(v(188));
      }
      if (t.return !== l.return) ((t = u), (l = o));
      else {
        for (var f = !1, i = u.child; i;) {
          if (i === t) {
            ((f = !0), (t = u), (l = o));
            break;
          }
          if (i === l) {
            ((f = !0), (l = u), (t = o));
            break;
          }
          i = i.sibling;
        }
        if (!f) {
          for (i = o.child; i;) {
            if (i === t) {
              ((f = !0), (t = o), (l = u));
              break;
            }
            if (i === l) {
              ((f = !0), (l = o), (t = u));
              break;
            }
            i = i.sibling;
          }
          if (!f) throw Error(v(189));
        }
      }
      if (t.alternate !== l) throw Error(v(190));
    }
    if (t.tag !== 3) throw Error(v(188));
    return t.stateNode.current === t ? e : a;
  }
  function Vp(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e;
    for (e = e.child; e !== null;) {
      if (((a = Vp(e)), a !== null)) return a;
      e = e.sibling;
    }
    return null;
  }
  var ce = Object.assign,
    Xx = Symbol.for("react.element"),
    kf = Symbol.for("react.transitional.element"),
    ro = Symbol.for("react.portal"),
    Ql = Symbol.for("react.fragment"),
    Xp = Symbol.for("react.strict_mode"),
    Li = Symbol.for("react.profiler"),
    Yp = Symbol.for("react.consumer"),
    lt = Symbol.for("react.context"),
    pr = Symbol.for("react.forward_ref"),
    Ci = Symbol.for("react.suspense"),
    yi = Symbol.for("react.suspense_list"),
    mr = Symbol.for("react.memo"),
    bt = Symbol.for("react.lazy"),
    bi = Symbol.for("react.activity"),
    Yx = Symbol.for("react.memo_cache_sentinel"),
    hc = Symbol.iterator;
  function to(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (hc && e[hc]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var jx = Symbol.for("react.client.reference");
  function Si(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === jx ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Ql:
        return "Fragment";
      case Li:
        return "Profiler";
      case Xp:
        return "StrictMode";
      case Ci:
        return "Suspense";
      case yi:
        return "SuspenseList";
      case bi:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ro:
          return "Portal";
        case lt:
          return e.displayName || "Context";
        case Yp:
          return (e._context.displayName || "Context") + ".Consumer";
        case pr:
          var a = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = a.displayName || a.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case mr:
          return (
            (a = e.displayName || null),
            a !== null ? a : Si(e.type) || "Memo"
          );
        case bt:
          ((a = e._payload), (e = e._init));
          try {
            return Si(e(a));
          } catch {}
      }
    return null;
  }
  var so = Array.isArray,
    E = Pp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = _x.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    nl = { pending: !1, data: null, method: null, action: null },
    vi = [],
    Kl = -1;
  function Fa(e) {
    return { current: e };
  }
  function Oe(e) {
    0 > Kl || ((e.current = vi[Kl]), (vi[Kl] = null), Kl--);
  }
  function de(e, a) {
    (Kl++, (vi[Kl] = e.current), (e.current = a));
  }
  var Pa = Fa(null),
    Do = Fa(null),
    Bt = Fa(null),
    id = Fa(null);
  function rd(e, a) {
    switch ((de(Bt, a), de(Do, e), de(Pa, null), a.nodeType)) {
      case 9:
      case 11:
        e = (e = a.documentElement) && (e = e.namespaceURI) ? vp(e) : 0;
        break;
      default:
        if (((e = a.tagName), (a = a.namespaceURI)))
          ((a = vp(a)), (e = ch(a, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (Oe(Pa), de(Pa, e));
  }
  function mu() {
    (Oe(Pa), Oe(Do), Oe(Bt));
  }
  function Ii(e) {
    e.memoizedState !== null && de(id, e);
    var a = Pa.current,
      t = ch(a, e.type);
    a !== t && (de(Do, e), de(Pa, t));
  }
  function sd(e) {
    (Do.current === e && (Oe(Pa), Oe(Do)),
      id.current === e && (Oe(id), (No._currentValue = nl)));
  }
  var Nn, xc;
  function ul(e) {
    if (Nn === void 0)
      try {
        throw Error();
      } catch (t) {
        var a = t.stack.trim().match(/\n( *(at )?)/);
        ((Nn = (a && a[1]) || ""),
          (xc =
            -1 <
            t.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < t.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Nn +
      e +
      xc
    );
  }
  var Pn = !1;
  function Fn(e, a) {
    if (!e || Pn) return "";
    Pn = !0;
    var t = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (a) {
              var b = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(b.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(b, []);
                } catch (x) {
                  var h = x;
                }
                Reflect.construct(e, [], b);
              } else {
                try {
                  b.call();
                } catch (x) {
                  h = x;
                }
                e.call(b.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                h = x;
              }
              (b = e()) &&
                typeof b.catch == "function" &&
                b.catch(function () {});
            }
          } catch (x) {
            if (x && h && typeof x.stack == "string") return [x.stack, h.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var o = l.DetermineComponentFrameRoot(),
        f = o[0],
        i = o[1];
      if (f && i) {
        var r = f.split(`
`),
          m = i.split(`
`);
        for (
          u = l = 0;
          l < r.length && !r[l].includes("DetermineComponentFrameRoot");
        )
          l++;
        for (; u < m.length && !m[u].includes("DetermineComponentFrameRoot");)
          u++;
        if (l === r.length || u === m.length)
          for (
            l = r.length - 1, u = m.length - 1;
            1 <= l && 0 <= u && r[l] !== m[u];
          )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (r[l] !== m[u]) {
            if (l !== 1 || u !== 1)
              do
                if ((l--, u--, 0 > u || r[l] !== m[u])) {
                  var C =
                    `
` + r[l].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      C.includes("<anonymous>") &&
                      (C = C.replace("<anonymous>", e.displayName)),
                    C
                  );
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      ((Pn = !1), (Error.prepareStackTrace = t));
    }
    return (t = e ? e.displayName || e.name : "") ? ul(t) : "";
  }
  function Zx(e, a) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ul(e.type);
      case 16:
        return ul("Lazy");
      case 13:
        return e.child !== a && a !== null
          ? ul("Suspense Fallback")
          : ul("Suspense");
      case 19:
        return ul("SuspenseList");
      case 0:
      case 15:
        return Fn(e.type, !1);
      case 11:
        return Fn(e.type.render, !1);
      case 1:
        return Fn(e.type, !0);
      case 31:
        return ul("Activity");
      default:
        return "";
    }
  }
  function Lc(e) {
    try {
      var a = "",
        t = null;
      do ((a += Zx(e, t)), (t = e), (e = e.return));
      while (e);
      return a;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  var wi = Object.prototype.hasOwnProperty,
    gr = ze.unstable_scheduleCallback,
    Gn = ze.unstable_cancelCallback,
    Qx = ze.unstable_shouldYield,
    Kx = ze.unstable_requestPaint,
    fa = ze.unstable_now,
    Jx = ze.unstable_getCurrentPriorityLevel,
    jp = ze.unstable_ImmediatePriority,
    Zp = ze.unstable_UserBlockingPriority,
    cd = ze.unstable_NormalPriority,
    Wx = ze.unstable_LowPriority,
    Qp = ze.unstable_IdlePriority,
    $x = ze.log,
    eL = ze.unstable_setDisableYieldValue,
    _o = null,
    da = null;
  function Mt(e) {
    if (
      (typeof $x == "function" && eL(e),
      da && typeof da.setStrictMode == "function")
    )
      try {
        da.setStrictMode(_o, e);
      } catch {}
  }
  var na = Math.clz32 ? Math.clz32 : lL,
    aL = Math.log,
    tL = Math.LN2;
  function lL(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((aL(e) / tL) | 0)) | 0);
  }
  var zf = 256,
    Bf = 262144,
    Rf = 4194304;
  function ol(e) {
    var a = e & 42;
    if (a !== 0) return a;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Hd(e, a, t) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0,
      o = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var i = l & 134217727;
    return (
      i !== 0
        ? ((l = i & ~o),
          l !== 0
            ? (u = ol(l))
            : ((f &= i),
              f !== 0
                ? (u = ol(f))
                : t || ((t = i & ~e), t !== 0 && (u = ol(t)))))
        : ((i = l & ~o),
          i !== 0
            ? (u = ol(i))
            : f !== 0
              ? (u = ol(f))
              : t || ((t = l & ~e), t !== 0 && (u = ol(t)))),
      u === 0
        ? 0
        : a !== 0 &&
            a !== u &&
            (a & o) === 0 &&
            ((o = u & -u),
            (t = a & -a),
            o >= t || (o === 32 && (t & 4194048) !== 0))
          ? a
          : u
    );
  }
  function Vo(e, a) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & a) === 0;
  }
  function uL(e, a) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return a + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Kp() {
    var e = Rf;
    return ((Rf <<= 1), (Rf & 62914560) === 0 && (Rf = 4194304), e);
  }
  function _n(e) {
    for (var a = [], t = 0; 31 > t; t++) a.push(e);
    return a;
  }
  function Xo(e, a) {
    ((e.pendingLanes |= a),
      a !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function oL(e, a, t, l, u, o) {
    var f = e.pendingLanes;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= t),
      (e.entangledLanes &= t),
      (e.errorRecoveryDisabledLanes &= t),
      (e.shellSuspendCounter = 0));
    var i = e.entanglements,
      r = e.expirationTimes,
      m = e.hiddenUpdates;
    for (t = f & ~t; 0 < t;) {
      var C = 31 - na(t),
        b = 1 << C;
      ((i[C] = 0), (r[C] = -1));
      var h = m[C];
      if (h !== null)
        for (m[C] = null, C = 0; C < h.length; C++) {
          var x = h[C];
          x !== null && (x.lane &= -536870913);
        }
      t &= ~b;
    }
    (l !== 0 && Jp(e, l, 0),
      o !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(f & ~a)));
  }
  function Jp(e, a, t) {
    ((e.pendingLanes |= a), (e.suspendedLanes &= ~a));
    var l = 31 - na(a);
    ((e.entangledLanes |= a),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (t & 261930)));
  }
  function Wp(e, a) {
    var t = (e.entangledLanes |= a);
    for (e = e.entanglements; t;) {
      var l = 31 - na(t),
        u = 1 << l;
      ((u & a) | (e[l] & a) && (e[l] |= a), (t &= ~u));
    }
  }
  function $p(e, a) {
    var t = a & -a;
    return (
      (t = (t & 42) !== 0 ? 1 : hr(t)),
      (t & (e.suspendedLanes | a)) !== 0 ? 0 : t
    );
  }
  function hr(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function xr(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function em() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : vh(e.type));
  }
  function Cc(e, a) {
    var t = J.p;
    try {
      return ((J.p = e), a());
    } finally {
      J.p = t;
    }
  }
  var Xt = Math.random().toString(36).slice(2),
    He = "__reactFiber$" + Xt,
    We = "__reactProps$" + Xt,
    wu = "__reactContainer$" + Xt,
    Ai = "__reactEvents$" + Xt,
    fL = "__reactListeners$" + Xt,
    dL = "__reactHandles$" + Xt,
    yc = "__reactResources$" + Xt,
    Yo = "__reactMarker$" + Xt;
  function Lr(e) {
    (delete e[He], delete e[We], delete e[Ai], delete e[fL], delete e[dL]);
  }
  function Jl(e) {
    var a = e[He];
    if (a) return a;
    for (var t = e.parentNode; t;) {
      if ((a = t[wu] || t[He])) {
        if (
          ((t = a.alternate),
          a.child !== null || (t !== null && t.child !== null))
        )
          for (e = Dp(e); e !== null;) {
            if ((t = e[He])) return t;
            e = Dp(e);
          }
        return a;
      }
      ((e = t), (t = e.parentNode));
    }
    return null;
  }
  function Au(e) {
    if ((e = e[He] || e[wu])) {
      var a = e.tag;
      if (
        a === 5 ||
        a === 6 ||
        a === 13 ||
        a === 31 ||
        a === 26 ||
        a === 27 ||
        a === 3
      )
        return e;
    }
    return null;
  }
  function co(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e.stateNode;
    throw Error(v(33));
  }
  function du(e) {
    var a = e[yc];
    return (
      a ||
        (a = e[yc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      a
    );
  }
  function Re(e) {
    e[Yo] = !0;
  }
  var am = new Set(),
    tm = {};
  function Ll(e, a) {
    (gu(e, a), gu(e + "Capture", a));
  }
  function gu(e, a) {
    for (tm[e] = a, e = 0; e < a.length; e++) am.add(a[e]);
  }
  var nL = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    bc = {},
    Sc = {};
  function iL(e) {
    return wi.call(Sc, e)
      ? !0
      : wi.call(bc, e)
        ? !1
        : nL.test(e)
          ? (Sc[e] = !0)
          : ((bc[e] = !0), !1);
  }
  function Zf(e, a, t) {
    if (iL(a))
      if (t === null) e.removeAttribute(a);
      else {
        switch (typeof t) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(a);
            return;
          case "boolean":
            var l = a.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(a);
              return;
            }
        }
        e.setAttribute(a, "" + t);
      }
  }
  function Of(e, a, t) {
    if (t === null) e.removeAttribute(a);
    else {
      switch (typeof t) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttribute(a, "" + t);
    }
  }
  function Ka(e, a, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttributeNS(a, t, "" + l);
    }
  }
  function La(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function lm(e) {
    var a = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (a === "checkbox" || a === "radio")
    );
  }
  function rL(e, a, t) {
    var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, a);
    if (
      !e.hasOwnProperty(a) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var u = l.get,
        o = l.set;
      return (
        Object.defineProperty(e, a, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (f) {
            ((t = "" + f), o.call(this, f));
          },
        }),
        Object.defineProperty(e, a, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return t;
          },
          setValue: function (f) {
            t = "" + f;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[a]);
          },
        }
      );
    }
  }
  function Mi(e) {
    if (!e._valueTracker) {
      var a = lm(e) ? "checked" : "value";
      e._valueTracker = rL(e, a, "" + e[a]);
    }
  }
  function um(e) {
    if (!e) return !1;
    var a = e._valueTracker;
    if (!a) return !0;
    var t = a.getValue(),
      l = "";
    return (
      e && (l = lm(e) ? (e.checked ? "true" : "false") : e.value),
      (e = l),
      e !== t ? (a.setValue(e), !0) : !1
    );
  }
  function pd(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var sL = /[\n"\\]/g;
  function ba(e) {
    return e.replace(sL, function (a) {
      return "\\" + a.charCodeAt(0).toString(16) + " ";
    });
  }
  function Di(e, a, t, l, u, o, f, i) {
    ((e.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (e.type = f)
        : e.removeAttribute("type"),
      a != null
        ? f === "number"
          ? ((a === 0 && e.value === "") || e.value != a) &&
            (e.value = "" + La(a))
          : e.value !== "" + La(a) && (e.value = "" + La(a))
        : (f !== "submit" && f !== "reset") || e.removeAttribute("value"),
      a != null
        ? Ti(e, f, La(a))
        : t != null
          ? Ti(e, f, La(t))
          : l != null && e.removeAttribute("value"),
      u == null && o != null && (e.defaultChecked = !!o),
      u != null &&
        (e.checked = u && typeof u != "function" && typeof u != "symbol"),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (e.name = "" + La(i))
        : e.removeAttribute("name"));
  }
  function om(e, a, t, l, u, o, f, i) {
    if (
      (o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean" &&
        (e.type = o),
      a != null || t != null)
    ) {
      if (!((o !== "submit" && o !== "reset") || a != null)) {
        Mi(e);
        return;
      }
      ((t = t != null ? "" + La(t) : ""),
        (a = a != null ? "" + La(a) : t),
        i || a === e.value || (e.value = a),
        (e.defaultValue = a));
    }
    ((l = l ?? u),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (e.checked = i ? e.checked : !!l),
      (e.defaultChecked = !!l),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (e.name = f),
      Mi(e));
  }
  function Ti(e, a, t) {
    (a === "number" && pd(e.ownerDocument) === e) ||
      e.defaultValue === "" + t ||
      (e.defaultValue = "" + t);
  }
  function nu(e, a, t, l) {
    if (((e = e.options), a)) {
      a = {};
      for (var u = 0; u < t.length; u++) a["$" + t[u]] = !0;
      for (t = 0; t < e.length; t++)
        ((u = a.hasOwnProperty("$" + e[t].value)),
          e[t].selected !== u && (e[t].selected = u),
          u && l && (e[t].defaultSelected = !0));
    } else {
      for (t = "" + La(t), a = null, u = 0; u < e.length; u++) {
        if (e[u].value === t) {
          ((e[u].selected = !0), l && (e[u].defaultSelected = !0));
          return;
        }
        a !== null || e[u].disabled || (a = e[u]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function fm(e, a, t) {
    if (
      a != null &&
      ((a = "" + La(a)), a !== e.value && (e.value = a), t == null)
    ) {
      e.defaultValue !== a && (e.defaultValue = a);
      return;
    }
    e.defaultValue = t != null ? "" + La(t) : "";
  }
  function dm(e, a, t, l) {
    if (a == null) {
      if (l != null) {
        if (t != null) throw Error(v(92));
        if (so(l)) {
          if (1 < l.length) throw Error(v(93));
          l = l[0];
        }
        t = l;
      }
      (t == null && (t = ""), (a = t));
    }
    ((t = La(a)),
      (e.defaultValue = t),
      (l = e.textContent),
      l === t && l !== "" && l !== null && (e.value = l),
      Mi(e));
  }
  function hu(e, a) {
    if (a) {
      var t = e.firstChild;
      if (t && t === e.lastChild && t.nodeType === 3) {
        t.nodeValue = a;
        return;
      }
    }
    e.textContent = a;
  }
  var cL = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function vc(e, a, t) {
    var l = a.indexOf("--") === 0;
    t == null || typeof t == "boolean" || t === ""
      ? l
        ? e.setProperty(a, "")
        : a === "float"
          ? (e.cssFloat = "")
          : (e[a] = "")
      : l
        ? e.setProperty(a, t)
        : typeof t != "number" || t === 0 || cL.has(a)
          ? a === "float"
            ? (e.cssFloat = t)
            : (e[a] = ("" + t).trim())
          : (e[a] = t + "px");
  }
  function nm(e, a, t) {
    if (a != null && typeof a != "object") throw Error(v(62));
    if (((e = e.style), t != null)) {
      for (var l in t)
        !t.hasOwnProperty(l) ||
          (a != null && a.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? e.setProperty(l, "")
            : l === "float"
              ? (e.cssFloat = "")
              : (e[l] = ""));
      for (var u in a)
        ((l = a[u]), a.hasOwnProperty(u) && t[u] !== l && vc(e, u, l));
    } else for (var o in a) a.hasOwnProperty(o) && vc(e, o, a[o]);
  }
  function Cr(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var pL = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    mL =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Qf(e) {
    return mL.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ut() {}
  var ki = null;
  function yr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Wl = null,
    iu = null;
  function Ic(e) {
    var a = Au(e);
    if (a && (e = a.stateNode)) {
      var t = e[We] || null;
      e: switch (((e = a.stateNode), a.type)) {
        case "input":
          if (
            (Di(
              e,
              t.value,
              t.defaultValue,
              t.defaultValue,
              t.checked,
              t.defaultChecked,
              t.type,
              t.name,
            ),
            (a = t.name),
            t.type === "radio" && a != null)
          ) {
            for (t = e; t.parentNode;) t = t.parentNode;
            for (
              t = t.querySelectorAll(
                'input[name="' + ba("" + a) + '"][type="radio"]',
              ),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a];
              if (l !== e && l.form === e.form) {
                var u = l[We] || null;
                if (!u) throw Error(v(90));
                Di(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (a = 0; a < t.length; a++)
              ((l = t[a]), l.form === e.form && um(l));
          }
          break e;
        case "textarea":
          fm(e, t.value, t.defaultValue);
          break e;
        case "select":
          ((a = t.value), a != null && nu(e, !!t.multiple, a, !1));
      }
    }
  }
  var Vn = !1;
  function im(e, a, t) {
    if (Vn) return e(a, t);
    Vn = !0;
    try {
      var l = e(a);
      return l;
    } finally {
      if (
        ((Vn = !1),
        (Wl !== null || iu !== null) &&
          (Kd(), Wl && ((a = Wl), (e = iu), (iu = Wl = null), Ic(a), e)))
      )
        for (a = 0; a < e.length; a++) Ic(e[a]);
    }
  }
  function To(e, a) {
    var t = e.stateNode;
    if (t === null) return null;
    var l = t[We] || null;
    if (l === null) return null;
    t = l[a];
    e: switch (a) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((l = !l.disabled) ||
          ((e = e.type),
          (l = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !l));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (t && typeof t != "function") throw Error(v(231, a, typeof t));
    return t;
  }
  var it = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    zi = !1;
  if (it)
    try {
      ((Vl = {}),
        Object.defineProperty(Vl, "passive", {
          get: function () {
            zi = !0;
          },
        }),
        window.addEventListener("test", Vl, Vl),
        window.removeEventListener("test", Vl, Vl));
    } catch {
      zi = !1;
    }
  var Vl,
    Dt = null,
    br = null,
    Kf = null;
  function rm() {
    if (Kf) return Kf;
    var e,
      a = br,
      t = a.length,
      l,
      u = "value" in Dt ? Dt.value : Dt.textContent,
      o = u.length;
    for (e = 0; e < t && a[e] === u[e]; e++);
    var f = t - e;
    for (l = 1; l <= f && a[t - l] === u[o - l]; l++);
    return (Kf = u.slice(e, 1 < l ? 1 - l : void 0));
  }
  function Jf(e) {
    var a = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && a === 13 && (e = 13))
        : (e = a),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Ef() {
    return !0;
  }
  function wc() {
    return !1;
  }
  function $e(e) {
    function a(t, l, u, o, f) {
      ((this._reactName = t),
        (this._targetInst = u),
        (this.type = l),
        (this.nativeEvent = o),
        (this.target = f),
        (this.currentTarget = null));
      for (var i in e)
        e.hasOwnProperty(i) && ((t = e[i]), (this[i] = t ? t(o) : o[i]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? Ef
          : wc),
        (this.isPropagationStopped = wc),
        this
      );
    }
    return (
      ce(a.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var t = this.nativeEvent;
          t &&
            (t.preventDefault
              ? t.preventDefault()
              : typeof t.returnValue != "unknown" && (t.returnValue = !1),
            (this.isDefaultPrevented = Ef));
        },
        stopPropagation: function () {
          var t = this.nativeEvent;
          t &&
            (t.stopPropagation
              ? t.stopPropagation()
              : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0),
            (this.isPropagationStopped = Ef));
        },
        persist: function () {},
        isPersistent: Ef,
      }),
      a
    );
  }
  var Cl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Nd = $e(Cl),
    jo = ce({}, Cl, { view: 0, detail: 0 }),
    gL = $e(jo),
    Xn,
    Yn,
    lo,
    Pd = ce({}, jo, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Sr,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== lo &&
              (lo && e.type === "mousemove"
                ? ((Xn = e.screenX - lo.screenX), (Yn = e.screenY - lo.screenY))
                : (Yn = Xn = 0),
              (lo = e)),
            Xn);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Yn;
      },
    }),
    Ac = $e(Pd),
    hL = ce({}, Pd, { dataTransfer: 0 }),
    xL = $e(hL),
    LL = ce({}, jo, { relatedTarget: 0 }),
    jn = $e(LL),
    CL = ce({}, Cl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    yL = $e(CL),
    bL = ce({}, Cl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    SL = $e(bL),
    vL = ce({}, Cl, { data: 0 }),
    Mc = $e(vL),
    IL = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    wL = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    AL = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function ML(e) {
    var a = this.nativeEvent;
    return a.getModifierState
      ? a.getModifierState(e)
      : (e = AL[e])
        ? !!a[e]
        : !1;
  }
  function Sr() {
    return ML;
  }
  var DL = ce({}, jo, {
      key: function (e) {
        if (e.key) {
          var a = IL[e.key] || e.key;
          if (a !== "Unidentified") return a;
        }
        return e.type === "keypress"
          ? ((e = Jf(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? wL[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Sr,
      charCode: function (e) {
        return e.type === "keypress" ? Jf(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Jf(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    TL = $e(DL),
    kL = ce({}, Pd, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Dc = $e(kL),
    zL = ce({}, jo, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Sr,
    }),
    BL = $e(zL),
    RL = ce({}, Cl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    OL = $e(RL),
    EL = ce({}, Pd, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    UL = $e(EL),
    qL = ce({}, Cl, { newState: 0, oldState: 0 }),
    HL = $e(qL),
    NL = [9, 13, 27, 32],
    vr = it && "CompositionEvent" in window,
    go = null;
  it && "documentMode" in document && (go = document.documentMode);
  var PL = it && "TextEvent" in window && !go,
    sm = it && (!vr || (go && 8 < go && 11 >= go)),
    Tc = " ",
    kc = !1;
  function cm(e, a) {
    switch (e) {
      case "keyup":
        return NL.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function pm(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var $l = !1;
  function FL(e, a) {
    switch (e) {
      case "compositionend":
        return pm(a);
      case "keypress":
        return a.which !== 32 ? null : ((kc = !0), Tc);
      case "textInput":
        return ((e = a.data), e === Tc && kc ? null : e);
      default:
        return null;
    }
  }
  function GL(e, a) {
    if ($l)
      return e === "compositionend" || (!vr && cm(e, a))
        ? ((e = rm()), (Kf = br = Dt = null), ($l = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || (a.ctrlKey && a.altKey)) {
          if (a.char && 1 < a.char.length) return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return sm && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var _L = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function zc(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a === "input" ? !!_L[e.type] : a === "textarea";
  }
  function mm(e, a, t, l) {
    (Wl ? (iu ? iu.push(l) : (iu = [l])) : (Wl = l),
      (a = zd(a, "onChange")),
      0 < a.length &&
        ((t = new Nd("onChange", "change", null, t, l)),
        e.push({ event: t, listeners: a })));
  }
  var ho = null,
    ko = null;
  function VL(e) {
    ih(e, 0);
  }
  function Fd(e) {
    var a = co(e);
    if (um(a)) return e;
  }
  function Bc(e, a) {
    if (e === "change") return a;
  }
  var gm = !1;
  it &&
    (it
      ? ((qf = "oninput" in document),
        qf ||
          ((Zn = document.createElement("div")),
          Zn.setAttribute("oninput", "return;"),
          (qf = typeof Zn.oninput == "function")),
        (Uf = qf))
      : (Uf = !1),
    (gm = Uf && (!document.documentMode || 9 < document.documentMode)));
  var Uf, qf, Zn;
  function Rc() {
    ho && (ho.detachEvent("onpropertychange", hm), (ko = ho = null));
  }
  function hm(e) {
    if (e.propertyName === "value" && Fd(ko)) {
      var a = [];
      (mm(a, ko, e, yr(e)), im(VL, a));
    }
  }
  function XL(e, a, t) {
    e === "focusin"
      ? (Rc(), (ho = a), (ko = t), ho.attachEvent("onpropertychange", hm))
      : e === "focusout" && Rc();
  }
  function YL(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fd(ko);
  }
  function jL(e, a) {
    if (e === "click") return Fd(a);
  }
  function ZL(e, a) {
    if (e === "input" || e === "change") return Fd(a);
  }
  function QL(e, a) {
    return (e === a && (e !== 0 || 1 / e === 1 / a)) || (e !== e && a !== a);
  }
  var ra = typeof Object.is == "function" ? Object.is : QL;
  function zo(e, a) {
    if (ra(e, a)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof a != "object" ||
      a === null
    )
      return !1;
    var t = Object.keys(e),
      l = Object.keys(a);
    if (t.length !== l.length) return !1;
    for (l = 0; l < t.length; l++) {
      var u = t[l];
      if (!wi.call(a, u) || !ra(e[u], a[u])) return !1;
    }
    return !0;
  }
  function Oc(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function Ec(e, a) {
    var t = Oc(e);
    e = 0;
    for (var l; t;) {
      if (t.nodeType === 3) {
        if (((l = e + t.textContent.length), e <= a && l >= a))
          return { node: t, offset: a - e };
        e = l;
      }
      e: {
        for (; t;) {
          if (t.nextSibling) {
            t = t.nextSibling;
            break e;
          }
          t = t.parentNode;
        }
        t = void 0;
      }
      t = Oc(t);
    }
  }
  function xm(e, a) {
    return e && a
      ? e === a
        ? !0
        : e && e.nodeType === 3
          ? !1
          : a && a.nodeType === 3
            ? xm(e, a.parentNode)
            : "contains" in e
              ? e.contains(a)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(a) & 16)
                : !1
      : !1;
  }
  function Lm(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var a = pd(e.document); a instanceof e.HTMLIFrameElement;) {
      try {
        var t = typeof a.contentWindow.location.href == "string";
      } catch {
        t = !1;
      }
      if (t) e = a.contentWindow;
      else break;
      a = pd(e.document);
    }
    return a;
  }
  function Ir(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      a &&
      ((a === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        a === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var KL = it && "documentMode" in document && 11 >= document.documentMode,
    eu = null,
    Bi = null,
    xo = null,
    Ri = !1;
  function Uc(e, a, t) {
    var l =
      t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
    Ri ||
      eu == null ||
      eu !== pd(l) ||
      ((l = eu),
      "selectionStart" in l && Ir(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (xo && zo(xo, l)) ||
        ((xo = l),
        (l = zd(Bi, "onSelect")),
        0 < l.length &&
          ((a = new Nd("onSelect", "select", null, a, t)),
          e.push({ event: a, listeners: l }),
          (a.target = eu))));
  }
  function ll(e, a) {
    var t = {};
    return (
      (t[e.toLowerCase()] = a.toLowerCase()),
      (t["Webkit" + e] = "webkit" + a),
      (t["Moz" + e] = "moz" + a),
      t
    );
  }
  var au = {
      animationend: ll("Animation", "AnimationEnd"),
      animationiteration: ll("Animation", "AnimationIteration"),
      animationstart: ll("Animation", "AnimationStart"),
      transitionrun: ll("Transition", "TransitionRun"),
      transitionstart: ll("Transition", "TransitionStart"),
      transitioncancel: ll("Transition", "TransitionCancel"),
      transitionend: ll("Transition", "TransitionEnd"),
    },
    Qn = {},
    Cm = {};
  it &&
    ((Cm = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete au.animationend.animation,
      delete au.animationiteration.animation,
      delete au.animationstart.animation),
    "TransitionEvent" in window || delete au.transitionend.transition);
  function yl(e) {
    if (Qn[e]) return Qn[e];
    if (!au[e]) return e;
    var a = au[e],
      t;
    for (t in a) if (a.hasOwnProperty(t) && t in Cm) return (Qn[e] = a[t]);
    return e;
  }
  var ym = yl("animationend"),
    bm = yl("animationiteration"),
    Sm = yl("animationstart"),
    JL = yl("transitionrun"),
    WL = yl("transitionstart"),
    $L = yl("transitioncancel"),
    vm = yl("transitionend"),
    Im = new Map(),
    Oi =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Oi.push("scrollEnd");
  function Ra(e, a) {
    (Im.set(e, a), Ll(a, [e]));
  }
  var md =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var a = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(a)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    xa = [],
    tu = 0,
    wr = 0;
  function Gd() {
    for (var e = tu, a = (wr = tu = 0); a < e;) {
      var t = xa[a];
      xa[a++] = null;
      var l = xa[a];
      xa[a++] = null;
      var u = xa[a];
      xa[a++] = null;
      var o = xa[a];
      if (((xa[a++] = null), l !== null && u !== null)) {
        var f = l.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)),
          (l.pending = u));
      }
      o !== 0 && wm(t, u, o);
    }
  }
  function _d(e, a, t, l) {
    ((xa[tu++] = e),
      (xa[tu++] = a),
      (xa[tu++] = t),
      (xa[tu++] = l),
      (wr |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l));
  }
  function Ar(e, a, t, l) {
    return (_d(e, a, t, l), gd(e));
  }
  function bl(e, a) {
    return (_d(e, null, null, a), gd(e));
  }
  function wm(e, a, t) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t);
    for (var u = !1, o = e.return; o !== null;)
      ((o.childLanes |= t),
        (l = o.alternate),
        l !== null && (l.childLanes |= t),
        o.tag === 22 &&
          ((e = o.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = o),
        (o = o.return));
    return e.tag === 3
      ? ((o = e.stateNode),
        u &&
          a !== null &&
          ((u = 31 - na(t)),
          (e = o.hiddenUpdates),
          (l = e[u]),
          l === null ? (e[u] = [a]) : l.push(a),
          (a.lane = t | 536870912)),
        o)
      : null;
  }
  function gd(e) {
    if (50 < Ao) throw ((Ao = 0), (ar = null), Error(v(185)));
    for (var a = e.return; a !== null;) ((e = a), (a = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var lu = {};
  function e0(e, a, t, l) {
    ((this.tag = e),
      (this.key = t),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = a),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ua(e, a, t, l) {
    return new e0(e, a, t, l);
  }
  function Mr(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function ft(e, a) {
    var t = e.alternate;
    return (
      t === null
        ? ((t = ua(e.tag, a, e.key, e.mode)),
          (t.elementType = e.elementType),
          (t.type = e.type),
          (t.stateNode = e.stateNode),
          (t.alternate = e),
          (e.alternate = t))
        : ((t.pendingProps = a),
          (t.type = e.type),
          (t.flags = 0),
          (t.subtreeFlags = 0),
          (t.deletions = null)),
      (t.flags = e.flags & 65011712),
      (t.childLanes = e.childLanes),
      (t.lanes = e.lanes),
      (t.child = e.child),
      (t.memoizedProps = e.memoizedProps),
      (t.memoizedState = e.memoizedState),
      (t.updateQueue = e.updateQueue),
      (a = e.dependencies),
      (t.dependencies =
        a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }),
      (t.sibling = e.sibling),
      (t.index = e.index),
      (t.ref = e.ref),
      (t.refCleanup = e.refCleanup),
      t
    );
  }
  function Am(e, a) {
    e.flags &= 65011714;
    var t = e.alternate;
    return (
      t === null
        ? ((e.childLanes = 0),
          (e.lanes = a),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = t.childLanes),
          (e.lanes = t.lanes),
          (e.child = t.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = t.memoizedProps),
          (e.memoizedState = t.memoizedState),
          (e.updateQueue = t.updateQueue),
          (e.type = t.type),
          (a = t.dependencies),
          (e.dependencies =
            a === null
              ? null
              : { lanes: a.lanes, firstContext: a.firstContext })),
      e
    );
  }
  function Wf(e, a, t, l, u, o) {
    var f = 0;
    if (((l = e), typeof e == "function")) Mr(e) && (f = 1);
    else if (typeof e == "string")
      f = l1(e, t, Pa.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case bi:
          return (
            (e = ua(31, t, a, u)),
            (e.elementType = bi),
            (e.lanes = o),
            e
          );
        case Ql:
          return il(t.children, u, o, a);
        case Xp:
          ((f = 8), (u |= 24));
          break;
        case Li:
          return (
            (e = ua(12, t, a, u | 2)),
            (e.elementType = Li),
            (e.lanes = o),
            e
          );
        case Ci:
          return (
            (e = ua(13, t, a, u)),
            (e.elementType = Ci),
            (e.lanes = o),
            e
          );
        case yi:
          return (
            (e = ua(19, t, a, u)),
            (e.elementType = yi),
            (e.lanes = o),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case lt:
                f = 10;
                break e;
              case Yp:
                f = 9;
                break e;
              case pr:
                f = 11;
                break e;
              case mr:
                f = 14;
                break e;
              case bt:
                ((f = 16), (l = null));
                break e;
            }
          ((f = 29),
            (t = Error(v(130, e === null ? "null" : typeof e, ""))),
            (l = null));
      }
    return (
      (a = ua(f, t, a, u)),
      (a.elementType = e),
      (a.type = l),
      (a.lanes = o),
      a
    );
  }
  function il(e, a, t, l) {
    return ((e = ua(7, e, l, a)), (e.lanes = t), e);
  }
  function Kn(e, a, t) {
    return ((e = ua(6, e, null, a)), (e.lanes = t), e);
  }
  function Mm(e) {
    var a = ua(18, null, null, 0);
    return ((a.stateNode = e), a);
  }
  function Jn(e, a, t) {
    return (
      (a = ua(4, e.children !== null ? e.children : [], e.key, a)),
      (a.lanes = t),
      (a.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      a
    );
  }
  var qc = new WeakMap();
  function Sa(e, a) {
    if (typeof e == "object" && e !== null) {
      var t = qc.get(e);
      return t !== void 0
        ? t
        : ((a = { value: e, source: a, stack: Lc(a) }), qc.set(e, a), a);
    }
    return { value: e, source: a, stack: Lc(a) };
  }
  var uu = [],
    ou = 0,
    hd = null,
    Bo = 0,
    Ca = [],
    ya = 0,
    Ft = null,
    qa = 1,
    Ha = "";
  function at(e, a) {
    ((uu[ou++] = Bo), (uu[ou++] = hd), (hd = e), (Bo = a));
  }
  function Dm(e, a, t) {
    ((Ca[ya++] = qa), (Ca[ya++] = Ha), (Ca[ya++] = Ft), (Ft = e));
    var l = qa;
    e = Ha;
    var u = 32 - na(l) - 1;
    ((l &= ~(1 << u)), (t += 1));
    var o = 32 - na(a) + u;
    if (30 < o) {
      var f = u - (u % 5);
      ((o = (l & ((1 << f) - 1)).toString(32)),
        (l >>= f),
        (u -= f),
        (qa = (1 << (32 - na(a) + u)) | (t << u) | l),
        (Ha = o + e));
    } else ((qa = (1 << o) | (t << u) | l), (Ha = e));
  }
  function Dr(e) {
    e.return !== null && (at(e, 1), Dm(e, 1, 0));
  }
  function Tr(e) {
    for (; e === hd;)
      ((hd = uu[--ou]), (uu[ou] = null), (Bo = uu[--ou]), (uu[ou] = null));
    for (; e === Ft;)
      ((Ft = Ca[--ya]),
        (Ca[ya] = null),
        (Ha = Ca[--ya]),
        (Ca[ya] = null),
        (qa = Ca[--ya]),
        (Ca[ya] = null));
  }
  function Tm(e, a) {
    ((Ca[ya++] = qa),
      (Ca[ya++] = Ha),
      (Ca[ya++] = Ft),
      (qa = a.id),
      (Ha = a.overflow),
      (Ft = e));
  }
  var Ne = null,
    se = null,
    Z = !1,
    Rt = null,
    va = !1,
    Ei = Error(v(519));
  function Gt(e) {
    var a = Error(
      v(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Ro(Sa(a, e)), Ei);
  }
  function Hc(e) {
    var a = e.stateNode,
      t = e.type,
      l = e.memoizedProps;
    switch (((a[He] = e), (a[We] = l), t)) {
      case "dialog":
        (V("cancel", a), V("close", a));
        break;
      case "iframe":
      case "object":
      case "embed":
        V("load", a);
        break;
      case "video":
      case "audio":
        for (t = 0; t < qo.length; t++) V(qo[t], a);
        break;
      case "source":
        V("error", a);
        break;
      case "img":
      case "image":
      case "link":
        (V("error", a), V("load", a));
        break;
      case "details":
        V("toggle", a);
        break;
      case "input":
        (V("invalid", a),
          om(
            a,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0,
          ));
        break;
      case "select":
        V("invalid", a);
        break;
      case "textarea":
        (V("invalid", a), dm(a, l.value, l.defaultValue, l.children));
    }
    ((t = l.children),
      (typeof t != "string" && typeof t != "number" && typeof t != "bigint") ||
      a.textContent === "" + t ||
      l.suppressHydrationWarning === !0 ||
      sh(a.textContent, t)
        ? (l.popover != null && (V("beforetoggle", a), V("toggle", a)),
          l.onScroll != null && V("scroll", a),
          l.onScrollEnd != null && V("scrollend", a),
          l.onClick != null && (a.onclick = ut),
          (a = !0))
        : (a = !1),
      a || Gt(e, !0));
  }
  function Nc(e) {
    for (Ne = e.return; Ne;)
      switch (Ne.tag) {
        case 5:
        case 31:
        case 13:
          va = !1;
          return;
        case 27:
        case 3:
          va = !0;
          return;
        default:
          Ne = Ne.return;
      }
  }
  function Xl(e) {
    if (e !== Ne) return !1;
    if (!Z) return (Nc(e), (Z = !0), !1);
    var a = e.tag,
      t;
    if (
      ((t = a !== 3 && a !== 27) &&
        ((t = a === 5) &&
          ((t = e.type),
          (t =
            !(t !== "form" && t !== "button") || fr(e.type, e.memoizedProps))),
        (t = !t)),
      t && se && Gt(e),
      Nc(e),
      a === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(v(317));
      se = Mp(e);
    } else if (a === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(v(317));
      se = Mp(e);
    } else
      a === 27
        ? ((a = se), Yt(e.type) ? ((e = rr), (rr = null), (se = e)) : (se = a))
        : (se = Ne ? wa(e.stateNode.nextSibling) : null);
    return !0;
  }
  function pl() {
    ((se = Ne = null), (Z = !1));
  }
  function Wn() {
    var e = Rt;
    return (
      e !== null &&
        (Ke === null ? (Ke = e) : Ke.push.apply(Ke, e), (Rt = null)),
      e
    );
  }
  function Ro(e) {
    Rt === null ? (Rt = [e]) : Rt.push(e);
  }
  var Ui = Fa(null),
    Sl = null,
    ot = null;
  function vt(e, a, t) {
    (de(Ui, a._currentValue), (a._currentValue = t));
  }
  function dt(e) {
    ((e._currentValue = Ui.current), Oe(Ui));
  }
  function qi(e, a, t) {
    for (; e !== null;) {
      var l = e.alternate;
      if (
        ((e.childLanes & a) !== a
          ? ((e.childLanes |= a), l !== null && (l.childLanes |= a))
          : l !== null && (l.childLanes & a) !== a && (l.childLanes |= a),
        e === t)
      )
        break;
      e = e.return;
    }
  }
  function Hi(e, a, t, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null;) {
      var o = u.dependencies;
      if (o !== null) {
        var f = u.child;
        o = o.firstContext;
        e: for (; o !== null;) {
          var i = o;
          o = u;
          for (var r = 0; r < a.length; r++)
            if (i.context === a[r]) {
              ((o.lanes |= t),
                (i = o.alternate),
                i !== null && (i.lanes |= t),
                qi(o.return, t, e),
                l || (f = null));
              break e;
            }
          o = i.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(v(341));
        ((f.lanes |= t),
          (o = f.alternate),
          o !== null && (o.lanes |= t),
          qi(f, t, e),
          (f = null));
      } else f = u.child;
      if (f !== null) f.return = u;
      else
        for (f = u; f !== null;) {
          if (f === e) {
            f = null;
            break;
          }
          if (((u = f.sibling), u !== null)) {
            ((u.return = f.return), (f = u));
            break;
          }
          f = f.return;
        }
      u = f;
    }
  }
  function Mu(e, a, t, l) {
    e = null;
    for (var u = a, o = !1; u !== null;) {
      if (!o) {
        if ((u.flags & 524288) !== 0) o = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var f = u.alternate;
        if (f === null) throw Error(v(387));
        if (((f = f.memoizedProps), f !== null)) {
          var i = u.type;
          ra(u.pendingProps.value, f.value) ||
            (e !== null ? e.push(i) : (e = [i]));
        }
      } else if (u === id.current) {
        if (((f = u.alternate), f === null)) throw Error(v(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push(No) : (e = [No]));
      }
      u = u.return;
    }
    (e !== null && Hi(a, e, t, l), (a.flags |= 262144));
  }
  function xd(e) {
    for (e = e.firstContext; e !== null;) {
      if (!ra(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function ml(e) {
    ((Sl = e),
      (ot = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function Pe(e) {
    return km(Sl, e);
  }
  function Hf(e, a) {
    return (Sl === null && ml(e), km(e, a));
  }
  function km(e, a) {
    var t = a._currentValue;
    if (((a = { context: a, memoizedValue: t, next: null }), ot === null)) {
      if (e === null) throw Error(v(308));
      ((ot = a),
        (e.dependencies = { lanes: 0, firstContext: a }),
        (e.flags |= 524288));
    } else ot = ot.next = a;
    return t;
  }
  var a0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              a = (this.signal = {
                aborted: !1,
                addEventListener: function (t, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              ((a.aborted = !0),
                e.forEach(function (t) {
                  return t();
                }));
            };
          },
    t0 = ze.unstable_scheduleCallback,
    l0 = ze.unstable_NormalPriority,
    we = {
      $$typeof: lt,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function kr() {
    return { controller: new a0(), data: new Map(), refCount: 0 };
  }
  function Zo(e) {
    (e.refCount--,
      e.refCount === 0 &&
        t0(l0, function () {
          e.controller.abort();
        }));
  }
  var Lo = null,
    Ni = 0,
    xu = 0,
    ru = null;
  function u0(e, a) {
    if (Lo === null) {
      var t = (Lo = []);
      ((Ni = 0),
        (xu = as()),
        (ru = {
          status: "pending",
          value: void 0,
          then: function (l) {
            t.push(l);
          },
        }));
    }
    return (Ni++, a.then(Pc, Pc), a);
  }
  function Pc() {
    if (--Ni === 0 && Lo !== null) {
      ru !== null && (ru.status = "fulfilled");
      var e = Lo;
      ((Lo = null), (xu = 0), (ru = null));
      for (var a = 0; a < e.length; a++) (0, e[a])();
    }
  }
  function o0(e, a) {
    var t = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          t.push(u);
        },
      };
    return (
      e.then(
        function () {
          ((l.status = "fulfilled"), (l.value = a));
          for (var u = 0; u < t.length; u++) (0, t[u])(a);
        },
        function (u) {
          for (l.status = "rejected", l.reason = u, u = 0; u < t.length; u++)
            (0, t[u])(void 0);
        },
      ),
      l
    );
  }
  var Fc = E.S;
  E.S = function (e, a) {
    ((Vg = fa()),
      typeof a == "object" &&
        a !== null &&
        typeof a.then == "function" &&
        u0(e, a),
      Fc !== null && Fc(e, a));
  };
  var rl = Fa(null);
  function zr() {
    var e = rl.current;
    return e !== null ? e : fe.pooledCache;
  }
  function $f(e, a) {
    a === null ? de(rl, rl.current) : de(rl, a.pool);
  }
  function zm() {
    var e = zr();
    return e === null ? null : { parent: we._currentValue, pool: e };
  }
  var Du = Error(v(460)),
    Br = Error(v(474)),
    Vd = Error(v(542)),
    Ld = { then: function () {} };
  function Gc(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Bm(e, a, t) {
    switch (
      ((t = e[t]),
      t === void 0 ? e.push(a) : t !== a && (a.then(ut, ut), (a = t)),
      a.status)
    ) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw ((e = a.reason), Vc(e), e);
      default:
        if (typeof a.status == "string") a.then(ut, ut);
        else {
          if (((e = fe), e !== null && 100 < e.shellSuspendCounter))
            throw Error(v(482));
          ((e = a),
            (e.status = "pending"),
            e.then(
              function (l) {
                if (a.status === "pending") {
                  var u = a;
                  ((u.status = "fulfilled"), (u.value = l));
                }
              },
              function (l) {
                if (a.status === "pending") {
                  var u = a;
                  ((u.status = "rejected"), (u.reason = l));
                }
              },
            ));
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw ((e = a.reason), Vc(e), e);
        }
        throw ((sl = a), Du);
    }
  }
  function fl(e) {
    try {
      var a = e._init;
      return a(e._payload);
    } catch (t) {
      throw t !== null && typeof t == "object" && typeof t.then == "function"
        ? ((sl = t), Du)
        : t;
    }
  }
  var sl = null;
  function _c() {
    if (sl === null) throw Error(v(459));
    var e = sl;
    return ((sl = null), e);
  }
  function Vc(e) {
    if (e === Du || e === Vd) throw Error(v(483));
  }
  var su = null,
    Oo = 0;
  function Nf(e) {
    var a = Oo;
    return ((Oo += 1), su === null && (su = []), Bm(su, e, a));
  }
  function uo(e, a) {
    ((a = a.props.ref), (e.ref = a !== void 0 ? a : null));
  }
  function Pf(e, a) {
    throw a.$$typeof === Xx
      ? Error(v(525))
      : ((e = Object.prototype.toString.call(a)),
        Error(
          v(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(a).join(", ") + "}"
              : e,
          ),
        ));
  }
  function Rm(e) {
    function a(p, c) {
      if (e) {
        var g = p.deletions;
        g === null ? ((p.deletions = [c]), (p.flags |= 16)) : g.push(c);
      }
    }
    function t(p, c) {
      if (!e) return null;
      for (; c !== null;) (a(p, c), (c = c.sibling));
      return null;
    }
    function l(p) {
      for (var c = new Map(); p !== null;)
        (p.key !== null ? c.set(p.key, p) : c.set(p.index, p), (p = p.sibling));
      return c;
    }
    function u(p, c) {
      return ((p = ft(p, c)), (p.index = 0), (p.sibling = null), p);
    }
    function o(p, c, g) {
      return (
        (p.index = g),
        e
          ? ((g = p.alternate),
            g !== null
              ? ((g = g.index), g < c ? ((p.flags |= 67108866), c) : g)
              : ((p.flags |= 67108866), c))
          : ((p.flags |= 1048576), c)
      );
    }
    function f(p) {
      return (e && p.alternate === null && (p.flags |= 67108866), p);
    }
    function i(p, c, g, S) {
      return c === null || c.tag !== 6
        ? ((c = Kn(g, p.mode, S)), (c.return = p), c)
        : ((c = u(c, g)), (c.return = p), c);
    }
    function r(p, c, g, S) {
      var w = g.type;
      return w === Ql
        ? C(p, c, g.props.children, S, g.key)
        : c !== null &&
            (c.elementType === w ||
              (typeof w == "object" &&
                w !== null &&
                w.$$typeof === bt &&
                fl(w) === c.type))
          ? ((c = u(c, g.props)), uo(c, g), (c.return = p), c)
          : ((c = Wf(g.type, g.key, g.props, null, p.mode, S)),
            uo(c, g),
            (c.return = p),
            c);
    }
    function m(p, c, g, S) {
      return c === null ||
        c.tag !== 4 ||
        c.stateNode.containerInfo !== g.containerInfo ||
        c.stateNode.implementation !== g.implementation
        ? ((c = Jn(g, p.mode, S)), (c.return = p), c)
        : ((c = u(c, g.children || [])), (c.return = p), c);
    }
    function C(p, c, g, S, w) {
      return c === null || c.tag !== 7
        ? ((c = il(g, p.mode, S, w)), (c.return = p), c)
        : ((c = u(c, g)), (c.return = p), c);
    }
    function b(p, c, g) {
      if (
        (typeof c == "string" && c !== "") ||
        typeof c == "number" ||
        typeof c == "bigint"
      )
        return ((c = Kn("" + c, p.mode, g)), (c.return = p), c);
      if (typeof c == "object" && c !== null) {
        switch (c.$$typeof) {
          case kf:
            return (
              (g = Wf(c.type, c.key, c.props, null, p.mode, g)),
              uo(g, c),
              (g.return = p),
              g
            );
          case ro:
            return ((c = Jn(c, p.mode, g)), (c.return = p), c);
          case bt:
            return ((c = fl(c)), b(p, c, g));
        }
        if (so(c) || to(c))
          return ((c = il(c, p.mode, g, null)), (c.return = p), c);
        if (typeof c.then == "function") return b(p, Nf(c), g);
        if (c.$$typeof === lt) return b(p, Hf(p, c), g);
        Pf(p, c);
      }
      return null;
    }
    function h(p, c, g, S) {
      var w = c !== null ? c.key : null;
      if (
        (typeof g == "string" && g !== "") ||
        typeof g == "number" ||
        typeof g == "bigint"
      )
        return w !== null ? null : i(p, c, "" + g, S);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case kf:
            return g.key === w ? r(p, c, g, S) : null;
          case ro:
            return g.key === w ? m(p, c, g, S) : null;
          case bt:
            return ((g = fl(g)), h(p, c, g, S));
        }
        if (so(g) || to(g)) return w !== null ? null : C(p, c, g, S, null);
        if (typeof g.then == "function") return h(p, c, Nf(g), S);
        if (g.$$typeof === lt) return h(p, c, Hf(p, g), S);
        Pf(p, g);
      }
      return null;
    }
    function x(p, c, g, S, w) {
      if (
        (typeof S == "string" && S !== "") ||
        typeof S == "number" ||
        typeof S == "bigint"
      )
        return ((p = p.get(g) || null), i(c, p, "" + S, w));
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case kf:
            return (
              (p = p.get(S.key === null ? g : S.key) || null),
              r(c, p, S, w)
            );
          case ro:
            return (
              (p = p.get(S.key === null ? g : S.key) || null),
              m(c, p, S, w)
            );
          case bt:
            return ((S = fl(S)), x(p, c, g, S, w));
        }
        if (so(S) || to(S))
          return ((p = p.get(g) || null), C(c, p, S, w, null));
        if (typeof S.then == "function") return x(p, c, g, Nf(S), w);
        if (S.$$typeof === lt) return x(p, c, g, Hf(c, S), w);
        Pf(c, S);
      }
      return null;
    }
    function D(p, c, g, S) {
      for (
        var w = null, H = null, T = c, B = (c = 0), O = null;
        T !== null && B < g.length;
        B++
      ) {
        T.index > B ? ((O = T), (T = null)) : (O = T.sibling);
        var G = h(p, T, g[B], S);
        if (G === null) {
          T === null && (T = O);
          break;
        }
        (e && T && G.alternate === null && a(p, T),
          (c = o(G, c, B)),
          H === null ? (w = G) : (H.sibling = G),
          (H = G),
          (T = O));
      }
      if (B === g.length) return (t(p, T), Z && at(p, B), w);
      if (T === null) {
        for (; B < g.length; B++)
          ((T = b(p, g[B], S)),
            T !== null &&
              ((c = o(T, c, B)),
              H === null ? (w = T) : (H.sibling = T),
              (H = T)));
        return (Z && at(p, B), w);
      }
      for (T = l(T); B < g.length; B++)
        ((O = x(T, p, B, g[B], S)),
          O !== null &&
            (e && O.alternate !== null && T.delete(O.key === null ? B : O.key),
            (c = o(O, c, B)),
            H === null ? (w = O) : (H.sibling = O),
            (H = O)));
      return (
        e &&
          T.forEach(function (Q) {
            return a(p, Q);
          }),
        Z && at(p, B),
        w
      );
    }
    function z(p, c, g, S) {
      if (g == null) throw Error(v(151));
      for (
        var w = null, H = null, T = c, B = (c = 0), O = null, G = g.next();
        T !== null && !G.done;
        B++, G = g.next()
      ) {
        T.index > B ? ((O = T), (T = null)) : (O = T.sibling);
        var Q = h(p, T, G.value, S);
        if (Q === null) {
          T === null && (T = O);
          break;
        }
        (e && T && Q.alternate === null && a(p, T),
          (c = o(Q, c, B)),
          H === null ? (w = Q) : (H.sibling = Q),
          (H = Q),
          (T = O));
      }
      if (G.done) return (t(p, T), Z && at(p, B), w);
      if (T === null) {
        for (; !G.done; B++, G = g.next())
          ((G = b(p, G.value, S)),
            G !== null &&
              ((c = o(G, c, B)),
              H === null ? (w = G) : (H.sibling = G),
              (H = G)));
        return (Z && at(p, B), w);
      }
      for (T = l(T); !G.done; B++, G = g.next())
        ((G = x(T, p, B, G.value, S)),
          G !== null &&
            (e && G.alternate !== null && T.delete(G.key === null ? B : G.key),
            (c = o(G, c, B)),
            H === null ? (w = G) : (H.sibling = G),
            (H = G)));
      return (
        e &&
          T.forEach(function (Fu) {
            return a(p, Fu);
          }),
        Z && at(p, B),
        w
      );
    }
    function P(p, c, g, S) {
      if (
        (typeof g == "object" &&
          g !== null &&
          g.type === Ql &&
          g.key === null &&
          (g = g.props.children),
        typeof g == "object" && g !== null)
      ) {
        switch (g.$$typeof) {
          case kf:
            e: {
              for (var w = g.key; c !== null;) {
                if (c.key === w) {
                  if (((w = g.type), w === Ql)) {
                    if (c.tag === 7) {
                      (t(p, c.sibling),
                        (S = u(c, g.props.children)),
                        (S.return = p),
                        (p = S));
                      break e;
                    }
                  } else if (
                    c.elementType === w ||
                    (typeof w == "object" &&
                      w !== null &&
                      w.$$typeof === bt &&
                      fl(w) === c.type)
                  ) {
                    (t(p, c.sibling),
                      (S = u(c, g.props)),
                      uo(S, g),
                      (S.return = p),
                      (p = S));
                    break e;
                  }
                  t(p, c);
                  break;
                } else a(p, c);
                c = c.sibling;
              }
              g.type === Ql
                ? ((S = il(g.props.children, p.mode, S, g.key)),
                  (S.return = p),
                  (p = S))
                : ((S = Wf(g.type, g.key, g.props, null, p.mode, S)),
                  uo(S, g),
                  (S.return = p),
                  (p = S));
            }
            return f(p);
          case ro:
            e: {
              for (w = g.key; c !== null;) {
                if (c.key === w)
                  if (
                    c.tag === 4 &&
                    c.stateNode.containerInfo === g.containerInfo &&
                    c.stateNode.implementation === g.implementation
                  ) {
                    (t(p, c.sibling),
                      (S = u(c, g.children || [])),
                      (S.return = p),
                      (p = S));
                    break e;
                  } else {
                    t(p, c);
                    break;
                  }
                else a(p, c);
                c = c.sibling;
              }
              ((S = Jn(g, p.mode, S)), (S.return = p), (p = S));
            }
            return f(p);
          case bt:
            return ((g = fl(g)), P(p, c, g, S));
        }
        if (so(g)) return D(p, c, g, S);
        if (to(g)) {
          if (((w = to(g)), typeof w != "function")) throw Error(v(150));
          return ((g = w.call(g)), z(p, c, g, S));
        }
        if (typeof g.then == "function") return P(p, c, Nf(g), S);
        if (g.$$typeof === lt) return P(p, c, Hf(p, g), S);
        Pf(p, g);
      }
      return (typeof g == "string" && g !== "") ||
        typeof g == "number" ||
        typeof g == "bigint"
        ? ((g = "" + g),
          c !== null && c.tag === 6
            ? (t(p, c.sibling), (S = u(c, g)), (S.return = p), (p = S))
            : (t(p, c), (S = Kn(g, p.mode, S)), (S.return = p), (p = S)),
          f(p))
        : t(p, c);
    }
    return function (p, c, g, S) {
      try {
        Oo = 0;
        var w = P(p, c, g, S);
        return ((su = null), w);
      } catch (T) {
        if (T === Du || T === Vd) throw T;
        var H = ua(29, T, null, p.mode);
        return ((H.lanes = S), (H.return = p), H);
      }
    };
  }
  var gl = Rm(!0),
    Om = Rm(!1),
    St = !1;
  function Rr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Pi(e, a) {
    ((e = e.updateQueue),
      a.updateQueue === e &&
        (a.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function Ot(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Et(e, a, t) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (K & 2) !== 0)) {
      var u = l.pending;
      return (
        u === null ? (a.next = a) : ((a.next = u.next), (u.next = a)),
        (l.pending = a),
        (a = gd(e)),
        wm(e, null, t),
        a
      );
    }
    return (_d(e, l, a, t), gd(e));
  }
  function Co(e, a, t) {
    if (
      ((a = a.updateQueue), a !== null && ((a = a.shared), (t & 4194048) !== 0))
    ) {
      var l = a.lanes;
      ((l &= e.pendingLanes), (t |= l), (a.lanes = t), Wp(e, t));
    }
  }
  function $n(e, a) {
    var t = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), t === l)) {
      var u = null,
        o = null;
      if (((t = t.firstBaseUpdate), t !== null)) {
        do {
          var f = {
            lane: t.lane,
            tag: t.tag,
            payload: t.payload,
            callback: null,
            next: null,
          };
          (o === null ? (u = o = f) : (o = o.next = f), (t = t.next));
        } while (t !== null);
        o === null ? (u = o = a) : (o = o.next = a);
      } else u = o = a;
      ((t = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: o,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = t));
      return;
    }
    ((e = t.lastBaseUpdate),
      e === null ? (t.firstBaseUpdate = a) : (e.next = a),
      (t.lastBaseUpdate = a));
  }
  var Fi = !1;
  function yo() {
    if (Fi) {
      var e = ru;
      if (e !== null) throw e;
    }
  }
  function bo(e, a, t, l) {
    Fi = !1;
    var u = e.updateQueue;
    St = !1;
    var o = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var r = i,
        m = r.next;
      ((r.next = null), f === null ? (o = m) : (f.next = m), (f = r));
      var C = e.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (i = C.lastBaseUpdate),
        i !== f &&
          (i === null ? (C.firstBaseUpdate = m) : (i.next = m),
          (C.lastBaseUpdate = r)));
    }
    if (o !== null) {
      var b = u.baseState;
      ((f = 0), (C = m = r = null), (i = o));
      do {
        var h = i.lane & -536870913,
          x = h !== i.lane;
        if (x ? (j & h) === h : (l & h) === h) {
          (h !== 0 && h === xu && (Fi = !0),
            C !== null &&
              (C = C.next =
                {
                  lane: 0,
                  tag: i.tag,
                  payload: i.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var D = e,
              z = i;
            h = a;
            var P = t;
            switch (z.tag) {
              case 1:
                if (((D = z.payload), typeof D == "function")) {
                  b = D.call(P, b, h);
                  break e;
                }
                b = D;
                break e;
              case 3:
                D.flags = (D.flags & -65537) | 128;
              case 0:
                if (
                  ((D = z.payload),
                  (h = typeof D == "function" ? D.call(P, b, h) : D),
                  h == null)
                )
                  break e;
                b = ce({}, b, h);
                break e;
              case 2:
                St = !0;
            }
          }
          ((h = i.callback),
            h !== null &&
              ((e.flags |= 64),
              x && (e.flags |= 8192),
              (x = u.callbacks),
              x === null ? (u.callbacks = [h]) : x.push(h)));
        } else
          ((x = {
            lane: h,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }),
            C === null ? ((m = C = x), (r = b)) : (C = C.next = x),
            (f |= h));
        if (((i = i.next), i === null)) {
          if (((i = u.shared.pending), i === null)) break;
          ((x = i),
            (i = x.next),
            (x.next = null),
            (u.lastBaseUpdate = x),
            (u.shared.pending = null));
        }
      } while (!0);
      (C === null && (r = b),
        (u.baseState = r),
        (u.firstBaseUpdate = m),
        (u.lastBaseUpdate = C),
        o === null && (u.shared.lanes = 0),
        (Vt |= f),
        (e.lanes = f),
        (e.memoizedState = b));
    }
  }
  function Em(e, a) {
    if (typeof e != "function") throw Error(v(191, e));
    e.call(a);
  }
  function Um(e, a) {
    var t = e.callbacks;
    if (t !== null)
      for (e.callbacks = null, e = 0; e < t.length; e++) Em(t[e], a);
  }
  var Lu = Fa(null),
    Cd = Fa(0);
  function Xc(e, a) {
    ((e = pt), de(Cd, e), de(Lu, a), (pt = e | a.baseLanes));
  }
  function Gi() {
    (de(Cd, pt), de(Lu, Lu.current));
  }
  function Or() {
    ((pt = Cd.current), Oe(Lu), Oe(Cd));
  }
  var sa = Fa(null),
    Ia = null;
  function It(e) {
    var a = e.alternate;
    (de(ye, ye.current & 1),
      de(sa, e),
      Ia === null &&
        (a === null || Lu.current !== null || a.memoizedState !== null) &&
        (Ia = e));
  }
  function _i(e) {
    (de(ye, ye.current), de(sa, e), Ia === null && (Ia = e));
  }
  function qm(e) {
    e.tag === 22
      ? (de(ye, ye.current), de(sa, e), Ia === null && (Ia = e))
      : wt(e);
  }
  function wt() {
    (de(ye, ye.current), de(sa, sa.current));
  }
  function la(e) {
    (Oe(sa), Ia === e && (Ia = null), Oe(ye));
  }
  var ye = Fa(0);
  function yd(e) {
    for (var a = e; a !== null;) {
      if (a.tag === 13) {
        var t = a.memoizedState;
        if (t !== null && ((t = t.dehydrated), t === null || nr(t) || ir(t)))
          return a;
      } else if (
        a.tag === 19 &&
        (a.memoizedProps.revealOrder === "forwards" ||
          a.memoizedProps.revealOrder === "backwards" ||
          a.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          a.memoizedProps.revealOrder === "together")
      ) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        ((a.child.return = a), (a = a.child));
        continue;
      }
      if (a === e) break;
      for (; a.sibling === null;) {
        if (a.return === null || a.return === e) return null;
        a = a.return;
      }
      ((a.sibling.return = a.return), (a = a.sibling));
    }
    return null;
  }
  var rt = 0,
    N = null,
    le = null,
    ve = null,
    bd = !1,
    cu = !1,
    hl = !1,
    Sd = 0,
    Eo = 0,
    pu = null,
    f0 = 0;
  function Le() {
    throw Error(v(321));
  }
  function Er(e, a) {
    if (a === null) return !1;
    for (var t = 0; t < a.length && t < e.length; t++)
      if (!ra(e[t], a[t])) return !1;
    return !0;
  }
  function Ur(e, a, t, l, u, o) {
    return (
      (rt = o),
      (N = a),
      (a.memoizedState = null),
      (a.updateQueue = null),
      (a.lanes = 0),
      (E.H = e === null || e.memoizedState === null ? mg : jr),
      (hl = !1),
      (o = t(l, u)),
      (hl = !1),
      cu && (o = Nm(a, t, l, u)),
      Hm(e),
      o
    );
  }
  function Hm(e) {
    E.H = Uo;
    var a = le !== null && le.next !== null;
    if (((rt = 0), (ve = le = N = null), (bd = !1), (Eo = 0), (pu = null), a))
      throw Error(v(300));
    e === null ||
      Ae ||
      ((e = e.dependencies), e !== null && xd(e) && (Ae = !0));
  }
  function Nm(e, a, t, l) {
    N = e;
    var u = 0;
    do {
      if ((cu && (pu = null), (Eo = 0), (cu = !1), 25 <= u))
        throw Error(v(301));
      if (((u += 1), (ve = le = null), e.updateQueue != null)) {
        var o = e.updateQueue;
        ((o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0));
      }
      ((E.H = gg), (o = a(t, l)));
    } while (cu);
    return o;
  }
  function d0() {
    var e = E.H,
      a = e.useState()[0];
    return (
      (a = typeof a.then == "function" ? Qo(a) : a),
      (e = e.useState()[0]),
      (le !== null ? le.memoizedState : null) !== e && (N.flags |= 1024),
      a
    );
  }
  function qr() {
    var e = Sd !== 0;
    return ((Sd = 0), e);
  }
  function Hr(e, a, t) {
    ((a.updateQueue = e.updateQueue), (a.flags &= -2053), (e.lanes &= ~t));
  }
  function Nr(e) {
    if (bd) {
      for (e = e.memoizedState; e !== null;) {
        var a = e.queue;
        (a !== null && (a.pending = null), (e = e.next));
      }
      bd = !1;
    }
    ((rt = 0), (ve = le = N = null), (cu = !1), (Eo = Sd = 0), (pu = null));
  }
  function Xe() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (ve === null ? (N.memoizedState = ve = e) : (ve = ve.next = e), ve);
  }
  function be() {
    if (le === null) {
      var e = N.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = le.next;
    var a = ve === null ? N.memoizedState : ve.next;
    if (a !== null) ((ve = a), (le = e));
    else {
      if (e === null)
        throw N.alternate === null ? Error(v(467)) : Error(v(310));
      ((le = e),
        (e = {
          memoizedState: le.memoizedState,
          baseState: le.baseState,
          baseQueue: le.baseQueue,
          queue: le.queue,
          next: null,
        }),
        ve === null ? (N.memoizedState = ve = e) : (ve = ve.next = e));
    }
    return ve;
  }
  function Xd() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Qo(e) {
    var a = Eo;
    return (
      (Eo += 1),
      pu === null && (pu = []),
      (e = Bm(pu, e, a)),
      (a = N),
      (ve === null ? a.memoizedState : ve.next) === null &&
        ((a = a.alternate),
        (E.H = a === null || a.memoizedState === null ? mg : jr)),
      e
    );
  }
  function Yd(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Qo(e);
      if (e.$$typeof === lt) return Pe(e);
    }
    throw Error(v(438, String(e)));
  }
  function Pr(e) {
    var a = null,
      t = N.updateQueue;
    if ((t !== null && (a = t.memoCache), a == null)) {
      var l = N.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (a = {
              data: l.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (a == null && (a = { data: [], index: 0 }),
      t === null && ((t = Xd()), (N.updateQueue = t)),
      (t.memoCache = a),
      (t = a.data[a.index]),
      t === void 0)
    )
      for (t = a.data[a.index] = Array(e), l = 0; l < e; l++) t[l] = Yx;
    return (a.index++, t);
  }
  function st(e, a) {
    return typeof a == "function" ? a(e) : a;
  }
  function ed(e) {
    var a = be();
    return Fr(a, le, e);
  }
  function Fr(e, a, t) {
    var l = e.queue;
    if (l === null) throw Error(v(311));
    l.lastRenderedReducer = t;
    var u = e.baseQueue,
      o = l.pending;
    if (o !== null) {
      if (u !== null) {
        var f = u.next;
        ((u.next = o.next), (o.next = f));
      }
      ((a.baseQueue = u = o), (l.pending = null));
    }
    if (((o = e.baseState), u === null)) e.memoizedState = o;
    else {
      a = u.next;
      var i = (f = null),
        r = null,
        m = a,
        C = !1;
      do {
        var b = m.lane & -536870913;
        if (b !== m.lane ? (j & b) === b : (rt & b) === b) {
          var h = m.revertLane;
          if (h === 0)
            (r !== null &&
              (r = r.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: m.action,
                  hasEagerState: m.hasEagerState,
                  eagerState: m.eagerState,
                  next: null,
                }),
              b === xu && (C = !0));
          else if ((rt & h) === h) {
            ((m = m.next), h === xu && (C = !0));
            continue;
          } else
            ((b = {
              lane: 0,
              revertLane: m.revertLane,
              gesture: null,
              action: m.action,
              hasEagerState: m.hasEagerState,
              eagerState: m.eagerState,
              next: null,
            }),
              r === null ? ((i = r = b), (f = o)) : (r = r.next = b),
              (N.lanes |= h),
              (Vt |= h));
          ((b = m.action),
            hl && t(o, b),
            (o = m.hasEagerState ? m.eagerState : t(o, b)));
        } else
          ((h = {
            lane: b,
            revertLane: m.revertLane,
            gesture: m.gesture,
            action: m.action,
            hasEagerState: m.hasEagerState,
            eagerState: m.eagerState,
            next: null,
          }),
            r === null ? ((i = r = h), (f = o)) : (r = r.next = h),
            (N.lanes |= b),
            (Vt |= b));
        m = m.next;
      } while (m !== null && m !== a);
      if (
        (r === null ? (f = o) : (r.next = i),
        !ra(o, e.memoizedState) && ((Ae = !0), C && ((t = ru), t !== null)))
      )
        throw t;
      ((e.memoizedState = o),
        (e.baseState = f),
        (e.baseQueue = r),
        (l.lastRenderedState = o));
    }
    return (u === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
  }
  function ei(e) {
    var a = be(),
      t = a.queue;
    if (t === null) throw Error(v(311));
    t.lastRenderedReducer = e;
    var l = t.dispatch,
      u = t.pending,
      o = a.memoizedState;
    if (u !== null) {
      t.pending = null;
      var f = (u = u.next);
      do ((o = e(o, f.action)), (f = f.next));
      while (f !== u);
      (ra(o, a.memoizedState) || (Ae = !0),
        (a.memoizedState = o),
        a.baseQueue === null && (a.baseState = o),
        (t.lastRenderedState = o));
    }
    return [o, l];
  }
  function Pm(e, a, t) {
    var l = N,
      u = be(),
      o = Z;
    if (o) {
      if (t === void 0) throw Error(v(407));
      t = t();
    } else t = a();
    var f = !ra((le || u).memoizedState, t);
    if (
      (f && ((u.memoizedState = t), (Ae = !0)),
      (u = u.queue),
      Gr(_m.bind(null, l, u, e), [e]),
      u.getSnapshot !== a || f || (ve !== null && ve.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        Cu(9, { destroy: void 0 }, Gm.bind(null, l, u, t, a), null),
        fe === null)
      )
        throw Error(v(349));
      o || (rt & 127) !== 0 || Fm(l, a, t);
    }
    return t;
  }
  function Fm(e, a, t) {
    ((e.flags |= 16384),
      (e = { getSnapshot: a, value: t }),
      (a = N.updateQueue),
      a === null
        ? ((a = Xd()), (N.updateQueue = a), (a.stores = [e]))
        : ((t = a.stores), t === null ? (a.stores = [e]) : t.push(e)));
  }
  function Gm(e, a, t, l) {
    ((a.value = t), (a.getSnapshot = l), Vm(a) && Xm(e));
  }
  function _m(e, a, t) {
    return t(function () {
      Vm(a) && Xm(e);
    });
  }
  function Vm(e) {
    var a = e.getSnapshot;
    e = e.value;
    try {
      var t = a();
      return !ra(e, t);
    } catch {
      return !0;
    }
  }
  function Xm(e) {
    var a = bl(e, 2);
    a !== null && Je(a, e, 2);
  }
  function Vi(e) {
    var a = Xe();
    if (typeof e == "function") {
      var t = e;
      if (((e = t()), hl)) {
        Mt(!0);
        try {
          t();
        } finally {
          Mt(!1);
        }
      }
    }
    return (
      (a.memoizedState = a.baseState = e),
      (a.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: st,
        lastRenderedState: e,
      }),
      a
    );
  }
  function Ym(e, a, t, l) {
    return ((e.baseState = t), Fr(e, le, typeof l == "function" ? l : st));
  }
  function n0(e, a, t, l, u) {
    if (Zd(e)) throw Error(v(485));
    if (((e = a.action), e !== null)) {
      var o = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          o.listeners.push(f);
        },
      };
      (E.T !== null ? t(!0) : (o.isTransition = !1),
        l(o),
        (t = a.pending),
        t === null
          ? ((o.next = a.pending = o), jm(a, o))
          : ((o.next = t.next), (a.pending = t.next = o)));
    }
  }
  function jm(e, a) {
    var t = a.action,
      l = a.payload,
      u = e.state;
    if (a.isTransition) {
      var o = E.T,
        f = {};
      E.T = f;
      try {
        var i = t(u, l),
          r = E.S;
        (r !== null && r(f, i), Yc(e, a, i));
      } catch (m) {
        Xi(e, a, m);
      } finally {
        (o !== null && f.types !== null && (o.types = f.types), (E.T = o));
      }
    } else
      try {
        ((o = t(u, l)), Yc(e, a, o));
      } catch (m) {
        Xi(e, a, m);
      }
  }
  function Yc(e, a, t) {
    t !== null && typeof t == "object" && typeof t.then == "function"
      ? t.then(
          function (l) {
            jc(e, a, l);
          },
          function (l) {
            return Xi(e, a, l);
          },
        )
      : jc(e, a, t);
  }
  function jc(e, a, t) {
    ((a.status = "fulfilled"),
      (a.value = t),
      Zm(a),
      (e.state = t),
      (a = e.pending),
      a !== null &&
        ((t = a.next),
        t === a ? (e.pending = null) : ((t = t.next), (a.next = t), jm(e, t))));
  }
  function Xi(e, a, t) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do ((a.status = "rejected"), (a.reason = t), Zm(a), (a = a.next));
      while (a !== l);
    }
    e.action = null;
  }
  function Zm(e) {
    e = e.listeners;
    for (var a = 0; a < e.length; a++) (0, e[a])();
  }
  function Qm(e, a) {
    return a;
  }
  function Zc(e, a) {
    if (Z) {
      var t = fe.formState;
      if (t !== null) {
        e: {
          var l = N;
          if (Z) {
            if (se) {
              a: {
                for (var u = se, o = va; u.nodeType !== 8;) {
                  if (!o) {
                    u = null;
                    break a;
                  }
                  if (((u = wa(u.nextSibling)), u === null)) {
                    u = null;
                    break a;
                  }
                }
                ((o = u.data), (u = o === "F!" || o === "F" ? u : null));
              }
              if (u) {
                ((se = wa(u.nextSibling)), (l = u.data === "F!"));
                break e;
              }
            }
            Gt(l);
          }
          l = !1;
        }
        l && (a = t[0]);
      }
    }
    return (
      (t = Xe()),
      (t.memoizedState = t.baseState = a),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qm,
        lastRenderedState: a,
      }),
      (t.queue = l),
      (t = sg.bind(null, N, l)),
      (l.dispatch = t),
      (l = Vi(!1)),
      (o = Yr.bind(null, N, !1, l.queue)),
      (l = Xe()),
      (u = { state: a, dispatch: null, action: e, pending: null }),
      (l.queue = u),
      (t = n0.bind(null, N, u, o, t)),
      (u.dispatch = t),
      (l.memoizedState = e),
      [a, t, !1]
    );
  }
  function Qc(e) {
    var a = be();
    return Km(a, le, e);
  }
  function Km(e, a, t) {
    if (
      ((a = Fr(e, a, Qm)[0]),
      (e = ed(st)[0]),
      typeof a == "object" && a !== null && typeof a.then == "function")
    )
      try {
        var l = Qo(a);
      } catch (f) {
        throw f === Du ? Vd : f;
      }
    else l = a;
    a = be();
    var u = a.queue,
      o = u.dispatch;
    return (
      t !== a.memoizedState &&
        ((N.flags |= 2048),
        Cu(9, { destroy: void 0 }, i0.bind(null, u, t), null)),
      [l, o, e]
    );
  }
  function i0(e, a) {
    e.action = a;
  }
  function Kc(e) {
    var a = be(),
      t = le;
    if (t !== null) return Km(a, t, e);
    (be(), (a = a.memoizedState), (t = be()));
    var l = t.queue.dispatch;
    return ((t.memoizedState = e), [a, l, !1]);
  }
  function Cu(e, a, t, l) {
    return (
      (e = { tag: e, create: t, deps: l, inst: a, next: null }),
      (a = N.updateQueue),
      a === null && ((a = Xd()), (N.updateQueue = a)),
      (t = a.lastEffect),
      t === null
        ? (a.lastEffect = e.next = e)
        : ((l = t.next), (t.next = e), (e.next = l), (a.lastEffect = e)),
      e
    );
  }
  function Jm() {
    return be().memoizedState;
  }
  function ad(e, a, t, l) {
    var u = Xe();
    ((N.flags |= e),
      (u.memoizedState = Cu(
        1 | a,
        { destroy: void 0 },
        t,
        l === void 0 ? null : l,
      )));
  }
  function jd(e, a, t, l) {
    var u = be();
    l = l === void 0 ? null : l;
    var o = u.memoizedState.inst;
    le !== null && l !== null && Er(l, le.memoizedState.deps)
      ? (u.memoizedState = Cu(a, o, t, l))
      : ((N.flags |= e), (u.memoizedState = Cu(1 | a, o, t, l)));
  }
  function Jc(e, a) {
    ad(8390656, 8, e, a);
  }
  function Gr(e, a) {
    jd(2048, 8, e, a);
  }
  function r0(e) {
    N.flags |= 4;
    var a = N.updateQueue;
    if (a === null) ((a = Xd()), (N.updateQueue = a), (a.events = [e]));
    else {
      var t = a.events;
      t === null ? (a.events = [e]) : t.push(e);
    }
  }
  function Wm(e) {
    var a = be().memoizedState;
    return (
      r0({ ref: a, nextImpl: e }),
      function () {
        if ((K & 2) !== 0) throw Error(v(440));
        return a.impl.apply(void 0, arguments);
      }
    );
  }
  function $m(e, a) {
    return jd(4, 2, e, a);
  }
  function eg(e, a) {
    return jd(4, 4, e, a);
  }
  function ag(e, a) {
    if (typeof a == "function") {
      e = e();
      var t = a(e);
      return function () {
        typeof t == "function" ? t() : a(null);
      };
    }
    if (a != null)
      return (
        (e = e()),
        (a.current = e),
        function () {
          a.current = null;
        }
      );
  }
  function tg(e, a, t) {
    ((t = t != null ? t.concat([e]) : null), jd(4, 4, ag.bind(null, a, e), t));
  }
  function _r() {}
  function lg(e, a) {
    var t = be();
    a = a === void 0 ? null : a;
    var l = t.memoizedState;
    return a !== null && Er(a, l[1]) ? l[0] : ((t.memoizedState = [e, a]), e);
  }
  function ug(e, a) {
    var t = be();
    a = a === void 0 ? null : a;
    var l = t.memoizedState;
    if (a !== null && Er(a, l[1])) return l[0];
    if (((l = e()), hl)) {
      Mt(!0);
      try {
        e();
      } finally {
        Mt(!1);
      }
    }
    return ((t.memoizedState = [l, a]), l);
  }
  function Vr(e, a, t) {
    return t === void 0 || ((rt & 1073741824) !== 0 && (j & 261930) === 0)
      ? (e.memoizedState = a)
      : ((e.memoizedState = t), (e = Yg()), (N.lanes |= e), (Vt |= e), t);
  }
  function og(e, a, t, l) {
    return ra(t, a)
      ? t
      : Lu.current !== null
        ? ((e = Vr(e, t, l)), ra(e, a) || (Ae = !0), e)
        : (rt & 42) === 0 || ((rt & 1073741824) !== 0 && (j & 261930) === 0)
          ? ((Ae = !0), (e.memoizedState = t))
          : ((e = Yg()), (N.lanes |= e), (Vt |= e), a);
  }
  function fg(e, a, t, l, u) {
    var o = J.p;
    J.p = o !== 0 && 8 > o ? o : 8;
    var f = E.T,
      i = {};
    ((E.T = i), Yr(e, !1, a, t));
    try {
      var r = u(),
        m = E.S;
      if (
        (m !== null && m(i, r),
        r !== null && typeof r == "object" && typeof r.then == "function")
      ) {
        var C = o0(r, l);
        So(e, a, C, ia(e));
      } else So(e, a, l, ia(e));
    } catch (b) {
      So(e, a, { then: function () {}, status: "rejected", reason: b }, ia());
    } finally {
      ((J.p = o),
        f !== null && i.types !== null && (f.types = i.types),
        (E.T = f));
    }
  }
  function s0() {}
  function Yi(e, a, t, l) {
    if (e.tag !== 5) throw Error(v(476));
    var u = dg(e).queue;
    fg(
      e,
      u,
      a,
      nl,
      t === null
        ? s0
        : function () {
            return (ng(e), t(l));
          },
    );
  }
  function dg(e) {
    var a = e.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: nl,
      baseState: nl,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: st,
        lastRenderedState: nl,
      },
      next: null,
    };
    var t = {};
    return (
      (a.next = {
        memoizedState: t,
        baseState: t,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: st,
          lastRenderedState: t,
        },
        next: null,
      }),
      (e.memoizedState = a),
      (e = e.alternate),
      e !== null && (e.memoizedState = a),
      a
    );
  }
  function ng(e) {
    var a = dg(e);
    (a.next === null && (a = e.alternate.memoizedState),
      So(e, a.next.queue, {}, ia()));
  }
  function Xr() {
    return Pe(No);
  }
  function ig() {
    return be().memoizedState;
  }
  function rg() {
    return be().memoizedState;
  }
  function c0(e) {
    for (var a = e.return; a !== null;) {
      switch (a.tag) {
        case 24:
        case 3:
          var t = ia();
          e = Ot(t);
          var l = Et(a, e, t);
          (l !== null && (Je(l, a, t), Co(l, a, t)),
            (a = { cache: kr() }),
            (e.payload = a));
          return;
      }
      a = a.return;
    }
  }
  function p0(e, a, t) {
    var l = ia();
    ((t = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Zd(e)
        ? cg(a, t)
        : ((t = Ar(e, a, t, l)), t !== null && (Je(t, e, l), pg(t, a, l))));
  }
  function sg(e, a, t) {
    var l = ia();
    So(e, a, t, l);
  }
  function So(e, a, t, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Zd(e)) cg(a, u);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = a.lastRenderedReducer), o !== null)
      )
        try {
          var f = a.lastRenderedState,
            i = o(f, t);
          if (((u.hasEagerState = !0), (u.eagerState = i), ra(i, f)))
            return (_d(e, a, u, 0), fe === null && Gd(), !1);
        } catch {}
      if (((t = Ar(e, a, u, l)), t !== null))
        return (Je(t, e, l), pg(t, a, l), !0);
    }
    return !1;
  }
  function Yr(e, a, t, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: as(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Zd(e))
    ) {
      if (a) throw Error(v(479));
    } else ((a = Ar(e, t, l, 2)), a !== null && Je(a, e, 2));
  }
  function Zd(e) {
    var a = e.alternate;
    return e === N || (a !== null && a === N);
  }
  function cg(e, a) {
    cu = bd = !0;
    var t = e.pending;
    (t === null ? (a.next = a) : ((a.next = t.next), (t.next = a)),
      (e.pending = a));
  }
  function pg(e, a, t) {
    if ((t & 4194048) !== 0) {
      var l = a.lanes;
      ((l &= e.pendingLanes), (t |= l), (a.lanes = t), Wp(e, t));
    }
  }
  var Uo = {
    readContext: Pe,
    use: Yd,
    useCallback: Le,
    useContext: Le,
    useEffect: Le,
    useImperativeHandle: Le,
    useLayoutEffect: Le,
    useInsertionEffect: Le,
    useMemo: Le,
    useReducer: Le,
    useRef: Le,
    useState: Le,
    useDebugValue: Le,
    useDeferredValue: Le,
    useTransition: Le,
    useSyncExternalStore: Le,
    useId: Le,
    useHostTransitionStatus: Le,
    useFormState: Le,
    useActionState: Le,
    useOptimistic: Le,
    useMemoCache: Le,
    useCacheRefresh: Le,
  };
  Uo.useEffectEvent = Le;
  var mg = {
      readContext: Pe,
      use: Yd,
      useCallback: function (e, a) {
        return ((Xe().memoizedState = [e, a === void 0 ? null : a]), e);
      },
      useContext: Pe,
      useEffect: Jc,
      useImperativeHandle: function (e, a, t) {
        ((t = t != null ? t.concat([e]) : null),
          ad(4194308, 4, ag.bind(null, a, e), t));
      },
      useLayoutEffect: function (e, a) {
        return ad(4194308, 4, e, a);
      },
      useInsertionEffect: function (e, a) {
        ad(4, 2, e, a);
      },
      useMemo: function (e, a) {
        var t = Xe();
        a = a === void 0 ? null : a;
        var l = e();
        if (hl) {
          Mt(!0);
          try {
            e();
          } finally {
            Mt(!1);
          }
        }
        return ((t.memoizedState = [l, a]), l);
      },
      useReducer: function (e, a, t) {
        var l = Xe();
        if (t !== void 0) {
          var u = t(a);
          if (hl) {
            Mt(!0);
            try {
              t(a);
            } finally {
              Mt(!1);
            }
          }
        } else u = a;
        return (
          (l.memoizedState = l.baseState = u),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: u,
          }),
          (l.queue = e),
          (e = e.dispatch = p0.bind(null, N, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var a = Xe();
        return ((e = { current: e }), (a.memoizedState = e));
      },
      useState: function (e) {
        e = Vi(e);
        var a = e.queue,
          t = sg.bind(null, N, a);
        return ((a.dispatch = t), [e.memoizedState, t]);
      },
      useDebugValue: _r,
      useDeferredValue: function (e, a) {
        var t = Xe();
        return Vr(t, e, a);
      },
      useTransition: function () {
        var e = Vi(!1);
        return (
          (e = fg.bind(null, N, e.queue, !0, !1)),
          (Xe().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, a, t) {
        var l = N,
          u = Xe();
        if (Z) {
          if (t === void 0) throw Error(v(407));
          t = t();
        } else {
          if (((t = a()), fe === null)) throw Error(v(349));
          (j & 127) !== 0 || Fm(l, a, t);
        }
        u.memoizedState = t;
        var o = { value: t, getSnapshot: a };
        return (
          (u.queue = o),
          Jc(_m.bind(null, l, o, e), [e]),
          (l.flags |= 2048),
          Cu(9, { destroy: void 0 }, Gm.bind(null, l, o, t, a), null),
          t
        );
      },
      useId: function () {
        var e = Xe(),
          a = fe.identifierPrefix;
        if (Z) {
          var t = Ha,
            l = qa;
          ((t = (l & ~(1 << (32 - na(l) - 1))).toString(32) + t),
            (a = "_" + a + "R_" + t),
            (t = Sd++),
            0 < t && (a += "H" + t.toString(32)),
            (a += "_"));
        } else ((t = f0++), (a = "_" + a + "r_" + t.toString(32) + "_"));
        return (e.memoizedState = a);
      },
      useHostTransitionStatus: Xr,
      useFormState: Zc,
      useActionState: Zc,
      useOptimistic: function (e) {
        var a = Xe();
        a.memoizedState = a.baseState = e;
        var t = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (a.queue = t),
          (a = Yr.bind(null, N, !0, t)),
          (t.dispatch = a),
          [e, a]
        );
      },
      useMemoCache: Pr,
      useCacheRefresh: function () {
        return (Xe().memoizedState = c0.bind(null, N));
      },
      useEffectEvent: function (e) {
        var a = Xe(),
          t = { impl: e };
        return (
          (a.memoizedState = t),
          function () {
            if ((K & 2) !== 0) throw Error(v(440));
            return t.impl.apply(void 0, arguments);
          }
        );
      },
    },
    jr = {
      readContext: Pe,
      use: Yd,
      useCallback: lg,
      useContext: Pe,
      useEffect: Gr,
      useImperativeHandle: tg,
      useInsertionEffect: $m,
      useLayoutEffect: eg,
      useMemo: ug,
      useReducer: ed,
      useRef: Jm,
      useState: function () {
        return ed(st);
      },
      useDebugValue: _r,
      useDeferredValue: function (e, a) {
        var t = be();
        return og(t, le.memoizedState, e, a);
      },
      useTransition: function () {
        var e = ed(st)[0],
          a = be().memoizedState;
        return [typeof e == "boolean" ? e : Qo(e), a];
      },
      useSyncExternalStore: Pm,
      useId: ig,
      useHostTransitionStatus: Xr,
      useFormState: Qc,
      useActionState: Qc,
      useOptimistic: function (e, a) {
        var t = be();
        return Ym(t, le, e, a);
      },
      useMemoCache: Pr,
      useCacheRefresh: rg,
    };
  jr.useEffectEvent = Wm;
  var gg = {
    readContext: Pe,
    use: Yd,
    useCallback: lg,
    useContext: Pe,
    useEffect: Gr,
    useImperativeHandle: tg,
    useInsertionEffect: $m,
    useLayoutEffect: eg,
    useMemo: ug,
    useReducer: ei,
    useRef: Jm,
    useState: function () {
      return ei(st);
    },
    useDebugValue: _r,
    useDeferredValue: function (e, a) {
      var t = be();
      return le === null ? Vr(t, e, a) : og(t, le.memoizedState, e, a);
    },
    useTransition: function () {
      var e = ei(st)[0],
        a = be().memoizedState;
      return [typeof e == "boolean" ? e : Qo(e), a];
    },
    useSyncExternalStore: Pm,
    useId: ig,
    useHostTransitionStatus: Xr,
    useFormState: Kc,
    useActionState: Kc,
    useOptimistic: function (e, a) {
      var t = be();
      return le !== null
        ? Ym(t, le, e, a)
        : ((t.baseState = e), [e, t.queue.dispatch]);
    },
    useMemoCache: Pr,
    useCacheRefresh: rg,
  };
  gg.useEffectEvent = Wm;
  function ai(e, a, t, l) {
    ((a = e.memoizedState),
      (t = t(l, a)),
      (t = t == null ? a : ce({}, a, t)),
      (e.memoizedState = t),
      e.lanes === 0 && (e.updateQueue.baseState = t));
  }
  var ji = {
    enqueueSetState: function (e, a, t) {
      e = e._reactInternals;
      var l = ia(),
        u = Ot(l);
      ((u.payload = a),
        t != null && (u.callback = t),
        (a = Et(e, u, l)),
        a !== null && (Je(a, e, l), Co(a, e, l)));
    },
    enqueueReplaceState: function (e, a, t) {
      e = e._reactInternals;
      var l = ia(),
        u = Ot(l);
      ((u.tag = 1),
        (u.payload = a),
        t != null && (u.callback = t),
        (a = Et(e, u, l)),
        a !== null && (Je(a, e, l), Co(a, e, l)));
    },
    enqueueForceUpdate: function (e, a) {
      e = e._reactInternals;
      var t = ia(),
        l = Ot(t);
      ((l.tag = 2),
        a != null && (l.callback = a),
        (a = Et(e, l, t)),
        a !== null && (Je(a, e, t), Co(a, e, t)));
    },
  };
  function Wc(e, a, t, l, u, o, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(l, o, f)
        : a.prototype && a.prototype.isPureReactComponent
          ? !zo(t, l) || !zo(u, o)
          : !0
    );
  }
  function $c(e, a, t, l) {
    ((e = a.state),
      typeof a.componentWillReceiveProps == "function" &&
        a.componentWillReceiveProps(t, l),
      typeof a.UNSAFE_componentWillReceiveProps == "function" &&
        a.UNSAFE_componentWillReceiveProps(t, l),
      a.state !== e && ji.enqueueReplaceState(a, a.state, null));
  }
  function xl(e, a) {
    var t = a;
    if ("ref" in a) {
      t = {};
      for (var l in a) l !== "ref" && (t[l] = a[l]);
    }
    if ((e = e.defaultProps)) {
      t === a && (t = ce({}, t));
      for (var u in e) t[u] === void 0 && (t[u] = e[u]);
    }
    return t;
  }
  function hg(e) {
    md(e);
  }
  function xg(e) {
    console.error(e);
  }
  function Lg(e) {
    md(e);
  }
  function vd(e, a) {
    try {
      var t = e.onUncaughtError;
      t(a.value, { componentStack: a.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function ep(e, a, t) {
    try {
      var l = e.onCaughtError;
      l(t.value, {
        componentStack: t.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function Zi(e, a, t) {
    return (
      (t = Ot(t)),
      (t.tag = 3),
      (t.payload = { element: null }),
      (t.callback = function () {
        vd(e, a);
      }),
      t
    );
  }
  function Cg(e) {
    return ((e = Ot(e)), (e.tag = 3), e);
  }
  function yg(e, a, t, l) {
    var u = t.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var o = l.value;
      ((e.payload = function () {
        return u(o);
      }),
        (e.callback = function () {
          ep(a, t, l);
        }));
    }
    var f = t.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (e.callback = function () {
        (ep(a, t, l),
          typeof u != "function" &&
            (Ut === null ? (Ut = new Set([this])) : Ut.add(this)));
        var i = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: i !== null ? i : "",
        });
      });
  }
  function m0(e, a, t, l, u) {
    if (
      ((t.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((a = t.alternate),
        a !== null && Mu(a, t, u, !0),
        (t = sa.current),
        t !== null)
      ) {
        switch (t.tag) {
          case 31:
          case 13:
            return (
              Ia === null ? Dd() : t.alternate === null && Ce === 0 && (Ce = 3),
              (t.flags &= -257),
              (t.flags |= 65536),
              (t.lanes = u),
              l === Ld
                ? (t.flags |= 16384)
                : ((a = t.updateQueue),
                  a === null ? (t.updateQueue = new Set([l])) : a.add(l),
                  ci(e, l, u)),
              !1
            );
          case 22:
            return (
              (t.flags |= 65536),
              l === Ld
                ? (t.flags |= 16384)
                : ((a = t.updateQueue),
                  a === null
                    ? ((a = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (t.updateQueue = a))
                    : ((t = a.retryQueue),
                      t === null ? (a.retryQueue = new Set([l])) : t.add(l)),
                  ci(e, l, u)),
              !1
            );
        }
        throw Error(v(435, t.tag));
      }
      return (ci(e, l, u), Dd(), !1);
    }
    if (Z)
      return (
        (a = sa.current),
        a !== null
          ? ((a.flags & 65536) === 0 && (a.flags |= 256),
            (a.flags |= 65536),
            (a.lanes = u),
            l !== Ei && ((e = Error(v(422), { cause: l })), Ro(Sa(e, t))))
          : (l !== Ei && ((a = Error(v(423), { cause: l })), Ro(Sa(a, t))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (l = Sa(l, t)),
            (u = Zi(e.stateNode, l, u)),
            $n(e, u),
            Ce !== 4 && (Ce = 2)),
        !1
      );
    var o = Error(v(520), { cause: l });
    if (
      ((o = Sa(o, t)),
      wo === null ? (wo = [o]) : wo.push(o),
      Ce !== 4 && (Ce = 2),
      a === null)
    )
      return !0;
    ((l = Sa(l, t)), (t = a));
    do {
      switch (t.tag) {
        case 3:
          return (
            (t.flags |= 65536),
            (e = u & -u),
            (t.lanes |= e),
            (e = Zi(t.stateNode, l, e)),
            $n(t, e),
            !1
          );
        case 1:
          if (
            ((a = t.type),
            (o = t.stateNode),
            (t.flags & 128) === 0 &&
              (typeof a.getDerivedStateFromError == "function" ||
                (o !== null &&
                  typeof o.componentDidCatch == "function" &&
                  (Ut === null || !Ut.has(o)))))
          )
            return (
              (t.flags |= 65536),
              (u &= -u),
              (t.lanes |= u),
              (u = Cg(u)),
              yg(u, e, t, l),
              $n(t, u),
              !1
            );
      }
      t = t.return;
    } while (t !== null);
    return !1;
  }
  var Zr = Error(v(461)),
    Ae = !1;
  function qe(e, a, t, l) {
    a.child = e === null ? Om(a, null, t, l) : gl(a, e.child, t, l);
  }
  function ap(e, a, t, l, u) {
    t = t.render;
    var o = a.ref;
    if ("ref" in l) {
      var f = {};
      for (var i in l) i !== "ref" && (f[i] = l[i]);
    } else f = l;
    return (
      ml(a),
      (l = Ur(e, a, t, f, o, u)),
      (i = qr()),
      e !== null && !Ae
        ? (Hr(e, a, u), ct(e, a, u))
        : (Z && i && Dr(a), (a.flags |= 1), qe(e, a, l, u), a.child)
    );
  }
  function tp(e, a, t, l, u) {
    if (e === null) {
      var o = t.type;
      return typeof o == "function" &&
        !Mr(o) &&
        o.defaultProps === void 0 &&
        t.compare === null
        ? ((a.tag = 15), (a.type = o), bg(e, a, o, l, u))
        : ((e = Wf(t.type, null, l, a, a.mode, u)),
          (e.ref = a.ref),
          (e.return = a),
          (a.child = e));
    }
    if (((o = e.child), !Qr(e, u))) {
      var f = o.memoizedProps;
      if (
        ((t = t.compare), (t = t !== null ? t : zo), t(f, l) && e.ref === a.ref)
      )
        return ct(e, a, u);
    }
    return (
      (a.flags |= 1),
      (e = ft(o, l)),
      (e.ref = a.ref),
      (e.return = a),
      (a.child = e)
    );
  }
  function bg(e, a, t, l, u) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (zo(o, l) && e.ref === a.ref)
        if (((Ae = !1), (a.pendingProps = l = o), Qr(e, u)))
          (e.flags & 131072) !== 0 && (Ae = !0);
        else return ((a.lanes = e.lanes), ct(e, a, u));
    }
    return Qi(e, a, t, l, u);
  }
  function Sg(e, a, t, l) {
    var u = l.children,
      o = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        a.stateNode === null &&
        (a.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      l.mode === "hidden")
    ) {
      if ((a.flags & 128) !== 0) {
        if (((o = o !== null ? o.baseLanes | t : t), e !== null)) {
          for (l = a.child = e.child, u = 0; l !== null;)
            ((u = u | l.lanes | l.childLanes), (l = l.sibling));
          l = u & ~o;
        } else ((l = 0), (a.child = null));
        return lp(e, a, o, t, l);
      }
      if ((t & 536870912) !== 0)
        ((a.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && $f(a, o !== null ? o.cachePool : null),
          o !== null ? Xc(a, o) : Gi(),
          qm(a));
      else
        return (
          (l = a.lanes = 536870912),
          lp(e, a, o !== null ? o.baseLanes | t : t, t, l)
        );
    } else
      o !== null
        ? ($f(a, o.cachePool), Xc(a, o), wt(a), (a.memoizedState = null))
        : (e !== null && $f(a, null), Gi(), wt(a));
    return (qe(e, a, u, t), a.child);
  }
  function po(e, a) {
    return (
      (e !== null && e.tag === 22) ||
        a.stateNode !== null ||
        (a.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.sibling
    );
  }
  function lp(e, a, t, l, u) {
    var o = zr();
    return (
      (o = o === null ? null : { parent: we._currentValue, pool: o }),
      (a.memoizedState = { baseLanes: t, cachePool: o }),
      e !== null && $f(a, null),
      Gi(),
      qm(a),
      e !== null && Mu(e, a, l, !0),
      (a.childLanes = u),
      null
    );
  }
  function td(e, a) {
    return (
      (a = Id({ mode: a.mode, children: a.children }, e.mode)),
      (a.ref = e.ref),
      (e.child = a),
      (a.return = e),
      a
    );
  }
  function up(e, a, t) {
    return (
      gl(a, e.child, null, t),
      (e = td(a, a.pendingProps)),
      (e.flags |= 2),
      la(a),
      (a.memoizedState = null),
      e
    );
  }
  function g0(e, a, t) {
    var l = a.pendingProps,
      u = (a.flags & 128) !== 0;
    if (((a.flags &= -129), e === null)) {
      if (Z) {
        if (l.mode === "hidden")
          return ((e = td(a, l)), (a.lanes = 536870912), po(null, e));
        if (
          (_i(a),
          (e = se)
            ? ((e = mh(e, va)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((a.memoizedState = {
                  dehydrated: e,
                  treeContext: Ft !== null ? { id: qa, overflow: Ha } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (t = Mm(e)),
                (t.return = a),
                (a.child = t),
                (Ne = a),
                (se = null)))
            : (e = null),
          e === null)
        )
          throw Gt(a);
        return ((a.lanes = 536870912), null);
      }
      return td(a, l);
    }
    var o = e.memoizedState;
    if (o !== null) {
      var f = o.dehydrated;
      if ((_i(a), u))
        if (a.flags & 256) ((a.flags &= -257), (a = up(e, a, t)));
        else if (a.memoizedState !== null)
          ((a.child = e.child), (a.flags |= 128), (a = null));
        else throw Error(v(558));
      else if (
        (Ae || Mu(e, a, t, !1), (u = (t & e.childLanes) !== 0), Ae || u)
      ) {
        if (
          ((l = fe),
          l !== null && ((f = $p(l, t)), f !== 0 && f !== o.retryLane))
        )
          throw ((o.retryLane = f), bl(e, f), Je(l, e, f), Zr);
        (Dd(), (a = up(e, a, t)));
      } else
        ((e = o.treeContext),
          (se = wa(f.nextSibling)),
          (Ne = a),
          (Z = !0),
          (Rt = null),
          (va = !1),
          e !== null && Tm(a, e),
          (a = td(a, l)),
          (a.flags |= 4096));
      return a;
    }
    return (
      (e = ft(e.child, { mode: l.mode, children: l.children })),
      (e.ref = a.ref),
      (a.child = e),
      (e.return = a),
      e
    );
  }
  function ld(e, a) {
    var t = a.ref;
    if (t === null) e !== null && e.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof t != "function" && typeof t != "object") throw Error(v(284));
      (e === null || e.ref !== t) && (a.flags |= 4194816);
    }
  }
  function Qi(e, a, t, l, u) {
    return (
      ml(a),
      (t = Ur(e, a, t, l, void 0, u)),
      (l = qr()),
      e !== null && !Ae
        ? (Hr(e, a, u), ct(e, a, u))
        : (Z && l && Dr(a), (a.flags |= 1), qe(e, a, t, u), a.child)
    );
  }
  function op(e, a, t, l, u, o) {
    return (
      ml(a),
      (a.updateQueue = null),
      (t = Nm(a, l, t, u)),
      Hm(e),
      (l = qr()),
      e !== null && !Ae
        ? (Hr(e, a, o), ct(e, a, o))
        : (Z && l && Dr(a), (a.flags |= 1), qe(e, a, t, o), a.child)
    );
  }
  function fp(e, a, t, l, u) {
    if ((ml(a), a.stateNode === null)) {
      var o = lu,
        f = t.contextType;
      (typeof f == "object" && f !== null && (o = Pe(f)),
        (o = new t(l, o)),
        (a.memoizedState =
          o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = ji),
        (a.stateNode = o),
        (o._reactInternals = a),
        (o = a.stateNode),
        (o.props = l),
        (o.state = a.memoizedState),
        (o.refs = {}),
        Rr(a),
        (f = t.contextType),
        (o.context = typeof f == "object" && f !== null ? Pe(f) : lu),
        (o.state = a.memoizedState),
        (f = t.getDerivedStateFromProps),
        typeof f == "function" && (ai(a, t, f, l), (o.state = a.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function" ||
          (typeof o.UNSAFE_componentWillMount != "function" &&
            typeof o.componentWillMount != "function") ||
          ((f = o.state),
          typeof o.componentWillMount == "function" && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == "function" &&
            o.UNSAFE_componentWillMount(),
          f !== o.state && ji.enqueueReplaceState(o, o.state, null),
          bo(a, l, o, u),
          yo(),
          (o.state = a.memoizedState)),
        typeof o.componentDidMount == "function" && (a.flags |= 4194308),
        (l = !0));
    } else if (e === null) {
      o = a.stateNode;
      var i = a.memoizedProps,
        r = xl(t, i);
      o.props = r;
      var m = o.context,
        C = t.contextType;
      ((f = lu), typeof C == "object" && C !== null && (f = Pe(C)));
      var b = t.getDerivedStateFromProps;
      ((C =
        typeof b == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function"),
        (i = a.pendingProps !== i),
        C ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((i || m !== f) && $c(a, o, l, f)),
        (St = !1));
      var h = a.memoizedState;
      ((o.state = h),
        bo(a, l, o, u),
        yo(),
        (m = a.memoizedState),
        i || h !== m || St
          ? (typeof b == "function" && (ai(a, t, b, l), (m = a.memoizedState)),
            (r = St || Wc(a, t, r, l, h, m, f))
              ? (C ||
                  (typeof o.UNSAFE_componentWillMount != "function" &&
                    typeof o.componentWillMount != "function") ||
                  (typeof o.componentWillMount == "function" &&
                    o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == "function" &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == "function" &&
                  (a.flags |= 4194308))
              : (typeof o.componentDidMount == "function" &&
                  (a.flags |= 4194308),
                (a.memoizedProps = l),
                (a.memoizedState = m)),
            (o.props = l),
            (o.state = m),
            (o.context = f),
            (l = r))
          : (typeof o.componentDidMount == "function" && (a.flags |= 4194308),
            (l = !1)));
    } else {
      ((o = a.stateNode),
        Pi(e, a),
        (f = a.memoizedProps),
        (C = xl(t, f)),
        (o.props = C),
        (b = a.pendingProps),
        (h = o.context),
        (m = t.contextType),
        (r = lu),
        typeof m == "object" && m !== null && (r = Pe(m)),
        (i = t.getDerivedStateFromProps),
        (m =
          typeof i == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function") ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((f !== b || h !== r) && $c(a, o, l, r)),
        (St = !1),
        (h = a.memoizedState),
        (o.state = h),
        bo(a, l, o, u),
        yo());
      var x = a.memoizedState;
      f !== b ||
      h !== x ||
      St ||
      (e !== null && e.dependencies !== null && xd(e.dependencies))
        ? (typeof i == "function" && (ai(a, t, i, l), (x = a.memoizedState)),
          (C =
            St ||
            Wc(a, t, C, l, h, x, r) ||
            (e !== null && e.dependencies !== null && xd(e.dependencies)))
            ? (m ||
                (typeof o.UNSAFE_componentWillUpdate != "function" &&
                  typeof o.componentWillUpdate != "function") ||
                (typeof o.componentWillUpdate == "function" &&
                  o.componentWillUpdate(l, x, r),
                typeof o.UNSAFE_componentWillUpdate == "function" &&
                  o.UNSAFE_componentWillUpdate(l, x, r)),
              typeof o.componentDidUpdate == "function" && (a.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == "function" &&
                (a.flags |= 1024))
            : (typeof o.componentDidUpdate != "function" ||
                (f === e.memoizedProps && h === e.memoizedState) ||
                (a.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                (f === e.memoizedProps && h === e.memoizedState) ||
                (a.flags |= 1024),
              (a.memoizedProps = l),
              (a.memoizedState = x)),
          (o.props = l),
          (o.state = x),
          (o.context = r),
          (l = C))
        : (typeof o.componentDidUpdate != "function" ||
            (f === e.memoizedProps && h === e.memoizedState) ||
            (a.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != "function" ||
            (f === e.memoizedProps && h === e.memoizedState) ||
            (a.flags |= 1024),
          (l = !1));
    }
    return (
      (o = l),
      ld(e, a),
      (l = (a.flags & 128) !== 0),
      o || l
        ? ((o = a.stateNode),
          (t =
            l && typeof t.getDerivedStateFromError != "function"
              ? null
              : o.render()),
          (a.flags |= 1),
          e !== null && l
            ? ((a.child = gl(a, e.child, null, u)),
              (a.child = gl(a, null, t, u)))
            : qe(e, a, t, u),
          (a.memoizedState = o.state),
          (e = a.child))
        : (e = ct(e, a, u)),
      e
    );
  }
  function dp(e, a, t, l) {
    return (pl(), (a.flags |= 256), qe(e, a, t, l), a.child);
  }
  var ti = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function li(e) {
    return { baseLanes: e, cachePool: zm() };
  }
  function ui(e, a, t) {
    return ((e = e !== null ? e.childLanes & ~t : 0), a && (e |= oa), e);
  }
  function vg(e, a, t) {
    var l = a.pendingProps,
      u = !1,
      o = (a.flags & 128) !== 0,
      f;
    if (
      ((f = o) ||
        (f =
          e !== null && e.memoizedState === null ? !1 : (ye.current & 2) !== 0),
      f && ((u = !0), (a.flags &= -129)),
      (f = (a.flags & 32) !== 0),
      (a.flags &= -33),
      e === null)
    ) {
      if (Z) {
        if (
          (u ? It(a) : wt(a),
          (e = se)
            ? ((e = mh(e, va)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((a.memoizedState = {
                  dehydrated: e,
                  treeContext: Ft !== null ? { id: qa, overflow: Ha } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (t = Mm(e)),
                (t.return = a),
                (a.child = t),
                (Ne = a),
                (se = null)))
            : (e = null),
          e === null)
        )
          throw Gt(a);
        return (ir(e) ? (a.lanes = 32) : (a.lanes = 536870912), null);
      }
      var i = l.children;
      return (
        (l = l.fallback),
        u
          ? (wt(a),
            (u = a.mode),
            (i = Id({ mode: "hidden", children: i }, u)),
            (l = il(l, u, t, null)),
            (i.return = a),
            (l.return = a),
            (i.sibling = l),
            (a.child = i),
            (l = a.child),
            (l.memoizedState = li(t)),
            (l.childLanes = ui(e, f, t)),
            (a.memoizedState = ti),
            po(null, l))
          : (It(a), Ki(a, i))
      );
    }
    var r = e.memoizedState;
    if (r !== null && ((i = r.dehydrated), i !== null)) {
      if (o)
        a.flags & 256
          ? (It(a), (a.flags &= -257), (a = oi(e, a, t)))
          : a.memoizedState !== null
            ? (wt(a), (a.child = e.child), (a.flags |= 128), (a = null))
            : (wt(a),
              (i = l.fallback),
              (u = a.mode),
              (l = Id({ mode: "visible", children: l.children }, u)),
              (i = il(i, u, t, null)),
              (i.flags |= 2),
              (l.return = a),
              (i.return = a),
              (l.sibling = i),
              (a.child = l),
              gl(a, e.child, null, t),
              (l = a.child),
              (l.memoizedState = li(t)),
              (l.childLanes = ui(e, f, t)),
              (a.memoizedState = ti),
              (a = po(null, l)));
      else if ((It(a), ir(i))) {
        if (((f = i.nextSibling && i.nextSibling.dataset), f)) var m = f.dgst;
        ((f = m),
          (l = Error(v(419))),
          (l.stack = ""),
          (l.digest = f),
          Ro({ value: l, source: null, stack: null }),
          (a = oi(e, a, t)));
      } else if (
        (Ae || Mu(e, a, t, !1), (f = (t & e.childLanes) !== 0), Ae || f)
      ) {
        if (
          ((f = fe),
          f !== null && ((l = $p(f, t)), l !== 0 && l !== r.retryLane))
        )
          throw ((r.retryLane = l), bl(e, l), Je(f, e, l), Zr);
        (nr(i) || Dd(), (a = oi(e, a, t)));
      } else
        nr(i)
          ? ((a.flags |= 192), (a.child = e.child), (a = null))
          : ((e = r.treeContext),
            (se = wa(i.nextSibling)),
            (Ne = a),
            (Z = !0),
            (Rt = null),
            (va = !1),
            e !== null && Tm(a, e),
            (a = Ki(a, l.children)),
            (a.flags |= 4096));
      return a;
    }
    return u
      ? (wt(a),
        (i = l.fallback),
        (u = a.mode),
        (r = e.child),
        (m = r.sibling),
        (l = ft(r, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = r.subtreeFlags & 65011712),
        m !== null ? (i = ft(m, i)) : ((i = il(i, u, t, null)), (i.flags |= 2)),
        (i.return = a),
        (l.return = a),
        (l.sibling = i),
        (a.child = l),
        po(null, l),
        (l = a.child),
        (i = e.child.memoizedState),
        i === null
          ? (i = li(t))
          : ((u = i.cachePool),
            u !== null
              ? ((r = we._currentValue),
                (u = u.parent !== r ? { parent: r, pool: r } : u))
              : (u = zm()),
            (i = { baseLanes: i.baseLanes | t, cachePool: u })),
        (l.memoizedState = i),
        (l.childLanes = ui(e, f, t)),
        (a.memoizedState = ti),
        po(e.child, l))
      : (It(a),
        (t = e.child),
        (e = t.sibling),
        (t = ft(t, { mode: "visible", children: l.children })),
        (t.return = a),
        (t.sibling = null),
        e !== null &&
          ((f = a.deletions),
          f === null ? ((a.deletions = [e]), (a.flags |= 16)) : f.push(e)),
        (a.child = t),
        (a.memoizedState = null),
        t);
  }
  function Ki(e, a) {
    return (
      (a = Id({ mode: "visible", children: a }, e.mode)),
      (a.return = e),
      (e.child = a)
    );
  }
  function Id(e, a) {
    return ((e = ua(22, e, null, a)), (e.lanes = 0), e);
  }
  function oi(e, a, t) {
    return (
      gl(a, e.child, null, t),
      (e = Ki(a, a.pendingProps.children)),
      (e.flags |= 2),
      (a.memoizedState = null),
      e
    );
  }
  function np(e, a, t) {
    e.lanes |= a;
    var l = e.alternate;
    (l !== null && (l.lanes |= a), qi(e.return, a, t));
  }
  function fi(e, a, t, l, u, o) {
    var f = e.memoizedState;
    f === null
      ? (e.memoizedState = {
          isBackwards: a,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: t,
          tailMode: u,
          treeForkCount: o,
        })
      : ((f.isBackwards = a),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = l),
        (f.tail = t),
        (f.tailMode = u),
        (f.treeForkCount = o));
  }
  function Ig(e, a, t) {
    var l = a.pendingProps,
      u = l.revealOrder,
      o = l.tail;
    l = l.children;
    var f = ye.current,
      i = (f & 2) !== 0;
    if (
      (i ? ((f = (f & 1) | 2), (a.flags |= 128)) : (f &= 1),
      de(ye, f),
      qe(e, a, l, t),
      (l = Z ? Bo : 0),
      !i && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = a.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && np(e, t, a);
        else if (e.tag === 19) np(e, t, a);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === a) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === a) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (u) {
      case "forwards":
        for (t = a.child, u = null; t !== null;)
          ((e = t.alternate),
            e !== null && yd(e) === null && (u = t),
            (t = t.sibling));
        ((t = u),
          t === null
            ? ((u = a.child), (a.child = null))
            : ((u = t.sibling), (t.sibling = null)),
          fi(a, !1, u, t, o, l));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (t = null, u = a.child, a.child = null; u !== null;) {
          if (((e = u.alternate), e !== null && yd(e) === null)) {
            a.child = u;
            break;
          }
          ((e = u.sibling), (u.sibling = t), (t = u), (u = e));
        }
        fi(a, !0, t, null, o, l);
        break;
      case "together":
        fi(a, !1, null, null, void 0, l);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function ct(e, a, t) {
    if (
      (e !== null && (a.dependencies = e.dependencies),
      (Vt |= a.lanes),
      (t & a.childLanes) === 0)
    )
      if (e !== null) {
        if ((Mu(e, a, t, !1), (t & a.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && a.child !== e.child) throw Error(v(153));
    if (a.child !== null) {
      for (
        e = a.child, t = ft(e, e.pendingProps), a.child = t, t.return = a;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (t = t.sibling = ft(e, e.pendingProps)),
          (t.return = a));
      t.sibling = null;
    }
    return a.child;
  }
  function Qr(e, a) {
    return (e.lanes & a) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && xd(e)));
  }
  function h0(e, a, t) {
    switch (a.tag) {
      case 3:
        (rd(a, a.stateNode.containerInfo),
          vt(a, we, e.memoizedState.cache),
          pl());
        break;
      case 27:
      case 5:
        Ii(a);
        break;
      case 4:
        rd(a, a.stateNode.containerInfo);
        break;
      case 10:
        vt(a, a.type, a.memoizedProps.value);
        break;
      case 31:
        if (a.memoizedState !== null) return ((a.flags |= 128), _i(a), null);
        break;
      case 13:
        var l = a.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (It(a), (a.flags |= 128), null)
            : (t & a.child.childLanes) !== 0
              ? vg(e, a, t)
              : (It(a), (e = ct(e, a, t)), e !== null ? e.sibling : null);
        It(a);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((l = (t & a.childLanes) !== 0),
          l || (Mu(e, a, t, !1), (l = (t & a.childLanes) !== 0)),
          u)
        ) {
          if (l) return Ig(e, a, t);
          a.flags |= 128;
        }
        if (
          ((u = a.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          de(ye, ye.current),
          l)
        )
          break;
        return null;
      case 22:
        return ((a.lanes = 0), Sg(e, a, t, a.pendingProps));
      case 24:
        vt(a, we, e.memoizedState.cache);
    }
    return ct(e, a, t);
  }
  function wg(e, a, t) {
    if (e !== null)
      if (e.memoizedProps !== a.pendingProps) Ae = !0;
      else {
        if (!Qr(e, t) && (a.flags & 128) === 0) return ((Ae = !1), h0(e, a, t));
        Ae = (e.flags & 131072) !== 0;
      }
    else ((Ae = !1), Z && (a.flags & 1048576) !== 0 && Dm(a, Bo, a.index));
    switch (((a.lanes = 0), a.tag)) {
      case 16:
        e: {
          var l = a.pendingProps;
          if (((e = fl(a.elementType)), (a.type = e), typeof e == "function"))
            Mr(e)
              ? ((l = xl(e, l)), (a.tag = 1), (a = fp(null, a, e, l, t)))
              : ((a.tag = 0), (a = Qi(null, a, e, l, t)));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === pr) {
                ((a.tag = 11), (a = ap(null, a, e, l, t)));
                break e;
              } else if (u === mr) {
                ((a.tag = 14), (a = tp(null, a, e, l, t)));
                break e;
              }
            }
            throw ((a = Si(e) || e), Error(v(306, a, "")));
          }
        }
        return a;
      case 0:
        return Qi(e, a, a.type, a.pendingProps, t);
      case 1:
        return ((l = a.type), (u = xl(l, a.pendingProps)), fp(e, a, l, u, t));
      case 3:
        e: {
          if ((rd(a, a.stateNode.containerInfo), e === null))
            throw Error(v(387));
          l = a.pendingProps;
          var o = a.memoizedState;
          ((u = o.element), Pi(e, a), bo(a, l, null, t));
          var f = a.memoizedState;
          if (
            ((l = f.cache),
            vt(a, we, l),
            l !== o.cache && Hi(a, [we], t, !0),
            yo(),
            (l = f.element),
            o.isDehydrated)
          )
            if (
              ((o = { element: l, isDehydrated: !1, cache: f.cache }),
              (a.updateQueue.baseState = o),
              (a.memoizedState = o),
              a.flags & 256)
            ) {
              a = dp(e, a, l, t);
              break e;
            } else if (l !== u) {
              ((u = Sa(Error(v(424)), a)), Ro(u), (a = dp(e, a, l, t)));
              break e;
            } else
              for (
                e = a.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  se = wa(e.firstChild),
                  Ne = a,
                  Z = !0,
                  Rt = null,
                  va = !0,
                  t = Om(a, null, l, t),
                  a.child = t;
                t;
              )
                ((t.flags = (t.flags & -3) | 4096), (t = t.sibling));
          else {
            if ((pl(), l === u)) {
              a = ct(e, a, t);
              break e;
            }
            qe(e, a, l, t);
          }
          a = a.child;
        }
        return a;
      case 26:
        return (
          ld(e, a),
          e === null
            ? (t = kp(a.type, null, a.pendingProps, null))
              ? (a.memoizedState = t)
              : Z ||
                ((t = a.type),
                (e = a.pendingProps),
                (l = Bd(Bt.current).createElement(t)),
                (l[He] = a),
                (l[We] = e),
                Fe(l, t, e),
                Re(l),
                (a.stateNode = l))
            : (a.memoizedState = kp(
                a.type,
                e.memoizedProps,
                a.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ii(a),
          e === null &&
            Z &&
            ((l = a.stateNode = gh(a.type, a.pendingProps, Bt.current)),
            (Ne = a),
            (va = !0),
            (u = se),
            Yt(a.type) ? ((rr = u), (se = wa(l.firstChild))) : (se = u)),
          qe(e, a, a.pendingProps.children, t),
          ld(e, a),
          e === null && (a.flags |= 4194304),
          a.child
        );
      case 5:
        return (
          e === null &&
            Z &&
            ((u = l = se) &&
              ((l = V0(l, a.type, a.pendingProps, va)),
              l !== null
                ? ((a.stateNode = l),
                  (Ne = a),
                  (se = wa(l.firstChild)),
                  (va = !1),
                  (u = !0))
                : (u = !1)),
            u || Gt(a)),
          Ii(a),
          (u = a.type),
          (o = a.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = o.children),
          fr(u, o) ? (l = null) : f !== null && fr(u, f) && (a.flags |= 32),
          a.memoizedState !== null &&
            ((u = Ur(e, a, d0, null, null, t)), (No._currentValue = u)),
          ld(e, a),
          qe(e, a, l, t),
          a.child
        );
      case 6:
        return (
          e === null &&
            Z &&
            ((e = t = se) &&
              ((t = X0(t, a.pendingProps, va)),
              t !== null
                ? ((a.stateNode = t), (Ne = a), (se = null), (e = !0))
                : (e = !1)),
            e || Gt(a)),
          null
        );
      case 13:
        return vg(e, a, t);
      case 4:
        return (
          rd(a, a.stateNode.containerInfo),
          (l = a.pendingProps),
          e === null ? (a.child = gl(a, null, l, t)) : qe(e, a, l, t),
          a.child
        );
      case 11:
        return ap(e, a, a.type, a.pendingProps, t);
      case 7:
        return (qe(e, a, a.pendingProps, t), a.child);
      case 8:
        return (qe(e, a, a.pendingProps.children, t), a.child);
      case 12:
        return (qe(e, a, a.pendingProps.children, t), a.child);
      case 10:
        return (
          (l = a.pendingProps),
          vt(a, a.type, l.value),
          qe(e, a, l.children, t),
          a.child
        );
      case 9:
        return (
          (u = a.type._context),
          (l = a.pendingProps.children),
          ml(a),
          (u = Pe(u)),
          (l = l(u)),
          (a.flags |= 1),
          qe(e, a, l, t),
          a.child
        );
      case 14:
        return tp(e, a, a.type, a.pendingProps, t);
      case 15:
        return bg(e, a, a.type, a.pendingProps, t);
      case 19:
        return Ig(e, a, t);
      case 31:
        return g0(e, a, t);
      case 22:
        return Sg(e, a, t, a.pendingProps);
      case 24:
        return (
          ml(a),
          (l = Pe(we)),
          e === null
            ? ((u = zr()),
              u === null &&
                ((u = fe),
                (o = kr()),
                (u.pooledCache = o),
                o.refCount++,
                o !== null && (u.pooledCacheLanes |= t),
                (u = o)),
              (a.memoizedState = { parent: l, cache: u }),
              Rr(a),
              vt(a, we, u))
            : ((e.lanes & t) !== 0 && (Pi(e, a), bo(a, null, null, t), yo()),
              (u = e.memoizedState),
              (o = a.memoizedState),
              u.parent !== l
                ? ((u = { parent: l, cache: l }),
                  (a.memoizedState = u),
                  a.lanes === 0 &&
                    (a.memoizedState = a.updateQueue.baseState = u),
                  vt(a, we, l))
                : ((l = o.cache),
                  vt(a, we, l),
                  l !== u.cache && Hi(a, [we], t, !0))),
          qe(e, a, a.pendingProps.children, t),
          a.child
        );
      case 29:
        throw a.pendingProps;
    }
    throw Error(v(156, a.tag));
  }
  function Ja(e) {
    e.flags |= 4;
  }
  function di(e, a, t, l, u) {
    if (((a = (e.mode & 32) !== 0) && (a = !1), a)) {
      if (((e.flags |= 16777216), (u & 335544128) === u))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Qg()) e.flags |= 8192;
        else throw ((sl = Ld), Br);
    } else e.flags &= -16777217;
  }
  function ip(e, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Lh(a)))
      if (Qg()) e.flags |= 8192;
      else throw ((sl = Ld), Br);
  }
  function Ff(e, a) {
    (a !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((a = e.tag !== 22 ? Kp() : 536870912), (e.lanes |= a), (yu |= a)));
  }
  function oo(e, a) {
    if (!Z)
      switch (e.tailMode) {
        case "hidden":
          a = e.tail;
          for (var t = null; a !== null;)
            (a.alternate !== null && (t = a), (a = a.sibling));
          t === null ? (e.tail = null) : (t.sibling = null);
          break;
        case "collapsed":
          t = e.tail;
          for (var l = null; t !== null;)
            (t.alternate !== null && (l = t), (t = t.sibling));
          l === null
            ? a || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function re(e) {
    var a = e.alternate !== null && e.alternate.child === e.child,
      t = 0,
      l = 0;
    if (a)
      for (var u = e.child; u !== null;)
        ((t |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags & 65011712),
          (l |= u.flags & 65011712),
          (u.return = e),
          (u = u.sibling));
    else
      for (u = e.child; u !== null;)
        ((t |= u.lanes | u.childLanes),
          (l |= u.subtreeFlags),
          (l |= u.flags),
          (u.return = e),
          (u = u.sibling));
    return ((e.subtreeFlags |= l), (e.childLanes = t), a);
  }
  function x0(e, a, t) {
    var l = a.pendingProps;
    switch ((Tr(a), a.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (re(a), null);
      case 1:
        return (re(a), null);
      case 3:
        return (
          (t = a.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          a.memoizedState.cache !== l && (a.flags |= 2048),
          dt(we),
          mu(),
          t.pendingContext &&
            ((t.context = t.pendingContext), (t.pendingContext = null)),
          (e === null || e.child === null) &&
            (Xl(a)
              ? Ja(a)
              : e === null ||
                (e.memoizedState.isDehydrated && (a.flags & 256) === 0) ||
                ((a.flags |= 1024), Wn())),
          re(a),
          null
        );
      case 26:
        var u = a.type,
          o = a.memoizedState;
        return (
          e === null
            ? (Ja(a),
              o !== null ? (re(a), ip(a, o)) : (re(a), di(a, u, null, l, t)))
            : o
              ? o !== e.memoizedState
                ? (Ja(a), re(a), ip(a, o))
                : (re(a), (a.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== l && Ja(a),
                re(a),
                di(a, u, e, l, t)),
          null
        );
      case 27:
        if (
          (sd(a),
          (t = Bt.current),
          (u = a.type),
          e !== null && a.stateNode != null)
        )
          e.memoizedProps !== l && Ja(a);
        else {
          if (!l) {
            if (a.stateNode === null) throw Error(v(166));
            return (re(a), null);
          }
          ((e = Pa.current),
            Xl(a) ? Hc(a, e) : ((e = gh(u, l, t)), (a.stateNode = e), Ja(a)));
        }
        return (re(a), null);
      case 5:
        if ((sd(a), (u = a.type), e !== null && a.stateNode != null))
          e.memoizedProps !== l && Ja(a);
        else {
          if (!l) {
            if (a.stateNode === null) throw Error(v(166));
            return (re(a), null);
          }
          if (((o = Pa.current), Xl(a))) Hc(a, o);
          else {
            var f = Bd(Bt.current);
            switch (o) {
              case 1:
                o = f.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                o = f.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    o = f.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    o = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u,
                    );
                    break;
                  case "script":
                    ((o = f.createElement("div")),
                      (o.innerHTML = "<script><\/script>"),
                      (o = o.removeChild(o.firstChild)));
                    break;
                  case "select":
                    ((o =
                      typeof l.is == "string"
                        ? f.createElement("select", { is: l.is })
                        : f.createElement("select")),
                      l.multiple
                        ? (o.multiple = !0)
                        : l.size && (o.size = l.size));
                    break;
                  default:
                    o =
                      typeof l.is == "string"
                        ? f.createElement(u, { is: l.is })
                        : f.createElement(u);
                }
            }
            ((o[He] = a), (o[We] = l));
            e: for (f = a.child; f !== null;) {
              if (f.tag === 5 || f.tag === 6) o.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === a) break e;
              for (; f.sibling === null;) {
                if (f.return === null || f.return === a) break e;
                f = f.return;
              }
              ((f.sibling.return = f.return), (f = f.sibling));
            }
            a.stateNode = o;
            e: switch ((Fe(o, u, l), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Ja(a);
          }
        }
        return (
          re(a),
          di(a, a.type, e === null ? null : e.memoizedProps, a.pendingProps, t),
          null
        );
      case 6:
        if (e && a.stateNode != null) e.memoizedProps !== l && Ja(a);
        else {
          if (typeof l != "string" && a.stateNode === null) throw Error(v(166));
          if (((e = Bt.current), Xl(a))) {
            if (
              ((e = a.stateNode),
              (t = a.memoizedProps),
              (l = null),
              (u = Ne),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            ((e[He] = a),
              (e = !!(
                e.nodeValue === t ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                sh(e.nodeValue, t)
              )),
              e || Gt(a, !0));
          } else
            ((e = Bd(e).createTextNode(l)), (e[He] = a), (a.stateNode = e));
        }
        return (re(a), null);
      case 31:
        if (((t = a.memoizedState), e === null || e.memoizedState !== null)) {
          if (((l = Xl(a)), t !== null)) {
            if (e === null) {
              if (!l) throw Error(v(318));
              if (
                ((e = a.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(v(557));
              e[He] = a;
            } else
              (pl(),
                (a.flags & 128) === 0 && (a.memoizedState = null),
                (a.flags |= 4));
            (re(a), (e = !1));
          } else
            ((t = Wn()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = t),
              (e = !0));
          if (!e) return a.flags & 256 ? (la(a), a) : (la(a), null);
          if ((a.flags & 128) !== 0) throw Error(v(558));
        }
        return (re(a), null);
      case 13:
        if (
          ((l = a.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = Xl(a)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(v(318));
              if (
                ((u = a.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(v(317));
              u[He] = a;
            } else
              (pl(),
                (a.flags & 128) === 0 && (a.memoizedState = null),
                (a.flags |= 4));
            (re(a), (u = !1));
          } else
            ((u = Wn()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return a.flags & 256 ? (la(a), a) : (la(a), null);
        }
        return (
          la(a),
          (a.flags & 128) !== 0
            ? ((a.lanes = t), a)
            : ((t = l !== null),
              (e = e !== null && e.memoizedState !== null),
              t &&
                ((l = a.child),
                (u = null),
                l.alternate !== null &&
                  l.alternate.memoizedState !== null &&
                  l.alternate.memoizedState.cachePool !== null &&
                  (u = l.alternate.memoizedState.cachePool.pool),
                (o = null),
                l.memoizedState !== null &&
                  l.memoizedState.cachePool !== null &&
                  (o = l.memoizedState.cachePool.pool),
                o !== u && (l.flags |= 2048)),
              t !== e && t && (a.child.flags |= 8192),
              Ff(a, a.updateQueue),
              re(a),
              null)
        );
      case 4:
        return (mu(), e === null && ts(a.stateNode.containerInfo), re(a), null);
      case 10:
        return (dt(a.type), re(a), null);
      case 19:
        if ((Oe(ye), (l = a.memoizedState), l === null)) return (re(a), null);
        if (((u = (a.flags & 128) !== 0), (o = l.rendering), o === null))
          if (u) oo(l, !1);
          else {
            if (Ce !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = a.child; e !== null;) {
                if (((o = yd(e)), o !== null)) {
                  for (
                    a.flags |= 128,
                      oo(l, !1),
                      e = o.updateQueue,
                      a.updateQueue = e,
                      Ff(a, e),
                      a.subtreeFlags = 0,
                      e = t,
                      t = a.child;
                    t !== null;
                  )
                    (Am(t, e), (t = t.sibling));
                  return (
                    de(ye, (ye.current & 1) | 2),
                    Z && at(a, l.treeForkCount),
                    a.child
                  );
                }
                e = e.sibling;
              }
            l.tail !== null &&
              fa() > Ad &&
              ((a.flags |= 128), (u = !0), oo(l, !1), (a.lanes = 4194304));
          }
        else {
          if (!u)
            if (((e = yd(o)), e !== null)) {
              if (
                ((a.flags |= 128),
                (u = !0),
                (e = e.updateQueue),
                (a.updateQueue = e),
                Ff(a, e),
                oo(l, !0),
                l.tail === null &&
                  l.tailMode === "hidden" &&
                  !o.alternate &&
                  !Z)
              )
                return (re(a), null);
            } else
              2 * fa() - l.renderingStartTime > Ad &&
                t !== 536870912 &&
                ((a.flags |= 128), (u = !0), oo(l, !1), (a.lanes = 4194304));
          l.isBackwards
            ? ((o.sibling = a.child), (a.child = o))
            : ((e = l.last),
              e !== null ? (e.sibling = o) : (a.child = o),
              (l.last = o));
        }
        return l.tail !== null
          ? ((e = l.tail),
            (l.rendering = e),
            (l.tail = e.sibling),
            (l.renderingStartTime = fa()),
            (e.sibling = null),
            (t = ye.current),
            de(ye, u ? (t & 1) | 2 : t & 1),
            Z && at(a, l.treeForkCount),
            e)
          : (re(a), null);
      case 22:
      case 23:
        return (
          la(a),
          Or(),
          (l = a.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (a.flags |= 8192)
            : l && (a.flags |= 8192),
          l
            ? (t & 536870912) !== 0 &&
              (a.flags & 128) === 0 &&
              (re(a), a.subtreeFlags & 6 && (a.flags |= 8192))
            : re(a),
          (t = a.updateQueue),
          t !== null && Ff(a, t.retryQueue),
          (t = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (t = e.memoizedState.cachePool.pool),
          (l = null),
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (l = a.memoizedState.cachePool.pool),
          l !== t && (a.flags |= 2048),
          e !== null && Oe(rl),
          null
        );
      case 24:
        return (
          (t = null),
          e !== null && (t = e.memoizedState.cache),
          a.memoizedState.cache !== t && (a.flags |= 2048),
          dt(we),
          re(a),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(v(156, a.tag));
  }
  function L0(e, a) {
    switch ((Tr(a), a.tag)) {
      case 1:
        return (
          (e = a.flags),
          e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
        );
      case 3:
        return (
          dt(we),
          mu(),
          (e = a.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((a.flags = (e & -65537) | 128), a)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (sd(a), null);
      case 31:
        if (a.memoizedState !== null) {
          if ((la(a), a.alternate === null)) throw Error(v(340));
          pl();
        }
        return (
          (e = a.flags),
          e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
        );
      case 13:
        if (
          (la(a), (e = a.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (a.alternate === null) throw Error(v(340));
          pl();
        }
        return (
          (e = a.flags),
          e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
        );
      case 19:
        return (Oe(ye), null);
      case 4:
        return (mu(), null);
      case 10:
        return (dt(a.type), null);
      case 22:
      case 23:
        return (
          la(a),
          Or(),
          e !== null && Oe(rl),
          (e = a.flags),
          e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
        );
      case 24:
        return (dt(we), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ag(e, a) {
    switch ((Tr(a), a.tag)) {
      case 3:
        (dt(we), mu());
        break;
      case 26:
      case 27:
      case 5:
        sd(a);
        break;
      case 4:
        mu();
        break;
      case 31:
        a.memoizedState !== null && la(a);
        break;
      case 13:
        la(a);
        break;
      case 19:
        Oe(ye);
        break;
      case 10:
        dt(a.type);
        break;
      case 22:
      case 23:
        (la(a), Or(), e !== null && Oe(rl));
        break;
      case 24:
        dt(we);
    }
  }
  function Ko(e, a) {
    try {
      var t = a.updateQueue,
        l = t !== null ? t.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        t = u;
        do {
          if ((t.tag & e) === e) {
            l = void 0;
            var o = t.create,
              f = t.inst;
            ((l = o()), (f.destroy = l));
          }
          t = t.next;
        } while (t !== u);
      }
    } catch (i) {
      ae(a, a.return, i);
    }
  }
  function _t(e, a, t) {
    try {
      var l = a.updateQueue,
        u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var o = u.next;
        l = o;
        do {
          if ((l.tag & e) === e) {
            var f = l.inst,
              i = f.destroy;
            if (i !== void 0) {
              ((f.destroy = void 0), (u = a));
              var r = t,
                m = i;
              try {
                m();
              } catch (C) {
                ae(u, r, C);
              }
            }
          }
          l = l.next;
        } while (l !== o);
      }
    } catch (C) {
      ae(a, a.return, C);
    }
  }
  function Mg(e) {
    var a = e.updateQueue;
    if (a !== null) {
      var t = e.stateNode;
      try {
        Um(a, t);
      } catch (l) {
        ae(e, e.return, l);
      }
    }
  }
  function Dg(e, a, t) {
    ((t.props = xl(e.type, e.memoizedProps)), (t.state = e.memoizedState));
    try {
      t.componentWillUnmount();
    } catch (l) {
      ae(e, a, l);
    }
  }
  function vo(e, a) {
    try {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof t == "function" ? (e.refCleanup = t(l)) : (t.current = l);
      }
    } catch (u) {
      ae(e, a, u);
    }
  }
  function Na(e, a) {
    var t = e.ref,
      l = e.refCleanup;
    if (t !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          ae(e, a, u);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof t == "function")
        try {
          t(null);
        } catch (u) {
          ae(e, a, u);
        }
      else t.current = null;
  }
  function Tg(e) {
    var a = e.type,
      t = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          t.autoFocus && l.focus();
          break e;
        case "img":
          t.src ? (l.src = t.src) : t.srcSet && (l.srcset = t.srcSet);
      }
    } catch (u) {
      ae(e, e.return, u);
    }
  }
  function ni(e, a, t) {
    try {
      var l = e.stateNode;
      (H0(l, e.type, t, a), (l[We] = a));
    } catch (u) {
      ae(e, e.return, u);
    }
  }
  function kg(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Yt(e.type)) ||
      e.tag === 4
    );
  }
  function ii(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || kg(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Yt(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ji(e, a, t) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode),
        a
          ? (t.nodeType === 9
              ? t.body
              : t.nodeName === "HTML"
                ? t.ownerDocument.body
                : t
            ).insertBefore(e, a)
          : ((a =
              t.nodeType === 9
                ? t.body
                : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t),
            a.appendChild(e),
            (t = t._reactRootContainer),
            t != null || a.onclick !== null || (a.onclick = ut)));
    else if (
      l !== 4 &&
      (l === 27 && Yt(e.type) && ((t = e.stateNode), (a = null)),
      (e = e.child),
      e !== null)
    )
      for (Ji(e, a, t), e = e.sibling; e !== null;)
        (Ji(e, a, t), (e = e.sibling));
  }
  function wd(e, a, t) {
    var l = e.tag;
    if (l === 5 || l === 6)
      ((e = e.stateNode), a ? t.insertBefore(e, a) : t.appendChild(e));
    else if (
      l !== 4 &&
      (l === 27 && Yt(e.type) && (t = e.stateNode), (e = e.child), e !== null)
    )
      for (wd(e, a, t), e = e.sibling; e !== null;)
        (wd(e, a, t), (e = e.sibling));
  }
  function zg(e) {
    var a = e.stateNode,
      t = e.memoizedProps;
    try {
      for (var l = e.type, u = a.attributes; u.length;)
        a.removeAttributeNode(u[0]);
      (Fe(a, l, t), (a[He] = e), (a[We] = t));
    } catch (o) {
      ae(e, e.return, o);
    }
  }
  var tt = !1,
    Ie = !1,
    ri = !1,
    rp = typeof WeakSet == "function" ? WeakSet : Set,
    Be = null;
  function C0(e, a) {
    if (((e = e.containerInfo), (ur = Ud), (e = Lm(e)), Ir(e))) {
      if ("selectionStart" in e)
        var t = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          t = ((t = e.ownerDocument) && t.defaultView) || window;
          var l = t.getSelection && t.getSelection();
          if (l && l.rangeCount !== 0) {
            t = l.anchorNode;
            var u = l.anchorOffset,
              o = l.focusNode;
            l = l.focusOffset;
            try {
              (t.nodeType, o.nodeType);
            } catch {
              t = null;
              break e;
            }
            var f = 0,
              i = -1,
              r = -1,
              m = 0,
              C = 0,
              b = e,
              h = null;
            a: for (;;) {
              for (
                var x;
                b !== t || (u !== 0 && b.nodeType !== 3) || (i = f + u),
                  b !== o || (l !== 0 && b.nodeType !== 3) || (r = f + l),
                  b.nodeType === 3 && (f += b.nodeValue.length),
                  (x = b.firstChild) !== null;
              )
                ((h = b), (b = x));
              for (;;) {
                if (b === e) break a;
                if (
                  (h === t && ++m === u && (i = f),
                  h === o && ++C === l && (r = f),
                  (x = b.nextSibling) !== null)
                )
                  break;
                ((b = h), (h = b.parentNode));
              }
              b = x;
            }
            t = i === -1 || r === -1 ? null : { start: i, end: r };
          } else t = null;
        }
      t = t || { start: 0, end: 0 };
    } else t = null;
    for (
      or = { focusedElem: e, selectionRange: t }, Ud = !1, Be = a;
      Be !== null;
    )
      if (
        ((a = Be), (e = a.child), (a.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = a), (Be = e));
      else
        for (; Be !== null;) {
          switch (((a = Be), (o = a.alternate), (e = a.flags), a.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = a.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (t = 0; t < e.length; t++)
                  ((u = e[t]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && o !== null) {
                ((e = void 0),
                  (t = a),
                  (u = o.memoizedProps),
                  (o = o.memoizedState),
                  (l = t.stateNode));
                try {
                  var D = xl(t.type, u);
                  ((e = l.getSnapshotBeforeUpdate(D, o)),
                    (l.__reactInternalSnapshotBeforeUpdate = e));
                } catch (z) {
                  ae(t, t.return, z);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = a.stateNode.containerInfo), (t = e.nodeType), t === 9)
                )
                  dr(e);
                else if (t === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      dr(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(v(163));
          }
          if (((e = a.sibling), e !== null)) {
            ((e.return = a.return), (Be = e));
            break;
          }
          Be = a.return;
        }
  }
  function Bg(e, a, t) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ($a(e, t), l & 4 && Ko(5, t));
        break;
      case 1:
        if (($a(e, t), l & 4))
          if (((e = t.stateNode), a === null))
            try {
              e.componentDidMount();
            } catch (f) {
              ae(t, t.return, f);
            }
          else {
            var u = xl(t.type, a.memoizedProps);
            a = a.memoizedState;
            try {
              e.componentDidUpdate(u, a, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              ae(t, t.return, f);
            }
          }
        (l & 64 && Mg(t), l & 512 && vo(t, t.return));
        break;
      case 3:
        if (($a(e, t), l & 64 && ((e = t.updateQueue), e !== null))) {
          if (((a = null), t.child !== null))
            switch (t.child.tag) {
              case 27:
              case 5:
                a = t.child.stateNode;
                break;
              case 1:
                a = t.child.stateNode;
            }
          try {
            Um(e, a);
          } catch (f) {
            ae(t, t.return, f);
          }
        }
        break;
      case 27:
        a === null && l & 4 && zg(t);
      case 26:
      case 5:
        ($a(e, t), a === null && l & 4 && Tg(t), l & 512 && vo(t, t.return));
        break;
      case 12:
        $a(e, t);
        break;
      case 31:
        ($a(e, t), l & 4 && Eg(e, t));
        break;
      case 13:
        ($a(e, t),
          l & 4 && Ug(e, t),
          l & 64 &&
            ((e = t.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((t = D0.bind(null, t)), Y0(e, t)))));
        break;
      case 22:
        if (((l = t.memoizedState !== null || tt), !l)) {
          ((a = (a !== null && a.memoizedState !== null) || Ie), (u = tt));
          var o = Ie;
          ((tt = l),
            (Ie = a) && !o ? et(e, t, (t.subtreeFlags & 8772) !== 0) : $a(e, t),
            (tt = u),
            (Ie = o));
        }
        break;
      case 30:
        break;
      default:
        $a(e, t);
    }
  }
  function Rg(e) {
    var a = e.alternate;
    (a !== null && ((e.alternate = null), Rg(a)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((a = e.stateNode), a !== null && Lr(a)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var ge = null,
    Qe = !1;
  function Wa(e, a, t) {
    for (t = t.child; t !== null;) (Og(e, a, t), (t = t.sibling));
  }
  function Og(e, a, t) {
    if (da && typeof da.onCommitFiberUnmount == "function")
      try {
        da.onCommitFiberUnmount(_o, t);
      } catch {}
    switch (t.tag) {
      case 26:
        (Ie || Na(t, a),
          Wa(e, a, t),
          t.memoizedState
            ? t.memoizedState.count--
            : t.stateNode && ((t = t.stateNode), t.parentNode.removeChild(t)));
        break;
      case 27:
        Ie || Na(t, a);
        var l = ge,
          u = Qe;
        (Yt(t.type) && ((ge = t.stateNode), (Qe = !1)),
          Wa(e, a, t),
          Mo(t.stateNode),
          (ge = l),
          (Qe = u));
        break;
      case 5:
        Ie || Na(t, a);
      case 6:
        if (
          ((l = ge),
          (u = Qe),
          (ge = null),
          Wa(e, a, t),
          (ge = l),
          (Qe = u),
          ge !== null)
        )
          if (Qe)
            try {
              (ge.nodeType === 9
                ? ge.body
                : ge.nodeName === "HTML"
                  ? ge.ownerDocument.body
                  : ge
              ).removeChild(t.stateNode);
            } catch (o) {
              ae(t, a, o);
            }
          else
            try {
              ge.removeChild(t.stateNode);
            } catch (o) {
              ae(t, a, o);
            }
        break;
      case 18:
        ge !== null &&
          (Qe
            ? ((e = ge),
              wp(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                t.stateNode,
              ),
              Iu(e))
            : wp(ge, t.stateNode));
        break;
      case 4:
        ((l = ge),
          (u = Qe),
          (ge = t.stateNode.containerInfo),
          (Qe = !0),
          Wa(e, a, t),
          (ge = l),
          (Qe = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (_t(2, t, a), Ie || _t(4, t, a), Wa(e, a, t));
        break;
      case 1:
        (Ie ||
          (Na(t, a),
          (l = t.stateNode),
          typeof l.componentWillUnmount == "function" && Dg(t, a, l)),
          Wa(e, a, t));
        break;
      case 21:
        Wa(e, a, t);
        break;
      case 22:
        ((Ie = (l = Ie) || t.memoizedState !== null), Wa(e, a, t), (Ie = l));
        break;
      default:
        Wa(e, a, t);
    }
  }
  function Eg(e, a) {
    if (
      a.memoizedState === null &&
      ((e = a.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Iu(e);
      } catch (t) {
        ae(a, a.return, t);
      }
    }
  }
  function Ug(e, a) {
    if (
      a.memoizedState === null &&
      ((e = a.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Iu(e);
      } catch (t) {
        ae(a, a.return, t);
      }
  }
  function y0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var a = e.stateNode;
        return (a === null && (a = e.stateNode = new rp()), a);
      case 22:
        return (
          (e = e.stateNode),
          (a = e._retryCache),
          a === null && (a = e._retryCache = new rp()),
          a
        );
      default:
        throw Error(v(435, e.tag));
    }
  }
  function Gf(e, a) {
    var t = y0(e);
    a.forEach(function (l) {
      if (!t.has(l)) {
        t.add(l);
        var u = T0.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function je(e, a) {
    var t = a.deletions;
    if (t !== null)
      for (var l = 0; l < t.length; l++) {
        var u = t[l],
          o = e,
          f = a,
          i = f;
        e: for (; i !== null;) {
          switch (i.tag) {
            case 27:
              if (Yt(i.type)) {
                ((ge = i.stateNode), (Qe = !1));
                break e;
              }
              break;
            case 5:
              ((ge = i.stateNode), (Qe = !1));
              break e;
            case 3:
            case 4:
              ((ge = i.stateNode.containerInfo), (Qe = !0));
              break e;
          }
          i = i.return;
        }
        if (ge === null) throw Error(v(160));
        (Og(o, f, u),
          (ge = null),
          (Qe = !1),
          (o = u.alternate),
          o !== null && (o.return = null),
          (u.return = null));
      }
    if (a.subtreeFlags & 13886)
      for (a = a.child; a !== null;) (qg(a, e), (a = a.sibling));
  }
  var Ba = null;
  function qg(e, a) {
    var t = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (je(a, e),
          Ze(e),
          l & 4 && (_t(3, e, e.return), Ko(3, e), _t(5, e, e.return)));
        break;
      case 1:
        (je(a, e),
          Ze(e),
          l & 512 && (Ie || t === null || Na(t, t.return)),
          l & 64 &&
            tt &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((t = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = t === null ? l : t.concat(l))))));
        break;
      case 26:
        var u = Ba;
        if (
          (je(a, e),
          Ze(e),
          l & 512 && (Ie || t === null || Na(t, t.return)),
          l & 4)
        ) {
          var o = t !== null ? t.memoizedState : null;
          if (((l = e.memoizedState), t === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  ((l = e.type),
                    (t = e.memoizedProps),
                    (u = u.ownerDocument || u));
                  a: switch (l) {
                    case "title":
                      ((o = u.getElementsByTagName("title")[0]),
                        (!o ||
                          o[Yo] ||
                          o[He] ||
                          o.namespaceURI === "http://www.w3.org/2000/svg" ||
                          o.hasAttribute("itemprop")) &&
                          ((o = u.createElement(l)),
                          u.head.insertBefore(
                            o,
                            u.querySelector("head > title"),
                          )),
                        Fe(o, l, t),
                        (o[He] = e),
                        Re(o),
                        (l = o));
                      break e;
                    case "link":
                      var f = Bp("link", "href", u).get(l + (t.href || ""));
                      if (f) {
                        for (var i = 0; i < f.length; i++)
                          if (
                            ((o = f[i]),
                            o.getAttribute("href") ===
                              (t.href == null || t.href === ""
                                ? null
                                : t.href) &&
                              o.getAttribute("rel") ===
                                (t.rel == null ? null : t.rel) &&
                              o.getAttribute("title") ===
                                (t.title == null ? null : t.title) &&
                              o.getAttribute("crossorigin") ===
                                (t.crossOrigin == null ? null : t.crossOrigin))
                          ) {
                            f.splice(i, 1);
                            break a;
                          }
                      }
                      ((o = u.createElement(l)),
                        Fe(o, l, t),
                        u.head.appendChild(o));
                      break;
                    case "meta":
                      if (
                        (f = Bp("meta", "content", u).get(
                          l + (t.content || ""),
                        ))
                      ) {
                        for (i = 0; i < f.length; i++)
                          if (
                            ((o = f[i]),
                            o.getAttribute("content") ===
                              (t.content == null ? null : "" + t.content) &&
                              o.getAttribute("name") ===
                                (t.name == null ? null : t.name) &&
                              o.getAttribute("property") ===
                                (t.property == null ? null : t.property) &&
                              o.getAttribute("http-equiv") ===
                                (t.httpEquiv == null ? null : t.httpEquiv) &&
                              o.getAttribute("charset") ===
                                (t.charSet == null ? null : t.charSet))
                          ) {
                            f.splice(i, 1);
                            break a;
                          }
                      }
                      ((o = u.createElement(l)),
                        Fe(o, l, t),
                        u.head.appendChild(o));
                      break;
                    default:
                      throw Error(v(468, l));
                  }
                  ((o[He] = e), Re(o), (l = o));
                }
                e.stateNode = l;
              } else Rp(u, e.type, e.stateNode);
            else e.stateNode = zp(u, l, e.memoizedProps);
          else
            o !== l
              ? (o === null
                  ? t.stateNode !== null &&
                    ((t = t.stateNode), t.parentNode.removeChild(t))
                  : o.count--,
                l === null
                  ? Rp(u, e.type, e.stateNode)
                  : zp(u, l, e.memoizedProps))
              : l === null &&
                e.stateNode !== null &&
                ni(e, e.memoizedProps, t.memoizedProps);
        }
        break;
      case 27:
        (je(a, e),
          Ze(e),
          l & 512 && (Ie || t === null || Na(t, t.return)),
          t !== null && l & 4 && ni(e, e.memoizedProps, t.memoizedProps));
        break;
      case 5:
        if (
          (je(a, e),
          Ze(e),
          l & 512 && (Ie || t === null || Na(t, t.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            hu(u, "");
          } catch (D) {
            ae(e, e.return, D);
          }
        }
        (l & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), ni(e, u, t !== null ? t.memoizedProps : u)),
          l & 1024 && (ri = !0));
        break;
      case 6:
        if ((je(a, e), Ze(e), l & 4)) {
          if (e.stateNode === null) throw Error(v(162));
          ((l = e.memoizedProps), (t = e.stateNode));
          try {
            t.nodeValue = l;
          } catch (D) {
            ae(e, e.return, D);
          }
        }
        break;
      case 3:
        if (
          ((fd = null),
          (u = Ba),
          (Ba = Rd(a.containerInfo)),
          je(a, e),
          (Ba = u),
          Ze(e),
          l & 4 && t !== null && t.memoizedState.isDehydrated)
        )
          try {
            Iu(a.containerInfo);
          } catch (D) {
            ae(e, e.return, D);
          }
        ri && ((ri = !1), Hg(e));
        break;
      case 4:
        ((l = Ba),
          (Ba = Rd(e.stateNode.containerInfo)),
          je(a, e),
          Ze(e),
          (Ba = l));
        break;
      case 12:
        (je(a, e), Ze(e));
        break;
      case 31:
        (je(a, e),
          Ze(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Gf(e, l))));
        break;
      case 13:
        (je(a, e),
          Ze(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (t !== null && t.memoizedState !== null) &&
            (Qd = fa()),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Gf(e, l))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var r = t !== null && t.memoizedState !== null,
          m = tt,
          C = Ie;
        if (
          ((tt = m || u),
          (Ie = C || r),
          je(a, e),
          (Ie = C),
          (tt = m),
          Ze(e),
          l & 8192)
        )
          e: for (
            a = e.stateNode,
              a._visibility = u ? a._visibility & -2 : a._visibility | 1,
              u && (t === null || r || tt || Ie || dl(e)),
              t = null,
              a = e;
            ;
          ) {
            if (a.tag === 5 || a.tag === 26) {
              if (t === null) {
                r = t = a;
                try {
                  if (((o = r.stateNode), u))
                    ((f = o.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none"));
                  else {
                    i = r.stateNode;
                    var b = r.memoizedProps.style,
                      h =
                        b != null && b.hasOwnProperty("display")
                          ? b.display
                          : null;
                    i.style.display =
                      h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (D) {
                  ae(r, r.return, D);
                }
              }
            } else if (a.tag === 6) {
              if (t === null) {
                r = a;
                try {
                  r.stateNode.nodeValue = u ? "" : r.memoizedProps;
                } catch (D) {
                  ae(r, r.return, D);
                }
              }
            } else if (a.tag === 18) {
              if (t === null) {
                r = a;
                try {
                  var x = r.stateNode;
                  u ? Ap(x, !0) : Ap(r.stateNode, !1);
                } catch (D) {
                  ae(r, r.return, D);
                }
              }
            } else if (
              ((a.tag !== 22 && a.tag !== 23) ||
                a.memoizedState === null ||
                a === e) &&
              a.child !== null
            ) {
              ((a.child.return = a), (a = a.child));
              continue;
            }
            if (a === e) break e;
            for (; a.sibling === null;) {
              if (a.return === null || a.return === e) break e;
              (t === a && (t = null), (a = a.return));
            }
            (t === a && (t = null),
              (a.sibling.return = a.return),
              (a = a.sibling));
          }
        l & 4 &&
          ((l = e.updateQueue),
          l !== null &&
            ((t = l.retryQueue),
            t !== null && ((l.retryQueue = null), Gf(e, t))));
        break;
      case 19:
        (je(a, e),
          Ze(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Gf(e, l))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (je(a, e), Ze(e));
    }
  }
  function Ze(e) {
    var a = e.flags;
    if (a & 2) {
      try {
        for (var t, l = e.return; l !== null;) {
          if (kg(l)) {
            t = l;
            break;
          }
          l = l.return;
        }
        if (t == null) throw Error(v(160));
        switch (t.tag) {
          case 27:
            var u = t.stateNode,
              o = ii(e);
            wd(e, o, u);
            break;
          case 5:
            var f = t.stateNode;
            t.flags & 32 && (hu(f, ""), (t.flags &= -33));
            var i = ii(e);
            wd(e, i, f);
            break;
          case 3:
          case 4:
            var r = t.stateNode.containerInfo,
              m = ii(e);
            Ji(e, m, r);
            break;
          default:
            throw Error(v(161));
        }
      } catch (C) {
        ae(e, e.return, C);
      }
      e.flags &= -3;
    }
    a & 4096 && (e.flags &= -4097);
  }
  function Hg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null;) {
        var a = e;
        (Hg(a),
          a.tag === 5 && a.flags & 1024 && a.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function $a(e, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null;) (Bg(e, a.alternate, a), (a = a.sibling));
  }
  function dl(e) {
    for (e = e.child; e !== null;) {
      var a = e;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (_t(4, a, a.return), dl(a));
          break;
        case 1:
          Na(a, a.return);
          var t = a.stateNode;
          (typeof t.componentWillUnmount == "function" && Dg(a, a.return, t),
            dl(a));
          break;
        case 27:
          Mo(a.stateNode);
        case 26:
        case 5:
          (Na(a, a.return), dl(a));
          break;
        case 22:
          a.memoizedState === null && dl(a);
          break;
        case 30:
          dl(a);
          break;
        default:
          dl(a);
      }
      e = e.sibling;
    }
  }
  function et(e, a, t) {
    for (t = t && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null;) {
      var l = a.alternate,
        u = e,
        o = a,
        f = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          (et(u, o, t), Ko(4, o));
          break;
        case 1:
          if (
            (et(u, o, t),
            (l = o),
            (u = l.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (m) {
              ae(l, l.return, m);
            }
          if (((l = o), (u = l.updateQueue), u !== null)) {
            var i = l.stateNode;
            try {
              var r = u.shared.hiddenCallbacks;
              if (r !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < r.length; u++)
                  Em(r[u], i);
            } catch (m) {
              ae(l, l.return, m);
            }
          }
          (t && f & 64 && Mg(o), vo(o, o.return));
          break;
        case 27:
          zg(o);
        case 26:
        case 5:
          (et(u, o, t), t && l === null && f & 4 && Tg(o), vo(o, o.return));
          break;
        case 12:
          et(u, o, t);
          break;
        case 31:
          (et(u, o, t), t && f & 4 && Eg(u, o));
          break;
        case 13:
          (et(u, o, t), t && f & 4 && Ug(u, o));
          break;
        case 22:
          (o.memoizedState === null && et(u, o, t), vo(o, o.return));
          break;
        case 30:
          break;
        default:
          et(u, o, t);
      }
      a = a.sibling;
    }
  }
  function Kr(e, a) {
    var t = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (t = e.memoizedState.cachePool.pool),
      (e = null),
      a.memoizedState !== null &&
        a.memoizedState.cachePool !== null &&
        (e = a.memoizedState.cachePool.pool),
      e !== t && (e != null && e.refCount++, t != null && Zo(t)));
  }
  function Jr(e, a) {
    ((e = null),
      a.alternate !== null && (e = a.alternate.memoizedState.cache),
      (a = a.memoizedState.cache),
      a !== e && (a.refCount++, e != null && Zo(e)));
  }
  function za(e, a, t, l) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null;) (Ng(e, a, t, l), (a = a.sibling));
  }
  function Ng(e, a, t, l) {
    var u = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (za(e, a, t, l), u & 2048 && Ko(9, a));
        break;
      case 1:
        za(e, a, t, l);
        break;
      case 3:
        (za(e, a, t, l),
          u & 2048 &&
            ((e = null),
            a.alternate !== null && (e = a.alternate.memoizedState.cache),
            (a = a.memoizedState.cache),
            a !== e && (a.refCount++, e != null && Zo(e))));
        break;
      case 12:
        if (u & 2048) {
          (za(e, a, t, l), (e = a.stateNode));
          try {
            var o = a.memoizedProps,
              f = o.id,
              i = o.onPostCommit;
            typeof i == "function" &&
              i(
                f,
                a.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (r) {
            ae(a, a.return, r);
          }
        } else za(e, a, t, l);
        break;
      case 31:
        za(e, a, t, l);
        break;
      case 13:
        za(e, a, t, l);
        break;
      case 23:
        break;
      case 22:
        ((o = a.stateNode),
          (f = a.alternate),
          a.memoizedState !== null
            ? o._visibility & 2
              ? za(e, a, t, l)
              : Io(e, a)
            : o._visibility & 2
              ? za(e, a, t, l)
              : ((o._visibility |= 2),
                jl(e, a, t, l, (a.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Kr(f, a));
        break;
      case 24:
        (za(e, a, t, l), u & 2048 && Jr(a.alternate, a));
        break;
      default:
        za(e, a, t, l);
    }
  }
  function jl(e, a, t, l, u) {
    for (
      u = u && ((a.subtreeFlags & 10256) !== 0 || !1), a = a.child;
      a !== null;
    ) {
      var o = e,
        f = a,
        i = t,
        r = l,
        m = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (jl(o, f, i, r, u), Ko(8, f));
          break;
        case 23:
          break;
        case 22:
          var C = f.stateNode;
          (f.memoizedState !== null
            ? C._visibility & 2
              ? jl(o, f, i, r, u)
              : Io(o, f)
            : ((C._visibility |= 2), jl(o, f, i, r, u)),
            u && m & 2048 && Kr(f.alternate, f));
          break;
        case 24:
          (jl(o, f, i, r, u), u && m & 2048 && Jr(f.alternate, f));
          break;
        default:
          jl(o, f, i, r, u);
      }
      a = a.sibling;
    }
  }
  function Io(e, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null;) {
        var t = e,
          l = a,
          u = l.flags;
        switch (l.tag) {
          case 22:
            (Io(t, l), u & 2048 && Kr(l.alternate, l));
            break;
          case 24:
            (Io(t, l), u & 2048 && Jr(l.alternate, l));
            break;
          default:
            Io(t, l);
        }
        a = a.sibling;
      }
  }
  var mo = 8192;
  function Yl(e, a, t) {
    if (e.subtreeFlags & mo)
      for (e = e.child; e !== null;) (Pg(e, a, t), (e = e.sibling));
  }
  function Pg(e, a, t) {
    switch (e.tag) {
      case 26:
        (Yl(e, a, t),
          e.flags & mo &&
            e.memoizedState !== null &&
            u1(t, Ba, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Yl(e, a, t);
        break;
      case 3:
      case 4:
        var l = Ba;
        ((Ba = Rd(e.stateNode.containerInfo)), Yl(e, a, t), (Ba = l));
        break;
      case 22:
        e.memoizedState === null &&
          ((l = e.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = mo), (mo = 16777216), Yl(e, a, t), (mo = l))
            : Yl(e, a, t));
        break;
      default:
        Yl(e, a, t);
    }
  }
  function Fg(e) {
    var a = e.alternate;
    if (a !== null && ((e = a.child), e !== null)) {
      a.child = null;
      do ((a = e.sibling), (e.sibling = null), (e = a));
      while (e !== null);
    }
  }
  function fo(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var t = 0; t < a.length; t++) {
          var l = a[t];
          ((Be = l), _g(l, e));
        }
      Fg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null;) (Gg(e), (e = e.sibling));
  }
  function Gg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (fo(e), e.flags & 2048 && _t(9, e, e.return));
        break;
      case 3:
        fo(e);
        break;
      case 12:
        fo(e);
        break;
      case 22:
        var a = e.stateNode;
        e.memoizedState !== null &&
        a._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((a._visibility &= -3), ud(e))
          : fo(e);
        break;
      default:
        fo(e);
    }
  }
  function ud(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var t = 0; t < a.length; t++) {
          var l = a[t];
          ((Be = l), _g(l, e));
        }
      Fg(e);
    }
    for (e = e.child; e !== null;) {
      switch (((a = e), a.tag)) {
        case 0:
        case 11:
        case 15:
          (_t(8, a, a.return), ud(a));
          break;
        case 22:
          ((t = a.stateNode),
            t._visibility & 2 && ((t._visibility &= -3), ud(a)));
          break;
        default:
          ud(a);
      }
      e = e.sibling;
    }
  }
  function _g(e, a) {
    for (; Be !== null;) {
      var t = Be;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          _t(8, t, a);
          break;
        case 23:
        case 22:
          if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
            var l = t.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Zo(t.memoizedState.cache);
      }
      if (((l = t.child), l !== null)) ((l.return = t), (Be = l));
      else
        e: for (t = e; Be !== null;) {
          l = Be;
          var u = l.sibling,
            o = l.return;
          if ((Rg(l), l === t)) {
            Be = null;
            break e;
          }
          if (u !== null) {
            ((u.return = o), (Be = u));
            break e;
          }
          Be = o;
        }
    }
  }
  var b0 = {
      getCacheForType: function (e) {
        var a = Pe(we),
          t = a.data.get(e);
        return (t === void 0 && ((t = e()), a.data.set(e, t)), t);
      },
      cacheSignal: function () {
        return Pe(we).controller.signal;
      },
    },
    S0 = typeof WeakMap == "function" ? WeakMap : Map,
    K = 0,
    fe = null,
    X = null,
    j = 0,
    ee = 0,
    ta = null,
    Tt = !1,
    Tu = !1,
    Wr = !1,
    pt = 0,
    Ce = 0,
    Vt = 0,
    cl = 0,
    $r = 0,
    oa = 0,
    yu = 0,
    wo = null,
    Ke = null,
    Wi = !1,
    Qd = 0,
    Vg = 0,
    Ad = 1 / 0,
    Md = null,
    Ut = null,
    ke = 0,
    qt = null,
    bu = null,
    nt = 0,
    $i = 0,
    er = null,
    Xg = null,
    Ao = 0,
    ar = null;
  function ia() {
    return (K & 2) !== 0 && j !== 0 ? j & -j : E.T !== null ? as() : em();
  }
  function Yg() {
    if (oa === 0)
      if ((j & 536870912) === 0 || Z) {
        var e = Bf;
        ((Bf <<= 1), (Bf & 3932160) === 0 && (Bf = 262144), (oa = e));
      } else oa = 536870912;
    return ((e = sa.current), e !== null && (e.flags |= 32), oa);
  }
  function Je(e, a, t) {
    (((e === fe && (ee === 2 || ee === 9)) || e.cancelPendingCommit !== null) &&
      (Su(e, 0), kt(e, j, oa, !1)),
      Xo(e, t),
      ((K & 2) === 0 || e !== fe) &&
        (e === fe && ((K & 2) === 0 && (cl |= t), Ce === 4 && kt(e, j, oa, !1)),
        Ga(e)));
  }
  function jg(e, a, t) {
    if ((K & 6) !== 0) throw Error(v(327));
    var l = (!t && (a & 127) === 0 && (a & e.expiredLanes) === 0) || Vo(e, a),
      u = l ? w0(e, a) : si(e, a, !0),
      o = l;
    do {
      if (u === 0) {
        Tu && !l && kt(e, a, 0, !1);
        break;
      } else {
        if (((t = e.current.alternate), o && !v0(t))) {
          ((u = si(e, a, !1)), (o = !1));
          continue;
        }
        if (u === 2) {
          if (((o = a), e.errorRecoveryDisabledLanes & o)) var f = 0;
          else
            ((f = e.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            a = f;
            e: {
              var i = e;
              u = wo;
              var r = i.current.memoizedState.isDehydrated;
              if ((r && (Su(i, f).flags |= 256), (f = si(i, f, !1)), f !== 2)) {
                if (Wr && !r) {
                  ((i.errorRecoveryDisabledLanes |= o), (cl |= o), (u = 4));
                  break e;
                }
                ((o = Ke),
                  (Ke = u),
                  o !== null &&
                    (Ke === null ? (Ke = o) : Ke.push.apply(Ke, o)));
              }
              u = f;
            }
            if (((o = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Su(e, 0), kt(e, a, 0, !0));
          break;
        }
        e: {
          switch (((l = e), (o = u), o)) {
            case 0:
            case 1:
              throw Error(v(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              kt(l, a, oa, !Tt);
              break e;
            case 2:
              Ke = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(v(329));
          }
          if ((a & 62914560) === a && ((u = Qd + 300 - fa()), 10 < u)) {
            if ((kt(l, a, oa, !Tt), Hd(l, 0, !0) !== 0)) break e;
            ((nt = a),
              (l.timeoutHandle = ph(
                sp.bind(
                  null,
                  l,
                  t,
                  Ke,
                  Md,
                  Wi,
                  a,
                  oa,
                  cl,
                  yu,
                  Tt,
                  o,
                  "Throttled",
                  -0,
                  0,
                ),
                u,
              )));
            break e;
          }
          sp(l, t, Ke, Md, Wi, a, oa, cl, yu, Tt, o, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ga(e);
  }
  function sp(e, a, t, l, u, o, f, i, r, m, C, b, h, x) {
    if (
      ((e.timeoutHandle = -1),
      (b = a.subtreeFlags),
      b & 8192 || (b & 16785408) === 16785408)
    ) {
      ((b = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ut,
      }),
        Pg(a, o, b));
      var D =
        (o & 62914560) === o ? Qd - fa() : (o & 4194048) === o ? Vg - fa() : 0;
      if (((D = o1(b, D)), D !== null)) {
        ((nt = o),
          (e.cancelPendingCommit = D(
            pp.bind(null, e, a, o, t, l, u, f, i, r, C, b, null, h, x),
          )),
          kt(e, o, f, !m));
        return;
      }
    }
    pp(e, a, o, t, l, u, f, i, r);
  }
  function v0(e) {
    for (var a = e; ;) {
      var t = a.tag;
      if (
        (t === 0 || t === 11 || t === 15) &&
        a.flags & 16384 &&
        ((t = a.updateQueue), t !== null && ((t = t.stores), t !== null))
      )
        for (var l = 0; l < t.length; l++) {
          var u = t[l],
            o = u.getSnapshot;
          u = u.value;
          try {
            if (!ra(o(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((t = a.child), a.subtreeFlags & 16384 && t !== null))
        ((t.return = a), (a = t));
      else {
        if (a === e) break;
        for (; a.sibling === null;) {
          if (a.return === null || a.return === e) return !0;
          a = a.return;
        }
        ((a.sibling.return = a.return), (a = a.sibling));
      }
    }
    return !0;
  }
  function kt(e, a, t, l) {
    ((a &= ~$r),
      (a &= ~cl),
      (e.suspendedLanes |= a),
      (e.pingedLanes &= ~a),
      l && (e.warmLanes |= a),
      (l = e.expirationTimes));
    for (var u = a; 0 < u;) {
      var o = 31 - na(u),
        f = 1 << o;
      ((l[o] = -1), (u &= ~f));
    }
    t !== 0 && Jp(e, t, a);
  }
  function Kd() {
    return (K & 6) === 0 ? (Jo(0, !1), !1) : !0;
  }
  function es() {
    if (X !== null) {
      if (ee === 0) var e = X.return;
      else ((e = X), (ot = Sl = null), Nr(e), (su = null), (Oo = 0), (e = X));
      for (; e !== null;) (Ag(e.alternate, e), (e = e.return));
      X = null;
    }
  }
  function Su(e, a) {
    var t = e.timeoutHandle;
    (t !== -1 && ((e.timeoutHandle = -1), F0(t)),
      (t = e.cancelPendingCommit),
      t !== null && ((e.cancelPendingCommit = null), t()),
      (nt = 0),
      es(),
      (fe = e),
      (X = t = ft(e.current, null)),
      (j = a),
      (ee = 0),
      (ta = null),
      (Tt = !1),
      (Tu = Vo(e, a)),
      (Wr = !1),
      (yu = oa = $r = cl = Vt = Ce = 0),
      (Ke = wo = null),
      (Wi = !1),
      (a & 8) !== 0 && (a |= a & 32));
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= a; 0 < l;) {
        var u = 31 - na(l),
          o = 1 << u;
        ((a |= e[u]), (l &= ~o));
      }
    return ((pt = a), Gd(), t);
  }
  function Zg(e, a) {
    ((N = null),
      (E.H = Uo),
      a === Du || a === Vd
        ? ((a = _c()), (ee = 3))
        : a === Br
          ? ((a = _c()), (ee = 4))
          : (ee =
              a === Zr
                ? 8
                : a !== null &&
                    typeof a == "object" &&
                    typeof a.then == "function"
                  ? 6
                  : 1),
      (ta = a),
      X === null && ((Ce = 1), vd(e, Sa(a, e.current))));
  }
  function Qg() {
    var e = sa.current;
    return e === null
      ? !0
      : (j & 4194048) === j
        ? Ia === null
        : (j & 62914560) === j || (j & 536870912) !== 0
          ? e === Ia
          : !1;
  }
  function Kg() {
    var e = E.H;
    return ((E.H = Uo), e === null ? Uo : e);
  }
  function Jg() {
    var e = E.A;
    return ((E.A = b0), e);
  }
  function Dd() {
    ((Ce = 4),
      Tt || ((j & 4194048) !== j && sa.current !== null) || (Tu = !0),
      ((Vt & 134217727) === 0 && (cl & 134217727) === 0) ||
        fe === null ||
        kt(fe, j, oa, !1));
  }
  function si(e, a, t) {
    var l = K;
    K |= 2;
    var u = Kg(),
      o = Jg();
    ((fe !== e || j !== a) && ((Md = null), Su(e, a)), (a = !1));
    var f = Ce;
    e: do
      try {
        if (ee !== 0 && X !== null) {
          var i = X,
            r = ta;
          switch (ee) {
            case 8:
              (es(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              sa.current === null && (a = !0);
              var m = ee;
              if (((ee = 0), (ta = null), fu(e, i, r, m), t && Tu)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((m = ee), (ee = 0), (ta = null), fu(e, i, r, m));
          }
        }
        (I0(), (f = Ce));
        break;
      } catch (C) {
        Zg(e, C);
      }
    while (!0);
    return (
      a && e.shellSuspendCounter++,
      (ot = Sl = null),
      (K = l),
      (E.H = u),
      (E.A = o),
      X === null && ((fe = null), (j = 0), Gd()),
      f
    );
  }
  function I0() {
    for (; X !== null;) Wg(X);
  }
  function w0(e, a) {
    var t = K;
    K |= 2;
    var l = Kg(),
      u = Jg();
    fe !== e || j !== a
      ? ((Md = null), (Ad = fa() + 500), Su(e, a))
      : (Tu = Vo(e, a));
    e: do
      try {
        if (ee !== 0 && X !== null) {
          a = X;
          var o = ta;
          a: switch (ee) {
            case 1:
              ((ee = 0), (ta = null), fu(e, a, o, 1));
              break;
            case 2:
            case 9:
              if (Gc(o)) {
                ((ee = 0), (ta = null), cp(a));
                break;
              }
              ((a = function () {
                ((ee !== 2 && ee !== 9) || fe !== e || (ee = 7), Ga(e));
              }),
                o.then(a, a));
              break e;
            case 3:
              ee = 7;
              break e;
            case 4:
              ee = 5;
              break e;
            case 7:
              Gc(o)
                ? ((ee = 0), (ta = null), cp(a))
                : ((ee = 0), (ta = null), fu(e, a, o, 7));
              break;
            case 5:
              var f = null;
              switch (X.tag) {
                case 26:
                  f = X.memoizedState;
                case 5:
                case 27:
                  var i = X;
                  if (f ? Lh(f) : i.stateNode.complete) {
                    ((ee = 0), (ta = null));
                    var r = i.sibling;
                    if (r !== null) X = r;
                    else {
                      var m = i.return;
                      m !== null ? ((X = m), Jd(m)) : (X = null);
                    }
                    break a;
                  }
              }
              ((ee = 0), (ta = null), fu(e, a, o, 5));
              break;
            case 6:
              ((ee = 0), (ta = null), fu(e, a, o, 6));
              break;
            case 8:
              (es(), (Ce = 6));
              break e;
            default:
              throw Error(v(462));
          }
        }
        A0();
        break;
      } catch (C) {
        Zg(e, C);
      }
    while (!0);
    return (
      (ot = Sl = null),
      (E.H = l),
      (E.A = u),
      (K = t),
      X !== null ? 0 : ((fe = null), (j = 0), Gd(), Ce)
    );
  }
  function A0() {
    for (; X !== null && !Qx();) Wg(X);
  }
  function Wg(e) {
    var a = wg(e.alternate, e, pt);
    ((e.memoizedProps = e.pendingProps), a === null ? Jd(e) : (X = a));
  }
  function cp(e) {
    var a = e,
      t = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = op(t, a, a.pendingProps, a.type, void 0, j);
        break;
      case 11:
        a = op(t, a, a.pendingProps, a.type.render, a.ref, j);
        break;
      case 5:
        Nr(a);
      default:
        (Ag(t, a), (a = X = Am(a, pt)), (a = wg(t, a, pt)));
    }
    ((e.memoizedProps = e.pendingProps), a === null ? Jd(e) : (X = a));
  }
  function fu(e, a, t, l) {
    ((ot = Sl = null), Nr(a), (su = null), (Oo = 0));
    var u = a.return;
    try {
      if (m0(e, u, a, t, j)) {
        ((Ce = 1), vd(e, Sa(t, e.current)), (X = null));
        return;
      }
    } catch (o) {
      if (u !== null) throw ((X = u), o);
      ((Ce = 1), vd(e, Sa(t, e.current)), (X = null));
      return;
    }
    a.flags & 32768
      ? (Z || l === 1
          ? (e = !0)
          : Tu || (j & 536870912) !== 0
            ? (e = !1)
            : ((Tt = e = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = sa.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        $g(a, e))
      : Jd(a);
  }
  function Jd(e) {
    var a = e;
    do {
      if ((a.flags & 32768) !== 0) {
        $g(a, Tt);
        return;
      }
      e = a.return;
      var t = x0(a.alternate, a, pt);
      if (t !== null) {
        X = t;
        return;
      }
      if (((a = a.sibling), a !== null)) {
        X = a;
        return;
      }
      X = a = e;
    } while (a !== null);
    Ce === 0 && (Ce = 5);
  }
  function $g(e, a) {
    do {
      var t = L0(e.alternate, e);
      if (t !== null) {
        ((t.flags &= 32767), (X = t));
        return;
      }
      if (
        ((t = e.return),
        t !== null &&
          ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null)),
        !a && ((e = e.sibling), e !== null))
      ) {
        X = e;
        return;
      }
      X = e = t;
    } while (e !== null);
    ((Ce = 6), (X = null));
  }
  function pp(e, a, t, l, u, o, f, i, r) {
    e.cancelPendingCommit = null;
    do Wd();
    while (ke !== 0);
    if ((K & 6) !== 0) throw Error(v(327));
    if (a !== null) {
      if (a === e.current) throw Error(v(177));
      if (
        ((o = a.lanes | a.childLanes),
        (o |= wr),
        oL(e, t, o, f, i, r),
        e === fe && ((X = fe = null), (j = 0)),
        (bu = a),
        (qt = e),
        (nt = t),
        ($i = o),
        (er = u),
        (Xg = l),
        (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            k0(cd, function () {
              return (uh(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (a.flags & 13878) !== 0),
        (a.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = E.T), (E.T = null), (u = J.p), (J.p = 2), (f = K), (K |= 4));
        try {
          C0(e, a, t);
        } finally {
          ((K = f), (J.p = u), (E.T = l));
        }
      }
      ((ke = 1), eh(), ah(), th());
    }
  }
  function eh() {
    if (ke === 1) {
      ke = 0;
      var e = qt,
        a = bu,
        t = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || t) {
        ((t = E.T), (E.T = null));
        var l = J.p;
        J.p = 2;
        var u = K;
        K |= 4;
        try {
          qg(a, e);
          var o = or,
            f = Lm(e.containerInfo),
            i = o.focusedElem,
            r = o.selectionRange;
          if (
            f !== i &&
            i &&
            i.ownerDocument &&
            xm(i.ownerDocument.documentElement, i)
          ) {
            if (r !== null && Ir(i)) {
              var m = r.start,
                C = r.end;
              if ((C === void 0 && (C = m), "selectionStart" in i))
                ((i.selectionStart = m),
                  (i.selectionEnd = Math.min(C, i.value.length)));
              else {
                var b = i.ownerDocument || document,
                  h = (b && b.defaultView) || window;
                if (h.getSelection) {
                  var x = h.getSelection(),
                    D = i.textContent.length,
                    z = Math.min(r.start, D),
                    P = r.end === void 0 ? z : Math.min(r.end, D);
                  !x.extend && z > P && ((f = P), (P = z), (z = f));
                  var p = Ec(i, z),
                    c = Ec(i, P);
                  if (
                    p &&
                    c &&
                    (x.rangeCount !== 1 ||
                      x.anchorNode !== p.node ||
                      x.anchorOffset !== p.offset ||
                      x.focusNode !== c.node ||
                      x.focusOffset !== c.offset)
                  ) {
                    var g = b.createRange();
                    (g.setStart(p.node, p.offset),
                      x.removeAllRanges(),
                      z > P
                        ? (x.addRange(g), x.extend(c.node, c.offset))
                        : (g.setEnd(c.node, c.offset), x.addRange(g)));
                  }
                }
              }
            }
            for (b = [], x = i; (x = x.parentNode);)
              x.nodeType === 1 &&
                b.push({ element: x, left: x.scrollLeft, top: x.scrollTop });
            for (
              typeof i.focus == "function" && i.focus(), i = 0;
              i < b.length;
              i++
            ) {
              var S = b[i];
              ((S.element.scrollLeft = S.left), (S.element.scrollTop = S.top));
            }
          }
          ((Ud = !!ur), (or = ur = null));
        } finally {
          ((K = u), (J.p = l), (E.T = t));
        }
      }
      ((e.current = a), (ke = 2));
    }
  }
  function ah() {
    if (ke === 2) {
      ke = 0;
      var e = qt,
        a = bu,
        t = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || t) {
        ((t = E.T), (E.T = null));
        var l = J.p;
        J.p = 2;
        var u = K;
        K |= 4;
        try {
          Bg(e, a.alternate, a);
        } finally {
          ((K = u), (J.p = l), (E.T = t));
        }
      }
      ke = 3;
    }
  }
  function th() {
    if (ke === 4 || ke === 3) {
      ((ke = 0), Kx());
      var e = qt,
        a = bu,
        t = nt,
        l = Xg;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0
        ? (ke = 5)
        : ((ke = 0), (bu = qt = null), lh(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (Ut = null),
        xr(t),
        (a = a.stateNode),
        da && typeof da.onCommitFiberRoot == "function")
      )
        try {
          da.onCommitFiberRoot(_o, a, void 0, (a.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        ((a = E.T), (u = J.p), (J.p = 2), (E.T = null));
        try {
          for (var o = e.onRecoverableError, f = 0; f < l.length; f++) {
            var i = l[f];
            o(i.value, { componentStack: i.stack });
          }
        } finally {
          ((E.T = a), (J.p = u));
        }
      }
      ((nt & 3) !== 0 && Wd(),
        Ga(e),
        (u = e.pendingLanes),
        (t & 261930) !== 0 && (u & 42) !== 0
          ? e === ar
            ? Ao++
            : ((Ao = 0), (ar = e))
          : (Ao = 0),
        Jo(0, !1));
    }
  }
  function lh(e, a) {
    (e.pooledCacheLanes &= a) === 0 &&
      ((a = e.pooledCache), a != null && ((e.pooledCache = null), Zo(a)));
  }
  function Wd() {
    return (eh(), ah(), th(), uh());
  }
  function uh() {
    if (ke !== 5) return !1;
    var e = qt,
      a = $i;
    $i = 0;
    var t = xr(nt),
      l = E.T,
      u = J.p;
    try {
      ((J.p = 32 > t ? 32 : t), (E.T = null), (t = er), (er = null));
      var o = qt,
        f = nt;
      if (((ke = 0), (bu = qt = null), (nt = 0), (K & 6) !== 0))
        throw Error(v(331));
      var i = K;
      if (
        ((K |= 4),
        Gg(o.current),
        Ng(o, o.current, f, t),
        (K = i),
        Jo(0, !1),
        da && typeof da.onPostCommitFiberRoot == "function")
      )
        try {
          da.onPostCommitFiberRoot(_o, o);
        } catch {}
      return !0;
    } finally {
      ((J.p = u), (E.T = l), lh(e, a));
    }
  }
  function mp(e, a, t) {
    ((a = Sa(t, a)),
      (a = Zi(e.stateNode, a, 2)),
      (e = Et(e, a, 2)),
      e !== null && (Xo(e, 2), Ga(e)));
  }
  function ae(e, a, t) {
    if (e.tag === 3) mp(e, e, t);
    else
      for (; a !== null;) {
        if (a.tag === 3) {
          mp(a, e, t);
          break;
        } else if (a.tag === 1) {
          var l = a.stateNode;
          if (
            typeof a.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (Ut === null || !Ut.has(l)))
          ) {
            ((e = Sa(t, e)),
              (t = Cg(2)),
              (l = Et(a, t, 2)),
              l !== null && (yg(t, l, a, e), Xo(l, 2), Ga(l)));
            break;
          }
        }
        a = a.return;
      }
  }
  function ci(e, a, t) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new S0();
      var u = new Set();
      l.set(a, u);
    } else ((u = l.get(a)), u === void 0 && ((u = new Set()), l.set(a, u)));
    u.has(t) ||
      ((Wr = !0), u.add(t), (e = M0.bind(null, e, a, t)), a.then(e, e));
  }
  function M0(e, a, t) {
    var l = e.pingCache;
    (l !== null && l.delete(a),
      (e.pingedLanes |= e.suspendedLanes & t),
      (e.warmLanes &= ~t),
      fe === e &&
        (j & t) === t &&
        (Ce === 4 || (Ce === 3 && (j & 62914560) === j && 300 > fa() - Qd)
          ? (K & 2) === 0 && Su(e, 0)
          : ($r |= t),
        yu === j && (yu = 0)),
      Ga(e));
  }
  function oh(e, a) {
    (a === 0 && (a = Kp()), (e = bl(e, a)), e !== null && (Xo(e, a), Ga(e)));
  }
  function D0(e) {
    var a = e.memoizedState,
      t = 0;
    (a !== null && (t = a.retryLane), oh(e, t));
  }
  function T0(e, a) {
    var t = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode,
          u = e.memoizedState;
        u !== null && (t = u.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(v(314));
    }
    (l !== null && l.delete(a), oh(e, t));
  }
  function k0(e, a) {
    return gr(e, a);
  }
  var Td = null,
    Zl = null,
    tr = !1,
    kd = !1,
    pi = !1,
    zt = 0;
  function Ga(e) {
    (e !== Zl &&
      e.next === null &&
      (Zl === null ? (Td = Zl = e) : (Zl = Zl.next = e)),
      (kd = !0),
      tr || ((tr = !0), B0()));
  }
  function Jo(e, a) {
    if (!pi && kd) {
      pi = !0;
      do
        for (var t = !1, l = Td; l !== null;) {
          if (!a)
            if (e !== 0) {
              var u = l.pendingLanes;
              if (u === 0) var o = 0;
              else {
                var f = l.suspendedLanes,
                  i = l.pingedLanes;
                ((o = (1 << (31 - na(42 | e) + 1)) - 1),
                  (o &= u & ~(f & ~i)),
                  (o = o & 201326741 ? (o & 201326741) | 1 : o ? o | 2 : 0));
              }
              o !== 0 && ((t = !0), gp(l, o));
            } else
              ((o = j),
                (o = Hd(
                  l,
                  l === fe ? o : 0,
                  l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
                )),
                (o & 3) === 0 || Vo(l, o) || ((t = !0), gp(l, o)));
          l = l.next;
        }
      while (t);
      pi = !1;
    }
  }
  function z0() {
    fh();
  }
  function fh() {
    kd = tr = !1;
    var e = 0;
    zt !== 0 && P0() && (e = zt);
    for (var a = fa(), t = null, l = Td; l !== null;) {
      var u = l.next,
        o = dh(l, a);
      (o === 0
        ? ((l.next = null),
          t === null ? (Td = u) : (t.next = u),
          u === null && (Zl = t))
        : ((t = l), (e !== 0 || (o & 3) !== 0) && (kd = !0)),
        (l = u));
    }
    ((ke !== 0 && ke !== 5) || Jo(e, !1), zt !== 0 && (zt = 0));
  }
  function dh(e, a) {
    for (
      var t = e.suspendedLanes,
        l = e.pingedLanes,
        u = e.expirationTimes,
        o = e.pendingLanes & -62914561;
      0 < o;
    ) {
      var f = 31 - na(o),
        i = 1 << f,
        r = u[f];
      (r === -1
        ? ((i & t) === 0 || (i & l) !== 0) && (u[f] = uL(i, a))
        : r <= a && (e.expiredLanes |= i),
        (o &= ~i));
    }
    if (
      ((a = fe),
      (t = j),
      (t = Hd(
        e,
        e === a ? t : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (l = e.callbackNode),
      t === 0 ||
        (e === a && (ee === 2 || ee === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && Gn(l),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((t & 3) === 0 || Vo(e, t)) {
      if (((a = t & -t), a === e.callbackPriority)) return a;
      switch ((l !== null && Gn(l), xr(t))) {
        case 2:
        case 8:
          t = Zp;
          break;
        case 32:
          t = cd;
          break;
        case 268435456:
          t = Qp;
          break;
        default:
          t = cd;
      }
      return (
        (l = nh.bind(null, e)),
        (t = gr(t, l)),
        (e.callbackPriority = a),
        (e.callbackNode = t),
        a
      );
    }
    return (
      l !== null && l !== null && Gn(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function nh(e, a) {
    if (ke !== 0 && ke !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var t = e.callbackNode;
    if (Wd() && e.callbackNode !== t) return null;
    var l = j;
    return (
      (l = Hd(
        e,
        e === fe ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      l === 0
        ? null
        : (jg(e, l, a),
          dh(e, fa()),
          e.callbackNode != null && e.callbackNode === t
            ? nh.bind(null, e)
            : null)
    );
  }
  function gp(e, a) {
    if (Wd()) return null;
    jg(e, a, !0);
  }
  function B0() {
    G0(function () {
      (K & 6) !== 0 ? gr(jp, z0) : fh();
    });
  }
  function as() {
    if (zt === 0) {
      var e = xu;
      (e === 0 && ((e = zf), (zf <<= 1), (zf & 261888) === 0 && (zf = 256)),
        (zt = e));
    }
    return zt;
  }
  function hp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Qf("" + e);
  }
  function xp(e, a) {
    var t = a.ownerDocument.createElement("input");
    return (
      (t.name = a.name),
      (t.value = a.value),
      e.id && t.setAttribute("form", e.id),
      a.parentNode.insertBefore(t, a),
      (e = new FormData(e)),
      t.parentNode.removeChild(t),
      e
    );
  }
  function R0(e, a, t, l, u) {
    if (a === "submit" && t && t.stateNode === u) {
      var o = hp((u[We] || null).action),
        f = l.submitter;
      f &&
        ((a = (a = f[We] || null)
          ? hp(a.formAction)
          : f.getAttribute("formAction")),
        a !== null && ((o = a), (f = null)));
      var i = new Nd("action", "action", null, l, u);
      e.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (zt !== 0) {
                  var r = f ? xp(u, f) : new FormData(u);
                  Yi(
                    t,
                    { pending: !0, data: r, method: u.method, action: o },
                    null,
                    r,
                  );
                }
              } else
                typeof o == "function" &&
                  (i.preventDefault(),
                  (r = f ? xp(u, f) : new FormData(u)),
                  Yi(
                    t,
                    { pending: !0, data: r, method: u.method, action: o },
                    o,
                    r,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (_f = 0; _f < Oi.length; _f++)
    ((Vf = Oi[_f]),
      (Lp = Vf.toLowerCase()),
      (Cp = Vf[0].toUpperCase() + Vf.slice(1)),
      Ra(Lp, "on" + Cp));
  var Vf, Lp, Cp, _f;
  Ra(ym, "onAnimationEnd");
  Ra(bm, "onAnimationIteration");
  Ra(Sm, "onAnimationStart");
  Ra("dblclick", "onDoubleClick");
  Ra("focusin", "onFocus");
  Ra("focusout", "onBlur");
  Ra(JL, "onTransitionRun");
  Ra(WL, "onTransitionStart");
  Ra($L, "onTransitionCancel");
  Ra(vm, "onTransitionEnd");
  gu("onMouseEnter", ["mouseout", "mouseover"]);
  gu("onMouseLeave", ["mouseout", "mouseover"]);
  gu("onPointerEnter", ["pointerout", "pointerover"]);
  gu("onPointerLeave", ["pointerout", "pointerover"]);
  Ll(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
      " ",
    ),
  );
  Ll(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " ",
    ),
  );
  Ll("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  Ll(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" "),
  );
  Ll(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" "),
  );
  Ll(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
  );
  var qo =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    O0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(qo),
    );
  function ih(e, a) {
    a = (a & 4) !== 0;
    for (var t = 0; t < e.length; t++) {
      var l = e[t],
        u = l.event;
      l = l.listeners;
      e: {
        var o = void 0;
        if (a)
          for (var f = l.length - 1; 0 <= f; f--) {
            var i = l[f],
              r = i.instance,
              m = i.currentTarget;
            if (((i = i.listener), r !== o && u.isPropagationStopped()))
              break e;
            ((o = i), (u.currentTarget = m));
            try {
              o(u);
            } catch (C) {
              md(C);
            }
            ((u.currentTarget = null), (o = r));
          }
        else
          for (f = 0; f < l.length; f++) {
            if (
              ((i = l[f]),
              (r = i.instance),
              (m = i.currentTarget),
              (i = i.listener),
              r !== o && u.isPropagationStopped())
            )
              break e;
            ((o = i), (u.currentTarget = m));
            try {
              o(u);
            } catch (C) {
              md(C);
            }
            ((u.currentTarget = null), (o = r));
          }
      }
    }
  }
  function V(e, a) {
    var t = a[Ai];
    t === void 0 && (t = a[Ai] = new Set());
    var l = e + "__bubble";
    t.has(l) || (rh(a, e, 2, !1), t.add(l));
  }
  function mi(e, a, t) {
    var l = 0;
    (a && (l |= 4), rh(t, e, l, a));
  }
  var Xf = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Xf]) {
      ((e[Xf] = !0),
        am.forEach(function (t) {
          t !== "selectionchange" && (O0.has(t) || mi(t, !1, e), mi(t, !0, e));
        }));
      var a = e.nodeType === 9 ? e : e.ownerDocument;
      a === null || a[Xf] || ((a[Xf] = !0), mi("selectionchange", !1, a));
    }
  }
  function rh(e, a, t, l) {
    switch (vh(a)) {
      case 2:
        var u = n1;
        break;
      case 8:
        u = i1;
        break;
      default:
        u = fs;
    }
    ((t = u.bind(null, a, t, e)),
      (u = void 0),
      !zi ||
        (a !== "touchstart" && a !== "touchmove" && a !== "wheel") ||
        (u = !0),
      l
        ? u !== void 0
          ? e.addEventListener(a, t, { capture: !0, passive: u })
          : e.addEventListener(a, t, !0)
        : u !== void 0
          ? e.addEventListener(a, t, { passive: u })
          : e.addEventListener(a, t, !1));
  }
  function gi(e, a, t, l, u) {
    var o = l;
    if ((a & 1) === 0 && (a & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var f = l.tag;
        if (f === 3 || f === 4) {
          var i = l.stateNode.containerInfo;
          if (i === u) break;
          if (f === 4)
            for (f = l.return; f !== null;) {
              var r = f.tag;
              if ((r === 3 || r === 4) && f.stateNode.containerInfo === u)
                return;
              f = f.return;
            }
          for (; i !== null;) {
            if (((f = Jl(i)), f === null)) return;
            if (((r = f.tag), r === 5 || r === 6 || r === 26 || r === 27)) {
              l = o = f;
              continue e;
            }
            i = i.parentNode;
          }
        }
        l = l.return;
      }
    im(function () {
      var m = o,
        C = yr(t),
        b = [];
      e: {
        var h = Im.get(e);
        if (h !== void 0) {
          var x = Nd,
            D = e;
          switch (e) {
            case "keypress":
              if (Jf(t) === 0) break e;
            case "keydown":
            case "keyup":
              x = TL;
              break;
            case "focusin":
              ((D = "focus"), (x = jn));
              break;
            case "focusout":
              ((D = "blur"), (x = jn));
              break;
            case "beforeblur":
            case "afterblur":
              x = jn;
              break;
            case "click":
              if (t.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              x = Ac;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = xL;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = BL;
              break;
            case ym:
            case bm:
            case Sm:
              x = yL;
              break;
            case vm:
              x = OL;
              break;
            case "scroll":
            case "scrollend":
              x = gL;
              break;
            case "wheel":
              x = UL;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = SL;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = Dc;
              break;
            case "toggle":
            case "beforetoggle":
              x = HL;
          }
          var z = (a & 4) !== 0,
            P = !z && (e === "scroll" || e === "scrollend"),
            p = z ? (h !== null ? h + "Capture" : null) : h;
          z = [];
          for (var c = m, g; c !== null;) {
            var S = c;
            if (
              ((g = S.stateNode),
              (S = S.tag),
              (S !== 5 && S !== 26 && S !== 27) ||
                g === null ||
                p === null ||
                ((S = To(c, p)), S != null && z.push(Ho(c, S, g))),
              P)
            )
              break;
            c = c.return;
          }
          0 < z.length &&
            ((h = new x(h, D, null, t, C)), b.push({ event: h, listeners: z }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (
            ((h = e === "mouseover" || e === "pointerover"),
            (x = e === "mouseout" || e === "pointerout"),
            h &&
              t !== ki &&
              (D = t.relatedTarget || t.fromElement) &&
              (Jl(D) || D[wu]))
          )
            break e;
          if (
            (x || h) &&
            ((h =
              C.window === C
                ? C
                : (h = C.ownerDocument)
                  ? h.defaultView || h.parentWindow
                  : window),
            x
              ? ((D = t.relatedTarget || t.toElement),
                (x = m),
                (D = D ? Jl(D) : null),
                D !== null &&
                  ((P = Go(D)),
                  (z = D.tag),
                  D !== P || (z !== 5 && z !== 27 && z !== 6)) &&
                  (D = null))
              : ((x = null), (D = m)),
            x !== D)
          ) {
            if (
              ((z = Ac),
              (S = "onMouseLeave"),
              (p = "onMouseEnter"),
              (c = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((z = Dc),
                (S = "onPointerLeave"),
                (p = "onPointerEnter"),
                (c = "pointer")),
              (P = x == null ? h : co(x)),
              (g = D == null ? h : co(D)),
              (h = new z(S, c + "leave", x, t, C)),
              (h.target = P),
              (h.relatedTarget = g),
              (S = null),
              Jl(C) === m &&
                ((z = new z(p, c + "enter", D, t, C)),
                (z.target = g),
                (z.relatedTarget = P),
                (S = z)),
              (P = S),
              x && D)
            )
              a: {
                for (z = E0, p = x, c = D, g = 0, S = p; S; S = z(S)) g++;
                S = 0;
                for (var w = c; w; w = z(w)) S++;
                for (; 0 < g - S;) ((p = z(p)), g--);
                for (; 0 < S - g;) ((c = z(c)), S--);
                for (; g--;) {
                  if (p === c || (c !== null && p === c.alternate)) {
                    z = p;
                    break a;
                  }
                  ((p = z(p)), (c = z(c)));
                }
                z = null;
              }
            else z = null;
            (x !== null && yp(b, h, x, z, !1),
              D !== null && P !== null && yp(b, P, D, z, !0));
          }
        }
        e: {
          if (
            ((h = m ? co(m) : window),
            (x = h.nodeName && h.nodeName.toLowerCase()),
            x === "select" || (x === "input" && h.type === "file"))
          )
            var H = Bc;
          else if (zc(h))
            if (gm) H = ZL;
            else {
              H = YL;
              var T = XL;
            }
          else
            ((x = h.nodeName),
              !x ||
              x.toLowerCase() !== "input" ||
              (h.type !== "checkbox" && h.type !== "radio")
                ? m && Cr(m.elementType) && (H = Bc)
                : (H = jL));
          if (H && (H = H(e, m))) {
            mm(b, H, t, C);
            break e;
          }
          (T && T(e, h, m),
            e === "focusout" &&
              m &&
              h.type === "number" &&
              m.memoizedProps.value != null &&
              Ti(h, "number", h.value));
        }
        switch (((T = m ? co(m) : window), e)) {
          case "focusin":
            (zc(T) || T.contentEditable === "true") &&
              ((eu = T), (Bi = m), (xo = null));
            break;
          case "focusout":
            xo = Bi = eu = null;
            break;
          case "mousedown":
            Ri = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ri = !1), Uc(b, t, C));
            break;
          case "selectionchange":
            if (KL) break;
          case "keydown":
          case "keyup":
            Uc(b, t, C);
        }
        var B;
        if (vr)
          e: {
            switch (e) {
              case "compositionstart":
                var O = "onCompositionStart";
                break e;
              case "compositionend":
                O = "onCompositionEnd";
                break e;
              case "compositionupdate":
                O = "onCompositionUpdate";
                break e;
            }
            O = void 0;
          }
        else
          $l
            ? cm(e, t) && (O = "onCompositionEnd")
            : e === "keydown" &&
              t.keyCode === 229 &&
              (O = "onCompositionStart");
        (O &&
          (sm &&
            t.locale !== "ko" &&
            ($l || O !== "onCompositionStart"
              ? O === "onCompositionEnd" && $l && (B = rm())
              : ((Dt = C),
                (br = "value" in Dt ? Dt.value : Dt.textContent),
                ($l = !0))),
          (T = zd(m, O)),
          0 < T.length &&
            ((O = new Mc(O, e, null, t, C)),
            b.push({ event: O, listeners: T }),
            B ? (O.data = B) : ((B = pm(t)), B !== null && (O.data = B)))),
          (B = PL ? FL(e, t) : GL(e, t)) &&
            ((O = zd(m, "onBeforeInput")),
            0 < O.length &&
              ((T = new Mc("onBeforeInput", "beforeinput", null, t, C)),
              b.push({ event: T, listeners: O }),
              (T.data = B))),
          R0(b, e, m, t, C));
      }
      ih(b, a);
    });
  }
  function Ho(e, a, t) {
    return { instance: e, listener: a, currentTarget: t };
  }
  function zd(e, a) {
    for (var t = a + "Capture", l = []; e !== null;) {
      var u = e,
        o = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          o === null ||
          ((u = To(e, t)),
          u != null && l.unshift(Ho(e, u, o)),
          (u = To(e, a)),
          u != null && l.push(Ho(e, u, o))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function E0(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function yp(e, a, t, l, u) {
    for (var o = a._reactName, f = []; t !== null && t !== l;) {
      var i = t,
        r = i.alternate,
        m = i.stateNode;
      if (((i = i.tag), r !== null && r === l)) break;
      ((i !== 5 && i !== 26 && i !== 27) ||
        m === null ||
        ((r = m),
        u
          ? ((m = To(t, o)), m != null && f.unshift(Ho(t, m, r)))
          : u || ((m = To(t, o)), m != null && f.push(Ho(t, m, r)))),
        (t = t.return));
    }
    f.length !== 0 && e.push({ event: a, listeners: f });
  }
  var U0 = /\r\n?/g,
    q0 = /\u0000|\uFFFD/g;
  function bp(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        U0,
        `
`,
      )
      .replace(q0, "");
  }
  function sh(e, a) {
    return ((a = bp(a)), bp(e) === a);
  }
  function te(e, a, t, l, u, o) {
    switch (t) {
      case "children":
        typeof l == "string"
          ? a === "body" || (a === "textarea" && l === "") || hu(e, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            a !== "body" &&
            hu(e, "" + l);
        break;
      case "className":
        Of(e, "class", l);
        break;
      case "tabIndex":
        Of(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Of(e, t, l);
        break;
      case "style":
        nm(e, l, o);
        break;
      case "data":
        if (a !== "object") {
          Of(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (a !== "a" || t !== "href")) {
          e.removeAttribute(t);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          e.removeAttribute(t);
          break;
        }
        ((l = Qf("" + l)), e.setAttribute(t, l));
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            t,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof o == "function" &&
            (t === "formAction"
              ? (a !== "input" && te(e, a, "name", u.name, u, null),
                te(e, a, "formEncType", u.formEncType, u, null),
                te(e, a, "formMethod", u.formMethod, u, null),
                te(e, a, "formTarget", u.formTarget, u, null))
              : (te(e, a, "encType", u.encType, u, null),
                te(e, a, "method", u.method, u, null),
                te(e, a, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(t);
          break;
        }
        ((l = Qf("" + l)), e.setAttribute(t, l));
        break;
      case "onClick":
        l != null && (e.onclick = ut);
        break;
      case "onScroll":
        l != null && V("scroll", e);
        break;
      case "onScrollEnd":
        l != null && V("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(v(61));
          if (((t = l.__html), t != null)) {
            if (u.children != null) throw Error(v(60));
            e.innerHTML = t;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((t = Qf("" + l)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", t));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(t, "" + l)
          : e.removeAttribute(t);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(t, "")
          : e.removeAttribute(t);
        break;
      case "capture":
      case "download":
        l === !0
          ? e.setAttribute(t, "")
          : l !== !1 &&
              l != null &&
              typeof l != "function" &&
              typeof l != "symbol"
            ? e.setAttribute(t, l)
            : e.removeAttribute(t);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? e.setAttribute(t, l)
          : e.removeAttribute(t);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? e.removeAttribute(t)
          : e.setAttribute(t, l);
        break;
      case "popover":
        (V("beforetoggle", e), V("toggle", e), Zf(e, "popover", l));
        break;
      case "xlinkActuate":
        Ka(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        Ka(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        Ka(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        Ka(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        Ka(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        Ka(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        Ka(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        Ka(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        Ka(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Zf(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
          ((t = pL.get(t) || t), Zf(e, t, l));
    }
  }
  function lr(e, a, t, l, u, o) {
    switch (t) {
      case "style":
        nm(e, l, o);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(v(61));
          if (((t = l.__html), t != null)) {
            if (u.children != null) throw Error(v(60));
            e.innerHTML = t;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? hu(e, l)
          : (typeof l == "number" || typeof l == "bigint") && hu(e, "" + l);
        break;
      case "onScroll":
        l != null && V("scroll", e);
        break;
      case "onScrollEnd":
        l != null && V("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = ut);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!tm.hasOwnProperty(t))
          e: {
            if (
              t[0] === "o" &&
              t[1] === "n" &&
              ((u = t.endsWith("Capture")),
              (a = t.slice(2, u ? t.length - 7 : void 0)),
              (o = e[We] || null),
              (o = o != null ? o[t] : null),
              typeof o == "function" && e.removeEventListener(a, o, u),
              typeof l == "function")
            ) {
              (typeof o != "function" &&
                o !== null &&
                (t in e
                  ? (e[t] = null)
                  : e.hasAttribute(t) && e.removeAttribute(t)),
                e.addEventListener(a, l, u));
              break e;
            }
            t in e
              ? (e[t] = l)
              : l === !0
                ? e.setAttribute(t, "")
                : Zf(e, t, l);
          }
    }
  }
  function Fe(e, a, t) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (V("error", e), V("load", e));
        var l = !1,
          u = !1,
          o;
        for (o in t)
          if (t.hasOwnProperty(o)) {
            var f = t[o];
            if (f != null)
              switch (o) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(v(137, a));
                default:
                  te(e, a, o, f, t, null);
              }
          }
        (u && te(e, a, "srcSet", t.srcSet, t, null),
          l && te(e, a, "src", t.src, t, null));
        return;
      case "input":
        V("invalid", e);
        var i = (o = f = u = null),
          r = null,
          m = null;
        for (l in t)
          if (t.hasOwnProperty(l)) {
            var C = t[l];
            if (C != null)
              switch (l) {
                case "name":
                  u = C;
                  break;
                case "type":
                  f = C;
                  break;
                case "checked":
                  r = C;
                  break;
                case "defaultChecked":
                  m = C;
                  break;
                case "value":
                  o = C;
                  break;
                case "defaultValue":
                  i = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null) throw Error(v(137, a));
                  break;
                default:
                  te(e, a, l, C, t, null);
              }
          }
        om(e, o, i, r, m, f, u, !1);
        return;
      case "select":
        (V("invalid", e), (l = f = o = null));
        for (u in t)
          if (t.hasOwnProperty(u) && ((i = t[u]), i != null))
            switch (u) {
              case "value":
                o = i;
                break;
              case "defaultValue":
                f = i;
                break;
              case "multiple":
                l = i;
              default:
                te(e, a, u, i, t, null);
            }
        ((a = o),
          (t = f),
          (e.multiple = !!l),
          a != null ? nu(e, !!l, a, !1) : t != null && nu(e, !!l, t, !0));
        return;
      case "textarea":
        (V("invalid", e), (o = u = l = null));
        for (f in t)
          if (t.hasOwnProperty(f) && ((i = t[f]), i != null))
            switch (f) {
              case "value":
                l = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                o = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(v(91));
                break;
              default:
                te(e, a, f, i, t, null);
            }
        dm(e, l, u, o);
        return;
      case "option":
        for (r in t)
          t.hasOwnProperty(r) &&
            ((l = t[r]), l != null) &&
            (r === "selected"
              ? (e.selected =
                  l && typeof l != "function" && typeof l != "symbol")
              : te(e, a, r, l, t, null));
        return;
      case "dialog":
        (V("beforetoggle", e), V("toggle", e), V("cancel", e), V("close", e));
        break;
      case "iframe":
      case "object":
        V("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < qo.length; l++) V(qo[l], e);
        break;
      case "image":
        (V("error", e), V("load", e));
        break;
      case "details":
        V("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (V("error", e), V("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (m in t)
          if (t.hasOwnProperty(m) && ((l = t[m]), l != null))
            switch (m) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(v(137, a));
              default:
                te(e, a, m, l, t, null);
            }
        return;
      default:
        if (Cr(a)) {
          for (C in t)
            t.hasOwnProperty(C) &&
              ((l = t[C]), l !== void 0 && lr(e, a, C, l, t, void 0));
          return;
        }
    }
    for (i in t)
      t.hasOwnProperty(i) && ((l = t[i]), l != null && te(e, a, i, l, t, null));
  }
  function H0(e, a, t, l) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          o = null,
          f = null,
          i = null,
          r = null,
          m = null,
          C = null;
        for (x in t) {
          var b = t[x];
          if (t.hasOwnProperty(x) && b != null)
            switch (x) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = b;
              default:
                l.hasOwnProperty(x) || te(e, a, x, null, l, b);
            }
        }
        for (var h in l) {
          var x = l[h];
          if (((b = t[h]), l.hasOwnProperty(h) && (x != null || b != null)))
            switch (h) {
              case "type":
                o = x;
                break;
              case "name":
                u = x;
                break;
              case "checked":
                m = x;
                break;
              case "defaultChecked":
                C = x;
                break;
              case "value":
                f = x;
                break;
              case "defaultValue":
                i = x;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(v(137, a));
                break;
              default:
                x !== b && te(e, a, h, x, l, b);
            }
        }
        Di(e, f, i, r, m, C, o, u);
        return;
      case "select":
        x = f = i = h = null;
        for (o in t)
          if (((r = t[o]), t.hasOwnProperty(o) && r != null))
            switch (o) {
              case "value":
                break;
              case "multiple":
                x = r;
              default:
                l.hasOwnProperty(o) || te(e, a, o, null, l, r);
            }
        for (u in l)
          if (
            ((o = l[u]),
            (r = t[u]),
            l.hasOwnProperty(u) && (o != null || r != null))
          )
            switch (u) {
              case "value":
                h = o;
                break;
              case "defaultValue":
                i = o;
                break;
              case "multiple":
                f = o;
              default:
                o !== r && te(e, a, u, o, l, r);
            }
        ((a = i),
          (t = f),
          (l = x),
          h != null
            ? nu(e, !!t, h, !1)
            : !!l != !!t &&
              (a != null ? nu(e, !!t, a, !0) : nu(e, !!t, t ? [] : "", !1)));
        return;
      case "textarea":
        x = h = null;
        for (i in t)
          if (
            ((u = t[i]),
            t.hasOwnProperty(i) && u != null && !l.hasOwnProperty(i))
          )
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                te(e, a, i, null, l, u);
            }
        for (f in l)
          if (
            ((u = l[f]),
            (o = t[f]),
            l.hasOwnProperty(f) && (u != null || o != null))
          )
            switch (f) {
              case "value":
                h = u;
                break;
              case "defaultValue":
                x = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(v(91));
                break;
              default:
                u !== o && te(e, a, f, u, l, o);
            }
        fm(e, h, x);
        return;
      case "option":
        for (var D in t)
          ((h = t[D]),
            t.hasOwnProperty(D) &&
              h != null &&
              !l.hasOwnProperty(D) &&
              (D === "selected" ? (e.selected = !1) : te(e, a, D, null, l, h)));
        for (r in l)
          ((h = l[r]),
            (x = t[r]),
            l.hasOwnProperty(r) &&
              h !== x &&
              (h != null || x != null) &&
              (r === "selected"
                ? (e.selected =
                    h && typeof h != "function" && typeof h != "symbol")
                : te(e, a, r, h, l, x)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var z in t)
          ((h = t[z]),
            t.hasOwnProperty(z) &&
              h != null &&
              !l.hasOwnProperty(z) &&
              te(e, a, z, null, l, h));
        for (m in l)
          if (
            ((h = l[m]),
            (x = t[m]),
            l.hasOwnProperty(m) && h !== x && (h != null || x != null))
          )
            switch (m) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(v(137, a));
                break;
              default:
                te(e, a, m, h, l, x);
            }
        return;
      default:
        if (Cr(a)) {
          for (var P in t)
            ((h = t[P]),
              t.hasOwnProperty(P) &&
                h !== void 0 &&
                !l.hasOwnProperty(P) &&
                lr(e, a, P, void 0, l, h));
          for (C in l)
            ((h = l[C]),
              (x = t[C]),
              !l.hasOwnProperty(C) ||
                h === x ||
                (h === void 0 && x === void 0) ||
                lr(e, a, C, h, l, x));
          return;
        }
    }
    for (var p in t)
      ((h = t[p]),
        t.hasOwnProperty(p) &&
          h != null &&
          !l.hasOwnProperty(p) &&
          te(e, a, p, null, l, h));
    for (b in l)
      ((h = l[b]),
        (x = t[b]),
        !l.hasOwnProperty(b) ||
          h === x ||
          (h == null && x == null) ||
          te(e, a, b, h, l, x));
  }
  function Sp(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function N0() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, a = 0, t = performance.getEntriesByType("resource"), l = 0;
        l < t.length;
        l++
      ) {
        var u = t[l],
          o = u.transferSize,
          f = u.initiatorType,
          i = u.duration;
        if (o && i && Sp(f)) {
          for (f = 0, i = u.responseEnd, l += 1; l < t.length; l++) {
            var r = t[l],
              m = r.startTime;
            if (m > i) break;
            var C = r.transferSize,
              b = r.initiatorType;
            C &&
              Sp(b) &&
              ((r = r.responseEnd), (f += C * (r < i ? 1 : (i - m) / (r - m))));
          }
          if ((--l, (a += (8 * (o + f)) / (u.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return a / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var ur = null,
    or = null;
  function Bd(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function vp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ch(e, a) {
    if (e === 0)
      switch (a) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && a === "foreignObject" ? 0 : e;
  }
  function fr(e, a) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof a.children == "string" ||
      typeof a.children == "number" ||
      typeof a.children == "bigint" ||
      (typeof a.dangerouslySetInnerHTML == "object" &&
        a.dangerouslySetInnerHTML !== null &&
        a.dangerouslySetInnerHTML.__html != null)
    );
  }
  var hi = null;
  function P0() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === hi
        ? !1
        : ((hi = e), !0)
      : ((hi = null), !1);
  }
  var ph = typeof setTimeout == "function" ? setTimeout : void 0,
    F0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Ip = typeof Promise == "function" ? Promise : void 0,
    G0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Ip < "u"
          ? function (e) {
              return Ip.resolve(null).then(e).catch(_0);
            }
          : ph;
  function _0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Yt(e) {
    return e === "head";
  }
  function wp(e, a) {
    var t = a,
      l = 0;
    do {
      var u = t.nextSibling;
      if ((e.removeChild(t), u && u.nodeType === 8))
        if (((t = u.data), t === "/$" || t === "/&")) {
          if (l === 0) {
            (e.removeChild(u), Iu(a));
            return;
          }
          l--;
        } else if (
          t === "$" ||
          t === "$?" ||
          t === "$~" ||
          t === "$!" ||
          t === "&"
        )
          l++;
        else if (t === "html") Mo(e.ownerDocument.documentElement);
        else if (t === "head") {
          ((t = e.ownerDocument.head), Mo(t));
          for (var o = t.firstChild; o;) {
            var f = o.nextSibling,
              i = o.nodeName;
            (o[Yo] ||
              i === "SCRIPT" ||
              i === "STYLE" ||
              (i === "LINK" && o.rel.toLowerCase() === "stylesheet") ||
              t.removeChild(o),
              (o = f));
          }
        } else t === "body" && Mo(e.ownerDocument.body);
      t = u;
    } while (t);
    Iu(a);
  }
  function Ap(e, a) {
    var t = e;
    e = 0;
    do {
      var l = t.nextSibling;
      if (
        (t.nodeType === 1
          ? a
            ? ((t._stashedDisplay = t.style.display),
              (t.style.display = "none"))
            : ((t.style.display = t._stashedDisplay || ""),
              t.getAttribute("style") === "" && t.removeAttribute("style"))
          : t.nodeType === 3 &&
            (a
              ? ((t._stashedText = t.nodeValue), (t.nodeValue = ""))
              : (t.nodeValue = t._stashedText || "")),
        l && l.nodeType === 8)
      )
        if (((t = l.data), t === "/$")) {
          if (e === 0) break;
          e--;
        } else (t !== "$" && t !== "$?" && t !== "$~" && t !== "$!") || e++;
      t = l;
    } while (t);
  }
  function dr(e) {
    var a = e.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a;) {
      var t = a;
      switch (((a = a.nextSibling), t.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (dr(t), Lr(t));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (t.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(t);
    }
  }
  function V0(e, a, t, l) {
    for (; e.nodeType === 1;) {
      var u = t;
      if (e.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[Yo])
          switch (a) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((o = e.getAttribute("rel")),
                o === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                o !== u.rel ||
                e.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                e.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((o = e.getAttribute("src")),
                (o !== (u.src == null ? null : u.src) ||
                  e.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  e.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  o &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (a === "input" && e.type === "hidden") {
        var o = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === o) return e;
      } else return e;
      if (((e = wa(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function X0(e, a, t) {
    if (a === "") return null;
    for (; e.nodeType !== 3;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = wa(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function mh(e, a) {
    for (; e.nodeType !== 8;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !a) ||
        ((e = wa(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function nr(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ir(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function Y0(e, a) {
    var t = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = a;
    else if (e.data !== "$?" || t.readyState !== "loading") a();
    else {
      var l = function () {
        (a(), t.removeEventListener("DOMContentLoaded", l));
      };
      (t.addEventListener("DOMContentLoaded", l), (e._reactRetry = l));
    }
  }
  function wa(e) {
    for (; e != null; e = e.nextSibling) {
      var a = e.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (
          ((a = e.data),
          a === "$" ||
            a === "$!" ||
            a === "$?" ||
            a === "$~" ||
            a === "&" ||
            a === "F!" ||
            a === "F")
        )
          break;
        if (a === "/$" || a === "/&") return null;
      }
    }
    return e;
  }
  var rr = null;
  function Mp(e) {
    e = e.nextSibling;
    for (var a = 0; e;) {
      if (e.nodeType === 8) {
        var t = e.data;
        if (t === "/$" || t === "/&") {
          if (a === 0) return wa(e.nextSibling);
          a--;
        } else
          (t !== "$" && t !== "$!" && t !== "$?" && t !== "$~" && t !== "&") ||
            a++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Dp(e) {
    e = e.previousSibling;
    for (var a = 0; e;) {
      if (e.nodeType === 8) {
        var t = e.data;
        if (t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&") {
          if (a === 0) return e;
          a--;
        } else (t !== "/$" && t !== "/&") || a++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function gh(e, a, t) {
    switch (((a = Bd(t)), e)) {
      case "html":
        if (((e = a.documentElement), !e)) throw Error(v(452));
        return e;
      case "head":
        if (((e = a.head), !e)) throw Error(v(453));
        return e;
      case "body":
        if (((e = a.body), !e)) throw Error(v(454));
        return e;
      default:
        throw Error(v(451));
    }
  }
  function Mo(e) {
    for (var a = e.attributes; a.length;) e.removeAttributeNode(a[0]);
    Lr(e);
  }
  var Aa = new Map(),
    Tp = new Set();
  function Rd(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var mt = J.d;
  J.d = { f: j0, r: Z0, D: Q0, C: K0, L: J0, m: W0, X: e1, S: $0, M: a1 };
  function j0() {
    var e = mt.f(),
      a = Kd();
    return e || a;
  }
  function Z0(e) {
    var a = Au(e);
    a !== null && a.tag === 5 && a.type === "form" ? ng(a) : mt.r(e);
  }
  var ku = typeof document > "u" ? null : document;
  function hh(e, a, t) {
    var l = ku;
    if (l && typeof a == "string" && a) {
      var u = ba(a);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof t == "string" && (u += '[crossorigin="' + t + '"]'),
        Tp.has(u) ||
          (Tp.add(u),
          (e = { rel: e, crossOrigin: t, href: a }),
          l.querySelector(u) === null &&
            ((a = l.createElement("link")),
            Fe(a, "link", e),
            Re(a),
            l.head.appendChild(a))));
    }
  }
  function Q0(e) {
    (mt.D(e), hh("dns-prefetch", e, null));
  }
  function K0(e, a) {
    (mt.C(e, a), hh("preconnect", e, a));
  }
  function J0(e, a, t) {
    mt.L(e, a, t);
    var l = ku;
    if (l && e && a) {
      var u = 'link[rel="preload"][as="' + ba(a) + '"]';
      a === "image" && t && t.imageSrcSet
        ? ((u += '[imagesrcset="' + ba(t.imageSrcSet) + '"]'),
          typeof t.imageSizes == "string" &&
            (u += '[imagesizes="' + ba(t.imageSizes) + '"]'))
        : (u += '[href="' + ba(e) + '"]');
      var o = u;
      switch (a) {
        case "style":
          o = vu(e);
          break;
        case "script":
          o = zu(e);
      }
      Aa.has(o) ||
        ((e = ce(
          {
            rel: "preload",
            href: a === "image" && t && t.imageSrcSet ? void 0 : e,
            as: a,
          },
          t,
        )),
        Aa.set(o, e),
        l.querySelector(u) !== null ||
          (a === "style" && l.querySelector(Wo(o))) ||
          (a === "script" && l.querySelector($o(o))) ||
          ((a = l.createElement("link")),
          Fe(a, "link", e),
          Re(a),
          l.head.appendChild(a)));
    }
  }
  function W0(e, a) {
    mt.m(e, a);
    var t = ku;
    if (t && e) {
      var l = a && typeof a.as == "string" ? a.as : "script",
        u =
          'link[rel="modulepreload"][as="' + ba(l) + '"][href="' + ba(e) + '"]',
        o = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = zu(e);
      }
      if (
        !Aa.has(o) &&
        ((e = ce({ rel: "modulepreload", href: e }, a)),
        Aa.set(o, e),
        t.querySelector(u) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (t.querySelector($o(o))) return;
        }
        ((l = t.createElement("link")),
          Fe(l, "link", e),
          Re(l),
          t.head.appendChild(l));
      }
    }
  }
  function $0(e, a, t) {
    mt.S(e, a, t);
    var l = ku;
    if (l && e) {
      var u = du(l).hoistableStyles,
        o = vu(e);
      a = a || "default";
      var f = u.get(o);
      if (!f) {
        var i = { loading: 0, preload: null };
        if ((f = l.querySelector(Wo(o)))) i.loading = 5;
        else {
          ((e = ce({ rel: "stylesheet", href: e, "data-precedence": a }, t)),
            (t = Aa.get(o)) && ls(e, t));
          var r = (f = l.createElement("link"));
          (Re(r),
            Fe(r, "link", e),
            (r._p = new Promise(function (m, C) {
              ((r.onload = m), (r.onerror = C));
            })),
            r.addEventListener("load", function () {
              i.loading |= 1;
            }),
            r.addEventListener("error", function () {
              i.loading |= 2;
            }),
            (i.loading |= 4),
            od(f, a, l));
        }
        ((f = { type: "stylesheet", instance: f, count: 1, state: i }),
          u.set(o, f));
      }
    }
  }
  function e1(e, a) {
    mt.X(e, a);
    var t = ku;
    if (t && e) {
      var l = du(t).hoistableScripts,
        u = zu(e),
        o = l.get(u);
      o ||
        ((o = t.querySelector($o(u))),
        o ||
          ((e = ce({ src: e, async: !0 }, a)),
          (a = Aa.get(u)) && us(e, a),
          (o = t.createElement("script")),
          Re(o),
          Fe(o, "link", e),
          t.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        l.set(u, o));
    }
  }
  function a1(e, a) {
    mt.M(e, a);
    var t = ku;
    if (t && e) {
      var l = du(t).hoistableScripts,
        u = zu(e),
        o = l.get(u);
      o ||
        ((o = t.querySelector($o(u))),
        o ||
          ((e = ce({ src: e, async: !0, type: "module" }, a)),
          (a = Aa.get(u)) && us(e, a),
          (o = t.createElement("script")),
          Re(o),
          Fe(o, "link", e),
          t.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        l.set(u, o));
    }
  }
  function kp(e, a, t, l) {
    var u = (u = Bt.current) ? Rd(u) : null;
    if (!u) throw Error(v(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof t.precedence == "string" && typeof t.href == "string"
          ? ((a = vu(t.href)),
            (t = du(u).hoistableStyles),
            (l = t.get(a)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              t.set(a, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          t.rel === "stylesheet" &&
          typeof t.href == "string" &&
          typeof t.precedence == "string"
        ) {
          e = vu(t.href);
          var o = du(u).hoistableStyles,
            f = o.get(e);
          if (
            (f ||
              ((u = u.ownerDocument || u),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(e, f),
              (o = u.querySelector(Wo(e))) &&
                !o._p &&
                ((f.instance = o), (f.state.loading = 5)),
              Aa.has(e) ||
                ((t = {
                  rel: "preload",
                  as: "style",
                  href: t.href,
                  crossOrigin: t.crossOrigin,
                  integrity: t.integrity,
                  media: t.media,
                  hrefLang: t.hrefLang,
                  referrerPolicy: t.referrerPolicy,
                }),
                Aa.set(e, t),
                o || t1(u, e, t, f.state))),
            a && l === null)
          )
            throw Error(v(528, ""));
          return f;
        }
        if (a && l !== null) throw Error(v(529, ""));
        return null;
      case "script":
        return (
          (a = t.async),
          (t = t.src),
          typeof t == "string" &&
          a &&
          typeof a != "function" &&
          typeof a != "symbol"
            ? ((a = zu(t)),
              (t = du(u).hoistableScripts),
              (l = t.get(a)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                t.set(a, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(v(444, e));
    }
  }
  function vu(e) {
    return 'href="' + ba(e) + '"';
  }
  function Wo(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function xh(e) {
    return ce({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function t1(e, a, t, l) {
    e.querySelector('link[rel="preload"][as="style"][' + a + "]")
      ? (l.loading = 1)
      : ((a = e.createElement("link")),
        (l.preload = a),
        a.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        a.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Fe(a, "link", t),
        Re(a),
        e.head.appendChild(a));
  }
  function zu(e) {
    return '[src="' + ba(e) + '"]';
  }
  function $o(e) {
    return "script[async]" + e;
  }
  function zp(e, a, t) {
    if ((a.count++, a.instance === null))
      switch (a.type) {
        case "style":
          var l = e.querySelector('style[data-href~="' + ba(t.href) + '"]');
          if (l) return ((a.instance = l), Re(l), l);
          var u = ce({}, t, {
            "data-href": t.href,
            "data-precedence": t.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement("style")),
            Re(l),
            Fe(l, "style", u),
            od(l, t.precedence, e),
            (a.instance = l)
          );
        case "stylesheet":
          u = vu(t.href);
          var o = e.querySelector(Wo(u));
          if (o) return ((a.state.loading |= 4), (a.instance = o), Re(o), o);
          ((l = xh(t)),
            (u = Aa.get(u)) && ls(l, u),
            (o = (e.ownerDocument || e).createElement("link")),
            Re(o));
          var f = o;
          return (
            (f._p = new Promise(function (i, r) {
              ((f.onload = i), (f.onerror = r));
            })),
            Fe(o, "link", l),
            (a.state.loading |= 4),
            od(o, t.precedence, e),
            (a.instance = o)
          );
        case "script":
          return (
            (o = zu(t.src)),
            (u = e.querySelector($o(o)))
              ? ((a.instance = u), Re(u), u)
              : ((l = t),
                (u = Aa.get(o)) && ((l = ce({}, t)), us(l, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                Re(u),
                Fe(u, "link", l),
                e.head.appendChild(u),
                (a.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(v(443, a.type));
      }
    else
      a.type === "stylesheet" &&
        (a.state.loading & 4) === 0 &&
        ((l = a.instance), (a.state.loading |= 4), od(l, t.precedence, e));
    return a.instance;
  }
  function od(e, a, t) {
    for (
      var l = t.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = l.length ? l[l.length - 1] : null,
        o = u,
        f = 0;
      f < l.length;
      f++
    ) {
      var i = l[f];
      if (i.dataset.precedence === a) o = i;
      else if (o !== u) break;
    }
    o
      ? o.parentNode.insertBefore(e, o.nextSibling)
      : ((a = t.nodeType === 9 ? t.head : t), a.insertBefore(e, a.firstChild));
  }
  function ls(e, a) {
    (e.crossOrigin == null && (e.crossOrigin = a.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy),
      e.title == null && (e.title = a.title));
  }
  function us(e, a) {
    (e.crossOrigin == null && (e.crossOrigin = a.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy),
      e.integrity == null && (e.integrity = a.integrity));
  }
  var fd = null;
  function Bp(e, a, t) {
    if (fd === null) {
      var l = new Map(),
        u = (fd = new Map());
      u.set(t, l);
    } else ((u = fd), (l = u.get(t)), l || ((l = new Map()), u.set(t, l)));
    if (l.has(e)) return l;
    for (
      l.set(e, null), t = t.getElementsByTagName(e), u = 0;
      u < t.length;
      u++
    ) {
      var o = t[u];
      if (
        !(
          o[Yo] ||
          o[He] ||
          (e === "link" && o.getAttribute("rel") === "stylesheet")
        ) &&
        o.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = o.getAttribute(a) || "";
        f = e + f;
        var i = l.get(f);
        i ? i.push(o) : l.set(f, [o]);
      }
    }
    return l;
  }
  function Rp(e, a, t) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        t,
        a === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function l1(e, a, t) {
    if (t === 1 || a.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof a.precedence != "string" ||
          typeof a.href != "string" ||
          a.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof a.rel != "string" ||
          typeof a.href != "string" ||
          a.href === "" ||
          a.onLoad ||
          a.onError
        )
          break;
        return a.rel === "stylesheet"
          ? ((e = a.disabled), typeof a.precedence == "string" && e == null)
          : !0;
      case "script":
        if (
          a.async &&
          typeof a.async != "function" &&
          typeof a.async != "symbol" &&
          !a.onLoad &&
          !a.onError &&
          a.src &&
          typeof a.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Lh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function u1(e, a, t, l) {
    if (
      t.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var u = vu(l.href),
          o = a.querySelector(Wo(u));
        if (o) {
          ((a = o._p),
            a !== null &&
              typeof a == "object" &&
              typeof a.then == "function" &&
              (e.count++, (e = Od.bind(e)), a.then(e, e)),
            (t.state.loading |= 4),
            (t.instance = o),
            Re(o));
          return;
        }
        ((o = a.ownerDocument || a),
          (l = xh(l)),
          (u = Aa.get(u)) && ls(l, u),
          (o = o.createElement("link")),
          Re(o));
        var f = o;
        ((f._p = new Promise(function (i, r) {
          ((f.onload = i), (f.onerror = r));
        })),
          Fe(o, "link", l),
          (t.instance = o));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(t, a),
        (a = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (e.count++,
          (t = Od.bind(e)),
          a.addEventListener("load", t),
          a.addEventListener("error", t)));
    }
  }
  var xi = 0;
  function o1(e, a) {
    return (
      e.stylesheets && e.count === 0 && dd(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (t) {
            var l = setTimeout(function () {
              if ((e.stylesheets && dd(e, e.stylesheets), e.unsuspend)) {
                var o = e.unsuspend;
                ((e.unsuspend = null), o());
              }
            }, 6e4 + a);
            0 < e.imgBytes && xi === 0 && (xi = 62500 * N0());
            var u = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && dd(e, e.stylesheets), e.unsuspend))
                ) {
                  var o = e.unsuspend;
                  ((e.unsuspend = null), o());
                }
              },
              (e.imgBytes > xi ? 50 : 800) + a,
            );
            return (
              (e.unsuspend = t),
              function () {
                ((e.unsuspend = null), clearTimeout(l), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Od() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) dd(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ed = null;
  function dd(e, a) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Ed = new Map()),
        a.forEach(f1, e),
        (Ed = null),
        Od.call(e)));
  }
  function f1(e, a) {
    if (!(a.state.loading & 4)) {
      var t = Ed.get(e);
      if (t) var l = t.get(null);
      else {
        ((t = new Map()), Ed.set(e, t));
        for (
          var u = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            o = 0;
          o < u.length;
          o++
        ) {
          var f = u[o];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (t.set(f.dataset.precedence, f), (l = f));
        }
        l && t.set(null, l);
      }
      ((u = a.instance),
        (f = u.getAttribute("data-precedence")),
        (o = t.get(f) || l),
        o === l && t.set(null, u),
        t.set(f, u),
        this.count++,
        (l = Od.bind(this)),
        u.addEventListener("load", l),
        u.addEventListener("error", l),
        o
          ? o.parentNode.insertBefore(u, o.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (a.state.loading |= 4));
    }
  }
  var No = {
    $$typeof: lt,
    Provider: null,
    Consumer: null,
    _currentValue: nl,
    _currentValue2: nl,
    _threadCount: 0,
  };
  function d1(e, a, t, l, u, o, f, i, r) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = _n(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = _n(0)),
      (this.hiddenUpdates = _n(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = u),
      (this.onCaughtError = o),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = r),
      (this.incompleteTransitions = new Map()));
  }
  function Ch(e, a, t, l, u, o, f, i, r, m, C, b) {
    return (
      (e = new d1(e, a, t, f, r, m, C, b, i)),
      (a = 1),
      o === !0 && (a |= 24),
      (o = ua(3, null, null, a)),
      (e.current = o),
      (o.stateNode = e),
      (a = kr()),
      a.refCount++,
      (e.pooledCache = a),
      a.refCount++,
      (o.memoizedState = { element: l, isDehydrated: t, cache: a }),
      Rr(o),
      e
    );
  }
  function yh(e) {
    return e ? ((e = lu), e) : lu;
  }
  function bh(e, a, t, l, u, o) {
    ((u = yh(u)),
      l.context === null ? (l.context = u) : (l.pendingContext = u),
      (l = Ot(a)),
      (l.payload = { element: t }),
      (o = o === void 0 ? null : o),
      o !== null && (l.callback = o),
      (t = Et(e, l, a)),
      t !== null && (Je(t, e, a), Co(t, e, a)));
  }
  function Op(e, a) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var t = e.retryLane;
      e.retryLane = t !== 0 && t < a ? t : a;
    }
  }
  function os(e, a) {
    (Op(e, a), (e = e.alternate) && Op(e, a));
  }
  function Sh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = bl(e, 67108864);
      (a !== null && Je(a, e, 67108864), os(e, 67108864));
    }
  }
  function Ep(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = ia();
      a = hr(a);
      var t = bl(e, a);
      (t !== null && Je(t, e, a), os(e, a));
    }
  }
  var Ud = !0;
  function n1(e, a, t, l) {
    var u = E.T;
    E.T = null;
    var o = J.p;
    try {
      ((J.p = 2), fs(e, a, t, l));
    } finally {
      ((J.p = o), (E.T = u));
    }
  }
  function i1(e, a, t, l) {
    var u = E.T;
    E.T = null;
    var o = J.p;
    try {
      ((J.p = 8), fs(e, a, t, l));
    } finally {
      ((J.p = o), (E.T = u));
    }
  }
  function fs(e, a, t, l) {
    if (Ud) {
      var u = sr(l);
      if (u === null) (gi(e, a, l, qd, t), Up(e, l));
      else if (s1(u, e, a, t, l)) l.stopPropagation();
      else if ((Up(e, l), a & 4 && -1 < r1.indexOf(e))) {
        for (; u !== null;) {
          var o = Au(u);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var f = ol(o.pendingLanes);
                  if (f !== 0) {
                    var i = o;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; f;) {
                      var r = 1 << (31 - na(f));
                      ((i.entanglements[1] |= r), (f &= ~r));
                    }
                    (Ga(o), (K & 6) === 0 && ((Ad = fa() + 500), Jo(0, !1)));
                  }
                }
                break;
              case 31:
              case 13:
                ((i = bl(o, 2)), i !== null && Je(i, o, 2), Kd(), os(o, 2));
            }
          if (((o = sr(l)), o === null && gi(e, a, l, qd, t), o === u)) break;
          u = o;
        }
        u !== null && l.stopPropagation();
      } else gi(e, a, l, null, t);
    }
  }
  function sr(e) {
    return ((e = yr(e)), ds(e));
  }
  var qd = null;
  function ds(e) {
    if (((qd = null), (e = Jl(e)), e !== null)) {
      var a = Go(e);
      if (a === null) e = null;
      else {
        var t = a.tag;
        if (t === 13) {
          if (((e = Gp(a)), e !== null)) return e;
          e = null;
        } else if (t === 31) {
          if (((e = _p(a)), e !== null)) return e;
          e = null;
        } else if (t === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          e = null;
        } else a !== e && (e = null);
      }
    }
    return ((qd = e), null);
  }
  function vh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Jx()) {
          case jp:
            return 2;
          case Zp:
            return 8;
          case cd:
          case Wx:
            return 32;
          case Qp:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var cr = !1,
    Ht = null,
    Nt = null,
    Pt = null,
    Po = new Map(),
    Fo = new Map(),
    At = [],
    r1 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Up(e, a) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ht = null;
        break;
      case "dragenter":
      case "dragleave":
        Nt = null;
        break;
      case "mouseover":
      case "mouseout":
        Pt = null;
        break;
      case "pointerover":
      case "pointerout":
        Po.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fo.delete(a.pointerId);
    }
  }
  function no(e, a, t, l, u, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: a,
          domEventName: t,
          eventSystemFlags: l,
          nativeEvent: o,
          targetContainers: [u],
        }),
        a !== null && ((a = Au(a)), a !== null && Sh(a)),
        e)
      : ((e.eventSystemFlags |= l),
        (a = e.targetContainers),
        u !== null && a.indexOf(u) === -1 && a.push(u),
        e);
  }
  function s1(e, a, t, l, u) {
    switch (a) {
      case "focusin":
        return ((Ht = no(Ht, e, a, t, l, u)), !0);
      case "dragenter":
        return ((Nt = no(Nt, e, a, t, l, u)), !0);
      case "mouseover":
        return ((Pt = no(Pt, e, a, t, l, u)), !0);
      case "pointerover":
        var o = u.pointerId;
        return (Po.set(o, no(Po.get(o) || null, e, a, t, l, u)), !0);
      case "gotpointercapture":
        return (
          (o = u.pointerId),
          Fo.set(o, no(Fo.get(o) || null, e, a, t, l, u)),
          !0
        );
    }
    return !1;
  }
  function Ih(e) {
    var a = Jl(e.target);
    if (a !== null) {
      var t = Go(a);
      if (t !== null) {
        if (((a = t.tag), a === 13)) {
          if (((a = Gp(t)), a !== null)) {
            ((e.blockedOn = a),
              Cc(e.priority, function () {
                Ep(t);
              }));
            return;
          }
        } else if (a === 31) {
          if (((a = _p(t)), a !== null)) {
            ((e.blockedOn = a),
              Cc(e.priority, function () {
                Ep(t);
              }));
            return;
          }
        } else if (a === 3 && t.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function nd(e) {
    if (e.blockedOn !== null) return !1;
    for (var a = e.targetContainers; 0 < a.length;) {
      var t = sr(e.nativeEvent);
      if (t === null) {
        t = e.nativeEvent;
        var l = new t.constructor(t.type, t);
        ((ki = l), t.target.dispatchEvent(l), (ki = null));
      } else return ((a = Au(t)), a !== null && Sh(a), (e.blockedOn = t), !1);
      a.shift();
    }
    return !0;
  }
  function qp(e, a, t) {
    nd(e) && t.delete(a);
  }
  function c1() {
    ((cr = !1),
      Ht !== null && nd(Ht) && (Ht = null),
      Nt !== null && nd(Nt) && (Nt = null),
      Pt !== null && nd(Pt) && (Pt = null),
      Po.forEach(qp),
      Fo.forEach(qp));
  }
  function Yf(e, a) {
    e.blockedOn === a &&
      ((e.blockedOn = null),
      cr ||
        ((cr = !0),
        ze.unstable_scheduleCallback(ze.unstable_NormalPriority, c1)));
  }
  var jf = null;
  function Hp(e) {
    jf !== e &&
      ((jf = e),
      ze.unstable_scheduleCallback(ze.unstable_NormalPriority, function () {
        jf === e && (jf = null);
        for (var a = 0; a < e.length; a += 3) {
          var t = e[a],
            l = e[a + 1],
            u = e[a + 2];
          if (typeof l != "function") {
            if (ds(l || t) === null) continue;
            break;
          }
          var o = Au(t);
          o !== null &&
            (e.splice(a, 3),
            (a -= 3),
            Yi(o, { pending: !0, data: u, method: t.method, action: l }, l, u));
        }
      }));
  }
  function Iu(e) {
    function a(r) {
      return Yf(r, e);
    }
    (Ht !== null && Yf(Ht, e),
      Nt !== null && Yf(Nt, e),
      Pt !== null && Yf(Pt, e),
      Po.forEach(a),
      Fo.forEach(a));
    for (var t = 0; t < At.length; t++) {
      var l = At[t];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < At.length && ((t = At[0]), t.blockedOn === null);)
      (Ih(t), t.blockedOn === null && At.shift());
    if (((t = (e.ownerDocument || e).$$reactFormReplay), t != null))
      for (l = 0; l < t.length; l += 3) {
        var u = t[l],
          o = t[l + 1],
          f = u[We] || null;
        if (typeof o == "function") f || Hp(t);
        else if (f) {
          var i = null;
          if (o && o.hasAttribute("formAction")) {
            if (((u = o), (f = o[We] || null))) i = f.formAction;
            else if (ds(u) !== null) continue;
          } else i = f.action;
          (typeof i == "function" ? (t[l + 1] = i) : (t.splice(l, 3), (l -= 3)),
            Hp(t));
        }
      }
  }
  function wh() {
    function e(o) {
      o.canIntercept &&
        o.info === "react-transition" &&
        o.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (u = f);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function a() {
      (u !== null && (u(), (u = null)), l || setTimeout(t, 20));
    }
    function t() {
      if (!l && !navigation.transition) {
        var o = navigation.currentEntry;
        o &&
          o.url != null &&
          navigation.navigate(o.url, {
            state: o.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var l = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", a),
        navigation.addEventListener("navigateerror", a),
        setTimeout(t, 100),
        function () {
          ((l = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", a),
            navigation.removeEventListener("navigateerror", a),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function ns(e) {
    this._internalRoot = e;
  }
  $d.prototype.render = ns.prototype.render = function (e) {
    var a = this._internalRoot;
    if (a === null) throw Error(v(409));
    var t = a.current,
      l = ia();
    bh(t, l, e, a, null, null);
  };
  $d.prototype.unmount = ns.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var a = e.containerInfo;
      (bh(e.current, 2, null, e, null, null), Kd(), (a[wu] = null));
    }
  };
  function $d(e) {
    this._internalRoot = e;
  }
  $d.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var a = em();
      e = { blockedOn: null, target: e, priority: a };
      for (var t = 0; t < At.length && a !== 0 && a < At[t].priority; t++);
      (At.splice(t, 0, e), t === 0 && Ih(e));
    }
  };
  var Np = Pp.version;
  if (Np !== "19.2.6") throw Error(v(527, Np, "19.2.6"));
  J.findDOMNode = function (e) {
    var a = e._reactInternals;
    if (a === void 0)
      throw typeof e.render == "function"
        ? Error(v(188))
        : ((e = Object.keys(e).join(",")), Error(v(268, e)));
    return (
      (e = Vx(a)),
      (e = e !== null ? Vp(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var p1 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.6",
  };
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
    ((io = __REACT_DEVTOOLS_GLOBAL_HOOK__), !io.isDisabled && io.supportsFiber)
  )
    try {
      ((_o = io.inject(p1)), (da = io));
    } catch {}
  var io;
  en.createRoot = function (e, a) {
    if (!Fp(e)) throw Error(v(299));
    var t = !1,
      l = "",
      u = hg,
      o = xg,
      f = Lg;
    return (
      a != null &&
        (a.unstable_strictMode === !0 && (t = !0),
        a.identifierPrefix !== void 0 && (l = a.identifierPrefix),
        a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
        a.onCaughtError !== void 0 && (o = a.onCaughtError),
        a.onRecoverableError !== void 0 && (f = a.onRecoverableError)),
      (a = Ch(e, 1, !1, null, null, t, l, null, u, o, f, wh)),
      (e[wu] = a.current),
      ts(e),
      new ns(a)
    );
  };
  en.hydrateRoot = function (e, a, t) {
    if (!Fp(e)) throw Error(v(299));
    var l = !1,
      u = "",
      o = hg,
      f = xg,
      i = Lg,
      r = null;
    return (
      t != null &&
        (t.unstable_strictMode === !0 && (l = !0),
        t.identifierPrefix !== void 0 && (u = t.identifierPrefix),
        t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
        t.onCaughtError !== void 0 && (f = t.onCaughtError),
        t.onRecoverableError !== void 0 && (i = t.onRecoverableError),
        t.formState !== void 0 && (r = t.formState)),
      (a = Ch(e, 1, !0, a, t ?? null, l, u, r, o, f, i, wh)),
      (a.context = yh(null)),
      (t = a.current),
      (l = ia()),
      (l = hr(l)),
      (u = Ot(l)),
      (u.callback = null),
      Et(t, u, l),
      (t = l),
      (a.current.lanes = t),
      Xo(a, t),
      Ga(a),
      (e[wu] = a.current),
      ts(e),
      new $d(a)
    );
  };
  en.version = "19.2.6";
});
var Th = Ea((I1, Dh) => {
  "use strict";
  function Mh() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mh);
      } catch (e) {
        console.error(e);
      }
  }
  (Mh(), (Dh.exports = Ah()));
});
var Oh = Ea((ln) => {
  "use strict";
  var m1 = Symbol.for("react.transitional.element"),
    g1 = Symbol.for("react.fragment");
  function Rh(e, a, t) {
    var l = null;
    if (
      (t !== void 0 && (l = "" + t),
      a.key !== void 0 && (l = "" + a.key),
      "key" in a)
    ) {
      t = {};
      for (var u in a) u !== "key" && (t[u] = a[u]);
    } else t = a;
    return (
      (a = t.ref),
      { $$typeof: m1, type: e, key: l, ref: a !== void 0 ? a : null, props: t }
    );
  }
  ln.Fragment = g1;
  ln.jsx = Rh;
  ln.jsxs = Rh;
});
var hf = Ea((Ky, Eh) => {
  "use strict";
  Eh.exports = Oh();
});
var Hh = Za(tl()),
  Nh = Za(Th());
var I = Za(tl());
var tn = Za(tl());
var kh = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  an = (...e) =>
    e
      .filter((a, t, l) => !!a && a.trim() !== "" && l.indexOf(a) === t)
      .join(" ")
      .trim();
var ef = Za(tl());
var zh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
var Bh = (0, ef.forwardRef)(
  (
    {
      color: e = "currentColor",
      size: a = 24,
      strokeWidth: t = 2,
      absoluteStrokeWidth: l,
      className: u = "",
      children: o,
      iconNode: f,
      ...i
    },
    r,
  ) =>
    (0, ef.createElement)(
      "svg",
      {
        ref: r,
        ...zh,
        width: a,
        height: a,
        stroke: e,
        strokeWidth: l ? (Number(t) * 24) / Number(a) : t,
        className: an("lucide", u),
        ...i,
      },
      [
        ...f.map(([m, C]) => (0, ef.createElement)(m, C)),
        ...(Array.isArray(o) ? o : [o]),
      ],
    ),
);
var M = (e, a) => {
  let t = (0, tn.forwardRef)(({ className: l, ...u }, o) =>
    (0, tn.createElement)(Bh, {
      ref: o,
      iconNode: a,
      className: an(`lucide-${kh(e)}`, l),
      ...u,
    }),
  );
  return ((t.displayName = `${e}`), t);
};
var af = M("Bold", [
  [
    "path",
    {
      d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
      key: "mg9rjx",
    },
  ],
]);
var gt = M("ChevronDown", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
var Bu = M("ChevronLeft", [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]);
var jt = M("ChevronRight", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]);
var OfficeBack = M("OfficeBack", [
  ["path", { d: "M10 6 4 12l6 6", key: "office-back-head" }],
  ["path", { d: "M5 12h10.5a4.5 4.5 0 0 1 4.5 4.5", key: "office-back-line" }],
]);
var OfficeForward = M("OfficeForward", [
  ["path", { d: "m14 6 6 6-6 6", key: "office-forward-head" }],
  [
    "path",
    { d: "M19 12H8.5A4.5 4.5 0 0 0 4 16.5", key: "office-forward-line" },
  ],
]);
var ht = M("ClipboardPaste", [
  [
    "path",
    {
      d: "M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z",
      key: "1pp7kr",
    },
  ],
  [
    "path",
    {
      d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10",
      key: "2ik1ml",
    },
  ],
  ["path", { d: "m17 10 4 4-4 4", key: "vp2hj1" }],
]);
var ca = M("Copy", [
  [
    "rect",
    {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2",
      key: "17jyea",
    },
  ],
  [
    "path",
    {
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
      key: "zix9uf",
    },
  ],
]);
var tf = M("Crop", [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14", key: "ron5a4" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2", key: "7s9ehn" }],
]);
var Ru = M("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
]);
var lf = M("Eraser", [
  [
    "path",
    {
      d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",
      key: "182aya",
    },
  ],
  ["path", { d: "M22 21H7", key: "t4ddhn" }],
  ["path", { d: "m5 11 9 9", key: "1mo9qw" }],
]);
var vl = M("Expand", [
  ["path", { d: "m21 21-6-6m6 6v-4.8m0 4.8h-4.8", key: "1c15vz" }],
  ["path", { d: "M3 16.2V21m0 0h4.8M3 21l6-6", key: "1fsnz2" }],
  ["path", { d: "M21 7.8V3m0 0h-4.8M21 3l-6 6", key: "hawz9i" }],
  ["path", { d: "M3 7.8V3m0 0h4.8M3 3l6 6", key: "u9ee12" }],
]);
var Ma = M("FilePenLine", [
  [
    "path",
    {
      d: "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",
      key: "142zxg",
    },
  ],
  [
    "path",
    {
      d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "2t3380",
    },
  ],
  ["path", { d: "M8 18h1", key: "13wk12" }],
]);
var Zt = M("FilePlus2", [
  [
    "path",
    { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M3 15h6", key: "4e2qda" }],
  ["path", { d: "M6 12v6", key: "1u72j0" }],
]);
var _a = M("Files", [
  ["path", { d: "M20 7h-3a2 2 0 0 1-2-2V2", key: "x099mo" }],
  [
    "path",
    {
      d: "M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z",
      key: "18t6ie",
    },
  ],
  ["path", { d: "M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8", key: "1nja0z" }],
]);
var Qt = M("FolderOpen", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0",
    },
  ],
]);
var uf = M("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }],
]);
var Ou = M("Hand", [
  ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1fvzgz" }],
  ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2", key: "1kc0my" }],
  ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8", key: "10h0bg" }],
  [
    "path",
    {
      d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
      key: "1s1gnw",
    },
  ],
]);
var of = M("Highlighter", [
  ["path", { d: "m9 11-6 6v3h9l3-3", key: "1a3l36" }],
  [
    "path",
    {
      d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",
      key: "14a9rk",
    },
  ],
]);
var Kt = M("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt",
    },
  ],
]);
var xt = M("ImagePlus", [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  [
    "path",
    {
      d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
      key: "1ue2ih",
    },
  ],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
]);
var Eu = M("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }],
]);
var ff = M("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
]);
var df = M("Merge", [
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22", key: "1hyw0i" }],
  ["path", { d: "m20 22-5-5", key: "1m27yz" }],
]);
var nf = M("MonitorDown", [
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["path", { d: "m15 10-3 3-3-3", key: "lzhmyn" }],
  [
    "rect",
    { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" },
  ],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
]);
var Uu = M("MousePointer2", [
  [
    "path",
    {
      d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
      key: "edeuup",
    },
  ],
]);
var Va = M("PanelLeftClose", [
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
  ],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }],
]);
var Il = M("Pencil", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu",
    },
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
]);
var rf = M("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
]);
var sf = M("Printer", [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd",
    },
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  [
    "rect",
    { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" },
  ],
]);
var qu = M("Redo2", [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  [
    "path",
    {
      d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",
      key: "6uklza",
    },
  ],
]);
var wl = M("RotateCcw", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
]);
var Jt = M("RotateCw", [
  [
    "path",
    { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" },
  ],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
]);
var AcrobatRotateLeft = M("AcrobatRotateLeft", [
  ["path", { d: "M4 11a8 8 0 1 0 2.34-5.66", key: "acrobat-left-arc" }],
  ["path", { d: "M4 4v7h7", key: "acrobat-left-head" }],
]);
var AcrobatRotateRight = M("AcrobatRotateRight", [
  ["path", { d: "M20 11a8 8 0 1 1-2.34-5.66", key: "acrobat-right-arc" }],
  ["path", { d: "M20 4v7h-7", key: "acrobat-right-head" }],
]);
var Hu = M("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476",
    },
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }],
]);
var cf = M("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
]);
var pf = M("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f",
    },
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
]);
var mf = M("Square", [
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
  ],
]);
var Al = M("TextCursorInput", [
  ["path", { d: "M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1", key: "18xjzo" }],
  ["path", { d: "M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5", key: "fj48gi" }],
  ["path", { d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1", key: "1n9rhb" }],
  ["path", { d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7", key: "13ksps" }],
  ["path", { d: "M9 7v10", key: "1vc8ob" }],
]);
var Oa = M("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
]);
var Nu = M("Undo2", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  [
    "path",
    {
      d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
      key: "f3b9sd",
    },
  ],
]);
var gf = M("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
var Ml = M("ZoomIn", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }],
]);
var Dl = M("ZoomOut", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }],
]);
var d = Za(hf()),
  is = null,
  os = new WeakMap(),
  un = () => (
    is ||
      (is = import("./chunks/pdf-V76QT5PL.js").then(
        (e) => (
          (e.GlobalWorkerOptions.workerSrc = new URL(
            "./pdf.worker.mjs",
            window.location.href,
          ).href),
          e
        ),
      )),
    is
  ),
  ds = (e) => {
    let a = os.get(e);
    if (!a) {
      a = un().then((t) => t.getDocument({ data: e.bytes.slice() }).promise);
      os.set(e, a);
    }
    return a;
  },
  Da = () => crypto.randomUUID(),
  ss = (e) => ((e % 360) + 360) % 360,
  Ee = (e, a, t) => Math.max(a, Math.min(t, e)),
  Pu = () => ({ left: 0, right: 0, top: 0, bottom: 0 }),
  Lt = (e) =>
    e.map((a) => ({
      ...a,
      crop: { ...a.crop },
      points: a.points?.map((t) => ({ ...t })),
    })),
  Wt = (e) => e.map((a) => ({ ...a })),
  rs = (e, a, t) => {
    let l = URL.createObjectURL(new Blob([e], { type: t })),
      u = document.createElement("a");
    ((u.href = l),
      (u.download = a),
      u.click(),
      setTimeout(() => URL.revokeObjectURL(l), 2e3));
  },
  Uh = (e) =>
    new Promise((a, t) => {
      let l = new FileReader();
      ((l.onload = () => a(String(l.result))),
        (l.onerror = () => t(l.error)),
        l.readAsDataURL(e));
    }),
  h1 = (e) =>
    new Promise((a, t) => {
      let l = new Image();
      ((l.onload = () => a({ width: l.naturalWidth, height: l.naturalHeight })),
        (l.onerror = t),
        (l.src = e));
    });
function qh({ source: e, page: a, width: t, onSize: l }) {
  let u = (0, I.useRef)(null),
    o = (0, I.useRef)(null),
    [f, i] = (0, I.useState)(t > 160),
    [r, m] = (0, I.useState)(!0);
  return (
    (0, I.useEffect)(() => {
      if (
        t > 160 ||
        !o.current ||
        typeof IntersectionObserver === "undefined"
      ) {
        i(!0);
        return;
      }
      let n = new IntersectionObserver(([s]) => i(s.isIntersecting), {
        rootMargin: "420px 0px",
      });
      n.observe(o.current);
      return () => n.disconnect();
    }, [t]),
    (0, I.useEffect)(() => {
      let n = !1,
        s;
      return (
        (async () => {
          if (!e || !u.current || !f) return;
          m(!0);
          try {
            let x = await (await ds(e)).getPage(a.index + 1),
              D = ss(a.baseRotation + a.rotation),
              z = x.getViewport({ scale: 1, rotation: D }),
              P = x.getViewport({ scale: t / z.width, rotation: D }),
              p = u.current;
            if (!p || n) return;
            let maxCanvasPixels = 24e6,
              safePixelRatio = Math.sqrt(
                maxCanvasPixels / Math.max(1, P.width * P.height),
              ),
              c = Math.max(
                0.5,
                Math.min(devicePixelRatio || 1, 2, safePixelRatio),
              );
            ((p.width = Math.round(P.width * c)),
              (p.height = Math.round(P.height * c)),
              (p.style.width = `${P.width}px`),
              (p.style.height = `${P.height}px`),
              l?.(P.width, P.height));
            let g = p.getContext("2d");
            if (!g) return;
            (g.setTransform(c, 0, 0, c, 0, 0),
              g.clearRect(0, 0, P.width, P.height),
              (s = x.render({ canvasContext: g, viewport: P })),
              await s.promise,
              n || m(!1));
          } catch {
            n || m(!1);
          }
        })(),
        () => {
          ((n = !0), s?.cancel());
        }
      );
    }, [e, a.docId, a.index, a.baseRotation, a.rotation, t, l, f]),
    (0, d.jsxs)("div", {
      ref: o,
      className: "canvas-wrap",
      style: { width: t },
      children: [
        r &&
          (0, d.jsx)("span", {
            className: "loading",
            children: "Cargando\u2026",
          }),
        (0, d.jsx)("canvas", { ref: u }),
      ],
    })
  );
}
var PDF_EDITOR_FONTS = [
  "Aptos",
  "Arial",
  "Book Antiqua",
  "Calibri",
  "Cambria",
  "Candara",
  "Century Gothic",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Franklin Gothic Medium",
  "Garamond",
  "Georgia",
  "Impact",
  "Lucida Console",
  "Palatino Linotype",
  "Segoe UI",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];
function normalizePdfEditorFont(...e) {
  let a = e
    .filter(Boolean)
    .join(" ")
    .replace(/\b[A-Z]{6}\+/g, "")
    .replace(/[,_-]+/g, " ");
  let t = [
    [/\baptos\b/i, "Aptos"],
    [/\barial\b|helvetica/i, "Arial"],
    [/book\s*antiqua/i, "Book Antiqua"],
    [/\bcalibri\b/i, "Calibri"],
    [/\bcambria\b/i, "Cambria"],
    [/\bcandara\b/i, "Candara"],
    [/century\s*gothic/i, "Century Gothic"],
    [/comic\s*sans/i, "Comic Sans MS"],
    [/\bconsolas\b/i, "Consolas"],
    [/\bconstantia\b/i, "Constantia"],
    [/\bcorbel\b/i, "Corbel"],
    [/courier/i, "Courier New"],
    [/franklin\s*gothic/i, "Franklin Gothic Medium"],
    [/\bgaramond\b/i, "Garamond"],
    [/\bgeorgia\b/i, "Georgia"],
    [/\bimpact\b/i, "Impact"],
    [/lucida\s*console/i, "Lucida Console"],
    [/palatino/i, "Palatino Linotype"],
    [/segoe/i, "Segoe UI"],
    [/\btahoma\b/i, "Tahoma"],
    [/times|times\s*new\s*roman/i, "Times New Roman"],
    [/trebuchet/i, "Trebuchet MS"],
    [/\bverdana\b/i, "Verdana"],
  ];
  for (let [l, u] of t) if (l.test(a)) return u;
  return /mono/i.test(a)
    ? "Courier New"
    : /serif/i.test(a)
      ? "Times New Roman"
      : "Arial";
}
function PdfEditableTextLayer({
  source: e,
  page: a,
  width: t,
  enabled: l,
  editingText,
  onPick: u,
  onLink,
  onSelection,
}) {
  let [o, f] = (0, I.useState)([]),
    [nativeLinks, setNativeLinks] = (0, I.useState)([]),
    [selectedKeys, setSelectedKeys] = (0, I.useState)(new Set()),
    dragSelection = (0, I.useRef)(null),
    suppressClick = (0, I.useRef)(!1),
    updateControlledSelection = (anchorKey, focusKey) => {
      let range = window.PDF_IGNOVA_TEXT_EDIT?.createTextRange(
        o,
        anchorKey,
        focusKey,
      );
      if (!range?.keys?.length) return;
      (setSelectedKeys(new Set(range.keys)), onSelection?.(range.text));
    },
    handleSelectionMove = (event) => {
      let drag = dragSelection.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      let distance = Math.hypot(
        event.clientX - drag.startX,
        event.clientY - drag.startY,
      );
      if (distance < 4 && !drag.moved) return;
      drag.moved = !0;
      let hit = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest?.("[data-pdf-text-key]");
      let focusKey = hit?.getAttribute?.("data-pdf-text-key") || drag.lastKey;
      if (focusKey && focusKey !== drag.lastKey) {
        drag.lastKey = focusKey;
        updateControlledSelection(drag.anchorKey, focusKey);
      } else if (focusKey) updateControlledSelection(drag.anchorKey, focusKey);
      event.preventDefault();
    },
    finishControlledSelection = (event) => {
      let drag = dragSelection.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      if (drag.moved) {
        (updateControlledSelection(drag.anchorKey, drag.lastKey),
          window.getSelection?.()?.removeAllRanges?.(),
          (suppressClick.current = !0),
          event.preventDefault(),
          event.stopPropagation());
      }
      dragSelection.current = null;
    };
  return (
    (0, I.useEffect)(() => {
      let i = !1;
      return (
        (async () => {
          if (!e || !a || !l) {
            f([]);
            setNativeLinks([]);
            setSelectedKeys(new Set());
            return;
          }
          try {
            let r = await (await ds(e)).getPage(a.index + 1),
              m = ss(a.baseRotation + a.rotation),
              C = r.getViewport({ scale: 1, rotation: m }),
              b = r.getViewport({ scale: t / C.width, rotation: m }),
              h = await r.getTextContent(),
              fontObjects = new Map(),
              x = (D, z) => [
                D[0] * z[0] + D[2] * z[1],
                D[1] * z[0] + D[3] * z[1],
                D[0] * z[2] + D[2] * z[3],
                D[1] * z[2] + D[3] * z[3],
                D[0] * z[4] + D[2] * z[5] + D[4],
                D[1] * z[4] + D[3] * z[5] + D[5],
              ];
            try {
              await r.getOperatorList();
              for (let z of new Set(
                h.items
                  .filter((P) => "fontName" in P && P.fontName)
                  .map((P) => P.fontName),
              )) {
                try {
                  fontObjects.set(z, r.commonObjs.get(z));
                } catch {}
              }
            } catch {}
            let
              D = h.items
                .map((z, P) => {
                  if (!("str" in z) || !z.str?.trim()) return null;
                  let p = x(b.transform, z.transform),
                    c = Math.max(7, Math.hypot(p[2], p[3])),
                    g = Math.atan2(p[1], p[0]),
                    S = Math.max(4, (z.width || z.str.length * 4) * b.scale),
                    w = h.styles?.[z.fontName]?.fontFamily || "",
                    sourceFont = fontObjects.get(z.fontName),
                    sourceFontName =
                      sourceFont?.name ||
                      sourceFont?.fallbackName ||
                      sourceFont?.loadedName ||
                      "",
                    fontDescriptor = `${z.fontName || ""} ${w} ${sourceFontName}`,
                    H = normalizePdfEditorFont(sourceFontName, w, z.fontName);
                  return {
                    key: `${P}`,
                    text: z.str,
                    hasEOL: !!z.hasEOL,
                    left: p[4],
                    top: p[5] - c,
                    width: S,
                    height: c,
                    angle: g,
                    font: H,
                    cssFont: sourceFont?.loadedName || w || H,
                    bold: /bold|black|heavy|semibold|demi/i.test(fontDescriptor),
                    italic: /italic|oblique/i.test(fontDescriptor),
                    sourceFontName,
                    sourceFontKey: z.fontName || "",
                    fontSizePdf: c / Math.max(b.scale || 1, 0.0001),
                    pageWidthPoints: C.width,
                    pageWidth: b.width,
                    pageHeight: b.height,
                    link:
                      window.PDF_IGNOVA_LINKS?.detectTextLink(z.str) || null,
                  };
                })
                .filter(Boolean);
            D =
              window.PDF_IGNOVA_TEXT_EDIT?.orderTextItems(D) || D;
            let annotations = [];
            try {
              let linkData = await r.getAnnotations({ intent: "display" });
              annotations = linkData.flatMap((annotation, index) => {
                let target = window.PDF_IGNOVA_LINKS?.normalizeLinkTarget(
                  annotation.url || annotation.unsafeUrl || "",
                );
                if (!target || annotation.rect?.length !== 4) return [];
                let viewportRect = b.convertToViewportRectangle(annotation.rect),
                  left = Math.max(
                    0,
                    Math.min(viewportRect[0], viewportRect[2]),
                  ),
                  top = Math.max(
                    0,
                    Math.min(viewportRect[1], viewportRect[3]),
                  ),
                  right = Math.min(
                    b.width,
                    Math.max(viewportRect[0], viewportRect[2]),
                  ),
                  bottom = Math.min(
                    b.height,
                    Math.max(viewportRect[1], viewportRect[3]),
                  ),
                  width = Math.max(2, right - left),
                  height = Math.max(2, bottom - top),
                  matchingText = D.map((item) => {
                    let overlapWidth = Math.max(
                        0,
                        Math.min(right, item.left + item.width) -
                          Math.max(left, item.left),
                      ),
                      overlapHeight = Math.max(
                        0,
                        Math.min(bottom, item.top + item.height) -
                          Math.max(top, item.top),
                      );
                    return { item, overlap: overlapWidth * overlapHeight };
                  })
                    .filter((entry) => entry.overlap > 0)
                    .sort((first, second) => second.overlap - first.overlap),
                  textItem = matchingText[0]?.item || null,
                  label = [...matchingText]
                    .sort(
                      (first, second) =>
                        first.item.top - second.item.top ||
                        first.item.left - second.item.left,
                    )
                    .map((entry) => entry.item.text.trim())
                    .filter(Boolean)
                    .join(" ");
                return [
                  {
                    key: `annotation-${annotation.id || index}`,
                    target,
                    kind: target.startsWith("mailto:") ? "email" : "web",
                    label: label || target.replace(/^mailto:/i, ""),
                    textItem,
                    left,
                    top,
                    width,
                    height,
                  },
                ];
              });
            } catch {}
            for (let annotationLink of annotations) {
              if (annotationLink.textItem && !annotationLink.textItem.link) {
                annotationLink.textItem.link = {
                  target: annotationLink.target,
                  kind: annotationLink.kind,
                  label: annotationLink.label,
                };
              }
            }
            i ||
              (f(D),
              setNativeLinks(
                annotations.filter((annotationLink) => !annotationLink.textItem),
              ));
          } catch {
            i || (f([]), setNativeLinks([]));
          }
        })(),
        () => {
          i = !0;
        }
      );
    }, [e, a?.docId, a?.index, a?.baseRotation, a?.rotation, t, l]),
    l &&
      (0, d.jsx)("div", {
        className: "pdf-text-layer",
        "aria-label": "Texto editable del PDF",
        children: [
          o.map((i) =>
            (0, d.jsx)(
              "span",
              {
                className: `pdf-text-hit ${i.link ? "pdf-text-link" : ""} ${selectedKeys.has(i.key) ? "pdf-text-selected" : ""}`,
                "data-pdf-text-key": i.key,
                title: editingText
                  ? `Modificar texto: ${i.text}`
                  : i.link
                    ? `Enlace: ${i.link.label}`
                    : `Seleccionar o copiar: ${i.text}`,
                style: {
                  left: i.left,
                  top: i.top,
                  width: i.width,
                  height: Math.max(10, i.height),
                  transform: `rotate(${i.angle}rad)`,
                  fontSize: i.height,
                  fontFamily: i.cssFont || i.font,
                  fontWeight: i.bold ? 700 : 400,
                  fontStyle: i.italic ? "italic" : "normal",
                },
                onPointerDown: (event) => {
                  if (editingText || event.button !== 0 || i.link) return;
                  dragSelection.current = {
                    pointerId: event.pointerId,
                    anchorKey: i.key,
                    lastKey: i.key,
                    startX: event.clientX,
                    startY: event.clientY,
                    moved: !1,
                  };
                  event.currentTarget.setPointerCapture?.(event.pointerId);
                },
                onPointerMove: editingText ? void 0 : handleSelectionMove,
                onPointerUp: editingText ? void 0 : finishControlledSelection,
                onPointerCancel: editingText ? void 0 : finishControlledSelection,
                onClick: (r) => {
                  if (suppressClick.current) {
                    (r.preventDefault(),
                      r.stopPropagation(),
                      (suppressClick.current = !1));
                    return;
                  }
                  if (editingText) {
                    (r.preventDefault(), r.stopPropagation(), u?.(i));
                    return;
                  }
                  let selectedText =
                    window.PDF_IGNOVA_TEXT_SELECTION?.readPdfSelection(
                      document,
                    ) || "";
                  if (selectedText) {
                    r.stopPropagation();
                    return;
                  }
                  (r.preventDefault(), r.stopPropagation());
                  if (i.link) {
                    onLink?.({ ...i.link, textItem: i });
                    return;
                  }
                  (setSelectedKeys(new Set([i.key])), onSelection?.(i.text));
                },
                children: `${i.text}${i.hasEOL ? "\n" : /\s$/.test(i.text) ? "" : " "}`,
              },
              i.key,
            ),
          ),
          nativeLinks.map((link) =>
            (0, d.jsx)(
              "button",
              {
                type: "button",
                className: "pdf-native-link-hit",
                title: `Enlace: ${link.label}`,
                "aria-label": `${link.kind === "email" ? "Correo" : "Enlace"}: ${link.label}`,
                style: {
                  left: link.left,
                  top: link.top,
                  width: link.width,
                  height: link.height,
                },
                onClick: (event) => {
                  (event.preventDefault(),
                    event.stopPropagation(),
                    onLink?.(link));
                },
              },
              link.key,
            ),
          ),
        ],
      })
  );
}
function SearchHighlightLayer({ results: e, pageId: a, currentIndex: t }) {
  let l = [];
  e.forEach((u, o) => {
    u.pageId === a &&
      u.rects.forEach((f, i) => {
        l.push(
          (0, d.jsx)(
            "span",
            {
              className: `search-hit ${o === t ? "current" : ""}`,
              style: {
                left: `${f.x * 100}%`,
                top: `${f.y * 100}%`,
                width: `${f.w * 100}%`,
                height: `${f.h * 100}%`,
                transform: `rotate(${f.angle || 0}rad)`,
              },
            },
            `${o}-${i}`,
          ),
        );
      });
  });
  return (0, d.jsx)("div", {
    className: "search-highlight-layer",
    "aria-hidden": "true",
    children: l,
  });
}
function cs() {
  let e = (0, I.useRef)(null),
    a = (0, I.useRef)(null),
    mergeBuilderInput = (0, I.useRef)(null),
    t = (0, I.useRef)(null),
    l = (0, I.useRef)(null),
    u = (0, I.useRef)(null),
    o = (0, I.useRef)([]),
    f = (0, I.useRef)([]),
    i = (0, I.useRef)([]),
    r = (0, I.useRef)([]),
    m = (0, I.useRef)([]),
    C = (0, I.useRef)(null),
    b = (0, I.useRef)(null),
    h = (0, I.useRef)(null),
    x = (0, I.useRef)({ x: 0.22, y: 0.22 }),
    D = (0, I.useRef)(!1),
    z = (0, I.useRef)(!1),
    P = (0, I.useRef)(null),
    p = (0, I.useRef)(null),
    c = (0, I.useRef)(null),
    ocrDrag = (0, I.useRef)(null),
    screenSelectionDrag = (0, I.useRef)(null),
    zoomWheelAnchor = (0, I.useRef)(null),
    dualSelectionAnchors = (0, I.useRef)({}),
    searchRequest = (0, I.useRef)(0),
    saveDialogInProgress = (0, I.useRef)(!1),
    [g, S] = (0, I.useState)([]),
    [w, H] = (0, I.useState)([]),
    [T, B] = (0, I.useState)([]),
    [O, G] = (0, I.useState)([]),
    [Q, Fu] = (0, I.useState)(null),
    [xf, ms] = (0, I.useState)(""),
    [$t, Ta] = (0, I.useState)(null),
    [ue, ka] = (0, I.useState)(new Set()),
    [on, gs] = (0, I.useState)(null),
    [Tl, Lf] = (0, I.useState)(null),
    [W, Me] = (0, I.useState)("hand"),
    [Cf, Gu] = (0, I.useState)(82),
    [dualPanelOpen, setDualPanelOpen] = (0, I.useState)(!1),
    [pagePanelOpen, setPagePanelOpen] = (0, I.useState)(!1),
    [mergePanelOpen, setMergePanelOpen] = (0, I.useState)(!1),
    [dualPageSelections, setDualPageSelections] = (0, I.useState)({}),
    [pageNumberDraft, setPageNumberDraft] = (0, I.useState)("1"),
    [hs, yf] = (0, I.useState)(!0),
    [fn, kl] = (0, I.useState)(!0),
    [dn, nn] = (0, I.useState)("pages"),
    [xs, Ls] = (0, I.useState)(""),
    [Cs, pa] = (0, I.useState)(""),
    [Ye, Fh] = (0, I.useState)({ w: 680, h: 900 }),
    [zl, De] = (0, I.useState)(null),
    [ea, Xa] = (0, I.useState)(null),
    [rn, Gh] = (0, I.useState)(""),
    [searchResults, setSearchResults] = (0, I.useState)([]),
    [currentSearchIndex, setCurrentSearchIndex] = (0, I.useState)(-1),
    [Vh, Rl] = (0, I.useState)(!1),
    [_u, Xh] = (0, I.useState)(""),
    [Vu, Yh] = (0, I.useState)(null),
    [bs, jh] = (0, I.useState)(""),
    [Ss, Zh] = (0, I.useState)("Aprobaci\xF3n del documento"),
    [vs, Qh] = (0, I.useState)(""),
    [Is, Kh] = (0, I.useState)(""),
    [ws, Jh] = (0, I.useState)(!0),
    [Wh, As] = (0, I.useState)(!1),
    [$h, Ol] = (0, I.useState)(0),
    [Ms, ex] = (0, I.useState)("#e02b3a"),
    [cn, ax] = (0, I.useState)(3),
    [highlightColor, setHighlightColor] = (0, I.useState)("#ffe65c"),
    [highlightOpacity, setHighlightOpacity] = (0, I.useState)(0.38),
    [redactColor, setRedactColor] = (0, I.useState)("#ffffff"),
    [ocrSelection, setOcrSelection] = (0, I.useState)(null),
    [screenSelection, setScreenSelection] = (0, I.useState)(null),
    [ocrRegionResult, setOcrRegionResult] = (0, I.useState)(""),
    [ocrRegionOpen, setOcrRegionOpen] = (0, I.useState)(!1),
    [ocrRegionBusy, setOcrRegionBusy] = (0, I.useState)(!1),
    [linkChoice, setLinkChoice] = (0, I.useState)(null),
    [newTextDialog, setNewTextDialog] = (0, I.useState)(null),
    [newTextDraft, setNewTextDraft] = (0, I.useState)(""),
    [nativeSelectionText, setNativeSelectionText] = (0, I.useState)("");
  ((0, I.useEffect)(() => {
    o.current = w;
  }, [w]),
    (0, I.useEffect)(() => {
      f.current = T;
    }, [T]),
    (0, I.useEffect)(() => {
      i.current = O;
    }, [O]),
    (0, I.useEffect)(() => {
      Q &&
        G((n) => {
          let s = n.map((L) => (L.id === Q ? { ...L, pages: w, marks: T } : L));
          return ((i.current = s), s);
        });
    }, [Q, T, w]),
    (0, I.useEffect)(() => {
      ms((n) =>
        O.some((s) => s.id === n && s.id !== Q)
          ? n
          : O.find((s) => s.id !== Q)?.id || "",
      );
    }, [Q, O]));
  (0, I.useEffect)(() => {
    O.length < 2 && setDualPanelOpen(!1);
  }, [O.length]);
  (0, I.useEffect)(() => {
    if (!Q) return;
    let selectedIds = [...ue];
    setDualPageSelections((current) => {
      let previousIds = current[Q] || [];
      return previousIds.length === selectedIds.length &&
        previousIds.every((id, index) => id === selectedIds[index])
        ? current
        : { ...current, [Q]: selectedIds };
    });
  }, [Q, ue]);
  (0, I.useEffect)(() => {
    let syncSelection = () => {
      let selectedText =
        W === "select"
          ? window.PDF_IGNOVA_TEXT_SELECTION?.readPdfSelection(document) || ""
          : "";
      if (selectedText) {
        setNativeSelectionText((current) =>
          current === selectedText ? current : selectedText,
        );
      } else if (W !== "select") setNativeSelectionText("");
    };
    (document.addEventListener("selectionchange", syncSelection),
      syncSelection());
    return () => document.removeEventListener("selectionchange", syncSelection);
  }, [W, $t]);
  (0, I.useEffect)(() => {
    let pageIndex = Math.max(0, w.findIndex((page) => page.id === $t));
    setPageNumberDraft(w.length ? String(pageIndex + 1) : "0");
  }, [$t, w.length]);
  (0, I.useLayoutEffect)(() => {
    let anchor = zoomWheelAnchor.current;
    if (!anchor || anchor.zoom === Cf) return;
    let stage = anchor.stage;
    if (!stage?.isConnected) {
      zoomWheelAnchor.current = null;
      return;
    }
    let ratio = Cf / Math.max(anchor.zoom, 1);
    stage.scrollLeft = anchor.contentX * ratio - anchor.offsetX;
    stage.scrollTop = anchor.contentY * ratio - anchor.offsetY;
    zoomWheelAnchor.current = null;
  }, [Cf]);
  let Ue = Math.max(
      0,
      w.findIndex((n) => n.id === $t),
    ),
    $ = w[Ue],
    pn = O.find((n) => n.id === Q),
    mn = O.find((n) => n.id === xf),
    gn = g.find((n) => n.id === $?.docId),
    U = T.find((n) => n.id === zl),
    tx = (0, I.useCallback)((n, s) => {
      Fh((L) => (L.w === n && L.h === s ? L : { w: n, h: s }));
    }, []),
    F = (0, I.useCallback)((n) => {
      (Ls(n), setTimeout(() => Ls(""), 2800));
    }, []),
    commitPageNumber = (0, I.useCallback)(() => {
      let requestedPage = Number.parseInt(pageNumberDraft, 10);
      if (!w.length) {
        setPageNumberDraft("0");
        return;
      }
      if (!Number.isFinite(requestedPage)) requestedPage = Ue + 1;
      requestedPage = Ee(requestedPage, 1, w.length);
      Hl(requestedPage - 1);
      setPageNumberDraft(String(requestedPage));
    }, [pageNumberDraft, Ue, w.length]),
    readNativePdfSelection = (0, I.useCallback)(() => {
      return (
        window.PDF_IGNOVA_TEXT_SELECTION?.readPdfSelection(document) ||
        nativeSelectionText ||
        ""
      );
    }, [nativeSelectionText]),
    copyNativePdfSelection = (0, I.useCallback)(
      async (selectedText) => {
        let text =
          window.PDF_IGNOVA_TEXT_SELECTION?.normalizeSelectedText(
            selectedText || readNativePdfSelection(),
          ) || "";
        if (!text) {
          F("Selecciona texto del PDF antes de copiar");
          return !1;
        }
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          let fallback = document.createElement("textarea");
          ((fallback.value = text),
            (fallback.style.position = "fixed"),
            (fallback.style.opacity = "0"),
            document.body.append(fallback),
            fallback.select(),
            document.execCommand("copy"),
            fallback.remove());
        }
        (setNativeSelectionText(text), F("Texto seleccionado copiado"));
        return !0;
      },
      [F, readNativePdfSelection],
    ),
    activateNativeTextSelection = (0, I.useCallback)(() => {
      (Me("select"),
        De(null),
        setScreenSelection(null),
        F("Arrastra sobre texto o marca una zona de la página"));
    }, [F]),
    activatePdfTextModification = (0, I.useCallback)(() => {
      (Me("modify-text"),
        De(null),
        setNativeSelectionText(""),
        F("Haz clic en el texto del PDF que quieres modificar"));
    }, [F]),
    El = (0, I.useCallback)((n) => {
      let s = Wt(n.pages),
        L = Lt(n.marks);
      ((o.current = s),
        (f.current = L),
        H(s),
        B(L),
        Fu(n.id),
        Ta(s[0]?.id || null),
        ka(new Set(s[0] ? [s[0].id] : [])),
        De(null),
        gs(null),
        (searchRequest.current += 1),
        setSearchResults([]),
        setCurrentSearchIndex(-1),
        (r.current = []),
        (m.current = []),
        Ol((y) => y + 1),
        u.current?.scrollTo({ top: 0, left: 0 }));
    }, []),
    lx = (0, I.useCallback)(
      (n) => {
        if (n === Q) return;
        let s = i.current.map((y) =>
            y.id === Q
              ? { ...y, pages: Wt(o.current), marks: Lt(f.current) }
              : y,
          ),
          L = s.find((y) => y.id === n);
        L && ((i.current = s), G(s), El(L));
      },
      [Q, El],
    ),
    ux = (0, I.useCallback)(
      (n) => {
        let s = i.current.map((k) =>
            k.id === Q
              ? { ...k, pages: Wt(o.current), marks: Lt(f.current) }
              : k,
          ),
          L = s.findIndex((k) => k.id === n);
        if (L < 0) return;
        let y = s.filter((k) => k.id !== n);
        if (((i.current = y), G(y), n !== Q)) return;
        let A = y[Math.min(L, y.length - 1)];
        if (A) {
          El(A);
          return;
        }
        (S([]),
          (o.current = []),
          (f.current = []),
          H([]),
          B([]),
          Fu(null),
          Ta(null),
          ka(new Set()),
          De(null),
          (searchRequest.current += 1),
          setSearchResults([]),
          setCurrentSearchIndex(-1),
          (r.current = []),
          (m.current = []),
          Ol((k) => k + 1));
      },
      [Q, El],
    ),
    Ul = (0, I.useCallback)(
      () => ({ pages: Wt(o.current), marks: Lt(f.current) }),
      [],
    ),
    Te = (0, I.useCallback)(() => {
      (r.current.push(Ul()),
        r.current.length > 80 && r.current.shift(),
        (m.current = []),
        Ol((n) => n + 1));
    }, [Ul]),
    bf = (0, I.useCallback)((n) => {
      let s = Wt(n.pages),
        L = Lt(n.marks);
      ((o.current = s),
        (f.current = L),
        H(s),
        B(L),
        De(null),
        Ta((y) => (s.some((A) => A.id === y) ? y : s[0]?.id || null)),
        ka((y) => {
          let A = new Set([...y].filter((k) => s.some((_) => _.id === k)));
          return (!A.size && s[0] && A.add(s[0].id), A);
        }));
    }, []),
    Ds = (0, I.useCallback)(
      (n) => {
        (Te(),
          H((s) => {
            let L = n(s);
            return ((o.current = L), L);
          }));
      },
      [Te],
    ),
    aa = (0, I.useCallback)(
      (n, s = !0) => {
        (s && Te(),
          B((L) => {
            let y = n(L);
            return ((f.current = y), y);
          }));
      },
      [Te],
    ),
    ma = (0, I.useCallback)(
      (n, s, L = !1) => {
        aa((y) => y.map((A) => (A.id === n ? { ...A, ...s } : A)), L);
      },
      [aa],
    ),
    wx = (0, I.useCallback)(
      (n) => {
        if (!$ || W !== "modify-text") return;
        let s = `${$.docId}:${$.index}:${n.key}`,
          L = f.current.find(
            (k) => k.pageId === $.id && k.sourceTextKey === s,
          );
        if (L) {
          (De(L.id),
            kl(!0),
            setTimeout(
              () =>
                document
                  .querySelector(".right .editor-properties textarea")
                  ?.focus(),
              0,
            ));
          return;
        }
        let y = Ee(n.left / n.pageWidth, 0, 0.98),
          A = Ee(n.top / n.pageHeight, 0, 0.98),
          R = Ee((n.left - 2) / n.pageWidth, 0, 0.99),
          ne = Ee((n.top - n.height * 0.2 - 1) / n.pageHeight, 0, 0.99),
          oe = Ee((n.width + 5) / n.pageWidth, 0.01, 1 - R),
          Y = Ee((n.height * 1.4 + 3) / n.pageHeight, 0.012, 1 - ne),
          appearance = window.PDF_IGNOVA_TEXT_EDIT?.captureTextAppearance(
            document.querySelector(".pagestage .canvas-wrap canvas"),
            {
              left: n.left - 2,
              top: n.top - n.height * 0.2 - 1,
              width: n.width + 5,
              height: n.height * 1.4 + 3,
              pageWidth: n.pageWidth,
              pageHeight: n.pageHeight,
            },
          ),
          k = {
            id: Da(),
            pageId: $.id,
            type: "text",
            text: n.text,
            x: y,
            y: A,
            w: Ee(n.width / n.pageWidth + 0.008, 0.025, 1 - y),
            h: Ee(n.height / n.pageHeight + 0.006, 0.018, 1 - A),
            color: appearance?.textColor || "#111111",
            backgroundColor: appearance?.backgroundColor || "#ffffff",
            backgroundPatchData: null,
            size: Ee(Math.round(n.fontSizePdf || n.height), 6, 144),
            fontSizeRatio:
              (n.fontSizePdf || n.height) /
              Math.max(n.pageWidthPoints || n.pageWidth, 1),
            pageWidthPoints: n.pageWidthPoints || n.pageWidth,
            font: n.font,
            cssFont: n.cssFont || n.font,
            bold: n.bold,
            italic: !!n.italic,
            underline: !1,
            sourceFontName: n.sourceFontName || n.font,
            sourceFontKey: n.sourceFontKey || "",
            angle: (n.angle * 180) / Math.PI,
            preserveSourceFont: !0,
            textDirty: !1,
            styleDirty: !1,
            replaceOriginal: !0,
            sourceTextKey: s,
            sourceText: n.text,
            sourceRect: { x: R, y: ne, w: oe, h: Y },
            crop: Pu(),
          };
        (aa((_) => [..._, k]),
          De(k.id),
          kl(!0),
          F("Modifica el texto en el panel derecho; no se crea ningún cuadro"),
          setTimeout(
            () =>
              document
                .querySelector(".right .editor-properties textarea")
                ?.focus(),
            0,
          ));
      },
      [$, W, aa, F],
    ),
    handlePdfLink = (0, I.useCallback)(
      (link) => {
        let target = window.PDF_IGNOVA_LINKS?.normalizeLinkTarget(
          link?.target,
        );
        if (!target) {
          F("No se pudo abrir el enlace");
          return;
        }
        setLinkChoice({
          target,
          kind: target.startsWith("mailto:") ? "email" : "web",
          label: link.label || target.replace(/^mailto:/i, ""),
          textItem: link.textItem || null,
        });
      },
      [F],
    ),
    openPdfLink = (0, I.useCallback)(async () => {
      let link = linkChoice;
      if (!link) return;
      setLinkChoice(null);
      try {
        if (typeof window.pdfEstudio?.openExternalLink === "function") {
          await window.pdfEstudio.openExternalLink(link.target);
        } else {
          window.open(link.target, "_blank", "noopener,noreferrer");
        }
        F(
          link.kind === "email"
            ? "Abriendo el programa de correo"
            : "Abriendo el enlace",
        );
      } catch {
        F("No se pudo abrir el enlace");
      }
    }, [linkChoice, F]),
    editPdfLink = (0, I.useCallback)(() => {
      let textItem = linkChoice?.textItem || null;
      setLinkChoice(null);
      if (textItem) wx(textItem);
      else F("Este enlace no tiene texto editable asociado");
    }, [linkChoice, wx, F]),
    hn = (0, I.useCallback)(() => {
      let n = r.current.pop();
      n &&
        (m.current.push(Ul()),
        bf(n),
        Ol((s) => s + 1),
        F("Acci\xF3n deshecha"));
    }, [bf, Ul, F]),
    Sf = (0, I.useCallback)(() => {
      let n = m.current.pop();
      n &&
        (r.current.push(Ul()), bf(n), Ol((s) => s + 1), F("Acci\xF3n rehecha"));
    }, [bf, Ul, F]),
    Ts = (0, I.useCallback)(
      async (n, s) => {
        let L = Array.from(n).filter(
          (y) =>
            y.bytes ||
            y.type === "application/pdf" ||
            y.name.toLowerCase().endsWith(".pdf"),
        );
        if (!L.length) {
          F("Selecciona un archivo compatible");
          return;
        }
        pa("Leyendo documentos\u2026");
        try {
          let y = [],
            A = [],
            k = [];
          for (let _ of L) {
            let pe = _.bytes
                ? new Uint8Array(_.bytes)
                : new Uint8Array(await _.arrayBuffer()),
              xe = Da(),
              Se = [],
              R = (await un()).getDocument({ data: pe.slice() }),
              ne = await R.promise;
            let oe = { id: xe, name: _.name, bytes: pe };
            (y.push(oe), os.set(oe, Promise.resolve(ne)));
            for (let oe = 0; oe < ne.numPages; oe += 1) {
              let Y = await ne.getPage(oe + 1),
                ga = {
                  id: Da(),
                  docId: xe,
                  index: oe,
                  baseRotation: Y.rotate || 0,
                  rotation: 0,
                };
              (Se.push(ga), A.push(ga));
            }
            k.push({ id: Da(), name: _.name, pages: Se, marks: [] });
          }
          S((_) => [..._, ...y]);
          if (s === "combine") {
            let combinedDocument = {
                id: Da(),
                name:
                  L.length === 1
                    ? L[0].name
                    : "PDF combinado.pdf",
                pages: A,
                marks: [],
              },
              pe = [
                ...i.current.map((xe) =>
                  xe.id === Q
                    ? { ...xe, pages: Wt(o.current), marks: Lt(f.current) }
                    : xe,
                ),
                combinedDocument,
              ];
            ((i.current = pe),
              G(pe),
              El(combinedDocument),
              F(
                `${L.length} PDF unidos en un documento de ${A.length} páginas`,
              ));
          } else if (s === "open" || !Q) {
            let pe = [
              ...i.current.map((xe) =>
                xe.id === Q
                  ? { ...xe, pages: Wt(o.current), marks: Lt(f.current) }
                  : xe,
              ),
              ...k,
            ];
            ((i.current = pe),
              G(pe),
              El(k[0]),
              F(
                `${k.length} PDF ${k.length === 1 ? "abierto" : "abiertos"} en pesta\xF1as`,
              ));
          } else
            (Te(),
              H((_) => {
                let pe = [..._, ...A];
                return ((o.current = pe), pe);
              }),
              Ta(A[0]?.id || $t),
              ka(new Set(A[0] ? [A[0].id] : [])),
              F(
                `${A.length} p\xE1gina${A.length === 1 ? "" : "s"} a\xF1adidas al PDF actual`,
              ));
        } catch (y) {
          (console.error(y),
            F("No se pudo abrir el PDF. Puede estar protegido o da\xF1ado"));
        }
        pa("");
      },
      [$t, Q, Te, El, F],
    ),
    Jx = async (n, s) => {
      if (!s?.length) {
        (n === "open" ? e : n === "combine" ? mergeBuilderInput : a).current?.click();
        return;
      }
      let L = Array.from(s),
        y = L.filter((A) => A.name?.toLowerCase().endsWith(".pdf"));
      if (!window.pdfEstudio) {
        (y.length && (await Ts(y, n)),
          y.length !== L.length &&
            F("La conversi\xF3n de Office, DWG e im\xE1genes requiere la aplicaci\xF3n de escritorio"));
        return;
      }
      pa("Abriendo o convirtiendo documentos\u2026");
      try {
        let A = L.map((_) => {
            try {
              return window.pdfEstudio.getPathForFile?.(_) || "";
            } catch {
              return "";
            }
          }),
          k;
        if (A.length && A.every(Boolean))
          k = await window.pdfEstudio.convertDocumentPaths(A);
        else {
          let _ = await Promise.all(
            L.map(async (pe) => ({ name: pe.name, bytes: await pe.arrayBuffer() })),
          );
          k = await window.pdfEstudio.convertDocumentFiles(_);
        }
        let pe = (k || []).filter((xe) => !xe.error);
        if (pe.length) await Ts(pe, n);
        let xe = (k || []).find((Se) => Se.error);
        if (xe) F(`${xe.name}: ${xe.error}`);
      } catch (A) {
        (console.error(A),
          y.length && (await Ts(y, n)),
          F(
            y.length
              ? "Se abrieron los PDF; no se pudieron convertir los dem\xE1s archivos"
              : "No se pudieron convertir los documentos",
          ));
      }
      pa("");
    },
    createBlankDocument = async () => {
      pa("Creando PDF en blanco\u2026");
      try {
        let { PDFDocument: n } = await import("./chunks/es-4HSNR7QU.js"),
          s = await n.create();
        s.addPage([595.28, 841.89]);
        let L = new Uint8Array(await s.save());
        (await Ts(
          [{ name: "Nuevo documento.pdf", type: "application/pdf", bytes: L }],
          "open",
        ),
          F("PDF en blanco creado. Ya puedes pegar o a\xF1adir p\xE1ginas"));
      } catch (n) {
        (console.error(n), F("No se pudo crear el PDF en blanco"));
      }
      pa("");
    },
    ks = async (n, s) => {
      let L = n.target.files ? Array.from(n.target.files) : [];
      ((n.target.value = ""), L.length && (await Jx(s, L)));
    },
    ox = (n, s, L) => {
      (Ta(s),
        ka((y) => {
          if (n.shiftKey && on !== null)
            return new Set(
              w.slice(Math.min(on, L), Math.max(on, L) + 1).map((A) => A.id),
            );
          if (n.ctrlKey || n.metaKey) {
            let A = new Set(y);
            return (A.has(s) ? A.delete(s) : A.add(s), A);
          }
          return new Set([s]);
        }),
        n.shiftKey || gs(L));
    },
    selectOrganizerPage = (event, documentItem, page, pageIndex) => {
      if (documentItem.id === Q) {
        ox(event, page.id, pageIndex);
        dualSelectionAnchors.current[documentItem.id] = pageIndex;
        return;
      }
      let additive = event.ctrlKey || event.metaKey,
        range = event.shiftKey,
        anchorIndex = dualSelectionAnchors.current[documentItem.id];
      setDualPageSelections((current) => {
        let selected = new Set(current[documentItem.id] || []);
        if (range && Number.isInteger(anchorIndex)) {
          selected = new Set(
            documentItem.pages
              .slice(
                Math.min(anchorIndex, pageIndex),
                Math.max(anchorIndex, pageIndex) + 1,
              )
              .map((item) => item.id),
          );
        } else if (additive) {
          selected.has(page.id)
            ? selected.delete(page.id)
            : selected.add(page.id);
        } else selected = new Set([page.id]);
        return { ...current, [documentItem.id]: [...selected] };
      });
      if (!range) dualSelectionAnchors.current[documentItem.id] = pageIndex;
    },
    ql = (0, I.useCallback)(() => {
      if (!ue.size) return;
      Te();
      let n = o.current.filter((y) => !ue.has(y.id)),
        s = f.current.filter((y) => !ue.has(y.pageId));
      ((o.current = n), (f.current = s), H(n), B(s));
      let L = n[Math.min(Ue, n.length - 1)];
      (Ta(L?.id || null),
        ka(new Set(L ? [L.id] : [])),
        De(null),
        F("P\xE1ginas eliminadas"));
    }, [Ue, Te, ue, F]),
    Xu = (0, I.useCallback)(() => {
      if (!ue.size) return;
      Te();
      let n = [],
        s = Lt(f.current);
      for (let L of o.current)
        if ((n.push(L), ue.has(L.id))) {
          let y = Da();
          (n.push({ ...L, id: y }),
            s.push(
              ...f.current
                .filter((A) => A.pageId === L.id)
                .map((A) => ({
                  ...A,
                  id: Da(),
                  pageId: y,
                  crop: { ...A.crop },
                  points: A.points?.map((k) => ({ ...k })),
                })),
            ));
        }
      ((o.current = n), (f.current = s), H(n), B(s), F("P\xE1ginas copiadas"));
    }, [Te, ue, F]),
    Yu = (0, I.useCallback)(
      (n, s = xf) => {
        if (!Q || !s || s === Q) return;
        let L = i.current.find((R) => R.id === s);
        if (!L) return;
        let y = new Set(ue.size ? [...ue] : $t ? [$t] : []),
          A = o.current.filter((R) => y.has(R.id));
        if (!A.length) {
          F("Selecciona una o varias p\xE1ginas");
          return;
        }
        let k = new Map(),
          _ = A.map((R) => {
            let ne = n === "copy" ? Da() : R.id;
            return (k.set(R.id, ne), { ...R, id: ne });
          }),
          pe = f.current
            .filter((R) => y.has(R.pageId))
            .map((R) => ({
              ...R,
              id: n === "copy" ? Da() : R.id,
              pageId: k.get(R.pageId) || R.pageId,
              crop: { ...R.crop },
              points: R.points?.map((ne) => ({ ...ne })),
            })),
          xe =
            n === "move"
              ? o.current.filter((R) => !y.has(R.id))
              : Wt(o.current),
          Se =
            n === "move"
              ? f.current.filter((R) => !y.has(R.pageId))
              : Lt(f.current),
          he = i.current.map((R) =>
            R.id === Q
              ? { ...R, pages: xe, marks: Se }
              : R.id === s
                ? {
                    ...R,
                    pages: [...Wt(R.pages), ..._],
                    marks: [...Lt(R.marks), ...pe],
                  }
                : R,
          );
        if (((i.current = he), G(he), n === "move")) {
          ((o.current = xe), (f.current = Se), H(xe), B(Se));
          let R = xe[Math.min(Ue, xe.length - 1)];
          (Ta(R?.id || null), ka(new Set(R ? [R.id] : [])), De(null));
        }
        F(
          `${A.length} p\xE1gina${A.length === 1 ? "" : "s"} ${n === "copy" ? "copiada" : "movida"}${A.length === 1 ? "" : "s"} a ${L.name}`,
        );
      },
      [$t, Ue, Q, ue, F, xf],
    ),
    transferPagesBetweenPanels = (0, I.useCallback)(
      (event, targetDocumentId, targetIndex) => {
        event.preventDefault();
        event.stopPropagation();
        let payload;
        try {
          payload = JSON.parse(
            event.dataTransfer.getData("application/x-pdf-ignova-pages"),
          );
        } catch {
          return;
        }
        if (!payload?.documentId || !Array.isArray(payload.pageIds)) return;
        let copyPages = event.ctrlKey || event.metaKey || payload.copy,
          documents = i.current.map((documentItem) =>
            documentItem.id === Q
              ? {
                  ...documentItem,
                  pages: Wt(o.current),
                  marks: Lt(f.current),
                }
              : {
                  ...documentItem,
                  pages: Wt(documentItem.pages),
                  marks: Lt(documentItem.marks),
                },
          ),
          sourceDocument = documents.find(
            (documentItem) => documentItem.id === payload.documentId,
          ),
          targetDocument = documents.find(
            (documentItem) => documentItem.id === targetDocumentId,
          );
        if (!sourceDocument || !targetDocument) return;
        let requestedIds = new Set(payload.pageIds),
          sourcePages = sourceDocument.pages.filter((page) => requestedIds.has(page.id));
        if (!sourcePages.length) return;

        if (sourceDocument.id === targetDocument.id) {
          let movingIds = new Set(sourcePages.map((page) => page.id)),
            remainingPages = sourceDocument.pages.filter((page) => !movingIds.has(page.id)),
            precedingMovedPages = sourceDocument.pages
              .slice(0, targetIndex)
              .filter((page) => movingIds.has(page.id)).length,
            insertionIndex = Ee(
              targetIndex - precedingMovedPages,
              0,
              remainingPages.length,
            ),
            reorderedPages = [...remainingPages];
          reorderedPages.splice(insertionIndex, 0, ...sourcePages);
          documents = documents.map((documentItem) =>
            documentItem.id === sourceDocument.id
              ? { ...documentItem, pages: reorderedPages }
              : documentItem,
          );
        } else {
          let idMap = new Map(),
            insertedPages = sourcePages.map((page) => {
              let nextId = copyPages ? Da() : page.id;
              idMap.set(page.id, nextId);
              return { ...page, id: nextId };
            }),
            insertedMarks = sourceDocument.marks
              .filter((mark) => requestedIds.has(mark.pageId))
              .map((mark) => ({
                ...mark,
                id: copyPages ? Da() : mark.id,
                pageId: idMap.get(mark.pageId) || mark.pageId,
                crop: { ...mark.crop },
                points: mark.points?.map((point) => ({ ...point })),
              })),
            destinationPages = [...targetDocument.pages],
            insertionIndex = Ee(targetIndex, 0, destinationPages.length);
          destinationPages.splice(insertionIndex, 0, ...insertedPages);
          documents = documents.map((documentItem) => {
            if (documentItem.id === sourceDocument.id && !copyPages)
              return {
                ...documentItem,
                pages: documentItem.pages.filter((page) => !requestedIds.has(page.id)),
                marks: documentItem.marks.filter((mark) => !requestedIds.has(mark.pageId)),
              };
            if (documentItem.id === targetDocument.id)
              return {
                ...documentItem,
                pages: destinationPages,
                marks: [...documentItem.marks, ...insertedMarks],
              };
            return documentItem;
          });
        }

        ((i.current = documents), G(documents));
        setDualPageSelections((current) => {
          let next = { ...current };
          documents.forEach((documentItem) => {
            let existing = new Set(current[documentItem.id] || []);
            next[documentItem.id] = documentItem.pages
              .filter((page) => existing.has(page.id))
              .map((page) => page.id);
          });
          return next;
        });
        let activeDocument = documents.find((documentItem) => documentItem.id === Q);
        if (activeDocument) {
          ((o.current = Wt(activeDocument.pages)),
            (f.current = Lt(activeDocument.marks)),
            H(o.current),
            B(f.current));
          let selectedPage = activeDocument.pages.find((page) =>
            payload.pageIds.includes(page.id),
          ) || activeDocument.pages[0];
          (Ta(selectedPage?.id || null),
            ka(new Set(selectedPage ? [selectedPage.id] : [])),
            De(null));
        }
        F(
          sourceDocument.id === targetDocument.id
            ? "Páginas reordenadas"
            : `${sourcePages.length} página${sourcePages.length === 1 ? "" : "s"} ${copyPages ? "copiada" : "movida"}${sourcePages.length === 1 ? "" : "s"}`,
        );
      },
      [Q, F],
    ),
    el = (n) => {
      Ds((s) =>
        s.map((L) =>
          ue.has(L.id) || (!ue.size && L.id === $t)
            ? { ...L, rotation: ss(L.rotation + n) }
            : L,
        ),
      );
    },
    fx = (n) => {
      !Tl ||
        Tl === n ||
        (Ds((s) => {
          let L = [...s],
            y = L.findIndex((k) => k.id === Tl),
            A = L.findIndex((k) => k.id === n);
          return (L.splice(A, 0, L.splice(y, 1)[0]), L);
        }),
        Lf(null));
    },
    Hl = (n) => {
      let s = w[Math.max(0, Math.min(w.length - 1, n))];
      s && (Ta(s.id), ka(new Set([s.id])));
    },
    ju = (n, s, L) => {
      let y = n.getBoundingClientRect();
      return {
        x: Ee((s - y.left) / y.width, 0, 0.98),
        y: Ee((L - y.top) / y.height, 0, 0.98),
      };
    },
    Zu = (0, I.useCallback)(
      async (n, s) => {
        if (!$) {
          F("Abre un PDF antes de insertar una imagen");
          return;
        }
        try {
          let L = await h1(n),
            y = 0.34,
            A = Ye.w / Ye.h,
            k = Ee(y * A * (L.height / L.width), 0.07, 0.55),
            _ = s || { x: 0.18, y: 0.18 },
            pe = {
              id: Da(),
              pageId: $.id,
              type: "image",
              text: "",
              imageData: n,
              x: Ee(_.x, 0, 1 - y),
              y: Ee(_.y, 0, 1 - k),
              w: y,
              h: k,
              color: "#ffffff",
              size: 16,
              font: "Arial",
              bold: !1,
              crop: Pu(),
            };
          (aa((xe) => [...xe, pe]),
            De(pe.id),
            kl(!0),
            Me("select"),
            F("Imagen insertada: puedes moverla, ampliarla y recortarla"));
        } catch {
          F("No se pudo leer la imagen");
        }
      },
      [$, Ye, aa, F],
    ),
    dx = async (n) => {
      let s = n.target.files?.[0];
      if (((n.target.value = ""), !s)) return;
      let L = await Uh(s);
      if (h.current) {
        let A = h.current;
        ((h.current = null),
          (b.current = null),
          ma(A, { imageData: L, crop: Pu() }, !0),
          De(A),
          F("Imagen sustituida"));
        return;
      }
      let y = b.current || void 0;
      ((b.current = null), await Zu(L, y));
    },
    Qu = (n, s) => {
      ((b.current = n || null), (h.current = s || null), t.current?.click());
    },
    zs = (0, I.useCallback)(async () => {
      try {
        return (await window.pdfEstudio?.readClipboardImage()) || null;
      } catch {
        return null;
      }
    }, []),
    xn = (0, I.useCallback)(
      async (n) => {
        if (!$) return;
        if (C.current) {
          let L = C.current,
            y = {
              ...L,
              id: Da(),
              pageId: $.id,
              x: Ee(n.x, 0, 1 - L.w),
              y: Ee(n.y, 0, 1 - L.h),
              crop: { ...L.crop },
              points: L.points?.map((A) => ({ ...A })),
            };
          (aa((A) => [...A, y]), De(y.id), Me("select"), F("Elemento pegado"));
          return;
        }
        let s = await zs();
        if (!s) {
          F(
            "No hay una imagen en el portapapeles. Copia una imagen y vuelve a intentarlo",
          );
          return;
        }
        await Zu(s, n);
      },
      [$, aa, Zu, zs, F],
    ),
    runOcrRegion = async (n) => {
      if (!$ || !gn || !window.pdfEstudio?.ocrPage) {
        F("El OCR de ventana requiere la aplicaci\xF3n de escritorio");
        return;
      }
      if (n.w < 0.012 || n.h < 0.012) {
        (setOcrSelection(null), F("Selecciona una ventana m\xE1s grande"));
        return;
      }
      (setOcrRegionBusy(!0), pa("Reconociendo el texto de la ventana\u2026"));
      try {
        let s = await (await ds(gn)).getPage($.index + 1),
          L = ss($.baseRotation + $.rotation),
          y = s.getViewport({ scale: 1, rotation: L }),
          A = Math.min(3, 2800 / Math.max(1, y.width, y.height)),
          k = s.getViewport({ scale: Math.max(1.5, A), rotation: L }),
          _ = document.createElement("canvas");
        ((_.width = Math.max(1, Math.ceil(k.width))),
          (_.height = Math.max(1, Math.ceil(k.height))));
        let pe = _.getContext("2d", { alpha: !1 });
        if (!pe) throw new Error("No se pudo preparar la ventana para OCR");
        await s.render({
          canvasContext: pe,
          viewport: k,
          background: "rgb(255, 255, 255)",
        }).promise;
        let xe = document.createElement("canvas"),
          Se = Math.max(0, Math.floor(n.x * _.width)),
          he = Math.max(0, Math.floor(n.y * _.height)),
          R = Math.max(1, Math.min(_.width - Se, Math.ceil(n.w * _.width))),
          ne = Math.max(1, Math.min(_.height - he, Math.ceil(n.h * _.height)));
        ((xe.width = R), (xe.height = ne));
        let oe = xe.getContext("2d", { alpha: !1 });
        if (!oe) throw new Error("No se pudo recortar la ventana para OCR");
        (oe.fillStyle = "#ffffff", oe.fillRect(0, 0, R, ne));
        oe.drawImage(_, Se, he, R, ne, 0, 0, R, ne);
        let Y = await new Promise((ga, Nl) =>
            xe.toBlob(
              (Ju) =>
                Ju
                  ? ga(Ju)
                  : Nl(new Error("No se pudo preparar la imagen para OCR")),
              "image/png",
            ),
          ),
          ga = await window.pdfEstudio.ocrPage(await Y.arrayBuffer()),
          Nl = String(ga?.text || "").trim();
        (setOcrRegionResult(Nl),
          setOcrRegionOpen(!0),
          F(Nl ? "OCR de ventana completado" : "No se detect\xF3 texto en la ventana"));
      } catch (n) {
        (console.error(n),
          F(`No se pudo realizar el OCR: ${n?.message || "error desconocido"}`));
      } finally {
        (setOcrRegionBusy(!1), pa(""), Me("hand"));
      }
    },
    insertOcrRegionText = () => {
      if (!$ || !ocrSelection || !ocrRegionResult.trim()) return;
      let n = {
        id: Da(),
        pageId: $.id,
        type: "text",
        text: ocrRegionResult.trim(),
        x: ocrSelection.x,
        y: ocrSelection.y,
        w: Math.max(0.12, ocrSelection.w),
        h: Math.max(0.045, ocrSelection.h),
        color: "#111111",
        size: 14,
        font: "Arial",
        bold: !1,
        italic: !1,
        underline: !1,
        crop: Pu(),
      };
      (aa((s) => [...s, n]),
        De(n.id),
        kl(!0),
        setOcrRegionOpen(!1),
        setOcrSelection(null),
        Me("select"),
        F("Texto del OCR insertado en el PDF"));
    },
    confirmNewText = () => {
      if (!newTextDialog) return;
      let text = newTextDraft.replace(/\r/g, "");
      if (!text.trim()) {
        F("Escribe el texto que quieres crear");
        return;
      }
      let lines = text.split("\n"),
        lineCount = Math.max(1, lines.length),
        longestLine = Math.max(1, ...lines.map((line) => line.length)),
        pageWidthPoints = Math.max(newTextDialog.pageWidthPoints || 595.28, 1),
        pageHeightPoints = Math.max(newTextDialog.pageHeightPoints || 841.89, 1),
        x = Ee(newTextDialog.x, 0, 0.995),
        y = Ee(newTextDialog.y, 0, 0.995),
        estimatedWidth = Ee(
          (longestLine * 12 * 0.58 + 6) / pageWidthPoints,
          0.04,
          Math.max(0.04, 1 - x),
        ),
        estimatedHeight = Ee(
          (lineCount * 12 * 1.15 + 4) / pageHeightPoints,
          0.025,
          Math.max(0.025, 1 - y),
        ),
        mark = {
          id: Da(),
          pageId: newTextDialog.pageId,
          type: "text",
          text,
          x,
          y,
          w: estimatedWidth,
          h: estimatedHeight,
          color: "#111111",
          backgroundColor: "transparent",
          size: 12,
          fontSizeRatio: 12 / pageWidthPoints,
          pageWidthPoints,
          font: "Arial",
          cssFont: "Arial",
          bold: !1,
          italic: !1,
          underline: !1,
          crop: Pu(),
        };
      (aa((marks) => [...marks, mark]),
        De(mark.id),
        kl(!0),
        setNewTextDialog(null),
        setNewTextDraft(""),
        Me("select"),
        F("Texto creado en la posición elegida"));
    },
    nx = (0, I.useCallback)(
      async (n) => {
        if (!$ || D.current) {
          D.current = !1;
          return;
        }
        let s = ju(n.currentTarget, n.clientX, n.clientY);
        if (((x.current = s), W === "paste")) {
          await xn(s);
          return;
        }
        if (
          W === "select" ||
          W === "modify-text" ||
          W === "hand" ||
          W === "draw" ||
          W === "ocr-region"
        )
          return;
        let pageWidthPoints = 595.28,
          pageHeightPoints = 841.89;
        if (W === "text" && gn) {
          try {
            let sourcePage = await (await ds(gn)).getPage($.index + 1),
              sourceViewport = sourcePage.getViewport({
                scale: 1,
                rotation: ss($.baseRotation + $.rotation),
              });
            ((pageWidthPoints = sourceViewport.width),
              (pageHeightPoints = sourceViewport.height));
          } catch {}
        }
        if (W === "text") {
          (setNewTextDraft(""),
            setNewTextDialog({
              pageId: $.id,
              x: s.x,
              y: s.y,
              pageWidthPoints,
              pageHeightPoints,
            }));
          return;
        }
        let L =
          {
                id: Da(),
                pageId: $.id,
                type: W,
                text: "",
                x: s.x,
                y: s.y,
                w: 0.23,
                h: 0.045,
                color:
                  W === "highlight"
                    ? highlightColor
                    : W === "redact"
                        ? redactColor
                        : "#111111",
                opacity: W === "highlight" ? highlightOpacity : 1,
                size: 16,
                font: "Arial",
                bold: !1,
                crop: Pu(),
              };
        ((L.x = Ee(L.x, 0, 1 - L.w)),
          (L.y = Ee(L.y, 0, 1 - L.h)),
          aa((y) => [...y, L]),
          De(L.id),
          kl(!0),
          Me(W));
      },
      [$, gn, aa, xn, W, highlightColor, highlightOpacity, redactColor, F],
    ),
    ix = (n) => {
      if (
        W === "select" &&
        n.button === 0 &&
        $ &&
        !n.target.closest?.(".pdf-text-hit, .pdf-native-link-hit")
      ) {
        let s = ju(n.currentTarget, n.clientX, n.clientY);
        (n.preventDefault(),
          n.stopPropagation(),
          (screenSelectionDrag.current = {
            pointerId: n.pointerId,
            start: s,
          }),
          setScreenSelection({ x: s.x, y: s.y, w: 0, h: 0 }),
          n.currentTarget.setPointerCapture(n.pointerId));
        return;
      }
      if (W === "ocr-region" && n.button === 0 && $) {
        let s = ju(n.currentTarget, n.clientX, n.clientY);
        (n.preventDefault(),
          n.stopPropagation(),
          (ocrDrag.current = { pointerId: n.pointerId, start: s }),
          setOcrSelection({ x: s.x, y: s.y, w: 0, h: 0 }),
          n.currentTarget.setPointerCapture(n.pointerId));
        return;
      }
      if (W !== "draw" || n.button !== 0 || !$) return;
      (n.preventDefault(), n.stopPropagation());
      let s = ju(n.currentTarget, n.clientX, n.clientY),
        L = {
          id: Da(),
          pageId: $.id,
          type: "draw",
          text: "",
          points: [s],
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          color: Ms,
          size: cn,
          font: "Arial",
          bold: !1,
          crop: Pu(),
        };
      (Te(),
        aa((y) => [...y, L], !1),
        (P.current = { id: L.id, pointerId: n.pointerId }),
        De(null),
        n.currentTarget.setPointerCapture(n.pointerId));
    },
    rx = (n) => {
      let screenPointer = screenSelectionDrag.current;
      if (screenPointer && screenPointer.pointerId === n.pointerId) {
        let current = ju(n.currentTarget, n.clientX, n.clientY),
          start = screenPointer.start;
        (n.preventDefault(),
          setScreenSelection({
            x: Math.min(start.x, current.x),
            y: Math.min(start.y, current.y),
            w: Math.abs(current.x - start.x),
            h: Math.abs(current.y - start.y),
          }));
        return;
      }
      let ocrPointer = ocrDrag.current;
      if (ocrPointer && ocrPointer.pointerId === n.pointerId) {
        let current = ju(n.currentTarget, n.clientX, n.clientY),
          start = ocrPointer.start;
        (n.preventDefault(),
          setOcrSelection({
            x: Math.min(start.x, current.x),
            y: Math.min(start.y, current.y),
            w: Math.abs(current.x - start.x),
            h: Math.abs(current.y - start.y),
          }));
        return;
      }
      let s = P.current;
      if (!s || s.pointerId !== n.pointerId) return;
      n.preventDefault();
      let L = ju(n.currentTarget, n.clientX, n.clientY);
      aa(
        (y) =>
          y.map((A) => {
            if (A.id !== s.id) return A;
            let k = A.points || [],
              _ = k[k.length - 1];
            return _ && Math.hypot(L.x - _.x, L.y - _.y) < 0.0015
              ? A
              : { ...A, points: [...k, L] };
          }),
        !1,
      );
    },
    Bs = (n) => {
      let screenPointer = screenSelectionDrag.current;
      if (screenPointer && screenPointer.pointerId === n.pointerId) {
        let current = ju(n.currentTarget, n.clientX, n.clientY),
          start = screenPointer.start,
          selection = {
            x: Math.min(start.x, current.x),
            y: Math.min(start.y, current.y),
            w: Math.abs(current.x - start.x),
            h: Math.abs(current.y - start.y),
          };
        (n.currentTarget.hasPointerCapture(n.pointerId) &&
          n.currentTarget.releasePointerCapture(n.pointerId),
          (screenSelectionDrag.current = null));
        if (selection.w < 0.005 || selection.h < 0.005) {
          setScreenSelection(null);
        } else {
          (setScreenSelection(selection), F("Zona de la página seleccionada"));
        }
        return;
      }
      let ocrPointer = ocrDrag.current;
      if (ocrPointer && ocrPointer.pointerId === n.pointerId) {
        let current = ju(n.currentTarget, n.clientX, n.clientY),
          start = ocrPointer.start,
          selection = {
            x: Math.min(start.x, current.x),
            y: Math.min(start.y, current.y),
            w: Math.abs(current.x - start.x),
            h: Math.abs(current.y - start.y),
          };
        (n.currentTarget.hasPointerCapture(n.pointerId) &&
          n.currentTarget.releasePointerCapture(n.pointerId),
          (ocrDrag.current = null),
          setOcrSelection(selection),
          runOcrRegion(selection));
        return;
      }
      let s = P.current;
      !s ||
        s.pointerId !== n.pointerId ||
        (n.currentTarget.hasPointerCapture(n.pointerId) &&
          n.currentTarget.releasePointerCapture(n.pointerId),
        (P.current = null),
        De(s.id),
        kl(!0));
    },
    Ln = (n, s, L) => {
      (n.stopPropagation(),
        Te(),
        De(s.id),
        (p.current = {
          id: s.id,
          pointerId: n.pointerId,
          mode: L,
          sx: n.clientX,
          sy: n.clientY,
          x: s.x,
          y: s.y,
          w: s.w,
          h: s.h,
        }),
        n.currentTarget.setPointerCapture(n.pointerId));
    },
    Cn = (n) => {
      let s = p.current;
      if (!s || s.pointerId !== n.pointerId) return;
      let L = (n.clientX - s.sx) / Ye.w,
        y = (n.clientY - s.sy) / Ye.h;
      aa(
        (A) =>
          A.map((k) =>
            k.id !== s.id
              ? k
              : s.mode === "move"
                ? {
                    ...k,
                    x: Ee(s.x + L, 0, 1 - k.w),
                    y: Ee(s.y + y, 0, 1 - k.h),
                  }
                : {
                    ...k,
                    w: Ee(s.w + L, 0.035, 1 - k.x),
                    h: Ee(s.h + y, 0.025, 1 - k.y),
                  },
          ),
        !1,
      );
    },
    yn = (n) => {
      p.current?.pointerId === n.pointerId && (p.current = null);
    },
    sx = (n) => {
      if (W !== "hand" && n.button !== 1) return;
      let s = n.currentTarget;
      ((c.current = {
        pointerId: n.pointerId,
        x: n.clientX,
        y: n.clientY,
        left: s.scrollLeft,
        top: s.scrollTop,
        moved: !1,
      }),
        s.setPointerCapture(n.pointerId),
        As(!0),
        n.preventDefault());
    },
    cx = (n) => {
      let s = c.current;
      if (!s || s.pointerId !== n.pointerId) return;
      let L = n.clientX - s.x,
        y = n.clientY - s.y;
      (Math.abs(L) + Math.abs(y) > 4 && (s.moved = !0),
        (n.currentTarget.scrollLeft = s.left - L),
        (n.currentTarget.scrollTop = s.top - y));
    },
    Rs = (n) => {
      !c.current ||
        c.current.pointerId !== n.pointerId ||
        ((D.current = c.current.moved),
        n.currentTarget.hasPointerCapture(n.pointerId) &&
          n.currentTarget.releasePointerCapture(n.pointerId),
        (c.current = null),
        As(!1));
    },
    fitWidthZoom = (0, I.useCallback)(() => {
      let n = u.current;
      return n ? Ee(Math.floor(((n.clientWidth - 64) / 680) * 100), 20, 500) : 100;
    }, []),
    fitPageZoom = (0, I.useCallback)(() => {
      let n = u.current;
      if (!n) return 82;
      let s = Ye.h / Ye.w,
        L = n.clientWidth - 70,
        y = n.clientHeight - 70,
        A = Math.min(L, y / s);
      return Ee(Math.floor((A / 680) * 100), 20, 500);
    }, [Ye]),
    Ya = (0, I.useCallback)((n) => {
      Gu((s) =>
        window.PDF_IGNOVA_TEXT_SELECTION?.nextViewZoom
          ? window.PDF_IGNOVA_TEXT_SELECTION.nextViewZoom(
              s,
              n,
              fitPageZoom(),
              fitWidthZoom(),
            )
          : Ee(s + (n > 0 ? 10 : -10), 20, 500),
      );
    }, [fitPageZoom, fitWidthZoom]),
    px = (0, I.useCallback)(() => {
      Gu(fitWidthZoom());
    }, [fitWidthZoom]),
    Os = (0, I.useCallback)(() => {
      Gu(fitPageZoom());
    }, [fitPageZoom]),
    mx = (n) => {
      let s = n.currentTarget;
      if ((n.preventDefault(), n.ctrlKey || n.metaKey)) {
        let bounds = s.getBoundingClientRect(),
          offsetX = n.clientX - bounds.left,
          offsetY = n.clientY - bounds.top;
        zoomWheelAnchor.current = {
          stage: s,
          zoom: Cf,
          offsetX,
          offsetY,
          contentX: s.scrollLeft + offsetX,
          contentY: s.scrollTop + offsetY,
        };
        Ya(n.deltaY < 0 ? 10 : -10);
      }
      else if (n.shiftKey) s.scrollLeft += n.deltaY;
      else {
        let L = s.scrollHeight <= s.clientHeight + 4,
          y = s.scrollTop <= 2,
          A = s.scrollTop + s.clientHeight >= s.scrollHeight - 2,
          k = n.deltaY > 0 ? 1 : n.deltaY < 0 ? -1 : 0;
        if (
          (k > 0
            ? (L || A) && Ue < w.length - 1
            : k < 0 && (L || y) && Ue > 0) &&
          !z.current
        ) {
          ((z.current = !0),
            Hl(Ue + k),
            setTimeout(() => {
              ((s.scrollTop = k < 0 ? s.scrollHeight : 0), (z.current = !1));
            }, 180));
          return;
        }
        ((s.scrollTop += n.deltaY), (s.scrollLeft += n.deltaX));
      }
    },
    Ku = (0, I.useCallback)(
      (n) => {
        (aa((s) => s.filter((L) => L.id !== n)),
          De(null),
          F("Elemento eliminado"));
      },
      [aa, F],
    ),
    bn = (0, I.useCallback)(
      async (n, s = !1) => {
        if (n.type === "text") {
          let L = window.getSelection?.()?.toString() || "",
            y = L.trim() ? L : n.text || "";
          if (y)
            try {
              await navigator.clipboard.writeText(y);
            } catch {
              let A = document.createElement("textarea");
              ((A.value = y),
                (A.style.position = "fixed"),
                (A.style.opacity = "0"),
                document.body.append(A),
                A.select(),
                document.execCommand("copy"),
                A.remove());
            }
        }
        ((C.current = {
          ...n,
          crop: { ...n.crop },
          points: n.points?.map((L) => ({ ...L })),
        }),
          s
            ? Ku(n.id)
            : F(
                n.type === "text"
                  ? "Texto copiado al portapapeles"
                  : "Elemento copiado",
              ));
      },
      [Ku, F],
    ),
    gx = (n) => {
      (n.preventDefault(), n.stopPropagation());
      let s = ju(n.currentTarget, n.clientX, n.clientY),
        selectedText = readNativePdfSelection();
      ((x.current = s),
        De(null),
        Xa({
          x: n.clientX,
          y: n.clientY,
          pageId: $?.id || "",
          pageX: s.x,
          pageY: s.y,
          selectedText,
        }));
    },
    Es = (n, s) => {
      (n.preventDefault(),
        n.stopPropagation(),
        De(null),
        Xa({
          x: n.clientX,
          y: n.clientY,
          pageId: s.pageId,
          pageX: s.x,
          pageY: s.y,
          markId: s.id,
        }));
    },
    hx = async (n) => {
      let s = new Image();
      ((s.src = n.imageData || ""), await s.decode());
      let L = n.crop,
        y = (s.naturalWidth * L.left) / 100,
        A = (s.naturalHeight * L.top) / 100,
        k = (s.naturalWidth * (100 - L.left - L.right)) / 100,
        _ = (s.naturalHeight * (100 - L.top - L.bottom)) / 100,
        xe = Math.min(1, 2200 / Math.max(k, _)),
        Se = document.createElement("canvas");
      ((Se.width = Math.max(1, Math.round(k * xe))),
        (Se.height = Math.max(1, Math.round(_ * xe))),
        Se.getContext("2d")?.drawImage(
          s,
          y,
          A,
          k,
          _,
          0,
          0,
          Se.width,
          Se.height,
        ));
      let he = await new Promise((R, ne) =>
        Se.toBlob(
          (oe) => (oe ? R(oe) : ne(new Error("No se pudo recortar"))),
          "image/png",
        ),
      );
      return new Uint8Array(await he.arrayBuffer());
    },
    Sn = async (n) => {
      let {
          PDFDocument: s,
          StandardFonts: L,
          degrees: y,
          rgb: A,
          BlendMode: blendMode,
        } = await import("./chunks/es-4HSNR7QU.js"),
        k = (he) => {
          let R = he.replace("#", "");
          return A(
            parseInt(R.slice(0, 2), 16) / 255,
            parseInt(R.slice(2, 4), 16) / 255,
            parseInt(R.slice(4, 6), 16) / 255,
          );
        },
        _ = await s.create(),
        pe = new Map(),
        xe = new Map(),
        fontkitRegistered = !1,
        Se = async (he) => {
          let R =
              he.preserveSourceFont && he.sourceFontKey
                ? `source-${he.pageId}-${he.sourceFontKey}`
                : `${he.font}-${!!he.bold}-${!!he.italic}`,
            ne = xe.get(R);
          if (ne) return ne;
          if (he.preserveSourceFont && he.sourceFontKey) {
            try {
              let sourcePageState = o.current.find(
                  (pageState) => pageState.id === he.pageId,
                ),
                sourceDocument = g.find(
                  (documentSource) =>
                    documentSource.id === sourcePageState?.docId,
                );
              if (sourcePageState && sourceDocument) {
                let sourcePage = await (
                  await ds(sourceDocument)
                ).getPage(sourcePageState.index + 1);
                await sourcePage.getOperatorList();
                let sourceFont = sourcePage.commonObjs.get(he.sourceFontKey),
                  sourceBytes =
                    sourceFont?.data instanceof Uint8Array
                      ? sourceFont.data
                      : sourceFont?.data instanceof ArrayBuffer
                        ? new Uint8Array(sourceFont.data)
                        : null;
                if (sourceBytes?.length) {
                  if (!globalThis.fontkit)
                    await import("./fontkit.umd.min.js");
                  if (globalThis.fontkit) {
                    if (!fontkitRegistered) {
                      (_.registerFontkit(globalThis.fontkit),
                        (fontkitRegistered = !0));
                    }
                    let embeddedSourceFont = await _.embedFont(sourceBytes, {
                      subset: !0,
                    });
                    return (
                      xe.set(R, embeddedSourceFont), embeddedSourceFont
                    );
                  }
                }
              }
            } catch (sourceFontError) {
              console.warn(
                "No se pudo reutilizar la fuente incrustada del PDF",
                sourceFontError,
              );
            }
          }
          if (window.pdfEstudio?.getSystemFont) {
            try {
              if (!globalThis.fontkit)
                await import("./fontkit.umd.min.js");
              let customFontBytes = await window.pdfEstudio.getSystemFont({
                family: he.font,
                bold: !!he.bold,
                italic: !!he.italic,
              });
              if (customFontBytes && globalThis.fontkit) {
                if (!fontkitRegistered) {
                  (_.registerFontkit(globalThis.fontkit),
                    (fontkitRegistered = !0));
                }
                let customFont = await _.embedFont(
                  new Uint8Array(customFontBytes),
                  { subset: !0 },
                );
                return (xe.set(R, customFont), customFont);
              }
            } catch (customFontError) {
              console.warn("No se pudo incrustar la fuente del sistema", customFontError);
            }
          }
          let oe =
              he.font === "Times New Roman"
                ? he.bold && he.italic
                  ? L.TimesRomanBoldItalic
                  : he.bold
                    ? L.TimesRomanBold
                    : he.italic
                      ? L.TimesRomanItalic
                      : L.TimesRoman
                : he.font === "Courier New"
                  ? he.bold && he.italic
                    ? L.CourierBoldOblique
                    : he.bold
                      ? L.CourierBold
                      : he.italic
                        ? L.CourierOblique
                        : L.Courier
                  : he.bold && he.italic
                    ? L.HelveticaBoldOblique
                    : he.bold
                      ? L.HelveticaBold
                      : he.italic
                        ? L.HelveticaOblique
                        : L.Helvetica,
            Y = await _.embedFont(oe);
          return (xe.set(R, Y), Y);
        };
      for (let he of o.current) {
        let R = pe.get(he.docId);
        if (!R) {
          let Y = g.find((ga) => ga.id === he.docId);
          if (!Y) continue;
          ((R = await s.load(Y.bytes)), pe.set(he.docId, R));
        }
        let [ne] = await _.copyPages(R, [he.index]);
        (_.addPage(ne),
          ne.setRotation(y(ss(ne.getRotation().angle + he.rotation))));
        let oe = ne.getSize();
        for (let Y of f.current.filter((ga) => ga.pageId === he.id)) {
          if (
            Y.type === "text" &&
            Y.replaceOriginal &&
            !Y.textDirty &&
            !Y.styleDirty
          )
            continue;
          let ga = Y.x * oe.width,
            Nl = oe.height - (Y.y + Y.h) * oe.height;
          if (Y.type === "text" || Y.type === "watermark") {
            if (Y.replaceOriginal) {
              let Ju = Y.sourceRect || {
                  x: Y.x,
                  y: Y.y,
                  w: Y.w,
                  h: Y.h,
                },
                ja = Ju.x * oe.width,
                al = oe.height - (Ju.y + Ju.h) * oe.height;
              let coverWidth = Math.min(oe.width - ja, Ju.w * oe.width),
                coverHeight = Math.min(oe.height - al, Ju.h * oe.height);
              ne.drawRectangle({
                x: Math.max(0, ja),
                y: Math.max(0, al),
                width: coverWidth,
                height: coverHeight,
                color: k(Y.backgroundColor || "#ffffff"),
              });
            }
            let textFont = await Se(Y),
              textSize = Math.max(
                4,
                Y.fontSizeRatio
                  ? Y.fontSizeRatio * oe.width
                  : (Y.size * oe.width) / Ye.w,
              ),
              textLineHeight = Math.max(
                4.6,
                textSize * 1.15,
              ),
              textColor = k(Y.color),
              textAngle = Y.angle || 0,
              textOriginY = oe.height - Y.y * oe.height - textSize;
            ne.drawText(Y.text || " ", {
              x: ga,
              y: textOriginY,
              size: textSize,
              font: textFont,
              color: textColor,
              lineHeight: textLineHeight,
              rotate: y(textAngle),
              opacity: Y.opacity ?? 1,
            });
            if (Y.type === "text" && Y.underline) {
              let angleRadians = (textAngle * Math.PI) / 180,
                cosAngle = Math.cos(angleRadians),
                sinAngle = Math.sin(angleRadians),
                underlineOffset = Math.max(0.8, textSize * 0.12),
                underlineThickness = Math.max(0.55, textSize * 0.055),
                textLines = String(Y.text || " ").split(/\r?\n/);
              textLines.forEach((line, lineIndex) => {
                if (!line) return;
                let lineWidth = textFont.widthOfTextAtSize(line, textSize),
                  lineX = ga + sinAngle * textLineHeight * lineIndex,
                  lineY = textOriginY - cosAngle * textLineHeight * lineIndex,
                  startX = lineX + sinAngle * underlineOffset,
                  startY = lineY - cosAngle * underlineOffset;
                ne.drawLine({
                  start: { x: startX, y: startY },
                  end: {
                    x: startX + cosAngle * lineWidth,
                    y: startY + sinAngle * lineWidth,
                  },
                  thickness: underlineThickness,
                  color: textColor,
                  opacity: Y.opacity ?? 1,
                });
              });
            }
          }
          else if (Y.type === "draw" && Y.points && Y.points.length > 1) {
            let Ju = Math.max(0.6, (Y.size * oe.width) / Ye.w);
            for (let ja = 1; ja < Y.points.length; ja += 1) {
              let al = Y.points[ja - 1],
                Ns = Y.points[ja];
              ne.drawLine({
                start: { x: al.x * oe.width, y: oe.height - al.y * oe.height },
                end: { x: Ns.x * oe.width, y: oe.height - Ns.y * oe.height },
                thickness: Ju,
                color: k(Y.color),
              });
            }
          } else if (Y.type === "image" && Y.imageData) {
            let Ju = await _.embedPng(await hx(Y));
            ne.drawImage(Ju, {
              x: ga,
              y: Nl,
              width: Y.w * oe.width,
              height: Y.h * oe.height,
            });
          } else
            ne.drawRectangle({
              x: ga,
              y: Nl,
              width: Y.w * oe.width,
              height: Y.h * oe.height,
              color: k(Y.color),
              opacity:
                Y.type === "highlight" ? (Y.opacity ?? 0.38) : (Y.opacity ?? 1),
              blendMode:
                Y.type === "highlight" ? blendMode?.Multiply : void 0,
            });
        }
        if (n && he.id === $?.id) {
          let Y = await _.embedFont(L.Helvetica),
            ga = await _.embedFont(L.HelveticaBold),
            Nl = Math.min(245, oe.width - 48),
            Ju = 48,
            ja = oe.width - Nl - 24,
            al = 24;
          (ne.drawRectangle({
            x: ja,
            y: al,
            width: Nl,
            height: Ju,
            color: A(0.97, 0.99, 1),
            borderColor: A(0.08, 0.33, 0.65),
            borderWidth: 1,
          }),
            ne.drawText(
              window.pdfIgnovaI18n?.t?.("FIRMADO DIGITALMENTE") ||
                "FIRMADO DIGITALMENTE",
              {
              x: ja + 10,
              y: al + 29,
              size: 8,
              font: ga,
              color: A(0.08, 0.33, 0.65),
              },
            ),
            ne.drawText(n.name.slice(0, 42), {
              x: ja + 10,
              y: al + 16,
              size: 9,
              font: Y,
              color: A(0.08, 0.16, 0.28),
            }),
            ne.drawText(new Date().toLocaleString(document.documentElement.lang || void 0), {
              x: ja + 10,
              y: al + 5,
              size: 6,
              font: Y,
              color: A(0.35, 0.4, 0.48),
            }));
        }
      }
      return _.save();
    },
    vn = async (n) => {
      if (w.length && !saveDialogInProgress.current) {
        saveDialogInProgress.current = !0;
        pa("Creando PDF\u2026");
        try {
          let pdfBytes = await Sn(),
            fileName = n.toLowerCase().endsWith(".pdf") ? n : `${n}.pdf`;
          if (typeof window.pdfEstudio?.savePdfAs === "function") {
            let result = await window.pdfEstudio.savePdfAs(
              pdfBytes.buffer.slice(
                pdfBytes.byteOffset,
                pdfBytes.byteOffset + pdfBytes.byteLength,
              ),
              fileName,
            );
            if (result?.canceled) {
              pa("");
              return;
            }
            if (!result?.ok) throw new Error("No se pudo guardar el PDF");
            F(`PDF guardado como ${result.fileName || fileName}`);
          } else {
            (rs(pdfBytes, fileName, "application/pdf"), F("PDF guardado"));
          }
        } catch (s) {
          (console.error(s), F("No se pudo guardar el PDF"));
        } finally {
          saveDialogInProgress.current = !1;
          pa("");
        }
      }
    },
    vf = async () =>
      vn(
        pn?.name.replace(/\.pdf$/i, "_editado.pdf") || "documento_editado.pdf",
      ),
    xx = () =>
      vn(
        pn?.name.replace(/\.pdf$/i, "_editado.pdf") || "documento_editado.pdf",
      ),
    Lx = async () => {
      if (w.length) {
        let printPageIndexes = await chooseExportPageIndexes("Imprimir");
        if (!printPageIndexes) return;
        pa("Preparando impresi\xF3n\u2026");
        try {
          let sourceDocument = w[0]
              ? g.find((item) => item.id === w[0].docId)
              : null,
            canUseOriginal =
              !!sourceDocument &&
              f.current.length === 0 &&
              w.every(
                (page, index) =>
                  page.docId === sourceDocument.id &&
                  page.index === index &&
                  (page.rotation || 0) === 0,
              );
          if (canUseOriginal) {
            let originalPdf = await ds(sourceDocument);
            canUseOriginal = originalPdf.numPages === w.length;
          }
          let n = canUseOriginal ? sourceDocument.bytes : await Sn(),
            printsAllPages =
              printPageIndexes.length === w.length &&
              printPageIndexes.every((pageIndex, index) => pageIndex === index);
          if (!printsAllPages) {
            let { PDFDocument } = await import("./chunks/es-4HSNR7QU.js"),
              sourcePdf = await PDFDocument.load(n),
              selectedPdf = await PDFDocument.create(),
              selectedPages = await selectedPdf.copyPages(
                sourcePdf,
                printPageIndexes,
              );
            selectedPages.forEach((page) => selectedPdf.addPage(page));
            n = await selectedPdf.save();
          }
          if (window.pdfEstudio?.printPdf) {
            let s = await window.pdfEstudio.printPdf(
              n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength),
              pn?.name || "documento.pdf",
              { language: window.pdfIgnovaI18n?.getLanguage?.() || "es" },
            );
            F(
              s?.canceled
                ? "Impresi\xF3n cancelada"
                : s?.savedAsPdf
                  ? `PDF guardado: ${s.fileName || "documento.pdf"}`
                  : s?.openedInDefaultViewer
                    ? "Se abri\xF3 el visor del sistema para imprimir"
                    : "Preparando el cuadro de impresoras del sistema",
            );
          } else window.print();
        } catch (n) {
          (console.error(n), F("No se pudo iniciar la impresi\xF3n"));
        }
        pa("");
      }
    },
    Cx = () => {
      (S([]),
        G([]),
        (i.current = []),
        Fu(null),
        H([]),
        B([]),
        (o.current = []),
        (f.current = []),
        (r.current = []),
        (m.current = []),
        Ol((n) => n + 1),
        Ta(null),
        ka(new Set()),
        De(null),
        Me("hand"),
        F("Documento cerrado"));
    },
    yx = async () => {
      if (!(!$ || !_u.trim() || !Vu)) {
        if (!window.pdfEstudio) {
          F(
            "La firma digital solo est\xE1 disponible en el programa de escritorio",
          );
          return;
        }
        pa("Firmando PDF con certificado\u2026");
        try {
          let n = await Sn(ws ? { name: _u.trim() } : void 0),
            s = await window.pdfEstudio.signPdf({
              pdfBytes: n.buffer.slice(
                n.byteOffset,
                n.byteOffset + n.byteLength,
              ),
              certificateBytes: await Vu.arrayBuffer(),
              password: bs,
              name: _u.trim(),
              reason: Ss,
              location: vs,
              contactInfo: Is,
              pageIndex: Ue,
            });
          (rs(
            s,
            pn?.name.replace(/\.pdf$/i, "_firmado.pdf") ||
              "documento_firmado.pdf",
            "application/pdf",
          ),
            Rl(!1),
            F("PDF firmado digitalmente y guardado"));
        } catch (n) {
          (console.error(n),
            F("No se pudo firmar. Revisa el certificado y la contrase\xF1a"));
        }
        pa("");
      }
    },
    parseExportPageSpec = (spec, totalPages) => {
      let normalized = String(spec || "")
        .replace(/[\u2013\u2014]/g, "-")
        .replace(/\s+/g, "");
      if (!normalized)
        return { error: "Indica al menos una p\xE1gina" };
      let indexes = new Set();
      for (let part of normalized.split(/[;,]+/).filter(Boolean)) {
        let match = part.match(/^(\d+)(?:-(\d+))?$/);
        if (!match)
          return {
            error: `Formato no v\xE1lido: ${part}. Usa, por ejemplo, 1, 3, 5-8`,
          };
        let first = Number(match[1]),
          last = Number(match[2] || match[1]);
        if (first < 1 || last < 1 || first > totalPages || last > totalPages)
          return {
            error: `Las p\xE1ginas deben estar entre 1 y ${totalPages}`,
          };
        if (first > last) [first, last] = [last, first];
        for (let pageNumber = first; pageNumber <= last; pageNumber += 1)
          indexes.add(pageNumber - 1);
      }
      let result = [...indexes].sort((first, last) => first - last);
      return result.length
        ? { indexes: result }
        : { error: "Indica al menos una p\xE1gina" };
    },
    chooseExportPageIndexes = (formatName) =>
      new Promise((resolve) => {
        let selectedIndexes = w
            .map((page, index) => (ue.has(page.id) ? index : -1))
            .filter((index) => index >= 0),
          isPrint = formatName === "Imprimir",
          safeFormat = formatName === "Excel" ? "Excel" : "Word",
          allSpec = w.length === 1 ? "1" : `1-${w.length}`,
          currentSpec = String(Ue + 1),
          selectedSpec = selectedIndexes.map((index) => index + 1).join(", "),
          backdrop = document.createElement("div");
        backdrop.className = "modalback export-pages-backdrop";
        backdrop.innerHTML = `
          <div class="smallmodal export-pages-selector" role="dialog" aria-modal="true" aria-label="${isPrint ? "P\xE1ginas para imprimir" : "P\xE1ginas para exportar"}">
            <button type="button" class="modalx" data-export-close aria-label="Cerrar">\xD7</button>
            <h2>${isPrint ? "P\xE1ginas para imprimir" : `P\xE1ginas para exportar a ${safeFormat}`}</h2>
            <p>Selecciona todas, la actual, las marcadas en el panel o escribe p\xE1ginas sueltas y rangos.</p>
            <div class="export-page-quick">
              <button type="button" data-export-spec="${allSpec}"><b>Todas</b><small>${w.length} p\xE1gina${w.length === 1 ? "" : "s"}</small></button>
              <button type="button" data-export-spec="${currentSpec}"><b>Actual</b><small>P\xE1gina ${currentSpec}</small></button>
              <button type="button" data-export-spec="${selectedSpec}" ${selectedIndexes.length ? "" : "disabled"}><b>Seleccionadas</b><small>${selectedIndexes.length} marcada${selectedIndexes.length === 1 ? "" : "s"}</small></button>
            </div>
            <label for="export-page-spec">P\xE1ginas concretas</label>
            <input id="export-page-spec" class="export-page-input" value="${allSpec}" placeholder="Ej.: 1, 3, 5-8" autocomplete="off">
            <small class="export-page-help">Separa p\xE1ginas con comas y usa un gui\xF3n para los rangos.</small>
            <div class="export-page-error" role="alert"></div>
            <div class="modalactions">
              <button type="button" class="shortcut" data-export-cancel>Cancelar</button>
              <button type="button" class="blue" data-export-confirm>${isPrint ? "Continuar" : `Exportar ${safeFormat}`}</button>
            </div>
          </div>`;
        let input = backdrop.querySelector(".export-page-input"),
          errorBox = backdrop.querySelector(".export-page-error"),
          finish = (value) => {
            backdrop.remove();
            resolve(value);
          },
          confirmSelection = () => {
            let parsed = parseExportPageSpec(input.value, w.length);
            if (parsed.error) {
              errorBox.textContent = parsed.error;
              input.focus();
              return;
            }
            finish(parsed.indexes);
          };
        backdrop.querySelectorAll("[data-export-spec]").forEach((button) => {
          button.addEventListener("click", () => {
            input.value = button.dataset.exportSpec || "";
            errorBox.textContent = "";
            input.focus();
            input.select();
          });
        });
        backdrop.querySelector("[data-export-close]").addEventListener("click", () => finish(null));
        backdrop.querySelector("[data-export-cancel]").addEventListener("click", () => finish(null));
        backdrop.querySelector("[data-export-confirm]").addEventListener("click", confirmSelection);
        backdrop.addEventListener("click", (event) => {
          if (event.target === backdrop) finish(null);
        });
        backdrop.addEventListener("keydown", (event) => {
          if (event.key === "Escape") finish(null);
          if (event.key === "Enter" && event.target === input) confirmSelection();
        });
        document.body.appendChild(backdrop);
        setTimeout(() => {
          input.focus();
          input.select();
        }, 0);
      }),
    Us = async (requestedPageIndexes) => {
      let n = [],
        s = new Map();
      for (
        let exportPosition = 0;
        exportPosition < requestedPageIndexes.length;
        exportPosition += 1
      ) {
        let L = requestedPageIndexes[exportPosition],
          y = w[L],
          A = g.find((Se) => Se.id === y.docId);
        if (!A) continue;
        let k = s.get(A.id);
        k || ((k = await ds(A)), s.set(A.id, k));
        let _ = await k.getPage(y.index + 1),
          pe = await _.getTextContent(),
          xe = pe.items.filter((Se) => "str" in Se && Se.str?.trim()),
          Se = xe.map((he) => he.str).join(" ").trim(),
          he = [],
          usedOcr = !1;
        if (Se.length > 12) {
          let R = _.getViewport({ scale: 1 }),
            ne = [],
            oeHeight = R.height;
          for (let oe of xe) {
            let Y = oe.transform?.[4] || 0,
              ga = R.height - (oe.transform?.[5] || 0),
              Nl = Math.max(7, Math.abs(oe.transform?.[3] || 10)),
              Ju = ne.find((ja) => Math.abs(ja.y - ga) <= Math.max(4, Nl * 0.55));
            let ja = {
              text: oe.str,
              x: Ee(Y / R.width, 0, 1),
              y: Ee(ga / R.height, 0, 1),
              width: Ee((oe.width || oe.str.length * Nl * 0.45) / R.width, 0, 1),
            };
            Ju ? Ju.words.push(ja) : ne.push({ y: ga, words: [ja] });
          }
          he = ne
            .sort((R, ne) => R.y - ne.y)
            .map((oe) => {
              let ne = oe.words.sort((Y, ga) => Y.x - ga.x);
              return {
                Texto: ne.map((Y) => Y.text).join(" "),
                X: ne[0]?.x || 0,
                Y: Ee(oe.y / oeHeight, 0, 1),
                Palabras: ne,
              };
            });
        } else if (window.pdfEstudio?.ocrPage) {
          usedOcr = !0;
          pa(
            `OCR ${exportPosition + 1} de ${requestedPageIndexes.length} (p\xE1gina ${L + 1})\u2026`,
          );
          let baseViewport = _.getViewport({ scale: 1 }),
            ocrScale = Math.min(
              2.2,
              2450 / Math.max(1, baseViewport.width, baseViewport.height),
            ),
            R = _.getViewport({ scale: ocrScale }),
            ne = document.createElement("canvas");
          ((ne.width = Math.ceil(R.width)), (ne.height = Math.ceil(R.height)));
          await _.render({ canvasContext: ne.getContext("2d"), viewport: R }).promise;
          let oe = await new Promise((Y, ga) =>
              ne.toBlob((Nl) => (Nl ? Y(Nl) : ga(new Error("No se pudo preparar la p\xE1gina para OCR"))), "image/png"),
            ),
            Y = await window.pdfEstudio.ocrPage(await oe.arrayBuffer());
          ((Se = Y.text || ""),
            (he = (Y.lines || []).map((ga) => {
              let Nl = (ga.words || []).map((Ju) => ({
                text: Ju.text,
                x: Ee(Ju.x / Math.max(1, Y.width), 0, 1),
                y: Ee(Ju.y / Math.max(1, Y.height), 0, 1),
                width: Ee(Ju.width / Math.max(1, Y.width), 0, 1),
              }));
              return {
                Texto: ga.text || Nl.map((Ju) => Ju.text).join(" "),
                X: Nl[0]?.x || 0,
                Y: Nl[0]?.y || 0,
                Palabras: Nl,
              };
            })));
        }
        n.push({ Pagina: L + 1, Texto: Se, Lineas: he, OCR: usedOcr });
      }
      return n;
    },
    qs = async () => {
      let exportPageIndexes = await chooseExportPageIndexes("Word");
      if (!exportPageIndexes) return;
      pa("Exportando a Word\u2026");
      try {
          let { Document: n, Packer: s, Paragraph: L } = await import("./chunks/dist-VWYD233Q.js"),
          y = await Us(exportPageIndexes),
          k = y.flatMap((pe, xe) => {
            let Se = pe.Lineas?.length ? pe.Lineas : [{ Texto: pe.Texto, X: 0, Y: 0 }];
            return Se.map((he, R) =>
              new L({
                text: he.Texto || " ",
                pageBreakBefore: xe > 0 && R === 0,
                indent: { left: Math.round(Ee(he.X || 0, 0, 0.75) * 8500) },
                spacing: { before: R ? Math.max(0, Math.round(((he.Y || 0) - (Se[R - 1]?.Y || 0)) * 900)) : 0, after: 0 },
              }),
            );
          }),
          _ = await s.toBlob(new n({ sections: [{ children: k }] }));
        (rs(
          _,
          "documento.docx",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ),
          F(y.some((pe) => pe.OCR) ? "Word exportado con OCR y maquetaci\xF3n reconstruida" : "Word exportado conservando la estructura"));
      } catch (n) {
        console.error(n);
        F(`No se pudo exportar a Word: ${n?.message || "error de OCR"}`);
      }
      pa("");
    },
    Hs = async () => {
      let exportPageIndexes = await chooseExportPageIndexes("Excel");
      if (!exportPageIndexes) return;
      pa("Exportando a Excel\u2026");
      try {
        let n = await import("./chunks/xlsx-NKXWW6DU.js"),
          s = await Us(exportPageIndexes),
          L = n.utils.book_new();
        s.forEach((y) => {
          let A = (y.Lineas || []).map((k) => {
              let _ = [];
              for (let pe of k.Palabras || []) {
                let xe = Math.min(15, Math.max(0, Math.round((pe.x || 0) * 15)));
                _[xe] = _[xe] ? `${_[xe]} ${pe.text}` : pe.text;
              }
              return _.length ? _ : [k.Texto];
            }),
            k = n.utils.aoa_to_sheet(A.length ? A : [[y.Texto]]);
          ((k["!cols"] = Array.from({ length: 16 }, () => ({ wch: 14 }))),
            n.utils.book_append_sheet(L, k, `P\xE1gina ${y.Pagina}`.slice(0, 31)));
        });
        let excelBytes = n.write(L, {
            bookType: "xlsx",
            type: "array",
            compression: !0,
          }),
          excelBlob = new Blob([excelBytes], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
        (rs(
          excelBlob,
          "documento.xlsx",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ),
          F(
            s.some((y) => y.OCR)
              ? "Excel exportado con OCR y columnas reconstruidas"
              : "Excel exportado",
          ));
      } catch (n) {
        console.error(n);
        F(`No se pudo exportar a Excel: ${n?.message || "error de OCR"}`);
      }
      pa("");
    },
    addWatermarkPro = () => {
      if (!w.length) return;
      let n = window.prompt("Texto de la marca de agua", "BORRADOR");
      if (!n?.trim()) return;
      let s = Number(window.prompt("Opacidad (5 a 80 %)", "18")),
        L = Number(window.prompt("Inclinaci\xF3n en grados", "-35"));
      ((s = Ee(Number.isFinite(s) ? s : 18, 5, 80) / 100),
        (L = Ee(Number.isFinite(L) ? L : -35, -90, 90)));
      let y = window.confirm("Aceptar: todas las p\xE1ginas. Cancelar: solo la p\xE1gina actual."),
        A = y ? o.current : $ ? [$] : [];
      aa((k) => [
        ...k,
        ...A.map((_) => ({
          id: Da(),
          pageId: _.id,
          type: "watermark",
          text: n.trim(),
          x: 0.12,
          y: 0.43,
          w: 0.76,
          h: 0.12,
          color: "#6b7280",
          size: 52,
          font: "Arial",
          bold: !0,
          opacity: s,
          angle: L,
          crop: Pu(),
        })),
      ]);
      F(`Marca de agua a\xF1adida a ${A.length} p\xE1gina${A.length === 1 ? "" : "s"}`);
    },
    clearSearch = () => {
      ((searchRequest.current += 1),
        setSearchResults([]),
        setCurrentSearchIndex(-1),
        pa(""));
    },
    goToSearchResult = (requestedIndex) => {
      if (!searchResults.length) return;
      let resultIndex =
          ((requestedIndex % searchResults.length) + searchResults.length) %
          searchResults.length,
        result = searchResults[resultIndex];
      (setCurrentSearchIndex(resultIndex),
        Ta(result.pageId),
        ka(new Set([result.pageId])),
        F(
          `Resultado ${resultIndex + 1} de ${searchResults.length} · p\xE1gina ${result.pageNumber + 1}: ${result.snippet}`,
        ),
        setTimeout(() => {
          document.querySelector(".search-hit.current")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }, 80));
    },
    bx = async () => {
      let query = rn.trim(),
        pages = [...o.current];
      if (!query || !pages.length) {
        clearSearch();
        return;
      }
      let requestId = ++searchRequest.current;
      pa(`Buscando “${query}” en ${pages.length} p\xE1ginas\u2026`);
      try {
        let results = [],
          failedPages = 0,
          nextPageIndex = 0,
          worker = async () => {
            for (;;) {
              let pageNumber = nextPageIndex++;
              if (pageNumber >= pages.length) return;
              let pageReference = pages[pageNumber],
                source = g.find((item) => item.id === pageReference.docId);
              if (!source) {
                failedPages += 1;
                continue;
              }
              try {
                let pdfDocument = await ds(source),
                  pdfPage = await pdfDocument.getPage(pageReference.index + 1),
                  viewport = pdfPage.getViewport({
                    scale: 1,
                    rotation: ss(
                      pageReference.baseRotation + pageReference.rotation,
                    ),
                  }),
                  textContent = await pdfPage.getTextContent();
                results.push(
                  ...buildPageSearchMatches({
                    textContent,
                    viewport,
                    query,
                    pageId: pageReference.id,
                    pageNumber,
                  }),
                );
              } catch {
                failedPages += 1;
              }
            }
          },
          workerCount = Math.min(6, pages.length);
        await Promise.all(Array.from({ length: workerCount }, () => worker()));
        if (requestId !== searchRequest.current) return;
        results.sort((left, right) => left.pageNumber - right.pageNumber);
        if (!results.length) {
          (setSearchResults([]),
            setCurrentSearchIndex(-1),
            F(
              failedPages === pages.length
                ? "No se pudo leer el texto de las p\xE1ginas"
                : `Sin coincidencias en ${pages.length} p\xE1ginas`,
            ));
          return;
        }
        let firstResult = results[0],
          matchedPages = new Set(results.map((result) => result.pageId)).size;
        (setSearchResults(results),
          setCurrentSearchIndex(0),
          Ta(firstResult.pageId),
          ka(new Set([firstResult.pageId])),
          F(
            `${results.length} coincidencia${results.length === 1 ? "" : "s"} en ${matchedPages} p\xE1gina${matchedPages === 1 ? "" : "s"}. Resultado 1 de ${results.length}`,
          ),
          setTimeout(() => {
            document.querySelector(".search-hit.current")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
          }, 80));
      } catch (error) {
        (console.error(error), F("No se pudo completar la b\xFAsqueda"));
      } finally {
        requestId === searchRequest.current && pa("");
      }
    },
    If = (n, s, L) => {
      let y = { ...n.crop, [s]: Ee(L, 0, 85) };
      (y.left + y.right > 90 &&
        (s === "left"
          ? (y.right = 90 - y.left)
          : s === "right" && (y.left = 90 - y.right)),
        y.top + y.bottom > 90 &&
          (s === "top"
            ? (y.bottom = 90 - y.top)
            : s === "bottom" && (y.top = 90 - y.bottom)),
        ma(n.id, { crop: y }));
    };
  ((0, I.useEffect)(() => {
    let stage = u.current;
    if (!stage) return;
    let handleWheel = (event) => mx(event);
    stage.addEventListener("wheel", handleWheel, { passive: !1 });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [mx]),
    (0, I.useEffect)(() => {
    if (!window.pdfEstudio) return;
    let n = !0,
      s = async (L) => {
        if (!n || !Array.isArray(L) || !L.length) return;
        pa("Abriendo documento del sistema\u2026");
        try {
          let y = await window.pdfEstudio.convertDocumentPaths(L),
            A = (y || []).filter((k) => !k.error);
          A.length && (await Ts(A, "open"));
          let k = (y || []).find((_) => _.error);
          k && F(`${k.name}: ${k.error}`);
        } catch (y) {
          (console.error(y), F("No se pudo abrir el archivo solicitado por el sistema"));
        }
        pa("");
      },
      L = window.pdfEstudio.onOpenDocumentPaths?.(s);
    window.pdfEstudio.getLaunchFiles?.().then(s).catch(console.error);
    return () => {
      ((n = !1), L?.());
    };
  }, [Ts, F]),
    (0, I.useEffect)(() => {
    let n = (s) => {
      let L = s.target;
      ["INPUT", "TEXTAREA", "SELECT"].includes(L.tagName) ||
        L.isContentEditable ||
        (s.key === "Delete" && (zl ? Ku(zl) : ql()),
        (s.ctrlKey || s.metaKey) &&
          s.key.toLowerCase() === "c" &&
          readNativePdfSelection() &&
          (s.preventDefault(), copyNativePdfSelection()),
        (s.ctrlKey || s.metaKey) &&
          s.key.toLowerCase() === "s" &&
          (s.preventDefault(), vf()),
        (s.ctrlKey || s.metaKey) &&
          s.key.toLowerCase() === "z" &&
          (s.preventDefault(), s.shiftKey ? Sf() : hn()),
        (s.ctrlKey || s.metaKey) &&
          s.key.toLowerCase() === "y" &&
          (s.preventDefault(), Sf()),
        (s.ctrlKey || s.metaKey) &&
          s.key === "+" &&
          (s.preventDefault(), Ya(10)),
        (s.ctrlKey || s.metaKey) &&
          s.key === "-" &&
          (s.preventDefault(), Ya(-10)));
    };
    return (
      window.addEventListener("keydown", n),
      () => window.removeEventListener("keydown", n)
    );
  }),
    (0, I.useEffect)(() => {
      let n = async (s) => {
        let y = [...(s.clipboardData?.items || [])]
          .find((A) => A.type.startsWith("image/"))
          ?.getAsFile();
        !y ||
          !$ ||
          (s.preventDefault(),
          (C.current = null),
          await Zu(await Uh(y), x.current));
      };
      return (
        window.addEventListener("paste", n),
        () => window.removeEventListener("paste", n)
      );
    }, [$, Zu]));
  let Sx = (n) => {
    if (n.type === "draw" && n.points?.length) {
      let y = n.points.map((A) => `${A.x * Ye.w},${A.y * Ye.h}`).join(" ");
      return (0, d.jsx)(
        "svg",
        {
          className: `freehand-mark ${zl === n.id ? "chosen" : ""}`,
          viewBox: `0 0 ${Ye.w} ${Ye.h}`,
          preserveAspectRatio: "none",
          onContextMenu: (A) => Es(A, n),
          children: (0, d.jsx)("polyline", {
            points: y,
            fill: "none",
            stroke: n.color,
            strokeWidth: n.size,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            vectorEffect: "non-scaling-stroke",
            onPointerDown: (A) => {
              W !== "draw" && (A.stopPropagation(), De(n.id));
            },
          }),
        },
        n.id,
      );
    }
    let s = Math.max(1, 100 - n.crop.left - n.crop.right),
      L = Math.max(1, 100 - n.crop.top - n.crop.bottom),
      displayFontSize = n.fontSizeRatio
        ? Math.max(1, n.fontSizeRatio * Ye.w)
        : n.size;
    return (0, d.jsxs)(
      "div",
      {
        className: `mark ${n.type} ${n.replaceOriginal ? "pdf-text-edit" : ""} ${n.replaceOriginal && !n.textDirty && !n.styleDirty ? "pdf-text-pristine" : ""} ${zl === n.id ? "chosen" : ""}`,
        "data-mark-id": n.id,
        style: {
          left: `${n.x * 100}%`,
          top: `${n.y * 100}%`,
          width: `${n.w * 100}%`,
          height: `${n.h * 100}%`,
          color: n.color,
          background:
            n.type === "text"
              ? n.replaceOriginal &&
                (n.textDirty || n.styleDirty || zl === n.id)
                ? n.backgroundColor || "#ffffff"
                : "transparent"
              : n.type === "image" || n.type === "watermark"
                ? "transparent"
                : n.color,
          boxShadow:
            n.type === "text" &&
            n.replaceOriginal &&
            (n.textDirty || n.styleDirty || zl === n.id)
              ? `0 0 0 2px ${n.backgroundColor || "#ffffff"}`
              : void 0,
          fontSize: displayFontSize,
          fontFamily: n.cssFont || n.font,
          fontWeight: n.bold ? 700 : 400,
          fontStyle: n.italic ? "italic" : "normal",
          textDecoration: n.underline ? "underline" : "none",
          opacity:
            n.type === "highlight" ? (n.opacity ?? 0.38) : (n.opacity ?? 1),
          mixBlendMode: n.type === "highlight" ? "multiply" : void 0,
          transform:
            n.type === "watermark" || (n.type === "text" && n.angle)
              ? `rotate(${n.angle || 0}deg)`
              : void 0,
          transformOrigin: n.type === "text" ? "0 0" : void 0,
        },
        onPointerDown:
          n.type === "text" || W === "draw" ? void 0 : (y) => Ln(y, n, "move"),
        onPointerMove: n.type === "text" || W === "draw" ? void 0 : Cn,
        onPointerUp: n.type === "text" || W === "draw" ? void 0 : yn,
        onContextMenu: (y) => Es(y, n),
        onClick: (y) => {
          (y.stopPropagation(), W !== "draw" && De(n.id));
        },
        children: [
          n.type === "text" &&
            (0, d.jsxs)(d.Fragment, {
              children: [
                !n.replaceOriginal &&
                  (0, d.jsx)("span", {
                    className: "text-drag",
                    title: "Mover texto",
                    onPointerDown: (y) => Ln(y, n, "move"),
                    onPointerMove: Cn,
                    onPointerUp: yn,
                    children: "\u22EE\u22EE",
                  }),
                (0, d.jsx)("span", {
                  className: `text-editor ${n.replaceOriginal ? "pdf-text-replacement" : ""}`,
                  contentEditable: !n.replaceOriginal,
                  suppressContentEditableWarning: !0,
                  spellCheck: !1,
                  "data-placeholder": n.text ? void 0 : "Escribe aquí",
                  style: {
                    color: n.color,
                    fontFamily: n.cssFont || n.font,
                    fontWeight: n.bold ? 700 : 400,
                    fontStyle: n.italic ? "italic" : "normal",
                    textDecoration: n.underline ? "underline" : "none",
                  },
                  onPointerDown: (y) => {
                    W !== "draw" && (y.stopPropagation(), De(n.id));
                  },
                  onFocus: n.replaceOriginal ? void 0 : Te,
                  onInput: n.replaceOriginal ? void 0 : (y) => {
                    ((y.currentTarget.dataset.pdfTextUserEdited = "1"),
                      y.currentTarget
                        .closest(".mark")
                        ?.classList.add("pdf-text-live-edit"));
                  },
                  onPaste: n.replaceOriginal ? void 0 : (y) => {
                    let A = y.clipboardData?.getData("text/plain");
                    if (typeof A !== "string") return;
                    (y.preventDefault(),
                      document.execCommand("insertText", !1, A));
                  },
                  onKeyDown: n.replaceOriginal ? void 0 : (y) => {
                    y.key === "Escape" && y.currentTarget.blur();
                  },
                  onBlur: n.replaceOriginal ? void 0 : (y) => {
                    let A = (y.currentTarget.innerText || "").replace(/\r/g, ""),
                      k = y.currentTarget.dataset.pdfTextUserEdited === "1",
                      lineCount = Math.max(1, A.split("\n").length),
                      minimumHeight = Ee(
                        (lineCount * displayFontSize * 1.15 + 4) /
                          Math.max(Ye.h, 1),
                        0.025,
                        1 - n.y,
                      );
                    if (
                      (y.currentTarget
                      .closest(".mark")
                      ?.classList.remove("pdf-text-live-edit"),
                      delete y.currentTarget.dataset.pdfTextUserEdited,
                      n.replaceOriginal && !k)
                    ) {
                      y.currentTarget.textContent = n.text;
                      return;
                    }
                    ma(n.id, {
                      text: A,
                      h: Math.max(n.h, minimumHeight),
                      w: Math.max(
                        n.w,
                        Math.min(
                          1 - n.x,
                          (y.currentTarget.scrollWidth + 4) /
                            Math.max(Ye.w, 1),
                        ),
                      ),
                      textDirty: n.replaceOriginal
                        ? A !== (n.sourceText || "")
                        : !0,
                    });
                  },
                  children: n.text,
                }),
              ],
            }),
          n.type === "watermark" &&
            (0, d.jsx)("span", {
              className: "watermark-text",
              children: n.text,
            }),
          n.type === "image" &&
            n.imageData &&
            (0, d.jsx)("div", {
              className: "cropped-image",
              children: (0, d.jsx)("img", {
                src: n.imageData,
                alt: "",
                draggable: !1,
                style: {
                  width: `${1e4 / s}%`,
                  height: `${1e4 / L}%`,
                  left: `${(-n.crop.left * 100) / s}%`,
                  top: `${(-n.crop.top * 100) / L}%`,
                },
              }),
            }),
          zl === n.id &&
            !n.replaceOriginal &&
            (0, d.jsx)("span", {
              className: "resize-handle",
              title: "Ampliar o reducir",
              onPointerDown: (y) => Ln(y, n, "resize"),
              onPointerMove: Cn,
              onPointerUp: yn,
            }),
        ],
      },
      n.id,
    );
  },
    renderOrganizerPanel = (documentItem, panelLabel, targetSelector = !1) => {
      let panelSelection =
        documentItem.id === Q
          ? ue
          : new Set(dualPageSelections[documentItem.id] || []);
      return (0, d.jsxs)(
        "section",
        {
          className: "dual-document-panel",
          children: [
            (0, d.jsxs)("header", {
              children: [
                (0, d.jsxs)("div", {
                  children: [
                    (0, d.jsx)("small", { children: panelLabel }),
                    (0, d.jsx)("strong", { children: documentItem.name }),
                    panelSelection.size > 1 &&
                      (0, d.jsxs)("em", {
                        children: [panelSelection.size, " seleccionadas"],
                      }),
                  ],
                }),
                targetSelector
                  ? (0, d.jsx)("select", {
                      value: documentItem.id,
                      onChange: (event) => ms(event.target.value),
                      children: O.filter((item) => item.id !== Q).map((item) =>
                        (0, d.jsx)(
                          "option",
                          { value: item.id, children: item.name },
                          item.id,
                        ),
                      ),
                    })
                  : (0, d.jsx)("span", {
                      children: `${documentItem.pages.length} páginas`,
                    }),
              ],
            }),
            (0, d.jsx)("div", {
              className: "dual-page-grid",
              onDragOver: (event) => event.preventDefault(),
              onDrop: (event) => {
                if (mergePanelOpen && event.dataTransfer.files?.length) {
                  (event.preventDefault(), event.stopPropagation());
                  Jx(Q ? "merge" : "combine", event.dataTransfer.files);
                  return;
                }
                transferPagesBetweenPanels(
                  event,
                  documentItem.id,
                  documentItem.pages.length,
                );
              },
              children: [
                ...documentItem.pages.map((page, pageIndex) => {
                  let source = g.find((item) => item.id === page.docId),
                    isActive = documentItem.id === Q && page.id === $t,
                    isSelected = panelSelection.has(page.id);
                  return (0, d.jsxs)(
                    "article",
                    {
                      draggable: !0,
                      className: `dual-page-card ${isActive ? "active" : ""} ${isSelected ? "selected" : ""}`,
                      title:
                        "Clic para seleccionar; Ctrl/⌘ añade páginas y Mayús selecciona un intervalo",
                      onDragStart: (event) => {
                        let pageIds = isSelected
                          ? [...panelSelection]
                          : [page.id];
                        if (!isSelected) {
                          documentItem.id === Q
                            ? (Ta(page.id), ka(new Set([page.id])))
                            : setDualPageSelections((current) => ({
                                ...current,
                                [documentItem.id]: [page.id],
                              }));
                        }
                        (event.dataTransfer.setData(
                          "application/x-pdf-ignova-pages",
                          JSON.stringify({
                            documentId: documentItem.id,
                            pageIds,
                            copy: event.ctrlKey || event.metaKey,
                          }),
                        ),
                          (event.dataTransfer.effectAllowed = "copyMove"));
                      },
                      onDragOver: (event) => event.preventDefault(),
                      onDrop: (event) => {
                        if (
                          mergePanelOpen &&
                          event.dataTransfer.files?.length
                        ) {
                          (event.preventDefault(), event.stopPropagation());
                          Jx(
                            Q ? "merge" : "combine",
                            event.dataTransfer.files,
                          );
                          return;
                        }
                        transferPagesBetweenPanels(
                          event,
                          documentItem.id,
                          pageIndex,
                        );
                      },
                      onClick: (event) =>
                        selectOrganizerPage(
                          event,
                          documentItem,
                          page,
                          pageIndex,
                        ),
                      onDoubleClick: () => {
                        if (documentItem.id !== Q) {
                          lx(documentItem.id);
                          setDualPanelOpen(!0);
                          setTimeout(() => {
                            (Ta(page.id), ka(new Set([page.id])));
                          }, 0);
                        } else {
                          (Ta(page.id), ka(new Set([page.id])));
                          if (pagePanelOpen) setPagePanelOpen(!1);
                        }
                      },
                      children: [
                        (0, d.jsx)("div", {
                          className: "dual-page-canvas",
                          children: (0, d.jsx)(qh, {
                            source,
                            page,
                            width: 150,
                          }),
                        }),
                        (0, d.jsxs)("span", {
                          children: [
                            (0, d.jsx)("b", { children: pageIndex + 1 }),
                            (0, d.jsx)("small", {
                              children: source?.name || documentItem.name,
                            }),
                          ],
                        }),
                      ],
                    },
                    page.id,
                  );
                }),
                (0, d.jsx)("div", {
                  className: "dual-drop-end",
                  onDragOver: (event) => event.preventDefault(),
                  onDrop: (event) => {
                    if (mergePanelOpen && event.dataTransfer.files?.length) {
                      (event.preventDefault(), event.stopPropagation());
                      Jx(Q ? "merge" : "combine", event.dataTransfer.files);
                      return;
                    }
                    transferPagesBetweenPanels(
                      event,
                      documentItem.id,
                      documentItem.pages.length,
                    );
                  },
                  children: "Suelta aquí para añadir al final",
                }),
              ],
            }),
          ],
        },
        documentItem.id,
      );
    },
    renderMergeWorkspace = () =>
      (0, d.jsxs)("div", {
        className: "merge-workspace",
        children: [
          (0, d.jsxs)("section", {
            className: "merge-file-dropzone",
            onDragOver: (event) => {
              (event.preventDefault(), event.stopPropagation());
              event.dataTransfer.dropEffect = "copy";
            },
            onDrop: (event) => {
              (event.preventDefault(), event.stopPropagation());
              let files = Array.from(event.dataTransfer.files || []);
              files.length && Jx(Q ? "merge" : "combine", files);
            },
            children: [
              (0, d.jsx)("h2", { children: "Unir archivos PDF" }),
              (0, d.jsx)("p", {
                children:
                  "Arrastra aquí los documentos. Sus páginas se incorporarán al PDF final en el mismo orden.",
              }),
              (0, d.jsxs)("button", {
                type: "button",
                onClick: () => Jx(Q ? "merge" : "combine"),
                children: [
                  (0, d.jsx)(df, { size: 20 }),
                  "Seleccionar archivos PDF",
                ],
              }),
              (0, d.jsx)("small", {
                children: "También puedes arrastrar y soltar varios archivos a la vez",
              }),
            ],
          }),
          w.length && pn
            ? (0, d.jsxs)("section", {
                className: "merge-result-panel",
                children: [
                  (0, d.jsxs)("div", {
                    className: "merge-result-help",
                    children: [
                      (0, d.jsx)("strong", { children: "PDF final" }),
                      (0, d.jsx)("span", {
                        children:
                          "Arrastra las páginas para cambiar el orden antes de guardar.",
                      }),
                      (0, d.jsx)("b", {
                        children: `${w.length} páginas`,
                      }),
                    ],
                  }),
                  renderOrganizerPanel(
                    { ...pn, pages: w, marks: T },
                    "Documento combinado",
                  ),
                ],
              })
            : (0, d.jsx)("div", {
                className: "merge-empty-result",
                children:
                  "El PDF resultante aparecerá aquí con todas sus páginas.",
              }),
        ],
      });
  return (0, d.jsxs)("main", {
    className: "app",
    onClick: () => ea && Xa(null),
    onDragOver: (n) => n.preventDefault(),
    onDrop: (n) => {
      (n.preventDefault(), Tl || Jx("open", n.dataTransfer.files));
    },
    children: [
      (0, d.jsx)("input", {
        hidden: !0,
        ref: e,
        type: "file",
        multiple: !0,
        accept:
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp,.dwg,.dxf,.jpg,.jpeg,.png,.bmp,.webp,.tif,.tiff",
        onChange: (n) => ks(n, "open"),
      }),
      (0, d.jsx)("input", {
        hidden: !0,
        ref: a,
        type: "file",
        multiple: !0,
        accept:
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp,.dwg,.dxf,.jpg,.jpeg,.png,.bmp,.webp,.tif,.tiff",
        onChange: (n) => ks(n, "merge"),
      }),
      (0, d.jsx)("input", {
        hidden: !0,
        ref: mergeBuilderInput,
        type: "file",
        multiple: !0,
        accept:
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp,.dwg,.dxf,.jpg,.jpeg,.png,.bmp,.webp,.tif,.tiff",
        onChange: (n) => ks(n, Q ? "merge" : "combine"),
      }),
      (0, d.jsx)("input", {
        hidden: !0,
        ref: t,
        type: "file",
        accept: "image/png,image/jpeg,image/webp,image/bmp",
        onChange: dx,
      }),
      (0, d.jsx)("input", {
        hidden: !0,
        ref: l,
        type: "file",
        accept: ".p12,.pfx,application/x-pkcs12",
        onChange: (n) => {
          (Yh(n.target.files?.[0] || null), (n.target.value = ""));
        },
      }),
      (0, d.jsxs)("header", {
        className: "titlebar",
        children: [
          (0, d.jsxs)("div", {
            className: "mainmenu",
            children: [
              (0, d.jsx)("button", {
                className: "icon",
                title: "Menú principal",
                "aria-label": "Abrir menú principal",
                children: (0, d.jsx)(ff, { size: 19 }),
              }),
              (0, d.jsxs)("div", {
                className: "mainmenu-panel",
                children: [
                  (0, d.jsxs)("button", {
                    onClick: () => Jx("open"),
                    children: [(0, d.jsx)(Qt, {}), "Abrir o convertir"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: createBlankDocument,
                    children: [(0, d.jsx)(rf, {}), "Nuevo PDF en blanco"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: vf,
                    disabled: !w.length,
                    children: [(0, d.jsx)(Hu, {}), "Guardar"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: xx,
                    disabled: !w.length,
                    children: [(0, d.jsx)(Ru, {}), "Guardar como"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: Lx,
                    disabled: !w.length,
                    children: [(0, d.jsx)(sf, {}), "Imprimir"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: addWatermarkPro,
                    disabled: !w.length,
                    children: [(0, d.jsx)("span", { children: "W" }), "Marca de agua"],
                  }),
                ],
              }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "brand",
            children: [
              (0, d.jsx)("b", { children: "P" }),
              (0, d.jsx)("strong", { children: "PDF Ignova" }),
              (0, d.jsx)("em", { children: "PRO" }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "filetabs",
            children: [
              !O.length &&
                (0, d.jsxs)("button", {
                  className: "filetab empty",
                  type: "button",
                  onClick: createBlankDocument,
                  title: "Crear un PDF en blanco",
                  children: [
                    (0, d.jsx)(_a, { size: 15 }),
                    (0, d.jsx)("span", { children: "Nuevo documento" }),
                  ],
                }),
              O.map((n) =>
                (0, d.jsxs)(
                  "button",
                  {
                    className: `filetab ${n.id === Q ? "active" : ""}`,
                    onClick: () => lx(n.id),
                    onDragOver: (s) => {
                      Tl && n.id !== Q && s.preventDefault();
                    },
                    onDrop: (s) => {
                      !Tl ||
                        n.id === Q ||
                        (s.preventDefault(),
                        s.stopPropagation(),
                        Yu(s.ctrlKey || s.metaKey ? "copy" : "move", n.id),
                        Lf(null));
                    },
                    title: n.name,
                    children: [
                      (0, d.jsx)(_a, { size: 15 }),
                      (0, d.jsx)("span", { children: n.name }),
                      (0, d.jsx)(gf, {
                        className: "tab-close",
                        size: 15,
                        onClick: (s) => {
                          (s.stopPropagation(), ux(n.id));
                        },
                      }),
                    ],
                  },
                  n.id,
                ),
              ),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "panel-mode-switch",
            "aria-label": "Vista de documentos",
            children: [
              (0, d.jsx)("button", {
                type: "button",
                className:
                  !dualPanelOpen && !pagePanelOpen && !mergePanelOpen
                    ? "active"
                    : "",
                onClick: () => {
                  (setDualPanelOpen(!1),
                    setPagePanelOpen(!1),
                    setMergePanelOpen(!1));
                },
                children: "Documento",
              }),
              (0, d.jsx)("button", {
                type: "button",
                className: pagePanelOpen ? "active" : "",
                disabled: !w.length,
                onClick: () => {
                  (setDualPanelOpen(!1),
                    setMergePanelOpen(!1),
                    setPagePanelOpen(!0));
                },
                children: "Páginas",
              }),
              (0, d.jsx)("button", {
                type: "button",
                className: dualPanelOpen ? "active" : "",
                onClick: () => {
                  if (O.length < 2) {
                    F("Abre un segundo PDF para usar dos paneles");
                    return;
                  }
                  (setPagePanelOpen(!1),
                    setMergePanelOpen(!1),
                    setDualPanelOpen(!0));
                },
                children: "2 PDF",
              }),
            ],
          }),
          (0, d.jsxs)("button", {
            type: "button",
            className: `merge-pdf-button ${mergePanelOpen ? "active" : ""}`,
            onClick: () => {
              (setDualPanelOpen(!1),
                setPagePanelOpen(!1),
                setMergePanelOpen(!0));
            },
            title: "Arrastrar y ordenar archivos para crear un único PDF",
            children: [
              (0, d.jsx)(df, { size: 15 }),
              (0, d.jsx)("span", { children: "Unir archivos" }),
            ],
          }),
          (0, d.jsxs)("button", {
            className: "new",
            onClick: () => Jx("open"),
            children: [(0, d.jsx)(rf, { size: 16 }), " Abrir / convertir"],
          }),
          (0, d.jsx)("span", { className: "spacer" }),
        ],
      }),
      (0, d.jsxs)("nav", {
        className: "nav",
        children: [
          (0, d.jsxs)("div", {
            className: "top-navigation",
            "aria-label": "Navegación de páginas",
            children: [
              (0, d.jsxs)("button", {
                onClick: hn,
                disabled: !r.current.length,
                title: "Atrás: deshacer la última acción",
                children: [
                  (0, d.jsx)(Nu, { size: 18, strokeWidth: 2.2 }),
                  (0, d.jsx)("span", { children: "Atrás" }),
                ],
              }),
              (0, d.jsxs)("button", {
                onClick: Sf,
                disabled: !m.current.length,
                title: "Adelante: rehacer la última acción",
                children: [
                  (0, d.jsx)(qu, { size: 18, strokeWidth: 2.2 }),
                  (0, d.jsx)("span", { children: "Adelante" }),
                ],
              }),
            ],
          }),
          (0, d.jsx)("i", { className: "nav-separator" }),
          (0, d.jsxs)("div", {
            className: "viewmenu",
            children: [
              (0, d.jsxs)("button", {
                children: [
                  (0, d.jsx)(Qt, { size: 16 }),
                  "Archivo",
                  (0, d.jsx)(gt, { size: 13 }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "viewmenu-panel",
                children: [
                  (0, d.jsxs)("button", {
                    onClick: Cx,
                    children: [(0, d.jsx)(Kt, {}), "Inicio"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Jx("open"),
                    children: [(0, d.jsx)(Qt, {}), "Abrir o convertir"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: createBlankDocument,
                    children: [(0, d.jsx)(rf, {}), "Nuevo PDF en blanco"],
                  }),
                  (0, d.jsx)("hr", {}),
                  (0, d.jsxs)("button", {
                    onClick: vf,
                    disabled: !w.length,
                    children: [
                      (0, d.jsx)(Hu, {}),
                      "Guardar",
                      (0, d.jsx)("kbd", { children: "Ctrl S" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: xx,
                    disabled: !w.length,
                    children: [(0, d.jsx)(Ru, {}), "Guardar como"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: Lx,
                    disabled: !w.length,
                    children: [(0, d.jsx)(sf, {}), "Imprimir"],
                  }),
                  (0, d.jsx)("hr", {}),
                  (0, d.jsxs)("button", {
                    onClick: addWatermarkPro,
                    disabled: !w.length,
                    children: [(0, d.jsx)("span", { children: "W" }), "Marca de agua"],
                  }),
                ],
              }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "viewmenu",
            children: [
              (0, d.jsxs)("button", {
                children: [
                  (0, d.jsx)(Uu, { size: 16 }),
                  "Editar",
                  (0, d.jsx)(gt, { size: 13 }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "viewmenu-panel",
                children: [
                  (0, d.jsxs)("button", {
                    onClick: hn,
                    disabled: !r.current.length,
                    children: [
                      (0, d.jsx)(Nu, {}),
                      "Deshacer",
                      (0, d.jsx)("kbd", {
                        children:
                          window.pdfEstudio?.platform === "darwin" ? "⌘ Z" : "Ctrl Z",
                      }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: Sf,
                    disabled: !m.current.length,
                    children: [
                      (0, d.jsx)(qu, {}),
                      "Rehacer",
                      (0, d.jsx)("kbd", {
                        children:
                          window.pdfEstudio?.platform === "darwin" ? "⌘ ⇧ Z" : "Ctrl Y",
                      }),
                    ],
                  }),
                  (0, d.jsx)("hr", {}),
                  (0, d.jsxs)("button", {
                    onClick: activateNativeTextSelection,
                    disabled: !w.length,
                    children: [
                      (0, d.jsx)(Uu, {}),
                      "Seleccionar texto",
                      (0, d.jsx)("kbd", { children: "Arrastrar" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => copyNativePdfSelection(nativeSelectionText),
                    disabled: !nativeSelectionText,
                    children: [
                      (0, d.jsx)(ca, {}),
                      "Copiar texto seleccionado",
                      (0, d.jsx)("kbd", {
                        children:
                          window.pdfEstudio?.platform === "darwin" ? "⌘ C" : "Ctrl C",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "viewmenu",
            children: [
              (0, d.jsxs)("button", {
                children: [
                  (0, d.jsx)(_a, { size: 16 }),
                  "P\xE1ginas",
                  (0, d.jsx)(gt, { size: 13 }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "viewmenu-panel",
                children: [
                  (0, d.jsxs)("button", {
                    onClick: () => Jx("merge"),
                    children: [(0, d.jsx)(Zt, {}), "Agregar o unir documentos"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => yf(!0),
                    children: [
                      (0, d.jsx)(Va, {}),
                      "Mostrar panel de p\xE1ginas",
                    ],
                  }),
                  (0, d.jsx)("hr", {}),
                  (0, d.jsxs)("button", {
                    onClick: Xu,
                    disabled: !ue.size,
                    children: [(0, d.jsx)(ca, {}), "Duplicar seleccionadas"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => el(-90),
                    disabled: !ue.size,
                    children: [
                      (0, d.jsx)(AcrobatRotateLeft, {
                        className: "acrobat-rotate",
                        strokeWidth: 2.35,
                      }),
                      "Girar a la izquierda",
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => el(90),
                    disabled: !ue.size,
                    children: [
                      (0, d.jsx)(AcrobatRotateRight, {
                        className: "acrobat-rotate",
                        strokeWidth: 2.35,
                      }),
                      "Girar a la derecha",
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: ql,
                    disabled: !ue.size,
                    children: [(0, d.jsx)(Oa, {}), "Eliminar p\xE1ginas"],
                  }),
                  mn &&
                    (0, d.jsxs)(d.Fragment, {
                      children: [
                        (0, d.jsx)("hr", {}),
                        (0, d.jsxs)("button", {
                          onClick: () => Yu("copy"),
                          disabled: !ue.size,
                          children: [(0, d.jsx)(ca, {}), "Copiar a ", mn.name],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => Yu("move"),
                          disabled: !ue.size,
                          children: [(0, d.jsx)(jt, {}), "Mover a ", mn.name],
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "viewmenu drawing-menu",
            children: [
              (0, d.jsxs)("button", {
                children: [
                  (0, d.jsx)(Il, { size: 16 }),
                  "Dibujo",
                  (0, d.jsx)(gt, { size: 13 }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "viewmenu-panel",
                children: [
                  (0, d.jsxs)("button", {
                    onClick: () => Me("text"),
                    children: [(0, d.jsx)(Al, {}), "Crear texto"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Me("draw"),
                    children: [(0, d.jsx)(Il, {}), "Escribir a mano alzada"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Me("highlight"),
                    children: [(0, d.jsx)(of, {}), "Resaltar"],
                  }),
                  (0, d.jsxs)("button", {
                    className: W === "redact" ? "active" : "",
                    onClick: () => Me("redact"),
                    children: [(0, d.jsx)(mf, {}), "Tapado"],
                  }),
                  (0, d.jsxs)("label", {
                    className: "drawing-menu-color",
                    title: "Color del tapado",
                    children: [
                      (0, d.jsx)("span", { children: "Color del tapado" }),
                      (0, d.jsx)("input", {
                        type: "color",
                        value: redactColor,
                        onChange: (n) => setRedactColor(n.target.value),
                      }),
                    ],
                  }),
                  (0, d.jsx)("hr", {}),
                  (0, d.jsxs)("button", {
                    onClick: () => Qu(),
                    disabled: !$,
                    children: [(0, d.jsx)(xt, {}), "Insertar imagen"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Me("paste"),
                    disabled: !$,
                    children: [(0, d.jsx)(ht, {}), "Pegar imagen"],
                  }),
                ],
              }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "viewmenu",
            children: [
              (0, d.jsxs)("button", {
                children: [
                  (0, d.jsx)(Eu, { size: 16 }),
                  "Visualizaci\xF3n",
                  (0, d.jsx)(gt, { size: 13 }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "viewmenu-panel",
                children: [
                  (0, d.jsxs)("button", {
                    onClick: () => Ya(10),
                    children: [
                      (0, d.jsx)(Ml, {}),
                      "Zoom +",
                      (0, d.jsx)("kbd", { children: "Ctrl +" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Ya(-10),
                    children: [
                      (0, d.jsx)(Dl, {}),
                      "Zoom \u2212",
                      (0, d.jsx)("kbd", { children: "Ctrl \u2212" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Gu(100),
                    children: [
                      (0, d.jsx)("span", { children: "100%" }),
                      "Escala real",
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Gu(250),
                    children: [
                      (0, d.jsx)("span", { children: "250%" }),
                      "Aumento 250 %",
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Gu(400),
                    children: [
                      (0, d.jsx)("span", { children: "400%" }),
                      "Aumento 400 %",
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Gu(500),
                    children: [
                      (0, d.jsx)("span", { children: "500%" }),
                      "Aumento máximo",
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: Os,
                    children: [
                      (0, d.jsx)(vl, {}),
                      "Extensi\xF3n / p\xE1gina completa",
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: px,
                    children: [(0, d.jsx)(Eu, {}), "Ajustar al ancho"],
                  }),
                  (0, d.jsx)("hr", {}),
                  (0, d.jsxs)("button", {
                    onClick: () => Me("hand"),
                    children: [(0, d.jsx)(Ou, {}), "Herramienta Mano"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => yf((n) => !n),
                    children: [(0, d.jsx)(Va, {}), "Panel de p\xE1ginas"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => kl((n) => !n),
                    children: [(0, d.jsx)(pf, {}), "Panel de propiedades"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () =>
                      document.fullscreenElement
                        ? document.exitFullscreen()
                        : document.documentElement.requestFullscreen(),
                    children: [(0, d.jsx)(vl, {}), "Pantalla completa"],
                  }),
                ],
              }),
            ],
          }),
          (0, d.jsxs)("button", {
            className: `ocr-top-button ${W === "ocr-region" ? "active" : ""}`,
            onClick: () => {
              (setOcrSelection(null),
                Me("ocr-region"),
                F("Arrastra una ventana sobre el texto que quieres reconocer"));
            },
            disabled: !$ || ocrRegionBusy,
            title: "OCR de una ventana de la p\xE1gina",
            children: [
              (0, d.jsx)(cf, { size: 17 }),
              (0, d.jsx)("span", { children: "OCR ventana" }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: `search ${searchResults.length ? "has-results" : ""}`,
            children: [
              (0, d.jsx)("button", {
                className: "search-submit",
                onClick: bx,
                title: "Buscar en todo el documento",
                "aria-label": "Buscar en todo el documento",
                children: (0, d.jsx)(cf, { size: 16 }),
              }),
              (0, d.jsx)("input", {
                value: rn,
                onChange: (n) => {
                  (Gh(n.target.value), clearSearch());
                },
                onKeyDown: (n) => {
                  if (n.key === "Enter") {
                    (n.preventDefault(),
                      searchResults.length
                        ? goToSearchResult(
                            currentSearchIndex + (n.shiftKey ? -1 : 1),
                          )
                        : bx());
                  } else n.key === "Escape" && clearSearch();
                },
                placeholder: "Buscar en todas las p\xE1ginas",
                title: "Busca el texto en todas las p\xE1ginas del documento",
              }),
              searchResults.length > 0 &&
                (0, d.jsxs)(d.Fragment, {
                  children: [
                    (0, d.jsxs)("span", {
                      className: "search-count",
                      title: `${searchResults.length} coincidencias`,
                      children: [currentSearchIndex + 1, "/", searchResults.length],
                    }),
                    (0, d.jsx)("button", {
                      className: "search-nav",
                      onClick: () =>
                        goToSearchResult(currentSearchIndex - 1),
                      title: "Coincidencia anterior (Mayús+Enter)",
                      "aria-label": "Coincidencia anterior",
                      children: "\u2039",
                    }),
                    (0, d.jsx)("button", {
                      className: "search-nav",
                      onClick: () =>
                        goToSearchResult(currentSearchIndex + 1),
                      title: "Coincidencia siguiente (Enter)",
                      "aria-label": "Coincidencia siguiente",
                      children: "\u203A",
                    }),
                    (0, d.jsxs)("div", {
                      className: "search-result-preview",
                      children: [
                        (0, d.jsxs)("b", {
                          children: [
                            "P\xE1gina ",
                            searchResults[currentSearchIndex]?.pageNumber + 1,
                            " · ",
                            currentSearchIndex + 1,
                            " de ",
                            searchResults.length,
                          ],
                        }),
                        (0, d.jsx)("span", {
                          children:
                            searchResults[currentSearchIndex]?.snippet || rn,
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          (0, d.jsxs)("div", {
            className: "export",
            children: [
              (0, d.jsxs)("button", {
                className: "blue",
                disabled: !w.length,
                children: [
                  (0, d.jsx)(Ru, { size: 17 }),
                  " Exportar ",
                  (0, d.jsx)(gt, { size: 13 }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "exportmenu",
                children: [
                  (0, d.jsx)("button", { onClick: vf, children: "PDF" }),
                  (0, d.jsx)("button", { onClick: qs, children: "Word con OCR" }),
                  (0, d.jsx)("button", { onClick: Hs, children: "Excel con OCR" }),
                ],
              }),
            ],
          }),
          (0, d.jsxs)("button", {
            className: "signature-last",
            onClick: () => Rl(!0),
            disabled: !$,
            children: [(0, d.jsx)(Ma, { size: 16 }), "Firma digital"],
          }),
        ],
      }),
      (0, d.jsxs)("section", {
        className: "work",
        children: [
          hs &&
            (0, d.jsxs)("aside", {
              className: "left",
              children: [
                (0, d.jsxs)("div", {
                  className: "panelhead",
                  children: [
                    (0, d.jsxs)("div", {
                      children: [
                        (0, d.jsx)("button", {
                          className: dn === "pages" ? "active" : "",
                          onClick: () => nn("pages"),
                          children: "P\xE1ginas",
                        }),
                        (0, d.jsx)("button", {
                          className: dn === "tools" ? "active" : "",
                          onClick: () => nn("tools"),
                          children: "Herramientas",
                        }),
                      ],
                    }),
                    (0, d.jsx)("button", {
                      className: "icon",
                      onClick: () => yf(!1),
                      children: (0, d.jsx)(Va, { size: 17 }),
                    }),
                  ],
                }),
                dn === "pages"
                  ? (0, d.jsxs)(d.Fragment, {
                      children: [
                        (0, d.jsxs)("div", {
                          className: "pageactions",
                          children: [
                            (0, d.jsxs)("button", {
                              onClick: () => Jx("merge"),
                              children: [
                                (0, d.jsx)(Zt, { size: 16 }),
                                " A\xF1adir",
                              ],
                            }),
                            (0, d.jsxs)("button", {
                              onClick: Xu,
                              disabled: !ue.size,
                              children: [
                                (0, d.jsx)(ca, { size: 16 }),
                                " Copiar",
                              ],
                            }),
                            (0, d.jsxs)("button", {
                              onClick: ql,
                              disabled: !ue.size,
                              children: [
                                (0, d.jsx)(Oa, { size: 16 }),
                                " Borrar",
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("div", {
                          className: "summary",
                          children: [
                            (0, d.jsxs)("span", {
                              children: [w.length, " p\xE1ginas"],
                            }),
                            ue.size > 1 &&
                              (0, d.jsxs)("b", {
                                children: [ue.size, " seleccionadas"],
                              }),
                          ],
                        }),
                        O.length > 1 &&
                          (0, d.jsxs)("div", {
                            className: "page-transfer",
                            children: [
                              (0, d.jsx)("label", {
                                children: "Enviar p\xE1ginas seleccionadas a:",
                              }),
                              (0, d.jsx)("select", {
                                value: xf,
                                onChange: (n) => ms(n.target.value),
                                children: O.filter((n) => n.id !== Q).map((n) =>
                                  (0, d.jsx)(
                                    "option",
                                    { value: n.id, children: n.name },
                                    n.id,
                                  ),
                                ),
                              }),
                              (0, d.jsxs)("div", {
                                children: [
                                  (0, d.jsxs)("button", {
                                    onClick: () => Yu("copy"),
                                    disabled: !ue.size,
                                    children: [
                                      (0, d.jsx)(ca, { size: 15 }),
                                      " Copiar",
                                    ],
                                  }),
                                  (0, d.jsxs)("button", {
                                    onClick: () => Yu("move"),
                                    disabled: !ue.size,
                                    children: [
                                      (0, d.jsx)(jt, { size: 15 }),
                                      " Mover",
                                    ],
                                  }),
                                ],
                              }),
                              (0, d.jsx)("small", {
                                children:
                                  "Tambi\xE9n puedes arrastrar p\xE1ginas a otra pesta\xF1a. Mant\xE9n Ctrl para copiar.",
                              }),
                            ],
                          }),
                        (0, d.jsxs)("div", {
                          className: "thumbs",
                          children: [
                            !w.length &&
                              (0, d.jsxs)("button", {
                                className: "emptythumb",
                                onClick: () => Jx("open"),
                                children: [
                                  (0, d.jsx)(Zt, {}),
                                  (0, d.jsx)("span", {
                                    children: "Abrir un documento",
                                  }),
                                ],
                              }),
                            w.map((n, s) => {
                              let L = g.find((y) => y.id === n.docId);
                              return (0, d.jsxs)(
                                "div",
                                {
                                  draggable: !0,
                                  className: `thumb ${ue.has(n.id) ? "selected" : ""}`,
                                  onDragStart: () => {
                                    (Lf(n.id),
                                      ue.has(n.id) ||
                                        (ka(new Set([n.id])), Ta(n.id)));
                                  },
                                  onDragEnd: () => Lf(null),
                                  onDragOver: (y) => y.preventDefault(),
                                  onDrop: (y) => {
                                    (y.stopPropagation(), fx(n.id));
                                  },
                                  onClick: (y) => ox(y, n.id, s),
                                  onContextMenu: (y) => {
                                    (y.preventDefault(),
                                      ue.has(n.id) ||
                                        (ka(new Set([n.id])), Ta(n.id)),
                                      Xa({
                                        x: y.clientX,
                                        y: y.clientY,
                                        pageId: n.id,
                                        pageX: 0.2,
                                        pageY: 0.2,
                                      }));
                                  },
                                  children: [
                                    (0, d.jsx)(uf, { size: 15 }),
                                    (0, d.jsx)("div", {
                                      className: "thumbcanvas",
                                      children: (0, d.jsx)(qh, {
                                        source: L,
                                        page: n,
                                        width: 104,
                                      }),
                                    }),
                                    (0, d.jsxs)("span", {
                                      children: [
                                        (0, d.jsx)("b", { children: s + 1 }),
                                        (0, d.jsx)("small", {
                                          children: L?.name,
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                n.id,
                              );
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, d.jsxs)("div", {
                      className: "toollist",
                      children: [
                        (0, d.jsxs)("button", {
                          onClick: () => Jx("open"),
                          children: [
                            (0, d.jsx)(Qt, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", {
                                  children: "Abrir o convertir",
                                }),
                                (0, d.jsx)("small", {
                                  children: "PDF, Office, DWG, JPG, PNG o TIF",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => Jx("merge"),
                          children: [
                            (0, d.jsx)(df, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", {
                                  children: "Combinar archivos",
                                }),
                                (0, d.jsx)("small", {
                                  children: "A\xF1adir p\xE1ginas",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => nn("pages"),
                          children: [
                            (0, d.jsx)(_a, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", {
                                  children: "Organizar p\xE1ginas",
                                }),
                                (0, d.jsx)("small", {
                                  children: "Mover, copiar, girar o borrar",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: activatePdfTextModification,
                          children: [
                            (0, d.jsx)(Al, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", { children: "Modificar texto" }),
                                (0, d.jsx)("small", {
                                  children: "Cambiar texto existente",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => Me("text"),
                          children: [
                            (0, d.jsx)(Al, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", { children: "Crear texto" }),
                                (0, d.jsx)("small", {
                                  children: "A\xF1adir texto mediante di\xE1logo",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => Me("draw"),
                          children: [
                            (0, d.jsx)(Il, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", { children: "Mano alzada" }),
                                (0, d.jsx)("small", {
                                  children:
                                    "Escribir o dibujar con el rat\xF3n",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => Qu(),
                          children: [
                            (0, d.jsx)(xt, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", {
                                  children: "Insertar imagen",
                                }),
                                (0, d.jsx)("small", {
                                  children: "Foto, captura o logotipo",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => Me("paste"),
                          children: [
                            (0, d.jsx)(ht, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", { children: "Pegar imagen" }),
                                (0, d.jsx)("small", {
                                  children: "Haz clic en el punto de destino",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => {
                            (setOcrSelection(null),
                              Me("ocr-region"),
                              F("Arrastra una ventana sobre el texto que quieres reconocer"));
                          },
                          disabled: !$ || ocrRegionBusy,
                          children: [
                            (0, d.jsx)(cf, {}),
                            (0, d.jsxs)("span", {
                              children: [
                                (0, d.jsx)("b", { children: "OCR de ventana" }),
                                (0, d.jsx)("small", {
                                  children: "Reconocer solo una zona de la p\xE1gina",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          (0, d.jsxs)("section", {
            className: "document",
            children: [
              (0, d.jsxs)("div", {
                className: "toolbar",
                children: [
                  !hs &&
                    (0, d.jsx)("button", {
                      onClick: () => yf(!0),
                      children: (0, d.jsx)(_a, { size: 17 }),
                    }),
                  (0, d.jsxs)("button", {
                    className: W === "select" ? "active" : "",
                    onClick: activateNativeTextSelection,
                    title: "Seleccionar texto o zonas para copiar, sin modificar el PDF",
                    children: [
                      (0, d.jsx)(Uu, { size: 17 }),
                      (0, d.jsx)("span", { children: "Seleccionar" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    className: W === "hand" ? "active" : "",
                    onClick: () => Me("hand"),
                    children: [
                      (0, d.jsx)(Ou, { size: 17 }),
                      (0, d.jsx)("span", { children: "Mano" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    className: W === "modify-text" ? "active" : "",
                    onClick: activatePdfTextModification,
                    title: "Modificar el texto existente del PDF, sin crear texto nuevo",
                    children: [
                      (0, d.jsx)(Al, { size: 17 }),
                      (0, d.jsx)("span", { children: "Modificar texto" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Ya(-10),
                    title: "Zoom \u2212",
                    children: [
                      (0, d.jsx)(Dl, { size: 17 }),
                      (0, d.jsx)("span", { children: "Zoom \u2212" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Ya(10),
                    title: "Zoom +",
                    children: [
                      (0, d.jsx)(Ml, { size: 17 }),
                      (0, d.jsx)("span", { children: "Zoom +" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: Os,
                    title: "Zoom extensi\xF3n",
                    children: [
                      (0, d.jsx)(vl, { size: 17 }),
                      (0, d.jsx)("span", { children: "Extensi\xF3n" }),
                    ],
                  }),
                  (0, d.jsx)("i", {}),
                  (0, d.jsxs)("button", {
                    className: W === "text" ? "active" : "",
                    onClick: () => Me("text"),
                    title: "Crear un texto nuevo mediante cuadro de diálogo",
                    children: [
                      (0, d.jsx)(Al, { size: 17 }),
                      (0, d.jsx)("span", { children: "Crear texto" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    className: W === "draw" ? "active" : "",
                    onClick: () => Me("draw"),
                    children: [
                      (0, d.jsx)(Il, { size: 17 }),
                      (0, d.jsx)("span", { children: "Mano alzada" }),
                    ],
                  }),
                  W === "draw" &&
                    (0, d.jsxs)("div", {
                      className: "draw-controls",
                      children: [
                        (0, d.jsxs)("label", {
                          title: "Color del trazo",
                          children: [
                            "Color",
                            (0, d.jsx)("input", {
                              type: "color",
                              value: Ms,
                              onChange: (n) => ex(n.target.value),
                            }),
                          ],
                        }),
                        (0, d.jsxs)("label", {
                          title: "Ancho del trazo",
                          children: [
                            "Ancho ",
                            cn,
                            "px",
                            (0, d.jsx)("input", {
                              type: "range",
                              min: "1",
                              max: "20",
                              value: cn,
                              onChange: (n) => ax(+n.target.value),
                            }),
                          ],
                        }),
                      ],
                    }),
                  (0, d.jsxs)("button", {
                    className: W === "highlight" ? "active" : "",
                    onClick: () => Me("highlight"),
                    children: [
                      (0, d.jsx)(of, { size: 17 }),
                      (0, d.jsx)("span", { children: "Resaltar" }),
                    ],
                  }),
                  W === "highlight" &&
                    (0, d.jsxs)("div", {
                      className: "mark-controls",
                      "data-toolbar-owner": "highlight",
                      children: [
                        (0, d.jsxs)("label", {
                          title: "Color del resaltado",
                          children: [
                            "Color",
                            (0, d.jsx)("input", {
                              type: "color",
                              value: highlightColor,
                              onChange: (n) => setHighlightColor(n.target.value),
                            }),
                          ],
                        }),
                        (0, d.jsxs)("label", {
                          title: "Transparencia del resaltado",
                          children: [
                            "Opacidad ",
                            Math.round(highlightOpacity * 100),
                            "%",
                            (0, d.jsx)("input", {
                              type: "range",
                              min: "15",
                              max: "65",
                              value: Math.round(highlightOpacity * 100),
                              onChange: (n) =>
                                setHighlightOpacity(+n.target.value / 100),
                            }),
                          ],
                        }),
                      ],
                    }),
                  (0, d.jsx)("i", {}),
                  (0, d.jsxs)("button", {
                    onClick: () => Qu(),
                    disabled: !$,
                    children: [
                      (0, d.jsx)(xt, { size: 17 }),
                      (0, d.jsx)("span", { children: "Imagen" }),
                    ],
                  }),
                  (0, d.jsxs)("button", {
                    className: W === "paste" ? "active" : "",
                    onClick: () => Me("paste"),
                    disabled: !$,
                    children: [
                      (0, d.jsx)(ht, { size: 17 }),
                      (0, d.jsx)("span", { children: "Pegar" }),
                    ],
                  }),
                  (0, d.jsx)("i", {}),
                  (0, d.jsx)("button", {
                    onClick: () => el(-90),
                    disabled: !w.length,
                    title: "Girar página a la izquierda",
                    className: "rotate-tool",
                    children: (0, d.jsx)(AcrobatRotateLeft, {
                      size: 18,
                      strokeWidth: 2.35,
                    }),
                  }),
                  (0, d.jsx)("button", {
                    onClick: () => el(90),
                    disabled: !w.length,
                    title: "Girar página a la derecha",
                    className: "rotate-tool",
                    children: (0, d.jsx)(AcrobatRotateRight, {
                      size: 18,
                      strokeWidth: 2.35,
                    }),
                  }),
                  (0, d.jsx)("button", {
                    onClick: Xu,
                    children: (0, d.jsx)(ca, { size: 17 }),
                  }),
                  (0, d.jsx)("button", {
                    onClick: ql,
                    className: "danger",
                    children: (0, d.jsx)(Oa, { size: 17 }),
                  }),
                  (0, d.jsx)("span", { className: "spacer" }),
                  (0, d.jsx)("button", {
                    onClick: () => kl(!fn),
                    className: fn ? "active" : "",
                    children: "Propiedades",
                  }),
                ],
              }),
              (0, d.jsx)("div", {
                ref: u,
                className: `stage ${W === "hand" ? "hand" : ""} ${Wh ? "panning" : ""} ${Cf <= 35 ? "overview-stage" : ""} ${dualPanelOpen ? "dual-stage" : ""} ${pagePanelOpen ? "page-panel-stage" : ""} ${mergePanelOpen ? "merge-panel-stage" : ""}`,
                onPointerDown:
                  dualPanelOpen || pagePanelOpen || mergePanelOpen || Cf <= 35
                    ? void 0
                    : sx,
                onPointerMove:
                  dualPanelOpen || pagePanelOpen || mergePanelOpen || Cf <= 35
                    ? void 0
                    : cx,
                onPointerUp:
                  dualPanelOpen || pagePanelOpen || mergePanelOpen || Cf <= 35
                    ? void 0
                    : Rs,
                onPointerCancel:
                  dualPanelOpen || pagePanelOpen || mergePanelOpen || Cf <= 35
                    ? void 0
                    : Rs,
                children: mergePanelOpen
                  ? renderMergeWorkspace()
                  : w.length
                    ? pagePanelOpen && pn
                      ? (0, d.jsxs)("div", {
                          className: "single-page-organizer",
                          children: [
                            (0, d.jsxs)("div", {
                              className: "dual-organizer-help",
                              children: [
                                (0, d.jsx)("strong", {
                                  children: "Panel de páginas",
                                }),
                                (0, d.jsx)("span", {
                                  children:
                                    "Todas las páginas en cuadrícula. Arrastra para cambiar el orden y haz doble clic para abrir una página.",
                                }),
                              ],
                            }),
                            renderOrganizerPanel(
                              { ...pn, pages: w, marks: T },
                              "PDF actual",
                            ),
                          ],
                        })
                    : dualPanelOpen && O.length > 1 && pn && mn
                    ? (0, d.jsxs)("div", {
                        className: "dual-organizer",
                        children: [
                          (0, d.jsxs)("div", {
                            className: "dual-organizer-help",
                            children: [
                              (0, d.jsx)("strong", {
                                children: "Organizar entre dos PDF",
                              }),
                              (0, d.jsx)("span", {
                                children:
                                  "Arrastra páginas de un panel al otro. Mantén Ctrl o ⌘ para copiar en vez de mover.",
                              }),
                            ],
                          }),
                          (0, d.jsx)("div", {
                            className: "dual-organizer-columns",
                            children: [
                              renderOrganizerPanel(
                                { ...pn, pages: w, marks: T },
                                "PDF activo",
                              ),
                              renderOrganizerPanel(mn, "Segundo PDF", !0),
                            ],
                          }),
                        ],
                      })
                    : Cf <= 35
                      ? (0, d.jsx)("div", {
                          className: "page-overview-strip",
                          children: w.map((page, pageIndex) => {
                            let source = g.find((item) => item.id === page.docId);
                            return (0, d.jsxs)(
                              "article",
                              {
                                draggable: !0,
                                className: `overview-page ${page.id === $t ? "active" : ""}`,
                                onDragStart: () => Lf(page.id),
                                onDragEnd: () => Lf(null),
                                onDragOver: (event) => event.preventDefault(),
                                onDrop: (event) => {
                                  (event.stopPropagation(), fx(page.id));
                                },
                                onClick: () => {
                                  (Ta(page.id), ka(new Set([page.id])));
                                },
                                children: [
                                  (0, d.jsx)("div", {
                                    className: "overview-page-canvas",
                                    children: (0, d.jsx)(qh, {
                                      source,
                                      page,
                                      width: Math.round((680 * Cf) / 100),
                                    }),
                                  }),
                                  (0, d.jsx)("b", { children: pageIndex + 1 }),
                                ],
                              },
                              page.id,
                            );
                          }),
                        })
                      : $ &&
                    (0, d.jsxs)("div", {
                      className: `pagestage ${["text", "modify-text", "highlight", "redact", "whiteout", "paste", "draw", "ocr-region"].includes(W) ? "cross" : ""}`,
                      style: { width: Math.round((680 * Cf) / 100) },
                      onClick:(n)=>(De(null),nx(n)),
onContextMenu:gx,onPointerDown:ix,                             
                      onPointerMove: (n) => {
                        ((x.current = ju(
                          n.currentTarget,
                          n.clientX,
                          n.clientY,
                        )),
                          rx(n));
                      },
                      onPointerUp: Bs,
                      onPointerCancel: Bs,
                      children: [
                        (0, d.jsx)(qh, {
                          source: gn,
                          page: $,
                          width: Math.round((680 * Cf) / 100),
                          onSize: tx,
                        }),
                        (0, d.jsx)(SearchHighlightLayer, {
                          results: searchResults,
                          pageId: $.id,
                          currentIndex: currentSearchIndex,
                        }),
                        (0, d.jsx)(PdfEditableTextLayer, {
                          source: gn,
                          page: $,
                          width: Math.round((680 * Cf) / 100),
                          enabled: W === "select" || W === "modify-text",
                          editingText: W === "modify-text",
                          onPick: wx,
                          onLink: handlePdfLink,
                          onSelection: setNativeSelectionText,
                        }),
                        ocrSelection &&
                          (0, d.jsx)("span", {
                            className: `ocr-region-selection ${ocrRegionBusy ? "busy" : ""}`,
                            style: {
                              left: `${ocrSelection.x * 100}%`,
                              top: `${ocrSelection.y * 100}%`,
                              width: `${ocrSelection.w * 100}%`,
                              height: `${ocrSelection.h * 100}%`,
                            },
                            children: ocrRegionBusy ? "OCR\u2026" : "OCR",
                          }),
                        screenSelection &&
                          W === "select" &&
                          (0, d.jsx)("span", {
                            className: "screen-region-selection",
                            style: {
                              left: `${screenSelection.x * 100}%`,
                              top: `${screenSelection.y * 100}%`,
                              width: `${screenSelection.w * 100}%`,
                              height: `${screenSelection.h * 100}%`,
                            },
                            children: "Zona seleccionada",
                          }),
                        (0, d.jsxs)("div", {
                          className: "marklayer",
                          children: [
                            T.filter(
                              (n) =>
                                n.pageId === $.id &&
                                n.type === "text" &&
                                n.replaceOriginal &&
                                n.sourceRect &&
                                (n.textDirty || n.styleDirty || zl === n.id),
                            ).map((n) =>
                              (0, d.jsx)(
                                "span",
                                {
                                  className: "pdf-original-cover",
                                  style: {
                                    left: `${n.sourceRect.x * 100}%`,
                                    top: `${n.sourceRect.y * 100}%`,
                                    width: `${n.sourceRect.w * 100}%`,
                                    height: `${n.sourceRect.h * 100}%`,
                                    backgroundColor:
                                      n.backgroundColor || "#ffffff",
                                  },
                                },
                                `cover-${n.id}`,
                              ),
                            ),
                            T.filter((n) => n.pageId === $.id).map(Sx),
                          ],
                        }),
                      ],
                    })
                  : (0, d.jsxs)("div", {
                      className: "welcome",
                      children: [
                        (0, d.jsx)("div", {
                          children: (0, d.jsx)(_a, { size: 34 }),
                        }),
                        (0, d.jsx)("small", {
                          children: "EDITOR PDF PROFESIONAL",
                        }),
                        (0, d.jsx)("h1", {
                          children: "Abre un PDF y trabaja con sus p\xE1ginas",
                        }),
                        (0, d.jsx)("p", {
                          children:
                            "Organiza, edita, tapa, inserta im\xE1genes, firma y exporta desde una aplicaci\xF3n de escritorio.",
                        }),
                        (0, d.jsx)("em", {
                          children:
                            "Arrastra aqu\xED PDF, Word, Excel, PowerPoint, DWG o im\xE1genes",
                        }),
                      ],
                    }),
              }),
              (0, d.jsxs)("footer", {
                className: "status",
                children: [
                  (0, d.jsx)("span", {
                    children: g.length
                      ? `${g.length} archivo${g.length === 1 ? "" : "s"}`
                      : "Sin documento",
                  }),
                  (0, d.jsxs)("div", {
                    children: [
                      (0, d.jsx)("input", {
                        type: "number",
                        min: w.length ? "1" : "0",
                        max: String(Math.max(0, w.length)),
                        value: pageNumberDraft,
                        onChange: (n) => setPageNumberDraft(n.target.value),
                        onBlur: commitPageNumber,
                        onKeyDown: (n) => {
                          n.key === "Enter" && (n.preventDefault(), commitPageNumber());
                        },
                        title: "Escribe un número y pulsa Intro",
                      }),
                      (0, d.jsxs)("span", { children: ["de ", w.length] }),
                    ],
                  }),
                  (0, d.jsxs)("div", {
                    children: [
                      (0, d.jsx)("button", {
                        onClick: () => Ya(-10),
                        children: (0, d.jsx)(Dl, { size: 15 }),
                      }),
                      (0, d.jsx)("input", {
                        type: "range",
                        min: "20",
                        max: "500",
                        value: Cf,
                        onChange: (n) => Gu(+n.target.value),
                      }),
                      (0, d.jsx)("button", {
                        onClick: () => Ya(10),
                        children: (0, d.jsx)(Ml, { size: 15 }),
                      }),
                      (0, d.jsxs)("span", { children: [Cf, "%"] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          fn &&
            (0, d.jsxs)("aside", {
              className: "right",
              children: [
                (0, d.jsxs)("div", {
                  className: "righthead",
                  children: [
                    (0, d.jsx)("b", { children: "Propiedades" }),
                    (0, d.jsx)("button", {
                      onClick: () => kl(!1),
                      children: "\xD7",
                    }),
                  ],
                }),
                U
                  ? (0, d.jsxs)("section", {
                      className: "editor-properties",
                      children: [
                        (0, d.jsx)("label", {
                          children:
                            U.type === "text"
                              ? U.replaceOriginal
                                ? "Modificar texto existente"
                                : "Editar texto nuevo"
                              : U.type === "image"
                                ? "Editar imagen"
                                : U.type === "draw"
                                  ? "Dibujo a mano alzada"
                                  : "Editar marca",
                        }),
                        U.type === "text" &&
                          (0, d.jsxs)(d.Fragment, {
                            children: [
                              U.replaceOriginal &&
                                (0, d.jsx)("small", {
                                  className: "existing-text-help",
                                  children:
                                    "El texto se sustituye en su posición original; no se crea un cuadro nuevo sobre la página.",
                                }),
                              (0, d.jsx)("textarea", {
                                value: U.text,
                                onFocus: Te,
                                onChange: (n) => {
                                  let nextText = n.target.value,
                                    lineCount = Math.max(1, nextText.split("\n").length),
                                    minimumHeight = Ee(
                                      (lineCount *
                                          (U.fontSizeRatio
                                            ? U.fontSizeRatio * Ye.w
                                            : U.size) *
                                          1.15 +
                                        4) /
                                        Math.max(Ye.h, 1),
                                      0.025,
                                      1 - U.y,
                                    );
                                  ma(U.id, {
                                    text: nextText,
                                    h: Math.max(U.h, minimumHeight),
                                    textDirty: U.replaceOriginal
                                      ? nextText !== (U.sourceText || "")
                                      : !0,
                                  });
                                },
                              }),
                              (0, d.jsx)("label", {
                                children: "Tipo de letra",
                              }),
                              (0, d.jsxs)("select", {
                                value: U.font,
                                onChange: (n) =>
                                  ma(
                                    U.id,
                                    {
                                      font: n.target.value,
                                      cssFont: n.target.value,
                                      preserveSourceFont: !1,
                                      styleDirty: !0,
                                    },
                                    !0,
                                  ),
                                children: [
                                  !PDF_EDITOR_FONTS.includes(U.font) &&
                                    (0, d.jsx)("option", {
                                      value: U.font,
                                      children: `${U.font} (original)`,
                                    }),
                                  ...PDF_EDITOR_FONTS.map((n) =>
                                    (0, d.jsx)(
                                      "option",
                                      { value: n, children: n },
                                      n,
                                    ),
                                  ),
                                ],
                              }),
                              U.replaceOriginal &&
                                (0, d.jsx)("small", {
                                  className: "edit-tip font-preserved-tip",
                                  children:
                                    "Se conserva la fuente detectada del texto sustituido. Solo cambiará si eliges otra.",
                                }),
                              (0, d.jsxs)("div", {
                                className: "property-labels",
                                children: [
                                  (0, d.jsx)("span", { children: "Color" }),
                                  (0, d.jsx)("span", { children: "Tama\xF1o" }),
                                ],
                              }),
                              (0, d.jsxs)("div", {
                                className: "formrow",
                                children: [
                                  (0, d.jsx)("input", {
                                    "aria-label": "Color",
                                    type: "color",
                                    value: U.color,
                                    onChange: (n) =>
                                      ma(
                                        U.id,
                                        {
                                          color: n.target.value,
                                          styleDirty: !0,
                                        },
                                        !0,
                                      ),
                                  }),
                                  (0, d.jsx)("input", {
                                    "aria-label": "Tama\xF1o",
                                    type: "number",
                                    min: "6",
                                    max: "144",
                                    value: U.size,
                                    onChange: (n) => {
                                      let nextSize = Ee(
                                        +n.target.value || 6,
                                        6,
                                        144,
                                      );
                                      ma(
                                        U.id,
                                        {
                                          size: nextSize,
                                          fontSizeRatio:
                                            nextSize /
                                            Math.max(
                                              U.pageWidthPoints || 595.28,
                                              1,
                                            ),
                                          styleDirty: !0,
                                        },
                                        !0,
                                      );
                                    },
                                  }),
                                  (0, d.jsxs)("button", {
                                    className: `bold-button ${U.bold ? "active" : ""}`,
                                    onClick: () =>
                                      ma(
                                        U.id,
                                        {
                                          bold: !U.bold,
                                          preserveSourceFont: !1,
                                          styleDirty: !0,
                                        },
                                        !0,
                                      ),
                                    children: [
                                      (0, d.jsx)(af, { size: 14 }),
                                      " Negrita",
                                    ],
                                  }),
                                  (0, d.jsxs)("button", {
                                    className: `bold-button ${U.italic ? "active" : ""}`,
                                    onClick: () =>
                                      ma(
                                        U.id,
                                        {
                                          italic: !U.italic,
                                          preserveSourceFont: !1,
                                          styleDirty: !0,
                                        },
                                        !0,
                                      ),
                                    children: [
                                      (0, d.jsx)("em", { children: "I" }),
                                      " Cursiva",
                                    ],
                                  }),
                                  (0, d.jsxs)("button", {
                                    className: `bold-button ${U.underline ? "active" : ""}`,
                                    onClick: () =>
                                      ma(
                                        U.id,
                                        {
                                          underline: !U.underline,
                                          styleDirty: !0,
                                        },
                                        !0,
                                      ),
                                    children: [
                                      (0, d.jsx)("u", { children: "U" }),
                                      " Subrayado",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        U.type === "watermark" &&
                          (0, d.jsxs)(d.Fragment, {
                            children: [
                              (0, d.jsx)("textarea", {
                                value: U.text,
                                onFocus: Te,
                                onChange: (n) => ma(U.id, { text: n.target.value }),
                              }),
                              (0, d.jsxs)("label", {
                                children: ["Opacidad: ", Math.round((U.opacity ?? 0.18) * 100), "%"],
                              }),
                              (0, d.jsx)("input", {
                                type: "range",
                                min: "5",
                                max: "80",
                                value: Math.round((U.opacity ?? 0.18) * 100),
                                onPointerDown: Te,
                                onChange: (n) => ma(U.id, { opacity: +n.target.value / 100 }),
                              }),
                              (0, d.jsxs)("label", {
                                children: ["Inclinaci\xF3n: ", U.angle || 0, "\xB0"],
                              }),
                              (0, d.jsx)("input", {
                                type: "range",
                                min: "-90",
                                max: "90",
                                value: U.angle || 0,
                                onPointerDown: Te,
                                onChange: (n) => ma(U.id, { angle: +n.target.value }),
                              }),
                            ],
                          }),
                        U.type === "image" &&
                          (0, d.jsxs)(d.Fragment, {
                            children: [
                              (0, d.jsxs)("div", {
                                className: "image-actions",
                                children: [
                                  (0, d.jsxs)("button", {
                                    onClick: () => Qu(void 0, U.id),
                                    children: [
                                      (0, d.jsx)(xt, {}),
                                      "Cambiar imagen",
                                    ],
                                  }),
                                  (0, d.jsxs)("button", {
                                    onClick: () => ma(U.id, { crop: Pu() }, !0),
                                    children: [
                                      (0, d.jsx)(tf, {}),
                                      "Restablecer recorte",
                                    ],
                                  }),
                                ],
                              }),
                              (0, d.jsxs)("div", {
                                className: "crop-panel",
                                children: [
                                  (0, d.jsxs)("label", {
                                    children: [
                                      "Recortar izquierda: ",
                                      U.crop.left,
                                      "%",
                                    ],
                                  }),
                                  (0, d.jsx)("input", {
                                    type: "range",
                                    min: "0",
                                    max: "85",
                                    value: U.crop.left,
                                    onPointerDown: Te,
                                    onChange: (n) =>
                                      If(U, "left", +n.target.value),
                                  }),
                                  (0, d.jsxs)("label", {
                                    children: [
                                      "Recortar derecha: ",
                                      U.crop.right,
                                      "%",
                                    ],
                                  }),
                                  (0, d.jsx)("input", {
                                    type: "range",
                                    min: "0",
                                    max: "85",
                                    value: U.crop.right,
                                    onPointerDown: Te,
                                    onChange: (n) =>
                                      If(U, "right", +n.target.value),
                                  }),
                                  (0, d.jsxs)("label", {
                                    children: [
                                      "Recortar arriba: ",
                                      U.crop.top,
                                      "%",
                                    ],
                                  }),
                                  (0, d.jsx)("input", {
                                    type: "range",
                                    min: "0",
                                    max: "85",
                                    value: U.crop.top,
                                    onPointerDown: Te,
                                    onChange: (n) =>
                                      If(U, "top", +n.target.value),
                                  }),
                                  (0, d.jsxs)("label", {
                                    children: [
                                      "Recortar abajo: ",
                                      U.crop.bottom,
                                      "%",
                                    ],
                                  }),
                                  (0, d.jsx)("input", {
                                    type: "range",
                                    min: "0",
                                    max: "85",
                                    value: U.crop.bottom,
                                    onPointerDown: Te,
                                    onChange: (n) =>
                                      If(U, "bottom", +n.target.value),
                                  }),
                                ],
                              }),
                              (0, d.jsx)("small", {
                                className: "edit-tip",
                                children:
                                  "Arrastra la imagen para moverla. Usa el cuadrado azul de la esquina para ampliar o reducir.",
                              }),
                            ],
                          }),
                        U.type === "draw" &&
                          (0, d.jsxs)("div", {
                            className: "draw-properties",
                            children: [
                              (0, d.jsx)("label", {
                                children: "Color del trazo",
                              }),
                              (0, d.jsx)("input", {
                                type: "color",
                                value: U.color,
                                onChange: (n) =>
                                  ma(U.id, { color: n.target.value }, !0),
                              }),
                              (0, d.jsxs)("label", {
                                children: ["Ancho: ", U.size, "px"],
                              }),
                              (0, d.jsx)("input", {
                                type: "range",
                                min: "1",
                                max: "20",
                                value: U.size,
                                onPointerDown: Te,
                                onChange: (n) =>
                                  ma(U.id, { size: +n.target.value }),
                              }),
                              (0, d.jsx)("small", {
                                className: "edit-tip",
                                children:
                                  "Pulsa el bot\xF3n derecho sobre el trazo para dejar de seleccionarlo.",
                              }),
                            ],
                          }),
                        U.type !== "text" &&
                          U.type !== "image" &&
                          U.type !== "whiteout" &&
                          U.type !== "draw" &&
                          (0, d.jsxs)(d.Fragment, {
                            children: [
                              (0, d.jsx)("label", {
                                children:
                                  U.type === "highlight"
                                    ? "Color del resaltado"
                                    : U.type === "redact"
                                      ? "Color del tapado"
                                      : "Color de la marca",
                              }),
                              (0, d.jsxs)("div", {
                                className: "mark-color-options",
                                children: [
                                  (0, d.jsx)("input", {
                                    className: "mark-color-input",
                                    "aria-label": "Elegir cualquier color",
                                    type: "color",
                                    value: U.color,
                                    onChange: (n) =>
                                      ma(U.id, { color: n.target.value }, !0),
                                  }),
                                  (0, d.jsx)("div", {
                                    className: "color-swatches",
                                    children: (
                                      U.type === "highlight"
                                        ? [
                                            "#ffe65c",
                                            "#8bea8b",
                                            "#79c7ff",
                                            "#ff9fc8",
                                            "#ffb35c",
                                          ]
                                        : [
                                            "#ffffff",
                                            "#111111",
                                            "#e02b3a",
                                            "#1268e8",
                                            "#16a34a",
                                            "#f59e0b",
                                          ]
                                    ).map((n) =>
                                      (0, d.jsx)(
                                        "button",
                                        {
                                          type: "button",
                                          className:
                                            U.color.toLowerCase() === n
                                              ? "active"
                                              : "",
                                          title: `Usar color ${n}`,
                                          "aria-label": `Usar color ${n}`,
                                          style: { backgroundColor: n },
                                          onClick: () =>
                                            ma(U.id, { color: n }, !0),
                                        },
                                        n,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                              U.type === "highlight" &&
                                (0, d.jsxs)(d.Fragment, {
                                  children: [
                                    (0, d.jsxs)("label", {
                                      children: [
                                        "Opacidad: ",
                                        Math.round((U.opacity ?? 0.38) * 100),
                                        "%",
                                      ],
                                    }),
                                    (0, d.jsx)("input", {
                                      className: "highlight-opacity",
                                      type: "range",
                                      min: "15",
                                      max: "65",
                                      value: Math.round(
                                        (U.opacity ?? 0.38) * 100,
                                      ),
                                      onPointerDown: Te,
                                      onChange: (n) =>
                                        ma(U.id, {
                                          opacity: +n.target.value / 100,
                                        }),
                                    }),
                                    (0, d.jsx)("small", {
                                      className: "edit-tip",
                                      children:
                                        "El resaltado permanece transparente para que el texto inferior siga siendo legible.",
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        U.type === "whiteout" &&
                          (0, d.jsx)("small", {
                            className: "edit-tip",
                            children:
                              "Tapado blanco sin borde. Arr\xE1stralo y utiliza el cuadrado azul para cambiar su tama\xF1o.",
                          }),
                        (0, d.jsxs)("div", {
                          className: "element-actions",
                          children: [
                            (0, d.jsxs)("button", {
                              onClick: () => bn(U),
                              children: [(0, d.jsx)(ca, {}), "Copiar"],
                            }),
                            (0, d.jsxs)("button", {
                              onClick: () => Ku(U.id),
                              className: "removeMark",
                              children: [(0, d.jsx)(Oa, {}), "Eliminar"],
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, d.jsxs)("section", {
                      children: [
                        (0, d.jsx)("label", { children: "P\xE1gina activa" }),
                        (0, d.jsxs)("div", {
                          className: "pageno",
                          children: [
                            (0, d.jsx)("input", {
                              className: "page-number-input",
                              type: "number",
                              min: w.length ? "1" : "0",
                              max: String(Math.max(0, w.length)),
                              value: pageNumberDraft,
                              disabled: !w.length,
                              onChange: (n) => setPageNumberDraft(n.target.value),
                              onBlur: commitPageNumber,
                              onKeyDown: (n) => {
                                n.key === "Enter" &&
                                  (n.preventDefault(), commitPageNumber());
                              },
                              "aria-label": "Ir a la página",
                            }),
                            (0, d.jsxs)("span", {
                              children: ["de ", w.length],
                            }),
                          ],
                        }),
                      ],
                    }),
                (0, d.jsxs)("section", {
                  children: [
                    (0, d.jsx)("label", { children: "Acciones de p\xE1gina" }),
                    (0, d.jsxs)("div", {
                      className: "grid",
                      children: [
                        (0, d.jsxs)("button", {
                          onClick: () => el(-90),
                          children: [(0, d.jsx)(wl, {}), "Izquierda"],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: () => el(90),
                          children: [(0, d.jsx)(Jt, {}), "Derecha"],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: Xu,
                          children: [(0, d.jsx)(ca, {}), "Duplicar"],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: ql,
                          children: [(0, d.jsx)(Oa, {}), "Eliminar"],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, d.jsxs)("section", {
                  children: [
                    (0, d.jsx)("label", { children: "Exportar documento" }),
                    (0, d.jsxs)("div", {
                      className: "formats",
                      children: [
                        (0, d.jsxs)("button", {
                          onClick: vf,
                          children: [
                            (0, d.jsx)("b", {
                              className: "pdf",
                              children: "PDF",
                            }),
                            (0, d.jsxs)("span", {
                              children: [
                                "Documento PDF",
                                (0, d.jsx)("small", {
                                  children:
                                    "Conservar dise\xF1o, im\xE1genes y p\xE1ginas",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: qs,
                          children: [
                            (0, d.jsx)("b", {
                              className: "word",
                              children: "W",
                            }),
                            (0, d.jsxs)("span", {
                              children: [
                                "Microsoft Word",
                                (0, d.jsx)("small", {
                                  children: "OCR, texto editable y estructura original",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, d.jsxs)("button", {
                          onClick: Hs,
                          children: [
                            (0, d.jsx)("b", {
                              className: "excel",
                              children: "X",
                            }),
                            (0, d.jsxs)("span", {
                              children: [
                                "Microsoft Excel",
                                (0, d.jsx)("small", {
                                  children: "OCR y reconstrucci\xF3n de tablas",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, d.jsxs)("section", {
                  className: "system-information",
                  children: [
                    (0, d.jsx)("label", { children: "Aplicación" }),
                    (0, d.jsx)("span", {
                      className: "local-badge",
                      children: "Procesamiento local",
                    }),
                    (0, d.jsxs)("span", {
                      className: "desktop-badge",
                      children: [
                        (0, d.jsx)(nf, { size: 16 }),
                        " Programa de escritorio",
                      ],
                    }),
                    (0, d.jsx)("p", {
                      className: "privacy",
                      children:
                        "Tus documentos se procesan en este dispositivo y no se guardan en un servidor.",
                    }),
                  ],
                }),
              ],
            }),
        ],
      }),
      ea &&
        (0, d.jsx)("div", {
          className: "context",
          style: { left: ea.x, top: ea.y },
          onClick: (n) => n.stopPropagation(),
          children: ea.selectedText
            ? (0, d.jsx)("button", {
                onClick: async () => {
                  (await copyNativePdfSelection(ea.selectedText), Xa(null));
                },
                children: [
                  (0, d.jsx)(ca, {}),
                  "Copiar texto seleccionado",
                ],
              })
            : ea.markId
              ? (0, d.jsxs)(d.Fragment, {
                children: [
                  (0, d.jsxs)("button", {
                    onClick: () => {
                      let n = f.current.find((s) => s.id === ea.markId);
                      (n && bn(n), Xa(null));
                    },
                    children: [(0, d.jsx)(ca, {}), "Copiar elemento"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => {
                      let n = f.current.find((s) => s.id === ea.markId);
                      (n && bn(n, !0), Xa(null));
                    },
                    children: [(0, d.jsx)(ht, {}), "Cortar elemento"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => {
                      (ea.markId && Ku(ea.markId), Xa(null));
                    },
                    className: "danger",
                    children: [(0, d.jsx)(Oa, {}), "Eliminar elemento"],
                  }),
                ],
                })
              : (0, d.jsxs)(d.Fragment, {
                children: [
                  (0, d.jsxs)("button", {
                    onClick: () => {
                      (xn({ x: ea.pageX, y: ea.pageY }), Xa(null));
                    },
                    children: [(0, d.jsx)(ht, {}), "Pegar imagen aqu\xED"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => {
                      (Qu({ x: ea.pageX, y: ea.pageY }), Xa(null));
                    },
                    children: [(0, d.jsx)(xt, {}), "Insertar imagen aqu\xED"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: Xu,
                    children: [(0, d.jsx)(ca, {}), "Copiar/duplicar p\xE1gina"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => el(90),
                    children: [(0, d.jsx)(Jt, {}), "Girar p\xE1gina"],
                  }),
                  (0, d.jsxs)("button", {
                    onClick: () => Jx("merge"),
                    children: [(0, d.jsx)(Zt, {}), "Insertar documento"],
                  }),
                  (0, d.jsxs)("button", {
                    className: "danger",
                    onClick: ql,
                    children: [(0, d.jsx)(Oa, {}), "Eliminar p\xE1gina"],
                  }),
                ],
              }),
        }),
      newTextDialog &&
        (0, d.jsx)("div", {
          className: "modalback",
          onClick: () => {
            (setNewTextDialog(null), setNewTextDraft(""));
          },
          children: (0, d.jsxs)("div", {
            className: "smallmodal new-text-modal",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "new-text-title",
            onClick: (event) => event.stopPropagation(),
            onKeyDown: (event) => {
              if (event.key === "Escape") {
                (event.stopPropagation(),
                  setNewTextDialog(null),
                  setNewTextDraft(""));
              }
              if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                (event.preventDefault(), confirmNewText());
              }
            },
            children: [
              (0, d.jsx)("button", {
                className: "modalx",
                onClick: () => {
                  (setNewTextDialog(null), setNewTextDraft(""));
                },
                "aria-label": "Cerrar",
                children: "\xD7",
              }),
              (0, d.jsx)("h2", {
                id: "new-text-title",
                children: "Crear texto nuevo",
              }),
              (0, d.jsx)("p", {
                children:
                  "Escribe el texto que quieres añadir. Se creará en la posición elegida del documento.",
              }),
              (0, d.jsx)("textarea", {
                autoFocus: !0,
                value: newTextDraft,
                onChange: (event) => setNewTextDraft(event.target.value),
                placeholder: "Escribe aquí el texto nuevo",
              }),
              (0, d.jsx)("small", {
                children: "Ctrl/Comando + Intro para crear el texto",
              }),
              (0, d.jsxs)("div", {
                className: "modalactions",
                children: [
                  (0, d.jsx)("button", {
                    className: "shortcut",
                    onClick: () => {
                      (setNewTextDialog(null), setNewTextDraft(""));
                    },
                    children: "Cancelar",
                  }),
                  (0, d.jsx)("button", {
                    className: "blue",
                    onClick: confirmNewText,
                    disabled: !newTextDraft.trim(),
                    children: "Crear texto",
                  }),
                ],
              }),
            ],
          }),
        }),
      linkChoice &&
        (0, d.jsx)("div", {
          className: "modalback",
          onClick: () => setLinkChoice(null),
          children: (0, d.jsxs)("div", {
            className: "smallmodal link-choice-modal",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "link-choice-title",
            onClick: (event) => event.stopPropagation(),
            onKeyDown: (event) => {
              if (event.key === "Escape") {
                (event.stopPropagation(), setLinkChoice(null));
              }
            },
            children: [
              (0, d.jsx)("button", {
                className: "modalx",
                onClick: () => setLinkChoice(null),
                "aria-label": "Cerrar",
                children: "\xD7",
              }),
              (0, d.jsx)("h2", {
                id: "link-choice-title",
                children: "Enlace detectado",
              }),
              (0, d.jsx)("p", {
                children:
                  "Puedes abrir el destino o editar el texto asociado.",
              }),
              (0, d.jsxs)("div", {
                className: "link-target",
                children: [
                  (0, d.jsx)("span", {
                    children:
                      linkChoice.kind === "email"
                        ? "Correo electrónico"
                        : "Página web",
                  }),
                  (0, d.jsx)("strong", {
                    "data-i18n-ignore": "true",
                    children: linkChoice.label,
                  }),
                  (0, d.jsx)("code", {
                    "data-i18n-ignore": "true",
                    children: linkChoice.target.replace(/^mailto:/i, ""),
                  }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "modalactions",
                children: [
                  (0, d.jsx)("button", {
                    className: "shortcut",
                    autoFocus: !0,
                    onClick: () => setLinkChoice(null),
                    children: "Cancelar",
                  }),
                  (0, d.jsx)("button", {
                    className: "link-edit-button",
                    onClick: editPdfLink,
                    disabled: !linkChoice.textItem,
                    title: linkChoice.textItem
                      ? "Editar texto"
                      : "Este enlace no tiene texto editable asociado",
                    children: "Editar texto",
                  }),
                  (0, d.jsx)("button", {
                    className: "blue",
                    onClick: openPdfLink,
                    children:
                      linkChoice.kind === "email"
                        ? "Escribir correo"
                        : "Abrir enlace",
                  }),
                ],
              }),
            ],
          }),
        }),
      ocrRegionOpen &&
        (0, d.jsx)("div", {
          className: "modalback",
          onClick: () => {
            (setOcrRegionOpen(!1), setOcrSelection(null));
          },
          children: (0, d.jsxs)("div", {
            className: "smallmodal ocr-region-modal",
            onClick: (n) => n.stopPropagation(),
            children: [
              (0, d.jsx)("button", {
                className: "modalx",
                onClick: () => {
                  (setOcrRegionOpen(!1), setOcrSelection(null));
                },
                children: "\xD7",
              }),
              (0, d.jsx)("h2", { children: "OCR de ventana" }),
              (0, d.jsx)("p", {
                children:
                  "Revisa el texto reconocido. Puedes copiarlo o insertarlo sobre la zona seleccionada.",
              }),
              (0, d.jsx)("textarea", {
                autoFocus: !0,
                value: ocrRegionResult,
                onChange: (n) => setOcrRegionResult(n.target.value),
                placeholder: "No se detect\xF3 texto en la ventana seleccionada",
              }),
              (0, d.jsxs)("div", {
                className: "modalactions",
                children: [
                  (0, d.jsx)("button", {
                    className: "shortcut",
                    onClick: () => {
                      (setOcrRegionOpen(!1), setOcrSelection(null));
                    },
                    children: "Cerrar",
                  }),
                  (0, d.jsx)("button", {
                    onClick: async () => {
                      try {
                        (await navigator.clipboard.writeText(ocrRegionResult),
                          F("Texto del OCR copiado"));
                      } catch {
                        F("No se pudo copiar el texto");
                      }
                    },
                    disabled: !ocrRegionResult.trim(),
                    children: "Copiar texto",
                  }),
                  (0, d.jsx)("button", {
                    className: "blue",
                    onClick: insertOcrRegionText,
                    disabled: !ocrRegionResult.trim(),
                    children: "Insertar como texto",
                  }),
                ],
              }),
            ],
          }),
        }),
      Vh &&
        (0, d.jsx)("div", {
          className: "modalback",
          onClick: () => Rl(!1),
          children: (0, d.jsxs)("div", {
            className: "smallmodal signature-modal",
            onClick: (n) => n.stopPropagation(),
            children: [
              (0, d.jsx)("button", {
                className: "modalx",
                onClick: () => Rl(!1),
                children: "\xD7",
              }),
              (0, d.jsx)("div", {
                className: "installmark",
                children: (0, d.jsx)(Ma, { size: 28 }),
              }),
              (0, d.jsx)("h2", { children: "Firma digital con certificado" }),
              (0, d.jsxs)("p", {
                children: [
                  "Firma criptogr\xE1ficamente el PDF con un certificado ",
                  (0, d.jsx)("b", { children: ".P12" }),
                  " o ",
                  (0, d.jsx)("b", { children: ".PFX" }),
                  ".",
                ],
              }),
              (0, d.jsx)("label", { children: "Certificado digital" }),
              (0, d.jsxs)("button", {
                className: "certificate-button",
                onClick: () => l.current?.click(),
                children: [
                  (0, d.jsx)(Ma, { size: 16 }),
                  Vu ? Vu.name : "Seleccionar certificado .P12 o .PFX",
                ],
              }),
              (0, d.jsx)("label", {
                children: "Contrase\xF1a del certificado",
              }),
              (0, d.jsx)("input", {
                type: "password",
                value: bs,
                onChange: (n) => jh(n.target.value),
                placeholder: "Contrase\xF1a",
              }),
              (0, d.jsx)("label", { children: "Nombre del firmante" }),
              (0, d.jsx)("input", {
                value: _u,
                onChange: (n) => Xh(n.target.value),
                placeholder: "Nombre y apellidos",
              }),
              (0, d.jsx)("label", { children: "Motivo" }),
              (0, d.jsx)("input", {
                value: Ss,
                onChange: (n) => Zh(n.target.value),
                placeholder: "Aprobaci\xF3n del documento",
              }),
              (0, d.jsxs)("div", {
                className: "signature-row",
                children: [
                  (0, d.jsxs)("div", {
                    children: [
                      (0, d.jsx)("label", { children: "Ubicaci\xF3n" }),
                      (0, d.jsx)("input", {
                        value: vs,
                        onChange: (n) => Qh(n.target.value),
                        placeholder: "Opcional",
                      }),
                    ],
                  }),
                  (0, d.jsxs)("div", {
                    children: [
                      (0, d.jsx)("label", { children: "Contacto" }),
                      (0, d.jsx)("input", {
                        value: Is,
                        onChange: (n) => Kh(n.target.value),
                        placeholder: "Opcional",
                      }),
                    ],
                  }),
                ],
              }),
              (0, d.jsxs)("label", {
                className: "signature-check",
                children: [
                  (0, d.jsx)("input", {
                    type: "checkbox",
                    checked: ws,
                    onChange: (n) => Jh(n.target.checked),
                  }),
                  "A\xF1adir sello visible en la p\xE1gina activa",
                ],
              }),
              (0, d.jsxs)("div", {
                className: "modalactions",
                children: [
                  (0, d.jsx)("button", {
                    className: "shortcut",
                    onClick: () => Rl(!1),
                    children: "Cancelar",
                  }),
                  (0, d.jsxs)("button", {
                    className: "blue",
                    onClick: yx,
                    disabled: !Vu || !_u.trim(),
                    children: [
                      (0, d.jsx)(Ma, { size: 16 }),
                      "Firmar y descargar PDF",
                    ],
                  }),
                ],
              }),
              (0, d.jsx)("small", {
                children:
                  "El certificado y su contrase\xF1a se usan \xFAnicamente en este equipo y no se env\xEDan a Internet.",
              }),
            ],
          }),
        }),
      (xs || Cs) &&
        (0, d.jsx)("div", { className: "toast", children: Cs || xs }),
      (0, d.jsx)("span", { hidden: !0, children: $h }),
    ],
  });
}
var ps = Za(hf()),
  Ph = document.getElementById("editor-root");
if (!Ph) throw new Error("No se encontr\xF3 el contenedor del editor");
document.getElementById("boot-status")?.remove();
(0, Nh.createRoot)(Ph).render(
  (0, ps.jsx)(Hh.StrictMode, { children: (0, ps.jsx)(cs, {}) }),
);
